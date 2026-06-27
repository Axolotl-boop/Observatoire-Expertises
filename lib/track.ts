/**
 * Envoi d'un événement de suivi (côté navigateur uniquement).
 * Utilisé pour les événements nommés (download, filter, digest_expand…).
 */
export function track(event: string, target?: string | null): void {
  if (typeof window === "undefined") return;
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        target: target ?? null,
        path: window.location.pathname,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* best-effort */
  }
}
