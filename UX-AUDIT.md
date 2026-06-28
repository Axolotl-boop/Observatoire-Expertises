# Audit UX/UI — Observatoire des Expertises

> Briefing destiné à Claude Code. Stack : Next.js 15 (App Router) · React 19 · Tailwind v4 · next-auth v5 · Neon.
> Chaque tâche est autonome : fichier ciblé → problème → action → critère d'acceptation.
> Traiter dans l'ordre P1 → P2 → P3. Ne pas toucher au pipeline de contenu (`lib/content.ts`) ni à l'auth.

---

## Synthèse priorisée

| #  | Item | Axe | Prio | Effort | Fichier principal |
|----|------|-----|------|--------|-------------------|
| 1  | Aucun état « page active » dans la nav | Orientation | **P1** | S | `app/layout.tsx` (+ nouveau `NavLink`) |
| 2  | Les blocs digest s'ouvrent par paire (comportement inattendu) | Interaction | **P1** | S | `components/ExpertiseDigests.tsx` |
| 3  | Home sans orientation : 4 sections invisibles hors nav | Adoption | **P1** | M | `app/page.tsx` (+ nouveau `SectionCards`) |
| 4  | Chrome authentifié affiché sur `/login` | Cohérence d'état | **P2** | M | route group `app/(app)/` |
| 5  | Focus clavier invisible (pas de `:focus-visible`) | A11y | **P2** | S | `app/globals.css` |
| 6  | Contrastes insuffisants (`text-gray-400` porteur de sens) | A11y | **P2** | S | composants listés |
| 7  | Modale feedback non accessible (pas de `role=dialog`, focus non piégé) | A11y | **P2** | M | `components/FeedbackButton.tsx` |
| 8  | Chips de filtre dupliqués + incohérents (electrique vs marine, tailles) | Cohérence / dette | **P3** | M | nouveau `components/Chip.tsx` |
| 9  | Newsletter : page d'entrée sans titre ni date | Lisibilité | **P3** | S | `app/entries/[slug]/page.tsx` |
| 10 | BarChart : labels écrasés sur mobile | Responsive | **P3** | S | `components/Pouls.tsx` |
| 11 | Titre dupliqué (header + h1) sur la home | Polish | **P3** | XS | `app/page.tsx` |
| 12 | Layout shift footer au chargement de l'abonnement | Polish | **P3** | XS | `components/SubscribeButton.tsx` |

Légende : S = < 30 min · M = 1–2 h · XS = < 10 min.

---

## P1 — À corriger en premier

### 1. État « page active » dans la navigation

**Fichier** : `app/layout.tsx` + nouveau `components/NavLink.tsx`
**Problème** : les liens de la sous-nav (Kiosque / Pouls / Concurrence / Métiers) n'ont qu'un état `hover`. Rien n'indique la rubrique courante. L'utilisateur perd le fil de sa position dans le portail.
**Action** :
1. Créer un composant client `NavLink` qui lit `usePathname()` et applique un style actif + `aria-current="page"`.
2. Remplacer les `<Link>` de la `<nav>` dans `layout.tsx` par ce `NavLink`.

```tsx
// components/NavLink.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "font-title font-medium transition rounded focus-visible:outline-2 focus-visible:outline-electrique focus-visible:outline-offset-2",
        active
          ? "text-electrique border-b-2 border-electrique pb-0.5"
          : "text-gray-600 hover:text-electrique",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
```

**Critère d'acceptation** : sur `/kiosque`, le lien « Le kiosque à journaux » est visuellement distinct (couleur electrique + soulignement) et porte `aria-current="page"` ; les autres restent gris.

---

### 2. Les blocs du digest s'ouvrent par paire au lieu d'individuellement

**Fichier** : `components/ExpertiseDigests.tsx`
**Problème** : l'état d'ouverture est `openRows: [boolean, boolean]`, indexé par **ligne** de la grille. Les blocs 0–1 (« Problématiques récurrentes » + « Convictions à challenger ») partagent `row 0`, les blocs 2–3 partagent `row 1`. Conséquence : cliquer le chevron d'un bloc **déplie aussi son voisin**. C'est probablement un choix volontaire pour aligner les hauteurs en grille 2 colonnes — mais côté utilisateur ça se lit comme un bug (« je clique sur une carte, deux s'ouvrent »).
**Action** : passer à une ouverture **indépendante par bloc**. La grille a déjà `items-start`, donc des hauteurs désynchronisées ne casseront pas la mise en page.
- Remplacer `openRows: [boolean, boolean]` + `toggleRow` par un état par clé de bloc, ex. `useState<Record<BlockKey, boolean>>({})`.
- Dans le `.map`, passer `open={!!openMap[block.key]}` et `onToggle={() => setOpenMap(m => ({ ...m, [block.key]: !m[block.key] }))}`.
- Supprimer la logique `const row = i < 2 ? 0 : 1`.

**Critère d'acceptation** : ouvrir un bloc n'affecte aucun autre bloc ; les 4 peuvent être ouverts/fermés indépendamment ; la grille reste alignée en haut.

---

### 3. Page d'accueil : rendre les 4 sections visibles et expliquer le portail

**Fichier** : `app/page.tsx` + nouveau `components/SectionCards.tsx`
**Problème** : un nouvel arrivant WeFiiT atterrit directement sur les filtres d'expertise + un bloc « signaux » dense, sans comprendre ce qu'est l'Observatoire ni que 4 rubriques existent (elles ne vivent que dans la sous-nav, facile à manquer). La tagline « Là où le discours du marché rencontre nos données » est jolie mais n'oriente pas.
**Action** : ajouter, **sous le `h1` et avant `ExpertiseDigests`**, une grille de 4 cartes d'entrée (une par rubrique) avec emoji + titre + phrase d'une ligne. Réutiliser les libellés et baselines déjà présents dans les pages :
- 🗞️ Le kiosque à journaux — « Ce qui se dit. Ce qu'on en retient. »
- 🩺 Le pouls du marché — « La demande réelle, directement de notre pipe commercial. »
- 💥 Concurrence — « Ce que font les autres cabinets, suivi en continu. »
- 💼 Métiers & Compétences — « La structuration des métiers produit, chaque trimestre. »

```tsx
// components/SectionCards.tsx
import Link from "next/link";
const SECTIONS = [
  { href: "/kiosque", icon: "🗞️", title: "Le kiosque à journaux", desc: "Ce qui se dit. Ce qu'on en retient." },
  { href: "/pouls", icon: "🩺", title: "Le pouls du marché", desc: "La demande réelle, depuis notre pipe commercial." },
  { href: "/concurrence", icon: "💥", title: "Concurrence", desc: "Ce que font les autres cabinets, en continu." },
  { href: "/metiers", icon: "💼", title: "Métiers & Compétences", desc: "La structuration des métiers produit, chaque trimestre." },
];
export default function SectionCards() {
  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-2">
      {SECTIONS.map((s) => (
        <Link key={s.href} href={s.href}
          className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-electrique hover:shadow-md focus-visible:outline-2 focus-visible:outline-electrique focus-visible:outline-offset-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{s.icon}</span>
            <h2 className="font-title text-lg font-bold text-marine">{s.title}</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
          <span className="mt-3 inline-block text-sm font-medium text-electrique group-hover:underline">Ouvrir →</span>
        </Link>
      ))}
    </div>
  );
}
```

Puis dans `app/page.tsx`, importer et placer `<SectionCards />` entre le bloc titre et `<ExpertiseDigests />`.
**Critère d'acceptation** : la home présente 4 cartes cliquables menant aux rubriques, au-dessus du digest. Build statique inchangé (`force-static` conservé, composant serveur sans état).

---

## P2 — Fort impact, à planifier

### 4. Ne plus afficher le chrome authentifié sur `/login`

**Fichiers** : créer un route group `app/(app)/` + `app/login/layout.tsx`
**Problème** : `app/layout.tsx` rend header (avec bouton Feedback), sous-nav, et footer (« Se déconnecter », « Statistiques », horodatage de sync) sur **toutes** les routes, **y compris `/login`**. Un utilisateur déconnecté voit donc une nav inutilisable, un bouton « Se déconnecter » alors qu'il ne l'est pas, et un timestamp de sync hors contexte.
**Action** (approche route groups, la plus propre) :
1. Créer `app/(app)/layout.tsx` contenant le `<header>` / `<nav>` / `<footer>` actuels (déplacés depuis `app/layout.tsx`).
2. Déplacer dans `app/(app)/` les routes authentifiées : `page.tsx` (home), `kiosque/`, `pouls/`, `concurrence/`, `metiers/`, `entries/`, `admin/`.
3. Réduire `app/layout.tsx` racine au strict minimum : `<html>` + `<body>` + fonts + `globals.css` + `{children}`, sans chrome.
4. `app/login/` reste à la racine et n'hérite donc que du layout minimal.

> Alternative plus rapide si tu ne veux pas restructurer : dans `app/layout.tsx`, marquer le layout côté serveur, lire la session via `auth()` et ne rendre header/footer que si `session` existe. Moins idiomatique (la home est statique) → préférer les route groups.

**Critère d'acceptation** : `/login` n'affiche aucun élément de nav/footer authentifié ; les rubriques conservent header + footer à l'identique.

---

### 5. Rendre le focus clavier visible

**Fichier** : `app/globals.css`
**Problème** : les boutons, chips et liens reposent sur l'outline par défaut, souvent neutralisée. Un utilisateur au clavier ne voit pas où il se trouve.
**Action** : ajouter un style global `:focus-visible` cohérent avec la charte.

```css
:where(a, button, [role="button"], input, textarea, select):focus-visible {
  outline: 2px solid var(--color-electrique);
  outline-offset: 2px;
  border-radius: 6px;
}
```

**Critère d'acceptation** : tabuler dans la nav, les chips de filtre et les boutons d'action affiche un anneau electrique net ; aucun changement au clic souris (`:focus-visible` only).

---

### 6. Corriger les contrastes du texte porteur de sens

**Fichiers** : `components/Kiosque.tsx`, `components/ExpertiseDigests.tsx`, `app/entries/[slug]/page.tsx`, `app/layout.tsx`
**Problème** : `text-gray-400` (#9ca3af ≈ 2.8:1 sur blanc) est utilisé pour de l'information réelle — dates des éditions, compteurs « N éditions », catégories. Sous le seuil WCAG AA (4.5:1).
**Action** : pour tout texte **porteur d'information**, remonter d'un cran : `text-gray-400` → `text-gray-500` ou `text-gray-600`. Conserver `text-gray-400` uniquement pour le décoratif pur (ex. chevrons d'icône, séparateurs « · »).
- Kiosque : dates `formatDate` et compteurs d'éditions → `text-gray-500`.
- ExpertiseDigests : « Section non disponible. » → `text-gray-500`.
- Entry header : dates → `text-gray-500`.

**Critère d'acceptation** : tout texte lisible (hors séparateurs/icônes) atteint ≥ 4.5:1. Vérifiable via l'audit Lighthouse « Contrast ».

---

### 7. Accessibiliser la modale de feedback

**Fichier** : `components/FeedbackButton.tsx`
**Problème** : la modale n'a pas `role="dialog"`/`aria-modal`, pas de `aria-labelledby`, le focus n'est pas piégé à l'intérieur et n'est pas rendu au bouton déclencheur à la fermeture. (Échap et clic-extérieur fonctionnent déjà — bon point.)
**Action** :
1. Sur le conteneur de la modale : `role="dialog" aria-modal="true" aria-labelledby="feedback-title"`, et donner l'`id="feedback-title"` au `<h2>`.
2. À l'ouverture, mémoriser `document.activeElement` ; à la fermeture, lui rendre le focus.
3. Piéger le focus (Tab/Shift+Tab cyclent dans la modale). Acceptable : un petit hook maison, ou tabuler entre les éléments focusables du dialog.

**Critère d'acceptation** : à l'ouverture le focus entre dans la modale, Tab n'en sort pas, Échap/fermeture rend le focus au bouton « Envoyez un feedback ! ». Lecteur d'écran annonce un dialogue nommé « Votre feedback ».

---

## P3 — Polish & dette

### 8. Extraire un composant `Chip` de filtre partagé

**Fichiers** : nouveau `components/Chip.tsx` ; refactor de `ExpertiseDigests`, `Kiosque`, `Pouls`, `Metiers`, `Concurrence`.
**Problème** : la pilule de filtre est réimplémentée 5 fois avec des incohérences : actif en `bg-electrique` ici, `bg-marine` là ; tailles `py-2` vs `py-1.5` vs `py-1`. Dette + incohérence visuelle entre rubriques.
**Action** : créer un `Chip` paramétrable (`active`, `size?: "md" | "sm"`, `tone?: "electrique" | "marine"`, `disabled?`) et remplacer les boutons de filtre par ce composant. Fixer une convention : filtre primaire = `electrique`, filtre secondaire (mois/trimestre sous un filtre d'expertise) = `marine`.
**Critère d'acceptation** : un seul composant source pour tous les chips ; rendu visuel homogène entre les 5 rubriques.

---

### 9. Newsletter : afficher titre + date en tête d'entrée

**Fichier** : `app/entries/[slug]/page.tsx`
**Problème** : pour une entrée newsletter (`isNewsletter`), le `<header>` (titre, date, catégories) est volontairement masqué — la page démarre sur le lien retour puis le prose brut, sans titre visible.
**Action** : afficher au minimum le **titre** (`entry.title`) et la **date** (`formatDate(entry.date)`) en tête, même pour les newsletters. Garder le masquage des seules méta non pertinentes (catégorie/agent) si voulu.
**Critère d'acceptation** : toute page d'entrée affiche un titre de niveau `h1` et une date en haut.

---

### 10. BarChart : labels lisibles sur mobile

**Fichier** : `components/Pouls.tsx` (composant `BarChart`)
**Problème** : colonne de label fixe `w-36` + `truncate` ; sur petit écran, label + barre + valeur se serrent, les barres deviennent minuscules et les labels sont tronqués.
**Action** : passer à un layout responsive — label au-dessus de la barre en mobile, en ligne à partir de `sm`. Ex. wrapper `flex-col sm:flex-row sm:items-center`, label `w-full sm:w-36`.
**Critère d'acceptation** : à 360 px de large, chaque label est entièrement lisible et la barre garde une largeur exploitable.

---

### 11. Supprimer le titre dupliqué sur la home

**Fichier** : `app/page.tsx`
**Problème** : le header affiche déjà la marque « Observatoire des Expertises » ; la home répète exactement le même texte en `h1`. Redondance visuelle.
**Action** : sur la home, remplacer le `h1` par une formulation orientée valeur (ex. « Le marché, confronté à nos données. ») ou le retirer au profit d'un `h1` visuellement masqué (`sr-only`) pour conserver la structure sémantique sans doublon visible.
**Critère d'acceptation** : un seul « Observatoire des Expertises » visible en haut de la home ; un `h1` reste présent dans le DOM pour le SEO/a11y.

---

### 12. Éviter le layout shift du footer au chargement de l'abonnement

**Fichier** : `components/SubscribeButton.tsx`
**Problème** : état initial « 🔔 Récap mensuel » grisé, puis swap vers « 🔔 Abonné au récap » / « 🔕 S'abonner au récap » → largeur différente → léger décalage du footer (CLS).
**Action** : réserver la largeur (ex. `min-w-[12rem] inline-flex justify-center`) ou aligner le libellé de chargement sur le libellé le plus long.
**Critère d'acceptation** : aucun décalage horizontal des éléments voisins du footer entre l'état de chargement et l'état résolu.

---

## Hors périmètre (assumé, ne pas traiter sauf demande)
- **Dark mode** : non requis pour un outil interne ; `body` force le fond clair, c'est un choix cohérent.
- **Emojis comme icônes** : choix délibéré, donne de la personnalité ; le texte porte toujours le sens (ils restent décoratifs). OK.
- **Pipeline contenu / SharePoint / auth Entra** : intouchés.

## Ordre d'exécution conseillé pour Claude Code
1. P1 (1 → 2 → 3) : gains d'orientation et d'interaction immédiats, faible risque.
2. P2 (5 → 6 d'abord, rapides ; puis 4 → 7).
3. P3 au fil de l'eau (8 en premier car il fiabilise tous les filtres).
