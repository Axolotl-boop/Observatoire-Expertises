"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login?signedout=1" })}
      className="text-gray-500 transition hover:text-electrique"
    >
      Se déconnecter
    </button>
  );
}
