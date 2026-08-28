import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "moe.swissxpressopng29@gmail.com";

type ContactPayload = {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, company, phone, email, subject, message } = body;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, subject, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "PNG Coffee Contact <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `[Contact] ${subject}`,
    html: `
      <h2>New contact form submission</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        ${company ? `<tr><td><strong>Company</strong></td><td>${company}</td></tr>` : ""}
        ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ""}
        <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td><strong>Subject</strong></td><td>${subject}</td></tr>
      </table>
      <h3>Message</h3>
      <p style="white-space:pre-wrap">${message}</p>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
