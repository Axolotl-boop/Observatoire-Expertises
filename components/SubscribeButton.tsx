"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/track";

export default function SubscribeButton() {
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/subscribe")
      .then((r) => (r.ok ? r.json() : { subscribed: false }))
      .then((d) => {
        if (alive) setSubscribed(Boolean(d.subscribed));
      })
      .catch(() => {
        if (alive) setSubscribed(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  async function toggle() {
    if (subscribed === null || busy) return;
    setBusy(true);
    const next = !subscribed;
    try {
      const res = await fetch("/api/subscribe", {
        method: next ? "POST" : "DELETE",
      });
      if (res.ok) {
        const d = await res.json().catch(() => ({ subscribed: next }));
        setSubscribed(Boolean(d.subscribed));
        track(next ? "subscribe" : "unsubscribe", "Récap mensuel");
      }
    } catch {
      /* best-effort */
    } finally {
      setBusy(false);
    }
  }

  if (subscribed === null) {
    return (
      <span className="text-gray-400" aria-hidden>
        🔔 Récap mensuel
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      title={
        subscribed
          ? "Vous recevez un email à chaque nouveau digest mensuel"
          : "Recevez un email à chaque nouveau digest mensuel"
      }
      className={[
        "transition disabled:opacity-50",
        subscribed
          ? "text-electrique hover:text-marine"
          : "text-gray-500 hover:text-electrique",
      ].join(" ")}
    >
      {subscribed ? "🔔 Abonné au récap" : "🔕 S'abonner au récap"}
    </button>
  );
}
