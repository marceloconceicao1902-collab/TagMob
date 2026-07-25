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
    <section className="relative overflow-hidden bg-ink px-6 pb-24 pt-20 sm:px-10 lg:pb-32 lg:pt-28">
      <div
        aria-hidden
        className="deck-grid absolute inset-0"
        style={
          {
            "--deck-grid-color": "rgba(255,255,255,0.045)",
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
            opacity: 0.1,
            ...piece.style,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <TagmobWordmark
            accent="cyan"
            className="mb-10 text-2xl text-white sm:text-3xl"
          />
        </Reveal>

        <h1 className="font-display text-[clamp(2.9rem,10.5vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]">
          {HERO_WORDS.map((word, i) => (
            <Reveal key={word.text} as="span" delay={i * 110} className="block">
              <span style={{ color: TONE_COLOR[word.tone] }}>{word.text}</span>
            </Reveal>
          ))}
        </h1>

        <Reveal delay={480}>
          <p className="mx-auto mt-9 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            {HERO_SUBTITLE}
          </p>
        </Reveal>

        <Reveal delay={580}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/simulador"
              className="inline-flex items-center gap-2.5 rounded-xl bg-pink px-7 py-3.5 text-[0.95rem] font-bold text-white transition-transform hover:scale-[1.03]"
            >
              Montar meu projeto <ArrowRight size={17} />
            </Link>
            <a
              href="#manifesto"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-[0.95rem] font-semibold text-white/75 transition-colors hover:border-white/45 hover:text-white"
            >
              Ler o manifesto
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
