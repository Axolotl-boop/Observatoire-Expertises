import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

/**
 * Authentification SSO Microsoft Entra (Auth.js v5).
 *
 * Variables d'environnement attendues (Vercel + .env.local) :
 *   AUTH_SECRET                       secret aléatoire (npx auth secret)
 *   AUTH_MICROSOFT_ENTRA_ID_ID        ID de l'application (app registration web)
 *   AUTH_MICROSOFT_ENTRA_ID_SECRET    secret client de l'application
 *   AUTH_MICROSOFT_ENTRA_ID_ISSUER    https://login.microsoftonline.com/<TENANT_ID>/v2.0
 *
 * L'issuer mono-tenant (avec le TENANT_ID de WeFiiT) limite l'accès aux seuls
 * comptes de l'organisation.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [MicrosoftEntraID],
  callbacks: {
    // Seuls les utilisateurs authentifiés (donc du tenant WeFiiT) sont autorisés.
    authorized: async ({ auth }) => !!auth,
  },
});
