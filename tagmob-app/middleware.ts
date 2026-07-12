import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const IS_CLERK_READY =
  (publishableKey.startsWith("pk_live_") || publishableKey.startsWith("pk_test_")) &&
  !publishableKey.includes("SUBSTITUA") &&
  !publishableKey.includes("XXXXXXX");

// Definimos quais rotas são públicas (não exigem autenticação)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/onboarding(.*)",
  "/api/leads(.*)",
  "/api/webhooks(.*)"
]);

export default function middleware(req: NextRequest, event: any) {
  // Se o Clerk não estiver configurado localmente (modo de desenvolvimento básico sem chaves)
  if (!IS_CLERK_READY) {
    return NextResponse.next();
  }

  // Se o Clerk estiver pronto (Produção Vercel com chaves ativas), exige login
  const clerkHandler = clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  });

  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    // Ignora arquivos estáticos e internos do Next.js
    "/((?!_next|[^?]*\\.[\\w]+$).*)",
    // Executa para todas as rotas de API
    "/(api|trpc)(.*)",
  ],
};
