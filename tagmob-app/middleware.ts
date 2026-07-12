import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const IS_CLERK_READY =
  (publishableKey.startsWith("pk_live_") || publishableKey.startsWith("pk_test_")) &&
  !publishableKey.includes("SUBSTITUA") &&
  !publishableKey.includes("XXXXXXX") &&
  publishableKey.length > 30;

// Definimos quais rotas são públicas
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/onboarding(.*)",
  "/api/leads(.*)",
  "/api/webhooks(.*)"
]);

// Instanciamos o middleware do Clerk estaticamente fora do handler para evitar crashes no Edge Runtime
const defaultClerk = clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export default function middleware(req: NextRequest, event: any) {
  // Se o Clerk não estiver com chaves ativas (modo desenvolvimento local sem chaves), libera o acesso
  if (!IS_CLERK_READY) {
    return NextResponse.next();
  }

  // Executa o handler estático do Clerk
  return defaultClerk(req, event);
}

export const config = {
  matcher: [
    // Ignora arquivos estáticos e internos do Next.js
    "/((?!_next|[^?]*\\.[\\w]+$).*)",
    // Executa para todas as rotas de API
    "/(api|trpc)(.*)",
  ],
};
