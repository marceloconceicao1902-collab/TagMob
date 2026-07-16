"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Building2, Palette, Tag, Users, Cpu,
  ShieldCheck, Unlock, Sparkles, BarChart2, Zap,
  CheckCircle2, ChevronRight, FileImage, Share2,
  Lock, Network, Globe, AlertTriangle, X, Check,
  Send, Phone, MessageSquare
} from "lucide-react";

const DELIVERABLES = [
  {
    id: "pkg-estrategia",
    nome: "Campanha (Conceito, Estratégia e Identidade Visual)",
    categoria: "Estratégia & Branding",
    preco: 15000,
    desc: "Apresentação da estratégia de marca, posicionamento mestre e marca mestre",
    isObrigatorio: true,
    detalhes: [
      "Campanha (Apresentação do Conceito, Estratégia e Identidade Visual)",
      "Filme Conceito",
      "KV (Key Visual)",
      "Manual da Marca"
    ]
  },
  {
    id: "pkg-comerciais",
    nome: "Materiais Comerciais de Venda",
    categoria: "Materiais Comerciais",
    preco: 18000,
    desc: "Principais ferramentas utilizadas pela equipe comercial durante todo o processo de vendas",
    isObrigatorio: false,
    detalhes: [
      "Book do Cliente – Folhetão (Digital e Impresso)",
      "Book do Cliente – Mini (Digital e Impresso)",
      "Book de Mesa do Corretor (Digital e Impresso)",
      "Caderno de Plantas",
      "Folder Prospecto",
      "Folheto Intermediário",
      "Folheto de Combate",
      "Implantação",
      "Ficha Técnica"
    ]
  },
  {
    id: "pkg-digital",
    nome: "Comunicação Digital",
    categoria: "Comunicação Digital",
    preco: 8000,
    desc: "Materiais destinados à divulgação e ao relacionamento com clientes e corretores",
    isObrigatorio: false,
    detalhes: [
      "E-mail Marketing",
      "WhatsApp Card",
      "Convite Digital (Corretores e Clientes)"
    ]
  },
  {
    id: "pkg-eventos",
    nome: "Eventos de Lançamento",
    categoria: "Eventos Lançamento",
    preco: 12000,
    desc: "Materiais de suporte para convenções, treinamentos e eventos de lançamento",
    isObrigatorio: false,
    detalhes: [
      "Convite Impresso (Corretores e Clientes)",
      "Convite para Meeting",
      "Template de Apresentação para Meeting",
      "Backdrop para Eventos",
      "Banner Impresso Sinalizador"
    ]
  },
  {
    id: "pkg-campo",
    nome: "Materiais de Campo",
    categoria: "Materiais de Campo",
    preco: 9500,
    desc: "Materiais promocionais físicos e sinalização para ações externas de rua",
    isObrigatorio: false,
    detalhes: [
      "Sinalização para Promotores (Colete, Credencial e Pasta)",
      "Folhetos Promocionais",
      "Balcão de Degustação Adesivado",
      "Garrafa de Água Personalizada",
      "Lixo Car Personalizado",
      "Brindes Especiais"
    ]
  },
  {
    id: "pkg-visual",
    nome: "Comunicação Visual",
    categoria: "Comunicação Visual",
    preco: 16000,
    desc: "Sinalização e ambientação para o estande de vendas e pontos estratégicos",
    isObrigatorio: false,
    detalhes: [
      "Comunicação Visual do Estande",
      "Placas de Comunicação Visual",
      "Placa de Produto",
      "Placa Seta de Trânsito",
      "Tapume de Fechamento",
      "Cavalete Promocional",
      "Adesivo Microperfurado para Carros",
      "Faixas de Poste",
      "Wind Banners Promocionais",
      "Totens Internos e Externos"
    ]
  },
  {
    id: "pkg-midia-impressa",
    nome: "Mídia Impressa",
    categoria: "Mídia Impressa",
    preco: 5000,
    desc: "Anúncios estruturados para veiculação em jornais e revistas físicas",
    isObrigatorio: false,
    detalhes: [
      "Anúncio para Jornal",
      "Anúncio para Revista"
    ]
  },
  {
    id: "pkg-plataformas",
    nome: "Plataformas Digitais",
    categoria: "Plataformas Digitais",
    preco: 11000,
    desc: "Desenvolvimento de site oficial, catálogo digital interativo e portais imobiliários",
    isObrigatorio: false,
    detalhes: [
      "Site ou Landing Page do Empreendimento",
      "Catálogo Digital Interativo",
      "Materiais para Portais Imobiliários"
    ]
  },
  {
    id: "pkg-audiovisual",
    nome: "Conteúdo Audiovisual",
    categoria: "Audiovisual",
    preco: 14000,
    desc: "Vídeos do decorado, institucionais e tour virtual 360 graus",
    isObrigatorio: false,
    detalhes: [
      "Vídeo Institucional do Empreendimento",
      "Vídeo da Região",
      "Vídeo do Decorado",
      "Tour Virtual 360°"
    ]
  },
  {
    id: "pkg-imagens",
    nome: "Imagens & Renders 3D",
    categoria: "Imagens & Renders",
    preco: 15000,
    desc: "Perspectivas externas, internas, de lazer e plantas humanizadas coloridas",
    isObrigatorio: false,
    detalhes: [
      "Maquete Eletrônica (Imagens 3D)",
      "Perspectivas Ilustradas",
      "Plantas Humanizadas Coloridas",
      "Fotos Renderizadas Premium"
    ]
  },
  {
    id: "pkg-kits",
    nome: "Kits Comerciais de Venda",
    categoria: "Kits Comerciais",
    preco: 4500,
    desc: "Kits de apresentação para corretores e sacola institucional para clientes",
    isObrigatorio: false,
    detalhes: [
      "Kit do Corretor de Vendas",
      "Kit do Cliente Comprador",
      "Credenciais e Crachás Oficiais",
      "Design de Assinatura de E-mail"
    ]
  },
  {
    id: "pkg-marketing",
    nome: "Marketing Digital",
    categoria: "Marketing Digital",
    preco: 10000,
    desc: "Templates de redes sociais, stories, reels e criativos para campanhas patrocinadas",
    isObrigatorio: false,
    detalhes: [
      "Posts para Redes Sociais",
      "Stories Instagram",
      "Reels / TikTok",
      "Banners Google Display e Portais",
      "Peças para Meta Ads (Anúncios)",
      "Peças para Google Ads (Display)"
    ]
  }
];

const COMPARATIVE_ROWS = [
  {
    criterio: "Base de Precificação",
    trad: "% sobre VGV (2%–4% do valor das vendas)",
    tag: "Escopo fechado + entregáveis reais",
  },
  {
    criterio: "Transparência de Custos",
    trad: "Opaco — cresce com o sucesso do cliente",
    tag: "Preço fixo por item no simulador",
  },
  {
    criterio: "Setup Inicial (Etapa 1)",
    trad: "Embutido no VGV — invisível",
    tag: "Combo fixo mandatório com KV, Filme, Manual e Campanha",
  },
  {
    criterio: "Personalização",
    trad: "Pacotes fechados sem flexibilidade",
    tag: "Carrinho modular: adiciona só o que faz sentido",
  },
  {
    criterio: "Modelo de Contrato",
    trad: "Apenas Projeto Fechado",
    tag: "Projeto Fechado, Fee Mensal, Banco de Horas ou Por Demanda",
  },
  {
    criterio: "Autonomia do Cliente",
    trad: "Zero — tudo passa pela agência",
    tag: "OS: edita variáveis de texto, fotos, exporta em segundos",
  },
];

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

export default function LandingPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    DELIVERABLES.filter((d) => d.isObrigatorio).map((d) => d.id)
  );

  // Form State
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [mensagem, setMensagem] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successProposal, setSuccessProposal] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedPackages, setExpandedPackages] = useState<string[]>([]);

  const togglePackageExpanded = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPackages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Financial calculations
  const setupFixo = DELIVERABLES.filter((d) => d.isObrigatorio)
    .reduce((sum, item) => sum + item.preco, 0);
  
  const custoModular = DELIVERABLES.filter((d) => !d.isObrigatorio && selectedItems.includes(d.id))
    .reduce((sum, item) => sum + item.preco, 0);
  
  const valorTotal = setupFixo + custoModular;

  const toggleItem = (id: string, isObrigatorio?: boolean) => {
    if (isObrigatorio) return;
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) {
      alert("Por favor, preencha nome e e-mail.");
      return;
    }
    setLoading(true);

    const itemsSelecionados = DELIVERABLES.filter(d => selectedItems.includes(d.id))
                                          .map(d => d.nome)
                                          .join(", ");
    const mensagemAdicional = mensagem ? `\n\nMensagem do cliente: ${mensagem}` : "";
    const mensagemFinal = `Simulação de Escopo Landing Page:\nProdutos: ${itemsSelecionados}${mensagemAdicional}`;

    const leadData = {
      nome,
      email,
      telefone: telefone || null,
      empresa: empresa || null,
      mensagem: mensagemFinal,
      orcamentoEstimado: valorTotal,
    };

    // Local fallback lead
    const localLead = {
      id: "LEAD-LOCAL-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      nome,
      email,
      telefone: telefone || null,
      empresa: empresa || null,
      mensagem: mensagemFinal,
      orcamentoEstimado: valorTotal,
      status: "NOVO",
      prioridade: 2,
      score: 85,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage immediately so it's always accessible offline/locally
    if (typeof window !== "undefined") {
      try {
        const existingLeads = JSON.parse(localStorage.getItem("tagmob_local_leads") || "[]");
        localStorage.setItem("tagmob_local_leads", JSON.stringify([localLead, ...existingLeads]));
      } catch (e) {
        console.error("Erro ao salvar lead local", e);
      }
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      
      const data = await res.json();
      setLoading(false);
      setSuccessProposal({
        id: data?.data?.id || localLead.id,
        total: valorTotal,
        itemsCount: selectedItems.length,
      });
      // Clear form
      setNome("");
      setEmail("");
      setTelefone("");
      setEmpresa("");
      setMensagem("");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setSuccessProposal({
        id: localLead.id,
        total: valorTotal,
        itemsCount: selectedItems.length,
      });
      // Clear form
      setNome("");
      setEmail("");
      setTelefone("");
      setEmpresa("");
      setMensagem("");
    }
  };

  return (
    <div style={{ backgroundColor: "#09090F", color: "#EEEEFF", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Nav */}
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
            {[["#funcionalidades", "Funcionalidades"], ["#simulador", "Simulador Anti-VGV"], ["#atores", "Parceiros"], ["#como-funciona", "Como funciona"]].map(([h, l]) => (
              <Link key={l} href={h} style={{ color: "#7878A0", fontSize: 13, textDecoration: "none", fontWeight: 500 }}>{l}</Link>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Acesso ao Hub restrito via rota /hub */}
          </div>
        </div>
      </nav>

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
            <a href="#simulador" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 28px", backgroundColor: "#FF0068", color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Simular Orçamento <ArrowRight size={16} />
            </a>
            <a href="#funcionalidades" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 12, border: "1px solid #1A1A30", color: "#7878A0", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Funcionalidades <ChevronRight size={15} />
            </a>
          </div>

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

      {/* ══ PORTFOLIO CASES SHOWCASE ═════════════════════════════════════════ */}
      <section id="portfolio" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#0D0D1A" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <div style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: "#00E5FF" }} />
              <p style={{ fontSize: 11, fontWeight: 800, color: "#00E5FF", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cases & Portfólio</p>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 14 }}>
              Trabalhos Efetuados
            </h2>
            <p style={{ fontSize: 16, color: "#7878A0", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
              Desdobramentos visuais de Key Visuals (KV) e campanhas conceituais feitas sob medida.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {[
              { titulo: "Elysium Residences", sub: "Alto Padrão Jardins", cor: "#FF0068", desc: "Campanha completa baseada em arquitetura contemporânea e product placement premium. KV diretor focado em minimalismo e texturas cruas.", tags: ["Key Visual", "Filme Conceito", "Book 3D"] },
              { titulo: "Verdant Moema", sub: "Residencial Sustentável", cor: "#39FF14", desc: "Identidade focada no bem-estar e design biofílico. Integração de RAG para redação autônoma de posts ecológicos para corretores.", tags: ["Branding", "Estratégia", "Editor Canvas"] },
              { titulo: "Nexus Corporate", sub: "Comercial de Alta Tecnologia", cor: "#00E5FF", desc: "Lançamento corporativo de lajes integradas com automação. Campanhas inteligentes de Adtech com exclusividade regional de marcas.", tags: ["AdTech", "Plantas Tecnológicas", "Mídia"] }
            ].map((c) => (
              <div key={c.titulo} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", transition: "border-color 0.2s" }}>
                <div style={{ height: 180, background: `linear-gradient(135deg, ${c.cor}10, #111120)`, borderBottom: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: c.cor + "40", letterSpacing: "-0.05em" }}>{c.titulo.toUpperCase()}</div>
                  <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, color: c.cor, backgroundColor: c.cor + "15", padding: "3px 8px", borderRadius: 20, fontWeight: 700 }}>{c.sub}</div>
                </div>
                <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF" }}>{c.titulo}</h3>
                  <p style={{ fontSize: 13, color: "#7878A0", lineHeight: 1.65 }}>{c.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
                    {c.tags.map((t) => (
                      <span key={t} style={{ fontSize: 10, color: "#EEEEFF", background: "#1A1A30", padding: "3px 8px", borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FUNCIONALIDADES LIVE ══════════════════════════════════════════════ */}
      <section id="funcionalidades" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#09090F" }}>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
            {[
              {
                icon: Cpu, cor: "#FF0068",
                titulo: "Workspace do Empreendimento",
                desc: "Ambiente exclusivo por campanha com estratégia, design system, aprovação e organização em 5 etapas sequenciais. Tudo rastreável.",
                items: ["Manifesto e naming da campanha", "Key Visual e paleta aprovados", "Templates dinâmicos vinculados", "Progressão de fase bloqueada"],
                link: `/tagmob-os/emp-001`, cta: "Abrir workspace →",
              },
              {
                icon: ShieldCheck, cor: "#FFB800",
                titulo: "Gatekeeper de Aprovação",
                desc: "Nenhuma peça chega ao cliente sem dupla aprovação digital: primeiro a agência, depois o cliente. Log de auditoria completo.",
                items: ["Fila de ativos por status", "Preview + edição contextual", "Timeline de aprovação", "Auditoria com histórico completo"],
                link: `/tagmob-os/emp-001/aprovacao`, cta: "Ver gatekeeper →",
              },
              {
                icon: Unlock, cor: "#39FF14",
                titulo: "Editor Autônomo do Cliente",
                desc: "Canvas restrito onde o cliente edita com liberdade o que foi liberado pela agência. Grid, tipografia e paleta são sempre protegidos.",
                items: ["Campos editáveis vs bloqueados", "Preview ao vivo das alterações", "Exportação JPG / PDF / Link", "IA contextual para sugestões"],
                link: `/tagmob-os/emp-004/autonomia`, cta: "Abrir editor →",
              },
              {
                icon: Sparkles, cor: "#8B5CF6",
                titulo: "IA Contextual por Campanha",
                desc: "Engine RAG treinada com o manifesto, tom de voz e imagens aprovadas do empreendimento. Nunca gera conteúdo genérico.",
                items: ["Contexto isolado por empreendimento", "Copy alinhado ao posicionamento", "Sugestões de layout aprovadas", "Revisão antes de exportar"],
                link: `/tagmob-os/emp-001`, cta: "Testar IA →",
              },
              {
                icon: Tag, cor: "#FFB800",
                titulo: "AdTech & Product Placement",
                desc: "Marcas aparecem no catálogo do arquiteto no momento de maior intenção. CPM por exibição, CPA por lead gerado.",
                items: ["Catálogo por categoria de produto", "Exclusividade por bairro/padrão", "Métricas de impressão e CTR", "Relatório de leads qualificados"],
                link: `/marcas`, cta: "Painel de marcas →",
              },
              {
                icon: Palette, cor: "#00E5FF",
                titulo: "Portal do Arquiteto",
                desc: "Arquitetos especificam produtos reais do catálogo integrado. A marca recebe lead qualificado com projeto e empreendimento.",
                items: ["Catálogo com produtos reais", "Especificação técnica por ambiente", "Lead enviado à marca automaticamente", "Comissão sobre especificação"],
                link: `/arquiteto`, cta: "Portal do arquiteto →",
              },
            ].map((f) => (
              <div key={f.titulo} style={{ background: "#111120", border: `1px solid ${f.cor}18`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", paddingBottom: 22 }}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SIMULADOR DE VALORES ANTI-VGV & CAPTURE LEADS ════════════════════ */}
      <section id="simulador" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#0D0D1A", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", top: "20%", left: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(0, 229, 255, 0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: "10%", right: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(255, 0, 104, 0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <div style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: "#39FF14" }} />
              <p style={{ fontSize: 11, fontWeight: 800, color: "#39FF14", letterSpacing: "0.1em", textTransform: "uppercase" }}>Calculadora Aberta de Lançamento</p>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 14 }}>
              Simulador de Valores por Escopo
            </h2>
            <p style={{ fontSize: 16, color: "#7878A0", maxWidth: 620, margin: "0 auto", lineHeight: 1.65 }}>
              Selecione as peças que fazem sentido para o seu lançamento. Visualize os custos em tempo real com total transparência e sem cobrança de taxas sobre o VGV.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32, alignItems: "start", marginBottom: 56 }}>
            {/* Peças Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Checklist de Entregáveis</p>
              
              {/* Etapa 1 - Setup Combo Fixo */}
              {DELIVERABLES.filter(d => d.isObrigatorio).map(d => {
                const isExpanded = expandedPackages.includes(d.id);
                return (
                  <div key={d.id} style={{ border: "1px solid rgba(255,0,104,0.25)", background: "rgba(255,0,104,0.02)", borderRadius: 14, padding: 18, marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 900, color: "#FF0068", letterSpacing: "0.05em", textTransform: "uppercase" }}>⚡ Etapa 1: Combo de Inteligência Mestre</span>
                      <span style={{ fontSize: 9, color: "#FF0068", border: "1px solid #FF0068", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>FIXO & OBRIGATÓRIO</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{d.nome}</p>
                        <p style={{ fontSize: 11, color: "#7878A0", marginTop: 2 }}>{d.desc}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: "#FF0068" }}>R$ {d.preco.toLocaleString("pt-BR")}</span>
                        <Lock size={12} color="#FF0068" />
                      </div>
                    </div>
                    
                    <div style={{ marginTop: 10, borderTop: "1px solid rgba(255,0,104,0.15)", paddingTop: 8 }}>
                      <button
                        type="button"
                        onClick={(e) => togglePackageExpanded(d.id, e)}
                        style={{ background: "none", border: "none", color: "#FF0068", fontSize: 11, fontWeight: 700, cursor: "pointer", padding: 0, outline: "none", display: "flex", alignItems: "center", gap: 3 }}
                      >
                        {isExpanded ? "Ocultar peças incluídas ▲" : "Ver peças incluídas ▼"}
                      </button>
                      {isExpanded && d.detalhes && (
                        <ul style={{ marginTop: 8, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4, listStyleType: "disc" }}>
                          {d.detalhes.map((p, idx) => (
                            <li key={idx} style={{ fontSize: 11, color: "#7878A0" }}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Peças Modulares */}
              {DELIVERABLES.filter(d => !d.isObrigatorio).map(d => {
                const isSelected = selectedItems.includes(d.id);
                const isExpanded = expandedPackages.includes(d.id);
                return (
                  <div
                    key={d.id}
                    onClick={() => toggleItem(d.id)}
                    style={{
                      background: isSelected ? "rgba(57,255,20,0.02)" : "#111120",
                      border: `1.5px solid ${isSelected ? "#39FF1440" : "#1A1A30"}`,
                      borderRadius: 14,
                      padding: "14px 18px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{d.nome}</p>
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#7878A0", backgroundColor: "#1A1A30", padding: "1px 6px", borderRadius: 4 }}>
                            {d.categoria}
                          </span>
                        </div>
                        <p style={{ fontSize: 11, color: "#7878A0", marginTop: 4 }}>{d.desc}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: isSelected ? "#39FF14" : "#EEEEFF" }}>
                          R$ {d.preco.toLocaleString("pt-BR")}
                        </span>
                        <div style={{
                          width: 18, height: 18, borderRadius: 4,
                          border: `1.5px solid ${isSelected ? "#39FF14" : "#2E2E4A"}`,
                          backgroundColor: isSelected ? "#39FF1412" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          {isSelected && <Check size={11} color="#39FF14" strokeWidth={3} />}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ borderTop: "1px solid #1A1A30", paddingTop: 8, marginTop: 2 }} onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => togglePackageExpanded(d.id, e)}
                        style={{ background: "none", border: "none", color: "#00E5FF", fontSize: 11, fontWeight: 700, cursor: "pointer", padding: 0, outline: "none", display: "flex", alignItems: "center", gap: 3 }}
                      >
                        {isExpanded ? "Ocultar peças incluídas ▲" : "Ver peças incluídas ▼"}
                      </button>
                      {isExpanded && d.detalhes && (
                        <ul style={{ marginTop: 8, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4, listStyleType: "disc" }}>
                          {d.detalhes.map((p, idx) => (
                            <li key={idx} style={{ fontSize: 11, color: "#7878A0" }}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sumário Financeiro & Leads Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Box de Custos */}
              <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, padding: 24, position: "sticky", top: 80 }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 18 }}>Estimativa do Orçamento</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 12, borderBottom: "1px solid #1A1A30", paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#7878A0" }}>Setup Fixo (Etapa 1):</span>
                    <span style={{ fontWeight: 700, color: "#FF0068" }}>R$ {setupFixo.toLocaleString("pt-BR")},00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#7878A0" }}>Adições Modulares:</span>
                    <span style={{ fontWeight: 700, color: "#EEEEFF" }}>R$ {custoModular.toLocaleString("pt-BR")},00</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.01em" }}>TOTAL ORÇADO:</span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: "#39FF14", letterSpacing: "-0.02em" }}>R$ {valorTotal.toLocaleString("pt-BR")},00</span>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#00E5FF",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: "4px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      outline: "none",
                    }}
                  >
                    {showDetails ? "Ocultar Detalhes ▲" : "Ver Mais (Detalhes do Pedido) ▼"}
                  </button>
                </div>

                {showDetails && (
                  <div style={{
                    marginBottom: 16,
                    padding: "12px 14px",
                    background: "#09090F",
                    border: "1px solid #1A1A30",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    maxHeight: 180,
                    overflowY: "auto",
                  }}>
                    <p style={{ fontSize: 10, fontWeight: 800, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Itens Selecionados</p>
                    {DELIVERABLES.filter(d => selectedItems.includes(d.id)).map(d => (
                      <div key={d.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7878A0" }}>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>• {d.nome}</span>
                        <span style={{ color: d.isObrigatorio ? "#FF0068" : "#EEEEFF", fontWeight: 600 }}>R$ {d.preco.toLocaleString("pt-BR")}</span>
                      </div>
                    ))}
                  </div>
                )}

                {successProposal ? (
                  <div style={{
                    padding: "20px 16px",
                    background: "rgba(57, 255, 20, 0.05)",
                    border: "1px solid rgba(57, 255, 20, 0.25)",
                    borderRadius: 12,
                    textAlign: "center",
                    marginTop: 16
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(57, 255, 20, 0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "#39FF14",
                      margin: "0 auto 12px"
                    }}>
                      <Check size={20} strokeWidth={3} />
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 900, color: "#EEEEFF", marginBottom: 6 }}>Simulação Enviada!</p>
                    <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.5, marginBottom: 16 }}>
                      O orçamento de <strong>R$ {successProposal.total.toLocaleString("pt-BR")},00</strong> foi registrado na plataforma. Nossa equipe entrará em contato via WhatsApp em instantes!
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <Link
                        href="/leads"
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                          padding: "10px", borderRadius: 8, backgroundColor: "#39FF14", color: "#000",
                          fontSize: 12, fontWeight: 800, textDecoration: "none"
                        }}
                      >
                        Ir para CRM (Pipeline)
                      </Link>
                      <button
                        type="button"
                        onClick={() => setSuccessProposal(null)}
                        style={{
                          background: "none", border: "none", color: "#7878A0", fontSize: 11,
                          fontWeight: 700, cursor: "pointer", outline: "none"
                        }}
                      >
                        Nova Simulação
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.04em", borderTop: "1px solid #1A1A30", paddingTop: 16, marginBottom: 4 }}>Solicitar Proposta Formal</p>
                    <div>
                      <input
                        type="text"
                        placeholder="Seu Nome completo *"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        style={{ width: "100%", background: "#09090F", border: "1.5px solid #1A1A30", borderRadius: 8, padding: "10px 14px", color: "#EEEEFF", fontSize: 13, outline: "none" }}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <input
                        type="email"
                        placeholder="E-mail Corporativo *"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", background: "#09090F", border: "1.5px solid #1A1A30", borderRadius: 8, padding: "10px 14px", color: "#EEEEFF", fontSize: 13, outline: "none" }}
                      />
                      <input
                        type="tel"
                        placeholder="Telefone / WhatsApp"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        style={{ width: "100%", background: "#09090F", border: "1.5px solid #1A1A30", borderRadius: 8, padding: "10px 14px", color: "#EEEEFF", fontSize: 13, outline: "none" }}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Nome da Incorporadora"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        style={{ width: "100%", background: "#09090F", border: "1.5px solid #1A1A30", borderRadius: 8, padding: "10px 14px", color: "#EEEEFF", fontSize: 13, outline: "none" }}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Mensagem adicional ou objetivos do lançamento..."
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        style={{ width: "100%", background: "#09090F", border: "1.5px solid #1A1A30", borderRadius: 8, padding: "10px 14px", color: "#EEEEFF", fontSize: 13, outline: "none", minHeight: 70, resize: "vertical" }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%",
                        padding: "12px 18px",
                        borderRadius: 10,
                        backgroundColor: "#FF0068",
                        color: "#fff",
                        border: "none",
                        fontSize: 13,
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        boxShadow: "0 4px 14px rgba(255,0,104,0.3)"
                      }}
                    >
                      {loading ? "Registrando..." : "Enviar Simulação de Escopo"}
                      <Send size={12} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Tabela Comparativa nativa no site */}
          <div style={{ borderTop: "1px solid #111120", paddingTop: 56 }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span style={{ fontSize: 10, fontStyle: "italic", color: "#FF0068", letterSpacing: "0.1em", fontWeight: 800, textTransform: "uppercase" }}>Tabela Comparativa de Negócio</span>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: "#EEEEFF", marginTop: 4 }}>Modelo Tradicional (Baseado em VGV) vs. Modelo TAGMOB (Baseado em Escopo)</h3>
            </div>
            
            <div style={{ borderRadius: 16, border: "1px solid #1A1A30", overflow: "hidden", background: "#111120" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #1A1A30", background: "#0D0D1A" }}>
                <div style={{ padding: "14px 20px", fontSize: 11, fontWeight: 800, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.06em" }}>Critério</div>
                <div style={{ padding: "14px 20px", borderLeft: "1px solid #1A1A30", fontSize: 11, fontWeight: 800, color: "#EF4444", textTransform: "uppercase", letterSpacing: "0.06em" }}>Modelo Tradicional</div>
                <div style={{ padding: "14px 20px", borderLeft: "1px solid #1A1A30", fontSize: 11, fontWeight: 800, color: "#FF0068", textTransform: "uppercase", letterSpacing: "0.06em" }}>Modelo TAGMOB</div>
              </div>
              {/* Rows */}
              {COMPARATIVE_ROWS.map((row, idx) => (
                <div key={row.criterio} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: idx < COMPARATIVE_ROWS.length - 1 ? "1px solid #1A1A30" : "none" }}>
                  <div style={{ padding: "14px 20px", fontSize: 13, fontWeight: 700, color: "#EEEEFF", display: "flex", alignItems: "center" }}>{row.criterio}</div>
                  <div style={{ padding: "14px 20px", borderLeft: "1px solid #1A1A30", fontSize: 13, color: "#7878A0", textDecoration: "line-through", textDecorationColor: "rgba(239,68,68,0.3)", display: "flex", alignItems: "center" }}>{row.trad}</div>
                  <div style={{ padding: "14px 20px", borderLeft: "1px solid #1A1A30", fontSize: 13, fontWeight: 600, color: "#EEEEFF", background: "rgba(255,0,104,0.02)", display: "flex", alignItems: "center", gap: 8 }}>
                    <Check size={13} color="#39FF14" style={{ flexShrink: 0 }} />
                    {row.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMO FUNCIONA — 5 ETAPAS ══════════════════════════════════════════ */}
      <section id="como-funciona" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#09090F" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 72, alignItems: "start" }}>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 28 }}>
            {[
              {
                camada: "C1", titulo: "Construtoras",    cor: "#FF0068", icon: Building2, href: `/tagmob-os`,
                desc: "Ambiente exclusivo por empreendimento. Aprovam o ecossistema e liberam a cadeia.",
                recursos: ["Workspace completo por campanha", "Aprovação digital de todos os ativos", "Visão completa do pipeline"],
              },
              {
                camada: "C4", titulo: "Arquitetos",      cor: "#8B5CF6", icon: Palette,   href: `/arquiteto`,
                desc: "Especificam produtos reais no catálogo. Cada especificação gera um lead qualificado para a marca.",
                recursos: ["Catálogo técnico de marcas", "Especificação por ambiente", "Comissão sobre leads gerados"],
              },
              {
                camada: "C3", titulo: "Marcas",          cor: "#FFB800", icon: Tag,       href: `/marcas`,
                desc: "Aparecem no momento de maior intenção — a especificação do arquiteto. CPM + CPA.",
                recursos: ["Product placement no catálogo", "Exclusividade por região/padrão", "Relatório de leads e conversão"],
              },
              {
                camada: "C2", titulo: "Corretores",      cor: "#00E5FF", icon: Users,     href: `/corretor`,
                desc: "Recebem peças turbinadas prontas, personalizam com seus dados e vendem com mais qualidade.",
                recursos: ["Templates com identidade da campanha", "Edição de contato no canvas", "Exportação e compartilhamento"],
              },
            ].map((a) => (
              <div key={a.titulo} style={{ background: "#111120", border: `1px solid ${a.cor}18`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", paddingBottom: 20 }}>
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
              </div>
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

      {/* ══ DIFERENCIAIS ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", borderTop: "1px solid #111120", backgroundColor: "#09090F" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
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
            <a
              href="#simulador"
              style={{
                backgroundColor: "#FF0068",
                border: "none",
                color: "#fff",
                padding: "16px 36px",
                borderRadius: 12,
                fontSize: 16,
                cursor: "pointer",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              Simular Lançamento
              <ArrowRight size={18} />
            </a>
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

      {/* ══ SUCCESS PROPOSAL MODAL ═══════════════════════════════════════════ */}
      {successProposal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(9,9,15,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#111120", border: "2px solid #FF0068", borderRadius: 20, maxWidth: 540, width: "100%", padding: 32, position: "relative", boxShadow: "0 0 40px rgba(255,0,104,0.2)" }}>
            <button onClick={() => setSuccessProposal(null)} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", color: "#7878A0", cursor: "pointer" }}>
              <X size={18} />
            </button>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "rgba(57,255,20,0.1)", border: "2px solid #39FF14", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Check size={24} color="#39FF14" strokeWidth={3} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.02em" }}>Simulação Enviada com Sucesso!</h3>
              <p style={{ fontSize: 13, color: "#7878A0", marginTop: 6 }}>Proposta de Lançamento gerada sob protocolo <strong style={{ color: "#00E5FF" }}>#{successProposal.id}</strong></p>
            </div>
            
            <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 18, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: "#7878A0" }}>Itens Selecionados:</span>
                <span style={{ fontWeight: 700, color: "#EEEEFF" }}>{successProposal.itemsCount} entregáveis</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #1A1A30", paddingBottom: 10, marginBottom: 10 }}>
                <span style={{ color: "#7878A0" }}>Modelo Comercial:</span>
                <span style={{ fontWeight: 700, color: "#FF0068" }}>Escopo Anti-VGV (Preço Fixo)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF" }}>INVESTIMENTO ESTIMADO:</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: "#39FF14" }}>R$ {successProposal.total.toLocaleString("pt-BR")},00</span>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.6, marginBottom: 20 }}>
                Nossa equipe comercial da TAGMOB já recebeu o escopo detalhado e entrará em contato em menos de 2 horas comerciais para formalizar a proposta técnica.
              </p>
              <button
                onClick={() => setSuccessProposal(null)}
                style={{ width: "100%", padding: "12px", borderRadius: 8, backgroundColor: "#1A1A30", border: "1px solid #2E2E4A", color: "#EEEEFF", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Voltar ao site
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
