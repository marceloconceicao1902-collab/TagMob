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
      className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-10 sm:px-10"
      style={{ backgroundColor: "#0E0E1C" }}
    >
      {/* Grade do deck */}
      <div
        aria-hidden
        className="deck-grid absolute inset-0"
        style={
          {
            "--deck-grid-color": "rgba(255,255,255,0.055)",
            "--deck-grid-size": "56px",
          } as React.CSSProperties
        }
      />

      {/* Brilho central sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,0,104,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        {/* Wordmark */}
        <Reveal>
          <TagmobWordmark
            accent="cyan"
            className="mb-12 text-2xl sm:text-3xl"
          />
        </Reveal>

        {/* PENSAR. CRIAR. CONSTRUIR. CONECTAR. */}
        <div className="flex w-full justify-center">
          <h1
            className="inline-flex flex-col text-left font-display font-black uppercase"
            style={{
              fontSize: "clamp(3.5rem, 12.5vw, 8.25rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
            }}
          >
            {HERO_WORDS.map((word, i) => (
              <Reveal key={word.text} as="div" delay={i * 100}>
                <span className="block" style={{ color: TONE_COLOR[word.tone] }}>
                  {word.text}
                </span>
              </Reveal>
            ))}
          </h1>
        </div>

        {/* Subtítulo */}
        <Reveal delay={480}>
          <p
            className="mx-auto mt-12 max-w-xl text-center text-[1.05rem] leading-[1.75]"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            A primeira plataforma criativa desenvolvida para o mercado imobiliário.
            <br />
            Estratégia, branding, criação, conteúdo, mídia e tecnologia em um único ecossistema.
          </p>
        </Reveal>

        {/* Botões */}
        <Reveal delay={600}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/simulador"
              className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.03]"
              style={{ backgroundColor: "#FF0068", boxShadow: "0 0 32px rgba(255,0,104,0.30)" }}
            >
              Iniciar Projeto <ArrowRight size={18} />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-4 font-display text-sm font-bold uppercase tracking-wider transition-all hover:opacity-80"
              style={{
                border: "1px solid rgba(255,255,255,0.20)",
                backgroundColor: "rgba(255,255,255,0.05)",
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
