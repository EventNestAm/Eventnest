// server/utils/ticketToken.ts
//
// Stateless "ticket token": lets us carry the buyer's info (name, email,
// event, amount, orderNumber) through the EPG redirect round-trip WITHOUT
// a database. We sign the payload with a server-only secret, hand it to the
// browser, the browser puts it back in returnUrl, and when the customer
// comes back from the bank we verify the signature + cross-check the
// orderNumber against the bank's own order-status response before ever
// generating a QR code or sending an email.
//
// This is NOT a JWT (no external dependency needed), just the same idea:
// base64url(payload) + "." + HMAC-SHA256 signature, also base64url.

import { createHmac, timingSafeEqual } from "node:crypto";

export interface TicketPayload {
	orderNumber: string;
	email: string;
	phone?: string;
	name: string;
	eventName?: string;
	groupName?: string;
	peopleCount?: number;
	amount?: number; // minor units (luma), same as sent to EPG
	iat: number; // issued-at, ms epoch — lets us expire stale tokens
}

function getSecret(): string {
	const config = useRuntimeConfig();
	const secret = config.ticketSecret;
	if (secret === undefined || secret === null || secret === '') {
		throw createError({
			statusCode: 500,
			statusMessage: "Server misconfiguration: missing NUXT_TICKET_SECRET.",
		});
	}
	return String(secret);
}

function base64url(input: Buffer | string) {
	return Buffer.from(input)
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

function base64urlToBuffer(input: string) {
	const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
	return Buffer.from(padded, "base64");
}

export function signTicketPayload(payload: Omit<TicketPayload, "iat">): string {
	const full: TicketPayload = { ...payload, iat: Date.now() };
	const body = base64url(JSON.stringify(full));
	const sig = base64url(createHmac("sha256", getSecret()).update(body).digest());
	return `${body}.${sig}`;
}

// Throws if the token is malformed, tampered with, or older than maxAgeMs
// (default 1h — plenty for "fill form -> pay on bank page -> come back").
export function verifyTicketToken(token: string, maxAgeMs = 60 * 60 * 1000): TicketPayload {
	const [body, sig] = (token || "").split(".");
	if (!body || !sig) {
		throw createError({ statusCode: 400, statusMessage: "Malformed ticket token." });
	}

	const expectedSig = base64url(createHmac("sha256", getSecret()).update(body).digest());

	const a = Buffer.from(sig);
	const b = Buffer.from(expectedSig);
	if (a.length !== b.length || !timingSafeEqual(a, b)) {
		throw createError({ statusCode: 400, statusMessage: "Invalid ticket token signature." });
	}

	let payload: TicketPayload;
	try {
		payload = JSON.parse(base64urlToBuffer(body).toString("utf-8"));
	} catch {
		throw createError({ statusCode: 400, statusMessage: "Invalid ticket token payload." });
	}

	if (!payload.iat || Date.now() - payload.iat > maxAgeMs) {
		throw createError({ statusCode: 400, statusMessage: "Ticket token expired." });
	}

	return payload;
}
