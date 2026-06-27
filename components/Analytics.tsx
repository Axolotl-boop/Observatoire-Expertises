"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function send(event: string, target: string | null, path: string) {
  try {
    const body = JSON.stringify({ event, target, path });
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* tracking best-effort */
  }
}

function labelOf(el: Element): string | null {
  const explicit = el.getAttribute("data-track");
  if (explicit) return explicit;
  const aria = el.getAttribute("aria-label");
  if (aria) return aria.trim();
  const text = (el as HTMLElement).innerText?.replace(/\s+/g, " ").trim();
  return text ? text.slice(0, 80) : null;
}

export default function Analytics() {
  const pathname = usePathname();

  // Page vue à chaque navigation.
  useEffect(() => {
    send("pageview", null, pathname);
  }, [pathname]);

  // Clic sur tout lien / bouton / élément balisé data-track.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const el = target?.closest("[data-track], a, button");
      if (!el) return;
      const label = labelOf(el);
      if (!label) return;
      send("click", label, window.location.pathname);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
