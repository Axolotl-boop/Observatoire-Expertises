import { auth } from "@/auth";
import { logEvent } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = (await req.json().catch(() => ({}))) as {
      event?: string;
      target?: string;
      path?: string;
    };
    if (!body.event) return new Response(null, { status: 204 });

    await logEvent({
      user_email: session?.user?.email ?? null,
      event: String(body.event).slice(0, 40),
      target: body.target ? String(body.target).slice(0, 200) : null,
      path: body.path ? String(body.path).slice(0, 200) : null,
    });
  } catch {
    // On n'interrompt jamais l'expérience pour un échec de tracking.
  }
  return new Response(null, { status: 204 });
}
