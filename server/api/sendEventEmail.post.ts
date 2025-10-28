import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! 
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, date, location } = body;

  // ✅ 1. Get all users’ emails from Supabase Auth
  const { data: users, error } = await supabase.auth.admin.listUsers();
  if (error) throw createError({ statusCode: 500, message: "Supabase fetch failed" });

  const recipients = users.users.map((u) => u.email).filter(Boolean);

  if (recipients.length === 0) {
    throw createError({ statusCode: 404, message: "No registered users found" });
  }

  // ✅ 2. Send emails via Gmail or another SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"DevNest" <${process.env.MAIL_USER}>`,
    to: recipients.join(","),
    subject: `📢 Նոր միջոցառում՝ ${title}`,
    html: `
      <h2>Նոր միջոցառում է ավելացվել!</h2>
      <p><strong>${title}</strong></p>
      <p>🗓️ ${date}</p>
      <p>📍 ${location}</p>
      <p>Մանրամասներ՝ մեր կայքում 💻</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { success: true, sentTo: recipients.length };
});
