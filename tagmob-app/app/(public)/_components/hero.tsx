import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HERO_WORDS } from "../_content";
import { ACCENT_HEX } from "./accents";
import { Reveal } from "./reveal";
import { TagmobWordmark } from "./tagmob-mark";

const TONE_COLOR: Record<(typeof HERO_WORDS)[number]["tone"], string> = {
  white: "#FFFFFF",
  pink: "#FF0068",
  green: "#3AFF17",
};

export function Hero() {
  return (
    <section
      className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-6 sm:px-10"
      style={{ backgroundColor: "#0E0E1C" }}
    >
      {/* Grade do deck */}
      <div
        aria-hidden
        className="deck-grid absolute inset-0"
        style={
          {
            "--deck-grid-color": "rgba(255,255,255,0.05)",
            "--deck-grid-size": "56px",
          } as React.CSSProperties
        }
      />
      {/* Brilho central */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 38%, rgba(255,0,104,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
        {/* Wordmark */}
        <Reveal>
          <TagmobWordmark
            accent="cyan"
            className="mb-8 text-xl sm:text-2xl"
            style={{ color: "#FFFFFF" }}
          />
        </Reveal>

        {/* PENSAR. CRIAR. CONSTRUIR. CONECTAR. */}
        <div className="flex w-full justify-center">
          <h1
            className="inline-flex flex-col text-left font-display font-black uppercase"
            style={{
              fontSize: "clamp(2.8rem,10vw,7rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
            }}
          >
            {HERO_WORDS.map((word, i) => (
              <Reveal key={word.text} as="div" delay={i * 90}>
                <span className="block" style={{ color: TONE_COLOR[word.tone] }}>
                  {word.text}
                </span>
              </Reveal>
            ))}
          </h1>
        </div>

        {/* Subtítulo */}
        <Reveal delay={420}>
          <p
            className="mx-auto mt-8 max-w-lg text-center text-[0.875rem] leading-[1.7] sm:text-[0.9375rem]"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            A primeira plataforma criativa do mercado imobiliário.
            <br />
            Estratégia, branding, criação, conteúdo e mídia em um único ecossistema.
          </p>
        </Reveal>

        {/* Botões */}
        <Reveal delay={540}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/simulador"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-display text-[0.8rem] font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.03]"
              style={{ backgroundColor: "#FF0068", boxShadow: "0 0 28px rgba(255,0,104,0.28)" }}
            >
              Iniciar Projeto <ArrowRight size={16} />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-display text-[0.8rem] font-bold uppercase tracking-wider transition-all hover:opacity-80"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#FFFFFF",
              }}
            >
              Entrar na Plataforma
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
