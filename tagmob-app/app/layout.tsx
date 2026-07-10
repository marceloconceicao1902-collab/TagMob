import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TAGMOB — Ambientalização Imobiliária",
  description:
    "A plataforma que encaixa marcas, corretores e arquitetos no momento e no encaixe certos.",
  keywords: ["imobiliária", "proptech", "adtech", "ambientalização", "product placement"],
};

/**
 * Para habilitar o Clerk:
 * 1. Configure as chaves no .env.local
 * 2. Envolver com <ClerkProvider> do @clerk/nextjs
 * 3. Restaurar o middleware.ts com clerkMiddleware
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
