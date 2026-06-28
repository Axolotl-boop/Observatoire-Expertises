import nodemailer from "nodemailer";
import { Resend } from "resend";

/**
 * Envoi d'email avec deux transports possibles, par ordre de priorité :
 *  1. Resend (RESEND_API_KEY) — recommandé, auto-suffisant.
 *  2. SMTP (MAIL_SERVER, MAIL_USERNAME, MAIL_PASSWORD, MAIL_PORT) — repli.
 * Sans configuration, l'envoi est ignoré silencieusement (dégradation propre).
 */
const resendKey = process.env.RESEND_API_KEY || "";
const smtpReady = Boolean(process.env.MAIL_SERVER && process.env.MAIL_USERNAME);

export const mailEnabled = Boolean(resendKey) || smtpReady;
export const mailTransport = resendKey ? "resend" : smtpReady ? "smtp" : "aucun";

/** Adresse d'expédition (Resend exige un domaine vérifié, sinon onboarding@resend.dev). */
function fromAddress(): string {
  return (
    process.env.RESEND_FROM ||
    (process.env.MAIL_USERNAME
      ? `Observatoire des Expertises <${process.env.MAIL_USERNAME}>`
      : "Observatoire des Expertises <onboarding@resend.dev>")
  );
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  if (!opts.to) return false;

  if (resendKey) {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
    return true;
  }

  if (smtpReady) {
    const port = Number(process.env.MAIL_PORT || "587");
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVER,
      port,
      secure: port === 465,
      auth: { user: process.env.MAIL_USERNAME, pass: process.env.MAIL_PASSWORD },
    });
    await transporter.sendMail({
      from: fromAddress(),
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return true;
  }

  return false;
}
