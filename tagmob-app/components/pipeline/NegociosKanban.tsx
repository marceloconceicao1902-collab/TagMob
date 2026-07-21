"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search, Filter, Plus, Kanban, LayoutList, Building2,
  User, Clock, ChevronRight, DollarSign, TrendingUp,
  AlertCircle, Inbox, Mail, Phone, Star, Eye, X, Check,
  ExternalLink, RotateCcw, Copy, MessageSquare, ArrowUpDown,
  Share2
} from "lucide-react";
import type { Empreendimento, OSFase } from "@/lib/types";
import { MOCK_EMPREENDIMENTOS, MOCK_LEADS } from "@/lib/mock-data";
import { LEAD_STATUS_LABELS, type LeadDTO } from "@/lib/crm";
import {
  buildPipelineColumns,
  calcPipelineMetrics,
  formatBRL,
  type PipelineColumnId,
} from "@/lib/pipeline-kanban";

type ViewMode = "kanban" | "lista";
type SortOption = "recentes" | "valor_desc" | "prioridade";

const LEAD_STATUS_COLORS: Record<string, string> = {
  NOVO: "#00E5FF",
  EM_ATENDIMENTO: "#FFB800",
  QUALIFICADO: "#8B5CF6",
};

// Probabilidades de fechamento por etapa (Estilo CRM HubSpot)
const STAGE_PROBABILITIES: Record<string, number> = {
  leads: 0.10,       // 10%
  1: 0.25,           // 25% Estratégia
  2: 0.50,           // 50% Criação
  3: 0.75,           // 75% Aprovação
  4: 0.90,           // 90% Organização
  5: 1.00,           // 100% Autonomia do Cliente
};

function PlanoBadge({ plano }: { plano: Empreendimento["plano"] }) {
  const colors = { STARTER: "#7878A0", PRO: "#8B5CF6", ENTERPRISE: "#FFB800" };
  const color = colors[plano];
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, color, backgroundColor: color + "18",
      border: `1px solid ${color}30`, padding: "2px 6px", borderRadius: 4,
      letterSpacing: "0.05em", whiteSpace: "nowrap", flexShrink: 0,
    }}>
      {plano}
    </span>
  );
}

function LeadCard({
  lead,
  columnColor,
  onUpdateStatus,
  onConvert,
  onCopyClientLink,
}: {
  lead: LeadDTO;
  columnColor: string;
  onUpdateStatus: (id: string, status: string) => void;
  onConvert: (lead: LeadDTO) => void;
  onCopyClientLink: (id: string) => void;
}) {
  const statusColor = LEAD_STATUS_COLORS[lead.status] ?? columnColor;
  const cleanPhone = lead.telefone?.replace(/\D/g, "") || "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#111120",
        border: "1px solid #1A1A30",
        borderRadius: 12,
        padding: 14,
        boxSizing: "border-box",
        width: "100%",
        gap: 10,
        flexShrink: 0,
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = columnColor + "80";
        e.currentTarget.style.boxShadow = `0 4px 16px ${columnColor}12`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1A1A30";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top Header: Badge + Priority */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
        <span style={{
          fontSize: 9, fontWeight: 800, color: statusColor,
          backgroundColor: statusColor + "18", border: `1px solid ${statusColor}30`,
          padding: "2px 7px", borderRadius: 4, whiteSpace: "nowrap",
        }}>
          {LEAD_STATUS_LABELS[lead.status]}
        </span>

        {lead.prioridade === 1 && (
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#FFB800", fontWeight: 700 }}>
            <Star size={12} color="#FFB800" fill="#FFB800" /> Alta
          </span>
        )}
      </div>

      {/* Title & Company */}
      <div>
        <p style={{
          fontSize: 14, fontWeight: 800, color: "#EEEEFF",
          lineHeight: 1.35, marginBottom: 4, wordBreak: "break-word"
        }}>
          {lead.nome}
        </p>

        {lead.empresa && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Building2 size={12} color="#7878A0" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#7878A0", fontWeight: 600, wordBreak: "break-word" }}>
              {lead.empresa}
            </span>
          </div>
        )}
      </div>

      {/* Contacts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, backgroundColor: "#0D0D1A", padding: "8px 10px", borderRadius: 8, border: "1px solid #1A1A30" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#9898C0", overflow: "hidden" }}>
          <Mail size={11} color="#7878A0" style={{ flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lead.email}</span>
        </span>
        {lead.telefone && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#9898C0" }}>
            <Phone size={11} color="#7878A0" style={{ flexShrink: 0 }} />
            <span>{lead.telefone}</span>
          </span>
        )}
      </div>

      {/* Budget */}
      {lead.orcamentoEstimado != null && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: columnColor + "0A", padding: "6px 10px", borderRadius: 8, border: `1px solid ${columnColor}20` }}>
          <span style={{ fontSize: 10, color: "#7878A0", fontWeight: 600 }}>Valor Estimado</span>
          <span style={{ fontSize: 13, fontWeight: 900, color: columnColor }}>
            {formatBRL(Number(lead.orcamentoEstimado))}
          </span>
        </div>
      )}

      {/* Workflow Quick Buttons */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", paddingTop: 4 }}>
        {lead.status === "NOVO" && (
          <button
            type="button"
            onClick={() => onUpdateStatus(lead.id, "EM_ATENDIMENTO")}
            style={{ fontSize: 11, fontWeight: 700, padding: "5px 9px", borderRadius: 6, background: "#FFB80020", border: "1px solid #FFB80040", color: "#FFB800", cursor: "pointer", flex: 1 }}
          >
            Atender
          </button>
        )}
        {lead.status === "EM_ATENDIMENTO" && (
          <button
            type="button"
            onClick={() => onUpdateStatus(lead.id, "QUALIFICADO")}
            style={{ fontSize: 11, fontWeight: 700, padding: "5px 9px", borderRadius: 6, background: "#8B5CF620", border: "1px solid #8B5CF640", color: "#8B5CF6", cursor: "pointer", flex: 1 }}
          >
            Qualificar
          </button>
        )}
        <button
          type="button"
          onClick={() => onConvert(lead)}
          style={{ fontSize: 11, fontWeight: 700, padding: "5px 9px", borderRadius: 6, background: "#39FF1420", border: "1px solid #39FF1440", color: "#39FF14", cursor: "pointer", flex: 1 }}
        >
          Converter → OS
        </button>

        {cleanPhone && (
          <a
            href={`https://wa.me/55${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir no WhatsApp"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 6, backgroundColor: "#39FF1418", border: "1px solid #39FF1435", color: "#39FF14" }}
          >
            <MessageSquare size={13} />
          </a>
        )}
      </div>

      {/* Bottom Footer Actions */}
      <div style={{ borderTop: "1px solid #1A1A30", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <Link
          href={`/digital-room/${encodeURIComponent(lead.id)}`}
          target="_blank"
          style={{ fontSize: 11, fontWeight: 700, color: "#00E5FF", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
        >
          <Eye size={12} /> Visão do Cliente
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => onCopyClientLink(lead.id)}
            title="Copiar Link do Cliente"
            style={{ background: "none", border: "none", color: "#7878A0", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
          >
            <Copy size={12} />
          </button>

          <Link
            href={`/negocios/lead/${encodeURIComponent(lead.id)}`}
            style={{ fontSize: 11, fontWeight: 700, color: columnColor, textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}
          >
            Detalhes <ChevronRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function DealCard({
  deal,
  columnColor,
  onCopyClientLink,
}: {
  deal: Empreendimento;
  columnColor: string;
  onCopyClientLink: (id: string) => void;
}) {
  const progresso = deal.total_assets > 0
    ? Math.round((deal.assets_aprovados / deal.total_assets) * 100)
    : deal.estrategia_completa ? 25 : 5;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#111120",
        border: "1px solid #1A1A30",
        borderRadius: 12,
        padding: 14,
        boxSizing: "border-box",
        width: "100%",
        gap: 10,
        flexShrink: 0,
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = columnColor + "80";
        e.currentTarget.style.boxShadow = `0 4px 16px ${columnColor}12`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1A1A30";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
        <PlanoBadge plano={deal.plano} />
        <span style={{ fontSize: 10, color: "#7878A0", fontWeight: 600 }}>{deal.tipo}</span>
      </div>

      {/* Deal Name & Construtora */}
      <div>
        <p style={{
          fontSize: 14, fontWeight: 800, color: "#EEEEFF",
          lineHeight: 1.35, marginBottom: 4, letterSpacing: "-0.01em", wordBreak: "break-word"
        }}>
          {deal.nome}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Building2 size={12} color="#7878A0" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "#7878A0", fontWeight: 600, wordBreak: "break-word" }}>
            {deal.construtora}
          </span>
        </div>

        <p style={{ fontSize: 11, color: "#5A5A7A", marginTop: 2 }}>
          {deal.bairro}, {deal.cidade}
        </p>
      </div>

      {/* Contract Value */}
      {deal.valor_contrato != null && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: columnColor + "0A", padding: "6px 10px", borderRadius: 8, border: `1px solid ${columnColor}20` }}>
          <span style={{ fontSize: 10, color: "#7878A0", fontWeight: 600 }}>Valor do Negócio</span>
          <span style={{ fontSize: 13, fontWeight: 900, color: columnColor }}>
            {formatBRL(deal.valor_contrato)}
          </span>
        </div>
      )}

      {/* Progress Bar */}
      {deal.total_assets > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: "#7878A0" }}>Assets Aprovados</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#EEEEFF" }}>{progresso}%</span>
          </div>
          <div style={{ height: 4, backgroundColor: "#1A1A30", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progresso}%`, backgroundColor: columnColor, borderRadius: 2 }} />
          </div>
        </div>
      )}

      {/* Next Action */}
      {deal.proxima_acao && (
        <div style={{
          background: columnColor + "08", border: `1px solid ${columnColor}20`,
          borderRadius: 8, padding: "6px 9px",
        }}>
          <p style={{ fontSize: 9, color: "#7878A0", marginBottom: 2 }}>Próxima ação</p>
          <p style={{ fontSize: 11, color: "#EEEEFF", fontWeight: 600, lineHeight: 1.25, wordBreak: "break-word" }}>
            {deal.proxima_acao}
          </p>
        </div>
      )}

      {/* Bottom Footer Actions */}
      <div style={{ borderTop: "1px solid #1A1A30", paddingTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%", backgroundColor: columnColor + "20",
              border: `1px solid ${columnColor}40`, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 9, fontWeight: 800, color: columnColor, flexShrink: 0
            }}>
              {deal.responsavel?.[0] ?? "?"}
            </div>
            <span style={{ fontSize: 11, color: "#7878A0" }}>{deal.responsavel ?? "—"}</span>
          </div>

          {deal.dias_na_fase != null && (
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#5A5A7A" }}>
              <Clock size={10} /> {deal.dias_na_fase}d
            </span>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
          <Link
            href={`/digital-room/${encodeURIComponent(deal.id)}`}
            target="_blank"
            style={{ fontSize: 11, fontWeight: 700, color: "#00E5FF", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
          >
            <Eye size={12} /> Visão do Cliente
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => onCopyClientLink(deal.id)}
              title="Copiar Link do Cliente"
              style={{ background: "none", border: "none", color: "#7878A0", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
            >
              <Copy size={12} />
            </button>

            <Link
              href={`/negocios/${encodeURIComponent(deal.id)}`}
              style={{ fontSize: 11, fontWeight: 700, color: columnColor, textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}
            >
              Detalhes <ChevronRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </div>
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
  const [sortOrder, setSortOrder] = useState<SortOption>("recentes");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtros Avançados
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterPlano, setFilterPlano] = useState<string>("TODOS");
  const [filterStatusLead, setFilterStatusLead] = useState<string>("TODOS");

  const [draggingDealId, setDraggingDealId] = useState<string | null>(null);
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<PipelineColumnId | null>(null);
  const [dbOffline, setDbOffline] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyClientLink = (id: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/digital-room/${id}`;
      navigator.clipboard.writeText(url);
      showToast("✓ Link do Cliente copiado para a área de transferência!");
    }
  };

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

  // Filtros & Ordenação em Tempo Real
  const filteredDeals = useMemo(() => {
    let result = deals;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((d) =>
        d.nome.toLowerCase().includes(q) ||
        d.construtora.toLowerCase().includes(q) ||
        d.bairro.toLowerCase().includes(q) ||
        d.responsavel?.toLowerCase().includes(q)
      );
    }
    if (filterPlano !== "TODOS") {
      result = result.filter((d) => d.plano === filterPlano);
    }
    if (sortOrder === "valor_desc") {
      result = [...result].sort((a, b) => (b.valor_contrato ?? 0) - (a.valor_contrato ?? 0));
    }
    return result;
  }, [deals, search, filterPlano, sortOrder]);

  const filteredLeads = useMemo(() => {
    let result = leads;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((l) =>
        l.nome.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.empresa?.toLowerCase().includes(q) ?? false)
      );
    }
    if (filterStatusLead !== "TODOS") {
      result = result.filter((l) => l.status === filterStatusLead);
    }
    if (sortOrder === "valor_desc") {
      result = [...result].sort((a, b) => Number(b.orcamentoEstimado ?? 0) - Number(a.orcamentoEstimado ?? 0));
    } else if (sortOrder === "prioridade") {
      result = [...result].sort((a, b) => (a.prioridade ?? 2) - (b.prioridade ?? 2));
    }
    return result;
  }, [leads, search, filterStatusLead, sortOrder]);

  const columns = useMemo(() => buildPipelineColumns(filteredDeals, filteredLeads), [filteredDeals, filteredLeads]);
  const metrics = useMemo(() => calcPipelineMetrics(filteredDeals, filteredLeads), [filteredDeals, filteredLeads]);

  const activeFiltersCount = (filterPlano !== "TODOS" ? 1 : 0) + (filterStatusLead !== "TODOS" ? 1 : 0) + (search ? 1 : 0);

  const resetFilters = () => {
    setSearch("");
    setFilterPlano("TODOS");
    setFilterStatusLead("TODOS");
  };

  async function updateLeadStatus(id: string, status: string) {
    const prev = leads;
    setLeads((l) => l.map((lead) => (lead.id === id ? { ...lead, status } : lead)));

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
      } catch { /* fallback */ }
    }

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
    showToast(`✓ Lead ${lead.nome} convertido em Negócio!`);
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
      {/* Toast floating */}
      {toastMessage && (
        <div style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 1000,
          backgroundColor: "#39FF14", color: "#000", fontWeight: 800, fontSize: 13,
          padding: "12px 20px", borderRadius: 10, boxShadow: "0 8px 30px rgba(57,255,20,0.3)"
        }}>
          {toastMessage}
        </div>
      )}

      {!embedded && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
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
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
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

        <button
          onClick={() => setShowFilterPanel(!showFilterPanel)}
          style={{
            display: "flex", alignItems: "center", gap: 6, background: showFilterPanel ? "#FF006820" : "#111120",
            border: `1px solid ${showFilterPanel ? "#FF0068" : "#1A1A30"}`, borderRadius: 8, padding: "8px 12px",
            color: showFilterPanel ? "#FF0068" : "#7878A0", fontSize: 13, cursor: "pointer", fontWeight: 700,
          }}
        >
          <Filter size={14} /> Filtrar {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            style={{
              display: "flex", alignItems: "center", gap: 4, background: "none",
              border: "none", color: "#FF0068", fontSize: 12, fontWeight: 700, cursor: "pointer"
            }}
          >
            <RotateCcw size={12} /> Limpar
          </button>
        )}

        {/* Ordenação */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "4px 10px" }}>
          <ArrowUpDown size={13} color="#7878A0" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOption)}
            style={{ background: "none", border: "none", color: "#EEEEFF", fontSize: 12, outline: "none", fontWeight: 600, cursor: "pointer" }}
          >
            <option value="recentes" style={{ background: "#111120" }}>Mais Recentes</option>
            <option value="valor_desc" style={{ background: "#111120" }}>Maior Valor</option>
            <option value="prioridade" style={{ background: "#111120" }}>Alta Prioridade</option>
          </select>
        </div>

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

      {/* Painel de Filtros Expansível */}
      {showFilterPanel && (
        <div style={{
          background: "#111120", border: "1px solid #1A1A30", borderRadius: 12,
          padding: 16, marginBottom: 20, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap"
        }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#7878A0", display: "block", marginBottom: 6 }}>Plano do Negócio</label>
            <select
              value={filterPlano}
              onChange={(e) => setFilterPlano(e.target.value)}
              style={{ background: "#09090F", border: "1px solid #1A1A30", color: "#EEEEFF", borderRadius: 6, padding: "6px 12px", fontSize: 12, outline: "none" }}
            >
              <option value="TODOS">Todos os Planos</option>
              <option value="STARTER">STARTER</option>
              <option value="PRO">PRO</option>
              <option value="ENTERPRISE">ENTERPRISE</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#7878A0", display: "block", marginBottom: 6 }}>Status do Lead</label>
            <select
              value={filterStatusLead}
              onChange={(e) => setFilterStatusLead(e.target.value)}
              style={{ background: "#09090F", border: "1px solid #1A1A30", color: "#EEEEFF", borderRadius: 6, padding: "6px 12px", fontSize: 12, outline: "none" }}
            >
              <option value="TODOS">Todos os Status</option>
              <option value="NOVO">NOVO</option>
              <option value="EM_ATENDIMENTO">EM ATENDIMENTO</option>
              <option value="QUALIFICADO">QUALIFICADO</option>
            </select>
          </div>
        </div>
      )}

      {dbOffline && (
        <div style={{
          background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.3)",
          borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#FFB800",
        }}>
          Banco offline — exibindo dados demo. Para persistir: configure DATABASE_URL e rode db:push + db:seed.
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 20 }}>
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
          gridTemplateColumns: "repeat(6, minmax(260px, 1fr))",
          gap: 14,
          overflowX: "auto",
          height: "calc(100vh - 290px)",
          minHeight: "560px",
          paddingBottom: 8,
        }}>
          {columns.map((col) => {
            const isLeadColumn = col.id === "leads";
            const totalItemsCount = isLeadColumn ? col.leads.length : col.deals.length;
            const colValorTotal = isLeadColumn
              ? col.leads.reduce((s, l) => s + Number(l.orcamentoEstimado ?? 0), 0)
              : col.deals.reduce((s, d) => s + (d.valor_contrato ?? 0), 0);
            
            const prob = STAGE_PROBABILITIES[String(col.id)] ?? 0.5;
            const valorPonderado = Math.round(colValorTotal * prob);

            const isDropTarget = dropTarget === col.id;

            return (
              <div
                key={String(col.id)}
                onDragOver={(e) => { e.preventDefault(); setDropTarget(col.id); }}
                onDragLeave={() => setDropTarget(null)}
                onDrop={() => handleDrop(col.id)}
                style={{
                  display: "flex", flexDirection: "column",
                  height: "100%", overflow: "hidden",
                  minWidth: 260,
                  background: isDropTarget ? col.color + "0C" : "#0D0D1A",
                  borderRadius: 14, padding: 12, border: "1px solid #1A1A30",
                  outline: isDropTarget ? `2px dashed ${col.color}70` : "none",
                  transition: "background 0.15s",
                }}
              >
                {/* Header Fixo da Coluna */}
                <div style={{ paddingBottom: 10, borderBottom: `2.5px solid ${col.color}`, flexShrink: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {isLeadColumn ? (
                        <Inbox size={13} color={col.color} />
                      ) : (
                        <span style={{
                          fontSize: 10, fontWeight: 900, color: col.color,
                          backgroundColor: col.color + "18", padding: "1px 5px", borderRadius: 4,
                        }}>
                          {String(col.id).padStart(2, "0")}
                        </span>
                      )}
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF" }}>{col.title}</span>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 800, color: col.color,
                      backgroundColor: col.color + "15", border: `1px solid ${col.color}30`,
                      padding: "1px 7px", borderRadius: 10,
                    }}>
                      {totalItemsCount}
                    </span>
                  </div>

                  <p style={{ fontSize: 10, color: "#5A5A7A", lineHeight: 1.3, marginBottom: 4, height: 26, overflow: "hidden" }}>
                    {col.subtitle}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: col.color }}>
                      {formatBRL(colValorTotal)}
                    </span>
                    <span style={{ fontSize: 9, color: "#7878A0", fontWeight: 600 }}>
                      Ponderado: {formatBRL(valorPonderado)} ({Math.round(prob * 100)}%)
                    </span>
                  </div>
                </div>

                {/* Lista de Cards com Rolagem Individual Nativa */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 4,
                    minHeight: 0,
                  }}
                >
                  {isLeadColumn ? (
                    col.leads.length === 0 ? (
                      <div style={{ padding: "40px 16px", textAlign: "center" }}>
                        <p style={{ fontSize: 11, color: "#5A5A7A" }}>Nenhum lead</p>
                        <p style={{ fontSize: 10, color: "#3A3A5C" }}>Leads da landing aparecem aqui</p>
                      </div>
                    ) : (
                      col.leads.map((lead) => (
                        <LeadCard
                          key={lead.id}
                          lead={lead}
                          columnColor={col.color}
                          onUpdateStatus={updateLeadStatus}
                          onConvert={convertLead}
                          onCopyClientLink={handleCopyClientLink}
                        />
                      ))
                    )
                  ) : col.deals.length === 0 ? (
                    <div style={{ padding: "40px 16px", textAlign: "center" }}>
                      <p style={{ fontSize: 11, color: "#5A5A7A", marginBottom: 4 }}>Nenhum negócio</p>
                      <p style={{ fontSize: 10, color: "#3A3A5C" }}>Arraste um card para cá</p>
                    </div>
                  ) : (
                    col.deals.map((deal) => (
                      <DealCard
                        key={deal.id}
                        deal={deal}
                        columnColor={col.color}
                        onCopyClientLink={handleCopyClientLink}
                      />
                    ))
                  )}
                </div>

                {/* Resumo Fixo de Valores ao Final da Coluna (Estilo HubSpot CRM) */}
                <div style={{
                  borderTop: "1px solid #1A1A30", paddingTop: 8, marginTop: "auto", flexShrink: 0,
                  fontSize: 10, display: "flex", flexDirection: "column", gap: 3,
                  backgroundColor: "#111120", borderRadius: 8, padding: "8px 10px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#7878A0" }}>Valor Total:</span>
                    <strong style={{ color: col.color, fontSize: 11 }}>
                      {colValorTotal > 0 ? formatBRL(colValorTotal) : "R$ 0"}
                    </strong>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#5A5A7A" }}>Valor Ponderado ({Math.round(prob * 100)}%):</span>
                    <span style={{ color: "#EEEEFF", fontWeight: 700 }}>
                      {formatBRL(valorPonderado)}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#5A5A7A" }}>Total de Itens:</span>
                    <span style={{ color: "#EEEEFF", fontWeight: 700 }}>{totalItemsCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px 100px",
            padding: "10px 18px", borderBottom: "1px solid #1A1A30",
            fontSize: 10, fontWeight: 800, color: "#5A5A7A", letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            <span>Nome</span>
            <span>Empresa / Construtora</span>
            <span>Etapa</span>
            <span>Responsável</span>
            <span>Valor</span>
            <span>Ações</span>
          </div>

          {filteredLeads.filter((l) => l.status !== "CONVERTIDO" && l.status !== "ARQUIVADO").map((lead) => (
            <div
              key={lead.id}
              style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px 100px",
                padding: "14px 18px", borderBottom: "1px solid #1A1A3020",
                alignItems: "center", color: "inherit",
              }}
            >
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{lead.nome}</p>
                <p style={{ fontSize: 11, color: "#5A5A7A" }}>{lead.email}</p>
              </div>
              <span style={{ fontSize: 12, color: "#7878A0" }}>{lead.empresa ?? "—"}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#FFB800" }}>Lead · {LEAD_STATUS_LABELS[lead.status]}</span>
              <span style={{ fontSize: 12, color: "#7878A0" }}>{lead.ownerUser?.fullName ?? "—"}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>
                {lead.orcamentoEstimado ? formatBRL(Number(lead.orcamentoEstimado)) : "—"}
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Link href={`/digital-room/${encodeURIComponent(lead.id)}`} target="_blank" style={{ fontSize: 11, color: "#00E5FF", fontWeight: 700, textDecoration: "none" }}>
                  Cliente
                </Link>
                <Link href={`/negocios/lead/${encodeURIComponent(lead.id)}`} style={{ fontSize: 11, color: "#FF0068", fontWeight: 700, textDecoration: "none" }}>
                  Abrir →
                </Link>
              </div>
            </div>
          ))}

          {filteredDeals.map((deal) => {
            const fase = columns.find((c) => c.id === deal.fase_atual);
            return (
              <div
                key={deal.id}
                style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px 100px",
                  padding: "14px 18px", borderBottom: "1px solid #1A1A3020",
                  alignItems: "center", color: "inherit",
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{deal.nome}</p>
                  <p style={{ fontSize: 11, color: "#5A5A7A" }}>{deal.bairro}</p>
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
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Link href={`/digital-room/${encodeURIComponent(deal.id)}`} target="_blank" style={{ fontSize: 11, color: "#00E5FF", fontWeight: 700, textDecoration: "none" }}>
                    Cliente
                  </Link>
                  <Link href={`/negocios/${encodeURIComponent(deal.id)}`} style={{ fontSize: 11, color: "#FF0068", fontWeight: 700, textDecoration: "none" }}>
                    Abrir →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
