import { FAQ } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function FaqSection() {
  return (
    <DeckSplit
      accent="pink"
      badgeAccent="white"
      badgeGlyph="pink"
      panelTitle={"PERGUNTAS\nFREQUENTES"}
    >
      <div className="flex flex-col gap-3">
        {FAQ.map((item, i) => (
          <Reveal key={item.pergunta} delay={Math.min(i, 8) * 35}>
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.09)",
              }}
            >
              {/* Pergunta */}
              <h3
                className="font-display text-[0.875rem] font-black uppercase leading-snug tracking-[-0.01em]"
                style={{ color: "#FF0068" }}
              >
                {item.pergunta}
              </h3>

              {/* Destaque (Sim. / Não.) */}
              {item.destaque && (
                <p
                  className="mt-1.5 font-display text-[0.72rem] font-black uppercase tracking-wide"
                  style={{
                    color: item.destaque === "Sim." ? "#3AFF17" : ACCENT_HEX.amber,
                  }}
                >
                  {item.destaque}
                </p>
              )}

              {/* Resposta */}
              <div className="mt-2 flex flex-col gap-1.5">
                {item.resposta.map((paragrafo) => (
                  <p
                    key={paragrafo}
                    style={{ color: "rgba(255,255,255,0.87)" }}
                    className="text-[0.875rem] leading-[1.68]"
                  >
                    {paragrafo}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </DeckSplit>
  );
}
