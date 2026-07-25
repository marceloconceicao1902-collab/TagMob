import { FAQ } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, DeckSplit } from "./deck-split";
import { Reveal } from "./reveal";

export function FaqSection() {
  return (
    <DeckSplit
      id="faq"
      accent="pink"
      badgeAccent="white"
      badgeGlyph="pink"
      panelTitle={"PERGUNTAS\nFREQUENTES"}
    >
      <div className="flex flex-col gap-4">
        {FAQ.map((item, i) => (
          <Reveal key={item.pergunta} delay={Math.min(i, 8) * 40}>
            <div
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              {/* Pergunta */}
              <h3
                className="font-display text-[0.95rem] font-black uppercase leading-tight tracking-[-0.01em] sm:text-[1.05rem]"
                style={{ color: "#FF0068" }}
              >
                {item.pergunta}
              </h3>

              {/* Destaque (Sim. / Não.) */}
              {item.destaque && (
                <p
                  className="mt-2 font-display text-sm font-black uppercase tracking-wide"
                  style={{
                    color: item.destaque === "Sim." ? "#3AFF17" : ACCENT_HEX.amber,
                  }}
                >
                  {item.destaque}
                </p>
              )}

              {/* Resposta */}
              <div className="mt-3 flex flex-col gap-2">
                {item.resposta.map((paragrafo) => (
                  <p
                    key={paragrafo}
                    style={{ color: "rgba(255,255,255,0.88)" }}
                    className="text-[0.9rem] leading-[1.7]"
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
