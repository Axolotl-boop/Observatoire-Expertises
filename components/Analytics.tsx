"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/track";

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
    track("pageview");
  }, [pathname]);

  // Clic sur tout lien / bouton / élément balisé data-track (autocapture).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const el = target?.closest("[data-track], a, button");
      if (!el) return;
      const label = labelOf(el);
      if (!label) return;
      track("click", label);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Copie de texte (Ctrl/Cmd+C, clic droit → Copier, ou copie programmatique).
  useEffect(() => {
    function onCopy() {
      const sel = window.getSelection?.()?.toString().replace(/\s+/g, " ").trim() ?? "";
      const snippet = sel ? sel.slice(0, 80) : "(sans sélection)";
      track("copy", snippet);
    }
    document.addEventListener("copy", onCopy, true);
    return () => document.removeEventListener("copy", onCopy, true);
  }, []);

  return null;
}
