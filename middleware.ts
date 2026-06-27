export { auth as middleware } from "@/auth";

// Protège tout le site sauf la page de connexion, les routes d'authentification,
// les assets Next et les fichiers statiques.
export const config = {
  matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
