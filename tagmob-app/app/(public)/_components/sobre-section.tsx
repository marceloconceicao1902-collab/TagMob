import { O_QUE_E, COMO_FUNCIONA_PILARES } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, DeckSplit, Tag } from "./deck-split";
import { Reveal } from "./reveal";

export function SobreSection() {
  return (
    <DeckSplit
      accent="cyan"
      badgeAccent="pink"
      badgePosition="center"
      panelTitle={"O QUE É\nA TAGMOB?"}
    >
      <div className="flex flex-col gap-5">
        {/* Parágrafos */}
        <div className="flex flex-col gap-3">
          {O_QUE_E.map((paragrafo, i) => (
            <Reveal key={i} delay={i * 60}>
              <p style={{ color: "#FFFFFF" }} className="text-[0.875rem] leading-[1.7] sm:text-[0.9375rem]">
                {i === 0 ? <><Tag /> {paragrafo.replace("A TAGMOB ", "")}</> : paragrafo}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Grade de pilares 2×2 */}
        <Reveal delay={240}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {COMO_FUNCIONA_PILARES.map((pilar) => (
              <div
                key={pilar.titulo}
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.09)",
                }}
              >
                <p
                  className="mb-1.5 font-display text-[0.6rem] font-black uppercase tracking-[0.12em]"
                  style={{ color: ACCENT_HEX.pink }}
                >
                  {pilar.titulo}
                </p>
                <p style={{ color: "#FFFFFF" }} className="text-[0.8rem] leading-[1.65]">
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
