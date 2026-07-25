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
      <div className="flex flex-col gap-6">
        {/* Parágrafos */}
        <div className="flex flex-col gap-3.5">
          {O_QUE_E.map((paragrafo, i) => (
            <Reveal key={i} delay={i * 65}>
              <p style={{ color: "#FFFFFF" }} className="text-[0.9375rem] leading-[1.72]">
                {i === 0 ? <><Tag /> {paragrafo.replace("A TAGMOB ", "")}</> : paragrafo}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Grade de pilares 2×2 */}
        <Reveal delay={260}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {COMO_FUNCIONA_PILARES.map((pilar) => (
              <div
                key={pilar.titulo}
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                <p
                  className="mb-2 font-display text-[0.65rem] font-black uppercase tracking-[0.12em]"
                  style={{ color: ACCENT_HEX.pink }}
                >
                  {pilar.titulo}
                </p>
                <p style={{ color: "#FFFFFF" }} className="text-[0.875rem] leading-[1.68]">
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
