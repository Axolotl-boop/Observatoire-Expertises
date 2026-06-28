import { auth } from "@/auth";
import { addFeedback } from "@/lib/db";
import { sendMail } from "@/lib/mail";

export const dynamic = "force-dynamic";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Destinataire des notifications de feedback. */
function notifyTo(): string {
  return (
    process.env.FEEDBACK_NOTIFY_TO ||
    process.env.MAIL_TO ||
    (process.env.ADMIN_EMAILS || "").split(",")[0]?.trim() ||
    ""
  );
}

/** Enregistre un feedback laissé via le formulaire intégré (utilisateur SSO). */
export async function POST(req: Request) {
  const session = await auth();
  const body = (await req.json().catch(() => ({}))) as { message?: string; path?: string };
  const message = (body.message || "").trim();
  if (!message) return new Response("Message vide", { status: 400 });

  const email = session?.user?.email ?? null;
  const path = body.path ? String(body.path).slice(0, 200) : null;

  try {
    await addFeedback(message.slice(0, 4000), email, path);
  } catch {
    return new Response("Erreur d'enregistrement", { status: 500 });
  }

  // Notification email (best-effort, n'interrompt jamais la réponse).
  try {
    const to = notifyTo();
    if (to) {
      await sendMail({
        to,
        subject: "Nouveau feedback — Observatoire des Expertises",
        replyTo: email || undefined,
        html: `
          <p><strong>De :</strong> ${escapeHtml(email || "(anonyme)")}</p>
          ${path ? `<p><strong>Page :</strong> ${escapeHtml(path)}</p>` : ""}
          <p><strong>Message :</strong></p>
          <p style="white-space:pre-wrap;border-left:3px solid #c8d6ff;padding-left:12px">${escapeHtml(
            message,
          )}</p>
        `,
      });
    }
  } catch {
    // Email best-effort : on ignore tout échec d'envoi.
  }

  return Response.json({ ok: true });
}
