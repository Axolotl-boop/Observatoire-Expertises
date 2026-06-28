"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
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
