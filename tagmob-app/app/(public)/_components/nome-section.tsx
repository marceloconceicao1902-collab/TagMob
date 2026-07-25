import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function NomeSection() {
  return (
    <DeckSplit
      id="a-tagmob"
      accent="white"
      badgeAccent="violet"
      badgeGlyph="white"
      badgePosition="center"
    >
      <div className="flex flex-col gap-10 text-white">
        {/* DE ONDE VEM O NOME TAGMOB? */}
        <div>
          <Reveal>
            <DeckHeading>
              DE ONDE VEM O
              <br />
              NOME TAGMOB?
            </DeckHeading>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-[0.975rem] leading-relaxed text-white sm:text-base">
            <Reveal delay={60}>
              <p>
                A <strong className="font-display font-black uppercase text-white">TAGMOB</strong> nasce da união de três conceitos que definem nossa essência.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p>
                <strong className="font-display font-black text-white">T de Tetris:</strong> acreditamos que estratégia, branding, criação, mídia e conteúdo são peças que precisam se encaixar com inteligência para gerar resultados.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p>
                <strong className="font-display font-black text-white">AG de Agência:</strong> somos especialistas em transformar empreendimentos em marcas fortes, unindo planejamento, criatividade e execução.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p>
                <strong className="font-display font-black text-white">MOB de Mobilidade:</strong> atuamos com flexibilidade para montar equipes, processos e soluções sob medida para cada desafio.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p>
                Na <strong className="font-display font-black uppercase text-white">TAGMOB</strong>, cada peça tem uma função, cada estratégia tem um propósito e cada projeto é construído para gerar valor e resultados. Porque grandes marcas nascem quando tudo se encaixa.
              </p>
            </Reveal>
          </div>
        </div>

        {/* COMO FUNCIONA A TAGMOB? */}
        <div id="como-funciona" className="scroll-mt-20 border-t border-white/10 pt-10">
          <Reveal>
            <DeckHeading>
              COMO FUNCIONA
              <br />
              A TAGMOB?
            </DeckHeading>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-[0.975rem] leading-relaxed text-white sm:text-base">
            <Reveal delay={80}>
              <p>
                Todo o relacionamento acontece pela plataforma. Briefings, pedidos, aprovações, alterações, arquivos e acompanhamento dos projetos ficam centralizados em um único ambiente.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p>
                Você acompanha cada etapa da campanha em tempo real, sem depender de mensagens, e-mails ou ligações para saber o andamento dos trabalhos.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </DeckSplit>
  );
}
