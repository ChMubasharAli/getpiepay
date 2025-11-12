// app/api/send-inquiry/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

type Incoming = {
  inquiryPurpose: string;
  firstName: string;
  lastName: string;
  company: string;
  title?: string;
  email: string;
  phone: string;
  message?: string;
  recaptchaToken: string;
};

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: params,
  });

  const data = await res.json();
  // For v2 checkbox, data.success should be true when verified.
  return !!data.success;
}

export async function POST(request: NextRequest) {
  try {
    const body: Incoming = await request.json();

    // basic server-side validation
    if (
      !body ||
      !body.firstName ||
      !body.lastName ||
      !body.company ||
      !body.email ||
      !body.phone ||
      !body.recaptchaToken
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const verified = await verifyRecaptcha(body.recaptchaToken);
    if (!verified) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Setup nodemailer transporter (use SMTP env vars)
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM || user;

    if (!host || !user || !pass || !emailTo) {
      return NextResponse.json(
        { message: "Mail server not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const subject = `New Inquiry: ${body.inquiryPurpose} — ${body.company}`;
    const html = `
      <p><strong>Inquiry Purpose:</strong> ${body.inquiryPurpose}</p>
      <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
      <p><strong>Company:</strong> ${body.company}</p>
      <p><strong>Title:</strong> ${body.title || ""}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      <p><strong>Message:</strong><br/>${body.message || ""}</p>
      <hr/>
      <p>Sent from your website</p>
    `;

    await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject,
      html,
    });

    return NextResponse.json({ ok: true, message: "Sent" });
  } catch (err) {
    console.error("send-inquiry error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
