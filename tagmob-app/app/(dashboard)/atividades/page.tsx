"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckSquare, Clock, Phone, Mail, Users, FileText,
  Calendar, CheckCircle2, Circle,
} from "lucide-react";
import { ACTIVITY_TYPE_LABELS } from "@/lib/crm";
import type { ActivityDTO } from "@/lib/crm";

const TYPE_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  TAREFA: CheckSquare,
  LIGACAO: Phone,
  REUNIAO: Calendar,
  EMAIL: Mail,
  NOTA: FileText,
  FOLLOW_UP: Clock,
};

const TYPE_COLORS: Record<string, string> = {
  TAREFA: "#8B5CF6",
  LIGACAO: "#00E5FF",
  REUNIAO: "#FFB800",
  EMAIL: "#FF0068",
  NOTA: "#7878A0",
  FOLLOW_UP: "#39FF14",
};

export default function AtividadesPage() {
  const [activities, setActivities] = useState<ActivityDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"PENDENTE" | "CONCLUIDA" | "TODAS">("PENDENTE");

  async function load() {
    setLoading(true);
    const url = tab === "TODAS" ? "/api/crm/activities" : `/api/crm/activities?status=${tab}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.data) setActivities(json.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [tab]);

  async function toggleComplete(activity: ActivityDTO) {
    const newStatus = activity.status === "CONCLUIDA" ? "PENDENTE" : "CONCLUIDA";
    const res = await fetch("/api/crm/activities", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: activity.id, status: newStatus }),
    });
    if (res.ok) load();
  }

  return (
    <div style={{ padding: "28px 32px", minHeight: "100vh", backgroundColor: "#09090F" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <CheckSquare size={18} color="#8B5CF6" />
          <span style={{ fontSize: 10, fontWeight: 800, color: "#8B5CF6", letterSpacing: "0.06em" }}>CRM · ATIVIDADES</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#EEEEFF" }}>Atividades & Tarefas</h1>
        <p style={{ fontSize: 14, color: "#7878A0" }}>Timeline de ações comerciais e operacionais do pipeline TAGMOB.</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["PENDENTE", "CONCLUIDA", "TODAS"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
            background: tab === t ? "#8B5CF620" : "#111120",
            border: `1px solid ${tab === t ? "#8B5CF640" : "#1A1A30"}`,
            color: tab === t ? "#8B5CF6" : "#7878A0",
          }}>
            {t === "PENDENTE" ? "Pendentes" : t === "CONCLUIDA" ? "Concluídas" : "Todas"}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "#7878A0" }}>Carregando atividades...</p>
      ) : activities.length === 0 ? (
        <p style={{ color: "#3A3A5C" }}>Nenhuma atividade nesta categoria.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {activities.map((a) => {
            const color = TYPE_COLORS[a.tipo] ?? "#7878A0";
            const Icon = TYPE_ICONS[a.tipo] ?? FileText;
            const done = a.status === "CONCLUIDA";
            return (
              <div key={a.id} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 16, display: "flex", gap: 14, alignItems: "flex-start", opacity: done ? 0.7 : 1 }}>
                <button onClick={() => toggleComplete(a)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 2 }}>
                  {done ? <CheckCircle2 size={18} color="#39FF14" /> : <Circle size={18} color="#3A3A5C" />}
                </button>
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} color={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color, backgroundColor: color + "15", padding: "1px 6px", borderRadius: 4 }}>
                      {ACTIVITY_TYPE_LABELS[a.tipo]}
                    </span>
                    {a.dueAt && !done && (
                      <span style={{ fontSize: 10, color: "#FFB800", display: "flex", alignItems: "center", gap: 3 }}>
                        <Clock size={10} /> {new Date(a.dueAt).toLocaleDateString("pt-BR")}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF", textDecoration: done ? "line-through" : "none" }}>{a.titulo}</p>
                  {a.descricao && <p style={{ fontSize: 12, color: "#7878A0", marginTop: 4, lineHeight: 1.4 }}>{a.descricao}</p>}
                  <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 11, color: "#3A3A5C", flexWrap: "wrap" }}>
                    {a.empreendimento && <Link href={`/tagmob-os/${a.empreendimento.id}`} style={{ color: "#00E5FF", textDecoration: "none" }}>{a.empreendimento.nome}</Link>}
                    {a.lead && <span>{a.lead.nome}</span>}
                    {a.ownerUser && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Users size={10} />{a.ownerUser.fullName}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
