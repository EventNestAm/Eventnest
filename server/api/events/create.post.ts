// server/api/events/create.post.ts

import { defineEventHandler, readBody, createError } from "h3";
import nodemailer from "nodemailer";
import { appendEventRow, getAllGuestEmails, eventAlreadyExists, findEventRowNumbers } from "../../utils/googleSheets";

// Best-effort in-process lock: closes the race window where two near-
// simultaneous requests (e.g. SSR + client hydration firing at once) both
// check the sheet before either has finished writing to it. Claimed
// synchronously, before any `await`, so no two requests on the same warm
// server instance can both pass. Per-process only (resets on redeploy /
// doesn't share across serverless instances) — combined with the sheet
// check above, this is enough for this scale.
const eventsInFlight = new Set<string>();

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	const body = await readBody(event);
	const { title, date, location, slug } = body;

	if (!title || !date || !location) {
		throw createError({ statusCode: 400, statusMessage: "Missing required fields: title, date, location" });
	}

	const lockKey = `${title.trim()}::${date.trim()}`;

	if (eventsInFlight.has(lockKey)) {
		console.log(`⏭️ Event "${title}" (${date}) already being processed — skipping duplicate.`);
		return { success: true, savedEvent: false, sentTo: 0, skipped: true };
	}
	eventsInFlight.add(lockKey);

	try {
		const alreadyExists = await eventAlreadyExists(config, title, date);
		if (alreadyExists) {
			console.log(`⏭️ Event "${title}" (${date}) already exists — skipping duplicate save/email.`);
			return { success: true, savedEvent: false, sentTo: 0, skipped: true };
		}

		const ourRow = await appendEventRow(config, { title, date, location });

		// Race check: the `eventAlreadyExists` check above and the in-process
		// lock at the top of this file both close MOST of the window where two
		// near-simultaneous requests (e.g. two visitors loading the site right
		// after you share a new event) could both get past the check before
		// either has written to the sheet - but on Vercel those two requests
		// can land on two different, cold, unrelated serverless instances, so
		// neither guard is airtight on its own. Google Sheets serializes the
		// actual append calls though, so after we've written our row we re-read
		// the sheet: if more than one row now matches this title+date, whichever
		// row number is LOWEST was appended first and only that request sends
		// the email - everyone else backs off. This is the real dedupe; the
		// checks above are just cheap fast-paths for the common case.
		const matchingRows = await findEventRowNumbers(config, title, date);
		if (matchingRows.length > 1 && Math.min(...matchingRows) !== ourRow) {
			console.log(`⏭️ Lost the race for "${title}" (${date}) — another request already announced it. Not sending.`);
			return { success: true, savedEvent: true, sentTo: 0, skipped: true };
		}

		const recipients = await getAllGuestEmails(config);
		
		if (!recipients.length) {
			console.log("⚠️ No guest emails found in the sheet yet.");
			return { success: true, savedEvent: true, sentTo: 0 };
		}

		const siteUrl = String((config.public as any)?.siteUrl || "https://www.eventnest.am");
		const eventUrl = slug ? `${siteUrl}/hy/events/${slug}` : siteUrl;

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
				<p><a href="${eventUrl}">Մանրամասները՝ մեր կայքում 💻</a></p>
			`,
		});

		console.log(`📧 Announcement sent to ${info.accepted.length} guests.`);
		return { success: true, savedEvent: true, sentTo: info.accepted.length };
	} catch (err: any) {
		console.error("❌ Error in /api/events/create:", err);
		// Allow a genuine retry after a real failure (e.g. mail server hiccup)
		eventsInFlight.delete(lockKey);
		throw createError({ statusCode: 500, statusMessage: err.message || "Internal Server Error" });
	}
});