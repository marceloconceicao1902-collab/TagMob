import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { MODELO_DESTAQUES, MODELO_FECHAMENTO, MODELO_FORMATOS, MODELO_TEXTO, MODELO_TITULO } from "../_content";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ModeloSection() {
  return (
    <DeckSplit
      id="modelo"
      accent="cyan"
      badgeAccent="pink"
      badgeGlyph="cyan"
      badgePosition="center"
    >
      <Reveal>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1 text-xs font-bold text-cyan">
          <ShieldCheck size={14} />
          PREVISIBILIDADE FINANCEIRA
        </div>
        <DeckHeading accent="cyan">{MODELO_TITULO}</DeckHeading>
      </Reveal>

      {/* Destaques sem VGV */}
      <div className="mt-6 flex flex-col gap-2.5">
        {MODELO_DESTAQUES.map((item, i) => (
          <Reveal key={item} delay={i * 60}>
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-pink" />
              <span className="font-display text-base font-black uppercase text-pink sm:text-lg">
                {item}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="mt-6 text-[0.975rem] leading-relaxed text-white/80 sm:text-base">
          {MODELO_TEXTO}
        </p>
      </Reveal>

      {/* Os 3 formatos */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {MODELO_FORMATOS.map((formato, i) => (
          <Reveal key={formato.titulo} delay={260 + i * 60}>
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all hover:border-cyan/40 hover:bg-white/[0.08]">
              <div>
                <h3 className="font-display text-base font-black uppercase tracking-tight text-white">
                  {formato.titulo}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  {formato.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={450} className="mt-8 border-t border-white/10 pt-6">
        <p className="font-display text-sm font-black uppercase tracking-wider text-cyan">
          {MODELO_FECHAMENTO}
        </p>

        <div className="mt-6">
          <Link
            href="/simulador"
            className="inline-flex items-center gap-2.5 rounded-xl bg-pink px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.03]"
          >
            Simular Escopo e Investimento <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </DeckSplit>
  );
}
