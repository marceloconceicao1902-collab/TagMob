import Link from "next/link";
import { Building2, Plus, SlidersHorizontal, Zap, Eye, BarChart2 } from "lucide-react";
import { MOCK_IMOVEIS, formatCurrency } from "@/lib/mock-data";
import type { Imovel } from "@/lib/types";

function StatusBadge({ status }: { status: Imovel["status"] }) {
  const cfg: Record<Imovel["status"], { label: string; color: string }> = {
    TURBINADO: { label: "Turbinado", color: "#39FF14" },
    PUBLICADO: { label: "Publicado", color: "#00E5FF" },
    RASCUNHO:  { label: "Rascunho",  color: "#FFB800" },
    VENDIDO:   { label: "Vendido",   color: "#7878A0" },
  };
  const { label, color } = cfg[status];
  return <span style={{ fontSize: 11, fontWeight: 700, color, backgroundColor: color + "18", border: `1px solid ${color}35`, padding: "3px 8px", borderRadius: 20, display: "inline-block" }}>{label}</span>;
}

function PadraoTag({ padrao }: { padrao: Imovel["padrao"] }) {
  const colors: Record<Imovel["padrao"], string> = { LUXO: "#FFB800", ALTO: "#FF0068", MEDIO: "#8B5CF6", POPULAR: "#7878A0" };
  const color = colors[padrao];
  return <span style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: color + "18", padding: "2px 7px", borderRadius: 4, border: `1px solid ${color}25` }}>{padrao}</span>;
}

export default function ImoveisPage() {
  const totais = {
    total: MOCK_IMOVEIS.length,
    turbinados: MOCK_IMOVEIS.filter((i) => i.status === "TURBINADO").length,
    publicados: MOCK_IMOVEIS.filter((i) => i.status === "PUBLICADO").length,
    rascunhos: MOCK_IMOVEIS.filter((i) => i.status === "RASCUNHO").length,
  };

  return (
    <div style={{ padding: "32px 32px 48px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#EEEEFF", marginBottom: 4 }}>Meus Imóveis</h1>
          <p style={{ fontSize: 14, color: "#7878A0" }}>Gerencie sua carteira e turbine com o Encaixe Perfeito.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 7, background: "#111120", border: "1px solid #1A1A30", color: "#7878A0", padding: "9px 14px", borderRadius: 9, fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
            <SlidersHorizontal size={14} /> Filtros
          </button>
          <Link href="/corretor/imoveis/novo" style={{ display: "flex", alignItems: "center", gap: 7, backgroundColor: "#FF0068", color: "#fff", padding: "9px 16px", borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
            <Plus size={14} /> Novo Imóvel
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Total",      value: totais.total,      color: "#EEEEFF" },
          { label: "Turbinados", value: totais.turbinados, color: "#39FF14" },
          { label: "Publicados", value: totais.publicados, color: "#00E5FF" },
          { label: "Rascunhos",  value: totais.rascunhos,  color: "#FFB800" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 4, fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 120px 80px 80px", gap: 12, padding: "10px 16px", borderBottom: "1px solid #1A1A30", backgroundColor: "#0D0D1A" }}>
          {["Imóvel", "Bairro", "Padrão", "Preço", "Score IA", "Status"].map((h) => (
            <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>

        {MOCK_IMOVEIS.map((imovel, idx) => (
          <Link key={imovel.id} href={`/corretor/imoveis/${imovel.id}`}
            style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 120px 80px 80px", gap: 12, padding: "14px 16px", borderBottom: idx < MOCK_IMOVEIS.length - 1 ? "1px solid #1A1A30" : "none", textDecoration: "none", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 36, borderRadius: 6, backgroundColor: "#1A1A30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Building2 size={16} color="#3A3A5C" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#EEEEFF", lineHeight: 1.3 }}>{imovel.titulo}</p>
                <p style={{ fontSize: 11, color: "#3A3A5C", marginTop: 1 }}>{imovel.area}m² · {imovel.quartos > 0 ? `${imovel.quartos} qts · ` : ""}{imovel.vagas} vaga{imovel.vagas !== 1 ? "s" : ""}</p>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 13, color: "#EEEEFF" }}>{imovel.bairro}</p>
              <p style={{ fontSize: 11, color: "#3A3A5C" }}>{imovel.cidade}</p>
            </div>
            <div><PadraoTag padrao={imovel.padrao} /></div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#EEEEFF" }}>{formatCurrency(imovel.preco)}</p>
            <div>
              {imovel.score_ia === 0
                ? <span style={{ fontSize: 11, color: "#3A3A5C" }}>Pendente</span>
                : <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <BarChart2 size={11} color={imovel.score_ia >= 85 ? "#39FF14" : "#FFB800"} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: imovel.score_ia >= 85 ? "#39FF14" : "#FFB800" }}>{imovel.score_ia}</span>
                  </div>}
            </div>
            <div><StatusBadge status={imovel.status} /></div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 20, padding: "14px 20px", background: "rgba(57,255,20,0.04)", border: "1px solid rgba(57,255,20,0.15)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Zap size={16} color="#39FF14" />
          <span style={{ fontSize: 14, color: "#EEEEFF", fontWeight: 600 }}>{totais.publicados} imóveis prontos para turbinamento</span>
          <span style={{ fontSize: 13, color: "#7878A0" }}>— até 3x mais leads.</span>
        </div>
        <button style={{ background: "#39FF1422", border: "1px solid #39FF1440", color: "#39FF14", padding: "8px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
          <Eye size={14} /> Ver sugestões
        </button>
      </div>
    </div>
  );
}
