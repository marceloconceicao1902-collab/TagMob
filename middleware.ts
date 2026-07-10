import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de autenticação.
 *
 * - Quando as chaves do Clerk estiverem configuradas corretamente no .env.local,
 *   substitua este arquivo pelo middleware Clerk completo (ver comentário abaixo).
 * - Em modo demo (chaves placeholder), todas as rotas são liberadas.
 */

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const IS_CLERK_READY =
  (publishableKey.startsWith("pk_live_") || publishableKey.startsWith("pk_test_")) &&
  !publishableKey.includes("SUBSTITUA") &&
  !publishableKey.includes("XXXXXXX");

export default function middleware(req: NextRequest) {
  // Modo demo — sem Clerk configurado, todas as rotas são acessíveis
  if (!IS_CLERK_READY) {
    return NextResponse.next();
  }

  // Quando Clerk estiver configurado, descomente e use:
  // return clerkMiddleware(async (auth, req) => {
  //   const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/onboarding(.*)", "/api/webhooks(.*)"]);
  //   if (isPublicRoute(req)) return NextResponse.next();
  //   const { userId } = await auth();
  //   if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));
  //   return NextResponse.next();
  // })(req);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
