// import nodemailer from "nodemailer";
// import { getEvents, getAllGuestEmails, markReminderSent } from "../../utils/googleSheets";

// function daysFromToday(dateStr: string): number {
// 	const today = new Date();
// 	today.setHours(0, 0, 0, 0);
// 	const target = new Date(dateStr);
// 	target.setHours(0, 0, 0, 0);
// 	return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
// }

// export default defineEventHandler(async (event) => {
// 	const config = useRuntimeConfig();
// 	const query = getQuery(event);

// 	if (!config.cronSecret || query.secret !== config.cronSecret) {
// 		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
// 	}

// 	const events = await getEvents(config);
// 	const dueEvents = events.filter((e) => {
// 		if (e.reminderSent || !e.date) return false;
// 		const diff = daysFromToday(e.date);
// 		return diff === 2 || diff === 3;
// 	});

// 	if (!dueEvents.length) {
// 		return { success: true, remindersSent: 0 };
// 	}

// 	const recipients = await getAllGuestEmails(config);
// 	if (!recipients.length) {
// 		return { success: true, remindersSent: 0, note: "No guest emails found." };
// 	}

// 	const transporter = nodemailer.createTransport({
// 		host: config.mailHost as string,
// 		port: Number(config.mailPort || 465),
// 		secure: true,
// 		auth: {
// 			user: config.mailUser as string,
// 			pass: config.mailPass as string,
// 		},
// 	});

// 	let sentCount = 0;
// 	for (const e of dueEvents) {
// 		await transporter.sendMail({
// 			from: `"Eventnest" <${config.mailUser}>`,
// 			bcc: recipients,
// 			subject: `⏰ Հիշեցում՝ ${e.title} շուտով է`,
// 			html: `
// 				<h2>Հիշեցում 🎉</h2>
// 				<p><strong>${e.title}</strong> շուտով է!</p>
// 				<p>🗓️ ${e.date}</p>
// 				<p>📍 ${e.location}</p>
// 			`,
// 		});
// 		await markReminderSent(config, e.rowNumber);
// 		sentCount++;
// 	}

// 	console.log(`⏰ Sent reminders for ${sentCount} event(s) to ${recipients.length} guests.`);
// 	return { success: true, remindersSent: sentCount, recipients: recipients.length };
// });