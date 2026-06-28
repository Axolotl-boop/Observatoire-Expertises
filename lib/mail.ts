import nodemailer from "nodemailer";

/**
 * Envoi d'email via SMTP (mêmes variables que la GitHub Action de récap).
 * Variables : MAIL_SERVER, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD.
 * Sans MAIL_SERVER, l'envoi est ignoré silencieusement (dégradation propre).
 */
export const mailEnabled = Boolean(process.env.MAIL_SERVER && process.env.MAIL_USERNAME);

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  if (!mailEnabled || !opts.to) return false;
  const port = Number(process.env.MAIL_PORT || "587");
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port,
    secure: port === 465,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: `Observatoire des Expertises <${process.env.MAIL_USERNAME}>`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });
  return true;
}
