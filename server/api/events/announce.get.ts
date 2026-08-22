// server/api/events/announce.get.ts
//
// Scheduled (cron) alternative to the old "email fires when a visitor's
// browser happens to load the site" approach. This reads data/new-events.ts
// directly on the server and sends the announcement email for anything not
// already in the Google Sheet - no page view required.
//
// Protected the same way as send-reminders.get.ts: only runs with the
// correct ?secret=... (your NUXT_CRON_SECRET), so wire it up to Vercel Cron
// (or any external scheduler) hitting this URL periodically.

import nodemailer from "nodemailer";
import { appendEventRow, getAllGuestEmails, eventAlreadyExists } from "../../utils/googleSheets";
import { newEvents } from "../../../data/new-events";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const query = getQuery(event);

	if (!config.cronSecret || query.secret !== config.cronSecret) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	if (!newEvents.length) {
		return { success: true, announced: 0 };
	}

	const recipients = await getAllGuestEmails(config);
	if (!recipients.length) {
		return { success: true, announced: 0, note: "No guest emails found in the sheet yet." };
	}

	const siteUrl = String((config.public as any)?.siteUrl || "https://www.eventnest.am");

	const transporter = nodemailer.createTransport({
		host: config.mailHost as string,
		port: Number(config.mailPort || 465),
		secure: true,
		auth: {
			user: config.mailUser as string,
			pass: config.mailPass as string,
		},
	});

	let announced = 0;
	const skipped: string[] = [];

	for (const e of newEvents) {
		const alreadyExists = await eventAlreadyExists(config, e.title, e.date);
		if (alreadyExists) {
			skipped.push(e.title);
			continue;
		}

		await appendEventRow(config, { title: e.title, date: e.date, location: e.location });

		const eventUrl = `${siteUrl}/hy/events/${e.slug}`;

		await transporter.sendMail({
			from: `"Eventnest" <${config.mailUser}>`,
			bcc: recipients,
			subject: `📢 Նոր միջոցառում՝ ${e.title}`,
			html: `
				<h2>Նոր միջոցառում է ավելացվել!</h2>
				<p><strong>${e.title}</strong></p>
				<p>🗓️ ${e.date}</p>
				<p>📍 ${e.location}</p>
				<p><a href="${eventUrl}">Մանրամասները՝ մեր կայքում 💻</a></p>
			`,
		});

		announced++;
	}

	console.log(`📧 Announced ${announced} new event(s) to ${recipients.length} guests. Skipped (already sent): ${skipped.join(", ") || "none"}`);
	return { success: true, announced, skipped, recipients: recipients.length };
});