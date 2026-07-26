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

      <div className="mt-8 flex flex-col gap-8 text-white">
        {FAQ.map((item, i) => (
          <Reveal key={item.pergunta} delay={i * 30}>
            <div className="border-b border-white/10 pb-6">
              <h3 className="font-display text-[1.05rem] font-black uppercase leading-tight tracking-tight text-[#FF0068] sm:text-xl">
                {item.pergunta}
              </h3>
              {item.destaque && (
                <p className="mt-2 font-display text-sm font-black uppercase text-white">
                  {item.destaque}
                </p>
              )}
              <div className="mt-2 flex flex-col gap-1 text-[0.95rem] leading-relaxed text-white font-normal sm:text-base">
                {item.resposta.map((paragrafo) => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </DeckSplit>
  );
}
