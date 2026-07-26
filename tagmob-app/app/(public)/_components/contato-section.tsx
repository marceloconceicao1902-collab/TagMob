import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CONTATO } from "../_content";
import { DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

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
  return (
    <DeckSplit
      id="contato"
      accent="white"
      badgeAccent="violet"
      badgePosition="center"
      panelExtra={<StackedWordmark />}
    >
      <div className="flex flex-col gap-10">
        {/* MANIFESTO FINAL */}
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <p className="font-display text-lg font-black uppercase tracking-tight text-pink sm:text-xl">
              O futuro do marketing imobiliário não é contratar uma agência.
            </p>
            <p className="mt-3 text-base font-bold text-white">
              É conectar estratégia, criatividade, tecnologia e pessoas em um único ecossistema.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              A TAGMOB transforma processos dispersos em uma operação integrada, inteligente e transparente.
            </p>
            <p className="mt-4 border-t border-white/10 pt-4 font-display text-sm font-black uppercase tracking-wide text-green">
              Porque o futuro não está apenas em criar campanhas. Está em conectar estratégia, pessoas, tecnologia e resultados.
            </p>
          </div>
        </Reveal>

        {/* CANAIS DE CONTATO */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal delay={120}>
            <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div>
                <h3 className="font-display text-base font-black uppercase text-white">
                  {CONTATO.whatsapp.titulo}
                </h3>
                {CONTATO.whatsapp.texto.map((linha) => (
                  <p key={linha} className="mt-1 text-xs text-white/70">
                    {linha}
                  </p>
                ))}
              </div>
              <a
                href={CONTATO.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-green transition-opacity hover:opacity-75"
              >
                {CONTATO.whatsapp.label} <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div>
                <h3 className="font-display text-base font-black uppercase text-white">
                  {CONTATO.suporte.titulo}
                </h3>
                {CONTATO.suporte.texto.map((linha) => (
                  <p key={linha} className="mt-1 text-xs text-white/70">
                    {linha}
                  </p>
                ))}
              </div>
              <Link
                href={CONTATO.suporte.href}
                className="mt-4 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-cyan transition-opacity hover:opacity-75"
              >
                {CONTATO.suporte.label} <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* BOTAO FINAL SIMULADOR */}
        <Reveal delay={240}>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={CONTATO.siteHref}
              className="font-display text-xs font-black uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white"
            >
              {CONTATO.site}
            </a>
            <Link
              href="/simulador"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.03]"
            >
              Montar meu projeto <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
