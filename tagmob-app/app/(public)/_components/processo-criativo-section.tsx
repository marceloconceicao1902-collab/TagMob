import { PROCESSO_CRIATIVO, PROCESSO_CRIATIVO_FECHAMENTO } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ProcessoCriativoSection() {
  return (
    <DeckSplit
      id="processo-criativo"
      accent="violet"
      badgeAccent="green"
      panelTitle={"PROCESSO\nCRIATIVO"}
    >
      <div className="flex flex-col gap-6">
        {PROCESSO_CRIATIVO.map((etapa, i) => (
          <Reveal key={etapa.titulo} delay={i * 80}>
            <div
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: `${ACCENT_HEX[etapa.accent]}35`,
              }}
            >
              {/* Linha de separação colorida no topo */}
              <div
                className="mb-4 h-0.5 w-8 rounded-full"
                style={{ backgroundColor: ACCENT_HEX[etapa.accent] }}
              />
              <p
                className="mb-3 font-display text-xl font-black uppercase tracking-[-0.03em]"
                style={{ color: ACCENT_HEX[etapa.accent] }}
              >
                {etapa.titulo}
              </p>
              <div className="flex flex-col gap-1.5">
                {etapa.linhas.map((linha) => (
                  <p
                    key={linha}
                    style={{ color: "rgba(255,255,255,0.88)" }}
                    className="text-[0.95rem] leading-[1.65]"
                  >
                    {linha}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        {/* Fechamento */}
        <Reveal delay={440}>
          <div
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            {PROCESSO_CRIATIVO_FECHAMENTO.map((linha) => (
              <p
                key={linha}
                style={{ color: "#FFFFFF" }}
                className="font-display text-base font-bold leading-[1.6] sm:text-lg"
              >
                {linha}
              </p>
            ))}
            <p
              style={{ color: "#3AFF17" }}
              className="mt-3 font-display text-xl font-black uppercase tracking-[-0.03em] sm:text-2xl"
            >
              Isso é TAGMOB.
            </p>
          </div>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
