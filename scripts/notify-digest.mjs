#!/usr/bin/env node
/**
 * Détecte l'arrivée d'un nouveau mois de digest (dossier 02-Digests-par-expertise)
 * après une synchro, et expose des sorties GitHub Actions pour déclencher un email.
 *
 * - Au premier passage (pas de marqueur), initialise sans notifier.
 * - Ensuite, si le mois de digest le plus récent est postérieur au dernier notifié,
 *   met à jour le marqueur (content/_notified.json) et émet new_month / month_label.
 */
import fs from "node:fs";
import path from "node:path";

const CONTENT = path.join(process.cwd(), "content");
const indexPath = path.join(CONTENT, "_index.json");
const notifiedPath = path.join(CONTENT, "_notified.json");

function latestDigestMonth() {
  if (!fs.existsSync(indexPath)) return null;
  const idx = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  let max = null;
  for (const v of Object.values(idx)) {
    const p = v.path || "";
    if (!p.includes("02-Digests-par-expertise")) continue;
    if (/report/i.test(p)) continue;
    const m = p.match(/(20\d\d)-(\d{2})/);
    if (!m) continue;
    const ym = `${m[1]}-${m[2]}`;
    if (!max || ym > max) max = ym;
  }
  return max;
}

function monthLabel(ym) {
  const m = ym.match(/^(\d{4})-(\d{2})$/);
  if (!m) return ym;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, 1);
  const s = d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function setOutput(key, value) {
  const f = process.env.GITHUB_OUTPUT;
  if (f) fs.appendFileSync(f, `${key}=${value}\n`);
}

/**
 * Récupère la liste des abonnés depuis le site déployé (table Postgres).
 * Renvoie une chaîne « a@x,b@y » prête pour le champ `to:` de l'email.
 * En cas d'absence de config ou d'erreur, renvoie "" (repli sur MAIL_TO).
 */
async function fetchRecipients() {
  const base = (process.env.SITE_URL || "").replace(/\/+$/, "");
  const secret = process.env.CRON_SECRET || "";
  if (!base) return "";
  try {
    const url = `${base}/api/cron/subscribers`;
    const res = await fetch(url, {
      headers: secret ? { authorization: `Bearer ${secret}` } : {},
    });
    if (!res.ok) {
      console.log(`Abonnés indisponibles (HTTP ${res.status}).`);
      return "";
    }
    const data = await res.json();
    const emails = Array.isArray(data.emails) ? data.emails : [];
    console.log(`${emails.length} abonné(s) récupéré(s).`);
    return emails.join(",");
  } catch (e) {
    console.log(`Échec de récupération des abonnés : ${e.message}`);
    return "";
  }
}

const latest = latestDigestMonth();
if (!latest) {
  console.log("Aucun digest détecté.");
  setOutput("new_month", "");
  process.exit(0);
}

let lastMonth = null;
if (fs.existsSync(notifiedPath)) {
  try {
    lastMonth = JSON.parse(fs.readFileSync(notifiedPath, "utf8")).lastMonth || null;
  } catch {
    lastMonth = null;
  }
}

if (lastMonth === null) {
  fs.writeFileSync(notifiedPath, `${JSON.stringify({ lastMonth: latest }, null, 2)}\n`);
  console.log(`Initialisation du marqueur à ${latest} (pas d'email au 1er passage).`);
  setOutput("new_month", "");
  process.exit(0);
}

if (latest > lastMonth) {
  fs.writeFileSync(notifiedPath, `${JSON.stringify({ lastMonth: latest }, null, 2)}\n`);
  console.log(`Nouveau digest détecté : ${latest} (précédent : ${lastMonth}).`);
  const recipients = await fetchRecipients();
  setOutput("new_month", latest);
  setOutput("month_label", monthLabel(latest));
  setOutput("recipients", recipients);
} else {
  console.log(`Pas de nouveau digest (récent=${latest}, déjà notifié=${lastMonth}).`);
  setOutput("new_month", "");
}
