import { PILARES, PILARES_INTRO_TITULO } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function PilaresSection() {
  return (
    <DeckSplit
      id="pilares"
      accent="violet"
      badgeAccent="white"
      badgeGlyph="violet"
      badgePosition="center"
    >
      <Reveal>
        <DeckHeading accent="violet">{PILARES_INTRO_TITULO}</DeckHeading>
      </Reveal>

      <div className="mt-10 flex flex-col gap-10">
        {PILARES.map((pilar, i) => (
          <Reveal key={pilar.sigla} delay={i * 100}>
            <div className="relative border-l-2 pl-6" style={{ borderColor: ACCENT_HEX[pilar.accent] }}>
              <span
                className="font-display text-xs font-black uppercase tracking-[0.14em]"
                style={{ color: ACCENT_HEX[pilar.accent] }}
              >
                {pilar.sigla}
              </span>
              <h3 className="mt-1 font-display text-xl font-black uppercase tracking-tight text-white sm:text-2xl">
                {pilar.titulo}
              </h3>
              <p className="mt-2 text-sm font-semibold text-white/90">
                {pilar.subtitulo}
              </p>
              <p className="mt-2 text-[0.925rem] leading-relaxed text-white/70 font-normal">
                {pilar.texto}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </DeckSplit>
  );
}

export { PilaresSection as NomeSection };
