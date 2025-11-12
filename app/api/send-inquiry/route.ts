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

async function verifyRecaptcha(
  token: string
): Promise<{ success: boolean; error?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error("RECAPTCHA_SECRET_KEY is missing from environment variables");
    return { success: false, error: "Server configuration error" };
  }

  if (!token) {
    return { success: false, error: "Missing reCAPTCHA token" };
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Enhanced logging for debugging
    console.log("reCAPTCHA verification response:", {
      success: data.success,
      score: data.score,
      action: data.action,
      hostname: data.hostname,
      errorCodes: data["error-codes"],
    });

    if (data.success) {
      return { success: true };
    } else {
      const errorCodes = data["error-codes"] || ["unknown-error"];
      console.error("reCAPTCHA verification failed:", errorCodes);
      return {
        success: false,
        error: `reCAPTCHA failed: ${errorCodes.join(", ")}`,
      };
    }
  } catch (error) {
    console.error("reCAPTCHA API error:", error);
    return {
      success: false,
      error: `Network error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: Incoming = await request.json();

    // Enhanced server-side validation
    if (!body) {
      return NextResponse.json(
        { message: "Request body is missing" },
        { status: 400 }
      );
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "company",
      "email",
      "phone",
      "recaptchaToken",
    ];

    const missingFields = requiredFields.filter(
      (field) => !body[field as keyof Incoming]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const verification = await verifyRecaptcha(body.recaptchaToken);
    if (!verification.success) {
      return NextResponse.json(
        { message: verification.error || "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Setup nodemailer transporter
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM || user;

    if (!host || !user || !pass || !emailTo) {
      console.error("Mail server configuration missing:", {
        host: !!host,
        user: !!user,
        pass: !!pass,
        emailTo: !!emailTo,
      });
      return NextResponse.json(
        { message: "Mail server not configured properly" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      // Add timeout settings
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("SMTP transporter verified successfully");
    } catch (verifyError) {
      console.error("SMTP transporter verification failed:", verifyError);
      return NextResponse.json(
        { message: "Email service configuration error" },
        { status: 500 }
      );
    }

    const subject = `New Inquiry: ${body.inquiryPurpose} — ${body.company}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2C7DA0; border-bottom: 2px solid #49AA43; padding-bottom: 10px;">
          New Website Inquiry
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong style="color: #2C7DA0;">Inquiry Purpose:</strong> ${
            body.inquiryPurpose
          }</p>
          <p><strong style="color: #2C7DA0;">Name:</strong> ${body.firstName} ${
      body.lastName
    }</p>
          <p><strong style="color: #2C7DA0;">Company:</strong> ${
            body.company
          }</p>
          ${
            body.title
              ? `<p><strong style="color: #2C7DA0;">Title:</strong> ${body.title}</p>`
              : ""
          }
          <p><strong style="color: #2C7DA0;">Email:</strong> <a href="mailto:${
            body.email
          }">${body.email}</a></p>
          <p><strong style="color: #2C7DA0;">Phone:</strong> <a href="tel:${
            body.phone
          }">${body.phone}</a></p>
        </div>

        ${
          body.message
            ? `
        <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <strong style="color: #2C7DA0;">Message:</strong>
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${body.message}</p>
        </div>
        `
            : ""
        }

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
          <p>This message was sent from your website contact form on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    const text = `
New Website Inquiry

Inquiry Purpose: ${body.inquiryPurpose}
Name: ${body.firstName} ${body.lastName}
Company: ${body.company}
${body.title ? `Title: ${body.title}` : ""}
Email: ${body.email}
Phone: ${body.phone}

${body.message ? `Message:\n${body.message}` : ""}

Sent from your website contact form on ${new Date().toLocaleString()}
    `;

    const mailOptions = {
      from: {
        name: "Website Contact Form",
        address: emailFrom!,
      },
      to: emailTo,
      subject,
      html,
      text,
      replyTo: body.email,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been sent successfully!",
    });
  } catch (err) {
    console.error("Send inquiry error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send your inquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}
