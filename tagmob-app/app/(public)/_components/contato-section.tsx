import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CONTATO } from "../_content";
import { DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

/** Wordmark "TAG / MOB" empilhado, como no fechamento do deck. */
function StackedWordmark() {
  return (
    <div
      aria-hidden
      className="relative z-10 font-display text-[clamp(3.25rem,14vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.06em]"
    >
      <span className="block text-green">TAG</span>
      <span className="block text-ink-deep">MOB</span>
    </div>
  );
}

export function ContatoSection() {
  const blocos = [
    { ...CONTATO.whatsapp, external: true },
    { ...CONTATO.suporte, external: false },
  ];

  return (
    <DeckSplit
      id="contato"
      accent="white"
      badgeAccent="violet"
      badgePosition="center"
      panelExtra={<StackedWordmark />}
    >
      <div className="flex flex-col gap-12">
        {blocos.map((bloco, i) => (
          <Reveal key={bloco.titulo} as="div" delay={i * 110}>
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black uppercase leading-none tracking-[-0.04em] text-white">
              {bloco.titulo}
            </h2>
            <div className="mt-4 flex flex-col gap-1">
              {bloco.texto.map((linha) => (
                <p key={linha} className="text-[0.95rem] leading-relaxed text-white font-normal text-pretty">
                  {linha}
                </p>
              ))}
            </div>
            {bloco.external ? (
              <a
                href={bloco.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-green transition-opacity hover:opacity-75"
              >
                {bloco.label} <ArrowUpRight size={16} />
              </a>
            ) : (
              <Link
                href={bloco.href}
                className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-cyan transition-opacity hover:opacity-75"
              >
                {bloco.label} <ArrowRight size={16} />
              </Link>
            )}
          </Reveal>
        ))}

        <Reveal delay={240}>
          <div className="border-t border-white/10 pt-8">
            <a
              href={CONTATO.siteHref}
              className="font-display text-sm font-black uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
            >
              {CONTATO.site}
            </a>
            <div className="mt-6">
              <Link
                href="/simulador"
                className="inline-flex items-center gap-2.5 rounded-xl bg-pink px-7 py-3.5 text-[0.95rem] font-bold text-white transition-transform hover:scale-[1.03]"
              >
                Montar meu projeto <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
