import { auth } from "@/auth";
import { exportEvents } from "@/lib/db";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "axel.alizier@wefiit.com")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

function csvCell(v: string | null): string {
  const s = (v ?? "").replace(/"/g, '""');
  return `"${s}"`;
}

export async function GET() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  if (!email || !ADMIN_EMAILS.includes(email)) {
    return new Response("Accès réservé.", { status: 403 });
  }

  const rows = await exportEvents();
  const header = "date,utilisateur,evenement,cible,page";
  const body = rows
    .map((r) =>
      [r.ts, r.user_email, r.event, r.target, r.path].map((c) => csvCell(c)).join(","),
    )
    .join("\n");
  const csv = `﻿${header}\n${body}\n`; // BOM pour Excel

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="observatoire-events.csv"',
    },
  });
}
