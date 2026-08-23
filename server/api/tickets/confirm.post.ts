// server/api/tickets/confirm.post.ts
//
// Called from pages/payment-result.vue once the customer is back from the
// bank. This is the ONLY place a QR ticket gets generated & emailed, and it
// only does so after re-verifying payment with EPG directly (never trusts
// the redirect, same rule as /api/epg/status).
//
// No database involved:
//  - who the buyer is comes from the signed token minted in
//    /api/tickets/create-token (verified here, not trusted blindly)
//  - whether they paid comes fresh from EPG's getOrderStatus
//  - the "ticket" itself is just a signed string encoded into the QR image,
//    so anyone scanning it later can be re-verified the same way (HMAC),
//    with nothing to look up.

import { createHmac } from "node:crypto";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import { verifyTicketToken } from "../../utils/ticketToken";
import { appendGuestRow } from "../../utils/googleSheets";
interface ConfirmBody {
	orderId: string; // EPG's orderId, returned by /api/epg/register
	token: string; // signed payload from /api/tickets/create-token
}

// Best-effort de-dupe so a page refresh doesn't re-send the email.
// Per-process only (resets on redeploy / doesn't share across serverless
// instances) — fine for this scale; see README note if you outgrow it.
const alreadyIssued = new Set<string>();

function buildTicketId(orderNumber: string, email: string, secret: string) {
	return createHmac("sha256", secret)
		.update(`${orderNumber}:${email.toLowerCase()}`)
		.digest("hex")
		.slice(0, 24);
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const body = await readBody<ConfirmBody>(event);

	if (!body?.orderId || !body?.token) {
		throw createError({ statusCode: 400, statusMessage: "orderId and token are required" });
	}

	// 1. Verify the token is genuinely one we issued, and not expired.
	const payload = verifyTicketToken(body.token);

	// 2. Re-check payment status directly with EPG (internal call — Nitro
	//    resolves this without an extra network hop).
	const status = await $fetch<{
		paid: boolean;
		orderNumber?: string;
		amount?: number;
	}>("/api/epg/status", { query: { orderId: body.orderId } });

	if (!status.paid) {
		throw createError({ statusCode: 402, statusMessage: "Payment not confirmed yet." });
	}

	// 3. Cross-check: the paid order must be the SAME order this token was
	//    minted for. Prevents someone reusing an old/foreign token with an
	//    unrelated paid orderId.
	if (status.orderNumber !== payload.orderNumber) {
		throw createError({ statusCode: 400, statusMessage: "Order/token mismatch." });
	}

	const ticketSecret = String(config.ticketSecret as string | number);
	const ticketId = buildTicketId(payload.orderNumber, payload.email, ticketSecret);
	// 4. Idempotency guard — skip re-sending if we already issued this ticket.
	const siteUrl = String((config.public as any)?.siteUrl || "https://www.eventnest.am");

	// 4b. Idempotency guard — skip re-sending / re-writing if we already issued this ticket.
	if (alreadyIssued.has(ticketId)) {
		const qrUrl = `${siteUrl}/hy/verify?t=${ticketId}&o=${encodeURIComponent(payload.orderNumber)}&e=${encodeURIComponent(payload.email)}`;
		const qrDataUrl = await QRCode.toDataURL(qrUrl);
		return { success: true, alreadySent: true, ticketId, qrDataUrl };
	}

	try {
		await appendGuestRow(config, {
			orderNumber: payload.orderNumber,
			name: payload.name,
			email: payload.email,
			phone: payload.phone,
			peopleCount: payload.peopleCount,
			amount: payload.amount,
			eventName: payload.eventName,
		});
	} catch (err) {
		console.error("⚠️ Failed to write guest row to Google Sheet:", err);
	}

	// 5. Build the QR code as a real URL (not raw text) so phone cameras open
	//    it directly in the browser instead of offering to send it as a message.
	const qrUrl = `${siteUrl}/hy/verify?t=${ticketId}&o=${encodeURIComponent(payload.orderNumber)}&e=${encodeURIComponent(payload.email)}`;
	const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 480 });
	const qrPngBuffer = await QRCode.toBuffer(qrUrl, { margin: 1, width: 480 });

	// 6. Email it.
	const transporter = nodemailer.createTransport({
		host: config.mailHost as string,
		port: Number(config.mailPort || 465),
		secure: true,
		auth: {
			user: config.mailUser as string,
			pass: config.mailPass as string,
		},
	});

	await transporter.sendMail({
		from: `"Eventnest" <${config.mailUser}>`,
		to: payload.email,
		subject: `🎟️ Ձեր տոմսը՝ ${payload.eventName || "Eventnest"}`,
		html: `
			<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
				<h2>Ձեր տոմսը պատրաստ է 🎉</h2>
				<p><strong>${payload.name}</strong>, շնորհակալություն գրանցվելու համար${payload.eventName ? ` <strong>${payload.eventName}</strong> միջոցառման համար` : ""}!</p>
				<p>Պատվերի համար՝ ${payload.orderNumber}</p>
				${payload.peopleCount ? `<p>Հյուրերի քանակ՝ ${payload.peopleCount}</p>` : ""}
				<p>Ցույց տվեք այս QR կոդը մուտքի ժամանակ.</p>
				<img src="cid:ticket-qr" alt="QR ticket" width="240" height="240" />
				<p style="color:#888; font-size: 12px;">Տոմսի ID՝ ${ticketId}</p>
			</div>
		`,
		attachments: [
			{
				filename: "ticket-qr.png",
				content: qrPngBuffer,
				cid: "ticket-qr",
			},
		],
	});

	alreadyIssued.add(ticketId);

	return { success: true, alreadySent: false, ticketId, qrDataUrl };
});
