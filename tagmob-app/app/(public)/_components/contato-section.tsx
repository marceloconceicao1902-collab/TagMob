import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CONTATO } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

function StackedWordmark() {
  return (
    <div
      aria-hidden
      className="relative z-10 font-display font-black uppercase leading-[0.82] tracking-[-0.06em]"
      style={{ fontSize: "clamp(3rem,13vw,6.5rem)" }}
    >
      <span style={{ color: "#3AFF17" }} className="block">TAG</span>
      <span style={{ color: "#0E0E1C" }} className="block">MOB</span>
    </div>
  );
}

export function ContatoSection() {
  return (
    <DeckSplit
      id="contato"
      accent="white"
      badgeAccent="violet"
      badgePosition="center"
      panelExtra={<StackedWordmark />}
    >
      <div className="flex flex-col gap-10">
        {/* WHATSAPP */}
        <Reveal>
          <div
            className="rounded-2xl border p-7"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              borderColor: `${ACCENT_HEX.green}35`,
            }}
          >
            <p
              className="mb-1 font-display text-[0.65rem] font-black uppercase tracking-[0.15em]"
              style={{ color: ACCENT_HEX.green }}
            >
              Contato direto
            </p>
            <h2
              className="font-display text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              {CONTATO.whatsapp.titulo}
            </h2>
            <div className="mt-3 flex flex-col gap-1">
              {CONTATO.whatsapp.texto.map((linha) => (
                <p key={linha} style={{ color: "rgba(255,255,255,0.80)" }} className="text-[0.95rem] leading-[1.7]">
                  {linha}
                </p>
              ))}
            </div>
            <a
              href={CONTATO.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-75"
              style={{ color: ACCENT_HEX.green }}
            >
              {CONTATO.whatsapp.label} <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        {/* SUPORTE */}
        <Reveal delay={100}>
          <div
            className="rounded-2xl border p-7"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              borderColor: `${ACCENT_HEX.cyan}35`,
            }}
          >
            <p
              className="mb-1 font-display text-[0.65rem] font-black uppercase tracking-[0.15em]"
              style={{ color: ACCENT_HEX.cyan }}
            >
              Plataforma
            </p>
            <h2
              className="font-display text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              {CONTATO.suporte.titulo}
            </h2>
            <div className="mt-3 flex flex-col gap-1">
              {CONTATO.suporte.texto.map((linha) => (
                <p key={linha} style={{ color: "rgba(255,255,255,0.80)" }} className="text-[0.95rem] leading-[1.7]">
                  {linha}
                </p>
              ))}
            </div>
            <Link
              href={CONTATO.suporte.href}
              className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-75"
              style={{ color: ACCENT_HEX.cyan }}
            >
              {CONTATO.suporte.label} <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        {/* CTA final */}
        <Reveal delay={200}>
          <div
            className="flex items-center justify-between rounded-2xl border p-6"
            style={{
              backgroundColor: "rgba(255,0,104,0.08)",
              borderColor: "rgba(255,0,104,0.25)",
            }}
          >
            <a
              href={CONTATO.siteHref}
              className="font-display text-sm font-black uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              {CONTATO.site}
            </a>
            <Link
              href="/simulador"
              className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: "#FF0068" }}
            >
              Iniciar Projeto <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
