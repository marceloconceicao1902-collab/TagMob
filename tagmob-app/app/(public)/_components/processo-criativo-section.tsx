import { PROCESSO_CRIATIVO, PROCESSO_CRIATIVO_FECHAMENTO } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ProcessoCriativoSection() {
  return (
    <DeckSplit
      accent="violet"
      badgeAccent="green"
      panelTitle={"PROCESSO\nCRIATIVO"}
    >
      <div className="flex flex-col gap-2.5">
        {PROCESSO_CRIATIVO.map((etapa, i) => (
          <Reveal key={etapa.titulo} delay={i * 65}>
            <div
              className="flex gap-4 rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: `${ACCENT_HEX[etapa.accent]}30`,
              }}
            >
              {/* Linha decorativa vertical */}
              <div
                className="mt-1 w-0.5 shrink-0 self-stretch rounded-full"
                style={{ backgroundColor: ACCENT_HEX[etapa.accent] }}
              />
              <div>
                <p
                  className="font-display text-[0.75rem] font-black uppercase tracking-[0.06em]"
                  style={{ color: ACCENT_HEX[etapa.accent] }}
                >
                  {etapa.titulo}
                </p>
                <div className="mt-1.5 flex flex-col gap-1">
                  {etapa.linhas.map((linha) => (
                    <p
                      key={linha}
                      style={{ color: "rgba(255,255,255,0.85)" }}
                      className="text-[0.82rem] leading-[1.6]"
                    >
                      {linha}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Fechamento */}
        <Reveal delay={400}>
          <div
            className="rounded-xl border p-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            {PROCESSO_CRIATIVO_FECHAMENTO.map((linha) => (
              <p
                key={linha}
                style={{ color: "#FFFFFF" }}
                className="font-display text-[0.85rem] font-bold leading-[1.6]"
              >
                {linha}
              </p>
            ))}
            <p
              style={{ color: "#3AFF17" }}
              className="mt-2 font-display text-base font-black uppercase tracking-[-0.02em]"
            >
              Isso é TAGMOB.
            </p>
          </div>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
