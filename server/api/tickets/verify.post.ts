// server/api/tickets/verify.post.ts
//
// Called by the door-scanner page after reading a QR code. Re-derives the
// ticketId from the scanned orderNumber+email using the same HMAC secret,
// and compares it to the ticketId embedded in the QR. No database needed
// for authenticity — but check-in state (used/not used) is tracked in the
// Google Sheet since HMAC alone can't detect ticket reuse.

import { createHmac, timingSafeEqual } from "node:crypto";
import { google } from "googleapis";

interface VerifyBody {
	qrContent: string; // raw scanned string: EVENTNEST|ticketId|orderNumber|email
}

function buildTicketId(orderNumber: string, email: string, secret: string) {
	return createHmac("sha256", secret)
		.update(`${orderNumber}:${email.toLowerCase()}`)
		.digest("hex")
		.slice(0, 24);
}

async function getSheetsClient(config: ReturnType<typeof useRuntimeConfig>) {
	const auth = new google.auth.JWT({
		email: config.googleClientEmail as string,
		key: (config.googlePrivateKey as string).replace(/\\n/g, "\n"),
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});
	return google.sheets({ version: "v4", auth });
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
	const sheets = await getSheetsClient(config);
	const sheetId = config.googleSheetId as string;

	const read = await sheets.spreadsheets.values.get({
		spreadsheetId: sheetId,
		range: "Sheet1!A:H", // adjust to your actual columns
	});

	const rows = read.data.values || [];
	// Assumes column B = orderNumber, column H = "Scanned" flag (adjust indices to your sheet).
	const rowIndex = rows.findIndex((r) => r[1] === orderNumber);

	if (rowIndex === -1) {
		return { valid: false, reason: "NOT_FOUND" };
	}

	const alreadyScanned = rows[rowIndex][7] === "TRUE";
	if (alreadyScanned) {
		return { valid: false, reason: "ALREADY_USED", name: rows[rowIndex][2] };
	}

	await sheets.spreadsheets.values.update({
		spreadsheetId: sheetId,
		range: `Sheet1!J${rowIndex + 1}`,
		valueInputOption: "USER_ENTERED",
		requestBody: { values: [["TRUE"]] },
	});

	return { valid: true, name: rows[rowIndex][2], orderNumber };
});