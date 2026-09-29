function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapper(locale: string, bodyHtml: string) {
  return `<!doctype html>
<html lang="${locale}">
<body style="margin:0;background:#0B0F17;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px;">
      <span style="font-family:Georgia,serif;font-weight:bold;font-size:20px;color:#FFFFFF;">DSF <span style="color:#7FE0DA;font-family:Helvetica,Arial,sans-serif;">Media</span></span>
    </div>
    <div style="background:#101825;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;color:#E5EAEE;font-size:14px;line-height:1.65;">
      ${bodyHtml}
    </div>
    <p style="margin-top:24px;font-size:11px;color:rgba(255,255,255,0.35);">
      DSF Media GmbH · Reuenberg 67 · 45357 Essen · dsfmediagmbh@gmail.com
    </p>
  </div>
</body>
</html>`;
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:rgba(255,255,255,0.45);white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#FFFFFF;">${escapeHtml(value)}</td></tr>`;
}

// Same as row(), but always renders — used for fields the admin always wants
// to see a line for, even when the applicant left them blank.
function rowAlways(label: string, value: string) {
  return `<tr><td style="padding:6px 12px 6px 0;color:rgba(255,255,255,0.45);white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#FFFFFF;">${value ? escapeHtml(value) : '<span style="color:rgba(255,255,255,0.35);">Nicht angegeben</span>'}</td></tr>`;
}

// --- Kontakt (business inquiry) ---

export function adminContactEmail(data: {
  requestType: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  hasAttachment?: boolean;
}) {
  const body = `
    <p style="margin:0 0 16px;font-weight:bold;color:#7FE0DA;">Neue Anfrage über das Kontaktformular</p>
    <table style="border-collapse:collapse;width:100%;font-size:13px;">
      ${row("Art der Anfrage", data.requestType)}
      ${row("Firma", data.company)}
      ${row("Name", data.name)}
      ${row("E-Mail", data.email)}
      ${row("Telefon", data.phone)}
      ${data.hasAttachment ? row("Anhang", "Im Anhang dieser E-Mail") : ""}
    </table>
    <p style="margin:20px 0 6px;color:rgba(255,255,255,0.45);">Nachricht</p>
    <p style="margin:0;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `;
  return {
    subject: `[Kontaktanfrage] ${data.requestType} — ${data.name}${data.company ? ` (${data.company})` : ""}`,
    html: wrapper("de", body),
  };
}

export function autoReplyContactEmail(locale: string, data: { name: string }) {
  const de = locale === "de";
  const body = de
    ? `<p style="margin:0 0 16px;">Guten Tag ${escapeHtml(data.name || "")},</p>
       <p style="margin:0 0 16px;">vielen Dank für Ihre Anfrage bei DSF Media GmbH. Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb eines Werktags bei Ihnen.</p>
       <p style="margin:0;">Bei dringenden Anliegen erreichen Sie uns telefonisch unter +49 162 686 1853.</p>
       <p style="margin:24px 0 0;">Mit freundlichen Grüßen<br>Ihr DSF Media Team</p>`
    : `<p style="margin:0 0 16px;">Hello ${escapeHtml(data.name || "")},</p>
       <p style="margin:0 0 16px;">thank you for reaching out to DSF Media GmbH. We've received your message and typically respond within one business day.</p>
       <p style="margin:0;">For urgent matters, you can reach us by phone at +49 162 686 1853.</p>
       <p style="margin:24px 0 0;">Best regards,<br>The DSF Media team</p>`;

  return {
    subject: de ? "Ihre Anfrage bei DSF Media GmbH ist eingegangen" : "We've received your request — DSF Media GmbH",
    html: wrapper(locale, body),
  };
}

// --- Karriere (job application) ---

export function adminApplicationEmail(data: {
  name: string;
  phone: string;
  location: string;
  position: string;
  experience: string;
  availableFrom: string;
  license: string;
  hasResume: boolean;
}) {
  const body = `
    <p style="margin:0 0 16px;font-weight:bold;color:#7FE0DA;">Neue Bewerbung über das Karriere-Formular</p>
    <table style="border-collapse:collapse;width:100%;font-size:13px;">
      ${row("Name", data.name)}
      ${row("Telefon", data.phone)}
      ${row("Wohnort", data.location)}
      ${row("Position", data.position)}
      ${row("Erfahrung", data.experience)}
      ${rowAlways("Verfügbar ab", data.availableFrom)}
      ${rowAlways("Führerschein", data.license)}
      ${row("Lebenslauf", data.hasResume ? "Im Anhang" : "Nicht hochgeladen")}
    </table>
  `;
  return {
    subject: `[Bewerbung] ${data.position || "Karriere"} — ${data.name}`,
    html: wrapper("de", body),
  };
}

export function autoReplyApplicationEmail(locale: string, data: { name: string; position: string }) {
  const de = locale === "de";
  const body = de
    ? `<p style="margin:0 0 16px;">Guten Tag ${escapeHtml(data.name || "")},</p>
       <p style="margin:0 0 16px;">vielen Dank für Ihre Bewerbung als <strong>${escapeHtml(data.position || "")}</strong> bei DSF Media GmbH. Wir haben Ihre Angaben erhalten und prüfen diese zeitnah.</p>
       <p style="margin:0;">Bei Rückfragen erreichen Sie uns unter +49 162 686 1853.</p>
       <p style="margin:24px 0 0;">Mit freundlichen Grüßen<br>Ihr DSF Media Team</p>`
    : `<p style="margin:0 0 16px;">Hello ${escapeHtml(data.name || "")},</p>
       <p style="margin:0 0 16px;">thank you for applying for <strong>${escapeHtml(data.position || "")}</strong> at DSF Media GmbH. We've received your application and will review it shortly.</p>
       <p style="margin:0;">If you have questions in the meantime, call us at +49 162 686 1853.</p>
       <p style="margin:24px 0 0;">Best regards,<br>The DSF Media team</p>`;

  return {
    subject: de ? "Ihre Bewerbung bei DSF Media GmbH" : "Your application to DSF Media GmbH",
    html: wrapper(locale, body),
  };
}
