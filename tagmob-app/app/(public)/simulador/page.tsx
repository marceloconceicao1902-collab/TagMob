import type { Metadata } from "next";

import { SiteFooter } from "../_components/site-footer";
import { SiteNav } from "../_components/site-nav";
import { SimuladorClient } from "./simulador-client";

export const metadata: Metadata = {
  title: "Tabela de Preços — TAGMOB OS",
  description:
    "Valores Referenciais de Serviços Internos, publicado pelo Sinapro-SP. Monte a precificação do seu lançamento com transparência total.",
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
