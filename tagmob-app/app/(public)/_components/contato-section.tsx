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
      className="font-display font-black uppercase leading-[0.82] tracking-[-0.06em]"
      style={{ fontSize: "clamp(2.8rem, 10vw, 5.5rem)", color: "#0E0E1C" }}
    >
      <span style={{ color: "#3AFF17" }} className="block">TAG</span>
      <span className="block">MOB</span>
    </div>
  );
}

export function ContatoSection() {
  return (
    <DeckSplit
      accent="white"
      badgeAccent="violet"
      badgePosition="center"
      panelExtra={<StackedWordmark />}
    >
      <div className="flex flex-col gap-5">
        {/* WHATSAPP */}
        <Reveal>
          <div
            className="rounded-xl border p-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderColor: `${ACCENT_HEX.green}35`,
            }}
          >
            <p className="mb-1 font-display text-[0.65rem] font-black uppercase tracking-[0.14em]" style={{ color: ACCENT_HEX.green }}>
              Contato direto
            </p>
            <h2 className="font-display text-[1.5rem] font-black uppercase tracking-[-0.04em]" style={{ color: "#FFFFFF" }}>
              {CONTATO.whatsapp.titulo}
            </h2>
            <div className="mt-2.5 flex flex-col gap-1">
              {CONTATO.whatsapp.texto.map((linha) => (
                <p key={linha} style={{ color: "rgba(255,255,255,0.78)" }} className="text-[0.875rem] leading-[1.68]">
                  {linha}
                </p>
              ))}
            </div>
            <a
              href={CONTATO.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-display text-[0.78rem] font-bold uppercase tracking-wide transition-opacity hover:opacity-70"
              style={{ color: ACCENT_HEX.green }}
            >
              {CONTATO.whatsapp.label} <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>

        {/* SUPORTE */}
        <Reveal delay={90}>
          <div
            className="rounded-xl border p-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderColor: `${ACCENT_HEX.cyan}35`,
            }}
          >
            <p className="mb-1 font-display text-[0.65rem] font-black uppercase tracking-[0.14em]" style={{ color: ACCENT_HEX.cyan }}>
              Plataforma
            </p>
            <h2 className="font-display text-[1.5rem] font-black uppercase tracking-[-0.04em]" style={{ color: "#FFFFFF" }}>
              {CONTATO.suporte.titulo}
            </h2>
            <div className="mt-2.5 flex flex-col gap-1">
              {CONTATO.suporte.texto.map((linha) => (
                <p key={linha} style={{ color: "rgba(255,255,255,0.78)" }} className="text-[0.875rem] leading-[1.68]">
                  {linha}
                </p>
              ))}
            </div>
            <Link
              href={CONTATO.suporte.href}
              className="mt-4 inline-flex items-center gap-2 font-display text-[0.78rem] font-bold uppercase tracking-wide transition-opacity hover:opacity-70"
              style={{ color: ACCENT_HEX.cyan }}
            >
              {CONTATO.suporte.label} <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* CTA final */}
        <Reveal delay={180}>
          <div
            className="flex items-center justify-between rounded-xl border px-5 py-4"
            style={{ backgroundColor: "rgba(255,0,104,0.07)", borderColor: "rgba(255,0,104,0.22)" }}
          >
            <a
              href={CONTATO.siteHref}
              className="font-display text-[0.68rem] font-black uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              {CONTATO.site}
            </a>
            <Link
              href="/simulador"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-display text-[0.78rem] font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: "#FF0068" }}
            >
              Iniciar Projeto <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
