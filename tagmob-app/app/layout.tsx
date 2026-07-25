import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TAGMOB — A primeira plataforma criativa do mercado imobiliário",
  description:
    "Pensar. Criar. Construir. Conectar. A TAGMOB reúne estratégia, criatividade, tecnologia e especialistas em um único ecossistema para o mercado imobiliário.",
  keywords: [
    "marketing imobiliário",
    "plataforma criativa",
    "incorporadoras",
    "lançamento imobiliário",
    "branding imobiliário",
    "agência imobiliária",
  ],
  openGraph: {
    title: "TAGMOB — A primeira plataforma criativa do mercado imobiliário",
    description:
      "Estratégia, branding, criação, conteúdo, mídia e tecnologia conectados em um único ecossistema.",
    url: "https://www.tagmob.com.br",
    siteName: "TAGMOB",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${archivo.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
