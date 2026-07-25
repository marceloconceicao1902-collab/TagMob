export const dynamic = "force-dynamic";
export const revalidate = 0;

import { ContatoSection } from "./_components/contato-section";
import { FaqSection } from "./_components/faq-section";
import { Hero } from "./_components/hero";
import { ManifestoSection } from "./_components/manifesto-section";
import { NomeSection } from "./_components/nome-section";
import { ProcessoCriativoSection } from "./_components/processo-criativo-section";
import { ProcessoSection } from "./_components/processo-section";
import { SiteFooter } from "./_components/site-footer";
import { SiteNav } from "./_components/site-nav";
import { SobreSection } from "./_components/sobre-section";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#0E0E1C", color: "#FFFFFF" }} className="h-screen overflow-hidden">
      {/* Nav fixo: sempre visível independente do scroll */}
      <SiteNav />

      {/* Container de scroll-snap: as seções saltam uma a uma */}
      <main
        id="snap-main"
        className="snap-container"
        style={{ paddingTop: "0" }}
      >
        {/* Hero — Lâmina 3: PENSAR. CRIAR. CONSTRUIR. CONECTAR. */}
        <div className="snap-section" id="hero">
          <Hero />
        </div>

        {/* Manifesto — Lâmina 4 */}
        <div className="snap-section" id="manifesto">
          <ManifestoSection />
        </div>

        {/* O que é a TAGMOB — Lâmina 5 */}
        <div className="snap-section" id="a-tagmob">
          <SobreSection />
        </div>

        {/* Nome TAGMOB — Lâmina 6 */}
        <div className="snap-section-overflow" id="nome">
          <NomeSection />
        </div>

        {/* Processo de Criação — Lâmina 7 */}
        <div className="snap-section-overflow" id="processo">
          <ProcessoSection />
        </div>

        {/* Processo Criativo — Lâmina 15 */}
        <div className="snap-section-overflow" id="processo-criativo">
          <ProcessoCriativoSection />
        </div>

        {/* FAQ — Lâminas 8–14 */}
        <div className="snap-section-overflow" id="faq">
          <FaqSection />
        </div>

        {/* Contato — Lâmina 16 */}
        <div className="snap-section" id="contato">
          <ContatoSection />
        </div>

        {/* Footer */}
        <div className="snap-section-overflow" id="footer">
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
