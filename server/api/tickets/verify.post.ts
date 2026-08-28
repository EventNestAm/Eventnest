// server/api/tickets/verify.post.ts
//
// Called by the door-scanner page after reading a QR code. Re-derives the
// ticketId from the scanned orderNumber+email using the same HMAC secret,
// and compares it to the ticketId embedded in the QR. No database needed
// for authenticity — but check-in state (used/not used) is tracked in the
// Google Sheet since HMAC alone can't detect ticket reuse.

import { createHmac, timingSafeEqual } from "node:crypto";
import { getSheetsClient } from "../../utils/googleSheets";

interface VerifyBody {
	qrContent: string; // raw scanned string: EVENTNEST|ticketId|orderNumber|email
}

function buildTicketId(orderNumber: string, email: string, secret: string) {
	return createHmac("sha256", secret)
		.update(`${orderNumber}:${email.toLowerCase()}`)
		.digest("hex")
		.slice(0, 24);
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const body = await readBody<VerifyBody>(event);

	if (!body?.qrContent) {
		throw createError({ statusCode: 400, statusMessage: "qrContent is required" });
	}

	const parts = body.qrContent.split("|");
	if (parts.length !== 4 || parts[0] !== "EVENTNEST") {
		return { valid: false, reason: "MALFORMED" };
	}

	const [, scannedTicketId, orderNumber, email] = parts;
	const ticketSecret = String(config.ticketSecret as string | number);
	const expectedTicketId = buildTicketId(orderNumber, email, ticketSecret);

	// Constant-time compare to avoid timing side-channels on the HMAC check.
	const scannedBuf = Buffer.from(scannedTicketId);
	const expectedBuf = Buffer.from(expectedTicketId);
	const authentic =
		scannedBuf.length === expectedBuf.length && timingSafeEqual(scannedBuf, expectedBuf);

	if (!authentic) {
		return { valid: false, reason: "FORGED" };
	}

	// Check + mark used in the sheet.
	// Columns written by appendGuestRow (server/utils/googleSheets.ts):
	// A ts, B orderNumber, C name, D email, E phone, F peopleCount,
	// G amount, H eventName, I groupName, J Scanned. Must read through J,
	// not H — H is eventName, not the scanned flag.
	let rows: string[][];
	const sheetId = config.googleSheetId as string;
	try {
		const sheets = await getSheetsClient(config);
		const read = await sheets.spreadsheets.values.get({
			spreadsheetId: sheetId,
			range: "Sheet1!A:J",
		});
		rows = (read.data.values as string[][]) || [];
	} catch (err) {
		console.error("❌ Google Sheets lookup failed during verify:", err);
		return { valid: false, reason: "ERROR" };
	}

	const rowIndex = rows.findIndex((r) => r[1] === orderNumber);

	if (rowIndex === -1) {
		return { valid: false, reason: "NOT_FOUND" };
	}

	const alreadyScanned = rows[rowIndex][9] === "TRUE"; // column J (index 9)
	if (alreadyScanned) {
		return { valid: false, reason: "ALREADY_USED", name: rows[rowIndex][2] };
	}

	const sheets = await getSheetsClient(config);
	await sheets.spreadsheets.values.update({
		spreadsheetId: sheetId,
		range: `Sheet1!J${rowIndex + 1}`,
		valueInputOption: "USER_ENTERED",
		requestBody: { values: [["TRUE"]] },
	});

	return { valid: true, name: rows[rowIndex][2], orderNumber };
});