import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkWrapper } from "@/components/auth/clerk-wrapper";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkWrapper>
      <html lang="pt-BR" className={inter.variable}>
        <body className="font-sans antialiased">{children}</body>
      </html>
    </ClerkWrapper>
  );
}
