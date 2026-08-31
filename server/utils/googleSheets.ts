// server/utils/googleSheets.ts
//
// One Google Sheet is used as the "database":
//
//   Tab "Sheet1" (guest list) — one row per PAID registration:
//     A: timestamp   B: orderNumber   C: name   D: email
//     E: peopleCount F: amount        G: eventName   H: Scanned (TRUE/FALSE)
//
//   Tab "Events" — one row per event you create:
//     A: title   B: date (YYYY-MM-DD)   C: location   D: createdAt
//     E: reminderSent (TRUE/FALSE)
//
// Share the sheet with the service account email (Editor access).

import { google } from "googleapis";

// Normalizes a private key pulled from an env var, regardless of how it was
// pasted in (with surrounding quotes, literal \n, or real newlines) — this
// is the #1 source of silent Google auth failures when moving a key from
// .env into a dashboard like Vercel's.
function normalizePrivateKey(raw: string): string {
	let key = (raw || "").trim();
	// Strip one layer of wrapping quotes if the whole value got copy-pasted
	// including the quotes from a .env file.
	if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
		key = key.slice(1, -1);
	}
	return key.replace(/\\n/g, "\n");
}

export async function getSheetsClient(config: ReturnType<typeof useRuntimeConfig>) {
	const clientEmail = config.googleClientEmail as string;
	const privateKey = normalizePrivateKey(config.googlePrivateKey as string);

	if (!clientEmail || !privateKey.includes("BEGIN PRIVATE KEY")) {
		console.error("❌ Google Sheets misconfiguration:", {
			hasClientEmail: !!clientEmail,
			looksLikeValidKey: privateKey.includes("BEGIN PRIVATE KEY"),
		});
		throw createError({
			statusCode: 500,
			statusMessage: "Server misconfiguration: Google Sheets credentials are invalid.",
		});
	}

	const auth = new google.auth.JWT({
		email: clientEmail,
		key: privateKey,
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});
	return google.sheets({ version: "v4", auth });
}

export interface GuestRow {
	orderNumber: string;
	name: string;
	email: string;
	phone?: string;
	groupName?: string;
	peopleCount?: number;
	amount?: number;
	eventName?: string;
}

export async function appendGuestRow(config: ReturnType<typeof useRuntimeConfig>, row: GuestRow): Promise<number> {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	const amdAmount = typeof row.amount === "number" ? Math.round(row.amount / 100) : "";

	const res = await sheets.spreadsheets.values.append({
		spreadsheetId: sheetId,
		range: "Sheet1!A:J",
		valueInputOption: "USER_ENTERED",
		insertDataOption: "INSERT_ROWS",
		requestBody: {
			values: [[
				new Date().toISOString(),
				row.orderNumber,
				row.name,
				row.email,
				row.phone ?? "",
				row.peopleCount ?? "",
				amdAmount,
				row.eventName ?? "",
				row.groupName ?? "",
				"FALSE", // Scanned
			]],
		},
	});

	// Row number Sheets actually wrote to - used right after this call to
	// detect "two confirm requests for the same order both landed here at
	// once" (e.g. customer refreshed payment-result.vue). See confirm.post.ts.
	const range = res.data.updates?.updatedRange || "";
	const match = range.match(/!\D*(\d+):/);
	const rowNumber = match?.[1];
	return rowNumber ? parseInt(rowNumber, 10) : -1;
}

// All row numbers (1-based) already holding this orderNumber. Google
// serializes concurrent appends server-side, so after appendGuestRow,
// whichever row number is LOWEST among matches was written first.
export async function findGuestRowNumbersByOrder(
	config: ReturnType<typeof useRuntimeConfig>,
	orderNumber: string,
): Promise<number[]> {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	const read = await sheets.spreadsheets.values.get({
		spreadsheetId: sheetId,
		range: "Sheet1!B:B", // column B = orderNumber
	});

	const rows = read.data.values || [];
	const matches: number[] = [];
	rows.forEach((r, i) => {
		if ((r[0] || "").trim() === orderNumber.trim()) {
			matches.push(i + 1);
		}
	});
	return matches;
}

export async function getAllGuestEmails(config: ReturnType<typeof useRuntimeConfig>): Promise<string[]> {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	const read = await sheets.spreadsheets.values.get({
		spreadsheetId: sheetId,
		range: "Sheet1!D:D", // column D = email
	});

	const rows = read.data.values || [];
	const emails = rows
		.map((r) => (r[0] || "").trim().toLowerCase())
		.filter((e) => e && e.includes("@"));

	return Array.from(new Set(emails));
}

export interface EventRow {
	rowNumber: number;
	title: string;
	date: string;
	location: string;
	reminderSent: boolean;
}

// Checks whether an event with this exact title + date has already been
// saved, so create.post.ts can skip re-appending/re-emailing on repeat
// or parallel calls (SSR + client hydration, multiple pages, etc.)
export async function eventAlreadyExists(
	config: ReturnType<typeof useRuntimeConfig>,
	params: { title: string; date: string; slug?: string },
): Promise<boolean> {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	const read = await sheets.spreadsheets.values.get({
		spreadsheetId: sheetId,
		range: "Events!A:F", // A: title, B: date, C: location, D: createdAt, E: reminderSent, F: slug
	});

	const rows = read.data.values || [];
	const { title, date, slug } = params;

	return rows.some((r) => {
		const rowSlug = (r[5] || "").trim();
		if (slug && rowSlug) {
			return rowSlug === slug.trim();
		}
		// Old row with no slug saved yet - fall back to title+date
		return (r[0] || "").trim() === title.trim() && (r[1] || "").trim() === date.trim();
	});
}

// Returns the 1-based row number Sheets actually wrote our data to (parsed
// out of the API's `updatedRange`, e.g. "Events!A15:E15" -> 15). Google
// serializes concurrent append calls on its end, so this row number is a
// reliable way to tell who "won" if two requests append the same
// title+date at nearly the same instant (see create.post.ts).
export async function appendEventRow(
	config: ReturnType<typeof useRuntimeConfig>,
	event: { title: string; date: string; location: string; slug?: string },
): Promise<number> {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	const res = await sheets.spreadsheets.values.append({
		spreadsheetId: sheetId,
		range: "Events!A:F",
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [[event.title, event.date, event.location, new Date().toISOString(), "FALSE", event.slug || ""]],
		},
	});

	const range = res.data.updates?.updatedRange || "";
	const match = range.match(/!\D*(\d+):/);
	const rowNumber = match?.[1];
	return rowNumber ? parseInt(rowNumber, 10) : -1;
}

// All row numbers (1-based) currently holding this exact title+date.
// Used after appendEventRow to detect "two requests both appended a row
// for the same event at the same time" - see create.post.ts.
export async function findEventRowNumbers(
	config: ReturnType<typeof useRuntimeConfig>,
	title: string,
	date: string,
): Promise<number[]> {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	const read = await sheets.spreadsheets.values.get({
		spreadsheetId: sheetId,
		range: "Events!A:B",
	});

	const rows = read.data.values || [];
	const matches: number[] = [];
	rows.forEach((r, i) => {
		if ((r[0] || "").trim() === title.trim() && (r[1] || "").trim() === date.trim()) {
			matches.push(i + 1);
		}
	});
	return matches;
}

export async function getEvents(config: ReturnType<typeof useRuntimeConfig>): Promise<EventRow[]> {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	const read = await sheets.spreadsheets.values.get({
		spreadsheetId: sheetId,
		range: "Events!A:E",
	});

	const rows = read.data.values || [];
	return rows.map((r, i) => ({
		rowNumber: i + 1,
		title: r[0] || "",
		date: r[1] || "",
		location: r[2] || "",
		reminderSent: r[4] === "TRUE",
	}));
}

export async function markReminderSent(config: ReturnType<typeof useRuntimeConfig>, rowNumber: number) {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	await sheets.spreadsheets.values.update({
		spreadsheetId: sheetId,
		range: `Events!E${rowNumber}`,
		valueInputOption: "USER_ENTERED",
		requestBody: { values: [["TRUE"]] },
	});
}