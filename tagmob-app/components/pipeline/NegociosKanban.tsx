"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search, Filter, Plus, Kanban, LayoutList, Building2,
  User, Clock, ChevronRight, DollarSign, TrendingUp,
  AlertCircle, GripVertical, Inbox, Mail, Phone, Star,
} from "lucide-react";
import type { Empreendimento, OSFase } from "@/lib/types";
import { MOCK_EMPREENDIMENTOS, MOCK_LEADS } from "@/lib/mock-data";
import { LEAD_STATUS_LABELS, type LeadDTO } from "@/lib/crm";
import {
  buildPipelineColumns,
  calcPipelineMetrics,
  filterDeals,
  filterLeads,
  formatBRL,
  type PipelineColumnId,
} from "@/lib/pipeline-kanban";

type ViewMode = "kanban" | "lista";

const LEAD_STATUS_COLORS: Record<string, string> = {
  NOVO: "#00E5FF",
  EM_ATENDIMENTO: "#FFB800",
  QUALIFICADO: "#8B5CF6",
};

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

function LeadCard({
  lead,
  columnColor,
  onDragStart,
  onUpdateStatus,
  onConvert,
}: {
  lead: LeadDTO;
  columnColor: string;
  onDragStart: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onConvert: (lead: LeadDTO) => void;
}) {
  const statusColor = LEAD_STATUS_COLORS[lead.status] ?? columnColor;

  return (
    <div
      draggable
      onDragStart={() => onDragStart(lead.id)}
      style={{
        background: "#111120",
        border: "1px solid #1A1A30",
        borderRadius: 12,
        padding: 14,
        cursor: "grab",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = columnColor + "50";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1A1A30";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <GripVertical size={12} color="#3A3A5C" />
          <span style={{
            fontSize: 9, fontWeight: 800, color: statusColor,
            backgroundColor: statusColor + "18", padding: "2px 6px", borderRadius: 4,
          }}>
            {LEAD_STATUS_LABELS[lead.status]}
          </span>
        </div>
        {lead.prioridade === 1 && <Star size={12} color="#FFB800" fill="#FFB800" />}
      </div>

      <p style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", marginBottom: 4 }}>{lead.nome}</p>

      {lead.empresa && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
          <Building2 size={11} color="#7878A0" />
          <span style={{ fontSize: 11, color: "#7878A0" }}>{lead.empresa}</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#3A3A5C" }}>
          <Mail size={10} /> {lead.email}
        </span>
        {lead.telefone && (
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#3A3A5C" }}>
            <Phone size={10} /> {lead.telefone}
          </span>
        )}
      </div>

      {lead.orcamentoEstimado != null && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
          <DollarSign size={12} color={columnColor} />
          <span style={{ fontSize: 13, fontWeight: 800, color: columnColor }}>
            {formatBRL(Number(lead.orcamentoEstimado))}
          </span>
        </div>
      )}

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", borderTop: "1px solid #1A1A30", paddingTop: 10 }}>
        {lead.status === "NOVO" && (
          <button
            onClick={() => onUpdateStatus(lead.id, "EM_ATENDIMENTO")}
            style={{ fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 6, background: "#FFB80020", border: "1px solid #FFB80040", color: "#FFB800", cursor: "pointer" }}
          >
            Atender
          </button>
        )}
        {lead.status === "EM_ATENDIMENTO" && (
          <button
            onClick={() => onUpdateStatus(lead.id, "QUALIFICADO")}
            style={{ fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 6, background: "#8B5CF620", border: "1px solid #8B5CF640", color: "#8B5CF6", cursor: "pointer" }}
          >
            Qualificar
          </button>
        )}
        <button
          onClick={() => onConvert(lead)}
          style={{ fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 6, background: "#39FF1420", border: "1px solid #39FF1440", color: "#39FF14", cursor: "pointer" }}
        >
          Converter → OS
        </button>
      </div>
    </div>
  );
}

function DealCard({
  deal,
  columnColor,
}: {
  deal: Empreendimento;
  columnColor: string;
}) {
  const progresso = deal.total_assets > 0
    ? Math.round((deal.assets_aprovados / deal.total_assets) * 100)
    : deal.estrategia_completa ? 25 : 5;

  return (
    <Link
      href={`/negocios/${encodeURIComponent(deal.id)}`}
      prefetch={false}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        background: "#111120",
        border: "1px solid #1A1A30",
        borderRadius: 12,
        padding: 14,
        cursor: "pointer",
        transition: "border-color 0.15s, box-shadow 0.15s",
        textDecoration: "none",
        color: "inherit",
        boxSizing: "border-box",
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
          <PlanoBadge plano={deal.plano} />
        </div>
        <span style={{ fontSize: 10, color: "#3A3A5C" }}>{deal.tipo}</span>
      </div>

      <div style={{ marginBottom: 4 }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", marginBottom: 4, letterSpacing: "-0.02em" }}>
          {deal.nome}
        </p>
      </div>

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
          <span
            style={{
              display: "flex", alignItems: "center", gap: 2, color: columnColor,
              fontSize: 10, fontWeight: 700,
            }}
          >
            Abrir detalhes <ChevronRight size={10} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function NegociosKanban({
  initialDeals = [],
  embedded = false,
}: {
  initialDeals?: Empreendimento[];
  embedded?: boolean;
}) {
  const [deals, setDeals] = useState<Empreendimento[]>(initialDeals);
  const [leads, setLeads] = useState<LeadDTO[]>([]);
  const [loading, setLoading] = useState(initialDeals.length === 0);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("kanban");
  const [draggingDealId, setDraggingDealId] = useState<string | null>(null);
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<PipelineColumnId | null>(null);
  const [dbOffline, setDbOffline] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    let offline = false;

    let localLeads: LeadDTO[] = [];
    let localDeals: Empreendimento[] = [];
    if (typeof window !== "undefined") {
      try {
        localLeads = JSON.parse(localStorage.getItem("tagmob_local_leads") || "[]");
        localDeals = JSON.parse(localStorage.getItem("tagmob_local_deals") || "[]");
      } catch (e) {
        console.error("Erro ao carregar do localStorage", e);
      }
    }

    try {
      const [dealsRes, leadsRes] = await Promise.all([
        fetch("/api/crm/deals"),
        fetch("/api/crm/leads"),
      ]);

      if (dealsRes.ok) {
        const dealsJson = await dealsRes.json();
        if (dealsJson.data?.length) {
          setDeals([...localDeals, ...dealsJson.data]);
        } else {
          setDeals([...localDeals, ...MOCK_EMPREENDIMENTOS]);
          offline = true;
        }
      } else {
        setDeals([...localDeals, ...MOCK_EMPREENDIMENTOS]);
        offline = true;
      }

      if (leadsRes.ok) {
        const leadsJson = await leadsRes.json();
        if (leadsJson.data?.length) {
          setLeads([...localLeads, ...leadsJson.data]);
        } else if (offline) {
          setLeads([...localLeads, ...MOCK_LEADS as LeadDTO[]]);
        } else {
          setLeads(localLeads);
        }
      } else {
        setLeads([...localLeads, ...MOCK_LEADS as LeadDTO[]]);
        offline = true;
      }
    } catch {
      setDeals([...localDeals, ...MOCK_EMPREENDIMENTOS]);
      setLeads([...localLeads, ...MOCK_LEADS as LeadDTO[]]);
      offline = true;
    } finally {
      setDbOffline(offline);
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filteredDeals = useMemo(() => filterDeals(deals, search), [deals, search]);
  const filteredLeads = useMemo(() => filterLeads(leads, search), [leads, search]);
  const columns = useMemo(() => buildPipelineColumns(filteredDeals, filteredLeads), [filteredDeals, filteredLeads]);
  const metrics = useMemo(() => calcPipelineMetrics(filteredDeals, filteredLeads), [filteredDeals, filteredLeads]);

  async function updateLeadStatus(id: string, status: string) {
    const prev = leads;
    setLeads((l) => l.map((lead) => (lead.id === id ? { ...lead, status } : lead)));

    // Se for lead local, atualiza no localStorage
    if (id.startsWith("LEAD-LOCAL-")) {
      if (typeof window !== "undefined") {
        try {
          const local = JSON.parse(localStorage.getItem("tagmob_local_leads") || "[]");
          const updated = local.map((lead: any) => lead.id === id ? { ...lead, status } : lead);
          localStorage.setItem("tagmob_local_leads", JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
      return;
    }

    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("patch failed");
      const json = await res.json();
      if (json.data) setLeads((l) => l.map((lead) => (lead.id === id ? json.data : lead)));
    } catch {
      if (!dbOffline) setLeads(prev);
    }
  }

  async function convertLead(lead: LeadDTO) {
    const nome = lead.empresa ? `${lead.empresa} — Novo OS` : `Projeto ${lead.nome}`;
    
    // Se for lead local ou se a API falhar
    const isLocal = lead.id.startsWith("LEAD-LOCAL-");

    if (!isLocal) {
      try {
        const res = await fetch("/api/crm/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: lead.id,
            nome,
            valorContrato: lead.orcamentoEstimado ? Number(lead.orcamentoEstimado) : undefined,
          }),
        });
        if (res.ok) {
          await loadData();
          return;
        }
      } catch { /* demo fallback */ }
    }

    // Fallback: Remove lead e cria deal local no localStorage
    if (typeof window !== "undefined") {
      try {
        const localL = JSON.parse(localStorage.getItem("tagmob_local_leads") || "[]");
        localStorage.setItem("tagmob_local_leads", JSON.stringify(localL.filter((item: any) => item.id !== lead.id)));
      } catch (e) {
        console.error(e);
      }
    }

    const novoDeal: Empreendimento = {
      ...MOCK_EMPREENDIMENTOS[0],
      id: `emp-local-${Date.now()}`,
      nome,
      construtora: lead.empresa ?? lead.nome,
      fase_atual: 1,
      valor_contrato: lead.orcamentoEstimado ? Number(lead.orcamentoEstimado) : 68_000,
      responsavel: lead.ownerUser?.fullName || "Você",
      proxima_acao: "Kick-off de estratégia",
      dias_na_fase: 0,
      plano: "PRO",
      cor_tema: "#FF0068",
    };

    if (typeof window !== "undefined") {
      try {
        const localD = JSON.parse(localStorage.getItem("tagmob_local_deals") || "[]");
        localStorage.setItem("tagmob_local_deals", JSON.stringify([novoDeal, ...localD]));
      } catch (e) {
        console.error(e);
      }
    }

    setLeads((l) => l.filter((item) => item.id !== lead.id));
    setDeals((d) => [novoDeal, ...d]);
  }

  async function handleDrop(columnId: PipelineColumnId) {
    if (draggingLeadId) {
      const lead = leads.find((l) => l.id === draggingLeadId);
      if (lead && columnId === 1) await convertLead(lead);
      setDraggingLeadId(null);
      setDropTarget(null);
      return;
    }

    if (!draggingDealId || columnId === "leads") {
      setDraggingDealId(null);
      setDropTarget(null);
      return;
    }

    const fase = columnId as OSFase;
    const prev = deals;
    setDeals((d) =>
      d.map((deal) => (deal.id === draggingDealId ? { ...deal, fase_atual: fase, dias_na_fase: 0 } : deal))
    );

    // Se for deal local, atualiza no localStorage
    if (draggingDealId.startsWith("emp-local-")) {
      if (typeof window !== "undefined") {
        try {
          const local = JSON.parse(localStorage.getItem("tagmob_local_deals") || "[]");
          const updated = local.map((deal: any) => deal.id === draggingDealId ? { ...deal, fase_atual: fase, dias_na_fase: 0 } : deal);
          localStorage.setItem("tagmob_local_deals", JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
      setDraggingDealId(null);
      setDropTarget(null);
      return;
    }

    setDraggingDealId(null);
    setDropTarget(null);

    try {
      const res = await fetch("/api/crm/deals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draggingDealId, fase_atual: fase }),
      });
      if (!res.ok) throw new Error("persist failed");
      const json = await res.json();
      if (json.data) {
        setDeals((d) => d.map((deal) => (deal.id === draggingDealId ? json.data : deal)));
      }
    } catch {
      if (!dbOffline) setDeals(prev);
    }
  }

  if (loading) {
    return (
      <div style={{
        padding: embedded ? "32px 0" : 32,
        minHeight: embedded ? 200 : "60vh",
        display: "flex", alignItems: "center", justifyContent: "center", color: "#7878A0",
      }}>
        Carregando pipeline...
      </div>
    );
  }

  const padding = embedded ? "20px 36px 28px" : "28px 32px";

  return (
    <div style={{ padding, minHeight: embedded ? undefined : "100vh", backgroundColor: embedded ? "transparent" : "#09090F" }}>
      {!embedded && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Kanban size={14} color="#FF0068" />
              <span style={{
                fontSize: 10, fontWeight: 800, color: "#FF0068",
                backgroundColor: "rgba(255,0,104,0.1)", border: "1px solid rgba(255,0,104,0.25)",
                padding: "3px 10px", borderRadius: 4, letterSpacing: "0.06em",
              }}>
                NEGÓCIOS
              </span>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.03em", marginBottom: 4 }}>
              Pipeline de Negócios
            </h1>
            <p style={{ fontSize: 14, color: "#7878A0" }}>
              Leads entram na primeira coluna e avançam pelas 5 fases TAGMOB OS.
            </p>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: embedded ? 20 : 28 }}>
        <div style={{ position: "relative" }}>
          <Search size={14} color="#7878A0" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Buscar lead ou negócio..."
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
          href="/onboarding"
          style={{
            display: "flex", alignItems: "center", gap: 6, background: "#FF0068",
            border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff",
            fontSize: 13, fontWeight: 700, textDecoration: "none", marginLeft: "auto",
          }}
        >
          <Plus size={14} /> Novo Negócio
        </Link>
      </div>

      {dbOffline && (
        <div style={{
          background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.3)",
          borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#FFB800",
        }}>
          Banco offline — exibindo dados demo. Para persistir: configure DATABASE_URL e rode db:push + db:seed.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Leads Ativos", value: metrics.leadsAtivos, color: "#FFB800", icon: Inbox },
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

      {view === "kanban" ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(200px, 1fr))",
          gap: 14,
          overflowX: "auto",
          paddingBottom: 16,
        }}>
          {columns.map((col) => {
            const colValor = col.deals.reduce((s, d) => s + (d.valor_contrato ?? 0), 0);
            const isDropTarget = dropTarget === col.id;
            const isLeadColumn = col.id === "leads";

            return (
              <div
                key={String(col.id)}
                onDragOver={(e) => { e.preventDefault(); setDropTarget(col.id); }}
                onDragLeave={() => setDropTarget(null)}
                onDrop={() => handleDrop(col.id)}
                style={{
                  display: "flex", flexDirection: "column", gap: 10, minWidth: 200,
                  background: isDropTarget ? col.color + "08" : "transparent",
                  borderRadius: 12,
                  outline: isDropTarget ? `2px dashed ${col.color}50` : "none",
                  transition: "background 0.15s",
                }}
              >
                <div style={{ paddingBottom: 8, borderBottom: `2.5px solid ${col.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      {isLeadColumn ? (
                        <Inbox size={12} color={col.color} />
                      ) : (
                        <span style={{
                          fontSize: 10, fontWeight: 900, color: col.color,
                          backgroundColor: col.color + "18", padding: "1px 6px", borderRadius: 4,
                        }}>
                          {String(col.id).padStart(2, "0")}
                        </span>
                      )}
                      <span style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF" }}>{col.title}</span>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: "#7878A0",
                      backgroundColor: "#111120", padding: "1px 7px", borderRadius: 10,
                    }}>
                      {isLeadColumn ? col.leads.length : col.deals.length}
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
                  {isLeadColumn && draggingLeadId && (
                    <p style={{ fontSize: 10, color: col.color, marginTop: 4 }}>
                      Arraste para Estratégia para converter
                    </p>
                  )}
                </div>

                <div style={{
                  display: "flex", flexDirection: "column", gap: 10,
                  minHeight: "50vh", background: "rgba(17,17,32,0.2)",
                  borderRadius: 12, padding: 8,
                  border: "1px dashed rgba(26,26,48,0.5)",
                }}>
                  {isLeadColumn ? (
                    col.leads.length === 0 ? (
                      <div style={{ padding: "40px 16px", textAlign: "center" }}>
                        <p style={{ fontSize: 11, color: "#3A3A5C" }}>Nenhum lead</p>
                        <p style={{ fontSize: 10, color: "#2E2E4A" }}>Leads da landing aparecem aqui</p>
                      </div>
                    ) : (
                      col.leads.map((lead) => (
                        <LeadCard
                          key={lead.id}
                          lead={lead}
                          columnColor={col.color}
                          onDragStart={setDraggingLeadId}
                          onUpdateStatus={updateLeadStatus}
                          onConvert={convertLead}
                        />
                      ))
                    )
                  ) : col.deals.length === 0 ? (
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
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px 80px",
            padding: "10px 18px", borderBottom: "1px solid #1A1A30",
            fontSize: 10, fontWeight: 800, color: "#3A3A5C", letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            <span>Nome</span>
            <span>Empresa / Construtora</span>
            <span>Etapa</span>
            <span>Responsável</span>
            <span>Valor</span>
            <span />
          </div>
          {filteredLeads.filter((l) => l.status !== "CONVERTIDO" && l.status !== "ARQUIVADO").map((lead) => (
            <div
              key={lead.id}
              style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px 80px",
                padding: "14px 18px", borderBottom: "1px solid #1A1A3020",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{lead.nome}</p>
                <p style={{ fontSize: 11, color: "#3A3A5C" }}>{lead.email}</p>
              </div>
              <span style={{ fontSize: 12, color: "#7878A0" }}>{lead.empresa ?? "—"}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#FFB800" }}>Lead · {LEAD_STATUS_LABELS[lead.status]}</span>
              <span style={{ fontSize: 12, color: "#7878A0" }}>{lead.ownerUser?.fullName ?? "—"}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>
                {lead.orcamentoEstimado ? formatBRL(Number(lead.orcamentoEstimado)) : "—"}
              </span>
              <button
                onClick={() => convertLead(lead)}
                style={{ fontSize: 11, color: "#39FF14", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}
              >
                Converter
              </button>
            </div>
          ))}
          {filteredDeals.map((deal) => {
            const fase = columns.find((c) => c.id === deal.fase_atual);
            return (
              <Link
                key={deal.id}
                href={`/negocios/${encodeURIComponent(deal.id)}`}
                prefetch={false}
                style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px 80px",
                  padding: "14px 18px", borderBottom: "1px solid #1A1A3020",
                  alignItems: "center", cursor: "pointer", textDecoration: "none", color: "inherit",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#111122"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
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
                <span style={{ fontSize: 11, color: "#FF0068", fontWeight: 700 }}>
                  Detalhes →
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
