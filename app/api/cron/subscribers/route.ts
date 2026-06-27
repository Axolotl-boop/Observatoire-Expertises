import { getSubscribers } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Liste des abonnés au récap mensuel, consommée par la GitHub Action d'envoi.
 * Sécurisée par CRON_SECRET : « Authorization: Bearer <CRON_SECRET> »
 * ou « ?secret=<CRON_SECRET> ». Route sous /api/cron pour contourner le SSO.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const header = req.headers.get("authorization");
    const param = new URL(req.url).searchParams.get("secret");
    if (header !== `Bearer ${secret}` && param !== secret) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
  const emails = await getSubscribers();
  return Response.json({ emails });
}
