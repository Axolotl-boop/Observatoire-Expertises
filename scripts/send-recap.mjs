#!/usr/bin/env node
/**
 * Envoie le récap mensuel aux abonnés via l'API Resend.
 * Variables d'environnement :
 *   RESEND_API_KEY  (requis)
 *   RESEND_FROM     (expéditeur ; domaine vérifié dans Resend) — requis pour la livraison
 *   RECIPIENTS      (liste d'emails séparés par des virgules)
 *   MONTH_LABEL     (ex. « Juin 2026 »)
 *   SITE_URL        (lien vers le portail)
 *   RECAP_TO        (optionnel ; adresse du champ « to », défaut = email de RESEND_FROM)
 */
const apiKey = process.env.RESEND_API_KEY || "";
const from = process.env.RESEND_FROM || "";
const monthLabel = process.env.MONTH_LABEL || "ce mois";
const siteUrl = process.env.SITE_URL || "";

const recipients = (process.env.RECIPIENTS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!apiKey) {
  console.log("RESEND_API_KEY absent — envoi ignoré.");
  process.exit(0);
}
if (!from) {
  console.log("RESEND_FROM absent (domaine vérifié requis) — envoi ignoré.");
  process.exit(0);
}
if (recipients.length === 0) {
  console.log("Aucun abonné — rien à envoyer.");
  process.exit(0);
}

// Adresse pour le champ « to » (Resend l'exige) ; les abonnés sont en copie cachée.
const fromEmail = (from.match(/<([^>]+)>/)?.[1] || from).trim();
const to = [process.env.RECAP_TO || fromEmail];

const html = `
  <p>Bonjour,</p>
  <p>Le nouveau digest mensuel (<strong>${monthLabel}</strong>) est disponible sur
  l'Observatoire des Expertises.</p>
  ${siteUrl ? `<p><a href="${siteUrl}">Ouvrir l'Observatoire des Expertises</a></p>` : ""}
`;

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to,
    bcc: recipients,
    subject: `Le digest de ${monthLabel} est disponible`,
    html,
  }),
});

if (!res.ok) {
  const body = await res.text();
  console.error(`Échec de l'envoi Resend (HTTP ${res.status}) : ${body}`);
  process.exit(1);
}
console.log(`Récap « ${monthLabel} » envoyé à ${recipients.length} abonné(s).`);
