import { ACCENT_HEX, ACCENT_ON, type Accent } from "./accents";
import { TagmobBadge } from "./tagmob-mark";

function gridColor(accent: Accent) {
  return ACCENT_ON[accent] === "#FFFFFF"
    ? "rgba(255,255,255,0.10)"
    : "rgba(0,0,0,0.10)";
}

/**
 * Layout assinatura do deck: coluna escura à esquerda (conteúdo),
 * painel sólido à direita e badge "T." na emenda.
 * Ocupa TODA a altura da snap-section pai (h-full).
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
    <div
      id={id}
      className="grid h-full w-full lg:grid-cols-[1fr_minmax(0,0.72fr)]"
      style={{ backgroundColor: "#141425" }}
    >
      {/* Painel colorido à direita */}
      <div
        className="relative order-first flex flex-col items-start justify-center px-8 sm:px-12 lg:order-last lg:px-14"
        style={{ backgroundColor: ACCENT_HEX[accent], color: panelFg, minHeight: "180px" }}
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

        {/* Badge na emenda (desktop) */}
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
            className="relative z-10 font-display font-black uppercase leading-[0.90] tracking-[-0.04em] whitespace-pre-line"
            style={{ fontSize: "clamp(2.5rem,4.5vw,4.5rem)" }}
          >
            {panelTitle}
          </h2>
        )}

        {panelExtra && (
          <div className="relative z-10 py-8 lg:py-0">{panelExtra}</div>
        )}
      </div>

      {/* Coluna escura — conteúdo com scroll interno se necessário */}
      <div className="relative order-last flex flex-col overflow-y-auto px-8 py-16 sm:px-12 lg:order-first lg:px-16 xl:px-20">
        {/* Badge mobile */}
        {badgeAccent && (
          <TagmobBadge
            accent={badgeAccent}
            glyph={badgeGlyph}
            size={44}
            className="mb-8 rounded-xl lg:hidden"
          />
        )}
        {/* Centraliza verticalmente no desktop */}
        <div className="my-auto mx-auto w-full max-w-[46rem] lg:mx-0">
          {children}
        </div>
      </div>
    </div>
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
      className={`font-display font-black uppercase leading-[0.94] tracking-[-0.035em] ${className ?? ""}`}
      style={{ color: ACCENT_HEX[accent], fontSize: "clamp(1.8rem,4.5vw,3rem)" }}
    >
      {children}
    </h2>
  );
}

/** Parágrafo padrão da coluna escura — branco puro. */
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
