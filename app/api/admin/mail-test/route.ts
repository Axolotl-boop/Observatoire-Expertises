import { auth } from "@/auth";
import { mailEnabled, sendMail } from "@/lib/mail";

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
    MAIL_SERVER: process.env.MAIL_SERVER || "(absent)",
    MAIL_PORT: process.env.MAIL_PORT || "(absent → 587 par défaut)",
    MAIL_USERNAME_present: Boolean(process.env.MAIL_USERNAME),
    MAIL_PASSWORD_present: Boolean(process.env.MAIL_PASSWORD),
    recipient_resolu: to || "(aucun — définir FEEDBACK_NOTIFY_TO)",
  };

  if (!mailEnabled) {
    return Response.json({
      ...config,
      result: "non envoyé : MAIL_SERVER et/ou MAIL_USERNAME manquant côté Vercel",
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
