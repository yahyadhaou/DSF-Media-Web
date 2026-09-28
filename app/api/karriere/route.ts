import { NextResponse } from "next/server";
import { getTransporter, isMailerConfigured, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/mailer";
import { adminApplicationEmail, autoReplyApplicationEmail } from "@/lib/email-templates";

const MAX_FILE_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot
    if (form.get("website")) {
      return NextResponse.json({ ok: true });
    }

    const name = String(form.get("from_name") ?? "");
    const phone = String(form.get("from_phone") ?? "");
    const location = String(form.get("from_location") ?? "");
    const position = String(form.get("position") ?? "");
    const experience = String(form.get("experience") ?? "");
    const availableFrom = String(form.get("available_from") ?? "");
    const license = String(form.get("license") ?? "");
    const locale = String(form.get("locale") ?? "de");
    const resume = form.get("resume");

    if (!name || !phone) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    if (!isMailerConfigured()) {
      console.error("GMAIL_APP_PASSWORD is not set — see .env.local.example");
      return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    let hasResume = false;

    if (resume instanceof File && resume.size > 0) {
      if (resume.type !== "application/pdf") {
        return NextResponse.json({ ok: false, error: "invalid_file_type" }, { status: 400 });
      }
      if (resume.size > MAX_FILE_BYTES) {
        return NextResponse.json({ ok: false, error: "file_too_large" }, { status: 400 });
      }
      const buffer = Buffer.from(await resume.arrayBuffer());
      attachments.push({ filename: resume.name || "lebenslauf.pdf", content: buffer });
      hasResume = true;
    }

    const transporter = getTransporter();

    const admin = adminApplicationEmail({
      name,
      phone,
      location,
      position,
      experience,
      availableFrom,
      license,
      hasResume,
    });

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: admin.subject,
      html: admin.html,
      attachments: attachments.length ? attachments : undefined,
    });

    const applicantEmail = String(form.get("from_email") ?? "");
    if (applicantEmail) {
      const reply = autoReplyApplicationEmail(locale === "en" ? "en" : "de", { name, position });
      await transporter.sendMail({
        from: FROM_EMAIL,
        to: applicantEmail,
        subject: reply.subject,
        html: reply.html,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
