import { FAQ } from "../_content";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function FaqSection() {
  return (
    <DeckSplit
      id="faq"
      accent="white"
      badgeAccent="pink"
      badgeGlyph="white"
      badgePosition="center"
    >
      <Reveal>
        <DeckHeading>
          PERGUNTAS
          <br />
          FREQUENTES
        </DeckHeading>
      </Reveal>

      <div className="mt-8 flex flex-col gap-6 text-white">
        {FAQ.map((item, i) => (
          <Reveal key={item.pergunta} delay={i * 30}>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-pink/30 hover:bg-white/[0.06]">
              <h3 className="font-display text-base font-black uppercase leading-snug tracking-tight text-pink sm:text-lg">
                {item.pergunta}
              </h3>
              <div className="mt-2 text-[0.925rem] leading-relaxed text-white/80 font-normal sm:text-base">
                {Array.isArray(item.resposta) ? (
                  item.resposta.map((paragrafo) => <p key={paragrafo}>{paragrafo}</p>)
                ) : (
                  <p>{item.resposta}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </DeckSplit>
  );
}
