import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { HERO_DESCRIPTION, HERO_HIGHLIGHTS, HERO_SUBTITLE, HERO_WORDS } from "../_content";
import { ACCENT_HEX } from "./accents";
import { Reveal } from "./reveal";
import { TagmobWordmark } from "./tagmob-mark";

const TONE_COLOR: Record<(typeof HERO_WORDS)[number]["tone"], string> = {
  white: "#FFFFFF",
  pink: ACCENT_HEX.pink,
  green: ACCENT_HEX.green,
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#0E0E1C] px-6 py-20 sm:px-10 lg:py-28"
    >
      {/* Grid de linhas decorativo */}
      <div
        aria-hidden
        className="deck-grid absolute inset-0 opacity-40"
        style={
          {
            "--deck-grid-color": "rgba(255,255,255,0.06)",
            "--deck-grid-size": "56px",
          } as React.CSSProperties
        }
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles size={14} className="text-pink" />
            <span className="font-display text-xs font-bold uppercase tracking-wider text-pink">
              Plataforma Criativa Imobiliária
            </span>
          </div>
        </Reveal>

        {/* PENSAR. CRIAR. CONECTAR. */}
        <div className="flex w-full justify-center">
          <h1 className="inline-flex flex-col text-center font-display text-[clamp(3.5rem,11.5vw,8rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]">
            {HERO_WORDS.map((word, i) => (
              <Reveal key={word.text} as="div" delay={i * 100} className="w-full text-center">
                <span style={{ color: TONE_COLOR[word.tone] }}>
                  {word.text}
                </span>
              </Reveal>
            ))}
          </h1>
        </div>

        {/* Subtítulo & Descrição */}
        <Reveal delay={350} className="mt-8 max-w-2xl">
          <h2 className="font-display text-lg font-bold text-white sm:text-xl md:text-2xl">
            {HERO_SUBTITLE}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
            {HERO_DESCRIPTION}
          </p>
        </Reveal>

        {/* Destaques: Mais controle, Mais velocidade, Mais criatividade */}
        <Reveal delay={450} className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-cyan">
          {HERO_HIGHLIGHTS.map((item, idx) => (
            <span key={item} className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3.5 py-1.5 border border-white/10 text-xs sm:text-sm">
              <span className="size-1.5 rounded-full bg-cyan" />
              {item}
            </span>
          ))}
        </Reveal>

        {/* Botão de ação */}
        <Reveal delay={550} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#manifesto"
            className="inline-flex items-center gap-2.5 rounded-xl bg-pink px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-pink/30 transition-all hover:scale-[1.03]"
          >
            Conheça a Plataforma <ArrowRight size={18} />
          </a>
          <Link
            href="/simulador"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white/50 hover:bg-white/10"
          >
            Tabela de Preços
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
