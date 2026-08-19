const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 587 ? false : true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

async function sendMail({ to, subject, html, replyTo }) {
  const t = getTransporter();
  if (!t) {
    console.warn('SMTP not configured — skipping email send. Set SMTP_HOST/SMTP_USER/SMTP_PASS in .env');
    return;
  }
  try {
    await t.sendMail({
      from: `"K Charging Solutions" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
  } catch (err) {
    console.error('Email send failed:', err.message);
  }
}

module.exports = { sendMail };
