import { ArrowDown } from "lucide-react";

import { COMO_FUNCIONA_ETAPAS } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ComoFuncionaSection() {
  return (
    <DeckSplit
      id="como-funciona"
      accent="white"
      badgeAccent="cyan"
      badgeGlyph="white"
      badgePosition="center"
    >
      <Reveal>
        <DeckHeading>
          COMO
          <br />
          FUNCIONA
        </DeckHeading>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70">
          Cada campanha segue um fluxo estruturado de transição por etapas para garantir máxima qualidade e zero retrabalho.
        </p>
      </Reveal>

      {/* Fluxo de Transição por Etapa (1 a 6 com conectores ↓) */}
      <div className="mt-10 flex flex-col gap-3">
        {COMO_FUNCIONA_ETAPAS.map((etapa, index) => (
          <div key={etapa.numero} className="flex flex-col items-start">
            <Reveal delay={index * 80} className="w-full">
              <div className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.06]">
                <div className="flex items-start gap-4">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl font-display text-lg font-black text-white shadow-lg"
                    style={{ backgroundColor: ACCENT_HEX[etapa.accent] }}
                  >
                    {etapa.numero}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-black uppercase tracking-tight text-white sm:text-xl">
                      {etapa.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75 font-normal">
                      {etapa.descricao}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Seta de transição por etapa ↓ (exceto na última) */}
            {index < COMO_FUNCIONA_ETAPAS.length - 1 && (
              <Reveal delay={index * 80 + 40} className="my-2.5 flex w-full justify-center">
                <div className="flex flex-col items-center gap-1 text-cyan/70">
                  <ArrowDown size={18} className="animate-bounce" />
                </div>
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </DeckSplit>
  );
}
