import { ACCENT_HEX, ACCENT_ON, type Accent } from "./accents";
import { TagmobBadge } from "./tagmob-mark";

function gridColor(accent: Accent) {
  return ACCENT_ON[accent] === "#FFFFFF"
    ? "rgba(255,255,255,0.14)"
    : "rgba(0,0,0,0.08)";
}

/**
 * Layout assinatura do deck: coluna escura com o conteúdo à esquerda,
 * painel sólido com grid à direita e o badge "T." pousado na emenda.
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
      className="relative grid scroll-mt-20 bg-ink lg:grid-cols-[1fr_minmax(0,0.78fr)]"
    >
      {/* Painel colorido — no mobile vira a faixa de topo da seção */}
      <div
        className={`relative order-first flex flex-col justify-end px-6 sm:px-10 lg:order-last lg:min-h-[640px] lg:px-14 lg:py-20 ${
          panelTitle || panelExtra ? "min-h-[200px] py-10" : "min-h-0 py-0"
        }`}
        style={{ backgroundColor: ACCENT_HEX[accent], color: panelFg }}
      >
        <div
          aria-hidden
          className="deck-grid absolute inset-0 overflow-hidden"
          style={
            {
              "--deck-grid-color": gridColor(accent),
              "--deck-grid-size": "58px",
            } as React.CSSProperties
          }
        />

        {/* Badge na emenda das duas colunas (apenas desktop) */}
        {badgeAccent && (
          <div
            className={`absolute left-0 z-20 hidden -translate-x-1/2 lg:block ${
              badgePosition === "top" ? "top-12" : "top-1/2 -translate-y-1/2"
            }`}
          >
            <TagmobBadge
              accent={badgeAccent}
              glyph={badgeGlyph}
              size={60}
              className="rounded-[15px] shadow-2xl"
            />
          </div>
        )}

        {panelTitle && (
          <h2 className="relative z-10 font-display text-4xl font-black uppercase leading-[0.94] tracking-[-0.035em] whitespace-pre-line sm:text-5xl lg:text-[clamp(2.75rem,4.4vw,4.25rem)]">
            {panelTitle}
          </h2>
        )}

        {panelExtra}
      </div>

      {/* Coluna escura com o conteúdo */}
      <div className="relative order-last px-6 py-16 sm:px-10 lg:order-first lg:px-16 lg:py-24 xl:px-24">
        {badgeAccent && (
          <TagmobBadge
            accent={badgeAccent}
            glyph={badgeGlyph}
            size={48}
            className="mb-8 rounded-xl lg:hidden"
          />
        )}
        <div className="mx-auto max-w-[46rem] lg:mx-0">{children}</div>
      </div>
    </section>
  );
}

/** Título grande em rosa usado nas páginas de conteúdo do deck. */
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
      className={`font-display text-[clamp(2rem,5.2vw,3.35rem)] font-black uppercase leading-[0.94] tracking-[-0.035em] text-balance ${className ?? ""}`}
      style={{ color: ACCENT_HEX[accent] }}
    >
      {children}
    </h2>
  );
}

/** Parágrafo padrão da coluna escura. */
export function DeckBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-[0.975rem] leading-relaxed text-white/90 text-pretty sm:text-base ${className ?? ""}`}>
      {children}
    </p>
  );
}

/** "TAGMOB" inline em caixa alta, como aparece no corpo de texto do deck. */
export function Tag({ children = "TAGMOB" }: { children?: React.ReactNode }) {
  return (
    <strong className="font-display font-black uppercase tracking-[-0.02em] text-white">
      {children}
    </strong>
  );
}
