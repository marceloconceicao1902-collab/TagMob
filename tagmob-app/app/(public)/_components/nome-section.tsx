import { NOME_FECHAMENTO, NOME_INTRO, NOME_PARTES } from "../_content";
import { ACCENT_HEX } from "./accents";
import { DeckHeading, Tag } from "./deck-split";
import { Reveal } from "./reveal";

export function NomeSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] bg-ink-deep px-6 py-20 sm:px-10 lg:py-28">
      <div
        aria-hidden
        className="deck-grid absolute inset-0"
        style={
          {
            "--deck-grid-color": "rgba(255,255,255,0.035)",
            "--deck-grid-size": "58px",
          } as React.CSSProperties
        }
      />

      <div className="relative z-10 mx-auto max-w-[84rem]">
        <div className="max-w-2xl">
          <Reveal>
            <DeckHeading>
              De onde vem o
              <br />
              nome TAGMOB?
            </DeckHeading>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-white/90 text-pretty sm:text-base">
              A <Tag /> {NOME_INTRO.replace("A TAGMOB ", "")}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {NOME_PARTES.map((parte, i) => (
            <Reveal key={parte.sigla} as="li" delay={i * 100}>
              <div
                className="flex h-full flex-col gap-4 rounded-2xl border bg-ink p-7"
                style={{
                  borderColor: `${ACCENT_HEX[parte.accent]}2E`,
                  boxShadow: `inset 0 1px 0 0 ${ACCENT_HEX[parte.accent]}14`,
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-display text-4xl font-black uppercase leading-none tracking-[-0.05em]"
                    style={{ color: ACCENT_HEX[parte.accent] }}
                  >
                    {parte.sigla}
                  </span>
                  <span className="font-display text-lg font-bold uppercase tracking-[-0.01em] text-white">
                    de {parte.conceito}
                  </span>
                </div>
                <p className="text-[0.9rem] leading-relaxed text-white/85 text-pretty">{parte.texto}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={340}>
          <p className="mt-11 max-w-3xl text-[0.95rem] leading-relaxed text-white/90 text-pretty sm:text-base">
            Na <Tag />, {NOME_FECHAMENTO.replace("Na TAGMOB, ", "")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
