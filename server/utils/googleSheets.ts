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

export async function getSheetsClient(config: ReturnType<typeof useRuntimeConfig>) {
	const auth = new google.auth.JWT({
		email: config.googleClientEmail as string,
		key: (config.googlePrivateKey as string).replace(/\\n/g, "\n"),
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});
	return google.sheets({ version: "v4", auth });
}

export interface GuestRow {
	orderNumber: string;
	name: string;
	email: string;
	peopleCount?: number;
	amount?: number;
	eventName?: string;
}

export async function appendGuestRow(config: ReturnType<typeof useRuntimeConfig>, row: GuestRow) {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	await sheets.spreadsheets.values.append({
		spreadsheetId: sheetId,
		range: "Sheet1!A:H",
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [[
				new Date().toISOString(),
				row.orderNumber,
				row.name,
				row.email,
				row.peopleCount ?? "",
				row.amount ?? "",
				row.eventName ?? "",
				"FALSE", // Scanned
			]],
		},
	});
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

export async function appendEventRow(
	config: ReturnType<typeof useRuntimeConfig>,
	event: { title: string; date: string; location: string },
) {
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	await sheets.spreadsheets.values.append({
		spreadsheetId: sheetId,
		range: "Events!A:E",
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [[event.title, event.date, event.location, new Date().toISOString(), "FALSE"]],
		},
	});
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