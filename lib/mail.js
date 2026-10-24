import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);

const oneLine = (s = "") => String(s).replace(/[\r\n]+/g, " ");

export async function sendLeadEmail(lead) {
  const t = getTransporter();
  if (!t) return false; // email set nahi hai, lead phir bhi DB me save rahegi

  const to = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  const rows = [
    ["Name", lead.name],
    ["Email", lead.email || "-"],
    ["Phone", lead.phone || "-"],
    ["Service", lead.service || "-"],
    ["Budget", lead.budget || "-"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px">
      <h2 style="margin:0 0 16px">New website enquiry</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 16px 6px 0;color:#666">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#666">Message</p>
      <div style="white-space:pre-wrap;padding:12px;background:#f5f5f5;border-radius:8px">${esc(lead.message)}</div>
    </div>`;

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${lead.message}`;

  await t.sendMail({
    from: `"Ritik Web Consultancy" <${process.env.SMTP_USER}>`,
    to,
    replyTo: lead.email || undefined,
    subject: `New enquiry from ${oneLine(lead.name)}`,
    html,
    text,
  });
  return true;
}