import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER ?? "dsfmediagmbh@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? GMAIL_USER;
export const FROM_EMAIL = `"DSF Media GmbH" <${GMAIL_USER}>`;

export function isMailerConfigured() {
  return Boolean(GMAIL_APP_PASSWORD);
}

// Lazily created so a missing App Password doesn't crash the module at import time —
// each route checks isMailerConfigured() before ever calling sendMail().
let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

export function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
}
