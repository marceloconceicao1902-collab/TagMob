import { MANIFESTO } from "../_content";
import { DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ManifestoSection() {
  return (
    <DeckSplit
      id="manifesto"
      accent="pink"
      badgeAccent="white"
      badgeGlyph="pink"
      panelTitle={"MANIFESTO\nTAGMOB"}
    >
      <div className="flex flex-col gap-5">
        {MANIFESTO.map((paragrafo, i) => (
          <Reveal key={i} as="p" delay={i * 60}>
            <span
              className={
                i === MANIFESTO.length - 1
                  ? "font-display text-lg font-black uppercase tracking-[-0.02em] text-white sm:text-xl"
                  : "text-[0.95rem] leading-relaxed text-white font-normal whitespace-pre-line sm:text-[1.05rem]"
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
