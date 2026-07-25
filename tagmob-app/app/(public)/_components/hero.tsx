import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HERO_SUBTITLE, HERO_WORDS } from "../_content";
import { ACCENT_HEX, type Accent } from "./accents";
import { Reveal } from "./reveal";
import { TagmobWordmark } from "./tagmob-mark";

const TONE_COLOR: Record<(typeof HERO_WORDS)[number]["tone"], string> = {
  white: "#FFFFFF",
  pink: ACCENT_HEX.pink,
  green: ACCENT_HEX.green,
};

/** Peças decorativas do Tetris posicionadas fora do bloco de texto. */
const PIECES: Array<{ accent: Accent; w: number; h: number; style: React.CSSProperties }> = [
  { accent: "pink", w: 72, h: 72, style: { top: "14%", left: "6%", rotate: "12deg" } },
  { accent: "green", w: 52, h: 52, style: { bottom: "18%", left: "11%", rotate: "-18deg" } },
  { accent: "amber", w: 56, h: 84, style: { top: "20%", right: "7%", rotate: "9deg" } },
  { accent: "cyan", w: 44, h: 44, style: { bottom: "22%", right: "13%", rotate: "-9deg" } },
  { accent: "violet", w: 40, h: 80, style: { top: "58%", left: "3%", rotate: "22deg" } },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[82vh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-20 sm:px-10 lg:py-28">
      <div
        aria-hidden
        className="deck-grid absolute inset-0"
        style={
          {
            "--deck-grid-color": "rgba(255,255,255,0.05)",
            "--deck-grid-size": "62px",
          } as React.CSSProperties
        }
      />

      {PIECES.map((piece, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute hidden rounded-[6px] lg:block"
          style={{
            width: piece.w,
            height: piece.h,
            backgroundColor: ACCENT_HEX[piece.accent],
            opacity: 0.12,
            ...piece.style,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <Reveal>
          <TagmobWordmark
            accent="cyan"
            className="mb-8 text-2xl text-white sm:text-3xl"
          />
        </Reveal>

        <h1 className="flex w-full flex-col items-center justify-center font-display text-[clamp(3rem,10.5vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] text-center">
          {HERO_WORDS.map((word, i) => (
            <Reveal key={word.text} as="div" delay={i * 110} className="flex w-full justify-center text-center">
              <span className="block text-center" style={{ color: TONE_COLOR[word.tone] }}>
                {word.text}
              </span>
            </Reveal>
          ))}
        </h1>

        <Reveal delay={480} className="flex w-full justify-center">
          <p className="mx-auto mt-9 max-w-2xl text-center text-balance text-base leading-relaxed text-slate-100 font-medium whitespace-pre-line sm:text-lg">
            {HERO_SUBTITLE}
          </p>
        </Reveal>

        <Reveal delay={580} className="flex w-full justify-center">
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/simulador"
              className="inline-flex items-center gap-2.5 rounded-xl bg-pink px-8 py-3.5 text-[0.95rem] font-bold text-white transition-all hover:scale-[1.03] shadow-lg shadow-pink/20"
            >
              Montar meu projeto <ArrowRight size={17} />
            </Link>
            <a
              href="#manifesto"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              Ler o manifesto
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
