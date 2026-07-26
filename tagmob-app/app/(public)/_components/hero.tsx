import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HERO_WORDS } from "../_content";
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
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#0E0E1C] px-6 py-20 sm:px-10 lg:py-28">
      {/* Grid de linhas exato do deck */}
      <div
        aria-hidden
        className="deck-grid absolute inset-0"
        style={
          {
            "--deck-grid-color": "rgba(255,255,255,0.06)",
            "--deck-grid-size": "56px",
          } as React.CSSProperties
        }
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <Reveal>
          <TagmobWordmark
            accent="cyan"
            className="mb-10 text-2xl text-white sm:text-3xl"
          />
        </Reveal>

        {/* Lâmina 3 do PDF: PENSAR. CRIAR. CONSTRUIR. CONECTAR. */}
        <div className="flex w-full justify-center">
          <h1 className="inline-flex flex-col text-left font-display text-[clamp(3.5rem,12.5vw,8.25rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]">
            {HERO_WORDS.map((word, i) => (
              <Reveal key={word.text} as="div" delay={i * 100} className="w-full text-left">
                <span className="block text-left" style={{ color: TONE_COLOR[word.tone] }}>
                  {word.text}
                </span>
              </Reveal>
            ))}
          </h1>
        </div>

        {/* Botões de simulação e login */}
        <Reveal delay={450} className="mt-14 flex w-full justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/simulador"
              className="inline-flex items-center gap-2.5 rounded-xl bg-pink px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.03] shadow-xl shadow-pink/30"
            >
              Iniciar Projeto <ArrowRight size={18} />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white/50 hover:bg-white/10"
            >
              Entrar na Plataforma
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
