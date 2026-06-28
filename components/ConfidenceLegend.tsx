const MONO = 'ui-monospace, SFMono-Regular, Menlo, "Liberation Mono", monospace';

function TagPill({
  label,
  bg,
  color,
  border,
}: {
  label: string;
  bg: string;
  color: string;
  border?: string;
}) {
  return (
    <span
      style={{
        flex: "0 0 auto",
        fontFamily: MONO,
        fontSize: 12,
        fontWeight: 500,
        background: bg,
        color,
        border: border ? `1px solid ${border}` : undefined,
        padding: "3px 9px",
        borderRadius: 6,
      }}
    >
      {label}
    </span>
  );
}

/**
 * Légende des tags de maturité d'un signal de veille, par intensité croissante :
 * [mode] (effet de surface) · [tendance] (mouvement réel) · [structurel]
 * (changement de fond, candidat à valider). Statique, alignée sur la charte.
 */
export default function ConfidenceLegend() {
  return (
    <div className="mb-4 rounded-xl border border-lilas bg-white p-6">
      <div className="mb-4 font-title text-lg font-medium text-marine">Légende</div>

      <div className="flex flex-col gap-5">
        {/* [mode] — basse intensité, doit « peser » le moins */}
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
            <TagPill
              label="[mode]"
              bg="var(--color-glace)"
              color="var(--color-desactive)"
              border="#e5e7eb"
            />
            <span className="text-[13px] font-medium text-gray-700">effet de surface</span>
          </div>
          <p className="text-[13px] leading-relaxed text-gray-600">
            Ça fait du bruit, mais ça repose sur peu : une source isolée, un discours marché, aucun
            ancrage solide. C&rsquo;est le tag par défaut quand l&rsquo;adossement est faible.
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
            → À lire avec recul, le plus souvent à ignorer.
          </p>
        </div>

        {/* [tendance] — intensité moyenne, couleur d'attention */}
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
            <TagPill label="[tendance]" bg="#fdecd9" color="var(--color-braise)" />
            <span className="text-[13px] font-medium text-gray-700">mouvement réel</span>
          </div>
          <p className="text-[13px] leading-relaxed text-gray-600">
            Un mouvement confirmé : le signal est repris par au moins une autre source indépendante,
            mais il n&rsquo;est ni irréversible ni encore structurant.
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
            → À suivre. Pas (encore) de quoi infléchir nos offres ou convictions.
          </p>
        </div>

        {/* [structurel] — intensité maximale (marine plein) + marqueur candidat */}
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
            <TagPill label="[structurel]" bg="var(--color-marine)" color="#ffffff" />
            <span className="text-[13px] font-medium text-gray-700">changement de fond</span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: "var(--color-avert)",
                border: "1px solid var(--color-avert)",
                padding: "1px 7px",
                borderRadius: 6,
              }}
            >
              candidat — à valider
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-gray-600">
            Un changement qui rebat les cartes du métier, appuyé sur un fait dur (étude/baromètre,
            M&amp;A, levée…) et corroboré par nos propres données (demande commerciale, emploi,
            concurrence).
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
            → Le signal le plus lourd — à prendre au sérieux dans nos réflexions.
          </p>
        </div>
      </div>
    </div>
  );
}
