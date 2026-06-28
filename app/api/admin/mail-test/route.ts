import { auth } from "@/auth";
import { mailEnabled, mailFrom, mailTransport, sendMail } from "@/lib/mail";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "axel.alizier@wefiit.com")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

function recipient(): string {
  return (
    process.env.FEEDBACK_NOTIFY_TO ||
    process.env.MAIL_TO ||
    (process.env.ADMIN_EMAILS || "").split(",")[0]?.trim() ||
    ""
  );
}

/**
 * Diagnostic d'envoi d'email (admin only). Renvoie l'état de la config SMTP et
 * le résultat (ou l'erreur exacte) d'un envoi de test, sans exposer de secret.
 */
export async function GET() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  if (!email || !ADMIN_EMAILS.includes(email)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const to = recipient();
  const config = {
    mailEnabled,
    transport: mailTransport,
    RESEND_API_KEY_present: Boolean(process.env.RESEND_API_KEY),
    from_resolu: mailFrom(),
    MAIL_SERVER: process.env.MAIL_SERVER || "(absent)",
    MAIL_USERNAME_present: Boolean(process.env.MAIL_USERNAME),
    recipient_resolu: to || "(aucun — définir FEEDBACK_NOTIFY_TO)",
  };

  if (!mailEnabled) {
    return Response.json({
      ...config,
      result: "non envoyé : ni RESEND_API_KEY ni SMTP (MAIL_SERVER+MAIL_USERNAME) côté Vercel",
    });
  }
  if (!to) {
    return Response.json({
      ...config,
      result: "non envoyé : aucun destinataire (définir FEEDBACK_NOTIFY_TO)",
    });
  }

  try {
    await sendMail({
      to,
      subject: "Test SMTP — Observatoire des Expertises",
      html: "<p>Ceci est un email de test envoyé depuis l'Observatoire des Expertises.</p>",
    });
    return Response.json({ ...config, result: `OK — email de test envoyé à ${to}` });
  } catch (e) {
    return Response.json({
      ...config,
      result: "ÉCHEC de l'envoi",
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
