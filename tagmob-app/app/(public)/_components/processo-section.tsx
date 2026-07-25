import { FLUXO_PADRAO, PRIORIDADES, PROCESSO_CRIACAO } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, Tag } from "./deck-split";
import { Reveal } from "./reveal";

export function ProcessoSection() {
  return (
    <section
      id="processo"
      className="relative scroll-mt-16 border-t border-white/[0.07] bg-ink px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[84rem]">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <DeckHeading>
                Como funciona
                <br />
                o processo
                <br />
                de criação?
              </DeckHeading>
            </Reveal>
            <div className="mt-6 flex flex-col gap-4">
              {PROCESSO_CRIACAO.map((p, i) => (
                <Reveal key={i} as="p" delay={80 + i * 60}>
                  <span className="text-[0.95rem] leading-relaxed text-white font-normal text-pretty sm:text-base">
                    {p}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <DeckHeading>
                Como são
                <br />
                definidas as
                <br />
                prioridades?
              </DeckHeading>
            </Reveal>
            <div className="mt-6 flex flex-col gap-4">
              <Reveal as="p" delay={80}>
                <span className="text-[0.95rem] leading-relaxed text-white font-normal text-pretty sm:text-base">
                  Na <Tag />, {PRIORIDADES[0].replace("Na TAGMOB, ", "")}
                </span>
              </Reveal>
              {PRIORIDADES.slice(1).map((p, i) => (
                <Reveal key={i} as="p" delay={140 + i * 60}>
                  <span className="text-[0.95rem] leading-relaxed text-white font-normal text-pretty sm:text-base">
                    {p}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <Reveal>
            <p className="font-display text-xs font-black uppercase tracking-[0.18em] text-white/70">
              Fluxo padrão
            </p>
          </Reveal>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FLUXO_PADRAO.map((etapa, i) => (
              <Reveal key={etapa.titulo} as="li" delay={i * 80}>
                <div
                  className="flex h-full items-center gap-4 rounded-xl border bg-ink-deep p-5"
                  style={{ borderColor: `${ACCENT_HEX[etapa.accent]}2A` }}
                >
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-md font-display text-[0.7rem] font-black"
                    style={{
                      color: ACCENT_HEX[etapa.accent],
                      backgroundColor: `${ACCENT_HEX[etapa.accent]}18`,
                    }}
                  >
                    {String(i).padStart(2, "0")}
                  </span>
                  <div>
                    <p
                      className="font-display text-[0.68rem] font-black uppercase tracking-[0.12em]"
                      style={{ color: ACCENT_HEX[etapa.accent] }}
                    >
                      {etapa.codigo}
                    </p>
                    <p className="mt-0.5 text-[0.9rem] font-semibold text-white">{etapa.titulo}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
