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
      <div className="flex flex-col gap-6">
        {MANIFESTO.map((paragrafo, i) => (
          <Reveal key={i} delay={i * 55}>
            <p
              style={{ color: "#FFFFFF" }}
              className={
                i === MANIFESTO.length - 1
                  ? "font-display text-lg font-black uppercase tracking-[-0.02em] sm:text-xl"
                  : "text-[1rem] leading-[1.75] sm:text-[1.05rem]"
              }
            >
              {paragrafo}
            </p>
          </Reveal>
        ))}
      </div>
    </DeckSplit>
  );
}
