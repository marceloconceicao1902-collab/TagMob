"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search, Filter, Plus, Kanban, LayoutList, Building2,
  User, Clock, ChevronRight, DollarSign, TrendingUp,
  AlertCircle, GripVertical, Inbox, Mail, Phone, Star,
  X, CheckSquare, Square, PlusCircle, Check,
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
  onDragStart,
  onClick,
}: {
  deal: Empreendimento;
  columnColor: string;
  onDragStart: (id: string) => void;
  onClick: () => void;
}) {
  const progresso = deal.total_assets > 0
    ? Math.round((deal.assets_aprovados / deal.total_assets) * 100)
    : deal.estrategia_completa ? 25 : 5;

  return (
    <div
      draggable
      onDragStart={() => onDragStart(deal.id)}
      onClick={onClick}
      style={{
        background: "#111120",
        border: "1px solid #1A1A30",
        borderRadius: 12,
        padding: 14,
        cursor: "pointer",
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
          <GripVertical size={12} color="#3A3A5C" style={{ cursor: "grab" }} onMouseDown={(e) => e.stopPropagation()} />
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
          <div
            style={{ display: "flex", alignItems: "center", gap: 2, color: columnColor, fontSize: 10, fontWeight: 700 }}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            Detalhes <ChevronRight size={10} />
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
  const [draggingDealId, setDraggingDealId] = useState<string | null>(null);
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<PipelineColumnId | null>(null);
  const [dbOffline, setDbOffline] = useState(false);

  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);

  // Lista de entregaveis disponíveis para contratação
  const DELIVERABLES_LIST = [
    { id: "ent-101", nome: "Campanha (Branding e Identidade Visual)", preco: 6000 },
    { id: "ent-102", nome: "Filme Conceito do Lançamento", preco: 4500 },
    { id: "ent-103", nome: "KV (Key Visual) Diretor", preco: 3000 },
    { id: "ent-104", nome: "Manual da Marca (Brandbook)", preco: 1500 },
    { id: "ent-201", nome: "Book do Cliente – Folhetão", preco: 3500 },
    { id: "ent-202", nome: "Book do Cliente – Mini", preco: 2000 },
    { id: "ent-203", nome: "Book de Mesa do Corretor", preco: 2800 },
    { id: "ent-204", nome: "Caderno de Plantas", preco: 1500 },
    { id: "ent-301", nome: "E-mail Marketing Lançamento", preco: 900 },
    { id: "ent-302", nome: "WhatsApp Card Promocional", preco: 600 },
    { id: "ent-801", nome: "Site do Empreendimento + LP", preco: 4500 },
    { id: "ent-902", nome: "Tour Virtual 360° do Decorado", preco: 4000 },
    { id: "ent-1001", nome: "Maquete Eletrônica (Imagens 3D)", preco: 6500 },
  ];

  // Estado para armazenar produtos contratados por empreendimento
  const [contractedProducts, setContractedProducts] = useState<Record<string, Array<{ id: string; nome: string; preco: number; status: string }>>>({
    "emp-001": [
      { id: "ent-101", nome: "Campanha (Branding e Identidade Visual)", preco: 6000, status: "APROVADO" },
      { id: "ent-103", nome: "KV (Key Visual) Diretor", preco: 3000, status: "APROVADO" },
      { id: "ent-201", nome: "Book do Cliente – Folhetão", preco: 3500, status: "EM_PRODUCAO" },
    ],
    "emp-002": [
      { id: "ent-101", nome: "Campanha (Branding e Identidade Visual)", preco: 6000, status: "APROVADO" },
      { id: "ent-102", nome: "Filme Conceito do Lançamento", preco: 4500, status: "EM_PRODUCAO" },
      { id: "ent-801", nome: "Site do Empreendimento + LP", preco: 4500, status: "PENDENTE" },
    ],
    "emp-003": [
      { id: "ent-101", nome: "Campanha (Branding e Identidade Visual)", preco: 6000, status: "PENDENTE" },
    ],
    "emp-004": [
      { id: "ent-101", nome: "Campanha (Branding e Identidade Visual)", preco: 6000, status: "APROVADO" },
      { id: "ent-103", nome: "KV (Key Visual) Diretor", preco: 3000, status: "APROVADO" },
      { id: "ent-1001", nome: "Maquete Eletrônica (Imagens 3D)", preco: 6500, status: "APROVADO" },
    ]
  });

  // Estado para checklist de tarefas
  const [dealChecklists, setDealChecklists] = useState<Record<string, Array<{ id: string; texto: string; concluida: boolean }>>>({
    "emp-001": [
      { id: "t-1", texto: "Workshop de naming e conceito preliminar", concluida: true },
      { id: "t-2", texto: "Criação do Key Visual (KV) Matriz", concluida: true },
      { id: "t-3", texto: "Desenho das plantas humanizadas", concluida: true },
      { id: "t-4", texto: "Diagramação do Book do Cliente - Folhetão", concluida: false },
      { id: "t-5", texto: "Envio de criativos digitais para aprovação", concluida: false },
    ],
    "emp-002": [
      { id: "t-1", texto: "Roteiro e storyboard do Filme Conceito", concluida: true },
      { id: "t-2", texto: "Edição e sonorização da trilha do vídeo", concluida: false },
      { id: "t-3", texto: "Desenvolvimento da Landing Page", concluida: false },
    ],
    "emp-003": [
      { id: "t-1", texto: "Kick-off técnico e briefing da marca Even", concluida: true },
      { id: "t-2", texto: "Primeiras opções de Naming e Cores", concluida: false },
    ],
    "emp-004": [
      { id: "t-1", texto: "Aprovação de conceito e tom de voz", concluida: true },
      { id: "t-2", texto: "Render 3D da fachada principal", concluida: true },
      { id: "t-3", texto: "Sinalização e tapume físico da Faria Lima", concluida: false },
    ]
  });

  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [newChecklistText, setNewChecklistText] = useState("");

  const handleToggleTask = (dealId: string, taskId: string) => {
    setDealChecklists(prev => {
      const list = prev[dealId] ?? [];
      const updated = list.map(t => t.id === taskId ? { ...t, concluida: !t.concluida } : t);
      
      const total = updated.length;
      const approved = updated.filter(t => t.concluida).length;
      
      setDeals(prevDeals => prevDeals.map(d => {
        if (d.id === dealId) {
          return {
            ...d,
            total_assets: total,
            assets_aprovados: approved,
            assets_pendentes: total - approved
          };
        }
        return d;
      }));

      return {
        ...prev,
        [dealId]: updated
      };
    });
  };

  const handleAddTask = (dealId: string) => {
    if (!newChecklistText.trim()) return;
    const newTask = {
      id: `t-${Date.now()}`,
      texto: newChecklistText.trim(),
      concluida: false
    };

    setDealChecklists(prev => {
      const list = prev[dealId] ?? [];
      const updated = [...list, newTask];

      const total = updated.length;
      const approved = updated.filter(t => t.concluida).length;
      setDeals(prevDeals => prevDeals.map(d => {
        if (d.id === dealId) {
          return {
            ...d,
            total_assets: total,
            assets_aprovados: approved,
            assets_pendentes: total - approved
          };
        }
        return d;
      }));

      return { ...prev, [dealId]: updated };
    });
    setNewChecklistText("");
  };

  const handleAddProduct = (dealId: string, productId: string) => {
    const prod = DELIVERABLES_LIST.find(p => p.id === productId);
    if (!prod) return;

    setContractedProducts(prev => {
      const list = prev[dealId] ?? [];
      if (list.some(p => p.id === productId)) return prev;

      const newProd = {
        id: prod.id,
        nome: prod.nome,
        preco: prod.preco,
        status: "PENDENTE"
      };
      
      const updated = [...list, newProd];

      setDeals(prevDeals => prevDeals.map(d => {
        if (d.id === dealId) {
          return {
            ...d,
            valor_contrato: (d.valor_contrato ?? 0) + prod.preco
          };
        }
        return d;
      }));

      setDealChecklists(prevCheck => {
        const checkList = prevCheck[dealId] ?? [];
        const taskText = `Produzir entregável: ${prod.nome}`;
        if (checkList.some(t => t.texto === taskText)) return prevCheck;

        const newTask = {
          id: `t-prod-${prod.id}`,
          texto: taskText,
          concluida: false
        };
        const updatedCheckList = [...checkList, newTask];

        const total = updatedCheckList.length;
        const approved = updatedCheckList.filter(t => t.concluida).length;
        setDeals(prevDeals => prevDeals.map(d => {
          if (d.id === dealId) {
            return {
              ...d,
              total_assets: total,
              assets_aprovados: approved,
              assets_pendentes: total - approved
            };
          }
          return d;
        }));

        return { ...prevCheck, [dealId]: updatedCheckList };
      });

      return {
        ...prev,
        [dealId]: updated
      };
    });

    setShowProductDropdown(false);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    let offline = false;

    try {
      const [dealsRes, leadsRes] = await Promise.all([
        fetch("/api/crm/deals"),
        fetch("/api/crm/leads"),
      ]);

      if (dealsRes.ok) {
        const dealsJson = await dealsRes.json();
        if (dealsJson.data?.length) {
          setDeals(dealsJson.data);
        } else {
          setDeals(MOCK_EMPREENDIMENTOS);
          offline = true;
        }
      } else {
        setDeals(MOCK_EMPREENDIMENTOS);
        offline = true;
      }

      if (leadsRes.ok) {
        const leadsJson = await leadsRes.json();
        if (leadsJson.data?.length) {
          setLeads(leadsJson.data);
        } else if (offline) {
          setLeads(MOCK_LEADS as LeadDTO[]);
        } else {
          setLeads([]);
        }
      } else {
        setLeads(MOCK_LEADS as LeadDTO[]);
        offline = true;
      }
    } catch {
      setDeals(MOCK_EMPREENDIMENTOS);
      setLeads(MOCK_LEADS as LeadDTO[]);
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

    if (dbOffline) {
      setLeads((l) => l.filter((item) => item.id !== lead.id));
      const novoDeal: Empreendimento = {
        ...MOCK_EMPREENDIMENTOS[0],
        id: `emp-from-${lead.id}`,
        nome,
        construtora: lead.empresa ?? lead.nome,
        fase_atual: 1,
        valor_contrato: lead.orcamentoEstimado ? Number(lead.orcamentoEstimado) : 68_000,
        responsavel: lead.ownerUser?.fullName,
        proxima_acao: "Kick-off de estratégia",
        dias_na_fase: 0,
      };
      setDeals((d) => [novoDeal, ...d]);
    }
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
                        onDragStart={setDraggingDealId}
                        onClick={() => setSelectedDealId(deal.id)}
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
                <button
                  onClick={() => setSelectedDealId(deal.id)}
                  style={{ fontSize: 11, color: "#FF0068", background: "none", border: "none", cursor: "pointer", fontWeight: 700, padding: 0, textAlign: "left" }}
                >
                  Detalhes →
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ══ DRAWER DE DETALHAMENTO DO NEGÓCIO ════════════ */}
      {selectedDealId && (() => {
        const currentDeal = deals.find(d => d.id === selectedDealId);
        if (!currentDeal) return null;

        const colInfo = columns.find(c => c.id === currentDeal.fase_atual);
        const colColor = colInfo?.color ?? "#FF0068";
        const products = contractedProducts[currentDeal.id] ?? [];
        const checklist = dealChecklists[currentDeal.id] ?? [];
        const totalTasks = checklist.length;
        const completedTasks = checklist.filter(t => t.concluida).length;
        const taskProgresso = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        const availableProductsToAdd = DELIVERABLES_LIST.filter(p => !products.some(pr => pr.id === p.id));

        return (
          <>
            {/* Backdrop */}
            <div 
              onClick={() => { setSelectedDealId(null); setShowProductDropdown(false); }}
              style={{
                position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(4, 4, 8, 0.75)", backdropFilter: "blur(6px)",
                zIndex: 1000, transition: "all 0.2s"
              }}
            />

            {/* Slide-over Panel */}
            <div style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: 500,
              backgroundColor: "#0B0B16", borderLeft: `2.5px solid ${colColor}`,
              zIndex: 1001, boxShadow: "-10px 0 40px rgba(0,0,0,0.6)",
              display: "flex", flexDirection: "column", animation: "slideIn 0.25s ease-out",
            }}>
              
              {/* Header */}
              <div style={{ 
                padding: "24px 28px", borderBottom: "1px solid #1A1A30", 
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                background: "linear-gradient(180deg, rgba(26,26,48,0.1) 0%, transparent 100%)"
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 900, color: colColor,
                      backgroundColor: colColor + "18", padding: "2px 8px", borderRadius: 4,
                      letterSpacing: "0.05em"
                    }}>
                      FASE {currentDeal.fase_atual}: {colInfo?.title}
                    </span>
                    <PlanoBadge plano={currentDeal.plano} />
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.03em" }}>{currentDeal.nome}</h2>
                  <p style={{ fontSize: 13, color: "#7878A0", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                    <Building2 size={13} /> {currentDeal.construtora}
                  </p>
                </div>
                <button 
                  onClick={() => { setSelectedDealId(null); setShowProductDropdown(false); }}
                  style={{
                    background: "#1A1A30", border: "none", borderRadius: 8, width: 32, height: 32,
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    color: "#7878A0", transition: "color 0.15s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#EEEEFF"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#7878A0"}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Content */}
              <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 28 }}>
                
                {/* Info Cards Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div style={{ background: "#111122", border: "1px solid #1A1A30", borderRadius: 10, padding: "12px 14px" }}>
                    <span style={{ fontSize: 10, color: "#7878A0", textTransform: "uppercase", fontWeight: 700 }}>Valor do Contrato</span>
                    <p style={{ fontSize: 16, fontWeight: 800, color: colColor, marginTop: 4 }}>
                      {currentDeal.valor_contrato ? formatBRL(currentDeal.valor_contrato) : "—"}
                    </p>
                  </div>
                  <div style={{ background: "#111122", border: "1px solid #1A1A30", borderRadius: 10, padding: "12px 14px" }}>
                    <span style={{ fontSize: 10, color: "#7878A0", textTransform: "uppercase", fontWeight: 700 }}>Responsável</span>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                      <User size={13} color={colColor} /> {currentDeal.responsavel ?? "Sem responsável"}
                    </p>
                  </div>
                </div>

                {/* Checklist de Tarefas Internas */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF", letterSpacing: "0.03em", textTransform: "uppercase" }}>Checklist de Produção</h3>
                    <span style={{ fontSize: 11, fontWeight: 700, color: colColor }}>{taskProgresso}% completo</span>
                  </div>

                  {/* Barra de Progresso */}
                  <div style={{ height: 6, backgroundColor: "#1A1A30", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${taskProgresso}%`, backgroundColor: colColor, borderRadius: 3, transition: "width 0.3s ease" }} />
                  </div>

                  {/* Lista de Checkboxes */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                    {checklist.map(task => (
                      <div 
                        key={task.id}
                        onClick={() => handleToggleTask(currentDeal.id, task.id)}
                        style={{
                          display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px",
                          background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                          cursor: "pointer", transition: "all 0.15s"
                        }}
                      >
                        <span style={{ marginTop: 2, display: "flex", alignItems: "center", color: task.concluida ? colColor : "#3A3A5C" }}>
                          {task.concluida ? <CheckSquare size={15} /> : <Square size={15} />}
                        </span>
                        <span style={{
                          fontSize: 12.5, color: task.concluida ? "#7878A0" : "#EEEEFF",
                          textDecoration: task.concluida ? "line-through" : "none",
                          lineHeight: 1.4
                        }}>
                          {task.texto}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Campo de adição de tarefa */}
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <input 
                      type="text"
                      placeholder="Adicionar nova tarefa..."
                      value={newChecklistText}
                      onChange={(e) => setNewChecklistText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleAddTask(currentDeal.id); }}
                      style={{
                        flex: 1, background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                        padding: "8px 12px", fontSize: 12.5, color: "#EEEEFF", outline: "none"
                      }}
                    />
                    <button
                      onClick={() => handleAddTask(currentDeal.id)}
                      style={{
                        background: colColor, border: "none", borderRadius: 8, padding: "8px 14px",
                        color: "#000", fontWeight: 700, fontSize: 12, cursor: "pointer"
                      }}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>

                {/* Produtos Contratados */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF", letterSpacing: "0.03em", textTransform: "uppercase" }}>Produtos Contratados</h3>
                    <span style={{ fontSize: 11, color: "#7878A0" }}>{products.length} ativos</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {products.map(p => (
                      <div 
                        key={p.id}
                        style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                          padding: "10px 14px",
                        }}
                      >
                        <div>
                          <p style={{ fontSize: 12.5, fontWeight: 700, color: "#EEEEFF" }}>{p.nome}</p>
                          <span style={{ 
                            fontSize: 9, fontWeight: 800, marginTop: 4, display: "inline-block",
                            color: p.status === "APROVADO" ? "#39FF14" : p.status === "EM_PRODUCAO" ? "#00E5FF" : "#FFB800",
                            backgroundColor: (p.status === "APROVADO" ? "#39FF14" : p.status === "EM_PRODUCAO" ? "#00E5FF" : "#FFB800") + "12",
                            padding: "1px 6px", borderRadius: 3, border: "1px solid currentcolor"
                          }}>
                            {p.status === "APROVADO" ? "Aprovado" : p.status === "EM_PRODUCAO" ? "Em Produção" : "Pendente Setup"}
                          </span>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF" }}>
                          {formatBRL(p.preco)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Botão de solicitar/adicionar novo produto */}
                  <div style={{ position: "relative", marginTop: 4 }}>
                    <button
                      onClick={() => setShowProductDropdown(!showProductDropdown)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        background: "rgba(0, 229, 255, 0.08)", border: "1px dashed rgba(0, 229, 255, 0.4)",
                        borderRadius: 8, padding: "10px", color: "#00E5FF", fontSize: 12, fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      <PlusCircle size={14} /> Solicitar Novo Produto
                    </button>

                    {showProductDropdown && (
                      <div style={{
                        position: "absolute", bottom: "105%", left: 0, right: 0,
                        backgroundColor: "#111122", border: "1px solid #1A1A30", borderRadius: 10,
                        boxShadow: "0 -8px 24px rgba(0,0,0,0.5)", zIndex: 1050, maxHeight: 200,
                        overflowY: "auto", padding: 6, display: "flex", flexDirection: "column", gap: 2
                      }}>
                        {availableProductsToAdd.length === 0 ? (
                          <p style={{ fontSize: 11, color: "#7878A0", padding: "10px", textAlign: "center" }}>Todos os produtos já foram adicionados.</p>
                        ) : (
                          availableProductsToAdd.map(ap => (
                            <div
                              key={ap.id}
                              onClick={() => handleAddProduct(currentDeal.id, ap.id)}
                              style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "8px 10px", borderRadius: 6, cursor: "pointer", transition: "background 0.1s"
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1C1C36"}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                              <span style={{ fontSize: 12, color: "#EEEEFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>{ap.nome}</span>
                              <span style={{ fontSize: 11, fontWeight: 700, color: "#39FF14" }}>+{formatBRL(ap.preco)}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ 
                padding: "20px 28px", borderTop: "1px solid #1A1A30", 
                backgroundColor: "rgba(13,13,26,0.5)", display: "flex", gap: 12 
              }}>
                <Link
                  href={`/tagmob-os/${currentDeal.id}`}
                  style={{
                    flex: 1, padding: "12px", borderRadius: 8, backgroundColor: colColor,
                    border: "none", color: "#000", fontSize: 13, fontWeight: 800, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    textDecoration: "none"
                  }}
                >
                  Abrir Workspace TAGMOB OS <ChevronRight size={14} />
                </Link>
              </div>

            </div>
            
            {/* Custom keyframes for sliding animation */}
            <style jsx global>{`
              @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translate(0); }
              }
            `}</style>
          </>
        );
      })()}
    </div>
  );
}
