import { COMO_FUNCIONA, COMO_FUNCIONA_PILARES } from "../_content";
import { DeckBody, DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ComoFuncionaSection() {
  return (
    <DeckSplit
      id="como-funciona"
      accent="white"
      badgeAccent="violet"
      badgePosition="center"
    >
      <Reveal>
        <DeckHeading>
          Como funciona
          <br />
          a TAGMOB?
        </DeckHeading>
      </Reveal>

      <div className="mt-7 flex flex-col gap-5">
        {COMO_FUNCIONA.map((paragrafo, i) => (
          <Reveal key={i} delay={80 + i * 60}>
            <DeckBody>{paragrafo}</DeckBody>
          </Reveal>
        ))}
      </div>

      <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
        {COMO_FUNCIONA_PILARES.map((pilar, i) => (
          <Reveal key={pilar.titulo} as="li" delay={200 + i * 70}>
            <div className="h-full bg-ink p-6">
              <p className="font-display text-sm font-bold uppercase tracking-wide text-violet">
                {pilar.titulo}
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-slate-100 font-medium text-pretty">{pilar.texto}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </DeckSplit>
  );
}
