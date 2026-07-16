import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEGACY_PATHS = new Set(["/crm", "/contatos", "/atividades", "/construtora"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (LEGACY_PATHS.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/negocios";
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();
  if (
    pathname === "/negocios"
    || pathname === "/hub"
    || pathname.startsWith("/construtora/")
  ) {
    response.headers.set("Cache-Control", "no-store, must-revalidate");
    response.headers.set("CDN-Cache-Control", "no-store");
    response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  }

  return response;
}

export const config = {
  matcher: ["/crm", "/contatos", "/atividades", "/construtora", "/negocios", "/hub"],
};
