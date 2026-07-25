import { PROCESSO_CRIACAO, PRIORIDADES, FLUXO_PADRAO } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ProcessoSection() {
  return (
    <DeckSplit
      id="processo"
      accent="white"
      badgeAccent="cyan"
      badgePosition="center"
    >
      <div className="flex flex-col gap-12">
        {/* Processo de Criação */}
        <div>
          <Reveal>
            <DeckHeading>
              PROCESSO
              <br />
              DE CRIAÇÃO
            </DeckHeading>
          </Reveal>
          <div className="mt-5 flex flex-col gap-4">
            {PROCESSO_CRIACAO.map((p, i) => (
              <Reveal key={i} delay={80 + i * 60}>
                <p style={{ color: "#FFFFFF" }} className="text-[1rem] leading-[1.75] sm:text-[1.05rem]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Prioridades */}
        <div>
          <Reveal>
            <DeckHeading>PRIORIDADES</DeckHeading>
          </Reveal>
          <div className="mt-5 flex flex-col gap-4">
            {PRIORIDADES.map((p, i) => (
              <Reveal key={i} delay={80 + i * 60}>
                <p style={{ color: "#FFFFFF" }} className="text-[1rem] leading-[1.75] sm:text-[1.05rem]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Fluxo Padrão */}
        <div>
          <Reveal>
            <DeckHeading accent="cyan">FLUXO PADRÃO</DeckHeading>
          </Reveal>
          <ol className="mt-6 flex flex-col gap-2">
            {FLUXO_PADRAO.map((item, i) => (
              <Reveal key={item.titulo} as="li" delay={i * 60}>
                <div
                  className="flex items-center gap-4 rounded-xl border px-5 py-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: `${ACCENT_HEX[item.accent]}35`,
                  }}
                >
                  {item.codigo !== "—" && (
                    <span
                      className="shrink-0 font-display text-[0.65rem] font-black uppercase tracking-[0.1em]"
                      style={{ color: ACCENT_HEX[item.accent] }}
                    >
                      {item.codigo}
                    </span>
                  )}
                  <span
                    className="font-display text-[0.9rem] font-bold uppercase tracking-tight"
                    style={{ color: "#FFFFFF" }}
                  >
                    {item.titulo}
                  </span>
                  <span
                    className="ml-auto size-2 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: ACCENT_HEX[item.accent] }}
                  />
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </DeckSplit>
  );
}
