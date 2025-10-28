import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, date, location } = body;

  // 1️⃣ Get all registered users
  const { data: users, error } = await supabase.auth.admin.listUsers();
  if (error) throw createError({ statusCode: 500, message: "Failed to fetch users" });

  const recipients = users.users.map(u => u.email).filter(Boolean);
  if (recipients.length === 0) {
    throw createError({ statusCode: 404, message: "No registered users found" });
  }

  // 2️⃣ Send email via your Gmail account
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // 3️⃣ Send a separate email to each user (better deliverability)
  for (const email of recipients) {
    await transporter.sendMail({
      from: `"Eventnest" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `📢 Նոր միջոցառում՝ ${title}`,
      html: `
        <h2>Նոր միջոցառում է ավելացվել!</h2>
        <p><strong>${title}</strong></p>
        <p>🗓️ ${date}</p>
        <p>📍 ${location}</p>
        <p>Մանրամասները՝ մեր կայքում 💻</p>
      `,
    });
  }

  return { success: true, sentTo: recipients.length };
});
