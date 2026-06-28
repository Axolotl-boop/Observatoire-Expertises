const MONO = 'ui-monospace, SFMono-Regular, Menlo, "Liberation Mono", monospace';

function Pill({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      style={{
        flex: "0 0 auto",
        alignSelf: "flex-start",
        fontFamily: MONO,
        fontSize: 12,
        background: bg,
        color,
        padding: "3px 9px",
        borderRadius: 6,
      }}
    >
      {label}
    </span>
  );
}

function Chip({ glyph, color }: { glyph: string; color: string }) {
  return (
    <span style={{ flex: "0 0 18px", textAlign: "center", fontSize: 16, lineHeight: 1.3, color }}>
      {glyph}
    </span>
  );
}

const mono = (t: string) => <span style={{ fontFamily: MONO }}>{t}</span>;

/**
 * Légende du dashboard : comment lire les tags de maturité (ampleur du
 * mouvement) et les chips de solidité (adossement à nos données) d'un signal.
 * Légende statique, alignée sur la charte.
 */
export default function ConfidenceLegend() {
  return (
    <div className="mb-4 rounded-xl border border-lilas bg-white p-6">
      <div className="mb-1 font-title text-lg font-medium text-marine">Comment lire un signal</div>
      <p className="mb-5 text-[13px] leading-relaxed text-gray-500">
        Chaque signal porte un{" "}
        <strong className="font-medium text-gray-700">tag</strong> (l&apos;ampleur du mouvement dans
        le marché) et un <strong className="font-medium text-gray-700">chip</strong> (sur quoi il
        tient dans nos données). Ce sont deux lectures indépendantes.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Tags — l'ampleur du mouvement */}
        <div>
          <div className="mb-3 text-xs font-medium text-marine">Tags — l&apos;ampleur du mouvement</div>

          <div className="mb-3 flex gap-2.5">
            <Pill label="[mode]" bg="#f1efe8" color="#5f5e5a" />
            <span className="text-[13px] leading-snug text-gray-700">
              Effet de surface, à ignorer le plus souvent.
            </span>
          </div>

          <div className="mb-3 flex gap-2.5">
            <Pill label="[tendance]" bg="var(--color-lavande)" color="var(--color-marine)" />
            <span className="text-[13px] leading-snug text-gray-700">
              Mouvement réel, mais pas encore structurant.
            </span>
          </div>

          <div className="flex gap-2.5">
            <Pill label="[structurel]" bg="var(--color-jadeclair)" color="var(--color-foret)" />
            <span className="text-[13px] leading-snug text-gray-700">
              Changement de fond, adossé à un baromètre <em>et</em> à une donnée propriétaire.{" "}
              <span style={{ color: "var(--color-terre)" }}>Toujours validé par un humain.</span>
            </span>
          </div>
        </div>

        {/* Chips — la solidité chez nous */}
        <div>
          <div className="mb-3 text-xs font-medium text-marine">Chips — la solidité chez nous</div>

          <div className="mb-3 flex gap-2.5">
            <Chip glyph="⬤" color="var(--color-succes)" />
            <span className="text-[13px] leading-snug text-gray-700">
              <strong className="font-medium">Solide</strong> — appuyé par une donnée propriétaire
              (PAD, emploi, concurrence). Portable devant un client.
            </span>
          </div>

          <div className="mb-3 flex gap-2.5">
            <Chip glyph="◐" color="var(--color-avert)" />
            <span className="text-[13px] leading-snug text-gray-700">
              <strong className="font-medium">Piste</strong> — plusieurs sources externes alignées,
              rien en interne. À creuser, pas un argument.
            </span>
          </div>

          <div className="flex gap-2.5">
            <Chip glyph="◯" color="var(--color-desactive)" />
            <span className="text-[13px] leading-snug text-gray-700">
              <strong className="font-medium">Isolé</strong> — une seule source externe, non
              corroborée. Une curiosité à surveiller.
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-[#f1efe8] pt-4">
        <div className="flex items-start gap-2">
          <span style={{ color: "var(--color-electrique)", flex: "0 0 auto", fontSize: 14 }}>⇄</span>
          <span className="text-[12.5px] leading-relaxed text-gray-500">
            Tag et chip sont indépendants : un {mono("[mode] · ⬤")} (une hype que nos données
            confirment) et un {mono("[tendance] · ◯")} (plausible, une seule source) se lisent
            différemment. Un {mono("[structurel]")} est toujours{" "}
            <span style={{ color: "var(--color-succes)" }}>⬤</span>.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span style={{ color: "var(--color-avert)", flex: "0 0 auto", fontSize: 14 }}>⚠</span>
          <span className="text-[12.5px] leading-relaxed text-gray-500">
            {mono("⚠ poussé par <acteur>")} signale que l&apos;émetteur a un intérêt commercial dans
            ce récit — à lire avec prudence.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span style={{ color: "var(--color-braise)", flex: "0 0 auto", fontSize: 14 }}>⚑</span>
          <span className="text-[12.5px] leading-relaxed text-gray-500">
            Un <span style={{ color: "var(--color-desactive)" }}>◯</span> ou un{" "}
            <span style={{ color: "var(--color-avert)" }}>◐</span> est une piste à creuser, pas un
            argument client. Rien ici n&apos;est une conviction du cabinet tant qu&apos;un humain ne
            l&apos;a pas forgée dans un deck ou un article.
          </span>
        </div>
      </div>
    </div>
  );
}
