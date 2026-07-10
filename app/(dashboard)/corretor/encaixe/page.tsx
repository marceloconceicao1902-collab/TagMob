import Link from "next/link";
import { Sparkles, Building2, ArrowRight, TrendingUp, Tag, Zap, BarChart2 } from "lucide-react";
import { MOCK_IMOVEIS, MOCK_MARCAS, getEncaixePerfeito, formatCurrency } from "@/lib/mock-data";
import type { Imovel, Marca, EncaixePerfeito } from "@/lib/types";

/* ─── Score badge ────────────────────────────────────────────────────────────── */
function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90 ? "#39FF14" :
    score >= 75 ? "#00E5FF" :
    score >= 60 ? "#FFB800" : "#7878A0";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", backgroundColor: color + "18", border: `1px solid ${color}40`, borderRadius: 20 }}>
      <div style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: color }} />
      <span style={{ fontSize: 12, fontWeight: 800, color, letterSpacing: "0.02em" }}>{score}%</span>
    </div>
  );
}

/* ─── Card de marca ──────────────────────────────────────────────────────────── */
function MarcaCard({ encaixe, imovel }: { encaixe: EncaixePerfeito; imovel: Imovel }) {
  const color =
    encaixe.score >= 90 ? "#39FF14" :
    encaixe.score >= 75 ? "#00E5FF" : "#FFB800";

  return (
    <div style={{
      background: "#111120", border: "1px solid #1A1A30", borderRadius: 12,
      padding: 16, display: "flex", flexDirection: "column", gap: 12,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: color, opacity: 0.5 }} />

      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        {/* Ícone da marca */}
        <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#1A1A30", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#EEEEFF", flexShrink: 0 }}>
          {encaixe.marca.nome.slice(0, 2).toUpperCase()}
        </div>
        <ScoreBadge score={encaixe.score} />
      </div>

      {/* Info */}
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", marginBottom: 2 }}>{encaixe.marca.nome}</p>
        <p style={{ fontSize: 12, color: "#7878A0" }}>{encaixe.marca.categoria}</p>
      </div>

      {/* Motivo */}
      <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.55, padding: "8px 10px", background: color + "08", border: `1px solid ${color}18`, borderRadius: 7 }}>
        {encaixe.motivo}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {encaixe.categorias_match.map((cat) => (
          <span key={cat} style={{ fontSize: 10, fontWeight: 600, color: color, backgroundColor: color + "12", padding: "2px 8px", borderRadius: 4, border: `1px solid ${color}25` }}>
            {cat}
          </span>
        ))}
      </div>

      {/* Ação */}
      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <button style={{ flex: 1, padding: "8px", borderRadius: 8, background: color, border: "none", color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <Zap size={12} /> Ativar parceria
        </button>
        <button style={{ padding: "8px 12px", borderRadius: 8, background: "transparent", border: "1px solid #1A1A30", color: "#7878A0", fontSize: 12, cursor: "pointer" }}>
          <BarChart2 size={12} />
        </button>
      </div>
    </div>
  );
}

/* ─── Card de imóvel com encaixes ────────────────────────────────────────────── */
function ImovelEncaixeCard({ imovel }: { imovel: Imovel }) {
  const encaixes = getEncaixePerfeito(imovel.id);
  const topScore = encaixes[0]?.score ?? 0;
  const accentColor = topScore >= 90 ? "#39FF14" : topScore >= 75 ? "#00E5FF" : "#FFB800";

  return (
    <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 14, overflow: "hidden" }}>
      {/* Header do imóvel */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A1A30", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: accentColor + "15", border: `1px solid ${accentColor}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building2 size={16} color={accentColor} />
          </div>
          <div>
            <Link href={`/corretor/imoveis/${imovel.id}`} style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", textDecoration: "none" }}>
              {imovel.titulo}
            </Link>
            <p style={{ fontSize: 12, color: "#7878A0" }}>{imovel.bairro} · {formatCurrency(imovel.preco)}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#7878A0", backgroundColor: "#111120", border: "1px solid #1A1A30", padding: "3px 10px", borderRadius: 6 }}>
            {imovel.padrao}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: accentColor + "15", border: `1px solid ${accentColor}35`, borderRadius: 20 }}>
            <Sparkles size={11} color={accentColor} />
            <span style={{ fontSize: 12, fontWeight: 700, color: accentColor }}>{encaixes.length} match{encaixes.length !== 1 ? "es" : ""}</span>
          </div>
        </div>
      </div>

      {/* Grid de encaixes */}
      <div style={{ padding: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {encaixes.map((enc) => (
          <MarcaCard key={enc.marca.id} encaixe={enc} imovel={imovel} />
        ))}
      </div>
    </div>
  );
}

/* ─── Stat card ──────────────────────────────────────────────────────────────── */
function StatCard({ label, value, color, icon: Icon }: { label: string; value: string | number; color: string; icon: React.ComponentType<{ size?: number; color?: string }> }) {
  return (
    <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: "16px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: color, opacity: 0.5 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <p style={{ fontSize: 12, color: "#7878A0", fontWeight: 500 }}>{label}</p>
        <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={14} color={color} />
        </div>
      </div>
      <p style={{ fontSize: 26, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.04em" }}>{value}</p>
    </div>
  );
}

/* ─── PAGE ────────────────────────────────────────────────────────────────────── */
export default function EncaixePerfeitoPage() {
  const imoveisComEncaixe = MOCK_IMOVEIS.filter((im) => getEncaixePerfeito(im.id).length > 0);
  const totalEncaixes     = imoveisComEncaixe.reduce((s, im) => s + getEncaixePerfeito(im.id).length, 0);
  const topScore          = Math.max(
    ...MOCK_IMOVEIS.flatMap((im) => getEncaixePerfeito(im.id).map((e) => e.score))
  );
  const categoriasAtivas  = [...new Set(MOCK_MARCAS.map((m) => m.categoria))].length;

  return (
    <div style={{ padding: "32px 32px 64px", maxWidth: 1100, margin: "0 auto" }}>

      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#FF006820", border: "1px solid #FF006840", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={16} color="#FF0068" />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#EEEEFF" }}>Encaixe Perfeito</h1>
          </div>
          <p style={{ fontSize: 14, color: "#7878A0" }}>
            Algoritmo de compatibilidade — marcas certas para cada imóvel do seu portfolio.
          </p>
        </div>
        <Link href="/corretor/imoveis" style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", background: "#111120", border: "1px solid #1A1A30", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#7878A0", textDecoration: "none" }}>
          <Building2 size={14} /> Ver imóveis <ArrowRight size={12} />
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 36 }}>
        <StatCard label="Imóveis com matches"  value={imoveisComEncaixe.length} color="#FF0068"  icon={Building2}   />
        <StatCard label="Total de matches"     value={totalEncaixes}             color="#39FF14"  icon={Sparkles}    />
        <StatCard label="Melhor score"         value={`${topScore}%`}            color="#00E5FF"  icon={TrendingUp}  />
        <StatCard label="Categorias ativas"    value={categoriasAtivas}          color="#FFB800"  icon={Tag}         />
      </div>

      {/* Legenda de scores */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, padding: "10px 16px", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 10, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: "#3A3A5C", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Score de compatibilidade:</span>
        {[
          { range: "90–100%", color: "#39FF14", label: "Encaixe perfeito" },
          { range: "75–89%",  color: "#00E5FF", label: "Alta compatibilidade" },
          { range: "60–74%",  color: "#FFB800", label: "Compatível" },
        ].map((item) => (
          <div key={item.range} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: item.color }} />
            <span style={{ fontSize: 12, color: "#7878A0" }}><strong style={{ color: item.color }}>{item.range}</strong> — {item.label}</span>
          </div>
        ))}
      </div>

      {/* Marcas disponíveis */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF", marginBottom: 14, letterSpacing: "-0.02em" }}>
          Marcas parceiras disponíveis
        </h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {MOCK_MARCAS.map((marca) => (
            <div key={marca.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "#111120", border: `1px solid ${marca.campanha_ativa ? "#1A1A30" : "#111120"}`, borderRadius: 8, opacity: marca.campanha_ativa ? 1 : 0.4 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: "#1A1A30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: "#7878A0" }}>
                {marca.nome.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#EEEEFF" }}>{marca.nome}</p>
                <p style={{ fontSize: 10, color: "#3A3A5C" }}>{marca.categoria} · {marca.produtos_disponiveis} produtos</p>
              </div>
              {marca.campanha_ativa ? (
                <span style={{ fontSize: 9, fontWeight: 700, color: "#39FF14", backgroundColor: "#39FF1415", padding: "1px 6px", borderRadius: 3, marginLeft: 4 }}>ATIVO</span>
              ) : (
                <span style={{ fontSize: 9, fontWeight: 700, color: "#3A3A5C", backgroundColor: "#111120", padding: "1px 6px", borderRadius: 3, marginLeft: 4 }}>INATIVO</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lista de imóveis com seus encaixes */}
      <div>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", marginBottom: 16, letterSpacing: "-0.02em" }}>
          Matches por imóvel
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {MOCK_IMOVEIS.map((imovel) => (
            <ImovelEncaixeCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      </div>
    </div>
  );
}
