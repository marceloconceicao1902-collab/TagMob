import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ProcessoSection() {
  return (
    <DeckSplit
      id="processo"
      accent="white"
      badgeAccent="cyan"
      badgeGlyph="white"
      badgePosition="center"
    >
      <div className="flex flex-col gap-10 text-white">
        {/* COMO FUNCIONA O PROCESSO DE CRIAÇÃO? */}
        <div>
          <Reveal>
            <DeckHeading>
              COMO FUNCIONA
              <br />
              O PROCESSO
              <br />
              DE CRIAÇÃO?
            </DeckHeading>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-[0.975rem] leading-relaxed text-white sm:text-base">
            <Reveal delay={60}>
              <p>Cada campanha segue um fluxo estruturado.</p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                Os materiais são desenvolvidos por etapas, garantindo que cada entrega sirva de base para a próxima. Isso mantém a consistência da comunicação e evita retrabalho.
              </p>
            </Reveal>
          </div>
        </div>

        {/* COMO SÃO DEFINIDAS AS PRIORIDADES? */}
        <div className="border-t border-white/10 pt-10">
          <Reveal>
            <DeckHeading>
              COMO SÃO
              <br />
              DEFINIDAS AS
              <br />
              PRIORIDADES?
            </DeckHeading>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-[0.975rem] leading-relaxed text-white sm:text-base">
            <Reveal delay={60}>
              <p>
                Na <strong className="font-display font-black uppercase text-white">TAGMOB</strong>, cada campanha segue uma sequência lógica de desenvolvimento.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                Primeiro é construída a estratégia, depois a identidade visual e, somente então, os materiais de comunicação.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p>
                Assim garantimos que todas as peças mantenham unidade e fortalecem a marca do empreendimento.
              </p>
            </Reveal>
          </div>

          {/* FLUXO PADRÃO */}
          <div className="mt-8">
            <Reveal>
              <h4 className="font-display text-sm font-black uppercase tracking-wider text-white">
                FLUXO PADRÃO
              </h4>
            </Reveal>
            <ul className="mt-3 flex flex-col gap-2 font-display text-[0.95rem] font-semibold text-white">
              <Reveal delay={200}><li>Apresentação da Campanha</li></Reveal>
              <Reveal delay={240}><li>Job 001 – Key Visual</li></Reveal>
              <Reveal delay={280}><li>Job 002 – Brandbook</li></Reveal>
              <Reveal delay={320}><li>Job 003 – Assets da Campanha</li></Reveal>
              <Reveal delay={360}><li>Job 004 – Filme Conceito</li></Reveal>
              <Reveal delay={400}><li>Job 005 – Placa de Terreno</li></Reveal>
            </ul>
          </div>
        </div>
      </div>
    </DeckSplit>
  );
}
