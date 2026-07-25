import { PROCESSO_CRIACAO, PRIORIDADES, FLUXO_PADRAO } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ProcessoSection() {
  return (
    <DeckSplit
      accent="white"
      badgeAccent="cyan"
      badgePosition="center"
      panelTitle={"PROCESSO\nE\nPRIORIDADES"}
    >
      <div className="flex flex-col gap-6">
        {/* Processo de Criação */}
        <div>
          <Reveal>
            <DeckHeading>PROCESSO DE CRIAÇÃO</DeckHeading>
          </Reveal>
          <div className="mt-2 flex flex-col gap-2">
            {PROCESSO_CRIACAO.map((p, i) => (
              <Reveal key={i} delay={60 + i * 50}>
                <p style={{ color: "#FFFFFF" }} className="text-[0.875rem] leading-[1.7]">
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
          <div className="mt-2 flex flex-col gap-2">
            {PRIORIDADES.map((p, i) => (
              <Reveal key={i} delay={60 + i * 50}>
                <p style={{ color: "#FFFFFF" }} className="text-[0.875rem] leading-[1.7]">
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
          <ol className="mt-2 flex flex-col gap-1.5">
            {FLUXO_PADRAO.map((item, i) => (
              <Reveal key={item.titulo} as="li" delay={i * 45}>
                <div
                  className="flex items-center gap-3 rounded-lg border px-4 py-2.5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: `${ACCENT_HEX[item.accent]}30`,
                  }}
                >
                  {item.codigo !== "—" && (
                    <span
                      className="shrink-0 font-display text-[0.6rem] font-black uppercase tracking-[0.1em]"
                      style={{ color: ACCENT_HEX[item.accent] }}
                    >
                      {item.codigo}
                    </span>
                  )}
                  <span
                    className="font-display text-[0.8rem] font-bold uppercase tracking-tight"
                    style={{ color: "#FFFFFF" }}
                  >
                    {item.titulo}
                  </span>
                  <span
                    className="ml-auto size-1.5 shrink-0 rounded-[2px]"
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
