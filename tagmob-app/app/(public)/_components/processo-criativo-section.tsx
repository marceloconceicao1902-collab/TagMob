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
      <ol className="flex flex-col">
        {PROCESSO_CRIATIVO.map((etapa, i) => (
          <Reveal key={etapa.titulo} as="li" delay={i * 90}>
            <div className="flex gap-5 pb-7">
              <div className="flex flex-col items-center pt-1.5">
                <span
                  className="size-2.5 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: ACCENT_HEX[etapa.accent] }}
                />
                {i < PROCESSO_CRIATIVO.length - 1 && (
                  <span
                    className="mt-1 w-px flex-1"
                    style={{ backgroundColor: `${ACCENT_HEX[etapa.accent]}33` }}
                  />
                )}
              </div>
              <div>
                <p
                  className="font-display text-sm font-black uppercase tracking-[0.06em]"
                  style={{ color: ACCENT_HEX[etapa.accent] }}
                >
                  {etapa.titulo}
                </p>
                <div className="mt-1.5 flex flex-col gap-0.5">
                  {etapa.linhas.map((linha) => (
                    <p key={linha} className="text-[0.925rem] leading-relaxed text-slate-100 font-medium text-pretty">
                      {linha}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={480}>
        <div className="mt-2 border-t border-white/10 pt-7">
          {PROCESSO_CRIATIVO_FECHAMENTO.map((linha) => (
            <p key={linha} className="text-[0.95rem] leading-relaxed text-slate-100 font-medium text-pretty">
              {linha}
            </p>
          ))}
          <p className="mt-5 font-display text-xl font-black uppercase tracking-[-0.02em] text-white sm:text-2xl">
            Isso é TAGMOB.
          </p>
        </div>
      </Reveal>
    </DeckSplit>
  );
}
