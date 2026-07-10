import Link from "next/link";
import {
  ArrowRight, Building2, Palette, Tag, Users, Cpu,
  ShieldCheck, Unlock, Sparkles, BarChart2, Zap,
  CheckCircle2, ChevronRight, FileImage, Share2,
  Lock, Network, Globe,
} from "lucide-react";
import { NavAuthArea, CtaFinalButton } from "@/components/auth/auth-buttons";

/* ─── Bloco decorativo ────────────────────────────────────────────────────── */
function Bloco({ color, w, h, top, left, right, bottom, rotate, opacity = 0.08 }: {
  color: string; w: number; h: number; top?: string; left?: string; right?: string;
  bottom?: string; rotate?: number; opacity?: number;
}) {
  return (
    <div aria-hidden style={{
      position: "absolute", width: w, height: h, backgroundColor: color,
      top, left, right, bottom, borderRadius: 4, pointerEvents: "none",
      transform: rotate ? `rotate(${rotate}deg)` : undefined, opacity,
    }} />
  );
}

/* ─── Nav ─────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #111120", backgroundColor: "rgba(9,9,15,0.94)", backdropFilter: "blur(20px)", padding: "0 32px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", height: 62, gap: 24 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
          <div style={{ width: 30, height: 30, backgroundColor: "#FF0068", borderRadius: 7, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: 5 }}>
            {[0,1,2,3].map((i) => (
              <div key={i} style={{ backgroundColor: i === 3 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.92)", borderRadius: 1 }} />
            ))}
          </div>
          <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: "-0.05em", color: "#EEEEFF" }}>TAGMOB</span>
        </div>
        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[["#funcionalidades", "Funcionalidades"], ["#atores", "Parceiros"], ["#como-funciona", "Como funciona"]].map(([h, l]) => (
            <Link key={l} href={h} style={{ color: "#7878A0", fontSize: 13, textDecoration: "none", fontWeight: 500 }}>{l}</Link>
          ))}
        </div>
        <NavAuthArea />
      </div>
    </nav>
  );
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#09090F", color: "#EEEEFF", fontFamily: "var(--font-inter, sans-serif)", overflowX: "hidden" }}>
      <Nav />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 60px", overflow: "hidden" }}>
        <Bloco color="#FF0068" w={80}  h={80}  top="8%"    left="3%"   rotate={14} />
        <Bloco color="#00E5FF" w={48}  h={48}  top="20%"   left="7%"   rotate={-9} />
        <Bloco color="#39FF14" w={36}  h={100} top="45%"   left="1%"   opacity={0.06} />
        <Bloco color="#8B5CF6" w={56}  h={56}  bottom="18%" left="5%" rotate={22} />
        <Bloco color="#FF0068" w={68}  h={68}  top="10%"   right="3%"  rotate={-17} />
        <Bloco color="#FFB800" w={40}  h={40}  top="28%"   right="7%"  rotate={11} />
        <Bloco color="#00E5FF" w={90}  h={32}  top="58%"   right="2%"  opacity={0.06} />
        <Bloco color="#39FF14" w={52}  h={52}  bottom="20%" right="4%" rotate={-14} />
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #1A1A3018 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 700, background: "radial-gradient(ellipse at center, rgba(255,0,104,0.08) 0%, transparent 68%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 820, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(52px, 9vw, 108px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.05em", marginBottom: 32 }}>
            <span style={{ display: "block", color: "#EEEEFF" }}>PENSAR.</span>
            <span style={{ display: "block", background: "linear-gradient(90deg, #FF0068, #FF5494)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CRIAR.</span>
            <span style={{ display: "block", color: "#EEEEFF" }}>CONSTRUIR.</span>
            <span style={{ display: "block", background: "linear-gradient(90deg, #00E5FF, #39FF14)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CONECTAR.</span>
          </h1>

          <p style={{ fontSize: "clamp(16px, 2.2vw, 20px)", color: "#7878A0", maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.65 }}>
            O sistema operacional da comunicação imobiliária. Da estratégia de campanha à exportação de peças — tudo em um único ambiente para construtoras, arquitetos, marcas e corretores.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/resumo" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 28px", backgroundColor: "#FF0068", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Ver a plataforma <ArrowRight size={16} />
            </Link>
            <Link href="#funcionalidades" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 12, border: "1px solid #1A1A30", color: "#7878A0", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Como funciona <ChevronRight size={15} />
            </Link>
          </div>

          {/* Mini stats */}
          <div style={{ marginTop: 56, display: "flex", gap: 36, justifyContent: "center", opacity: 0.65 }}>
            {[
              { v: "5",    l: "etapas de workflow", c: "#FF0068" },
              { v: "4",    l: "perfis integrados",  c: "#39FF14" },
              { v: "RAG",  l: "IA contextual",      c: "#00E5FF" },
              { v: "0",    l: "dependência da agência", c: "#8B5CF6" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 22, fontWeight: 900, color: s.c, letterSpacing: "-0.05em", lineHeight: 1 }}>{s.v}</p>
                <p style={{ fontSize: 10, color: "#3A3A5C", marginTop: 3, letterSpacing: "0.03em" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FUNCIONALIDADES LIVE ══════════════════════════════════════════════ */}
      <section id="funcionalidades" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#0D0D1A" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <div style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: "#FF0068" }} />
              <p style={{ fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.1em", textTransform: "uppercase" }}>O que você faz na plataforma</p>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 14 }}>
              6 funções centrais.<br />
              <span style={{ color: "#FF0068" }}>Tudo conectado em um ecossistema.</span>
            </h2>
            <p style={{ fontSize: 16, color: "#7878A0", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
              Cada função tem tela ao vivo. Acesse, explore e veja como seria no seu empreendimento.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              {
                icon: Cpu, cor: "#FF0068",
                titulo: "Workspace do Empreendimento",
                desc: "Ambiente exclusivo por campanha com estratégia, design system, aprovação e organização em 5 etapas sequenciais. Tudo rastreável.",
                items: ["Manifesto e naming da campanha", "Key Visual e paleta aprovados", "Templates dinâmicos vinculados", "Progressão de fase bloqueada"],
                link: "/tagmob-os/emp-001", cta: "Abrir workspace →",
              },
              {
                icon: ShieldCheck, cor: "#FFB800",
                titulo: "Gatekeeper de Aprovação",
                desc: "Nenhuma peça chega ao cliente sem dupla aprovação digital: primeiro a agência, depois o cliente. Log de auditoria completo.",
                items: ["Fila de ativos por status", "Preview + edição contextual", "Timeline de aprovação", "Auditoria com histórico completo"],
                link: "/tagmob-os/emp-001/aprovacao", cta: "Ver gatekeeper →",
              },
              {
                icon: Unlock, cor: "#39FF14",
                titulo: "Editor Autônomo do Cliente",
                desc: "Canvas restrito onde o cliente edita com liberdade o que foi liberado pela agência. Grid, tipografia e paleta são sempre protegidos.",
                items: ["Campos editáveis vs bloqueados", "Preview ao vivo das alterações", "Exportação JPG / PDF / Link", "IA contextual para sugestões"],
                link: "/tagmob-os/emp-004/autonomia", cta: "Abrir editor →",
              },
              {
                icon: Sparkles, cor: "#8B5CF6",
                titulo: "IA Contextual por Campanha",
                desc: "Engine RAG treinada com o manifesto, tom de voz e imagens aprovadas do empreendimento. Nunca gera conteúdo genérico.",
                items: ["Contexto isolado por empreendimento", "Copy alinhado ao posicionamento", "Sugestões de layout aprovadas", "Revisão antes de exportar"],
                link: "/tagmob-os/emp-001", cta: "Testar IA →",
              },
              {
                icon: Tag, cor: "#FFB800",
                titulo: "AdTech & Product Placement",
                desc: "Marcas aparecem no catálogo do arquiteto no momento de maior intenção. CPM por exibição, CPA por lead gerado.",
                items: ["Catálogo por categoria de produto", "Exclusividade por bairro/padrão", "Métricas de impressão e CTR", "Relatório de leads qualificados"],
                link: "/marcas", cta: "Painel de marcas →",
              },
              {
                icon: Palette, cor: "#00E5FF",
                titulo: "Portal do Arquiteto",
                desc: "Arquitetos especificam produtos reais do catálogo integrado. A marca recebe lead qualificado com projeto e empreendimento.",
                items: ["Catálogo com produtos reais", "Especificação técnica por ambiente", "Lead enviado à marca automaticamente", "Comissão sobre especificação"],
                link: "/arquiteto", cta: "Portal do arquiteto →",
              },
            ].map((f) => (
              <div key={f.titulo} style={{ background: "#111120", border: `1px solid ${f.cor}18`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 3, backgroundColor: f.cor, opacity: 0.55 }} />
                <div style={{ padding: "22px 22px 0", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: f.cor + "18", border: `1px solid ${f.cor}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <f.icon size={18} color={f.cor} />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.02em", lineHeight: 1.25 }}>{f.titulo}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: "#7878A0", lineHeight: 1.65 }}>{f.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {f.items.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                        <CheckCircle2 size={11} color={f.cor} style={{ flexShrink: 0, marginTop: 2 }} />
                        <p style={{ fontSize: 12, color: "#7878A0" }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #1A1A30", marginTop: 14 }}>
                  <Link href={f.link} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: f.cor, textDecoration: "none", fontWeight: 700 }}>
                    {f.cta} <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMO FUNCIONA — 5 ETAPAS ══════════════════════════════════════════ */}
      <section id="como-funciona" style={{ padding: "88px 24px", borderTop: "1px solid #111120" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
              <div style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: "#39FF14" }} />
              <p style={{ fontSize: 11, fontWeight: 800, color: "#39FF14", letterSpacing: "0.1em", textTransform: "uppercase" }}>Como funciona</p>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#EEEEFF", marginBottom: 18 }}>
              5 etapas.<br />
              <span style={{ color: "#39FF14" }}>Do briefing à venda.</span>
            </h2>
            <p style={{ fontSize: 15, color: "#7878A0", lineHeight: 1.75, marginBottom: 32 }}>
              O workflow é sequencial e controlado. Nenhuma etapa avança sem a anterior ser concluída. Nenhum material chega ao cliente sem aprovação digital.
            </p>
            <Link href="/tagmob-os" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", backgroundColor: "#39FF14", color: "#000", borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Ver TAGMOB OS ao vivo <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", titulo: "Estratégia",   cor: "#FF0068", agente: "TAGMOB",            desc: "Pesquisa, Naming, Conceito Criativo e Manifesto como contexto da IA" },
              { n: "02", titulo: "Criação",       cor: "#8B5CF6", agente: "TAGMOB",            desc: "Key Visual, vídeos, fontes, paletas e templates dinâmicos da campanha" },
              { n: "03", titulo: "Aprovação",     cor: "#FFB800", agente: "Agência → Cliente", desc: "Gatekeeper com assinatura digital obrigatória nos dois níveis" },
              { n: "04", titulo: "Organização",   cor: "#00E5FF", agente: "Automático",         desc: "Engine de indexação — alterar um dado propaga por toda a campanha" },
              { n: "05", titulo: "Autonomia",     cor: "#39FF14", agente: "Cliente",            desc: "Editor restrito + IA contextual + exportação instantânea sem agência" },
            ].map((e, idx, arr) => (
              <div key={e.n} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: e.cor + "18", border: `1px solid ${e.cor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: e.cor, zIndex: 1, flexShrink: 0 }}>
                    {e.n}
                  </div>
                  {idx < arr.length - 1 && <div style={{ width: 1, flex: 1, backgroundColor: e.cor + "18", minHeight: 16 }} />}
                </div>
                <div style={{ paddingLeft: 14, paddingBottom: idx < arr.length - 1 ? 20 : 0, paddingTop: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.02em" }}>{e.titulo}</p>
                    <span style={{ fontSize: 10, fontWeight: 700, color: e.cor, backgroundColor: e.cor + "15", padding: "1px 7px", borderRadius: 4 }}>{e.agente}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.55 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OS 4 ATORES ══════════════════════════════════════════════════════ */}
      <section id="atores" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#0D0D1A" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <div style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: "#FFB800" }} />
              <p style={{ fontSize: 11, fontWeight: 800, color: "#FFB800", letterSpacing: "0.1em", textTransform: "uppercase" }}>Os 4 atores do ecossistema</p>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 14 }}>
              Qual é o seu papel no ecossistema?
            </h2>
            <p style={{ fontSize: 16, color: "#7878A0", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
              Cada perfil tem seu próprio acesso, funcionalidades e forma de gerar valor dentro da plataforma.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
            {[
              {
                camada: "C1", titulo: "Construtoras",    cor: "#FF0068", icon: Building2, href: "/tagmob-os",
                desc: "Ambiente exclusivo por empreendimento. Aprovam o ecossistema e liberam a cadeia.",
                recursos: ["Workspace completo por campanha", "Aprovação digital de todos os ativos", "Visão completa do pipeline"],
              },
              {
                camada: "C4", titulo: "Arquitetos",      cor: "#8B5CF6", icon: Palette,   href: "/arquiteto",
                desc: "Especificam produtos reais no catálogo. Cada especificação gera um lead qualificado para a marca.",
                recursos: ["Catálogo técnico de marcas", "Especificação por ambiente", "Comissão sobre leads gerados"],
              },
              {
                camada: "C3", titulo: "Marcas",          cor: "#FFB800", icon: Tag,       href: "/marcas",
                desc: "Aparecem no momento de maior intenção — a especificação do arquiteto. CPM + CPA.",
                recursos: ["Product placement no catálogo", "Exclusividade por região/padrão", "Relatório de leads e conversão"],
              },
              {
                camada: "C2", titulo: "Corretores",      cor: "#00E5FF", icon: Users,     href: "/corretor",
                desc: "Recebem peças turbinadas prontas, personalizam com seus dados e vendem com mais qualidade.",
                recursos: ["Templates com identidade da campanha", "Edição de contato no canvas", "Exportação e compartilhamento"],
              },
            ].map((a) => (
              <Link key={a.titulo} href={a.href} style={{ textDecoration: "none", background: "#111120", border: `1px solid ${a.cor}18`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 3, backgroundColor: a.cor, opacity: 0.55 }} />
                <div style={{ padding: "20px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: a.cor + "18", border: `1px solid ${a.cor}28`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <a.icon size={18} color={a.cor} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 800, color: a.cor, backgroundColor: a.cor + "15", padding: "2px 8px", borderRadius: 20 }}>{a.camada}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "#EEEEFF", marginBottom: 6 }}>{a.titulo}</p>
                    <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.6 }}>{a.desc}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: "auto" }}>
                    {a.recursos.map((r) => (
                      <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: 1, backgroundColor: a.cor, flexShrink: 0, marginTop: 5 }} />
                        <p style={{ fontSize: 11, color: "#7878A0" }}>{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "11px 18px", borderTop: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: a.cor, fontWeight: 700 }}>Acessar portal</span>
                  <ArrowRight size={12} color={a.cor} />
                </div>
              </Link>
            ))}
          </div>

          {/* Fluxo do ativo */}
          <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 0, overflowX: "auto" }}>
            <p style={{ fontSize: 11, color: "#3A3A5C", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginRight: 20, flexShrink: 0 }}>Fluxo do ativo</p>
            {[
              { l: "TAGMOB cria", c: "#FF006880" },
              { l: "Construtora aprova", c: "#FF0068" },
              { l: "Arquiteto especifica", c: "#8B5CF6" },
              { l: "Marca recebe lead", c: "#FFB800" },
              { l: "Corretor vende", c: "#00E5FF" },
            ].map((s, i, a) => (
              <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <div style={{ padding: "4px 10px", background: s.c + "15", border: `1px solid ${s.c}28`, borderRadius: 5 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: s.c, whiteSpace: "nowrap" }}>{s.l}</p>
                </div>
                {i < a.length - 1 && <ChevronRight size={12} color="#2E2E4A" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DIFERENCIAIS — COMPACT ════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", borderTop: "1px solid #111120" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { icon: Cpu,        cor: "#FF0068", titulo: "Inteligência por empreendimento",     desc: "Manifesto e estratégia como contexto exclusivo da IA — nunca genérico" },
            { icon: ShieldCheck, cor: "#FFB800", titulo: "Governança com audit log",            desc: "Aprovação digital em dois níveis com rastreio completo de quem aprovou o quê" },
            { icon: Network,    cor: "#8B5CF6", titulo: "Efeito de rede entre atores",          desc: "Arquiteto especifica → marca recebe lead → corretor fecha a venda" },
            { icon: BarChart2,  cor: "#39FF14", titulo: "AdTech com rastreio granular",         desc: "CPM por exibição + CPA por afiliado. Relatório por produto, bairro e empreendimento" },
            { icon: Lock,       cor: "#00E5FF", titulo: "IP da agência sempre protegido",       desc: "Grid, tipografia e paleta nunca saem do controle — mesmo no editor do cliente" },
            { icon: Globe,      cor: "#FF0068", titulo: "Exclusividade geográfica",             desc: "Controle de canal por bairro, padrão ou empreendimento para marcas parceiras" },
          ].map((d) => (
            <div key={d.titulo} style={{ display: "flex", gap: 12, padding: "16px 18px", background: "#111120", border: `1px solid ${d.cor}12`, borderRadius: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: d.cor + "15", border: `1px solid ${d.cor}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <d.icon size={16} color={d.cor} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 3 }}>{d.titulo}</p>
                <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.55 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "100px 24px", overflow: "hidden", borderTop: "1px solid #111120", background: "#0D0D1A" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #1A1A3015 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(255,0,104,0.09) 0%, transparent 68%)", pointerEvents: "none" }} />
        <Bloco color="#FF0068" w={56} h={56} top="10%"  left="5%"   rotate={12} opacity={0.07} />
        <Bloco color="#39FF14" w={44} h={44} bottom="14%" left="8%" rotate={-20} opacity={0.07} />
        <Bloco color="#FFB800" w={48} h={68} top="18%"  right="5%"  rotate={8}  opacity={0.07} />

        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>TAGMOB</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 46px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.12, marginBottom: 18 }}>
            Onde estratégia, criatividade<br />
            e <span style={{ color: "#FF0068" }}>movimento se encaixam.</span>
          </h2>
          <p style={{ fontSize: 15, color: "#7878A0", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 40px" }}>
            No fim, como no Tetris, tudo se resume a encaixar as peças certas no momento certo. Isso é TAGMOB.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <CtaFinalButton />
            <Link href="/resumo" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 12, border: "1px solid #1A1A30", color: "#7878A0", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Ver resumo da plataforma <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: "36px 32px 24px", borderTop: "1px solid #111120", backgroundColor: "#09090F" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 28, marginBottom: 28 }}>
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 26, height: 26, backgroundColor: "#FF0068", borderRadius: 6, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, padding: 4 }}>
                  {[0,1,2,3].map((i) => <div key={i} style={{ backgroundColor: i === 3 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.92)", borderRadius: 1 }} />)}
                </div>
                <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: "-0.05em", color: "#EEEEFF" }}>TAGMOB</span>
              </div>
              <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.65 }}>O Sistema Operacional da Comunicação Imobiliária.</p>
            </div>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 800, color: "#2E2E4A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Plataforma</p>
                {[["Empreendimentos", "/tagmob-os"], ["Corretores", "/corretor"], ["Arquitetos", "/arquiteto"], ["Marcas & AdTech", "/marcas"]].map(([l, h]) => (
                  <div key={l} style={{ marginBottom: 7 }}>
                    <Link href={h} style={{ fontSize: 13, color: "#7878A0", textDecoration: "none" }}>{l}</Link>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 800, color: "#2E2E4A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Contato</p>
                <div style={{ marginBottom: 7 }}>
                  <a href="https://tagmob.com.br" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#7878A0", textDecoration: "none" }}>tagmob.com.br</a>
                </div>
                <div>
                  <a href="tel:+5511968356769" style={{ fontSize: 13, color: "#7878A0", textDecoration: "none" }}>+55 (11) 96835.6769</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #111120", paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ fontSize: 12, color: "#2E2E4A" }}>© 2025 TAGMOB. Todos os direitos reservados.</p>
            <p style={{ fontSize: 12, color: "#2E2E4A", fontStyle: "italic" }}>PENSAR · CRIAR · CONSTRUIR</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
