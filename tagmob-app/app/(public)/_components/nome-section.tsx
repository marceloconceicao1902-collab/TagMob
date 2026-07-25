import { NOME_PARTES, NOME_INTRO, NOME_FECHAMENTO } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, DeckSplit, Tag } from "./deck-split";
import { Reveal } from "./reveal";

export function NomeSection() {
  return (
    <DeckSplit
      id="nome"
      accent="white"
      badgeAccent="violet"
      badgePosition="center"
    >
      <div className="flex flex-col gap-10">
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
            <p style={{ color: "#FFFFFF" }} className="mt-5 text-[1rem] leading-[1.75] sm:text-[1.05rem]">
              <Tag /> {NOME_INTRO.replace("A TAGMOB ", "")}
            </p>
          </Reveal>
        </div>

        {/* T · AG · MOB — cards individuais */}
        <div className="flex flex-col gap-4">
          {NOME_PARTES.map((parte, i) => (
            <Reveal key={parte.sigla} delay={140 + i * 80}>
              <div
                className="rounded-2xl border p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: `${ACCENT_HEX[parte.accent]}40`,
                }}
              >
                <div className="mb-3 flex items-baseline gap-3">
                  <span
                    className="font-display text-3xl font-black uppercase leading-none tracking-[-0.05em]"
                    style={{ color: ACCENT_HEX[parte.accent] }}
                  >
                    {parte.sigla}
                  </span>
                  <span
                    className="font-display text-base font-bold uppercase tracking-wide"
                    style={{ color: "#FFFFFF" }}
                  >
                    de {parte.conceito}
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.85)" }} className="text-[0.9rem] leading-[1.7]">
                  {parte.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Fechamento */}
        <Reveal delay={420}>
          <p
            style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.10)" }}
            className="border-t pt-6 text-[0.95rem] leading-[1.75] italic"
          >
            {NOME_FECHAMENTO}
          </p>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
