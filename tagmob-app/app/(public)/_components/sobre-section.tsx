import { O_QUE_E_DESTAQUES, O_QUE_E_TEXTO, O_QUE_E_TITULO } from "../_content";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function SobreSection() {
  return (
    <DeckSplit id="a-tagmob" accent="cyan" badgeAccent="pink" badgePosition="center">
      <Reveal>
        <DeckHeading>{O_QUE_E_TITULO}</DeckHeading>
      </Reveal>

      <div className="mt-7 flex flex-col gap-5">
        {O_QUE_E_TEXTO.map((paragrafo, i) => (
          <Reveal key={i} delay={80 + i * 60}>
            <p className="text-[0.975rem] leading-relaxed text-white font-normal sm:text-base">
              {paragrafo}
            </p>
          </Reveal>
        ))}

        <div className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-6">
          {O_QUE_E_DESTAQUES.map((destaque, i) => (
            <Reveal key={destaque} delay={240 + i * 60}>
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-cyan" />
                <span className="font-display text-base font-black uppercase tracking-tight text-cyan">
                  {destaque}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </DeckSplit>
  );
}
