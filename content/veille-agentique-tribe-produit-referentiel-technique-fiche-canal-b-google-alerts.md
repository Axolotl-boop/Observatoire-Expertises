# Fiche module — `Canal B` — 12 Google Alerts

> **Type** : configuration (Google Alerts) — pas un flux Power Automate, mais un **module de captation**  ·  **Couche** : 1
> **État** : ✅ prod  ·  **Responsable** : Axel
> **Aval** : alimente le flux `Veille concurrence — Email` *(cf. `Fiche-Flux-Veille-concurrence-Email`)*

## Rôle
Surveiller, pour **chacun des 12 cabinets**, les mouvements **structurels** « qui bouge » (M&A, levée, nomination, ouverture/fermeture) via une **alerte Google** par cabinet. Le **Canal B est systématique pour tous** — contrairement au RSS (si feed) et au Canal A newsletter (si dispo), l'alerte presse couvre l'événementiel que ni le blog ni la newsletter ne portent.

## Place dans la chaîne
- **Produit** : des e-mails d'alerte Google → règle Outlook serveur → dossier `Veille-concurrence` → flux e-mail → agent `cr1c3_VeilleconcurrenceCaptation` → fiche `Veille-concurrentielle/AAAA-MM/`.

## Règle de décision de canal *(rappel)*
Parole **publiée** → **RSS si feed** → sinon **Canal A** (newsletter e-mail) → sinon **passe humaine**. **Canal B (alerte) = systématique pour les 12** (structurel). Surfaces comportementales profondes (recrutement LinkedIn, talks) = **passe humaine** (CGU).

## Les 12 alertes — termes exacts
| Cabinet | Terme d'alerte | needle mapping |
|---|---|---|
| Thiga | `Thiga` | `thiga` |
| Hubvisory | `Hubvisory` | `hubvisory` |
| Wivoo | `Wivoo` | `wivoo` |
| Yield Advisory | `"Yield Advisory"` | `yield advisory` |
| Qestit | `Qestit` | `qestit` |
| KP2i | `"KP2i"` | `kp2i` |
| Smartesting | `Smartesting` | `smartesting` |
| Hymaïa | `Hymaia` | `hymaia` |
| Converteo | `Converteo` | `converteo` |
| Artefact | `Artefact (conseil OR data OR "intelligence artificielle")` | `artefact` |
| AI Builders | `"AI Builders" "Stéphane Roder"` | `ai builders` |
| Eleven | `"Eleven Strategy"` | `eleven strategy` |

## Garde-fou de désambiguïsation *(leçon gravée)*
Tout **désambiguïsateur non quoté** risque le **fuzzy-match** de Google sur un mot courant. Cas : `"AI Builders" Roder` → Google fuzzy-matchait « Roder » → « order » (temporal order, export control order…) → flood de bruit. **Fix** : quoter **toutes** les expressions (`"AI Builders" "Stéphane Roder"`). **Prochain suspect** : `Artefact` (nom commun *build/data artefact*) — surveiller, resserrer si flood.

---

## Dépendances & renvois
- **Aval** : `Fiche-Flux-Veille-concurrence-Email` (mapping from/subject → slug ; needle = terme d'objet) · `Fiche-Agent-captation-concurrence`.
- **Docs fait-foi** : **SPECS §8.1** (termes exacts) · **§6** (règle de canal, re-qualification AI Builders).

## Points d'attention / dette
- **Bruit Artefact** à surveiller au 1er flood (resserrer le terme si besoin).
- L'alerte ne porte qu'un **snippet** → c'est l'agent captation qui décide via le gate `[[PAS_DE_FICHE]]` (robuste au bruit d'homonymie, validé sur l'alerte AI Builders « nom commun »).
