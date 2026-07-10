import Link from "next/link";
import {
  Tag, BarChart2, Zap, Globe, Lock, TrendingUp,
  ArrowRight, DollarSign, Eye, MousePointer, Users,
  CheckCircle2, AlertCircle,
} from "lucide-react";
import {
  MOCK_MARCAS, MOCK_PRODUTOS_INDUSTRIA, MOCK_METRICAS_ADTECH,
  MOCK_EXCLUSIVIDADES,
} from "@/lib/mock-data";
import type { ProdutoIndustria, MetricaAdTech } from "@/lib/types";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
function formatBRL(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
}
function formatK(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

/* ─── Status badge de produto ─────────────────────────────────────────────── */
function ProdutoStatusBadge({ status }: { status: ProdutoIndustria["status"] }) {
  const cfg = {
    ATIVO:     { label: "Ativo",     color: "#39FF14" },
    PAUSADO:   { label: "Pausado",   color: "#3A3A5C" },
    EXCLUSIVO: { label: "Exclusivo", color: "#FFB800" },
  };
  const { label, color } = cfg[status];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color, backgroundColor: color + "18", border: `1px solid ${color}35`, padding: "2px 7px", borderRadius: 3 }}>
      {label}
    </span>
  );
}

/* ─── Card de produto ──────────────────────────────────────────────────────── */
function ProdutoCard({ produto }: { produto: ProdutoIndustria }) {
  const leadColor = produto.total_leads > 30 ? "#39FF14" : produto.total_leads > 10 ? "#FFB800" : "#3A3A5C";

  return (
    <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, overflow: "hidden" }}>
      {/* Thumbnail placeholder */}
      <div style={{ height: 80, backgroundColor: "#0D0D1A", borderBottom: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: "#2E2E4A", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {produto.subcategoria}
        </p>
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <ProdutoStatusBadge status={produto.status} />
        </div>
        {produto.exclusividades.length > 0 && (
          <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 4, background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.3)", borderRadius: 5, padding: "2px 6px" }}>
            <Lock size={9} color="#FFB800" />
            <span style={{ fontSize: 9, color: "#FFB800", fontWeight: 700 }}>EXCL.</span>
          </div>
        )}
      </div>

      <div style={{ padding: 14 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 2, lineHeight: 1.3 }}>{produto.nome}</p>
        <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 12, lineHeight: 1.5 }}>{produto.descricao.slice(0, 72)}…</p>

        {/* Specs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {Object.entries(produto.especificacoes).slice(0, 3).map(([k, v]) => (
            <span key={k} style={{ fontSize: 10, color: "#7878A0", backgroundColor: "#0D0D1A", border: "1px solid #1A1A30", padding: "2px 7px", borderRadius: 4 }}>
              {k}: <strong style={{ color: "#EEEEFF" }}>{v}</strong>
            </span>
          ))}
        </div>

        {/* Métricas do produto */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
          {[
            { label: "Specs",       value: produto.total_specs,       icon: Zap,          color: "#8B5CF6" },
            { label: "Impressões",  value: formatK(produto.total_impressoes), icon: Eye,   color: "#00E5FF" },
            { label: "Leads",       value: produto.total_leads,       icon: Users,        color: leadColor  },
          ].map((m) => (
            <div key={m.label} style={{ textAlign: "center", padding: "6px 4px", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 7 }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: m.color }}>{m.value}</p>
              <p style={{ fontSize: 9, color: "#3A3A5C" }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* CPM/CPA */}
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ flex: 1, padding: "6px 8px", background: "rgba(57,255,20,0.05)", border: "1px solid rgba(57,255,20,0.15)", borderRadius: 7 }}>
            <p style={{ fontSize: 9, color: "#3A3A5C", marginBottom: 1 }}>CPV</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#39FF14" }}>R$ {produto.cpv_brl.toFixed(2)}</p>
          </div>
          <div style={{ flex: 1, padding: "6px 8px", background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.15)", borderRadius: 7 }}>
            <p style={{ fontSize: 9, color: "#3A3A5C", marginBottom: 1 }}>CPA</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#FFB800" }}>R$ {produto.cpa_brl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Card de métricas da marca ────────────────────────────────────────────── */
function MetricaMarcaCard({ metrica }: { metrica: MetricaAdTech }) {
  const ctrColor = metrica.ctr >= 10 ? "#39FF14" : metrica.ctr >= 7 ? "#FFB800" : "#7878A0";

  return (
    <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: "#1A1A30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#EEEEFF" }}>
            {metrica.marca_nome.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>{metrica.marca_nome}</p>
            <p style={{ fontSize: 11, color: "#3A3A5C" }}>{metrica.periodo}</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 18, fontWeight: 900, color: "#FFB800", letterSpacing: "-0.04em" }}>{formatBRL(metrica.receita_brl)}</p>
          <p style={{ fontSize: 10, color: "#3A3A5C" }}>receita total</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 12 }}>
        {[
          { label: "Impressões",     value: formatK(metrica.impressoes),  icon: Eye,           color: "#00E5FF" },
          { label: "Cliques",        value: formatK(metrica.cliques),     icon: MousePointer,  color: "#8B5CF6" },
          { label: "Leads",          value: metrica.leads,                icon: Users,         color: "#39FF14" },
          { label: "CTR",            value: `${metrica.ctr}%`,            icon: TrendingUp,    color: ctrColor  },
          { label: "Specs arq.",     value: metrica.specs_arquitetos,     icon: Zap,           color: "#FF0068" },
          { label: "Conversões",     value: metrica.conversoes,           icon: CheckCircle2,  color: "#39FF14" },
        ].map((m) => (
          <div key={m.label} style={{ padding: "7px 8px", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 7, textAlign: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: m.color }}>{m.value}</p>
            <p style={{ fontSize: 9, color: "#3A3A5C" }}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* Barra de CTR */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 10, color: "#3A3A5C" }}>Click-Through Rate</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: ctrColor }}>{metrica.ctr}%</span>
        </div>
        <div style={{ height: 3, borderRadius: 2, background: "#1A1A30" }}>
          <div style={{ height: "100%", width: `${Math.min(metrica.ctr * 6, 100)}%`, backgroundColor: ctrColor, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ─────────────────────────────────────────────────────────────────── */
export default function MarcasPage() {
  const totalReceita  = MOCK_METRICAS_ADTECH.reduce((s, m) => s + m.receita_brl, 0);
  const totalLeads    = MOCK_METRICAS_ADTECH.reduce((s, m) => s + m.leads, 0);
  const totalSpecs    = MOCK_METRICAS_ADTECH.reduce((s, m) => s + m.specs_arquitetos, 0);
  const totalImpress  = MOCK_METRICAS_ADTECH.reduce((s, m) => s + m.impressoes, 0);
  const exclusAtivas  = MOCK_EXCLUSIVIDADES.filter((e) => e.ativa).length;

  return (
    <div style={{ padding: "28px 28px 80px", maxWidth: 1100, margin: "0 auto" }}>

      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: 2, backgroundColor: "#FFB800" }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: "#FFB800", letterSpacing: "0.08em", textTransform: "uppercase" }}>Marcas & AdTech · Camada 3</p>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 2 }}>Motor de Receita</h1>
          <p style={{ fontSize: 13, color: "#7878A0" }}>Product placement no momento de maior intenção — CPM por exibição + CPA por lead qualificado.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", background: "transparent", border: "1px solid #FFB80030", color: "#FFB800", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            + Nova Exclusividade
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", background: "#FFB800", border: "none", color: "#000", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            + Cadastrar Marca
          </button>
        </div>
      </div>

      {/* Novo: painel de Criar Campanha */}
      <div style={{ background: "#111120", border: "1px solid rgba(255,184,0,0.22)", borderRadius: 14, padding: "18px 22px", marginBottom: 24, display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Zap size={14} color="#FFB800" />
            <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>Criar Campanha de Placement</p>
          </div>
          <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.6 }}>Configure uma nova campanha de product placement: escolha categoria, defina região de exclusividade, modelo de cobrança e prazo de vigência.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, flex: 2, minWidth: 400 }}>
          {[
            { label: "Categoria do produto", placeholder: "Ex: Revestimentos, Louças, Automação", color: "#FFB800" },
            { label: "Região / exclusividade",  placeholder: "Ex: Vila Nova Conceição · Padrão Alto", color: "#FF0068" },
            { label: "Modelo de cobrança",    placeholder: "CPM (por 1.000 exibições) · CPA (por lead)", color: "#39FF14" },
            { label: "Prazo de vigência",      placeholder: "01/07/2025 → 30/09/2025", color: "#8B5CF6" },
          ].map((f) => (
            <div key={f.label}>
              <p style={{ fontSize: 10, fontWeight: 700, color: f.color, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>{f.label}</p>
              <div style={{ padding: "9px 12px", background: "#0D0D1A", border: `1px solid ${f.color}20`, borderRadius: 8 }}>
                <p style={{ fontSize: 12, color: "#3A3A5C" }}>{f.placeholder}</p>
              </div>
            </div>
          ))}
        </div>
        <button style={{ padding: "11px 20px", background: "#FFB800", border: "none", borderRadius: 10, fontSize: 13, color: "#000", fontWeight: 800, cursor: "pointer", flexShrink: 0, alignSelf: "flex-end" }}>
          Criar Campanha →
        </button>
      </div>

      {/* Stats AdTech */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 36 }}>
        {[
          { label: "Receita AdTech / mês",     value: formatBRL(totalReceita), color: "#FFB800", icon: DollarSign  },
          { label: "Leads gerados",             value: totalLeads,              color: "#39FF14", icon: Users       },
          { label: "Specs de arquitetos",       value: totalSpecs,              color: "#8B5CF6", icon: Zap         },
          { label: "Impressões totais",         value: formatK(totalImpress),   color: "#00E5FF", icon: Eye         },
          { label: "Exclusividades ativas",     value: exclusAtivas,            color: "#FF0068", icon: Lock        },
          { label: "Marcas no catálogo",        value: MOCK_MARCAS.length,      color: "#FFB800", icon: Tag         },
        ].map((s) => (
          <div key={s.label} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: s.color, opacity: 0.5 }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <p style={{ fontSize: 11, color: "#7878A0" }}>{s.label}</p>
              <s.icon size={13} color={s.color} />
            </div>
            <p style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.04em" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Métricas por marca */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", letterSpacing: "-0.02em" }}>Performance por Marca — Jun/2024</h2>
          <Link href="/hub" style={{ fontSize: 13, color: "#FFB800", textDecoration: "none", fontWeight: 600 }}>
            Ver no Hub →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {MOCK_METRICAS_ADTECH.map((m) => <MetricaMarcaCard key={m.marca_id} metrica={m} />)}
        </div>
      </div>

      {/* Regras de exclusividade */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", letterSpacing: "-0.02em" }}>Controle de Canal — Exclusividades</h2>
          <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#FF0068", background: "transparent", border: "1px solid #FF006830", padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontWeight: 600 }}>
            <Globe size={12} /> + Nova Exclusividade
          </button>
        </div>
        <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1.5fr 80px", gap: 0, padding: "8px 16px", borderBottom: "1px solid #1A1A30", backgroundColor: "#0D0D1A" }}>
            {["Marca", "Regra", "Tipo", "Vigência", "Status"].map((h) => (
              <p key={h} style={{ fontSize: 10, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</p>
            ))}
          </div>
          {MOCK_EXCLUSIVIDADES.map((exc, idx) => {
            const marca = MOCK_MARCAS.find((m) => m.id === exc.marca_id);
            return (
              <div key={exc.id} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1.5fr 80px", gap: 0, padding: "11px 16px", borderBottom: idx < MOCK_EXCLUSIVIDADES.length - 1 ? "1px solid #1A1A30" : "none", alignItems: "center" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#EEEEFF" }}>{marca?.nome ?? exc.marca_id}</p>
                <p style={{ fontSize: 12, color: "#7878A0" }}>{exc.alvo}</p>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#8B5CF6", backgroundColor: "#8B5CF618", padding: "2px 7px", borderRadius: 4, display: "inline-block" }}>
                  {exc.tipo}
                </span>
                <p style={{ fontSize: 11, color: "#3A3A5C" }}>
                  {exc.vigencia_inicio} → {exc.vigencia_fim ?? "Indeterminado"}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {exc.ativa
                    ? <><CheckCircle2 size={12} color="#39FF14" /><span style={{ fontSize: 11, color: "#39FF14", fontWeight: 700 }}>Ativa</span></>
                    : <><AlertCircle  size={12} color="#3A3A5C" /><span style={{ fontSize: 11, color: "#3A3A5C" }}>Expirada</span></>
                  }
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 11, color: "#3A3A5C", marginTop: 8, lineHeight: 1.6 }}>
          ⚡ Quando uma marca possui exclusividade ativa, o sistema bloqueia automaticamente marcas concorrentes da mesma categoria nas opções de especificação do bairro/empreendimento/padrão indicado.
        </p>
      </div>

      {/* Catálogo de produtos */}
      <div>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", marginBottom: 16, letterSpacing: "-0.02em" }}>
          Catálogo de Produtos — Vitrine para Arquitetos
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {MOCK_PRODUTOS_INDUSTRIA.map((p) => <ProdutoCard key={p.id} produto={p} />)}
        </div>
      </div>
    </div>
  );
}
