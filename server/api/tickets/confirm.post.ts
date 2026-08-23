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
import { appendGuestRow, findGuestRowNumbersByOrder } from "../../utils/googleSheets";

interface ConfirmBody {
	orderId: string;
	token: string;
}

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

	const payload = verifyTicketToken(body.token);

	const status = await $fetch<{
		paid: boolean;
		orderNumber?: string;
		amount?: number;
	}>("/api/epg/status", { query: { orderId: body.orderId } });

	if (!status.paid) {
		throw createError({ statusCode: 402, statusMessage: "Payment not confirmed yet." });
	}

	if (status.orderNumber !== payload.orderNumber) {
		throw createError({ statusCode: 400, statusMessage: "Order/token mismatch." });
	}

	const ticketSecret = String(config.ticketSecret as string | number);
	const ticketId = buildTicketId(payload.orderNumber, payload.email, ticketSecret);
	const siteUrl = String((config.public as any)?.siteUrl || "https://www.eventnest.am");

	if (alreadyIssued.has(ticketId)) {
		const qrUrl = `${siteUrl}/hy/verify?t=${ticketId}&o=${encodeURIComponent(payload.orderNumber)}&e=${encodeURIComponent(payload.email)}`;
		const qrDataUrl = await QRCode.toDataURL(qrUrl);
		return { success: true, alreadySent: true, ticketId, qrDataUrl };
	}

	let isDuplicateRequest = false;
	try {
		const ourRow = await appendGuestRow(config, {
			orderNumber: payload.orderNumber,
			name: payload.name,
			email: payload.email,
			phone: payload.phone,
			groupName: payload.groupName,
			peopleCount: payload.peopleCount,
			amount: payload.amount,
			eventName: payload.eventName,
		});

		const matchingRows = await findGuestRowNumbersByOrder(config, payload.orderNumber);
		if (matchingRows.length > 1 && Math.min(...matchingRows) !== ourRow) {
			isDuplicateRequest = true;
		}
	} catch (err) {
		console.error("⚠️ Failed to write guest row to Google Sheet:", err);
	}

	const qrUrl = `${siteUrl}/hy/verify?t=${ticketId}&o=${encodeURIComponent(payload.orderNumber)}&e=${encodeURIComponent(payload.email)}`;
	const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 480 });
	const qrPngBuffer = await QRCode.toBuffer(qrUrl, { margin: 1, width: 480 });

	if (isDuplicateRequest) {
		alreadyIssued.add(ticketId);
		return { success: true, alreadySent: true, ticketId, qrDataUrl };
	}

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