import { O_QUE_E, COMO_FUNCIONA_PILARES } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, DeckSplit, Tag } from "./deck-split";
import { Reveal } from "./reveal";

export function SobreSection() {
  return (
    <DeckSplit
      id="a-tagmob"
      accent="cyan"
      badgeAccent="pink"
      badgePosition="center"
      panelTitle={"O QUE É\nA TAGMOB?"}
    >
      <div className="flex flex-col gap-8">
        {/* Parágrafos explicativos */}
        <div className="flex flex-col gap-5">
          {O_QUE_E.map((paragrafo, i) => (
            <Reveal key={i} delay={i * 70}>
              <p style={{ color: "#FFFFFF" }} className="text-[1rem] leading-[1.75] sm:text-[1.05rem]">
                {i === 0 ? <><Tag /> {paragrafo.replace("A TAGMOB ", "")}</> : paragrafo}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Grade de pilares: Briefings / Aprovações / Arquivos / Acompanhamento */}
        <Reveal delay={280}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {COMO_FUNCIONA_PILARES.map((pilar, i) => (
              <div
                key={pilar.titulo}
                className="rounded-xl border p-5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                <p
                  className="mb-2 font-display text-[0.7rem] font-black uppercase tracking-[0.12em]"
                  style={{ color: ACCENT_HEX.pink }}
                >
                  {pilar.titulo}
                </p>
                <p style={{ color: "#FFFFFF" }} className="text-[0.9rem] leading-relaxed">
                  {pilar.texto}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </DeckSplit>
  );
}
