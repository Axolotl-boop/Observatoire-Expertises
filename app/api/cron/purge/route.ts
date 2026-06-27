import { purgeOldEvents } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Purge des événements anciens (rétention RGPD). Appelé par le cron Vercel.
 * Sécurisé par CRON_SECRET : Vercel envoie « Authorization: Bearer <CRON_SECRET> »
 * quand la variable est définie.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const header = req.headers.get("authorization");
    if (header !== `Bearer ${secret}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
  const months = Number(process.env.RETENTION_MONTHS || "12");
  const deleted = await purgeOldEvents(months);
  return Response.json({ deleted, retentionMonths: months });
}
