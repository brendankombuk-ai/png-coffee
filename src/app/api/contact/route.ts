import { NextRequest, NextResponse } from "next/server";

/**
 * Handles Contact page form submissions.
 *
 * Right now this only validates the input and logs it server-side — there's
 * no email delivery or CMS storage wired up yet (that needs either the
 * Strapi CMS's email plugin triggered via its API, or a direct email
 * service call here, e.g. Nodemailer/Resend). This is deliberately built as
 * the single place that logic would plug into later, same pattern as the
 * Stripe webhook handler.
 */

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

  // TODO: send this via email (Strapi's configured email plugin, or a
  // direct provider call here) and/or store it as a submission in Strapi.
  console.log("[contact] New submission:", {
    name,
    company: company || null,
    phone: phone || null,
    email,
    subject,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
