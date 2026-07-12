import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TAGMOB — Pensar · Criar · Construir · Conectar",
  description:
    "O sistema operacional da comunicação imobiliária. Da estratégia de campanha à exportação de peças — tudo em um único ambiente para construtoras, arquitetos, marcas e corretores.",
  keywords: ["imobiliária", "proptech", "adtech", "ambientalização", "product placement", "marketing imobiliário"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter), sans-serif" }} className="antialiased">
        {children}
      </body>
    </html>
  );
}
