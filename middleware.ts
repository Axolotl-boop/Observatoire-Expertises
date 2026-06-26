export { auth as middleware } from "@/auth";

// Protège tout le site sauf les routes d'authentification, les assets Next et les fichiers statiques.
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
