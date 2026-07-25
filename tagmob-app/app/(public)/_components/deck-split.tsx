import { ACCENT_HEX, ACCENT_ON, type Accent } from "./accents";
import { TagmobBadge } from "./tagmob-mark";

function gridColor(accent: Accent) {
  return ACCENT_ON[accent] === "#FFFFFF"
    ? "rgba(255,255,255,0.09)"
    : "rgba(0,0,0,0.09)";
}

/**
 * Layout assinatura do deck — split em duas colunas, ocupa min-h-screen.
 * Coluna esquerda: conteúdo escuro; coluna direita: painel colorido.
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
      className="grid min-h-screen w-full lg:grid-cols-[1fr_minmax(0,0.65fr)]"
      style={{ backgroundColor: "#141425" }}
    >
      {/* Painel colorido — à direita no desktop, faixa no topo no mobile */}
      <div
        className={`relative order-first flex flex-col justify-center px-8 sm:px-10 lg:order-last lg:px-12 ${
          panelTitle || panelExtra ? "py-10 lg:py-0" : "hidden lg:flex"
        }`}
        style={{
          backgroundColor: ACCENT_HEX[accent],
          color: panelFg,
          minHeight: panelTitle || panelExtra ? undefined : "100%",
        }}
      >
        {/* Grid de linhas */}
        <div
          aria-hidden
          className="deck-grid absolute inset-0 overflow-hidden"
          style={
            {
              "--deck-grid-color": gridColor(accent),
              "--deck-grid-size": "48px",
            } as React.CSSProperties
          }
        />

        {/* Badge na emenda (desktop) */}
        {badgeAccent && (
          <div
            className={`absolute left-0 z-20 hidden -translate-x-1/2 lg:block ${
              badgePosition === "top" ? "top-12" : "top-1/2 -translate-y-1/2"
            }`}
          >
            <TagmobBadge
              accent={badgeAccent}
              glyph={badgeGlyph}
              size={52}
              className="rounded-[13px] shadow-2xl"
            />
          </div>
        )}

        {panelTitle && (
          <h2
            className="relative z-10 font-display font-black uppercase leading-[0.90] tracking-[-0.04em] whitespace-pre-line"
            style={{ fontSize: "clamp(2.2rem,4vw,3.8rem)" }}
          >
            {panelTitle}
          </h2>
        )}

        {panelExtra && <div className="relative z-10">{panelExtra}</div>}
      </div>

      {/* Coluna escura — conteúdo */}
      <div className="relative order-last flex flex-col overflow-y-auto px-8 py-14 sm:px-10 lg:order-first lg:px-14 lg:py-0 xl:px-16">
        {/* Badge no topo em mobile */}
        {badgeAccent && (
          <TagmobBadge
            accent={badgeAccent}
            glyph={badgeGlyph}
            size={40}
            className="mb-6 rounded-xl lg:hidden"
          />
        )}
        {/* Centraliza verticalmente no desktop */}
        <div className="mx-auto w-full max-w-[44rem] lg:mx-0 lg:my-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Título de seção — tamanho calibrado para caber no enquadramento. */
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
      className={`font-display font-black uppercase leading-[0.94] tracking-[-0.03em] ${className ?? ""}`}
      style={{ color: ACCENT_HEX[accent], fontSize: "clamp(1.25rem,2.6vw,1.65rem)" }}
    >
      {children}
    </h2>
  );
}

/** Parágrafo padrão — 14px/0.875rem no mobile, 15px no desktop. */
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
      className={`text-[0.875rem] leading-[1.7] sm:text-[0.9375rem] ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/** Rótulo colorido (ex: "BRIEFINGS E PEDIDOS"). */
export function DeckLabel({
  children,
  accent = "pink",
}: {
  children: React.ReactNode;
  accent?: Accent;
}) {
  return (
    <p
      className="font-display text-[0.65rem] font-black uppercase tracking-[0.12em]"
      style={{ color: ACCENT_HEX[accent] }}
    >
      {children}
    </p>
  );
}

/** "TAGMOB" inline bold em caixa alta. */
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
