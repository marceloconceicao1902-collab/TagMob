import { ACCENT_HEX, ACCENT_ON, type Accent } from "./accents";
import { TagmobBadge } from "./tagmob-mark";

function gridColor(accent: Accent) {
  return ACCENT_ON[accent] === "#FFFFFF"
    ? "rgba(255,255,255,0.09)"
    : "rgba(0,0,0,0.09)";
}

/**
 * Layout assinatura do deck: coluna escura à esquerda, painel colorido à direita.
 * O conteúdo fica centralizado vertical e horizontalmente na coluna escura.
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
      className="grid min-h-screen w-full lg:grid-cols-[1fr_minmax(0,0.60fr)]"
      style={{ backgroundColor: "#141425" }}
    >
      {/* ── Painel colorido (direita no desktop, faixa no topo no mobile) ── */}
      <div
        className={`relative order-first flex flex-col items-start justify-center
          px-10 sm:px-14 lg:order-last lg:min-h-screen lg:px-14
          ${panelTitle || panelExtra ? "py-10 lg:py-16" : "hidden lg:flex"}`}
        style={{ backgroundColor: ACCENT_HEX[accent], color: panelFg }}
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
              badgePosition === "top" ? "top-14" : "top-1/2 -translate-y-1/2"
            }`}
          >
            <TagmobBadge
              accent={badgeAccent}
              glyph={badgeGlyph}
              size={54}
              className="rounded-[14px] shadow-2xl"
            />
          </div>
        )}

        {panelTitle && (
          <h2
            className="relative z-10 font-display font-black uppercase leading-[0.90] tracking-[-0.04em] whitespace-pre-line"
            style={{ fontSize: "clamp(2.4rem, 4.2vw, 4rem)" }}
          >
            {panelTitle}
          </h2>
        )}

        {panelExtra && (
          <div className="relative z-10 py-8 lg:py-0">{panelExtra}</div>
        )}
      </div>

      {/* ── Coluna escura — conteúdo centralizado ── */}
      <div
        className="relative order-last flex min-h-screen flex-col items-center justify-center
          overflow-y-auto px-10 py-16 sm:px-14 lg:order-first lg:px-16 xl:px-20"
      >
        {/* Badge mobile */}
        {badgeAccent && (
          <TagmobBadge
            accent={badgeAccent}
            glyph={badgeGlyph}
            size={44}
            className="mb-8 rounded-xl lg:hidden"
          />
        )}
        {/* Bloco de conteúdo — máximo 520px de largura, centrado */}
        <div className="w-full max-w-[520px]">{children}</div>
      </div>
    </div>
  );
}

/** Título de seção — tamanho calibrado para boa leitura. */
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
      style={{ color: ACCENT_HEX[accent], fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}
    >
      {children}
    </h2>
  );
}

/** Parágrafo padrão — legível, confortável. */
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
      className={`text-[0.9375rem] leading-[1.72] sm:text-[1rem] ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/** Rótulo colorido de seção. */
export function DeckLabel({
  children,
  accent = "pink",
}: {
  children: React.ReactNode;
  accent?: Accent;
}) {
  return (
    <p
      className="font-display text-[0.68rem] font-black uppercase tracking-[0.12em]"
      style={{ color: ACCENT_HEX[accent] }}
    >
      {children}
    </p>
  );
}

/** "TAGMOB" inline em caixa alta. */
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
