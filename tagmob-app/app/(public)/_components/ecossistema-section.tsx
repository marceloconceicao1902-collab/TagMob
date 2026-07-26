import { LayoutGrid, ShieldAlert, Sparkles } from "lucide-react";

import { ECOSSISTEMA_MODULOS, ECOSSISTEMA_OBSERVACAO_ESTRATEGICA, ECOSSISTEMA_TITULO } from "../_content";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function EcossistemaSection() {
  return (
    <DeckSplit
      id="ecossistema"
      accent="pink"
      badgeAccent="cyan"
      badgeGlyph="pink"
      badgePosition="center"
    >
      <Reveal>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink/30 bg-pink/10 px-3.5 py-1 text-xs font-bold text-pink">
          <LayoutGrid size={14} />
          ECOSSISTEMA INTEGRADO
        </div>
        <DeckHeading accent="pink">{ECOSSISTEMA_TITULO}</DeckHeading>
      </Reveal>

      {/* Grid com os 12 módulos em cards */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ECOSSISTEMA_MODULOS.map((modulo, i) => (
          <Reveal key={modulo} delay={i * 40}>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-sm transition-colors hover:border-pink/40 hover:bg-white/[0.08]">
              <span className="size-2 shrink-0 rounded-full bg-pink" />
              <span className="text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
                {modulo}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <p className="mt-6 text-center font-display text-sm font-black uppercase tracking-wider text-pink">
          Tudo integrado em uma única plataforma.
        </p>
      </Reveal>

      {/* Observação Estratégica — Diferencial de Posicionamento */}
      <Reveal delay={380} className="mt-8">
        <div className="relative overflow-hidden rounded-2xl border border-cyan/30 bg-cyan/5 p-6 backdrop-blur-md">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan/20 text-cyan">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="font-display text-sm font-black uppercase tracking-wider text-cyan">
                Observação Estratégica de Posicionamento
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-white/90 sm:text-sm font-medium">
                {ECOSSISTEMA_OBSERVACAO_ESTRATEGICA}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </DeckSplit>
  );
}
