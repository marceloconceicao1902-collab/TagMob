"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Building2, User, X, CheckSquare, Square, PlusCircle, ChevronRight,
  Phone, Mail, Calendar, StickyNote, ListTodo, Package, MessageSquare,
  Clock, ArrowRight,
} from "lucide-react";
import type { Empreendimento, OSFase } from "@/lib/types";
import { OS_FASES } from "@/lib/types";
import { ACTIVITY_TYPE_LABELS, type ActivityDTO } from "@/lib/crm";
import { formatBRL } from "@/lib/pipeline-kanban";

type DrawerTab = "resumo" | "checklist" | "produtos" | "atividades" | "observacoes";

type ChecklistItem = { id: string; texto: string; concluida: boolean };
type ProductItem = { id: string; nome: string; preco: number; status: string };
type LocalNote = { id: string; texto: string; criadoEm: string };

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

const DEFAULT_CHECKLISTS: Record<string, ChecklistItem[]> = {
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
  ],
};

const DEFAULT_PRODUCTS: Record<string, ProductItem[]> = {
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
  ],
};

function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* ignore */ }
  return fallback;
}

function writeStore(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* ignore */ }
}

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

const TABS: { id: DrawerTab; label: string; icon: typeof ListTodo }[] = [
  { id: "resumo", label: "Resumo", icon: ArrowRight },
  { id: "checklist", label: "Checklist", icon: ListTodo },
  { id: "produtos", label: "Produtos", icon: Package },
  { id: "atividades", label: "Atividades", icon: Calendar },
  { id: "observacoes", label: "Observações", icon: MessageSquare },
];

const ACTIVITY_TYPES = ["TAREFA", "LIGACAO", "REUNIAO", "EMAIL", "FOLLOW_UP"] as const;

export default function DealDetailDrawer({
  deal,
  onClose,
  onDealChange,
}: {
  deal: Empreendimento;
  onClose: () => void;
  onDealChange: (updated: Empreendimento) => void;
}) {
  const faseInfo = OS_FASES.find((f) => f.num === deal.fase_atual);
  const colColor = faseInfo?.cor ?? "#FF0068";

  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<DrawerTab>("resumo");
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [notes, setNotes] = useState<LocalNote[]>([]);
  const [activities, setActivities] = useState<ActivityDTO[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [newActivityTitle, setNewActivityTitle] = useState("");
  const [newActivityType, setNewActivityType] = useState<(typeof ACTIVITY_TYPES)[number]>("TAREFA");
  const [proximaAcao, setProximaAcao] = useState(deal.proxima_acao ?? "");
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [savingFase, setSavingFase] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setProximaAcao(deal.proxima_acao ?? "");
  }, [deal.id, deal.proxima_acao]);

  useEffect(() => {
    const allChecklists = readStore<Record<string, ChecklistItem[]>>("tagmob_checklists", DEFAULT_CHECKLISTS);
    const allProducts = readStore<Record<string, ProductItem[]>>("tagmob_contracted_products", DEFAULT_PRODUCTS);
    const allNotes = readStore<Record<string, LocalNote[]>>("tagmob_deal_notes", {});

    const seedChecklist = allChecklists[deal.id] ?? DEFAULT_CHECKLISTS[deal.id] ?? [
      { id: "t-kick", texto: "Kick-off e alinhamento de escopo", concluida: false },
      { id: "t-brief", texto: "Briefing e materiais de referência", concluida: false },
      { id: "t-crono", texto: "Definir cronograma e próximos marcos", concluida: false },
    ];
    const seedProducts = allProducts[deal.id] ?? DEFAULT_PRODUCTS[deal.id] ?? [];

    setChecklist(seedChecklist);
    setProducts(seedProducts);
    setNotes(allNotes[deal.id] ?? []);
    setTab("resumo");
    setShowProductDropdown(false);
  }, [deal.id]);

  const persistChecklist = useCallback((dealId: string, list: ChecklistItem[]) => {
    const all = readStore<Record<string, ChecklistItem[]>>("tagmob_checklists", DEFAULT_CHECKLISTS);
    writeStore("tagmob_checklists", { ...all, [dealId]: list });
  }, []);

  const persistProducts = useCallback((dealId: string, list: ProductItem[]) => {
    const all = readStore<Record<string, ProductItem[]>>("tagmob_contracted_products", DEFAULT_PRODUCTS);
    writeStore("tagmob_contracted_products", { ...all, [dealId]: list });
  }, []);

  const persistNotes = useCallback((dealId: string, list: LocalNote[]) => {
    const all = readStore<Record<string, LocalNote[]>>("tagmob_deal_notes", {});
    writeStore("tagmob_deal_notes", { ...all, [dealId]: list });
  }, []);

  const loadActivities = useCallback(async () => {
    setLoadingActivities(true);
    const localKey = "tagmob_deal_activities";
    const localAll = readStore<Record<string, ActivityDTO[]>>(localKey, {});

    if (deal.id.startsWith("emp-local-") || deal.id.startsWith("emp-")) {
      // tenta API; se falhar, usa local
    }

    try {
      const res = await fetch(`/api/crm/activities?empreendimentoId=${encodeURIComponent(deal.id)}`);
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.data)) {
          setActivities(json.data);
          setLoadingActivities(false);
          return;
        }
      }
    } catch { /* offline */ }

    setActivities(localAll[deal.id] ?? []);
    setLoadingActivities(false);
  }, [deal.id]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const taskProgress = useMemo(() => {
    if (!checklist.length) return 0;
    return Math.round((checklist.filter((t) => t.concluida).length / checklist.length) * 100);
  }, [checklist]);

  const syncProgressToDeal = (list: ChecklistItem[]) => {
    const total = list.length;
    const approved = list.filter((t) => t.concluida).length;
    onDealChange({
      ...deal,
      total_assets: total,
      assets_aprovados: approved,
      assets_pendentes: total - approved,
    });
  };

  const handleToggleTask = (taskId: string) => {
    const updated = checklist.map((t) =>
      t.id === taskId ? { ...t, concluida: !t.concluida } : t
    );
    setChecklist(updated);
    persistChecklist(deal.id, updated);
    syncProgressToDeal(updated);
  };

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    const updated = [
      ...checklist,
      { id: `t-${Date.now()}`, texto: newTaskText.trim(), concluida: false },
    ];
    setChecklist(updated);
    persistChecklist(deal.id, updated);
    syncProgressToDeal(updated);
    setNewTaskText("");
  };

  const handleAddProduct = (productId: string) => {
    const prod = DELIVERABLES_LIST.find((p) => p.id === productId);
    if (!prod || products.some((p) => p.id === productId)) return;

    const updatedProducts = [
      ...products,
      { id: prod.id, nome: prod.nome, preco: prod.preco, status: "PENDENTE" },
    ];
    setProducts(updatedProducts);
    persistProducts(deal.id, updatedProducts);

    const taskText = `Produzir entregável: ${prod.nome}`;
    let updatedChecklist = checklist;
    if (!checklist.some((t) => t.texto === taskText)) {
      updatedChecklist = [
        ...checklist,
        { id: `t-prod-${prod.id}`, texto: taskText, concluida: false },
      ];
      setChecklist(updatedChecklist);
      persistChecklist(deal.id, updatedChecklist);
    }

    onDealChange({
      ...deal,
      valor_contrato: (deal.valor_contrato ?? 0) + prod.preco,
      total_assets: updatedChecklist.length,
      assets_aprovados: updatedChecklist.filter((t) => t.concluida).length,
      assets_pendentes: updatedChecklist.filter((t) => !t.concluida).length,
    });
    setShowProductDropdown(false);
  };

  const handleSaveProximaAcao = async () => {
    const value = proximaAcao.trim() || null;
    onDealChange({ ...deal, proxima_acao: value ?? undefined });

    if (deal.id.startsWith("emp-local-")) {
      try {
        const local = JSON.parse(localStorage.getItem("tagmob_local_deals") || "[]");
        const updated = local.map((d: Empreendimento) =>
          d.id === deal.id ? { ...d, proxima_acao: value ?? undefined } : d
        );
        localStorage.setItem("tagmob_local_deals", JSON.stringify(updated));
      } catch { /* ignore */ }
      return;
    }

    try {
      await fetch("/api/crm/deals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deal.id, proxima_acao: value }),
      });
    } catch { /* offline ok */ }
  };

  const handleChangeFase = async (fase: OSFase) => {
    if (fase === deal.fase_atual || savingFase) return;
    setSavingFase(true);
    const prev = deal;
    onDealChange({ ...deal, fase_atual: fase, dias_na_fase: 0 });

    if (deal.id.startsWith("emp-local-")) {
      try {
        const local = JSON.parse(localStorage.getItem("tagmob_local_deals") || "[]");
        const updated = local.map((d: Empreendimento) =>
          d.id === deal.id ? { ...d, fase_atual: fase, dias_na_fase: 0 } : d
        );
        localStorage.setItem("tagmob_local_deals", JSON.stringify(updated));
      } catch { /* ignore */ }
      setSavingFase(false);
      return;
    }

    try {
      const res = await fetch("/api/crm/deals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deal.id, fase_atual: fase }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) onDealChange(json.data);
        await loadActivities();
      } else {
        onDealChange(prev);
      }
    } catch {
      onDealChange(prev);
    } finally {
      setSavingFase(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNoteText.trim()) return;
    const texto = newNoteText.trim();
    const note: LocalNote = {
      id: `note-${Date.now()}`,
      texto,
      criadoEm: new Date().toISOString(),
    };
    const updated = [note, ...notes];
    setNotes(updated);
    persistNotes(deal.id, updated);
    setNewNoteText("");

    try {
      const res = await fetch("/api/crm/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "NOTA",
          titulo: texto.slice(0, 80),
          descricao: texto,
          empreendimentoId: deal.id,
        }),
      });
      if (res.ok) await loadActivities();
    } catch { /* local only */ }
  };

  const handleAddActivity = async () => {
    if (!newActivityTitle.trim()) return;
    const titulo = newActivityTitle.trim();
    const optimistic: ActivityDTO = {
      id: `act-local-${Date.now()}`,
      tipo: newActivityType,
      titulo,
      descricao: null,
      status: "PENDENTE",
      dueAt: null,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerUserId: null,
      empreendimentoId: deal.id,
      leadId: null,
      contactId: null,
      companyId: null,
    } as ActivityDTO;

    setActivities((prev) => [optimistic, ...prev]);
    setNewActivityTitle("");

    const localAll = readStore<Record<string, ActivityDTO[]>>("tagmob_deal_activities", {});
    writeStore("tagmob_deal_activities", {
      ...localAll,
      [deal.id]: [optimistic, ...(localAll[deal.id] ?? [])],
    });

    try {
      const res = await fetch("/api/crm/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: newActivityType,
          titulo,
          empreendimentoId: deal.id,
        }),
      });
      if (res.ok) await loadActivities();
    } catch { /* local only */ }
  };

  const handleToggleActivity = async (activity: ActivityDTO) => {
    const nextStatus = activity.status === "CONCLUIDA" ? "PENDENTE" : "CONCLUIDA";
    setActivities((prev) =>
      prev.map((a) => (a.id === activity.id ? { ...a, status: nextStatus } : a))
    );

    if (String(activity.id).startsWith("act-local-")) {
      const localAll = readStore<Record<string, ActivityDTO[]>>("tagmob_deal_activities", {});
      const list = (localAll[deal.id] ?? []).map((a) =>
        a.id === activity.id ? { ...a, status: nextStatus } : a
      );
      writeStore("tagmob_deal_activities", { ...localAll, [deal.id]: list });
      return;
    }

    try {
      await fetch("/api/crm/activities", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activity.id, status: nextStatus }),
      });
    } catch { /* ignore */ }
  };

  const availableProducts = DELIVERABLES_LIST.filter(
    (p) => !products.some((pr) => pr.id === p.id)
  );

  const pendingActivities = activities.filter(
    (a) => a.tipo !== "NOTA" && a.status === "PENDENTE"
  );
  const noteActivities = activities.filter((a) => a.tipo === "NOTA");

  if (!mounted) return null;

  const drawer = (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          backgroundColor: "rgba(4, 4, 8, 0.75)", backdropFilter: "blur(6px)",
          zIndex: 99980,
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes de ${deal.nome}`}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: "min(540px, 100vw)",
          backgroundColor: "#0B0B16", borderLeft: `2.5px solid ${colColor}`,
          zIndex: 99981, boxShadow: "-10px 0 40px rgba(0,0,0,0.6)",
          display: "flex", flexDirection: "column",
          animation: "dealDrawerIn 0.22s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid #1A1A30",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 10, fontWeight: 900, color: colColor,
                backgroundColor: colColor + "18", padding: "2px 8px", borderRadius: 4,
              }}>
                FASE {deal.fase_atual}: {faseInfo?.label}
              </span>
              <PlanoBadge plano={deal.plano} />
            </div>
            <h2 style={{
              fontSize: 20, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.03em",
              margin: 0, overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {deal.nome}
            </h2>
            <p style={{ fontSize: 13, color: "#7878A0", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <Building2 size={13} /> {deal.construtora}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#1A1A30", border: "none", borderRadius: 8, width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              color: "#7878A0", flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 2, padding: "10px 16px", borderBottom: "1px solid #1A1A30",
          overflowX: "auto",
        }}>
          {TABS.map((t) => {
            const active = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                  background: active ? colColor + "20" : "transparent",
                  color: active ? colColor : "#7878A0",
                }}
              >
                <Icon size={12} /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 22 }}>
          {tab === "resumo" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "#111122", border: "1px solid #1A1A30", borderRadius: 10, padding: "12px 14px" }}>
                  <span style={{ fontSize: 10, color: "#7878A0", textTransform: "uppercase", fontWeight: 700 }}>Valor</span>
                  <p style={{ fontSize: 16, fontWeight: 800, color: colColor, marginTop: 4 }}>
                    {deal.valor_contrato ? formatBRL(deal.valor_contrato) : "—"}
                  </p>
                </div>
                <div style={{ background: "#111122", border: "1px solid #1A1A30", borderRadius: 10, padding: "12px 14px" }}>
                  <span style={{ fontSize: 10, color: "#7878A0", textTransform: "uppercase", fontWeight: 700 }}>Responsável</span>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                    <User size={13} color={colColor} /> {deal.responsavel ?? "Sem responsável"}
                  </p>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: "#EEEEFF", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Etapa do pipeline
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {OS_FASES.map((f) => {
                    const active = deal.fase_atual === f.num;
                    return (
                      <button
                        key={f.num}
                        type="button"
                        disabled={savingFase}
                        onClick={() => handleChangeFase(f.num)}
                        style={{
                          fontSize: 11, fontWeight: 700, padding: "6px 10px", borderRadius: 8,
                          cursor: savingFase ? "wait" : "pointer",
                          border: `1px solid ${active ? f.cor : "#1A1A30"}`,
                          background: active ? f.cor + "22" : "#111120",
                          color: active ? f.cor : "#7878A0",
                        }}
                      >
                        {f.num}. {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: "#EEEEFF", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Próxima ação
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={proximaAcao}
                    onChange={(e) => setProximaAcao(e.target.value)}
                    onBlur={handleSaveProximaAcao}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSaveProximaAcao(); }}
                    placeholder="Ex: Ligar para aprovação do KV..."
                    style={{
                      flex: 1, background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                      padding: "10px 12px", fontSize: 13, color: "#EEEEFF", outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[
                  { label: "Checklist", value: `${taskProgress}%`, sub: `${checklist.filter((t) => t.concluida).length}/${checklist.length}` },
                  { label: "Produtos", value: String(products.length), sub: "contratados" },
                  { label: "Pendências", value: String(pendingActivities.length), sub: "atividades" },
                ].map((kpi) => (
                  <div key={kpi.label} style={{ background: "#111122", border: "1px solid #1A1A30", borderRadius: 10, padding: 12 }}>
                    <p style={{ fontSize: 10, color: "#7878A0", fontWeight: 700 }}>{kpi.label}</p>
                    <p style={{ fontSize: 18, fontWeight: 900, color: "#EEEEFF", marginTop: 4 }}>{kpi.value}</p>
                    <p style={{ fontSize: 10, color: "#3A3A5C" }}>{kpi.sub}</p>
                  </div>
                ))}
              </div>

              {deal.dias_na_fase != null && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#7878A0", fontSize: 12 }}>
                  <Clock size={13} /> {deal.dias_na_fase} dias nesta etapa · {deal.bairro}, {deal.cidade}
                </div>
              )}
            </>
          )}

          {tab === "checklist" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF", margin: 0, textTransform: "uppercase" }}>
                  Checklist de produção
                </h3>
                <span style={{ fontSize: 11, fontWeight: 700, color: colColor }}>{taskProgress}% completo</span>
              </div>
              <div style={{ height: 6, backgroundColor: "#1A1A30", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${taskProgress}%`, backgroundColor: colColor, transition: "width 0.3s" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {checklist.length === 0 && (
                  <p style={{ fontSize: 12, color: "#7878A0" }}>Nenhuma tarefa ainda. Adicione a primeira.</p>
                )}
                {checklist.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => handleToggleTask(task.id)}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px",
                      background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                      cursor: "pointer", textAlign: "left", width: "100%",
                    }}
                  >
                    <span style={{ marginTop: 2, color: task.concluida ? colColor : "#3A3A5C" }}>
                      {task.concluida ? <CheckSquare size={15} /> : <Square size={15} />}
                    </span>
                    <span style={{
                      fontSize: 13, color: task.concluida ? "#7878A0" : "#EEEEFF",
                      textDecoration: task.concluida ? "line-through" : "none", lineHeight: 1.4,
                    }}>
                      {task.texto}
                    </span>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleAddTask(); }}
                  placeholder="Adicionar nova tarefa..."
                  style={{
                    flex: 1, background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                    padding: "8px 12px", fontSize: 13, color: "#EEEEFF", outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTask}
                  style={{
                    background: colColor, border: "none", borderRadius: 8, padding: "8px 14px",
                    color: "#000", fontWeight: 700, fontSize: 12, cursor: "pointer",
                  }}
                >
                  Adicionar
                </button>
              </div>
            </>
          )}

          {tab === "produtos" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF", margin: 0, textTransform: "uppercase" }}>
                  Produtos contratados
                </h3>
                <span style={{ fontSize: 11, color: "#7878A0" }}>{products.length} ativos</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {products.length === 0 && (
                  <p style={{ fontSize: 12, color: "#7878A0" }}>Nenhum produto contratado. Solicite abaixo.</p>
                )}
                {products.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "10px 14px",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", margin: 0 }}>{p.nome}</p>
                      <span style={{
                        fontSize: 9, fontWeight: 800, marginTop: 4, display: "inline-block",
                        color: p.status === "APROVADO" ? "#39FF14" : p.status === "EM_PRODUCAO" ? "#00E5FF" : "#FFB800",
                        backgroundColor: (p.status === "APROVADO" ? "#39FF14" : p.status === "EM_PRODUCAO" ? "#00E5FF" : "#FFB800") + "12",
                        padding: "1px 6px", borderRadius: 3,
                      }}>
                        {p.status === "APROVADO" ? "Aprovado" : p.status === "EM_PRODUCAO" ? "Em Produção" : "Pendente"}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF" }}>{formatBRL(p.preco)}</span>
                  </div>
                ))}
              </div>
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setShowProductDropdown((v) => !v)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    background: "rgba(0, 229, 255, 0.08)", border: "1px dashed rgba(0, 229, 255, 0.4)",
                    borderRadius: 8, padding: 10, color: "#00E5FF", fontSize: 12, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  <PlusCircle size={14} /> Solicitar novo produto
                </button>
                {showProductDropdown && (
                  <div style={{
                    position: "absolute", bottom: "105%", left: 0, right: 0,
                    backgroundColor: "#111122", border: "1px solid #1A1A30", borderRadius: 10,
                    boxShadow: "0 -8px 24px rgba(0,0,0,0.5)", zIndex: 1050, maxHeight: 220,
                    overflowY: "auto", padding: 6,
                  }}>
                    {availableProducts.length === 0 ? (
                      <p style={{ fontSize: 11, color: "#7878A0", padding: 10, textAlign: "center" }}>
                        Todos os produtos já foram adicionados.
                      </p>
                    ) : (
                      availableProducts.map((ap) => (
                        <button
                          key={ap.id}
                          type="button"
                          onClick={() => handleAddProduct(ap.id)}
                          style={{
                            display: "flex", justifyContent: "space-between", width: "100%",
                            padding: "8px 10px", borderRadius: 6, cursor: "pointer",
                            background: "transparent", border: "none", color: "#EEEEFF",
                          }}
                        >
                          <span style={{ fontSize: 12, textAlign: "left" }}>{ap.nome}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#39FF14" }}>+{formatBRL(ap.preco)}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "atividades" && (
            <>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF", margin: 0, textTransform: "uppercase" }}>
                Atividades e follow-ups
              </h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <select
                  value={newActivityType}
                  onChange={(e) => setNewActivityType(e.target.value as typeof newActivityType)}
                  style={{
                    background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                    padding: "8px 10px", fontSize: 12, color: "#EEEEFF", outline: "none",
                  }}
                >
                  {ACTIVITY_TYPES.map((t) => (
                    <option key={t} value={t}>{ACTIVITY_TYPE_LABELS[t]}</option>
                  ))}
                </select>
                <input
                  value={newActivityTitle}
                  onChange={(e) => setNewActivityTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleAddActivity(); }}
                  placeholder="Ex: Ligar para cliente..."
                  style={{
                    flex: 1, minWidth: 160, background: "#111120", border: "1px solid #1A1A30",
                    borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#EEEEFF", outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddActivity}
                  style={{
                    background: colColor, border: "none", borderRadius: 8, padding: "8px 14px",
                    color: "#000", fontWeight: 700, fontSize: 12, cursor: "pointer",
                  }}
                >
                  Criar
                </button>
              </div>

              {loadingActivities && <p style={{ fontSize: 12, color: "#7878A0" }}>Carregando...</p>}

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {activities.filter((a) => a.tipo !== "NOTA").length === 0 && !loadingActivities && (
                  <p style={{ fontSize: 12, color: "#7878A0" }}>
                    Nenhuma atividade. Crie tarefas, ligações, reuniões ou follow-ups.
                  </p>
                )}
                {activities.filter((a) => a.tipo !== "NOTA").map((activity) => {
                  const Icon =
                    activity.tipo === "LIGACAO" ? Phone
                      : activity.tipo === "EMAIL" ? Mail
                        : activity.tipo === "REUNIAO" ? Calendar
                          : StickyNote;
                  const done = activity.status === "CONCLUIDA";
                  return (
                    <button
                      key={activity.id}
                      type="button"
                      onClick={() => handleToggleActivity(activity)}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 10, padding: "12px",
                        background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                        cursor: "pointer", textAlign: "left", width: "100%", opacity: done ? 0.65 : 1,
                      }}
                    >
                      <span style={{ color: done ? "#39FF14" : colColor, marginTop: 2 }}>
                        {done ? <CheckSquare size={15} /> : <Icon size={15} />}
                      </span>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: 13, fontWeight: 700, color: "#EEEEFF", margin: 0,
                          textDecoration: done ? "line-through" : "none",
                        }}>
                          {activity.titulo}
                        </p>
                        <p style={{ fontSize: 10, color: "#7878A0", marginTop: 4 }}>
                          {ACTIVITY_TYPE_LABELS[activity.tipo] ?? activity.tipo}
                          {activity.dueAt ? ` · até ${new Date(activity.dueAt).toLocaleDateString("pt-BR")}` : ""}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {tab === "observacoes" && (
            <>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF", margin: 0, textTransform: "uppercase" }}>
                Observações do negócio
              </h3>
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Registre alinhamentos, objeções, decisões do cliente..."
                rows={4}
                style={{
                  width: "100%", background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                  padding: "12px", fontSize: 13, color: "#EEEEFF", outline: "none", resize: "vertical",
                  fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={handleAddNote}
                style={{
                  alignSelf: "flex-start", background: colColor, border: "none", borderRadius: 8,
                  padding: "8px 14px", color: "#000", fontWeight: 700, fontSize: 12, cursor: "pointer",
                }}
              >
                Salvar observação
              </button>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ...notes.map((n) => ({
                    id: n.id,
                    texto: n.texto,
                    when: n.criadoEm,
                  })),
                  ...noteActivities.map((a) => ({
                    id: a.id,
                    texto: a.descricao || a.titulo,
                    when: String(a.createdAt),
                  })),
                ]
                  .filter((item, idx, arr) => arr.findIndex((x) => x.texto === item.texto) === idx)
                  .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
                  .map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                        padding: "12px 14px",
                      }}
                    >
                      <p style={{ fontSize: 13, color: "#EEEEFF", margin: 0, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>
                        {item.texto}
                      </p>
                      <p style={{ fontSize: 10, color: "#3A3A5C", marginTop: 8 }}>
                        {new Date(item.when).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  ))}
                {notes.length === 0 && noteActivities.length === 0 && (
                  <p style={{ fontSize: 12, color: "#7878A0" }}>
                    Nenhuma observação ainda. Use este espaço como histórico comercial do negócio.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 24px", borderTop: "1px solid #1A1A30",
          display: "flex", gap: 10,
        }}>
          <Link
            href={`/tagmob-os/${deal.id}`}
            style={{
              flex: 1, padding: "12px", borderRadius: 8, backgroundColor: colColor,
              color: "#000", fontSize: 13, fontWeight: 800, textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            Abrir Workspace OS <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes dealDrawerIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );

  return createPortal(drawer, document.body);
}
