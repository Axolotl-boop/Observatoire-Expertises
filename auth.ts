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
  // Page de connexion personnalisée : redirige directement vers Microsoft
  // (pas d'écran intermédiaire de choix de fournisseur).
  pages: { signIn: "/login" },
  // Session longue : évite de redemander la connexion à chaque visite.
  session: { maxAge: 365 * 24 * 60 * 60 }, // 1 an
  callbacks: {
    // Seuls les utilisateurs authentifiés (donc du tenant WeFiiT) sont autorisés.
    authorized: async ({ auth }) => !!auth,
  },
});
