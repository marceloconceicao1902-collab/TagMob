import { MANIFESTO } from "../_content";
import { DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function ManifestoSection() {
  return (
    <DeckSplit
      accent="pink"
      badgeAccent="white"
      badgeGlyph="pink"
      panelTitle={"MANIFESTO\nTAGMOB"}
    >
      <div className="flex flex-col gap-5">
        {MANIFESTO.map((paragrafo, i) => (
          <Reveal key={i} delay={i * 45}>
            <p
              style={{ color: "#FFFFFF" }}
              className={
                i === MANIFESTO.length - 1
                  ? "font-display text-[1.05rem] font-black uppercase tracking-[-0.02em]"
                  : "text-[0.9375rem] leading-[1.72]"
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
