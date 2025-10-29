// // server/api/events/create.post.ts
// import { createClient } from '@supabase/supabase-js'
// import nodemailer from 'nodemailer'

// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_KEY!
// )
// let alreadySent = false;

// export default defineEventHandler(async (event) => {
//   if (alreadySent) {
//     console.log("📭 Email already sent once. Skipping...");
//     return { message: "Already sent." };
//   }
//   alreadySent = true;
//   const body = await readBody(event)
//   const { title, date, location } = body

//   // 🧩 1. Save event to database
//   const { data, error } = await supabase.from('events').insert([{ title, date, location }])
//   if (error) throw createError({ statusCode: 500, message: error.message })

//   // 🧩 2. Then send email to all users
//   const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
//   if (usersError) throw createError({ statusCode: 500, message: usersError.message })

//   const recipients = users.users.map(u => u.email).filter(Boolean)

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   })

//   const mailOptions = {
//     from: `"Eventnest" <${process.env.MAIL_USER}>`,
//     to: recipients.join(','),
//     subject: `📢 Նոր միջոցառում՝ ${title}`,
//     html: `
//       <h2>Նոր միջոցառում է ավելացվել!</h2>
//       <p><strong>${title}</strong></p>
//       <p>🗓️ ${date}</p>
//       <p>📍 ${location}</p>
//       <p>Մանրամասները՝ մեր կայքում 💻</p>
//     `,
//   }

//   await transporter.sendMail(mailOptions)
//   console.log(`📧 Sent to ${recipients.length} users.`)

//   return { success: true, sentTo: recipients.length }
// })
