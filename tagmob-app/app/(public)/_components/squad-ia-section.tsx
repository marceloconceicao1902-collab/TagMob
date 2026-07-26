import { Users, Bot, Sparkles, CheckCircle2 } from "lucide-react";

import {
  IA_BENEFICIOS,
  IA_DESCRICAO,
  IA_SUBTITULO,
  IA_TITULO,
  SQUAD_TEXTOS,
  SQUAD_TITULO,
} from "../_content";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function SquadIaSection() {
  return (
    <DeckSplit
      id="squads"
      accent="green"
      badgeAccent="white"
      badgeGlyph="green"
      badgePosition="center"
    >
      <div className="flex flex-col gap-12 text-white">
        {/* BLOCO SQUAD */}
        <div>
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3.5 py-1 text-xs font-bold text-green">
              <Users size={14} />
              SQUADS ESPECIALIZADOS
            </div>
            <DeckHeading accent="green">{SQUAD_TITULO}</DeckHeading>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-[0.975rem] leading-relaxed text-white/80 sm:text-base">
            {SQUAD_TEXTOS.map((texto, i) => (
              <Reveal key={i} delay={80 + i * 60}>
                <p>{texto}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* BLOCO INTELIGÊNCIA ARTIFICIAL */}
        <div className="border-t border-white/10 pt-10">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1 text-xs font-bold text-cyan">
              <Bot size={14} />
              IA + INTELIGÊNCIA HUMANA
            </div>
            <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
              {IA_TITULO}
            </h2>
            <p className="mt-2 font-display text-base font-bold text-cyan">
              {IA_SUBTITULO}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70">
              {IA_DESCRICAO}
            </p>
          </Reveal>

          <div className="mt-6 flex flex-col gap-3">
            {IA_BENEFICIOS.map((beneficio, i) => (
              <Reveal key={beneficio} delay={160 + i * 60}>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <CheckCircle2 size={18} className="shrink-0 text-green" />
                  <span className="font-display text-sm font-bold uppercase text-white">
                    {beneficio}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </DeckSplit>
  );
}

export { SquadIaSection as ProcessoCriativoSection };
