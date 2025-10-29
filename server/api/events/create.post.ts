// server/api/events/create.post.ts
console.log("🚀 /api/events/create endpoint loaded")
import { defineEventHandler, readBody, createError } from 'h3'

import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_KEY!
)

let alreadySent = false

export default defineEventHandler(async (event) => {
	try {
		if (alreadySent) {
			console.log("📭 Email already sent once. Skipping...")
			return { message: "Already sent." }
		}

		const body = await readBody(event)
		const { title, date, location } = body

		if (!title || !date || !location) {
			throw createError({ statusCode: 400, message: "Missing required fields" })
		}

		// ✅ 1. Save event in database (optional)
		const { error: insertError } = await supabase.from('events').insert([{ title, date, location }])
		if (insertError) throw insertError

		// ✅ 2. Get all users
		const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers()
		if (usersError) throw usersError

		const recipients = usersData.users.map((u) => u.email).filter(Boolean)
		if (!recipients.length) {
			console.log("⚠️ No users found to send email.")
			return { success: false, message: "No users found" }
		}

		// ✅ 3. Configure email transport
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		})

		// ✅ 4. Email message
		const mailOptions = {
			from: `"Eventnest" <${process.env.MAIL_USER}>`,
			bcc: recipients,
			subject: `📢 Նոր միջոցառում՝ ${title}`,
			html: `
        <h2>Նոր միջոցառում է ավելացվել!</h2>
        <p><strong>${title}</strong></p>
        <p>🗓️ ${date}</p>
        <p>📍 ${location}</p>
        <p>Մանրամասները՝ մեր կայքում 💻</p>
      `,
		}

		// ✅ 5. Send email
		const info = await transporter.sendMail(mailOptions)
		console.log(`📧 Sent to ${info.accepted.length} users.`)

		alreadySent = true
		return { success: true, sentTo: info.accepted.length }
	} catch (err) {
		console.error("❌ Error in /api/events/create:", err)
		throw createError({ statusCode: 500, message: err.message || "Internal Server Error" })
	}
})
