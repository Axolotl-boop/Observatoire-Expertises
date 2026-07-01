"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  solid = false,
}: {
  href: string;
  children: React.ReactNode;
  /** Onglet « pilule » à fond bleu — met en avant le hub (l'Observatoire). */
  solid?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  if (solid) {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={[
          "font-title font-medium text-white shadow-sm transition rounded-full px-3 py-1",
          "focus-visible:outline-2 focus-visible:outline-electrique focus-visible:outline-offset-2",
          // Toujours bleu (identifie le hub) ; plus foncé quand on y est.
          active ? "bg-marine" : "bg-electrique hover:bg-marine",
        ].join(" ")}
      >
        {children}
      </Link>
    );
  }

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
