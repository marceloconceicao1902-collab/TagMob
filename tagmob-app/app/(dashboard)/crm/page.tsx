"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Kanban, Inbox, Users, CheckSquare,
  Building2, DollarSign, TrendingUp, ArrowRight, Activity,
} from "lucide-react";
import { formatBRL } from "@/lib/pipeline-kanban";

type CrmMetrics = {
  totalLeads: number;
  leadsNovos: number;
  totalDeals: number;
  dealsAtivos: number;
  valorPipeline: number;
  atividadesPendentes: number;
  totalContatos: number;
  totalEmpresas: number;
};

export default function CrmDashboardPage() {
  const [metrics, setMetrics] = useState<CrmMetrics | null>(null);

  useEffect(() => {
    fetch("/api/crm/metrics")
      .then((r) => r.json())
      .then((json) => { if (json.data) setMetrics(json.data); })
      .catch(() => {});
  }, []);

  const cards = metrics ? [
    { label: "Valor do Pipeline", value: formatBRL(metrics.valorPipeline), color: "#FF0068", icon: DollarSign },
    { label: "Negócios Ativos", value: metrics.dealsAtivos, color: "#00E5FF", icon: TrendingUp },
    { label: "Leads Novos", value: metrics.leadsNovos, color: "#FFB800", icon: Inbox },
    { label: "Tarefas Pendentes", value: metrics.atividadesPendentes, color: "#8B5CF6", icon: CheckSquare },
    { label: "Contatos", value: metrics.totalContatos, color: "#39FF14", icon: Users },
    { label: "Empresas", value: metrics.totalEmpresas, color: "#7878A0", icon: Building2 },
  ] : [];

  const modules = [
    { title: "Pipeline Kanban", desc: "Negócios por etapa TAGMOB OS", href: "/negocios", color: "#FF0068", icon: Kanban },
    { title: "Inbox de Leads", desc: "Qualificar e converter leads", href: "/leads", color: "#FFB800", icon: Inbox },
    { title: "Contatos", desc: "Pessoas e stakeholders", href: "/contatos", color: "#39FF14", icon: Users },
    { title: "Atividades", desc: "Tarefas, ligações e follow-ups", href: "/atividades", color: "#8B5CF6", icon: Activity },
  ];

  return (
    <div style={{ padding: "28px 32px", minHeight: "100vh", backgroundColor: "#09090F" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <LayoutDashboard size={18} color="#FF0068" />
          <span style={{ fontSize: 10, fontWeight: 800, color: "#FF0068", letterSpacing: "0.06em" }}>TAGMOB CRM</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#EEEEFF" }}>Central Comercial</h1>
        <p style={{ fontSize: 14, color: "#7878A0", marginTop: 4 }}>
          CRM integrado ao ecossistema TAGMOB OS — do lead ao lançamento imobiliário.
        </p>
      </div>

      {!metrics ? (
        <p style={{ color: "#7878A0" }}>Carregando métricas...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 32 }}>
          {cards.map((c) => (
            <div key={c.label} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: "14px 18px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: c.color, opacity: 0.6 }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <p style={{ fontSize: 11, color: "#7878A0" }}>{c.label}</p>
                <c.icon size={14} color={c.color} />
              </div>
              <p style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF" }}>{c.value}</p>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", marginBottom: 16 }}>Módulos CRM</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {modules.map((m) => (
          <Link key={m.href} href={m.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "#111120", border: `1px solid ${m.color}25`, borderRadius: 14, padding: 20, height: "100%" }}>
              <div style={{ height: 3, backgroundColor: m.color, opacity: 0.6, borderRadius: 2, marginBottom: 14, marginTop: -4 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: m.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <m.icon size={18} color={m.color} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#EEEEFF" }}>{m.title}</h3>
              </div>
              <p style={{ fontSize: 13, color: "#7878A0", lineHeight: 1.5, marginBottom: 12 }}>{m.desc}</p>
              <span style={{ fontSize: 12, fontWeight: 700, color: m.color, display: "flex", alignItems: "center", gap: 4 }}>
                Acessar <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
