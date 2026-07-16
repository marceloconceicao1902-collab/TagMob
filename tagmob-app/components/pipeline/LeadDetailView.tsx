"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2, Mail, Phone, DollarSign, CheckSquare, Square,
  ChevronRight, MessageSquare, ListTodo, Calendar, StickyNote,
} from "lucide-react";
import { ACTIVITY_TYPE_LABELS, LEAD_STATUS_LABELS, type ActivityDTO, type LeadDTO } from "@/lib/crm";
import { formatBRL } from "@/lib/pipeline-kanban";

type Tab = "resumo" | "tarefas" | "atividades" | "observacoes";
type Task = { id: string; texto: string; concluida: boolean };
type Note = { id: string; texto: string; criadoEm: string };

const STATUS_COLORS: Record<string, string> = {
  NOVO: "#00E5FF",
  EM_ATENDIMENTO: "#FFB800",
  QUALIFICADO: "#8B5CF6",
  CONVERTIDO: "#39FF14",
  ARQUIVADO: "#7878A0",
};

const ACTIVITY_TYPES = ["TAREFA", "LIGACAO", "REUNIAO", "EMAIL", "FOLLOW_UP"] as const;

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

export default function LeadDetailView({
  lead,
  onBack,
  onLeadChange,
  onConvert,
}: {
  lead: LeadDTO;
  onBack: () => void;
  onLeadChange: (lead: LeadDTO) => void;
  onConvert: (lead: LeadDTO) => void;
}) {
  const color = STATUS_COLORS[lead.status] ?? "#FFB800";
  const [tab, setTab] = useState<Tab>("resumo");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activities, setActivities] = useState<ActivityDTO[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newActivityTitle, setNewActivityTitle] = useState("");
  const [newActivityType, setNewActivityType] = useState<(typeof ACTIVITY_TYPES)[number]>("FOLLOW_UP");
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    const allTasks = readStore<Record<string, Task[]>>("tagmob_lead_tasks", {});
    const allNotes = readStore<Record<string, Note[]>>("tagmob_lead_notes", {});
    setTasks(allTasks[lead.id] ?? [
      { id: "t1", texto: "Confirmar interesse e orçamento", concluida: lead.status !== "NOVO" },
      { id: "t2", texto: "Agendar call de discovery", concluida: false },
      { id: "t3", texto: "Enviar proposta / simulação", concluida: false },
    ]);
    setNotes(allNotes[lead.id] ?? []);
    setTab("resumo");
  }, [lead.id, lead.status]);

  const loadActivities = useCallback(async () => {
    try {
      const res = await fetch(`/api/crm/activities?leadId=${encodeURIComponent(lead.id)}`);
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.data)) {
          setActivities(json.data);
          return;
        }
      }
    } catch { /* offline */ }
    const local = readStore<Record<string, ActivityDTO[]>>("tagmob_lead_activities", {});
    setActivities(local[lead.id] ?? []);
  }, [lead.id]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const persistTasks = (list: Task[]) => {
    setTasks(list);
    const all = readStore<Record<string, Task[]>>("tagmob_lead_tasks", {});
    writeStore("tagmob_lead_tasks", { ...all, [lead.id]: list });
  };

  const persistNotes = (list: Note[]) => {
    setNotes(list);
    const all = readStore<Record<string, Note[]>>("tagmob_lead_notes", {});
    writeStore("tagmob_lead_notes", { ...all, [lead.id]: list });
  };

  const updateStatus = async (status: string) => {
    onLeadChange({ ...lead, status });
    if (lead.id.startsWith("LEAD-LOCAL-")) {
      try {
        const local = JSON.parse(localStorage.getItem("tagmob_local_leads") || "[]");
        localStorage.setItem(
          "tagmob_local_leads",
          JSON.stringify(local.map((l: LeadDTO) => (l.id === lead.id ? { ...l, status } : l)))
        );
      } catch { /* ignore */ }
      return;
    }
    try {
      await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, status }),
      });
    } catch { /* offline */ }
  };

  const handleConvert = async () => {
    setConverting(true);
    try {
      await onConvert(lead);
    } finally {
      setConverting(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof ListTodo }[] = [
    { id: "resumo", label: "Resumo", icon: StickyNote },
    { id: "tarefas", label: "Tarefas", icon: ListTodo },
    { id: "atividades", label: "Atividades", icon: Calendar },
    { id: "observacoes", label: "Observações", icon: MessageSquare },
  ];

  const taskProgress = tasks.length
    ? Math.round((tasks.filter((t) => t.concluida).length / tasks.length) * 100)
    : 0;

  return (
    <div style={{ padding: "28px 36px", minHeight: "100%", background: "#09090F" }}>
      <button
        type="button"
        onClick={onBack}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16,
          background: "none", border: "none", color: "#7878A0", fontSize: 13,
          fontWeight: 700, cursor: "pointer", padding: 0,
        }}
      >
        ← Voltar para Negócios
      </button>

      <div style={{
        maxWidth: 920, margin: "0 auto", background: "#0B0B16",
        border: `1px solid ${color}40`, borderRadius: 16, overflow: "hidden",
      }}>
        <div style={{ padding: "22px 24px", borderBottom: "1px solid #1A1A30" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 900, color,
                backgroundColor: color + "18", padding: "2px 8px", borderRadius: 4,
              }}>
                LEAD · {LEAD_STATUS_LABELS[lead.status] ?? lead.status}
              </span>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: "#EEEEFF", margin: "10px 0 6px", letterSpacing: "-0.03em" }}>
                {lead.nome}
              </h1>
              {lead.empresa && (
                <p style={{ fontSize: 13, color: "#7878A0", display: "flex", alignItems: "center", gap: 6, margin: 0 }}>
                  <Building2 size={13} /> {lead.empresa}
                </p>
              )}
            </div>
            <button
              type="button"
              disabled={converting || lead.status === "CONVERTIDO"}
              onClick={handleConvert}
              style={{
                alignSelf: "flex-start",
                background: "#39FF14", border: "none", borderRadius: 10,
                padding: "12px 18px", color: "#000", fontWeight: 800, fontSize: 13,
                cursor: converting ? "wait" : "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              Converter → OS <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 2, padding: "10px 16px", borderBottom: "1px solid #1A1A30", overflowX: "auto" }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                  background: active ? color + "20" : "transparent",
                  color: active ? color : "#7878A0",
                }}
              >
                <Icon size={12} /> {t.label}
              </button>
            );
          })}
        </div>

        <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
          {tab === "resumo" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "#111122", border: "1px solid #1A1A30", borderRadius: 10, padding: 14 }}>
                  <p style={{ fontSize: 10, color: "#7878A0", fontWeight: 700, margin: 0 }}>ORÇAMENTO</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color, margin: "6px 0 0", display: "flex", alignItems: "center", gap: 6 }}>
                    <DollarSign size={16} />
                    {lead.orcamentoEstimado != null ? formatBRL(Number(lead.orcamentoEstimado)) : "—"}
                  </p>
                </div>
                <div style={{ background: "#111122", border: "1px solid #1A1A30", borderRadius: 10, padding: 14 }}>
                  <p style={{ fontSize: 10, color: "#7878A0", fontWeight: 700, margin: 0 }}>TAREFAS</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#EEEEFF", margin: "6px 0 0" }}>{taskProgress}%</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontSize: 11, color: "#7878A0", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
                  <Mail size={12} /> {lead.email}
                </p>
                {lead.telefone && (
                  <p style={{ fontSize: 11, color: "#7878A0", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
                    <Phone size={12} /> {lead.telefone}
                  </p>
                )}
                {lead.mensagem && (
                  <div style={{ background: "#111122", border: "1px solid #1A1A30", borderRadius: 10, padding: 14, marginTop: 4 }}>
                    <p style={{ fontSize: 10, color: "#7878A0", fontWeight: 700, margin: "0 0 6px" }}>MENSAGEM</p>
                    <p style={{ fontSize: 13, color: "#EEEEFF", margin: 0, lineHeight: 1.5 }}>{lead.mensagem}</p>
                  </div>
                )}
              </div>

              <div>
                <p style={{ fontSize: 11, fontWeight: 800, color: "#EEEEFF", textTransform: "uppercase", marginBottom: 8 }}>
                  Status do lead
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(["NOVO", "EM_ATENDIMENTO", "QUALIFICADO"] as const).map((s) => {
                    const active = lead.status === s;
                    const c = STATUS_COLORS[s];
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => updateStatus(s)}
                        style={{
                          fontSize: 11, fontWeight: 700, padding: "6px 10px", borderRadius: 8,
                          cursor: "pointer",
                          border: `1px solid ${active ? c : "#1A1A30"}`,
                          background: active ? c + "22" : "#111120",
                          color: active ? c : "#7878A0",
                        }}
                      >
                        {LEAD_STATUS_LABELS[s]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {tab === "tarefas" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#EEEEFF", textTransform: "uppercase" }}>Checklist</h3>
                <span style={{ fontSize: 11, fontWeight: 700, color }}>{taskProgress}%</span>
              </div>
              <div style={{ height: 6, background: "#1A1A30", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${taskProgress}%`, background: color }} />
              </div>
              {tasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => persistTasks(tasks.map((t) => t.id === task.id ? { ...t, concluida: !t.concluida } : t))}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px",
                    background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                    cursor: "pointer", textAlign: "left", width: "100%",
                  }}
                >
                  <span style={{ color: task.concluida ? color : "#3A3A5C", marginTop: 2 }}>
                    {task.concluida ? <CheckSquare size={15} /> : <Square size={15} />}
                  </span>
                  <span style={{
                    fontSize: 13, color: task.concluida ? "#7878A0" : "#EEEEFF",
                    textDecoration: task.concluida ? "line-through" : "none",
                  }}>
                    {task.texto}
                  </span>
                </button>
              ))}
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newTask.trim()) {
                      persistTasks([...tasks, { id: `t-${Date.now()}`, texto: newTask.trim(), concluida: false }]);
                      setNewTask("");
                    }
                  }}
                  placeholder="Nova tarefa..."
                  style={{
                    flex: 1, background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                    padding: "8px 12px", fontSize: 13, color: "#EEEEFF", outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newTask.trim()) return;
                    persistTasks([...tasks, { id: `t-${Date.now()}`, texto: newTask.trim(), concluida: false }]);
                    setNewTask("");
                  }}
                  style={{ background: color, border: "none", borderRadius: 8, padding: "8px 14px", color: "#000", fontWeight: 700, cursor: "pointer" }}
                >
                  Adicionar
                </button>
              </div>
            </>
          )}

          {tab === "atividades" && (
            <>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <select
                  value={newActivityType}
                  onChange={(e) => setNewActivityType(e.target.value as typeof newActivityType)}
                  style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 10px", color: "#EEEEFF", fontSize: 12 }}
                >
                  {ACTIVITY_TYPES.map((t) => (
                    <option key={t} value={t}>{ACTIVITY_TYPE_LABELS[t]}</option>
                  ))}
                </select>
                <input
                  value={newActivityTitle}
                  onChange={(e) => setNewActivityTitle(e.target.value)}
                  placeholder="Ex: Ligar para o lead..."
                  style={{
                    flex: 1, minWidth: 160, background: "#111120", border: "1px solid #1A1A30",
                    borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#EEEEFF", outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={async () => {
                    if (!newActivityTitle.trim()) return;
                    const titulo = newActivityTitle.trim();
                    setNewActivityTitle("");
                    const optimistic = {
                      id: `act-local-${Date.now()}`,
                      tipo: newActivityType,
                      titulo,
                      status: "PENDENTE",
                      createdAt: new Date(),
                    } as ActivityDTO;
                    setActivities((prev) => [optimistic, ...prev]);
                    const local = readStore<Record<string, ActivityDTO[]>>("tagmob_lead_activities", {});
                    writeStore("tagmob_lead_activities", {
                      ...local,
                      [lead.id]: [optimistic, ...(local[lead.id] ?? [])],
                    });
                    try {
                      await fetch("/api/crm/activities", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ tipo: newActivityType, titulo, leadId: lead.id }),
                      });
                      await loadActivities();
                    } catch { /* local */ }
                  }}
                  style={{ background: color, border: "none", borderRadius: 8, padding: "8px 14px", color: "#000", fontWeight: 700, cursor: "pointer" }}
                >
                  Criar
                </button>
              </div>
              {activities.filter((a) => a.tipo !== "NOTA").length === 0 && (
                <p style={{ fontSize: 12, color: "#7878A0" }}>Nenhuma atividade ainda.</p>
              )}
              {activities.filter((a) => a.tipo !== "NOTA").map((a) => (
                <div key={a.id} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: 12 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{a.titulo}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 10, color: "#7878A0" }}>
                    {ACTIVITY_TYPE_LABELS[a.tipo] ?? a.tipo} · {a.status}
                  </p>
                </div>
              ))}
            </>
          )}

          {tab === "observacoes" && (
            <>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={4}
                placeholder="Registre conversas, objeções, próximos passos..."
                style={{
                  width: "100%", background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                  padding: 12, fontSize: 13, color: "#EEEEFF", outline: "none", resize: "vertical",
                  fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={async () => {
                  if (!newNote.trim()) return;
                  const texto = newNote.trim();
                  const note = { id: `n-${Date.now()}`, texto, criadoEm: new Date().toISOString() };
                  persistNotes([note, ...notes]);
                  setNewNote("");
                  try {
                    await fetch("/api/crm/activities", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        tipo: "NOTA",
                        titulo: texto.slice(0, 80),
                        descricao: texto,
                        leadId: lead.id,
                      }),
                    });
                  } catch { /* local */ }
                }}
                style={{
                  alignSelf: "flex-start", background: color, border: "none", borderRadius: 8,
                  padding: "8px 14px", color: "#000", fontWeight: 700, fontSize: 12, cursor: "pointer",
                }}
              >
                Salvar observação
              </button>
              {notes.length === 0 && (
                <p style={{ fontSize: 12, color: "#7878A0" }}>Nenhuma observação ainda.</p>
              )}
              {notes.map((n) => (
                <div key={n.id} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: 12 }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#EEEEFF", whiteSpace: "pre-wrap", lineHeight: 1.45 }}>{n.texto}</p>
                  <p style={{ margin: "8px 0 0", fontSize: 10, color: "#3A3A5C" }}>
                    {new Date(n.criadoEm).toLocaleString("pt-BR")}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#3A3A5C" }}>
        Ou continue no pipeline: <Link href="/negocios" style={{ color: "#FF0068" }}>voltar ao Kanban</Link>
      </p>
    </div>
  );
}
