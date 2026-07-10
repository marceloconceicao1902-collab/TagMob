"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2, Rocket, CheckCircle2, Clock, AlertCircle,
  ChevronRight, Plus, FileText, BarChart3, Layers,
  Sparkles, Lock, ArrowUpRight, Play, Zap, Trophy,
  CircleDot, TrendingUp, Package, Settings2,
} from "lucide-react";
import { ModelComparison } from "@/components/billing/ModelComparison";

// ─── Mock data ────────────────────────────────────────────────────────────────
const EMPREENDIMENTOS = [
  {
    id: "emp-001",
    nome: "Ícone Jardins",
    tipo: "RESIDENCIAL",
    bairro: "Jardins",
    cidade: "São Paulo — SP",
    cor: "#FF0068",
    etapa1Paga: true,
    status: "EM_ANDAMENTO",
    plano: "PRO",
    totalPecas: 54,
    pecasConcluidas: 31,
    pecasAprovacao: 8,
    orcamentoTotal: 128_000,
    orcamentoVariavel: 42_000,
    tipoContrato: "Projeto Fechado",
    depAtual: "DESIGN",
    thumbnail: null,
    tags: ["Alto Padrão", "Lançamento Q3"],
  },
  {
    id: "emp-002",
    nome: "Vista Morumbi",
    tipo: "MISTO",
    bairro: "Morumbi",
    cidade: "São Paulo — SP",
    cor: "#00E5FF",
    etapa1Paga: true,
    status: "EM_ANDAMENTO",
    plano: "ENTERPRISE",
    totalPecas: 72,
    pecasConcluidas: 12,
    pecasAprovacao: 3,
    orcamentoTotal: 196_000,
    orcamentoVariavel: 78_000,
    tipoContrato: "Fee Mensal",
    depAtual: "REDACAO",
    thumbnail: null,
    tags: ["Comercial + Residencial", "Fee Mensal"],
  },
  {
    id: "emp-003",
    nome: "Reserva Campinas",
    tipo: "RESIDENCIAL",
    bairro: "Cambuí",
    cidade: "Campinas — SP",
    cor: "#39FF14",
    etapa1Paga: false,
    status: "AGUARDANDO_SETUP",
    plano: "STARTER",
    totalPecas: 0,
    pecasConcluidas: 0,
    pecasAprovacao: 0,
    orcamentoTotal: 86_000,
    orcamentoVariavel: 0,
    tipoContrato: "Projeto Fechado",
    depAtual: null,
    thumbnail: null,
    tags: ["Pendente Setup", "Médio Padrão"],
  },
];

const PIPELINE_STEPS = [
  { key: "ATENDIMENTO", label: "Atendimento", short: "AT" },
  { key: "PLANEJAMENTO", label: "Planejamento", short: "PL" },
  { key: "DIRECAO_CRIACAO", label: "Direção Criativa", short: "DC" },
  { key: "REDACAO", label: "Redação + Arte", short: "RA" },
  { key: "DESIGN", label: "Design / AV", short: "DG" },
  { key: "PRODUCAO_GRAFICA", label: "Prod. Gráfica", short: "PG" },
  { key: "CLIENTE", label: "Aprovação", short: "AP" },
];

const TABS = [
  { id: "visao", label: "Visão Geral", icon: BarChart3 },
  { id: "empreendimentos", label: "Empreendimentos", icon: Building2 },
  { id: "pipeline", label: "OS Pipeline", icon: Layers },
  { id: "modelo", label: "Modelo de Contratação", icon: FileText },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function pct(done: number, total: number) {
  if (!total) return 0;
  return Math.round((done / total) * 100);
}

const DEP_COLOR: Record<string, string> = {
  ATENDIMENTO: "#7878A0",
  PLANEJAMENTO: "#8B5CF6",
  DIRECAO_CRIACAO: "#FF0068",
  REDACAO: "#FFB800",
  DESIGN: "#00E5FF",
  PRODUCAO_GRAFICA: "#39FF14",
  CLIENTE: "#22C55E",
};

// ─── Sub-componentes ──────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, color, icon: Icon }: {
  label: string; value: string; sub: string; color: string;
  icon: React.ComponentType<{ size?: number }>;
}) {
  return (
    <div style={{
      background: "#111120", border: `1px solid ${color}20`,
      borderRadius: 14, padding: "18px 20px",
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "#7878A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={14} />
        </div>
      </div>
      <p style={{ fontSize: 26, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 11, color: "#7878A0" }}>{sub}</p>
    </div>
  );
}

function EmpreendimentoCard({ emp, onSelect }: { emp: typeof EMPREENDIMENTOS[0]; onSelect: (id: string) => void }) {
  const prog = pct(emp.pecasConcluidas, emp.totalPecas);
  const depIdx = PIPELINE_STEPS.findIndex(s => s.key === emp.depAtual);

  return (
    <div
      onClick={() => onSelect(emp.id)}
      style={{
        background: "#111120", border: `1px solid #1A1A30`,
        borderRadius: 16, overflow: "hidden",
        cursor: "pointer", transition: "border-color 0.15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = emp.cor + "50")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "#1A1A30")}
    >
      {/* Topo colorido */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${emp.cor}, ${emp.cor}40)` }} />

      <div style={{ padding: "18px 20px" }}>
        {/* Header do card */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.02em" }}>
                {emp.nome}
              </h3>
              {!emp.etapa1Paga && (
                <span style={{ fontSize: 9, fontWeight: 700, color: "#FFB800", background: "#FFB80015", border: "1px solid #FFB80030", padding: "2px 7px", borderRadius: 20, display: "flex", alignItems: "center", gap: 3 }}>
                  <Lock size={8} /> SETUP PENDENTE
                </span>
              )}
            </div>
            <p style={{ fontSize: 12, color: "#7878A0" }}>{emp.bairro} · {emp.cidade}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: emp.cor, background: emp.cor + "15", padding: "2px 8px", borderRadius: 20 }}>
              {emp.plano}
            </span>
            <span style={{ fontSize: 10, color: "#7878A0" }}>{emp.tipoContrato}</span>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
          {emp.tags.map(t => (
            <span key={t} style={{ fontSize: 10, color: "#5A5A7A", background: "#1A1A30", padding: "2px 8px", borderRadius: 10 }}>
              {t}
            </span>
          ))}
        </div>

        {/* Pipeline mini */}
        {emp.etapa1Paga ? (
          <>
            <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
              {PIPELINE_STEPS.map((s, i) => (
                <div key={s.key} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: i < depIdx ? emp.cor : i === depIdx ? emp.cor + "80" : "#1A1A30",
                }} title={s.label} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <CircleDot size={10} color={DEP_COLOR[emp.depAtual!] || "#7878A0"} />
              <span style={{ fontSize: 11, color: DEP_COLOR[emp.depAtual!] || "#7878A0", fontWeight: 600 }}>
                {PIPELINE_STEPS.find(s => s.key === emp.depAtual)?.label || "—"}
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: "#7878A0" }}>Peças concluídas</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF" }}>
                  {emp.pecasConcluidas}/{emp.totalPecas} ({prog}%)
                </span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: "#1A1A30", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${prog}%`, background: `linear-gradient(90deg, ${emp.cor}, ${emp.cor}80)`, borderRadius: 3, transition: "width 0.6s" }} />
              </div>
            </div>

            {/* Em aprovação */}
            {emp.pecasAprovacao > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, padding: "7px 10px", background: "#FFB80008", border: "1px solid #FFB80025", borderRadius: 8 }}>
                <AlertCircle size={12} color="#FFB800" />
                <span style={{ fontSize: 11, color: "#FFB800", fontWeight: 600 }}>
                  {emp.pecasAprovacao} {emp.pecasAprovacao === 1 ? "peça aguarda" : "peças aguardam"} aprovação
                </span>
              </div>
            )}
          </>
        ) : (
          <div style={{ padding: "14px 16px", background: "#FFB80008", border: "1px solid #FFB80025", borderRadius: 10, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Lock size={13} color="#FFB800" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#FFB800" }}>OS bloqueado — Setup Etapa 1 pendente</span>
            </div>
            <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.5 }}>
              Realize o pagamento do Combo Fixo para liberar a esteira de produção.
            </p>
            <Link href="/onboarding" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 11, fontWeight: 700, color: "#FFB800", textDecoration: "none" }}>
              Contratar Etapa 1 <ArrowUpRight size={11} />
            </Link>
          </div>
        )}

        {/* Orçamento */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, paddingTop: 14, borderTop: "1px solid #1A1A30" }}>
          <div>
            <p style={{ fontSize: 10, color: "#7878A0", marginBottom: 2 }}>Orçamento Total</p>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF" }}>{fmt(emp.orcamentoTotal)}</p>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#7878A0", marginBottom: 2 }}>Módulos adicionados</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: emp.cor }}>{fmt(emp.orcamentoVariavel)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function IncorporadoraHub() {
  const [activeTab, setActiveTab] = useState("visao");
  const [selectedEmp, setSelectedEmp] = useState<string | null>(null);

  const totalOrc = EMPREENDIMENTOS.reduce((s, e) => s + e.orcamentoTotal, 0);
  const totalPecas = EMPREENDIMENTOS.reduce((s, e) => s + e.totalPecas, 0);
  const totalAprovacao = EMPREENDIMENTOS.reduce((s, e) => s + e.pecasAprovacao, 0);
  const totalConcluidas = EMPREENDIMENTOS.reduce((s, e) => s + e.pecasConcluidas, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#09090F" }}>
      
      {/* ── HERO HEADER ───────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #0D0D1A 0%, #09090F 60%, #FF006808 100%)",
        borderBottom: "1px solid #1A1A30", padding: "32px 36px 0",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FF006815", border: "1px solid #FF006830", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={18} color="#FF0068" />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "#7878A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  TAGMOB OS
                </p>
                <h1 style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  Painel da Incorporadora
                </h1>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#7878A0", maxWidth: 480, lineHeight: 1.6 }}>
              Central operacional dos seus empreendimentos. Acompanhe a esteira de produção,
              aprove peças e exporte materiais com autonomia total.
            </p>
          </div>

          <Link
            href="/onboarding"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 20px", background: "#FF0068", color: "#fff",
              borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 700,
              boxShadow: "0 0 24px #FF006840",
            }}
          >
            <Plus size={14} />
            Novo Empreendimento
          </Link>
        </div>

        {/* KPI bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          <KpiCard label="Empreendimentos" value={String(EMPREENDIMENTOS.length)} sub="2 ativos · 1 aguardando setup" color="#FF0068" icon={Building2} />
          <KpiCard label="Orçamento Total" value={fmt(totalOrc)} sub="Contratos ativos no OS" color="#00E5FF" icon={TrendingUp} />
          <KpiCard label="Peças no Pipeline" value={`${totalConcluidas}/${totalPecas}`} sub={`${pct(totalConcluidas, totalPecas)}% concluídas`} color="#39FF14" icon={Package} />
          <KpiCard label="Aguardando Aprovação" value={String(totalAprovacao)} sub="Peças prontas para revisar" color="#FFB800" icon={AlertCircle} />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 2 }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "9px 16px", borderRadius: "8px 8px 0 0",
                background: activeTab === t.id ? "#111120" : "transparent",
                border: activeTab === t.id ? "1px solid #1A1A30" : "1px solid transparent",
                borderBottom: activeTab === t.id ? "1px solid #111120" : "1px solid transparent",
                color: activeTab === t.id ? "#EEEEFF" : "#5A5A7A",
                fontSize: 12, fontWeight: activeTab === t.id ? 700 : 500,
                cursor: "pointer", transition: "all 0.12s",
              }}
            >
              <t.icon size={13} />
              {t.label}
              {t.id === "empreendimentos" && (
                <span style={{ fontSize: 10, fontWeight: 800, padding: "1px 6px", borderRadius: 10, background: "#FF006815", color: "#FF0068" }}>
                  {EMPREENDIMENTOS.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTEÚDO DAS TABS ─────────────────────────────────────────────── */}
      <div style={{ padding: "28px 36px" }}>

        {/* Tab: Visão Geral */}
        {activeTab === "visao" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Alert se há aprovação pendente */}
            {totalAprovacao > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#FFB80008", border: "1px solid #FFB80030", borderRadius: 12 }}>
                <AlertCircle size={18} color="#FFB800" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#FFB800" }}>
                    {totalAprovacao} {totalAprovacao === 1 ? "peça aguarda" : "peças aguardam"} sua aprovação
                  </p>
                  <p style={{ fontSize: 11, color: "#7878A0" }}>Acesse a aba Empreendimentos para revisar cada item</p>
                </div>
                <button
                  onClick={() => setActiveTab("empreendimentos")}
                  style={{ padding: "7px 14px", background: "#FFB800", color: "#000", fontSize: 12, fontWeight: 700, borderRadius: 8, border: "none", cursor: "pointer" }}
                >
                  Revisar agora
                </button>
              </div>
            )}

            {/* Grid resumo de empreendimentos */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>Empreendimentos Ativos</h2>
                <button onClick={() => setActiveTab("empreendimentos")} style={{ fontSize: 12, color: "#FF0068", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                  Ver todos →
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {EMPREENDIMENTOS.map(emp => (
                  <EmpreendimentoCard key={emp.id} emp={emp} onSelect={(id) => { setSelectedEmp(id); setActiveTab("empreendimentos"); }} />
                ))}
              </div>
            </div>

            {/* Features do OS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { icon: Sparkles, cor: "#FF0068", titulo: "IA Contextual", desc: "Gere copies e conteúdos baseados no manifesto do seu empreendimento, sem inventar conceitos." },
                { icon: Zap, cor: "#00E5FF", titulo: "Exportação Autônoma", desc: "Altere tabelas de preços, metragens e fotos. Exporte em PDF para gráfica ou JPG em segundos." },
                { icon: Trophy, cor: "#39FF14", titulo: "Sem Fidelidade Longa", desc: "Contrate por projeto, fee mensal ou banco de horas. Você decide o modelo que faz sentido." },
              ].map(f => (
                <div key={f.titulo} style={{ padding: "18px 20px", background: "#111120", border: `1px solid ${f.cor}20`, borderRadius: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `${f.cor}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    <f.icon size={16} color={f.cor} />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 6 }}>{f.titulo}</p>
                  <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Empreendimentos */}
        {activeTab === "empreendimentos" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF" }}>Todos os Empreendimentos</h2>
              <Link href="/onboarding" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "#FF006820", border: "1px solid #FF006840", color: "#FF0068", borderRadius: 9, textDecoration: "none", fontSize: 12, fontWeight: 700 }}>
                <Plus size={13} /> Novo Empreendimento
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {EMPREENDIMENTOS.map(emp => (
                <EmpreendimentoCard key={emp.id} emp={emp} onSelect={setSelectedEmp} />
              ))}

              {/* Card de adicionar novo */}
              <Link
                href="/onboarding"
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: 10, padding: 32, background: "#111120",
                  border: "1px dashed #2E2E4A", borderRadius: 16, textDecoration: "none",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#FF006840")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#2E2E4A")}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FF006815", border: "1px solid #FF006830", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Plus size={20} color="#FF0068" />
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#5A5A7A" }}>Novo Empreendimento</p>
                <p style={{ fontSize: 11, color: "#2E2E4A", textAlign: "center" }}>Iniciar o configurador<br />com o Combo Etapa 1</p>
              </Link>
            </div>
          </div>
        )}

        {/* Tab: Pipeline */}
        {activeTab === "pipeline" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF", marginBottom: 6 }}>OS Pipeline — Esteira de Produção</h2>
              <p style={{ fontSize: 12, color: "#7878A0" }}>Acompanhe o status de cada empreendimento na esteira interna da TAGMOB.</p>
            </div>

            {EMPREENDIMENTOS.filter(e => e.etapa1Paga).map(emp => {
              const depIdx = PIPELINE_STEPS.findIndex(s => s.key === emp.depAtual);
              return (
                <div key={emp.id} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, overflow: "hidden" }}>
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${emp.cor}, ${emp.cor}30)` }} />
                  <div style={{ padding: "18px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <div>
                        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF" }}>{emp.nome}</h3>
                        <p style={{ fontSize: 11, color: "#7878A0" }}>{emp.bairro} · {emp.cidade}</p>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: emp.cor, background: emp.cor + "15", padding: "3px 10px", borderRadius: 20 }}>
                        {pct(emp.pecasConcluidas, emp.totalPecas)}% concluído
                      </span>
                    </div>

                    {/* Pipeline visual */}
                    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                      {PIPELINE_STEPS.map((s, i) => {
                        const isDone = i < depIdx;
                        const isActive = i === depIdx;
                        const color = isDone ? emp.cor : isActive ? emp.cor : "#1A1A30";
                        return (
                          <div key={s.key} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <div style={{
                              display: "flex", flexDirection: "column", alignItems: "center",
                              gap: 6, flex: 1, position: "relative",
                            }}>
                              <div style={{
                                width: 28, height: 28, borderRadius: "50%",
                                background: isDone ? emp.cor : isActive ? emp.cor + "30" : "#0D0D1A",
                                border: `2px solid ${color}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 9, fontWeight: 800,
                                color: isDone ? "#fff" : isActive ? emp.cor : "#3A3A5C",
                                zIndex: 1,
                              }}>
                                {isDone ? <CheckCircle2 size={12} /> : isActive ? <Play size={10} /> : s.short}
                              </div>
                              <span style={{
                                fontSize: 9, color: isActive ? emp.cor : isDone ? "#7878A0" : "#3A3A5C",
                                fontWeight: isActive ? 700 : 400, textAlign: "center", maxWidth: 70,
                                lineHeight: 1.2,
                              }}>
                                {s.label}
                              </span>
                            </div>
                            {i < PIPELINE_STEPS.length - 1 && (
                              <div style={{ width: 20, height: 2, background: i < depIdx ? emp.cor : "#1A1A30", flexShrink: 0, marginBottom: 18 }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {EMPREENDIMENTOS.filter(e => !e.etapa1Paga).map(emp => (
              <div key={emp.id} style={{ padding: "16px 24px", background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, display: "flex", alignItems: "center", gap: 14 }}>
                <Lock size={16} color="#FFB800" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{emp.nome}</p>
                  <p style={{ fontSize: 11, color: "#7878A0" }}>OS bloqueado — Pagamento do Setup Etapa 1 pendente</p>
                </div>
                <Link href="/onboarding" style={{ padding: "7px 14px", background: "#FFB800", color: "#000", fontSize: 12, fontWeight: 700, borderRadius: 8, textDecoration: "none" }}>
                  Desbloquear
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Modelo de Contratação */}
        {activeTab === "modelo" && (
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ marginBottom: 8 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF", marginBottom: 4 }}>Modelo de Contratação TAGMOB</h2>
              <p style={{ fontSize: 12, color: "#7878A0" }}>
                Entenda por que nossa precificação baseada em escopo é mais transparente e justa do que o modelo tradicional por VGV.
              </p>
            </div>
            <ModelComparison />

            {/* Tipos de contrato */}
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF", marginBottom: 14 }}>Formatos de Contratação Disponíveis</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {[
                  { titulo: "Projeto Fechado por Campanha", desc: "Preço fixo definido no início. Ideal para lançamentos únicos com escopo bem definido.", cor: "#FF0068", badge: "Mais comum" },
                  { titulo: "Fee Mensal", desc: "Valor fixo mensal para entregas contínuas. Indicado para incorporadoras com múltiplos lançamentos simultâneos.", cor: "#00E5FF", badge: null },
                  { titulo: "Banco de Horas", desc: "Contrate um volume de horas criativas que consome conforme a demanda. Flexibilidade máxima.", cor: "#8B5CF6", badge: null },
                  { titulo: "Produção por Demanda", desc: "Pague por peça avulsa, sem compromisso de volume. Ideal para projetos pontuais.", cor: "#39FF14", badge: null },
                ].map(c => (
                  <div key={c.titulo} style={{ padding: "18px 20px", background: "#111120", border: `1px solid ${c.cor}20`, borderRadius: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <h4 style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", flex: 1 }}>{c.titulo}</h4>
                      {c.badge && (
                        <span style={{ fontSize: 9, fontWeight: 800, color: "#000", background: c.cor, padding: "2px 7px", borderRadius: 10 }}>{c.badge}</span>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.6 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
