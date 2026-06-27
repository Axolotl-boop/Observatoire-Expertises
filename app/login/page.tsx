"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Après une déconnexion, on NE relance PAS la connexion automatiquement.
    if (params.get("signedout")) {
      setSignedOut(true);
      return;
    }
    signIn("microsoft-entra-id", { callbackUrl: params.get("callbackUrl") || "/" });
  }, []);

  if (signedOut) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
        <p className="font-title text-lg font-semibold text-marine">
          Vous êtes déconnecté.
        </p>
        <button
          type="button"
          onClick={() => signIn("microsoft-entra-id", { callbackUrl: "/" })}
          className="mt-4 rounded-full bg-electrique px-5 py-2 text-sm font-medium text-white transition hover:bg-marine"
        >
          Se reconnecter
        </button>
      </div>
    );
  }

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
