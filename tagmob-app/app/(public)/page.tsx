import { ComoFuncionaSection } from "./_components/como-funciona-section";
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
    <div className="min-h-screen overflow-x-hidden bg-ink text-white">
      <SiteNav />
      <main>
        <Hero />
        <ManifestoSection />
        <SobreSection />
        <NomeSection />
        <ComoFuncionaSection />
        <ProcessoSection />
        <ProcessoCriativoSection />
        <FaqSection />
        <ContatoSection />
      </main>
      <SiteFooter />
    </div>
  );
}
