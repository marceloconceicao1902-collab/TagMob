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
    <div style={{ backgroundColor: "#0E0E1C", color: "#FFFFFF" }} className="min-h-screen overflow-x-hidden">
      <SiteNav />
      <main>
        <Hero />
        <ManifestoSection />
        <SobreSection />
        <NomeSection />
        <ProcessoSection />
        <ProcessoCriativoSection />
        <FaqSection />
        <ContatoSection />
      </main>
      <SiteFooter />
    </div>
  );
}
