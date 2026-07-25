import { ACCENT_HEX, ACCENT_ON, type Accent } from "./accents";
import { TagmobBadge } from "./tagmob-mark";

function gridColor(accent: Accent) {
  return ACCENT_ON[accent] === "#FFFFFF"
    ? "rgba(255,255,255,0.10)"
    : "rgba(0,0,0,0.10)";
}

/**
 * Layout assinatura do deck: coluna escura à esquerda,
 * painel sólido à direita e badge "T." pousado na emenda.
 */
export function DeckSplit({
  id,
  accent,
  badgeAccent,
  badgeGlyph,
  badgePosition = "top",
  panelTitle,
  panelExtra,
  children,
}: {
  id?: string;
  accent: Accent;
  badgeAccent?: Accent;
  badgeGlyph?: Accent;
  badgePosition?: "top" | "center";
  panelTitle?: string;
  panelExtra?: React.ReactNode;
  children: React.ReactNode;
}) {
  const panelFg = ACCENT_ON[accent];

  return (
    <section
      id={id}
      className="relative grid scroll-mt-20 lg:grid-cols-[1fr_minmax(0,0.75fr)]"
      style={{ backgroundColor: "#141425" }}
    >
      {/* Painel colorido à direita */}
      <div
        className={`relative order-first flex flex-col justify-center px-8 sm:px-12 lg:order-last lg:min-h-[600px] lg:px-14 lg:py-24 ${
          panelTitle || panelExtra ? "min-h-[180px] py-10" : "min-h-0 py-0"
        }`}
        style={{ backgroundColor: ACCENT_HEX[accent], color: panelFg }}
      >
        {/* Grid de linhas */}
        <div
          aria-hidden
          className="deck-grid absolute inset-0 overflow-hidden"
          style={
            {
              "--deck-grid-color": gridColor(accent),
              "--deck-grid-size": "54px",
            } as React.CSSProperties
          }
        />

        {/* Badge na emenda (apenas desktop) */}
        {badgeAccent && (
          <div
            className={`absolute left-0 z-20 hidden -translate-x-1/2 lg:block ${
              badgePosition === "top" ? "top-14" : "top-1/2 -translate-y-1/2"
            }`}
          >
            <TagmobBadge
              accent={badgeAccent}
              glyph={badgeGlyph}
              size={58}
              className="rounded-[14px] shadow-2xl"
            />
          </div>
        )}

        {panelTitle && (
          <h2
            className="relative z-10 font-display text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] whitespace-pre-line sm:text-5xl lg:text-[clamp(2.8rem,4.5vw,4.5rem)]"
          >
            {panelTitle}
          </h2>
        )}

        {panelExtra}
      </div>

      {/* Coluna escura com o conteúdo */}
      <div className="relative order-last px-8 py-16 sm:px-12 lg:order-first lg:px-16 lg:py-24 xl:px-20">
        {/* Badge mobile */}
        {badgeAccent && (
          <TagmobBadge
            accent={badgeAccent}
            glyph={badgeGlyph}
            size={44}
            className="mb-8 rounded-xl lg:hidden"
          />
        )}
        <div className="mx-auto max-w-[46rem] lg:mx-0">{children}</div>
      </div>
    </section>
  );
}

/** Título de seção do deck em acento (rosa por padrão). */
export function DeckHeading({
  children,
  accent = "pink",
  className,
}: {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[clamp(2rem,5vw,3.25rem)] font-black uppercase leading-[0.94] tracking-[-0.035em] ${className ?? ""}`}
      style={{ color: ACCENT_HEX[accent] }}
    >
      {children}
    </h2>
  );
}

/** Parágrafo padrão da coluna escura — branco puro, tamanho confortável. */
export function DeckBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      style={{ color: "#FFFFFF" }}
      className={`text-[1rem] leading-[1.75] sm:text-[1.05rem] ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/** Rótulo de label colorido (ex: "BRIEFINGS E PEDIDOS"). */
export function DeckLabel({
  children,
  accent = "pink",
}: {
  children: React.ReactNode;
  accent?: Accent;
}) {
  return (
    <p
      className="font-display text-[0.7rem] font-black uppercase tracking-[0.12em]"
      style={{ color: ACCENT_HEX[accent] }}
    >
      {children}
    </p>
  );
}

/** "TAGMOB" inline em caixa alta — branco, peso máximo. */
export function Tag({ children = "TAGMOB" }: { children?: React.ReactNode }) {
  return (
    <strong
      className="font-display font-black uppercase tracking-[-0.02em]"
      style={{ color: "#FFFFFF" }}
    >
      {children}
    </strong>
  );
}
