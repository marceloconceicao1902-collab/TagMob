"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search, Filter, Plus, Kanban, LayoutList, Building2,
  User, Clock, ChevronRight, DollarSign, TrendingUp,
  AlertCircle, GripVertical,
} from "lucide-react";
import type { Empreendimento, OSFase } from "@/lib/types";
import { MOCK_EMPREENDIMENTOS } from "@/lib/mock-data";
import {
  calcPipelineMetrics,
  filterDeals,
  formatBRL,
  groupDealsByFase,
} from "@/lib/pipeline-kanban";

type ViewMode = "kanban" | "lista";

function PlanoBadge({ plano }: { plano: Empreendimento["plano"] }) {
  const colors = { STARTER: "#7878A0", PRO: "#8B5CF6", ENTERPRISE: "#FFB800" };
  const color = colors[plano];
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, color, backgroundColor: color + "18",
      border: `1px solid ${color}30`, padding: "2px 6px", borderRadius: 4,
      letterSpacing: "0.05em",
    }}>
      {plano}
    </span>
  );
}

function DealCard({
  deal,
  columnColor,
  onDragStart,
}: {
  deal: Empreendimento;
  columnColor: string;
  onDragStart: (id: string) => void;
}) {
  const progresso = deal.total_assets > 0
    ? Math.round((deal.assets_aprovados / deal.total_assets) * 100)
    : deal.estrategia_completa ? 25 : 5;

  return (
    <div
      draggable
      onDragStart={() => onDragStart(deal.id)}
      style={{
        background: "#111120",
        border: "1px solid #1A1A30",
        borderRadius: 12,
        padding: 14,
        cursor: "grab",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = columnColor + "50";
        e.currentTarget.style.boxShadow = `0 4px 20px ${columnColor}10`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1A1A30";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <GripVertical size={12} color="#3A3A5C" />
          <PlanoBadge plano={deal.plano} />
        </div>
        <span style={{ fontSize: 10, color: "#3A3A5C" }}>{deal.tipo}</span>
      </div>

      <Link href={`/tagmob-os/${deal.id}`} style={{ textDecoration: "none" }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", marginBottom: 4, letterSpacing: "-0.02em" }}>
          {deal.nome}
        </p>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
        <Building2 size={11} color="#7878A0" />
        <span style={{ fontSize: 11, color: "#7878A0" }}>{deal.construtora}</span>
      </div>

      <p style={{ fontSize: 11, color: "#3A3A5C", marginBottom: 10 }}>
        {deal.bairro}, {deal.cidade}
      </p>

      {deal.valor_contrato != null && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
          <DollarSign size={12} color={columnColor} />
          <span style={{ fontSize: 13, fontWeight: 800, color: columnColor }}>
            {formatBRL(deal.valor_contrato)}
          </span>
        </div>
      )}

      {/* Barra de progresso de assets */}
      {deal.total_assets > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: "#7878A0" }}>Assets aprovados</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#EEEEFF" }}>{progresso}%</span>
          </div>
          <div style={{ height: 3, backgroundColor: "#1A1A30", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progresso}%`, backgroundColor: columnColor, borderRadius: 2 }} />
          </div>
        </div>
      )}

      {deal.proxima_acao && (
        <div style={{
          background: columnColor + "08", border: `1px solid ${columnColor}20`,
          borderRadius: 6, padding: "6px 8px", marginBottom: 10,
        }}>
          <p style={{ fontSize: 10, color: "#7878A0", marginBottom: 2 }}>Próxima ação</p>
          <p style={{ fontSize: 11, color: "#EEEEFF", fontWeight: 600, lineHeight: 1.3 }}>
            {deal.proxima_acao}
          </p>
        </div>
      )}

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px solid #1A1A30", paddingTop: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{
            width: 22, height: 22, borderRadius: "50%", backgroundColor: columnColor + "20",
            border: `1px solid ${columnColor}40`, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 9, fontWeight: 800, color: columnColor,
          }}>
            {deal.responsavel?.[0] ?? "?"}
          </div>
          <span style={{ fontSize: 10, color: "#7878A0" }}>{deal.responsavel ?? "—"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {deal.dias_na_fase != null && (
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#3A3A5C" }}>
              <Clock size={10} /> {deal.dias_na_fase}d
            </span>
          )}
          <Link
            href={`/tagmob-os/${deal.id}/pipeline`}
            style={{ display: "flex", alignItems: "center", gap: 2, color: columnColor, textDecoration: "none", fontSize: 10, fontWeight: 700 }}
          >
            Pipeline <ChevronRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NegociosKanban({ initialDeals = [] }: { initialDeals?: Empreendimento[] }) {
  const [deals, setDeals] = useState<Empreendimento[]>(initialDeals);
  const [loading, setLoading] = useState(initialDeals.length === 0);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("kanban");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<OSFase | null>(null);
  const [dbOffline, setDbOffline] = useState(false);

  useEffect(() => {
    fetch("/api/crm/deals")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((json) => {
        if (json.data?.length) {
          setDeals(json.data);
        } else {
          setDeals(MOCK_EMPREENDIMENTOS);
          setDbOffline(true);
        }
      })
      .catch(() => {
        setDeals(MOCK_EMPREENDIMENTOS);
        setDbOffline(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => filterDeals(deals, search), [deals, search]);
  const columns = useMemo(() => groupDealsByFase(filtered), [filtered]);
  const metrics = useMemo(() => calcPipelineMetrics(filtered), [filtered]);

  async function handleDrop(fase: OSFase) {
    if (!draggingId) return;
    const prev = deals;
    setDeals((d) =>
      d.map((deal) => (deal.id === draggingId ? { ...deal, fase_atual: fase, dias_na_fase: 0 } : deal))
    );
    setDraggingId(null);
    setDropTarget(null);
    try {
      const res = await fetch("/api/crm/deals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draggingId, fase_atual: fase }),
      });
      if (!res.ok) throw new Error("persist failed");
      const json = await res.json();
      if (json.data) {
        setDeals((d) => d.map((deal) => (deal.id === draggingId ? json.data : deal)));
      }
    } catch {
      if (!dbOffline) setDeals(prev);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 32, minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#7878A0" }}>
        Carregando pipeline...
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 32px", minHeight: "100vh", backgroundColor: "#09090F" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, color: "#00E5FF",
              backgroundColor: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.25)",
              padding: "3px 10px", borderRadius: 4, letterSpacing: "0.06em",
            }}>
              CRM · ESTILO HUBSPOT
            </span>
            <Kanban size={14} color="#7878A0" />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.03em", marginBottom: 4 }}>
            Pipeline de Negócios
          </h1>
          <p style={{ fontSize: 14, color: "#7878A0" }}>
            Arraste os cards entre etapas para atualizar o estágio de cada empreendimento.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color="#7878A0" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Buscar negócio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                padding: "8px 12px 8px 34px", fontSize: 13, color: "#EEEEFF",
                outline: "none", width: 220,
              }}
            />
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, background: "#111120",
            border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px",
            color: "#7878A0", fontSize: 13, cursor: "pointer",
          }}>
            <Filter size={14} /> Filtrar
          </button>
          <div style={{ display: "flex", background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, overflow: "hidden" }}>
            {(["kanban", "lista"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "8px 12px",
                  background: view === v ? "#FF006820" : "transparent",
                  border: "none", color: view === v ? "#FF0068" : "#7878A0",
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}
              >
                {v === "kanban" ? <Kanban size={13} /> : <LayoutList size={13} />}
                {v === "kanban" ? "Kanban" : "Lista"}
              </button>
            ))}
          </div>
          <Link
            href="/tagmob-os"
            style={{
              display: "flex", alignItems: "center", gap: 6, background: "#FF0068",
              border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff",
              fontSize: 13, fontWeight: 700, textDecoration: "none",
            }}
          >
            <Plus size={14} /> Novo Negócio
          </Link>
        </div>
      </div>

      {/* KPIs */}
      {dbOffline && (
        <div style={{
          background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.3)",
          borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#FFB800",
        }}>
          Banco offline — exibindo dados demo. Para persistir: <code style={{ color: "#EEEEFF" }}>docker compose up -d && npm run db:push && npm run db:seed</code>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Valor do Pipeline", value: formatBRL(metrics.valorTotal), color: "#FF0068", icon: DollarSign },
          { label: "Negócios Ativos", value: metrics.emAndamento, color: "#00E5FF", icon: TrendingUp },
          { label: "Publicados", value: metrics.publicados, color: "#39FF14", icon: Building2 },
          { label: "Assets Pendentes", value: metrics.pendentes, color: "#FFB800", icon: AlertCircle },
          { label: "Média na Etapa", value: `${metrics.diasMedio} dias`, color: "#8B5CF6", icon: Clock },
        ].map((kpi) => (
          <div key={kpi.label} style={{
            background: "#111120", border: "1px solid #1A1A30", borderRadius: 12,
            padding: "14px 18px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: kpi.color, opacity: 0.6 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <p style={{ fontSize: 11, color: "#7878A0" }}>{kpi.label}</p>
              <kpi.icon size={14} color={kpi.color} />
            </div>
            <p style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.03em" }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      {view === "kanban" ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(220px, 1fr))",
          gap: 14,
          overflowX: "auto",
          paddingBottom: 16,
        }}>
          {columns.map((col) => {
            const colValor = col.deals.reduce((s, d) => s + (d.valor_contrato ?? 0), 0);
            const isDropTarget = dropTarget === col.id;

            return (
              <div
                key={col.id}
                onDragOver={(e) => { e.preventDefault(); setDropTarget(col.id); }}
                onDragLeave={() => setDropTarget(null)}
                onDrop={() => handleDrop(col.id)}
                style={{
                  display: "flex", flexDirection: "column", gap: 10, minWidth: 220,
                  background: isDropTarget ? col.color + "08" : "transparent",
                  borderRadius: 12,
                  outline: isDropTarget ? `2px dashed ${col.color}50` : "none",
                  transition: "background 0.15s",
                }}
              >
                {/* Column header */}
                <div style={{ paddingBottom: 8, borderBottom: `2.5px solid ${col.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 900, color: col.color,
                        backgroundColor: col.color + "18", padding: "1px 6px", borderRadius: 4,
                      }}>
                        {String(col.id).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF" }}>{col.title}</span>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: "#7878A0",
                      backgroundColor: "#111120", padding: "1px 7px", borderRadius: 10,
                    }}>
                      {col.deals.length}
                    </span>
                  </div>
                  <p style={{ fontSize: 10, color: "#3A3A5C", lineHeight: 1.3, marginBottom: 4 }}>
                    {col.subtitle}
                  </p>
                  {colValor > 0 && (
                    <p style={{ fontSize: 11, fontWeight: 700, color: col.color }}>
                      {formatBRL(colValor)}
                    </p>
                  )}
                </div>

                {/* Cards */}
                <div style={{
                  display: "flex", flexDirection: "column", gap: 10,
                  minHeight: "50vh", background: "rgba(17,17,32,0.2)",
                  borderRadius: 12, padding: 8,
                  border: "1px dashed rgba(26,26,48,0.5)",
                }}>
                  {col.deals.length === 0 ? (
                    <div style={{ padding: "40px 16px", textAlign: "center" }}>
                      <p style={{ fontSize: 11, color: "#3A3A5C", marginBottom: 4 }}>Nenhum negócio</p>
                      <p style={{ fontSize: 10, color: "#2E2E4A" }}>Arraste um card para cá</p>
                    </div>
                  ) : (
                    col.deals.map((deal) => (
                      <DealCard
                        key={deal.id}
                        deal={deal}
                        columnColor={col.color}
                        onDragStart={setDraggingId}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List view */
        <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px 80px",
            padding: "10px 18px", borderBottom: "1px solid #1A1A30",
            fontSize: 10, fontWeight: 800, color: "#3A3A5C", letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            <span>Negócio</span>
            <span>Construtora</span>
            <span>Etapa</span>
            <span>Responsável</span>
            <span>Valor</span>
            <span />
          </div>
          {filtered.map((deal) => {
            const fase = columns.find((c) => c.id === deal.fase_atual);
            return (
              <div
                key={deal.id}
                style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px 80px",
                  padding: "14px 18px", borderBottom: "1px solid #1A1A3020",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{deal.nome}</p>
                  <p style={{ fontSize: 11, color: "#3A3A5C" }}>{deal.bairro}</p>
                </div>
                <span style={{ fontSize: 12, color: "#7878A0" }}>{deal.construtora}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: fase?.color ?? "#7878A0" }}>
                  {fase?.title ?? "—"}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <User size={12} color="#7878A0" />
                  <span style={{ fontSize: 12, color: "#7878A0" }}>{deal.responsavel ?? "—"}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>
                  {deal.valor_contrato ? formatBRL(deal.valor_contrato) : "—"}
                </span>
                <Link
                  href={`/tagmob-os/${deal.id}`}
                  style={{ fontSize: 11, color: "#FF0068", textDecoration: "none", fontWeight: 700 }}
                >
                  Abrir →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
