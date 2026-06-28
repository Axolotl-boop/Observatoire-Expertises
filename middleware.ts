import { NextResponse } from "next/server";

// 🔓 ACCÈS LIBRE TEMPORAIRE — la connexion obligatoire est désactivée.
//
// Pour RÉACTIVER le SSO : supprimer le middleware no-op ci-dessous et
// décommenter la ligne suivante :
// export { auth as middleware } from "@/auth";
export function middleware() {
  return NextResponse.next();
}

// Protège tout le site sauf la page de connexion, les routes d'authentification,
// les assets Next et les fichiers statiques. (Sans effet tant que le middleware
// est en mode no-op ; conservé pour faciliter la réactivation.)
export const config = {
  matcher: ["/((?!login|api/auth|api/cron|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
