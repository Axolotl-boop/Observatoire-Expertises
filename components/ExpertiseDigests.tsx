"use client";

import { useState } from "react";
import Chip from "@/components/Chip";
import ConfidenceLegend from "@/components/ConfidenceLegend";
import type { ExpertiseDigest } from "@/lib/content";
import { track } from "@/lib/track";

type BlockKey = "avantVente" | "convictions" | "competences" | "contenus";
type PersonaKey = "business" | "expertise" | "excellence" | "notoriete";

/**
 * Chaque bloc du digest sert un enjeu (persona) et une intention différents.
 * On l'affiche explicitement pour casser l'uniformité « 4 cartes identiques »
 * et permettre de pondérer la lecture selon l'angle recherché.
 */
const DIGEST_BLOCKS: {
  key: BlockKey;
  title: string;
  persona: PersonaKey;
}[] = [
  { key: "avantVente", title: "Problématiques récurrentes & Offres", persona: "business" },
  { key: "convictions", title: "Convictions à challenger", persona: "expertise" },
  { key: "competences", title: "Compétences recherchées", persona: "excellence" },
  { key: "contenus", title: "Contenus de notoriété suggérés", persona: "notoriete" },
];

/** Libellé + couleurs de charte par persona (tag de carte + bord de la carte mise en avant). */
const PERSONA_META: Record<
  PersonaKey,
  { label: string; tag: string; border: string }
> = {
  business: { label: "Business", tag: "bg-glace text-electrique", border: "border-electrique" },
  expertise: { label: "Expertise", tag: "bg-lilas text-violet", border: "border-violet" },
  excellence: { label: "Excellence", tag: "bg-jadeclair text-foret", border: "border-jade" },
  notoriete: { label: "Notoriété", tag: "bg-creme text-braise", border: "border-braise" },
};

/** Ordre d'affichage du sélecteur « Lecture par angle » (= ordre des cartes). */
const PERSONAS: PersonaKey[] = ["business", "expertise", "excellence", "notoriete"];

function monthLabel(key: string): string {
  const m = key.match(/^(\d{4})-(\d{2})$/);
  if (!m) return key;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, 1);
  const label = d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function Block({
  title,
  html,
  persona,
  open,
  onToggle,
  emphasis,
}: {
  title: string;
  html?: string;
  persona: PersonaKey;
  open: boolean;
  onToggle: () => void;
  emphasis: "primary" | "muted" | "normal";
}) {
  const meta = PERSONA_META[persona];
  return (
    <div
      className={[
        "rounded-xl bg-white transition-opacity",
        emphasis === "primary"
          ? `border-2 ${meta.border} shadow-sm`
          : "border border-gray-200",
        emphasis === "muted" ? "opacity-70 hover:opacity-100" : "",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => {
          if (!open) track("digest_expand", title);
          onToggle();
        }}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-2 p-5 text-left"
      >
        <span className="flex flex-col gap-1.5">
          <span
            className={[
              "inline-flex w-fit items-center rounded-full px-2 py-0.5 font-title text-[11px] font-medium",
              meta.tag,
            ].join(" ")}
          >
            {meta.label}
          </span>
          <h3 className="font-title text-[17px] font-semibold leading-snug text-marine">
            {title}
          </h3>
        </span>
        <svg
          className={[
            "mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="px-5 pb-5">
        {html ? (
          <div className={open ? "" : "relative max-h-24 overflow-hidden"}>
            <div
              className="prose prose-sm prose-slate max-w-none leading-relaxed prose-headings:font-title prose-headings:font-medium prose-headings:text-marine prose-strong:font-semibold prose-strong:text-marine prose-li:my-1.5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {!open && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white" />
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Section non disponible.</p>
        )}
      </div>
    </div>
  );
}

export default function ExpertiseDigests({ digests }: { digests: ExpertiseDigest[] }) {
  const firstAvailable = digests.find((d) => d.available) ?? digests[0];
  const [active, setActive] = useState<string>(firstAvailable?.key ?? "");
  const [month, setMonth] = useState<string>("");
  const [openMap, setOpenMap] = useState<Partial<Record<BlockKey, boolean>>>({});
  // null = « Tout afficher » ; sinon, le persona dont la carte est mise en avant.
  const [persona, setPersona] = useState<PersonaKey | null>(null);

  const current = digests.find((d) => d.key === active);
  const months = current?.entries.map((e) => e.month) ?? [];
  const selectedMonth = months.includes(month) ? month : months[0];
  const entry = current?.entries.find((e) => e.month === selectedMonth);

  // Carte prioritaire du persona sélectionné, et les autres (atténuées).
  const primaryKey = persona
    ? DIGEST_BLOCKS.find((b) => b.persona === persona)?.key
    : undefined;
  const primaryBlock = DIGEST_BLOCKS.find((b) => b.key === primaryKey);
  const otherBlocks = DIGEST_BLOCKS.filter((b) => b.key !== primaryKey);

  // Ouverte si l'utilisateur l'a explicitement basculée ; sinon, ouverte par
  // défaut quand c'est la carte mise en avant du persona.
  const isOpen = (key: BlockKey) => openMap[key] ?? key === primaryKey;
  const toggle = (key: BlockKey) =>
    setOpenMap((m) => ({ ...m, [key]: !isOpen(key) }));

  return (
    <section className="mb-12">
      {/* Filtre par expertise */}
      <div className="flex flex-wrap gap-2">
        {digests.map((d) => (
          <Chip
            key={d.key}
            active={d.key === active}
            disabled={!d.available}
            title={d.available ? undefined : "Aucun digest disponible"}
            onClick={() => {
              setActive(d.key);
              track("filter", `Observatoire · expertise:${d.label}`);
            }}
          >
            {d.label}
          </Chip>
        ))}
      </div>

      {/* Filtre par mois */}
      {months.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {months.map((m) => (
            <Chip
              key={m}
              active={m === selectedMonth}
              size="sm"
              tone="marine"
              onClick={() => {
                setMonth(m);
                track("filter", `Observatoire · mois:${m}`);
              }}
            >
              {monthLabel(m)}
            </Chip>
          ))}
        </div>
      )}

      {current?.available && entry ? (
        <div className="mt-6">
          {/* Légende de confiance (tags & chips) */}
          <ConfidenceLegend />

          {/* Bloc Hero : les signaux importants du mois */}
          {entry.sections.signaux && (
            <div className="mb-4 rounded-2xl border border-marine bg-marine p-6 text-white shadow-sm">
              <h3 className="mb-4 font-title text-lg font-semibold text-lavande">
                Les signaux importants du mois
              </h3>
              <div
                className="prose prose-invert max-w-none text-[15.5px] leading-relaxed prose-p:my-2 prose-strong:font-semibold prose-strong:text-white prose-li:my-3 prose-li:pl-1 prose-li:marker:text-lavande prose-li:marker:content-['▸']"
                dangerouslySetInnerHTML={{ __html: entry.sections.signaux }}
              />
            </div>
          )}

          {/* Sélecteur « Lecture par rôle » : pondère et hiérarchise les 4 cartes */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-title text-sm font-medium text-marine">
              Lecture par angle&nbsp;:
            </span>
            <Chip
              size="sm"
              active={persona === null}
              onClick={() => {
                setPersona(null);
                track("filter", "Observatoire · persona:tout");
              }}
            >
              Tout afficher
            </Chip>
            {PERSONAS.map((p) => (
              <Chip
                key={p}
                size="sm"
                active={persona === p}
                onClick={() => {
                  setPersona(p);
                  track("filter", `Observatoire · persona:${p}`);
                }}
              >
                {PERSONA_META[p].label}
              </Chip>
            ))}
          </div>

          {/* Les 4 blocs. En « Tout afficher » : grille égalitaire 2 colonnes.
              Avec un persona : la carte pertinente passe pleine largeur et
              dépliée, les autres restent atténuées en grille. */}
          {persona && primaryBlock ? (
            <div className="space-y-4">
              <Block
                key={primaryBlock.key}
                title={primaryBlock.title}
                persona={primaryBlock.persona}
                html={entry.sections[primaryBlock.key]}
                open={isOpen(primaryBlock.key)}
                onToggle={() => toggle(primaryBlock.key)}
                emphasis="primary"
              />
              <div className="grid items-start gap-4 md:grid-cols-2">
                {otherBlocks.map((block) => (
                  <Block
                    key={block.key}
                    title={block.title}
                    persona={block.persona}
                    html={entry.sections[block.key]}
                    open={isOpen(block.key)}
                    onToggle={() => toggle(block.key)}
                    emphasis="muted"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid items-start gap-4 md:grid-cols-2">
              {DIGEST_BLOCKS.map((block) => (
                <Block
                  key={block.key}
                  title={block.title}
                  persona={block.persona}
                  html={entry.sections[block.key]}
                  open={isOpen(block.key)}
                  onToggle={() => toggle(block.key)}
                  emphasis="normal"
                />
              ))}
            </div>
          )}

          {/* Encart de bas de page : matière mobilisée ce cycle */}
          {entry.sections.matiere && (
            <div className="mt-4 rounded-xl border border-lavande bg-glace p-5">
              <h3 className="mb-2 font-title font-medium text-marine">
                Matière mobilisée ce cycle
              </h3>
              <div
                className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: entry.sections.matiere }}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Aucun digest disponible pour cette expertise.
        </p>
      )}
    </section>
  );
}
