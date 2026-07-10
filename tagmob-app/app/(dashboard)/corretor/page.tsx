"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2, Zap, TrendingUp, Eye, ArrowRight, Sparkles, Plus,
  BarChart2, Share2, FileImage, FileText, Tag, CheckCircle2,
  Lock, ChevronRight, Download, ExternalLink, Clock, Users,
} from "lucide-react";
import { MOCK_IMOVEIS, MOCK_MARCAS, DASHBOARD_STATS, formatCurrency } from "@/lib/mock-data";

/* ─── Tipos locais ──────────────────────────────────────────────────────────── */
type Tab = "dashboard" | "imoveis" | "turbinar" | "ativos";

/* ─── Stat card ─────────────────────────────────────────────────────────────── */
function Stat({ label, value, color, sub, icon: Icon }: {
  label: string; value: string | number; color: string; sub?: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}) {
  return (
    <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: color, opacity: 0.6 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 6 }}>{label}</p>
          <p style={{ fontSize: 26, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ fontSize: 11, color: "#3A3A5C", marginTop: 4 }}>{sub}</p>}
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: color + "18", border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={17} color={color} />
        </div>
      </div>
    </div>
  );
}

/* ─── Badge de status imóvel ─────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: "TURBINADO" | "PUBLICADO" | "RASCUNHO" | "VENDIDO" }) {
  const cfg = {
    TURBINADO: { label: "Turbinado", color: "#39FF14" },
    PUBLICADO: { label: "Publicado", color: "#00E5FF" },
    RASCUNHO:  { label: "Rascunho",  color: "#FFB800" },
    VENDIDO:   { label: "Vendido",   color: "#7878A0" },
  };
  const { label, color } = cfg[status];
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color, backgroundColor: color + "18", border: `1px solid ${color}35`, padding: "2px 8px", borderRadius: 20 }}>
      {label}
    </span>
  );
}

/* ─── Peças de conteúdo simuladas ────────────────────────────────────────────── */
const MOCK_PECAS = [
  { id: "p1", titulo: "Post Lançamento 1:1",    tipo: "INSTAGRAM_POST", marca: "Portobello",  status: "PRONTO",   formato: "JPG 1080×1080", empreendimento: "Reserva Jardins" },
  { id: "p2", titulo: "Story Detalhe Cozinha",  tipo: "STORY",          marca: "Deca",        status: "PRONTO",   formato: "JPG 1080×1920", empreendimento: "Reserva Jardins" },
  { id: "p3", titulo: "Banner Digital 300×250", tipo: "BANNER_DIGITAL", marca: "Hunter Douglas", status: "PRONTO", formato: "PNG 300×250", empreendimento: "Alto do Parque" },
  { id: "p4", titulo: "Folder A4 Corretor",     tipo: "PDF_GRAFICA",    marca: "Portobello",  status: "PENDENTE", formato: "PDF A4 sangria", empreendimento: "Reserva Jardins" },
  { id: "p5", titulo: "Post Diferenciais 4:5",  tipo: "INSTAGRAM_POST", marca: "Deca",        status: "PRONTO",   formato: "JPG 1080×1350", empreendimento: "Lumina Offices" },
  { id: "p6", titulo: "Reels 15s Ambientes",    tipo: "VIDEO_REELS",    marca: "Hunter Douglas", status: "PRONTO", formato: "MP4 1080×1920", empreendimento: "Alto do Parque" },
];

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */
export default function CorretorPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [turbinarStep, setTurbinarStep] = useState<0 | 1 | 2>(0);
  const [marcaSelecionada, setMarcaSelecionada] = useState<string | null>(null);
  const [imovelSelecionado, setImovelSelecionado] = useState<string | null>(null);

  const tabs: { id: Tab; label: string; color: string }[] = [
    { id: "dashboard", label: "Dashboard",    color: "#FF0068" },
    { id: "imoveis",   label: "Meus Imóveis", color: "#00E5FF" },
    { id: "turbinar",  label: "Turbinar",     color: "#39FF14" },
    { id: "ativos",    label: "Peças & Ativos", color: "#8B5CF6" },
  ];

  return (
    <div style={{ padding: "28px 28px 80px", maxWidth: 1080, margin: "0 auto" }}>

      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: 2, backgroundColor: "#00E5FF" }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: "#00E5FF", letterSpacing: "0.08em", textTransform: "uppercase" }}>Portal do Corretor</p>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 2 }}>Dashboard de Vendas</h1>
          <p style={{ fontSize: 13, color: "#7878A0" }}>Gerencie sua carteira, turbine imóveis e exporte materiais.</p>
        </div>
        <Link href="/corretor/imoveis/novo" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#FF0068", color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
          <Plus size={15} /> Novo Imóvel
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 4 }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: "9px 14px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
              backgroundColor: tab === t.id ? t.color + "18" : "transparent",
              color: tab === t.id ? t.color : "#3A3A5C",
              outline: tab === t.id ? `1px solid ${t.color}30` : "none",
              transition: "all 0.12s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: DASHBOARD ──────────────────────────────────────────────────────── */}
      {tab === "dashboard" && (
        <div>
          {/* KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
            <Stat label="Total de Imóveis"    value={DASHBOARD_STATS.total_imoveis}    icon={Building2}  color="#00E5FF" sub="ativos na plataforma" />
            <Stat label="Imóveis Turbinados"  value={DASHBOARD_STATS.imoveis_turbinados} icon={Zap}      color="#39FF14" sub="com product placement" />
            <Stat label="Leads gerados"       value={DASHBOARD_STATS.leads_gerados}    icon={TrendingUp} color="#FF0068" sub="nos últimos 30 dias" />
            <Stat label="Visualizações/mês"   value={DASHBOARD_STATS.views_mes.toLocaleString("pt-BR")} icon={Eye} color="#FFB800" sub="em portais" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
            {/* Lista de imóveis recentes */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>Imóveis recentes</p>
                <button onClick={() => setTab("imoveis")} style={{ fontSize: 12, color: "#FF0068", background: "none", border: "none", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  Ver todos <ArrowRight size={12} />
                </button>
              </div>
              <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, overflow: "hidden" }}>
                {MOCK_IMOVEIS.slice(0, 5).map((im, idx, arr) => (
                  <div key={im.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderBottom: idx < arr.length - 1 ? "1px solid #1A1A30" : "none" }}>
                    <div style={{ width: 48, height: 38, borderRadius: 7, backgroundColor: "#0D0D1A", border: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Building2 size={16} color="#3A3A5C" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#EEEEFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{im.titulo}</p>
                      <p style={{ fontSize: 11, color: "#7878A0" }}>{im.bairro} · {im.tipo}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 4 }}>{formatCurrency(im.preco)}</p>
                      <StatusBadge status={im.status} />
                    </div>
                    {im.status !== "TURBINADO" && (
                      <button onClick={() => { setTab("turbinar"); setImovelSelecionado(im.id); }}
                        style={{ padding: "5px 10px", background: "#39FF1412", border: "1px solid #39FF1430", borderRadius: 7, fontSize: 11, color: "#39FF14", fontWeight: 700, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
                        <Zap size={11} /> Turbinar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Painel lateral */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Marcas compatíveis */}
              <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
                  <Sparkles size={14} color="#FF0068" />
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>Encaixe Perfeito</p>
                </div>
                {MOCK_MARCAS.filter((m) => m.campanha_ativa).slice(0, 3).map((m) => (
                  <div key={m.id} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#EEEEFF" }}>{m.nome}</p>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#39FF14" }}>{m.score_compatibilidade}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, backgroundColor: "#1A1A30", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${m.score_compatibilidade ?? 0}%`, backgroundColor: "#39FF14", borderRadius: 2 }} />
                    </div>
                    <p style={{ fontSize: 10, color: "#3A3A5C", marginTop: 3 }}>{m.produtos_disponiveis} produtos disponíveis</p>
                  </div>
                ))}
                <button onClick={() => setTab("turbinar")} style={{ width: "100%", padding: "9px", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.22)", borderRadius: 8, fontSize: 12, color: "#39FF14", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 6 }}>
                  <Zap size={13} /> Turbinar imóveis agora
                </button>
              </div>

              {/* Atividade recente */}
              <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 12 }}>Atividade recente</p>
                {[
                  { acao: "Peça exportada", detalhe: "Post 1:1 Reserva Jardins", tempo: "2 min", cor: "#39FF14" },
                  { acao: "Lead recebido",  detalhe: "Portobello via Encaixe",    tempo: "15 min", cor: "#FFB800" },
                  { acao: "Imóvel turbinado", detalhe: "Alto do Parque · Deca",    tempo: "1h",    cor: "#00E5FF" },
                  { acao: "Link compartilhado", detalhe: "Lumina Offices → WhatsApp", tempo: "3h", cor: "#8B5CF6" },
                ].map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, paddingBottom: 10, marginBottom: 10, borderBottom: i < 3 ? "1px solid #1A1A30" : "none" }}>
                    <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: a.cor, flexShrink: 0, marginTop: 5 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#EEEEFF" }}>{a.acao}</p>
                      <p style={{ fontSize: 11, color: "#7878A0" }}>{a.detalhe}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                      <Clock size={10} color="#3A3A5C" />
                      <p style={{ fontSize: 10, color: "#3A3A5C" }}>{a.tempo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: MEUS IMÓVEIS ───────────────────────────────────────────────────── */}
      {tab === "imoveis" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>{MOCK_IMOVEIS.length} imóveis na carteira</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["Todos", "Turbinados", "Publicados", "Rascunhos"].map((f) => (
                <button key={f} style={{ padding: "5px 12px", background: f === "Todos" ? "#FF006818" : "transparent", border: `1px solid ${f === "Todos" ? "#FF006840" : "#1A1A30"}`, borderRadius: 6, fontSize: 12, color: f === "Todos" ? "#FF0068" : "#3A3A5C", cursor: "pointer", fontWeight: f === "Todos" ? 700 : 500 }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
            {MOCK_IMOVEIS.map((im) => (
              <div key={im.id} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, overflow: "hidden" }}>
                {/* Thumb */}
                <div style={{ height: 80, backgroundColor: "#0D0D1A", borderBottom: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <Building2 size={28} color="#2E2E4A" />
                  <div style={{ position: "absolute", top: 10, right: 10 }}><StatusBadge status={im.status} /></div>
                  {im.status === "TURBINADO" && (
                    <div style={{ position: "absolute", bottom: 8, left: 10, display: "flex", alignItems: "center", gap: 4, background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.25)", borderRadius: 5, padding: "2px 7px" }}>
                      <Zap size={9} color="#39FF14" />
                      <span style={{ fontSize: 9, color: "#39FF14", fontWeight: 700 }}>TURBINADO</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 2 }}>{im.titulo}</p>
                  <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 10 }}>{im.bairro} · {im.area}m² · {im.quartos}q</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.03em" }}>{formatCurrency(im.preco)}</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Eye size={11} color="#3A3A5C" />
                        <span style={{ fontSize: 10, color: "#3A3A5C" }}>{im.visualizacoes ?? 0}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <TrendingUp size={11} color="#3A3A5C" />
                        <span style={{ fontSize: 10, color: "#3A3A5C" }}>{im.leads_gerados ?? 0} leads</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {im.status !== "TURBINADO" ? (
                      <button onClick={() => { setTab("turbinar"); setImovelSelecionado(im.id); }}
                        style={{ flex: 1, padding: "8px", background: "#39FF1412", border: "1px solid #39FF1430", borderRadius: 8, fontSize: 12, color: "#39FF14", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                        <Zap size={12} /> Turbinar
                      </button>
                    ) : (
                      <button onClick={() => setTab("ativos")} style={{ flex: 1, padding: "8px", background: "#8B5CF618", border: "1px solid #8B5CF630", borderRadius: 8, fontSize: 12, color: "#8B5CF6", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                        <FileImage size={12} /> Ver peças
                      </button>
                    )}
                    <button style={{ padding: "8px 12px", background: "transparent", border: "1px solid #1A1A30", borderRadius: 8, fontSize: 12, color: "#7878A0", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <Share2 size={12} /> Link
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: TURBINAR ───────────────────────────────────────────────────────── */}
      {tab === "turbinar" && (
        <div>
          {/* Progress steps */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
            {[
              { n: 1, label: "Selecionar imóvel",  cor: "#FF0068" },
              { n: 2, label: "Escolher marca",      cor: "#FFB800" },
              { n: 3, label: "Peças geradas",       cor: "#39FF14" },
            ].map((s, i, arr) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? 1 : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: turbinarStep + 1 >= s.n ? s.cor + "15" : "#111120", border: `1px solid ${turbinarStep + 1 >= s.n ? s.cor + "35" : "#1A1A30"}` }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: turbinarStep + 1 >= s.n ? s.cor + "25" : "#1A1A30", border: `1px solid ${turbinarStep + 1 >= s.n ? s.cor + "50" : "#282840"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: turbinarStep + 1 >= s.n ? s.cor : "#3A3A5C" }}>
                    {turbinarStep + 1 > s.n ? "✓" : s.n}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: turbinarStep + 1 >= s.n ? s.cor : "#3A3A5C", whiteSpace: "nowrap" }}>{s.label}</span>
                </div>
                {i < arr.length - 1 && <div style={{ flex: 1, height: 1, backgroundColor: turbinarStep + 1 > s.n ? arr[i].cor + "30" : "#1A1A30", margin: "0 4px" }} />}
              </div>
            ))}
          </div>

          {/* Step 0 — selecionar imóvel */}
          {turbinarStep === 0 && (
            <div>
              <p style={{ fontSize: 14, color: "#7878A0", marginBottom: 16 }}>Selecione o imóvel que deseja turbinar:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {MOCK_IMOVEIS.filter((im) => im.status !== "TURBINADO").map((im) => (
                  <button key={im.id} onClick={() => setImovelSelecionado(im.id)}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: imovelSelecionado === im.id ? "rgba(255,0,104,0.08)" : "#111120", border: `1px solid ${imovelSelecionado === im.id ? "#FF006840" : "#1A1A30"}`, borderRadius: 10, cursor: "pointer", textAlign: "left" }}>
                    <div style={{ width: 44, height: 36, borderRadius: 7, background: "#0D0D1A", border: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Building2 size={16} color="#3A3A5C" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{im.titulo}</p>
                      <p style={{ fontSize: 11, color: "#7878A0" }}>{im.bairro} · {formatCurrency(im.preco)}</p>
                    </div>
                    <StatusBadge status={im.status} />
                    {imovelSelecionado === im.id && <CheckCircle2 size={16} color="#FF0068" />}
                  </button>
                ))}
              </div>
              <button onClick={() => imovelSelecionado && setTurbinarStep(1)} disabled={!imovelSelecionado}
                style={{ marginTop: 16, padding: "12px 24px", background: imovelSelecionado ? "#FF0068" : "#111120", border: "none", borderRadius: 10, fontSize: 14, color: imovelSelecionado ? "#fff" : "#3A3A5C", fontWeight: 700, cursor: imovelSelecionado ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
                Próximo: escolher marca <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* Step 1 — escolher marca */}
          {turbinarStep === 1 && (
            <div>
              <p style={{ fontSize: 14, color: "#7878A0", marginBottom: 16 }}>Escolha a marca para o product placement:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
                {MOCK_MARCAS.filter((m) => m.campanha_ativa).map((m) => (
                  <button key={m.id} onClick={() => setMarcaSelecionada(m.id)}
                    style={{ padding: "16px 18px", background: marcaSelecionada === m.id ? "rgba(255,184,0,0.08)" : "#111120", border: `1px solid ${marcaSelecionada === m.id ? "#FFB80040" : "#1A1A30"}`, borderRadius: 12, cursor: "pointer", textAlign: "left" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>{m.nome}</p>
                        <p style={{ fontSize: 11, color: "#7878A0" }}>{m.categoria}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#39FF1418", border: "1px solid #39FF1430", borderRadius: 20, padding: "3px 8px" }}>
                        <BarChart2 size={10} color="#39FF14" />
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#39FF14" }}>{m.score_compatibilidade}%</span>
                      </div>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, backgroundColor: "#1A1A30", overflow: "hidden", marginBottom: 8 }}>
                      <div style={{ height: "100%", width: `${m.score_compatibilidade ?? 0}%`, backgroundColor: "#FFB800", borderRadius: 2 }} />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 10, color: "#FFB800", background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", padding: "2px 7px", borderRadius: 4 }}>
                        {m.produtos_disponiveis} produtos
                      </span>
                      {marcaSelecionada === m.id && (
                        <span style={{ fontSize: 10, color: "#39FF14", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", padding: "2px 7px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4 }}>
                          <CheckCircle2 size={9} /> Selecionada
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button onClick={() => setTurbinarStep(0)} style={{ padding: "11px 20px", background: "transparent", border: "1px solid #1A1A30", borderRadius: 10, fontSize: 13, color: "#7878A0", cursor: "pointer", fontWeight: 600 }}>
                  Voltar
                </button>
                <button onClick={() => marcaSelecionada && setTurbinarStep(2)} disabled={!marcaSelecionada}
                  style={{ padding: "11px 24px", background: marcaSelecionada ? "#FFB800" : "#111120", border: "none", borderRadius: 10, fontSize: 14, color: marcaSelecionada ? "#000" : "#3A3A5C", fontWeight: 700, cursor: marcaSelecionada ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
                  Gerar peças turbinadas <Zap size={15} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — peças geradas */}
          {turbinarStep === 2 && (
            <div>
              <div style={{ padding: "14px 18px", background: "rgba(57,255,20,0.06)", border: "1px solid rgba(57,255,20,0.2)", borderRadius: 10, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle2 size={18} color="#39FF14" />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>6 peças turbinadas geradas com sucesso!</p>
                  <p style={{ fontSize: 12, color: "#7878A0" }}>Todas aplicam a identidade do empreendimento + produto da {MOCK_MARCAS.find((m) => m.id === marcaSelecionada)?.nome}</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
                {[
                  { titulo: "Post Feed 1:1",        formato: "JPG 1080×1080", canal: "Instagram",  status: "Pronto" },
                  { titulo: "Story Vertical",        formato: "JPG 1080×1920", canal: "Instagram",  status: "Pronto" },
                  { titulo: "Post 4:5 Detalhes",     formato: "JPG 1080×1350", canal: "Instagram",  status: "Pronto" },
                  { titulo: "Banner Portal 300×250", formato: "PNG",           canal: "Portal",     status: "Pronto" },
                  { titulo: "Folder A4 Corretor",    formato: "PDF sangria",   canal: "Impressão",  status: "Pronto" },
                  { titulo: "Link Compartilhável",   formato: "URL pública",   canal: "WhatsApp",   status: "Pronto" },
                ].map((p, i) => (
                  <div key={i} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: 70, background: "#0D0D1A", borderBottom: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <FileImage size={22} color="#2E2E4A" />
                      <div style={{ position: "absolute", top: 6, right: 6 }}>
                        <span style={{ fontSize: 9, color: "#39FF14", background: "rgba(57,255,20,0.12)", border: "1px solid rgba(57,255,20,0.25)", padding: "2px 6px", borderRadius: 3, fontWeight: 700 }}>PRONTO</span>
                      </div>
                    </div>
                    <div style={{ padding: "10px 12px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF", marginBottom: 1 }}>{p.titulo}</p>
                      <p style={{ fontSize: 10, color: "#3A3A5C", marginBottom: 10 }}>{p.formato} · {p.canal}</p>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={{ flex: 1, padding: "6px", background: "#39FF1412", border: "1px solid #39FF1428", borderRadius: 6, fontSize: 11, color: "#39FF14", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                          <Download size={10} /> Baixar
                        </button>
                        <button style={{ padding: "6px 8px", background: "transparent", border: "1px solid #1A1A30", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center" }}>
                          <Share2 size={11} color="#7878A0" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <button onClick={() => { setTurbinarStep(0); setMarcaSelecionada(null); setImovelSelecionado(null); }}
                  style={{ padding: "11px 20px", background: "transparent", border: "1px solid #1A1A30", borderRadius: 10, fontSize: 13, color: "#7878A0", cursor: "pointer", fontWeight: 600 }}>
                  Turbinar outro imóvel
                </button>
                <button onClick={() => setTab("ativos")} style={{ padding: "11px 24px", background: "#8B5CF6", border: "none", borderRadius: 10, fontSize: 13, color: "#fff", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  Ver todas as peças <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: PEÇAS & ATIVOS ─────────────────────────────────────────────────── */}
      {tab === "ativos" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>{MOCK_PECAS.length} peças na biblioteca</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["Todas", "Posts", "Stories", "PDF"].map((f) => (
                <button key={f} style={{ padding: "5px 12px", background: f === "Todas" ? "#8B5CF618" : "transparent", border: `1px solid ${f === "Todas" ? "#8B5CF640" : "#1A1A30"}`, borderRadius: 6, fontSize: 12, color: f === "Todas" ? "#8B5CF6" : "#3A3A5C", cursor: "pointer", fontWeight: f === "Todas" ? 700 : 500 }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, overflow: "hidden" }}>
            {/* Cabeçalho tabela */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 90px 140px", gap: 0, padding: "10px 16px", borderBottom: "1px solid #1A1A30", backgroundColor: "#0D0D1A" }}>
              {["Peça", "Empreendimento", "Marca", "Status", "Ações"].map((h) => (
                <p key={h} style={{ fontSize: 10, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</p>
              ))}
            </div>
            {MOCK_PECAS.map((p, i, arr) => (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 90px 140px", gap: 0, padding: "12px 16px", borderBottom: i < arr.length - 1 ? "1px solid #1A1A30" : "none", alignItems: "center" }}>
                {/* Nome */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: "#0D0D1A", border: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {p.tipo === "PDF_GRAFICA" ? <FileText size={13} color="#3A3A5C" /> : <FileImage size={13} color="#3A3A5C" />}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#EEEEFF" }}>{p.titulo}</p>
                    <p style={{ fontSize: 10, color: "#3A3A5C" }}>{p.formato}</p>
                  </div>
                </div>
                {/* Empreendimento */}
                <p style={{ fontSize: 11, color: "#7878A0" }}>{p.empreendimento}</p>
                {/* Marca */}
                <span style={{ fontSize: 10, color: "#FFB800", background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.18)", padding: "2px 7px", borderRadius: 4, fontWeight: 600 }}>{p.marca}</span>
                {/* Status */}
                <span style={{ fontSize: 11, fontWeight: 700, color: p.status === "PRONTO" ? "#39FF14" : "#FFB800", background: p.status === "PRONTO" ? "rgba(57,255,20,0.08)" : "rgba(255,184,0,0.08)", border: `1px solid ${p.status === "PRONTO" ? "rgba(57,255,20,0.2)" : "rgba(255,184,0,0.2)"}`, padding: "2px 8px", borderRadius: 20 }}>
                  {p.status === "PRONTO" ? "Pronto" : "Pendente"}
                </span>
                {/* Ações */}
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ padding: "5px 9px", background: "#39FF1412", border: "1px solid #39FF1428", borderRadius: 6, fontSize: 11, color: "#39FF14", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    <Download size={10} /> Baixar
                  </button>
                  <button style={{ padding: "5px 8px", background: "transparent", border: "1px solid #1A1A30", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <Share2 size={11} color="#7878A0" />
                  </button>
                  <button style={{ padding: "5px 8px", background: "transparent", border: "1px solid #1A1A30", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <ExternalLink size={11} color="#7878A0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
