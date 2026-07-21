import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Building2, Palette, Tag, Users,
  Sparkles, Cpu, ShieldCheck, Unlock, Database, Zap,
  Lock, FileImage, FileText, Share2, MessageSquare,
  TrendingUp, Globe, BarChart2, ChevronRight,
} from "lucide-react";
import { HUB_METRICAS, MOCK_EMPREENDIMENTOS, MOCK_METRICAS_ADTECH } from "@/lib/mock-data";
import { OS_FASES } from "@/lib/types";
import { ModelComparison } from "@/components/billing/ModelComparison";

/* ─── helpers ────────────────────────────────────────────────────────────── */
function fmtBRL(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
}
function fmtK(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);
}

/* ─── Chip colorido ───────────────────────────────────────────────────────── */
function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, backgroundColor: color + "12", border: `1px solid ${color}25`, padding: "3px 9px", borderRadius: 5, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

/* ─── Bloco-seção com título ─────────────────────────────────────────────── */
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ title, sub, color = "#FF0068", cta, ctaHref }: { title: string; sub?: string; color?: string; cta?: string; ctaHref?: string }) {
  return (
    <div style={{ padding: "14px 20px", borderBottom: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, backgroundColor: color }} />
          <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{title}</p>
        </div>
        {sub && <p style={{ fontSize: 11, color: "#3A3A5C", marginTop: 2 }}>{sub}</p>}
      </div>
      {cta && ctaHref && (
        <Link href={ctaHref} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color, textDecoration: "none", fontWeight: 600, flexShrink: 0 }}>
          {cta} <ArrowRight size={11} />
        </Link>
      )}
    </div>
  );
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function ResumoPage() {
  const totalReceita = MOCK_METRICAS_ADTECH.reduce((s, m) => s + m.receita_brl, 0);
  const totalLeads   = MOCK_METRICAS_ADTECH.reduce((s, m) => s + m.leads, 0);

  return (
    <div style={{ padding: "28px 28px 80px", maxWidth: 1080, margin: "0 auto" }}>

      {/* ── Cabeçalho ───────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: "#FF0068" }} />
          <p style={{ fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.08em", textTransform: "uppercase" }}>Visão Geral</p>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 4 }}>
          Resumo TAGMOB OS
        </h1>
        <p style={{ fontSize: 14, color: "#7878A0" }}>
          O Sistema Operacional da Comunicação Imobiliária — todos os conceitos, atores e funcionalidades em uma única visão.
        </p>
      </div>

      {/* ── KPIs do ecossistema ──────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Empreendimentos",   value: HUB_METRICAS.empreendimentos_ativos, color: "#FF0068",  sub: "no ecossistema"   },
          { label: "Ativos circulando", value: HUB_METRICAS.ativos_em_circulacao,   color: "#39FF14",  sub: "+12 esta semana"  },
          { label: "Leads / mês",       value: totalLeads,                           color: "#FFB800",  sub: "via AdTech"       },
          { label: "Receita AdTech",    value: fmtBRL(totalReceita),                 color: "#00E5FF",  sub: "CPM + afiliados"  },
        ].map((s) => (
          <div key={s.label} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: "14px 18px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: s.color, opacity: 0.6 }} />
            <p style={{ fontSize: 10, color: "#7878A0", marginBottom: 6 }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 10, color: s.color, marginTop: 4 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── GRID PRINCIPAL ──────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* ── 1. O que é o TAGMOB OS ──────────────────────────────────────── */}
        <Card style={{ gridColumn: "1 / -1" }}>
          <CardHeader title="O que é o TAGMOB OS?" sub="Conceito central da plataforma" color="#FF0068" />
          <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              {
                icon: Cpu, cor: "#FF0068",
                titulo: "Sistema Operacional",
                desc: "Um ambiente dedicado por empreendimento. Cada campanha tem sua própria inteligência, design system e biblioteca de peças aprovadas — tudo organizado em 5 etapas sequenciais.",
                ex: "Ex: A campanha do 'Reserva Jardins' fica em um ambiente isolado com manifesto, KV, paleta e templates exclusivos.",
              },
              {
                icon: Sparkles, cor: "#8B5CF6",
                titulo: "IA Contextual (RAG)",
                desc: "Diferente de IAs genéricas, a engine do TAGMOB só usa o contexto daquele empreendimento — manifesto, tom de voz e imagens aprovadas — para gerar conteúdo sempre correto.",
                ex: 'Ex: "Crie um post para investidores" → IA extrai o manifesto, aplica o tom de voz e monta o layout com o Key Visual aprovado.',
              },
              {
                icon: Unlock, cor: "#39FF14",
                titulo: "Autonomia Controlada",
                desc: "O cliente edita com liberdade dentro das regras da agência. Grid, fontes e paleta são bloqueados pela TAGMOB. Textos variáveis, imagens aprovadas e exportações são liberados.",
                ex: 'Ex: Cliente atualiza o preço de R$2,4M → todas as 24 peças vinculadas à campanha são atualizadas automaticamente.',
              },
            ].map((p) => (
              <div key={p.titulo} style={{ background: "#0D0D1A", border: `1px solid ${p.cor}18`, borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: p.cor + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <p.icon size={16} color={p.cor} />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{p.titulo}</p>
                </div>
                <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.65 }}>{p.desc}</p>
                <div style={{ padding: "8px 10px", background: p.cor + "06", border: `1px solid ${p.cor}18`, borderRadius: 7, marginTop: "auto" }}>
                  <p style={{ fontSize: 11, color: p.cor + "B0", lineHeight: 1.55, fontStyle: "italic" }}>{p.ex}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── 2. Os 4 atores ────────────────────────────────────────────────── */}
        <Card>
          <CardHeader title="Os 4 Atores do Ecossistema" sub="Quem usa e como cada um interage" color="#FFB800" cta="Ver Hub" ctaHref="/hub" />
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { camada: "C1", label: "Construtoras",   cor: "#FF0068", desc: "Contratam a TAGMOB, aprovam o ecossistema e liberam a cadeia",      href: "/tagmob-os" },
              { camada: "C4", label: "Profissionais",  cor: "#8B5CF6", desc: "Absorvem o conceito e especificam marcas reais nos projetos",        href: "/arquiteto" },
              { camada: "C3", label: "Marcas",         cor: "#FFB800", desc: "Aparecem no catálogo no momento de especificação — leads quentes",   href: "/marcas"    },
              { camada: "C2", label: "Corretores",     cor: "#00E5FF", desc: "Recebem peças turbinadas, personalizam contato e vendem na ponta",  href: "/corretor"  },
            ].map((a, i, arr) => (
              <div key={a.label}>
                <Link href={a.href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 4px", textDecoration: "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: a.cor + "18", border: `1px solid ${a.cor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: a.cor, flexShrink: 0 }}>
                    {a.camada}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 2 }}>{a.label}</p>
                    <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.4 }}>{a.desc}</p>
                  </div>
                  <ChevronRight size={13} color="#2E2E4A" style={{ flexShrink: 0 }} />
                </Link>
                {i < arr.length - 1 && <div style={{ height: 1, backgroundColor: "#1A1A30", margin: "0 4px" }} />}
              </div>
            ))}
          </div>
          {/* Diagrama de fluxo mini */}
          <div style={{ padding: "10px 16px 14px", borderTop: "1px solid #1A1A30" }}>
            <p style={{ fontSize: 10, color: "#3A3A5C", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Fluxo do Ativo</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto" }}>
              {[
                { l: "TAGMOB", c: "#FF006880" },
                { l: "Construtora", c: "#FF0068" },
                { l: "Criação", c: "#8B5CF6" },
                { l: "Marca", c: "#FFB800" },
                { l: "Corretor", c: "#00E5FF" },
              ].map((s, i, a) => (
                <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <div style={{ padding: "3px 8px", background: s.c + "18", border: `1px solid ${s.c}35`, borderRadius: 5 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: s.c, whiteSpace: "nowrap" }}>{s.l}</p>
                  </div>
                  {i < a.length - 1 && <ChevronRight size={11} color="#2E2E4A" />}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── 3. As 5 Etapas ────────────────────────────────────────────────── */}
        <Card>
          <CardHeader title="As 5 Etapas do TAGMOB OS" sub="Workflow sequencial por empreendimento" color="#39FF14" cta="Ver OS" ctaHref="/tagmob-os" />
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {OS_FASES.map((fase) => (
              <div key={fase.num} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 8px", borderRadius: 8, background: "#0D0D1A", border: "1px solid #1A1A30" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: fase.cor + "18", border: `1px solid ${fase.cor}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: fase.cor, flexShrink: 0 }}>
                  {String(fase.num).padStart(2, "0")}
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF", marginBottom: 2 }}>{fase.label}</p>
                  <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.4 }}>{fase.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── 4. Funcionalidades com exemplos ──────────────────────────────── */}
        <Card style={{ gridColumn: "1 / -1" }}>
          <CardHeader title="Funcionalidades com Exemplos Reais" sub="O que cada ator pode fazer na prática" color="#8B5CF6" />
          <div style={{ padding: "18px 20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>

            {/* Gatekeeper */}
            <div style={{ background: "#0D0D1A", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <ShieldCheck size={14} color="#FFB800" />
                <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>Gatekeeper de Aprovação</p>
              </div>
              <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 10, lineHeight: 1.6 }}>
                Nenhuma peça chega ao cliente sem aprovação digital da TAGMOB <em>e</em> do cliente. Dois estágios obrigatórios com log de auditoria.
              </p>
              <div style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.18)", borderRadius: 7, padding: "8px 10px", marginBottom: 10 }}>
                <p style={{ fontSize: 11, color: "#FFB800", lineHeight: 1.6, fontStyle: "italic" }}>
                  "Post de lançamento" → Agência revisa → ✓ TAGMOB aprova → ✓ Tegra assina → entra na biblioteca
                </p>
              </div>
              <Link href="/tagmob-os/emp-001/aprovacao" style={{ fontSize: 11, color: "#FFB800", textDecoration: "none", fontWeight: 700 }}>
                Ver Gatekeeper ao vivo →
              </Link>
            </div>

            {/* Editor restrito */}
            <div style={{ background: "#0D0D1A", border: "1px solid rgba(57,255,20,0.2)", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Unlock size={14} color="#39FF14" />
                <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>Editor do Cliente</p>
              </div>
              <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 10, lineHeight: 1.6 }}>
                Canvas restrito onde o cliente edita somente o que a agência liberou. Grid, tipografia e cores nunca são tocados.
              </p>
              <div style={{ background: "rgba(57,255,20,0.04)", border: "1px solid rgba(57,255,20,0.15)", borderRadius: 7, padding: "8px 10px", marginBottom: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    { item: "Preço (R$ 2.400.000)", ok: true  },
                    { item: "CTA ('Agende sua visita')", ok: true  },
                    { item: "Grid e tipografia",  ok: false },
                    { item: "Paleta de cores",    ok: false },
                  ].map((r) => (
                    <div key={r.item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: r.ok ? "#39FF1420" : "#FF006820", border: `1px solid ${r.ok ? "#39FF1440" : "#FF006840"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: r.ok ? "#39FF14" : "#FF0068", flexShrink: 0 }}>
                        {r.ok ? "✓" : "✕"}
                      </div>
                      <p style={{ fontSize: 10, color: r.ok ? "#EEEEFF" : "#3A3A5C" }}>{r.item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/tagmob-os/emp-004/autonomia" style={{ fontSize: 11, color: "#39FF14", textDecoration: "none", fontWeight: 700 }}>
                Abrir Editor ao vivo →
              </Link>
            </div>

            {/* Especificação do arquiteto */}
            <div style={{ background: "#0D0D1A", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Palette size={14} color="#8B5CF6" />
                <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>Especificação Técnica</p>
              </div>
              <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 10, lineHeight: 1.6 }}>
                Profissionais de criação especificam produtos reais do catálogo integrado de marcas. A cada especificação, a marca recebe um lead qualificado.
              </p>
              <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.18)", borderRadius: 7, padding: "8px 10px", marginBottom: 10 }}>
                <p style={{ fontSize: 11, color: "#8B5CF6", lineHeight: 1.6, fontStyle: "italic" }}>
                  Carolina especifica "Portobello Travertino 90×90cm" na Sala de Estar → Portobello recebe lead com o projeto, empreendimento e metragem
                </p>
              </div>
              <Link href="/arquiteto" style={{ fontSize: 11, color: "#8B5CF6", textDecoration: "none", fontWeight: 700 }}>
                Portal de Criação →
              </Link>
            </div>

            {/* AdTech */}
            <div style={{ background: "#0D0D1A", border: "1px solid rgba(255,184,0,0.15)", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <BarChart2 size={14} color="#FFB800" />
                <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>Motor AdTech</p>
              </div>
              <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 10, lineHeight: 1.6 }}>
                Marcas pagam CPM por exibição no catálogo e CPA por lead gerado. O sistema controla exclusividade por bairro, padrão ou empreendimento.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 10 }}>
                {[
                  { l: "Impressões", v: fmtK(MOCK_METRICAS_ADTECH.reduce((s,m)=>s+m.impressoes,0)), c: "#00E5FF" },
                  { l: "Leads",      v: String(totalLeads),   c: "#39FF14"  },
                  { l: "Receita",    v: fmtBRL(totalReceita), c: "#FFB800"  },
                ].map((m) => (
                  <div key={m.l} style={{ textAlign: "center", padding: "6px 4px", background: "#111120", border: "1px solid #1A1A30", borderRadius: 6 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: m.c }}>{m.v}</p>
                    <p style={{ fontSize: 9, color: "#3A3A5C" }}>{m.l}</p>
                  </div>
                ))}
              </div>
              <Link href="/marcas" style={{ fontSize: 11, color: "#FFB800", textDecoration: "none", fontWeight: 700 }}>
                Painel AdTech →
              </Link>
            </div>

            {/* Exportação instantânea */}
            <div style={{ background: "#0D0D1A", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Zap size={14} color="#00E5FF" />
                <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>Exportação Instantânea</p>
              </div>
              <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 10, lineHeight: 1.6 }}>
                Qualquer ator exporta peças prontas em segundos, no formato certo para cada canal, sem precisar de ferramenta externa.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 10 }}>
                {[
                  { icon: FileImage, label: "JPG para redes sociais",          color: "#00E5FF" },
                  { icon: FileText,  label: "PDF fechado com sangria p/ gráfica", color: "#8B5CF6" },
                  { icon: Share2,    label: "Link direto para corretores",       color: "#39FF14" },
                ].map((e) => (
                  <div key={e.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: "#111120", border: "1px solid #1A1A30", borderRadius: 6 }}>
                    <e.icon size={11} color={e.color} />
                    <p style={{ fontSize: 11, color: "#7878A0" }}>{e.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/tagmob-os/emp-004/autonomia" style={{ fontSize: 11, color: "#00E5FF", textDecoration: "none", fontWeight: 700 }}>
                Ver no Editor →
              </Link>
            </div>

            {/* Organização automática */}
            <div style={{ background: "#0D0D1A", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Database size={14} color="#00E5FF" />
                <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>Organização Automática</p>
              </div>
              <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 10, lineHeight: 1.6 }}>
                Peças aprovadas são indexadas e interconectadas automaticamente. Uma alteração em um dado (preço, metragem) se propaga por todas as peças da campanha.
              </p>
              <div style={{ background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 7, padding: "8px 10px", marginBottom: 10 }}>
                <p style={{ fontSize: 11, color: "#00E5FF80", lineHeight: 1.6, fontStyle: "italic" }}>
                  Preço alterado de R$2,4M → R$2,6M → 24 peças atualizadas automaticamente em 3 segundos
                </p>
              </div>
              <Link href="/tagmob-os/emp-001" style={{ fontSize: 11, color: "#00E5FF", textDecoration: "none", fontWeight: 700 }}>
                Ver Organização →
              </Link>
            </div>

          </div>
        </Card>

        {/* ── 5. Empreendimentos ativos ──────────────────────────────────────── */}
        <Card>
          <CardHeader title="Empreendimentos no OS" sub="Estado atual do ecossistema" color="#FF0068" cta="Ver todos" ctaHref="/tagmob-os" />
          <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
            {MOCK_EMPREENDIMENTOS.map((emp) => {
              const fase = OS_FASES.find((f) => f.num === emp.fase_atual)!;
              const pct  = emp.total_assets > 0 ? Math.round((emp.assets_aprovados / emp.total_assets) * 100) : 0;
              return (
                <Link key={emp.id} href={`/tagmob-os/${emp.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 8 }}>
                  <div style={{ width: 8, height: 36, borderRadius: 3, backgroundColor: emp.cor_tema, opacity: 0.8, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.nome}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: "#1A1A30", overflow: "hidden", maxWidth: 100 }}>
                        <div style={{ height: "100%", width: `${emp.total_assets > 0 ? pct : 20}%`, backgroundColor: fase.cor, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 10, color: "#3A3A5C" }}>{emp.total_assets > 0 ? `${pct}%` : "Em andamento"}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: fase.cor }}>{String(fase.num).padStart(2, "0")}. {fase.label}</p>
                    <p style={{ fontSize: 10, color: "#3A3A5C" }}>{emp.plano}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* ── 6. Modelo de negócio ──────────────────────────────────────────── */}
        <Card>
          <CardHeader title="Modelo de Negócio" sub="Como o TAGMOB gera receita" color="#FFB800" />
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                tipo: "Projeto Estratégico",
                modelo: "Entrega única",
                desc: "Naming, Manifesto, KV e identidade visual completa da campanha",
                cor: "#FF0068",
              },
              {
                tipo: "TAGMOB OS Starter",
                modelo: "SaaS mensal",
                desc: "Editor restrito + biblioteca para 1 empreendimento",
                cor: "#7878A0",
              },
              {
                tipo: "TAGMOB OS Pro",
                modelo: "SaaS mensal",
                desc: "Até 3 empreendimentos + IA Contextual + Portal de Criação",
                cor: "#8B5CF6",
              },
              {
                tipo: "TAGMOB OS Enterprise",
                modelo: "SaaS mensal",
                desc: "Ilimitado + AdTech + API + equipes e gestão multiusuário",
                cor: "#FFB800",
              },
              {
                tipo: "AdTech (Marcas)",
                modelo: "CPM + CPA",
                desc: "Marcas pagam por exibição e por lead qualificado gerado no catálogo",
                cor: "#39FF14",
              },
            ].map((r) => (
              <div key={r.tipo} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 10px", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF", marginBottom: 1 }}>{r.tipo}</p>
                  <p style={{ fontSize: 11, color: "#7878A0" }}>{r.desc}</p>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: r.cor, backgroundColor: r.cor + "15", border: `1px solid ${r.cor}28`, padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap", flexShrink: 0 }}>
                  {r.modelo}
                </span>
              </div>
            ))}
            <div style={{ padding: "9px 12px", background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)", borderRadius: 8, marginTop: 2 }}>
              <p style={{ fontSize: 11, color: "#FFB800", lineHeight: 1.6 }}>
                <strong>Sem fidelidade longa.</strong> A liberdade permanece com o cliente. O relacionamento permanece com a TAGMOB.
              </p>
            </div>
            
            <div style={{ marginTop: 12 }}>
              <ModelComparison />
            </div>
          </div>
        </Card>

        {/* ── 7. Ações rápidas ──────────────────────────────────────────────── */}
        <Card style={{ gridColumn: "1 / -1" }}>
          <CardHeader title="Acesso Rápido" sub="Entre direto na funcionalidade que precisa" color="#00E5FF" />
          <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
            {[
              { label: "Novo Empreendimento",    sub: "Iniciar workflow de 5 etapas", cor: "#FF0068",  href: "/tagmob-os",                icon: Building2    },
              { label: "Gatekeeper",             sub: "Aprovar peças pendentes",      cor: "#FFB800",  href: "/tagmob-os/emp-001/aprovacao", icon: ShieldCheck },
              { label: "Editor do Cliente",      sub: "Abrir autonomia controlada",   cor: "#39FF14",  href: "/tagmob-os/emp-004/autonomia", icon: Unlock      },
              { label: "Especificar Produto",    sub: "Portal de criação",            cor: "#8B5CF6",  href: "/arquiteto",                   icon: Palette     },
              { label: "Catálogo de Marcas",     sub: "AdTech e product placement",  cor: "#FFB800",  href: "/marcas",                      icon: Tag         },
              { label: "Portfolio Corretor",     sub: "Imóveis e encaixe perfeito",  cor: "#00E5FF",  href: "/corretor",                    icon: Sparkles    },
            ].map((a) => (
              <Link key={a.label} href={a.href} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", background: "#0D0D1A", border: `1px solid ${a.cor}18`, borderRadius: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: a.cor + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <a.icon size={16} color={a.cor} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF", marginBottom: 1 }}>{a.label}</p>
                  <p style={{ fontSize: 10, color: "#3A3A5C" }}>{a.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* ── 8. Tese de Expansão ───────────────────────────────────────────── */}
        <Card style={{ gridColumn: "1 / -1" }}>
          <CardHeader title="Tese de Expansão — Modelo em Camadas" sub="Como o TAGMOB cresce sem abandonar o que já funciona" color="#FF0068" cta="Ver na landing" ctaHref="/#expansão" />
          <div style={{ padding: "16px 20px" }}>
            {/* Camadas empilhadas */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {[
                { num: "C1", titulo: "Construção Civil & Infraestrutura", rotulo: "Origem", cor: "#FF0068", w: "100%",
                  receita: "Contratos B2B · Parcerias por obra · GTM próprio" },
                { num: "C2", titulo: "Corretores & Imobiliárias",         rotulo: "Núcleo",  cor: "#8B5CF6", w: "82%",
                  receita: "Assinatura recorrente · Imóvel turbinado avulso · Premium" },
                { num: "C3", titulo: "Marcas do Segmento",                rotulo: "Motor $", cor: "#FFB800", w: "65%",
                  receita: "Placement por categoria · Exclusividade · CPA de afiliado" },
                { num: "C4", titulo: "Arquitetos",                        rotulo: "Multiplicador", cor: "#39FF14", w: "48%",
                  receita: "Leads qualificados · Patrocínio de marcas · Plano Pro" },
              ].map((c) => (
                <div key={c.num} style={{ width: c.w, background: "#0D0D1A", border: `1px solid ${c.cor}20`, borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ height: 2, backgroundColor: c.cor, opacity: 0.6 }} />
                  <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: c.cor + "18", border: `1px solid ${c.cor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: c.cor, flexShrink: 0 }}>
                      {c.num}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 1 }}>{c.titulo}</p>
                      <p style={{ fontSize: 11, color: "#7878A0" }}>{c.receita}</p>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: c.cor, backgroundColor: c.cor + "12", border: `1px solid ${c.cor}25`, padding: "2px 8px", borderRadius: 4, flexShrink: 0 }}>
                      {c.rotulo}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Roadmap 3 fases */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { n: "01", titulo: "Consolidar", sub: "Corretores + Marcas", cor: "#FF0068", status: "Ativo agora" },
                { n: "02", titulo: "Multiplicar", sub: "Arquitetos como canal", cor: "#8B5CF6", status: "Próxima fase" },
                { n: "03", titulo: "Expandir",    sub: "Construção Civil & Infra", cor: "#39FF14", status: "Visão de futuro" },
              ].map((r) => (
                <div key={r.n} style={{ padding: "12px 14px", background: r.cor + "06", border: `1px solid ${r.cor}18`, borderRadius: 9, display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: r.cor + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: r.cor, flexShrink: 0 }}>
                    {r.n}
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>{r.titulo}</p>
                    <p style={{ fontSize: 11, color: r.cor }}>{r.sub}</p>
                    <p style={{ fontSize: 10, color: "#3A3A5C" }}>{r.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
