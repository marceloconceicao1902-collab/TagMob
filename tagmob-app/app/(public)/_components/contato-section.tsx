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
      style={{ fontSize: "clamp(2.5rem,10vw,5.5rem)", color: "#0E0E1C" }}
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
      <div className="flex flex-col gap-4">
        {/* WHATSAPP */}
        <Reveal>
          <div
            className="rounded-xl border p-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              borderColor: `${ACCENT_HEX.green}32`,
            }}
          >
            <p className="mb-1 font-display text-[0.6rem] font-black uppercase tracking-[0.14em]" style={{ color: ACCENT_HEX.green }}>
              Contato direto
            </p>
            <h2 className="font-display text-xl font-black uppercase tracking-[-0.04em] sm:text-2xl" style={{ color: "#FFFFFF" }}>
              {CONTATO.whatsapp.titulo}
            </h2>
            <div className="mt-2 flex flex-col gap-0.5">
              {CONTATO.whatsapp.texto.map((linha) => (
                <p key={linha} style={{ color: "rgba(255,255,255,0.75)" }} className="text-[0.82rem] leading-[1.65]">
                  {linha}
                </p>
              ))}
            </div>
            <a
              href={CONTATO.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.75rem] font-bold uppercase tracking-wide transition-opacity hover:opacity-70"
              style={{ color: ACCENT_HEX.green }}
            >
              {CONTATO.whatsapp.label} <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>

        {/* SUPORTE */}
        <Reveal delay={80}>
          <div
            className="rounded-xl border p-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              borderColor: `${ACCENT_HEX.cyan}32`,
            }}
          >
            <p className="mb-1 font-display text-[0.6rem] font-black uppercase tracking-[0.14em]" style={{ color: ACCENT_HEX.cyan }}>
              Plataforma
            </p>
            <h2 className="font-display text-xl font-black uppercase tracking-[-0.04em] sm:text-2xl" style={{ color: "#FFFFFF" }}>
              {CONTATO.suporte.titulo}
            </h2>
            <div className="mt-2 flex flex-col gap-0.5">
              {CONTATO.suporte.texto.map((linha) => (
                <p key={linha} style={{ color: "rgba(255,255,255,0.75)" }} className="text-[0.82rem] leading-[1.65]">
                  {linha}
                </p>
              ))}
            </div>
            <Link
              href={CONTATO.suporte.href}
              className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.75rem] font-bold uppercase tracking-wide transition-opacity hover:opacity-70"
              style={{ color: ACCENT_HEX.cyan }}
            >
              {CONTATO.suporte.label} <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        {/* CTA final */}
        <Reveal delay={160}>
          <div
            className="flex items-center justify-between rounded-xl border px-5 py-4"
            style={{ backgroundColor: "rgba(255,0,104,0.07)", borderColor: "rgba(255,0,104,0.22)" }}
          >
            <a
              href={CONTATO.siteHref}
              className="font-display text-[0.65rem] font-black uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              {CONTATO.site}
            </a>
            <Link
              href="/simulador"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-display text-[0.75rem] font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: "#FF0068" }}
            >
              Iniciar Projeto <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
