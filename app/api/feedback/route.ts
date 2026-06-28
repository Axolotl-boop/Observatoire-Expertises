import { auth } from "@/auth";
import { addFeedback } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Enregistre un feedback laissé via le formulaire intégré (utilisateur SSO). */
export async function POST(req: Request) {
  const session = await auth();
  const body = (await req.json().catch(() => ({}))) as { message?: string; path?: string };
  const message = (body.message || "").trim();
  if (!message) return new Response("Message vide", { status: 400 });
  try {
    await addFeedback(
      message.slice(0, 4000),
      session?.user?.email ?? null,
      body.path ? String(body.path).slice(0, 200) : null,
    );
  } catch {
    return new Response("Erreur d'enregistrement", { status: 500 });
  }
  return Response.json({ ok: true });
}
