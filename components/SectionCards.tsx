import Link from "next/link";

const SECTIONS = [
  {
    href: "/kiosque",
    icon: "🗞️",
    title: "Le kiosque à journaux",
    desc: "Ce qui se dit. Ce qu'on en retient.",
  },
  {
    href: "/pouls",
    icon: "🩺",
    title: "Le pouls du marché",
    desc: "La demande réelle, depuis notre pipe commercial.",
  },
  {
    href: "/concurrence",
    icon: "💥",
    title: "Concurrence",
    desc: "Ce que font les autres cabinets, en continu.",
  },
  {
    href: "/metiers",
    icon: "💼",
    title: "Métiers & Compétences",
    desc: "La structuration des métiers produit, chaque trimestre.",
  },
];

export default function SectionCards() {
  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-2">
      {SECTIONS.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-electrique hover:shadow-md focus-visible:outline-2 focus-visible:outline-electrique focus-visible:outline-offset-2"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{s.icon}</span>
            <h2 className="font-title text-lg font-bold text-marine">
              {s.title}
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
          <span className="mt-3 inline-block text-sm font-medium text-electrique group-hover:underline">
            Ouvrir →
          </span>
        </Link>
      ))}
    </div>
  );
}
