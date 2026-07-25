import type { Metadata } from "next";

import { SiteFooter } from "../_components/site-footer";
import { SiteNav } from "../_components/site-nav";
import { SimuladorClient } from "./simulador-client";

export const metadata: Metadata = {
  title: "Simulador de Escopo — TAGMOB",
  description:
    "Monte o escopo do seu lançamento e veja o investimento em tempo real. Valores fixos, sem cobrança sobre o VGV.",
};

export default function SimuladorPage() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <SiteNav />
      <SimuladorClient />
      <SiteFooter />
    </div>
  );
}
