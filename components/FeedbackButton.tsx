"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  // Élément déclencheur, pour lui rendre le focus à la fermeture.
  const triggerRef = useRef<HTMLElement | null>(null);

  // Fermeture à la touche Échap + piégeage du focus dans la modale.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // À la fermeture, rendre le focus au bouton déclencheur.
  useEffect(() => {
    if (open) return;
    triggerRef.current?.focus();
  }, [open]);

  function openModal(e: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = e.currentTarget;
    setStatus("idle");
    setMessage("");
    setOpen(true);
    track("feedback_open");
  }

  async function submit() {
    const msg = message.trim();
    if (!msg || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, path: window.location.pathname }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      track("feedback_sent");
      setTimeout(() => setOpen(false), 1400);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-full bg-orange px-4 py-2 text-sm font-medium text-white transition hover:bg-braise"
      >
        💌 Envoyez un feedback !
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-1 flex items-start justify-between gap-3">
              <h2 id="feedback-title" className="font-title text-lg font-bold text-marine">
                Votre feedback
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="text-gray-400 transition hover:text-marine"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>

            {status === "sent" ? (
              <p className="py-6 text-center text-sm text-foret">
                ✅ Merci ! Votre retour a bien été envoyé.
              </p>
            ) : (
              <>
                <p className="mb-3 text-sm text-gray-500">
                  Une idée, un bug, une suggestion ? Dites-nous tout — c&rsquo;est lu.
                </p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  autoFocus
                  placeholder="Votre message…"
                  className="w-full resize-y rounded-lg border border-gray-300 p-3 text-sm text-marine outline-none focus:border-electrique"
                />
                {status === "error" && (
                  <p className="mt-2 text-sm text-braise">
                    Une erreur est survenue. Réessayez dans un instant.
                  </p>
                )}
                <div className="mt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-gray-500 hover:text-marine"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={submit}
                    disabled={!message.trim() || status === "sending"}
                    className="rounded-full bg-orange px-4 py-2 text-sm font-medium text-white transition hover:bg-braise disabled:opacity-50"
                  >
                    {status === "sending" ? "Envoi…" : "Envoyer"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
