"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { FAQ } from "../_content";
import { DeckHeading } from "./deck-split";
import { Reveal } from "./reveal";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative scroll-mt-16 border-t border-white/[0.07] bg-ink-deep px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <DeckHeading>
              Perguntas
              <br />
              frequentes
            </DeckHeading>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white font-normal text-pretty">
              Tudo o que incorporadoras e construtoras costumam perguntar antes de começar uma
              campanha na TAGMOB.
            </p>
          </Reveal>
        </div>

        <ul className="flex flex-col">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;

            return (
              <Reveal key={item.pergunta} as="li" delay={Math.min(i, 6) * 50}>
                <div className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-start gap-5 py-5 text-left"
                  >
                    <span className="flex-1 font-display text-[1.05rem] font-bold uppercase leading-tight tracking-[-0.015em] text-white sm:text-[1.2rem]">
                      {item.pergunta}
                    </span>
                    <Plus
                      size={18}
                      className={`mt-0.5 shrink-0 text-pink transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={panelId}
                    hidden={!isOpen}
                    className="flex flex-col gap-3 pb-6 pr-8"
                  >
                    {item.destaque && (
                      <p
                        className={`font-display text-sm font-black uppercase tracking-[0.08em] ${
                          item.destaque === "Sim." ? "text-green" : "text-pink"
                        }`}
                      >
                        {item.destaque}
                      </p>
                    )}
                    {item.resposta.map((paragrafo) => (
                      <p
                        key={paragrafo}
                        className="text-[0.925rem] leading-relaxed text-white font-normal text-pretty"
                      >
                        {paragrafo}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
