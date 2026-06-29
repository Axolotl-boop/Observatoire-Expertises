# Fiche module — `Indexeur Dashboard` + hébergement (couche 6)

> **Type** : flux Power Automate (producteur du JSON, 2 passes) + décision d'hébergement · **Couche** : 6 (consultation), en aval de l'agent-annotateur.
> **But** : rendre le dashboard **live, mis à jour automatiquement chaque mois, accessible aux KR Owners et consultants**.
> **État** : ⬜ à câbler. Le HTML est déjà **live-ready** (loader hybride `fetch('dashboard-data.json')` → fallback snapshot embarqué). Le `dashboard-data.json` n'est pas encore produit automatiquement.
> **Fait foi** : `Contrat-dashboard-data` (schéma, provenance, passe captation §3) · `Fiche-Dashboard-consultation`.

---

## 1. Les 3 maillons de la mise en live

| Maillon | État | Quoi |
|---|---|---|
| **Producteur** | ✅ déjà auto | L'`Assembleur Format B` tourne en **Récurrence** (1er du mois, run 2026-07-01) ; l'**annotateur** émet le bloc `[[DASH_JSON]]` dans chaque `Format-B-<slug>-AAAA-MM.md`. **Rien à faire** : la matière se régénère seule chaque cycle. |
| **Indexeur** | ⬜ à câbler (§3) | Un flux qui, après le run Format B, lit les 6 fragments `[[DASH_JSON]]`, calcule le statut des sources, **assemble un seul `dashboard-data.json`** et le dépose dans la librairie d'hébergement. |
| **Hébergement** | ⬜ arbitrage (§2) | Une page ouvrable dans le navigateur, lisant ce JSON, accessible à l'audience interne. **Une seule dépendance** : un réglage côté Pierre-Louis. |

Le HTML lui-même est **prêt** : posé à côté du JSON, il se met à jour seul chaque mois **sans redéploiement** (il `fetch` le JSON au chargement). En local (double-clic), il retombe sur le snapshot embarqué.

---

## 2. Hébergement — arbitrage (à trancher avec Pierre-Louis)

Tout reste M365. Trois voies ; **une seule dépendance d'admin**.

### Voie A — Librairie SharePoint à script autorisé *(reco ROI, rapide)*
Déposer `dashboard-veille-tribe.html` + `dashboard-data.json` dans une librairie du site **TribeExpertises** ; partager le lien du `.html`.
- **Accès** = permissions de la librairie → déjà le modèle « ouvert à tous sauf Pipe-Boond » (DLP go, v4.2). KR Owners + consultants couverts d'office.
- **`fetch` same-origin** : le HTML et le JSON dans la même librairie → la lecture du JSON marche, avec l'auth M365 de l'utilisateur.
- **Dépendance unique** : Pierre-Louis active le **custom scripting** sur le site (`Set-SPOSite -DenyAddAndCustomizePages $false`). Sans ça, SharePoint moderne **n'exécute pas** le JS d'un `.html` ouvert depuis une librairie.
- ⚠ **Risque à vérifier** : certains tenants **rebloquent** le custom script automatiquement (politique 24 h) ou l'interdisent. Si c'est le cas → Voie B.

### Voie B — Power Pages *(durable, si A bloqué par la politique tenant)*
Un site interne Power Pages, auth Azure AD restreinte aux utilisateurs WeFiiT, qui sert le HTML et lit le JSON.
- **+** Robuste, pérenne, auth propre. **−** Produit/licence en plus, implique l'IT, plus lourd à monter.
- À sortir **seulement si** la politique tenant tue la Voie A.

### Voie C — Onglet Teams *(surface de distribution, par-dessus A ou B)*
Épingler la page (URL de A ou B) comme onglet **Site web** dans le canal Teams de la Tribe → c'est *là* que KR Owners et consultants la trouvent au quotidien.

**Reco** : **A** pour être live ce cycle ; **B** en repli si la politique bloque ; **C** dans tous les cas pour la distribution. → **Action Pierre-Louis** : (1) tester le toggle custom script sur TribeExpertises, (2) dire si la politique tenant le tient.

---

## 3. Indexeur Power Automate — câblage (2 passes)

Cloné sur le patron des assembleurs. **Ne touche pas** au flux Format B validé.

### 3.0 Déclencheur
- **`Recurrence`** Month/1, Time zone Paris, **Start time `2026-07-01T09:00:00Z`** (= ~3 h après le run Format B de 06:00Z, le temps que les 6 digests + annotations soient déposés). Décalage = filet anti-course, même logique que les snapshots vs Format B.
- *Alternative plus serrée (mais couplée)* : greffer l'indexeur **en fin du flux Format B** (après le dépôt des 6 `.md` annotés) → zéro pari de timing. À éviter en V1 pour ne pas re-toucher un flux en prod ; on décale.

### 3.1 Variables de cycle (identiques à l'assembleur — cible le **mois précédent**)
```
mois  = formatDateTime(addToTime(utcNow(), -1, 'Month'), 'yyyy-MM')      // ex. 2026-06
trim  = concat('T', string(div(add(int(substring(addToTime(utcNow(),-3,'Month'),5,2)),2),3)), '-', substring(addToTime(utcNow(),-3,'Month'),0,4))
// (réutilise la même logique -3 mois que l'assembleur pour les dossiers AAAA-T# de la passe captation)
```

### 3.2 PASSE 1 — digest (le cœur, à livrer en premier)
`Apply to each` sur la liste des 6 slugs. Map slug → dossier :
`pm→Product-Management · productai→Product-AI · productops→Product-Ops · pmm→PMM · qa→QA · datapm→Data-PM`

Pour chaque slug :
1. **Chemin** : `02-Digests-par-expertise/<dossier>/<mois>/Format-B-<slug>-<mois>.md`
2. **Get file content** (+ `Get file properties` pour le lien). Garde si absent → run-after `has failed`/`is skipped` → on pousse un objet `{slug, thinCycle:true, ...}` au lieu de planter (philosophie sentinel).
3. **Extraire le JSON** entre sentinelles (expression câblable telle quelle) :
   ```
   json(
     trim(
       first(
         split(
           last(split(<contenu-texte>, '[[DASH_JSON]]')),
           '[[/DASH_JSON]]'
         )
       )
     )
   )
   ```
   *(si `Get file content` renvoie du base64 dans `$content` : envelopper `<contenu-texte>` = `base64ToString(...?['$content'])`.)*
4. **Enrichir** (l'annotateur ne pose pas label/date/url) via `union` :
   ```
   union(
     <json-extrait>,
     json(concat('{"label":"', <label>, '","date":"', <dateFR>, '","period":"', variables('mois'),
                 '","mdName":"Format-B-', items(...), '-', variables('mois'), '.md',
                 '","mdUrl":"', body('Get_file_properties')?['{Link}'], '"}'))
   )
   ```
   où `<dateFR>` :
   ```
   concat(split('—,janvier,février,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre', ',')[int(substring(variables('mois'),5,2))], ' ', substring(variables('mois'),0,4))
   ```
5. **Append** l'objet enrichi à `arrExpertises` (variable Array).

> Le squelette littéral des sentinelles `[[DASH_JSON]]` / `[[/DASH_JSON]]` est ce qui rend l'extraction fiable — on contraint la forme, on ne parse pas la prose (principe Voie C). C'est ce qui a été **validé sur le run réel 2026-06** : les 6 fragments sont bien formés.

### 3.3 PASSE 2 — captation (statut des sources) — *Phase 2, peut être différée*
Déterministe, indépendante du digest (contrat §3). Pour chaque catégorie d'un bloc, parcourir le **dossier du cycle** et poser `ok`/`si` :

| Catégorie | Dossier scanné | Capté = |
|---|---|---|
| Newsletters | `Newsletters-pré-digérées/<mois>/` | ≥1 fiche taguée du slug (matcher l'**adresse expéditeur complète** — piège Substack, contrat §3.3) |
| Pipe WeFiiT | `Notes-PAD-retraitées/<mois>/` | synthèse présente |
| Concurrence | `Veille-concurrentielle/<trim>/` | ≥1 fiche du cabinet |
| Emploi | `Veille-emploi/<trim>/` + `Rapports-Emploi/` | source présente dans le snapshot du trimestre |
| State of X | `Rapports-State-of-X/` | rapport présent |

Écrire les `srcs[].st` dans le JSON. **Tant que la passe 2 n'est pas câblée**, le HTML affiche les statuts en maquette, libellé explicite « passe captation non câblée » → aucun mensonge.

### 3.4 Sortie
```
Compose data = {
  "generatedAt": formatDateTime(utcNow(),'dd/MM/yyyy'),
  "cycle": variables('mois'),
  "expertises": variables('arrExpertises')
}
```
→ **Create file** (overwrite) `dashboard-data.json` dans la **librairie d'hébergement** (§2), body = `string(outputs('Compose_data'))`.

---

## 4. Phasage recommandé (ROI)

1. **Phase 1 = LIVE ce cycle** : hébergement (Voie A) + indexeur **passe 1 seule** + dépôt du JSON. Le dashboard montre le vrai contenu des 6 digests + la couche de confiance, auto-rafraîchi chaque mois. Statuts de sources = maquette assumée.
2. **Phase 2** : passe captation → vrais statuts `ok`/`si`.
3. **Phase 3 (déjà au backlog)** : fix `vendor` à l'annotateur (les `⚠ poussé par` apparaîtront alors dans l'UI, déjà prête).

La Phase 1 suffit à répondre à la demande « live + auto-mensuel + accessible ». Les phases 2-3 enrichissent sans bloquer.

---

## 5. Dépendances
- **Pierre-Louis** : trancher l'hébergement (toggle custom script — Voie A, ou Power Pages — Voie B) + politique tenant.
- **Axel** : câbler l'indexeur (passe 1 d'abord), tester sur le cycle 2026-06 déjà déposé (les 6 `.md` existent), valider le JSON produit contre le contrat.
- **HTML** : aucune — déjà live-ready (loader hybride). Le poser à côté du JSON suffit.

---
*Fiche v0.1 — couche 6. À promouvoir dans le projet et à compléter au câblage (anatomie exacte du flux, captures). État vivant → SPECS ; schéma → `Contrat-dashboard-data`.*
