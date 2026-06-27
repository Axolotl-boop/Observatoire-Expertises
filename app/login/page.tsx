"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Redirige immédiatement vers la connexion Microsoft (pas d'écran de choix).
    signIn("microsoft-entra-id", { callbackUrl: params.get("callbackUrl") || "/" });
  }, []);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
      <p className="font-title text-lg font-semibold text-marine">
        Redirection vers la connexion Microsoft…
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Connectez-vous avec votre compte WeFiiT.
      </p>
    </div>
  );
}
