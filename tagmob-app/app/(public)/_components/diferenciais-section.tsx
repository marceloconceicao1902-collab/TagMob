import { Check, X } from "lucide-react";

import { DIFERENCIAIS_FECHAMENTO, DIFERENCIAIS_TABELA, DIFERENCIAIS_TITULO } from "../_content";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function DiferenciaisSection() {
  return (
    <DeckSplit
      id="diferenciais"
      accent="white"
      badgeAccent="violet"
      badgeGlyph="white"
      badgePosition="center"
    >
      <Reveal>
        <DeckHeading>{DIFERENCIAIS_TITULO}</DeckHeading>
      </Reveal>

      {/* Tabela Comparativa Visual */}
      <div className="mt-8 flex flex-col gap-4">
        {/* Cabeçalho da Tabela */}
        <div className="grid grid-cols-2 gap-3 pb-2 font-display text-xs font-black uppercase tracking-wider text-white">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-red-400">
            Modelo Tradicional (Agência)
          </div>
          <div className="rounded-xl border border-green/30 bg-green/10 p-3 text-green">
            Plataforma TAGMOB
          </div>
        </div>

        {/* Linhas Comparativas */}
        {DIFERENCIAIS_TABELA.map((linha, i) => (
          <Reveal key={linha.item} delay={i * 40}>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-white/60">
                <X size={16} className="mt-0.5 shrink-0 text-red-400" />
                <span>{linha.tradicional}</span>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl border border-green/20 bg-green/[0.05] p-3.5 text-white font-medium">
                <Check size={16} className="mt-0.5 shrink-0 text-green" />
                <span>{linha.tagmob}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={380} className="mt-8">
        <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center font-display text-sm font-bold text-white sm:text-base">
          {DIFERENCIAIS_FECHAMENTO}
        </p>
      </Reveal>
    </DeckSplit>
  );
}
