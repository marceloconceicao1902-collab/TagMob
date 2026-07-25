import { NOME_PARTES, NOME_INTRO, NOME_FECHAMENTO } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, DeckSplit, Tag } from "./deck-split";
import { Reveal } from "./reveal";

export function NomeSection() {
  return (
    <DeckSplit
      accent="white"
      badgeAccent="violet"
      badgePosition="center"
    >
      <div className="flex flex-col gap-7">
        {/* Heading */}
        <div>
          <Reveal>
            <DeckHeading>
              DE ONDE VEM O
              <br />
              NOME TAGMOB?
            </DeckHeading>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ color: "#FFFFFF" }} className="mt-3 text-[0.9375rem] leading-[1.72]">
              <Tag /> {NOME_INTRO.replace("A TAGMOB ", "")}
            </p>
          </Reveal>
        </div>

        {/* T · AG · MOB */}
        <div className="flex flex-col gap-3">
          {NOME_PARTES.map((parte, i) => (
            <Reveal key={parte.sigla} delay={140 + i * 70}>
              <div
                className="flex gap-4 rounded-xl border p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderColor: `${ACCENT_HEX[parte.accent]}40`,
                }}
              >
                <div className="shrink-0 w-14 pt-0.5">
                  <span
                    className="block font-display text-2xl font-black uppercase leading-none"
                    style={{ color: ACCENT_HEX[parte.accent] }}
                  >
                    {parte.sigla}
                  </span>
                  <span
                    className="block mt-1 font-display text-[0.6rem] font-bold uppercase tracking-wide"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    de {parte.conceito}
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.90)" }} className="text-[0.875rem] leading-[1.68]">
                  {parte.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Fechamento */}
        <Reveal delay={400}>
          <p
            style={{ color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.10)" }}
            className="border-t pt-5 text-[0.875rem] leading-[1.68] italic"
          >
            {NOME_FECHAMENTO}
          </p>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
