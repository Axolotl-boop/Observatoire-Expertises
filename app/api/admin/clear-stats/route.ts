import { auth } from "@/auth";
import { clearEvents } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "axel.alizier@wefiit.com")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

/** Efface toutes les statistiques de tracking (admin only). */
export async function POST() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  if (!email || !ADMIN_EMAILS.includes(email)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const deleted = await clearEvents();
  return Response.json({ deleted });
}
