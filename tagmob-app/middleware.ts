import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definimos quais rotas são públicas (não exigem autenticação)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/onboarding(.*)",
  "/api/leads(.*)",
  "/api/webhooks(.*)"
]);

// Exige login incondicionalmente em produção
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Ignora arquivos estáticos e internos do Next.js
    "/((?!_next|[^?]*\\.[\\w]+$).*)",
    // Executa para todas as rotas de API
    "/(api|trpc)(.*)",
  ],
};
