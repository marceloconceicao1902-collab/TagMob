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
      <div className="flex flex-col gap-6">
        {/* Heading */}
        <div>
          <Reveal>
            <DeckHeading>
              DE ONDE VEM O
              <br />
              NOME TAGMOB?
            </DeckHeading>
          </Reveal>
          <Reveal delay={70}>
            <p style={{ color: "#FFFFFF" }} className="mt-3 text-[0.875rem] leading-[1.7] sm:text-[0.9375rem]">
              <Tag /> {NOME_INTRO.replace("A TAGMOB ", "")}
            </p>
          </Reveal>
        </div>

        {/* T · AG · MOB */}
        <div className="flex flex-col gap-2.5">
          {NOME_PARTES.map((parte, i) => (
            <Reveal key={parte.sigla} delay={130 + i * 65}>
              <div
                className="flex gap-4 rounded-xl border p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: `${ACCENT_HEX[parte.accent]}38`,
                }}
              >
                <div className="shrink-0 pt-0.5">
                  <span
                    className="font-display text-2xl font-black uppercase leading-none"
                    style={{ color: ACCENT_HEX[parte.accent] }}
                  >
                    {parte.sigla}
                  </span>
                  <p
                    className="mt-0.5 font-display text-[0.6rem] font-bold uppercase tracking-wide"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                  >
                    de {parte.conceito}
                  </p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.88)" }} className="text-[0.82rem] leading-[1.65]">
                  {parte.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Fechamento */}
        <Reveal delay={380}>
          <p
            style={{ color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.09)" }}
            className="border-t pt-4 text-[0.82rem] leading-[1.65] italic"
          >
            {NOME_FECHAMENTO}
          </p>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
