// server/api/events/create.post.ts

import { defineEventHandler, readBody, createError } from "h3";
import nodemailer from "nodemailer";
import { appendEventRow, getAllGuestEmails } from "../../utils/googleSheets";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	try {
		const body = await readBody(event);
		const { title, date, location } = body;

		if (!title || !date || !location) {
			throw createError({ statusCode: 400, statusMessage: "Missing required fields: title, date, location" });
		}

		await appendEventRow(config, { title, date, location });

		const recipients = await getAllGuestEmails(config);
		if (!recipients.length) {
			console.log("⚠️ No guest emails found in the sheet yet.");
			return { success: true, savedEvent: true, sentTo: 0 };
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

		const info = await transporter.sendMail({
			from: `"Eventnest" <${config.mailUser}>`,
			bcc: recipients,
			subject: `📢 Նոր միջոցառում՝ ${title}`,
			html: `
				<h2>Նոր միջոցառում է ավելացվել!</h2>
				<p><strong>${title}</strong></p>
				<p>🗓️ ${date}</p>
				<p>📍 ${location}</p>
				<p>Մանրամասները՝ մեր կայքում 💻</p>
			`,
		});

		console.log(`📧 Announcement sent to ${info.accepted.length} guests.`);
		return { success: true, savedEvent: true, sentTo: info.accepted.length };
	} catch (err: any) {
		console.error("❌ Error in /api/events/create:", err);
		throw createError({ statusCode: 500, statusMessage: err.message || "Internal Server Error" });
	}
});