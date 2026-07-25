export type Accent = "pink" | "cyan" | "green" | "violet" | "amber" | "white";

/** Hex amostrados diretamente do deck institucional "LP TAG MOB". */
export const ACCENT_HEX: Record<Accent, string> = {
  pink: "#FF0068",
  cyan: "#00E5FF",
  green: "#3AFF17",
  violet: "#7B46F8",
  amber: "#FFB800",
  white: "#FFFFFF",
};

/** Cor de texto legível sobre um painel preenchido com o acento. */
export const ACCENT_ON: Record<Accent, string> = {
  pink: "#FFFFFF",
  cyan: "#0E0E1C",
  green: "#0E0E1C",
  violet: "#FFFFFF",
  amber: "#0E0E1C",
  white: "#0E0E1C",
};
