import Link from "next/link";
import {
  Building2, Layers, Palette, Tag, Users, ArrowRight,
  Zap, TrendingUp, BarChart2, Globe, Sparkles, Network,
  ChevronRight, DollarSign, Kanban, Inbox, CheckSquare, LayoutGrid,
} from "lucide-react";
import { HUB_METRICAS, MOCK_EMPREENDIMENTOS, MOCK_METRICAS_ADTECH } from "@/lib/mock-data";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function formatK(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
}
function formatBRL(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
}

/* ─── Stat card ─────────────────────────────────────────────────────────────── */
function StatCard({ label, value, sub, color, icon: Icon }: {
  label: string; value: string | number; sub?: string;
  color: string; icon: React.ComponentType<{ size?: number; color?: string }>;
}) {
  return (
    <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: "16px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: color, opacity: 0.6 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <p style={{ fontSize: 11, color: "#7878A0", fontWeight: 500 }}>{label}</p>
        <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={14} color={color} />
        </div>
      </div>
      <p style={{ fontSize: 26, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: color, marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

/* ─── Card de ator ──────────────────────────────────────────────────────────── */
type AtorConfig = {
  camada: string; titulo: string; subtitulo: string;
  cor: string; href: string; papel: string;
  capacidades: string[];
  consome: string; produz: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  metrica_label: string; metrica_valor: string | number;
};

function AtorCard({ ator }: { ator: AtorConfig }) {
  return (
    <div style={{ background: "#111120", border: `1px solid ${ator.cor}25`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Barra de cor */}
      <div style={{ height: 3, backgroundColor: ator.cor, opacity: 0.7 }} />

      <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Cabeçalho */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: ator.cor + "18", border: `1px solid ${ator.cor}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ator.icon size={18} color={ator.cor} />
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: ator.cor, letterSpacing: "0.08em", textTransform: "uppercase" }}>{ator.camada}</p>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{ator.titulo}</h3>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 18, fontWeight: 900, color: ator.cor, letterSpacing: "-0.04em" }}>{ator.metrica_valor}</p>
            <p style={{ fontSize: 10, color: "#3A3A5C" }}>{ator.metrica_label}</p>
          </div>
        </div>

        {/* Papel */}
        <p style={{ fontSize: 13, color: "#7878A0", lineHeight: 1.6 }}>{ator.papel}</p>

        {/* Consome / Produz */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { label: "Consome", valor: ator.consome, cor: "#3A3A5C" },
            { label: "Produz",  valor: ator.produz,  cor: ator.cor   },
          ].map((item) => (
            <div key={item.label} style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 10px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>{item.label}</p>
              <p style={{ fontSize: 11, color: item.cor, lineHeight: 1.4 }}>{item.valor}</p>
            </div>
          ))}
        </div>

        {/* Capacidades */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {ator.capacidades.map((cap) => (
            <span key={cap} style={{ fontSize: 10, color: ator.cor, backgroundColor: ator.cor + "10", border: `1px solid ${ator.cor}22`, padding: "2px 8px", borderRadius: 4 }}>
              {cap}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link href={ator.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid #1A1A30", textDecoration: "none", background: ator.cor + "06" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: ator.cor }}>Acessar painel</span>
        <ArrowRight size={14} color={ator.cor} />
      </Link>
    </div>
  );
}

/* ─── Seta de fluxo ─────────────────────────────────────────────────────────── */
function FluxoSeta({ cor = "#1A1A30" }: { cor?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, flexShrink: 0, padding: "0 4px" }}>
      <div style={{ width: 1, height: 20, backgroundColor: cor + "50" }} />
      <ChevronRight size={14} color={cor} />
      <div style={{ width: 1, height: 20, backgroundColor: cor + "50" }} />
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */
export default function HubPage() {
  const totalReceita = MOCK_METRICAS_ADTECH.reduce((s, m) => s + m.receita_brl, 0);
  const totalLeads   = MOCK_METRICAS_ADTECH.reduce((s, m) => s + m.leads, 0);

  const ATORES: AtorConfig[] = [
    {
      camada: "Camada 1 — A Origem",
      titulo: "Construtoras & Incorporadoras",
      subtitulo: "Donos dos empreendimentos",
      cor: "#FF0068",
      href: "/tagmob-os",
      icon: Building2,
      papel: "Contratam a inteligência estratégica da TAGMOB. Aprovam o ecossistema criativo e liberam o acesso para os demais atores da cadeia.",
      consome: "Estratégia, Manifesto, KV e identidade visual",
      produz: "Empreendimento aprovado e ecossistema liberado para a cadeia",
      capacidades: ["Aprovação de assets", "Gestão de empreendimentos", "Dashboard de campanha", "Controle de acesso"],
      metrica_label: "empreendimentos ativos",
      metrica_valor: HUB_METRICAS.empreendimentos_ativos,
    },
    {
      camada: "Camada 4 — Os Especificadores",
      titulo: "Arquitetos & Designers",
      subtitulo: "Especificadores técnicos e multiplicadores",
      cor: "#8B5CF6",
      href: "/arquiteto",
      icon: Palette,
      papel: "Absorvem o conceito criativo do empreendimento e montam projetos de ambientes decorados, especificando produtos reais das marcas parceiras integradas ao catálogo.",
      consome: "Conceito criativo, plantas, assets e catálogo de marcas",
      produz: "Projetos especificados com marcas — ativos turbinados para corretores",
      capacidades: ["Especificação técnica", "Product placement", "Editor de projetos", "Geração de leads para marcas"],
      metrica_label: "arquitetos ativos",
      metrica_valor: HUB_METRICAS.arquitetos_ativos,
    },
    {
      camada: "Camada 3 — O Motor de Receita",
      titulo: "Marcas & Indústria",
      subtitulo: "Product placement + AdTech",
      cor: "#FFB800",
      href: "/marcas",
      icon: Tag,
      papel: "Fabricantes de pisos, revestimentos, louças, mobiliário e automação. Exibem produtos no momento de maior intenção de compra: quando o arquiteto especifica e o corretor vende.",
      consome: "Dados de projetos e empreendimentos para segmentação",
      produz: "Leads qualificados, receita AdTech e product placement digital",
      capacidades: ["Catálogo técnico", "Exclusividade por bairro", "Rastreio de leads", "Métricas CPM/CPA"],
      metrica_label: "marcas ativas",
      metrica_valor: HUB_METRICAS.marcas_ativas,
    },
    {
      camada: "Camada 2 — O Núcleo de Venda",
      titulo: "Imobiliárias & Corretores",
      subtitulo: "Força de vendas da ponta",
      cor: "#00E5FF",
      href: "/corretor",
      icon: Users,
      papel: "Consomem os ativos finais turbinados — com design do arquiteto e produtos das marcas — e personalizam apenas seus dados de contato no editor restrito, sem quebrar a identidade visual.",
      consome: "Peças turbinadas com design + produtos especificados",
      produz: "Materiais personalizados com dados do corretor prontos para venda",
      capacidades: ["Editor de contato", "Exportação JPG/PDF", "Compartilhamento direto", "Portfolio de imóveis"],
      metrica_label: "corretores ativos",
      metrica_valor: HUB_METRICAS.corretores_ativos,
    },
  ];

  return (
    <div style={{ padding: "32px 32px 80px", maxWidth: 1200, margin: "0 auto" }}>

      {/* ── Cabeçalho ──────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg, #FF0068, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Network size={18} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.04em" }}>Hub do Ecossistema</h1>
            <p style={{ fontSize: 13, color: "#7878A0" }}>Rede viva da construção civil — 4 atores, 1 plataforma</p>
          </div>
        </div>
      </div>

      {/* ── Métricas do hub ─────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 36 }}>
        <StatCard label="Ativos em circulação" value={HUB_METRICAS.ativos_em_circulacao} color="#FF0068"  icon={Layers}     sub="+12 esta semana" />
        <StatCard label="Leads / mês"           value={totalLeads}                        color="#39FF14"  icon={Zap}        sub="↑ 34% vs mês ant." />
        <StatCard label="Receita AdTech / mês"  value={formatBRL(totalReceita)}           color="#FFB800"  icon={DollarSign} sub="CPM + afiliados" />
        <StatCard label="Specs de arquitetos"   value={HUB_METRICAS.specs_mes}            color="#8B5CF6"  icon={Sparkles}   sub="neste mês" />
        <StatCard label="Corretores ativos"     value={HUB_METRICAS.corretores_ativos}    color="#00E5FF"  icon={Users}      />
        <StatCard label="Empreendimentos"       value={HUB_METRICAS.empreendimentos_ativos} color="#FF0068" icon={Building2} />
      </div>

      {/* ── CRM — Acesso rápido ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", letterSpacing: "-0.02em" }}>CRM Comercial</h2>
          <Link href="/crm" style={{ fontSize: 13, color: "#FF0068", textDecoration: "none", fontWeight: 600 }}>
            Central CRM →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { label: "Pipeline Kanban", href: "/negocios",   icon: Kanban,       color: "#FF0068", desc: "Negócios por etapa OS" },
            { label: "Inbox de Leads",  href: "/leads",      icon: Inbox,        color: "#FFB800", desc: "Qualificar e converter" },
            { label: "Contatos",        href: "/contatos",   icon: Users,        color: "#39FF14", desc: "Stakeholders e decisores" },
            { label: "Atividades",      href: "/atividades", icon: CheckSquare,  color: "#8B5CF6", desc: "Tarefas e follow-ups" },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "#111120", border: `1px solid ${item.color}30`, borderRadius: 12, padding: 16, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: item.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <item.icon size={16} color={item.color} />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF" }}>{item.label}</p>
                </div>
                <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 8 }}>{item.desc}</p>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color, display: "flex", alignItems: "center", gap: 4 }}>
                  Acessar <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Fluxo do conteúdo ───────────────────────────────────────────────── */}
      <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 14, padding: "20px 24px", marginBottom: 36 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
          Efeito de Rede — Fluxo do Conteúdo
        </p>

        {/* Timeline horizontal do fluxo */}
        <div style={{ display: "flex", alignItems: "center", overflowX: "auto", gap: 0, paddingBottom: 4 }}>
          {[
            { label: "TAGMOB",         desc: "Estratégia + KV",           cor: "#FF006880", tag: "Origem" },
            { label: "Incorporadora",  desc: "Aprovação do ecossistema",  cor: "#FF0068",   tag: "Camada 1" },
            { label: "Arquiteto",      desc: "Especificação + Marcas",    cor: "#8B5CF6",   tag: "Camada 4" },
            { label: "Marca",          desc: "Product Placement + Lead",  cor: "#FFB800",   tag: "Camada 3" },
            { label: "Corretor",       desc: "Peça turbinada → Venda",    cor: "#00E5FF",   tag: "Camada 2" },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div style={{ textAlign: "center", width: 120 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: step.cor + "20", border: `1px solid ${step.cor}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", fontSize: 11, fontWeight: 800, color: step.cor }}>
                  {step.tag.includes("Camada") ? step.tag.split(" ")[1] : "★"}
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF", marginBottom: 2 }}>{step.label}</p>
                <p style={{ fontSize: 10, color: "#3A3A5C", lineHeight: 1.4 }}>{step.desc}</p>
              </div>
              {i < arr.length - 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "0 8px", flexShrink: 0 }}>
                  <div style={{ width: 24, height: 1, background: `linear-gradient(90deg, ${step.cor}40, ${arr[i+1].cor}40)` }} />
                  <ChevronRight size={12} color="#2E2E4A" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Descrição do efeito de rede */}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #1A1A30", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
          {[
            { emoji: "🧠", text: "A TAGMOB cria a inteligência — estratégia e identidade", cor: "#FF0068" },
            { emoji: "✅", text: "A Incorporadora aprova e libera a cadeia de acesso",       cor: "#FF0068" },
            { emoji: "🏛️", text: "O Arquiteto especifica com produtos reais das Marcas",      cor: "#8B5CF6" },
            { emoji: "📢", text: "As Marcas obtêm leads no momento de maior intenção",       cor: "#FFB800" },
            { emoji: "🏡", text: "O Corretor recebe a peça turbinada e fecha a venda",       cor: "#00E5FF" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{item.emoji}</span>
              <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Grid dos 4 atores ───────────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", marginBottom: 16, letterSpacing: "-0.02em" }}>
          Os 4 Atores do Ecossistema
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {ATORES.map((ator) => <AtorCard key={ator.titulo} ator={ator} />)}
        </div>
      </div>

      {/* ── Regras do hub ───────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
        {/* Controle de canal */}
        <div style={{ background: "#111120", border: "1px solid rgba(255,0,104,0.2)", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,0,104,0.12)", border: "1px solid rgba(255,0,104,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe size={14} color="#FF0068" />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>Controle de Canal</p>
              <p style={{ fontSize: 11, color: "#7878A0" }}>Exclusividade por bairro, padrão ou empreendimento</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { marca: "Portobello", regra: "Exclusiva nos Jardins + Itaim Bibi",    ativa: true  },
              { marca: "Deca",       regra: "Exclusiva em padrão Super Luxo",        ativa: true  },
              { marca: "Poliform",   regra: "Exclusiva no Reserva Jardins (emp-001)", ativa: true  },
              { marca: "Eliane",     regra: "Zona Sul SP — expirada",                ativa: false },
            ].map((r) => (
              <div key={r.marca} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 7, gap: 8 }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#EEEEFF" }}>{r.marca}</p>
                  <p style={{ fontSize: 10, color: "#3A3A5C" }}>{r.regra}</p>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: r.ativa ? "#39FF14" : "#3A3A5C", backgroundColor: r.ativa ? "#39FF1415" : "#111120", padding: "2px 7px", borderRadius: 3, whiteSpace: "nowrap" }}>
                  {r.ativa ? "ATIVA" : "EXPIRADA"}
                </span>
              </div>
            ))}
          </div>
          <Link href="/marcas" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#FF0068", textDecoration: "none", marginTop: 12, fontWeight: 600 }}>
            Gerenciar exclusividades <ArrowRight size={11} />
          </Link>
        </div>

        {/* Rastreabilidade de leads */}
        <div style={{ background: "#111120", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart2 size={14} color="#FFB800" />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>Rastreabilidade de Leads</p>
              <p style={{ fontSize: 11, color: "#7878A0" }}>CPM por exibição + comissão de afiliados</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {MOCK_METRICAS_ADTECH.slice(0, 4).map((m) => (
              <div key={m.marca_id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 7 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#EEEEFF", marginBottom: 2 }}>{m.marca_nome}</p>
                  <div style={{ height: 3, borderRadius: 2, background: "#1A1A30", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${m.ctr}%`, backgroundColor: "#FFB800", borderRadius: 2 }} />
                  </div>
                </div>
                <div style={{ textAlign: "right", marginLeft: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#FFB800" }}>{m.leads}</p>
                  <p style={{ fontSize: 9, color: "#3A3A5C" }}>leads</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/marcas" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#FFB800", textDecoration: "none", marginTop: 12, fontWeight: 600 }}>
            Ver relatório completo <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── Empreendimentos ativos ──────────────────────────────────────────── */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", letterSpacing: "-0.02em" }}>Empreendimentos no Ecossistema</h2>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/crm" style={{ fontSize: 13, color: "#FF0068", textDecoration: "none", fontWeight: 600 }}>
              CRM Central →
            </Link>
            <Link href="/negocios" style={{ fontSize: 13, color: "#00E5FF", textDecoration: "none", fontWeight: 600 }}>
              Pipeline Kanban →
            </Link>
            <Link href="/tagmob-os" style={{ fontSize: 13, color: "#FF0068", textDecoration: "none", fontWeight: 600 }}>
              Ver todos →
            </Link>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {MOCK_EMPREENDIMENTOS.map((emp) => (
            <Link key={emp.id} href={`/tagmob-os/${emp.id}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, backgroundColor: emp.cor_tema, opacity: 0.7 }} />
                <div style={{ paddingLeft: 6, flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.nome}</p>
                  <p style={{ fontSize: 11, color: "#7878A0" }}>{emp.construtora} · Fase {emp.fase_atual}/5</p>
                </div>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: emp.assinatura_ativa ? "#39FF14" : "#3A3A5C", backgroundColor: emp.assinatura_ativa ? "#39FF1415" : "transparent", padding: "1px 6px", borderRadius: 3 }}>
                    {emp.plano}
                  </span>
                  <span style={{ fontSize: 10, color: "#3A3A5C" }}>{emp.assets_aprovados} peças</span>
                </div>
                <ChevronRight size={14} color="#2E2E4A" style={{ flexShrink: 0 }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}