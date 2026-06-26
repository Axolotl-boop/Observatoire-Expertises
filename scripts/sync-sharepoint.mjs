#!/usr/bin/env node
/**
 * Synchronise les fichiers Markdown (.md) d'une bibliothèque de documents
 * SharePoint vers le dossier `content/` du dépôt, via Microsoft Graph.
 *
 * Authentification : flux "client credentials" (app registration Entra ID).
 * Permission Graph requise : Sites.Read.All (application) avec consentement admin.
 *
 * Variables d'environnement attendues :
 *   TENANT_ID          ID du tenant Entra ID
 *   CLIENT_ID          ID de l'application (app registration)
 *   CLIENT_SECRET      secret client de l'application
 *   SHAREPOINT_HOST    ex: contoso.sharepoint.com
 *   SHAREPOINT_SITE    chemin du site, ex: /sites/MonSite
 *   SHAREPOINT_DRIVE   (optionnel) nom de la bibliothèque, défaut: "Documents"
 *   SHAREPOINT_FOLDER  (optionnel) sous-dossier à parcourir, ex: "Agents IA"
 */

import fs from "node:fs";
import path from "node:path";

const {
  TENANT_ID,
  CLIENT_ID,
  CLIENT_SECRET,
  SHAREPOINT_HOST,
  SHAREPOINT_SITE,
  SHAREPOINT_DRIVE = "Documents",
  SHAREPOINT_FOLDER = "",
} = process.env;

const GRAPH = "https://graph.microsoft.com/v1.0";
const CONTENT_DIR = path.join(process.cwd(), "content");

// Nettoyage des valeurs : un copier-coller dans les secrets GitHub introduit
// souvent un espace, un retour à la ligne, un "https://" ou un "/" final.
function normalizeHost(v) {
  return (v || "")
    .trim()
    .replace(/^https?:\/\//i, "") // retire le protocole éventuel
    .replace(/\/.*$/, ""); // retire tout chemin éventuel
}
function normalizeSite(v) {
  let s = (v || "").trim();
  if (s && !s.startsWith("/")) s = `/${s}`; // doit commencer par /sites/... ou /teams/...
  return s.replace(/\/+$/, ""); // retire le(s) / final(aux)
}
const HOST = normalizeHost(SHAREPOINT_HOST);
const SITE = normalizeSite(SHAREPOINT_SITE);

function requireEnv() {
  const missing = [
    "TENANT_ID",
    "CLIENT_ID",
    "CLIENT_SECRET",
    "SHAREPOINT_HOST",
    "SHAREPOINT_SITE",
  ].filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`Variables d'environnement manquantes : ${missing.join(", ")}`);
    process.exit(1);
  }
}

async function getToken() {
  const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });
  const res = await fetch(url, { method: "POST", body });
  if (!res.ok) throw new Error(`Échec d'authentification: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.access_token;
}

async function graph(token, urlPath) {
  const res = await fetch(urlPath.startsWith("http") ? urlPath : `${GRAPH}${urlPath}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Graph ${urlPath} -> ${res.status} ${await res.text()}`);
  return res.json();
}

// Déduit le domaine SharePoint canonique du tenant à partir du jeton lui-même
// (webUrl du site racine). C'est insensible aux fautes de frappe dans le secret
// SHAREPOINT_HOST ; ce dernier ne sert plus que de repli si la déduction échoue.
async function resolveHost(token) {
  try {
    const root = await graph(token, `/sites/root?$select=webUrl`);
    const host = new URL(root.webUrl).hostname;
    if (HOST && host.toLowerCase() !== HOST.toLowerCase()) {
      console.warn(
        `ℹ️ Domaine déduit du jeton : ${host} (le secret SHAREPOINT_HOST="${HOST}" est ignoré).`,
      );
    }
    return host;
  } catch {
    return HOST; // repli sur la valeur fournie
  }
}

async function getSiteId(token) {
  const host = await resolveHost(token);
  const data = await graph(token, `/sites/${host}:${SITE}`);
  return data.id;
}

async function getDriveId(token, siteId) {
  const data = await graph(token, `/sites/${siteId}/drives`);
  const drive = data.value.find((d) => d.name === SHAREPOINT_DRIVE) || data.value[0];
  if (!drive) throw new Error("Aucune bibliothèque de documents trouvée.");
  return drive.id;
}

/** Parcourt récursivement un dossier et renvoie tous les fichiers .md. */
async function listMarkdown(token, driveId, folderPath) {
  const base = folderPath
    ? `/drives/${driveId}/root:/${encodeURI(folderPath)}:/children`
    : `/drives/${driveId}/root/children`;
  const files = [];
  let next = base;
  while (next) {
    const page = await graph(token, next);
    for (const item of page.value) {
      if (item.folder) {
        const childPath = folderPath ? `${folderPath}/${item.name}` : item.name;
        files.push(...(await listMarkdown(token, driveId, childPath)));
      } else if (item.name.toLowerCase().endsWith(".md")) {
        // On mémorise le sous-dossier d'origine pour éviter les collisions de noms.
        item.__folder = folderPath;
        files.push(item);
      }
    }
    next = page["@odata.nextLink"] || null;
  }
  return files;
}

async function downloadFile(item) {
  const url = item["@microsoft.graph.downloadUrl"];
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Téléchargement échoué pour ${item.name}: ${res.status}`);
  return res.text();
}

/** Nettoie un nom de fichier pour en faire un slug d'URL sûr. */
function safeName(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9.\- ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

async function main() {
  requireEnv();
  console.log("Authentification Microsoft Graph…");
  const token = await getToken();
  const siteId = await getSiteId(token);
  const driveId = await getDriveId(token, siteId);

  console.log("Listing des fichiers .md…");
  const files = await listMarkdown(token, driveId, SHAREPOINT_FOLDER);
  console.log(`${files.length} fichier(s) .md trouvé(s).`);

  fs.mkdirSync(CONTENT_DIR, { recursive: true });

  // On repart d'un dossier propre pour refléter exactement SharePoint.
  for (const existing of fs.readdirSync(CONTENT_DIR)) {
    if (existing.toLowerCase().endsWith(".md")) {
      fs.rmSync(path.join(CONTENT_DIR, existing));
    }
  }

  for (const item of files) {
    const content = await downloadFile(item);
    // Chemin relatif au dossier configuré, pour garder un identifiant unique
    // même si deux sous-dossiers contiennent un fichier du même nom.
    let rel = item.__folder || "";
    if (SHAREPOINT_FOLDER && rel.startsWith(SHAREPOINT_FOLDER)) {
      rel = rel.slice(SHAREPOINT_FOLDER.length).replace(/^\/+/, "");
    }
    const relPath = rel ? `${rel}/${item.name}` : item.name;
    const outName = `${safeName(relPath.replace(/\//g, "-")).replace(/\.md$/i, "")}.md`;
    fs.writeFileSync(path.join(CONTENT_DIR, outName), content, "utf8");
    console.log(`  ✓ ${relPath} -> content/${outName}`);
  }

  console.log("Synchronisation terminée.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
