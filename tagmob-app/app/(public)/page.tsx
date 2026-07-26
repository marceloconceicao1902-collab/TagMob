export const dynamic = "force-dynamic";
export const revalidate = 0;

import { ComoFuncionaSection } from "./_components/como-funciona-section";
import { ContatoSection } from "./_components/contato-section";
import { DiferenciaisSection } from "./_components/diferenciais-section";
import { EcossistemaSection } from "./_components/ecossistema-section";
import { FaqSection } from "./_components/faq-section";
import { Hero } from "./_components/hero";
import { ManifestoSection } from "./_components/manifesto-section";
import { ModeloSection } from "./_components/modelo-section";
import { PilaresSection } from "./_components/pilares-section";
import { SiteFooter } from "./_components/site-footer";
import { SiteNav } from "./_components/site-nav";
import { SobreSection } from "./_components/sobre-section";
import { SquadIaSection } from "./_components/squad-ia-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0E0E1C] text-white">
      {/* Menu Nav fixo no topo com navegação clicável por tópico */}
      <SiteNav />

      <main>
        {/* Seção 1: Hero — PENSAR. CRIAR. CONECTAR. */}
        <Hero />

        {/* Seção 2: Manifesto — O mercado mudou. A forma de criar campanhas também. */}
        <ManifestoSection />

        {/* Seção 3: O que é a TAGMOB? */}
        <SobreSection />

        {/* Seção 4: Um novo jeito de criar campanhas (Pensar, Criar, Conectar) */}
        <PilaresSection />

        {/* Seção 5: Como funciona (Transição por Etapa de 1 a 6) */}
        <ComoFuncionaSection />

        {/* Seção 6 & 7: Squads de Especialistas + IA & Criatividade Humana */}
        <SquadIaSection />

        {/* Seção 8: Ecossistema Integrado (12 Módulos + Observação Estratégica) */}
        <EcossistemaSection />

        {/* Seção 9: Por que a TAGMOB é diferente? (Tabela Comparativa) */}
        <DiferenciaisSection />

        {/* Seção 10: Um modelo transparente (Sem VGV) */}
        <ModeloSection />

        {/* Seção 11: Perguntas Frequentes */}
        <FaqSection />

        {/* Seção 12: Fechamento & Contato */}
        <ContatoSection />
      </main>

      <SiteFooter />
    </div>
  );
}
