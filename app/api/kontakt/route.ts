import { NextResponse } from "next/server";
import { getTransporter, isMailerConfigured, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/mailer";
import { adminContactEmail, autoReplyContactEmail } from "@/lib/email-templates";

const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp"];

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const requestType = String(form.get("requestType") ?? "");
    const company = String(form.get("company") ?? "");
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const message = String(form.get("message") ?? "");
    const locale = String(form.get("locale") ?? "de");
    const website = form.get("website"); // honeypot
    const attachment = form.get("attachment");

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    if (!isMailerConfigured()) {
      console.error("GMAIL_APP_PASSWORD is not set — see .env.local.example");
      return NextResponse.json(
        { ok: false, error: "not_configured", detail: "GMAIL_APP_PASSWORD is not set on the server." },
        { status: 500 }
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];

    if (attachment instanceof File && attachment.size > 0) {
      if (!ACCEPTED_TYPES.includes(attachment.type)) {
        return NextResponse.json({ ok: false, error: "invalid_file_type" }, { status: 400 });
      }
      if (attachment.size > MAX_FILE_BYTES) {
        return NextResponse.json({ ok: false, error: "file_too_large" }, { status: 400 });
      }
      const buffer = Buffer.from(await attachment.arrayBuffer());
      attachments.push({ filename: attachment.name || "anhang", content: buffer });
    }

    const transporter = getTransporter();

    const admin = adminContactEmail({
      requestType,
      company,
      name,
      email,
      phone,
      message,
      hasAttachment: attachments.length > 0,
    });

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: admin.subject,
      html: admin.html,
      attachments: attachments.length ? attachments : undefined,
    });

    const reply = autoReplyContactEmail(locale === "en" ? "en" : "de", { name });
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: reply.subject,
      html: reply.html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    const code = err && typeof err === "object" && "code" in err ? String(err.code) : undefined;
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "send_failed", detail: [code, message].filter(Boolean).join(": ") },
      { status: 500 }
    );
  }
}
