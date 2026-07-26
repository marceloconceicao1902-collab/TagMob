import { MANIFESTO_PARAGRAFOS, MANIFESTO_TITULO } from "../_content";
import { DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ManifestoSection() {
  return (
    <DeckSplit
      id="manifesto"
      accent="pink"
      badgeAccent="white"
      badgeGlyph="pink"
      panelTitle={"O MERCADO MUDOU.\nA FORMA DE CRIAR TAMBÉM."}
    >
      <Reveal>
        <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-pink sm:text-3xl lg:text-4xl">
          {MANIFESTO_TITULO}
        </h2>
      </Reveal>

      <div className="mt-8 flex flex-col gap-5">
        {MANIFESTO_PARAGRAFOS.map((paragrafo, i) => (
          <Reveal key={i} as="p" delay={i * 60}>
            <span
              className={
                i === MANIFESTO_PARAGRAFOS.length - 1
                  ? "font-display text-base font-black uppercase tracking-tight text-white sm:text-lg"
                  : "text-[0.95rem] leading-relaxed text-white/90 font-normal sm:text-[1.05rem]"
              }
            >
              {paragrafo}
            </span>
          </Reveal>
        ))}
      </div>
    </DeckSplit>
  );
}
