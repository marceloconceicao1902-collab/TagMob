import { O_QUE_E } from "../_content";
import { DeckBody, DeckHeading, DeckSplit, Tag } from "./deck-split";
import { Reveal } from "./reveal";

export function SobreSection() {
  const [primeiro, ...resto] = O_QUE_E;

  return (
    <DeckSplit id="a-tagmob" accent="cyan" badgeAccent="pink" badgePosition="center">
      <Reveal>
        <DeckHeading>
          O que é a
          <br />
          TAGMOB?
        </DeckHeading>
      </Reveal>

      <div className="mt-7 flex flex-col gap-5">
        <Reveal as="p" delay={80}>
          <span className="text-[0.95rem] leading-relaxed text-white/90 text-pretty sm:text-base">
            A <Tag /> {primeiro.replace("A TAGMOB ", "")}
          </span>
        </Reveal>

        {resto.map((paragrafo, i) => (
          <Reveal key={i} delay={140 + i * 60}>
            <DeckBody>{paragrafo}</DeckBody>
          </Reveal>
        ))}
      </div>
    </DeckSplit>
  );
}
