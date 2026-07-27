type ChipProps = {
  active?: boolean;
  size?: "md" | "sm";
  tone?: "electrique" | "marine";
  disabled?: boolean;
  title?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const SIZES: Record<NonNullable<ChipProps["size"]>, string> = {
  md: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-xs",
};

const ACTIVE: Record<NonNullable<ChipProps["tone"]>, string> = {
  electrique: "bg-electrique text-white",
  marine: "bg-marine text-white",
};

const INACTIVE: Record<NonNullable<ChipProps["tone"]>, string> = {
  electrique:
    "border border-gray-300 bg-white text-marine hover:border-electrique hover:text-electrique",
  marine: "border border-gray-300 bg-white text-marine hover:border-marine",
};

/**
 * Pilule de filtre partagée par les rubriques.
 * Convention : filtre primaire = `electrique` (md) ; filtre secondaire
 * (mois/trimestre sous un filtre d'expertise) = `marine` (sm).
 */
export default function Chip({
  active = false,
  size = "md",
  tone = "electrique",
  disabled = false,
  title,
  onClick,
  children,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={active}
      className={[
        "rounded-full font-medium transition",
        SIZES[size],
        disabled
          ? "cursor-not-allowed border border-gray-200 bg-gray-50 text-desactive"
          : active
            ? ACTIVE[tone]
            : INACTIVE[tone],
      ].join(" ")}
    >
      {children}
    </button>
  );
}
