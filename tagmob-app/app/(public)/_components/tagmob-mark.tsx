import { ACCENT_HEX, ACCENT_ON, type Accent } from "./accents";

/**
 * Badge "T." do deck: quadrado arredondado preenchido com o acento,
 * com o T em bloco e sombra deslocada.
 */
export function TagmobBadge({
  accent = "pink",
  glyph: glyphAccent,
  size = 56,
  className,
}: {
  accent?: Accent;
  glyph?: Accent;
  size?: number;
  className?: string;
}) {
  const fill = ACCENT_HEX[accent];
  const glyph = glyphAccent ? ACCENT_HEX[glyphAccent] : ACCENT_ON[accent];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="TAGMOB"
    >
      <rect width="64" height="64" rx="15" fill={fill} />
      <g transform="translate(3.5 3.5)">
        <rect x="12" y="15" width="32" height="9" fill="#0E0E1C" opacity="0.85" />
        <rect x="23.5" y="15" width="9" height="30" fill="#0E0E1C" opacity="0.85" />
        <rect x="36" y="36" width="8" height="9" fill="#0E0E1C" opacity="0.85" />
      </g>
      <rect x="12" y="15" width="32" height="9" fill={glyph} />
      <rect x="23.5" y="15" width="9" height="30" fill={glyph} />
      <rect x="36" y="36" width="8" height="9" fill={glyph} />
    </svg>
  );
}

/** Assinatura "T.AGMOB" — o "T." recebe o acento, o resto fica sólido. */
export function TagmobWordmark({
  accent = "cyan",
  className,
  style,
}: {
  accent?: Accent;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`font-display font-black uppercase leading-none tracking-[-0.045em] ${className ?? ""}`}
      style={style}
    >
      <span style={{ color: ACCENT_HEX[accent] }}>T.</span>
      <span>AGMOB</span>
    </span>
  );
}
