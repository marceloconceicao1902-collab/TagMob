"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Building2, Palette, Tag, Users, Cpu,
  ShieldCheck, Unlock, Sparkles, ChevronRight,
  Lock, X, Check
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
  const [successProposal, setSuccessProposal] = useState<{ id: string; total: number; itemsCount: number } | null>(null);
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

          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <a href="#funcionalidades" style={{ fontSize: 13, fontWeight: 700, color: "#7878A0", textDecoration: "none" }}>Funcionalidades</a>
            <a href="#como-funciona" style={{ fontSize: 13, fontWeight: 700, color: "#7878A0", textDecoration: "none" }}>Como Funciona</a>
            <a href="#atores" style={{ fontSize: 13, fontWeight: 700, color: "#7878A0", textDecoration: "none" }}>Atores</a>
            <a href="#portfolio" style={{ fontSize: 13, fontWeight: 700, color: "#7878A0", textDecoration: "none" }}>Trabalhos</a>
            <a href="#simulador" style={{ fontSize: 13, fontWeight: 700, color: "#7878A0", textDecoration: "none" }}>Simulador</a>
            <Link href="/sign-in" style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", textDecoration: "none" }}>Entrar</Link>
            <Link href="/sign-up" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", backgroundColor: "#FF0068", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              Iniciar Projeto
            </Link>
          </div>
        </div>
      </nav>

      {/* ══ 1. ABERTURA (Hero Section) ═════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "100px 24px 80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Bloco color="#FF0068" w={56} h={56} top="10%"  left="5%"   rotate={12} opacity={0.07} />
        <Bloco color="#39FF14" w={44} h={44} bottom="14%" left="8%" rotate={-20} opacity={0.07} />
        <Bloco color="#FFB800" w={48} h={68} top="18%"  right="5%"  rotate={8}  opacity={0.07} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 820, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(52px, 9vw, 108px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.05em", marginBottom: 32 }}>
            <span style={{ display: "block", color: "#EEEEFF" }}>PENSAR.</span>
            <span style={{ display: "block", background: "linear-gradient(90deg, #FF0068, #FF5494)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CRIAR.</span>
            <span style={{ display: "block", color: "#EEEEFF" }}>CONSTRUIR.</span>
            <span style={{ display: "block", background: "linear-gradient(90deg, #00E5FF, #39FF14)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CONECTAR.</span>
          </h1>

          <p style={{ fontSize: "clamp(16px, 2.2vw, 20px)", color: "#7878A0", maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.65 }}>
            O TAGMOB foi desenvolvido para <strong style={{ color: "#EEEEFF" }}>pensar</strong> a ambientalização de imóveis, <strong style={{ color: "#EEEEFF" }}>criar</strong> narrativas visuais com <strong style={{ color: "#EEEEFF" }}>Profissionais de Criação</strong>, <strong style={{ color: "#EEEEFF" }}>construir</strong> apresentações interativas de alto impacto e <strong style={{ color: "#EEEEFF" }}>conectar</strong> Construtoras, Marcas e Equipes de Vendas no momento de maior intenção de compra.
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
              { v: "3",    l: "perfis integrados (Fase 1)",  c: "#39FF14" },
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

      {/* ══ 2. MEIO (6 Funções Centrais - "Nossa, eles fazem tudo isso!") ═════ */}
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
              Cada função resolve uma etapa do seu lançamento, integrando briefing, marcas e equipes de vendas.
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
                desc: "Marcas aparecem no catálogo digital no momento de maior intenção de compra. Métricas transparentes de CPA.",
                items: ["Catálogo por categoria de produto", "Exclusividade por padrão e região", "Métricas de impressão e cliques", "Relatório de leads qualificados"],
                link: `/marcas`, cta: "Painel de marcas →",
              },
              {
                icon: Palette, cor: "#00E5FF",
                titulo: "Portal de Criação",
                desc: "Profissionais de Criação especificam produtos reais do catálogo integrado. Cada especificação gera valor e conectividade imediata.",
                items: ["Catálogo com marcas qualificadas", "Especificação direta em ambientes", "Links diretos de compra integrados", "Autonomia de escolha criativa"],
                link: `/profissionais`, cta: "Portal de criação →",
              },
            ].map((f) => (
              <div key={f.titulo} style={{ background: "#111120", border: `1px solid ${f.cor}18`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", paddingBottom: 22 }}>
                <div style={{ height: 3, backgroundColor: f.cor, opacity: 0.55 }} />
                <div style={{ padding: "22px 22px 0", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 8, backgroundColor: f.cor + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <f.icon size={18} color={f.cor} />
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#EEEEFF" }}>{f.titulo}</h3>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#7878A0", lineHeight: 1.6 }}>{f.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "6px 0" }}>
                    {f.items.map((i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <Check size={11} color={f.cor} />
                        <span style={{ fontSize: 11, color: "#EEEEFF" }}>{i}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "0 22px", marginTop: "auto" }}>
                  <Link href={f.link} style={{ display: "inline-flex", alignItems: "center", fontSize: 12, fontWeight: 700, color: f.cor, textDecoration: "none" }}>
                    {f.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. FLUXO DE TRABALHO (5 Etapas) ═══════════════════════════════════ */}
      <section id="como-funciona" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#0D0D1A" }}>
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

      {/* ══ 4. OS ATORES DO ECOSSISTEMA ════════════════════════════════════════ */}
      <section id="atores" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#0D0D1A" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <div style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: "#FFB800" }} />
              <p style={{ fontSize: 11, fontWeight: 800, color: "#FFB800", letterSpacing: "0.1em", textTransform: "uppercase" }}>Os Atores do Ecossistema (Fase 1)</p>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 14 }}>
              Qual é o seu papel no ecossistema?
            </h2>
            <p style={{ fontSize: 16, color: "#7878A0", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
              Cada perfil tem seu próprio acesso, painel e forma de extrair e gerar valor dentro da plataforma.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 28 }}>
            {[
              {
                camada: "C1", titulo: "Construtoras & Incorporadoras", cor: "#FF0068", icon: Building2, href: `/tagmob-os`,
                desc: "Ambiente exclusivo por lançamento. Aprovam o ecossistema e liberam a cadeia comercial de vendas.",
                recursos: ["Workspace completo por campanha", "Aprovação digital de todos os ativos", "Visão completa do pipeline de vendas"],
              },
              {
                camada: "C2", titulo: "Profissionais de Criação", cor: "#8B5CF6", icon: Palette, href: `/profissionais`,
                desc: "Especificam produtos reais no catálogo digital de marcas. Cada especificação gera conexão qualificada.",
                recursos: ["Catálogo técnico de marcas reais", "Especificação autoral por ambiente", "Autonomia na curadoria do projeto"],
              },
              {
                camada: "C3", titulo: "Marcas & Fornecedores", cor: "#FFB800", icon: Tag, href: `/marcas`,
                desc: "Aparecem no momento de maior intenção de compra — a especificação do produto. Visibilidade nativa qualificada.",
                recursos: ["Product placement nativo", "Exclusividade de marca por padrão/região", "Relatórios e métricas de impressão e CTR"],
              },
              {
                camada: "C4", titulo: "Corretores & Vendas", cor: "#00E5FF", icon: Users, href: `/corretor`,
                desc: "Recebem peças com identidade da campanha, personalizam com seus contatos e vendem com muito mais velocidade.",
                recursos: ["Apresentações interativas e precisas", "Edição de contatos diretamente no canvas", "Tabelas e orçamentos ao vivo para o cliente"],
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
          <p style={{ fontSize: 11, color: "#5F5F7A", textAlign: "center", fontStyle: "italic" }}>
            *Nota: Fornecedores de decoração e serviços complementares entrarão na Fase 2 da expansão comercial.
          </p>
        </div>
      </section>

      {/* ══ 5. TRABALHOS EFETUADOS (Cases & Portfólio) ═════════════════════════ */}
      <section id="portfolio" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#09090F" }}>
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

      {/* ══ 6. TABELA COMPARATIVA (Modelo Tradicional vs TAGMOB) ═════════════════ */}
      <section style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#0D0D1A" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <div style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: "#FF0068" }} />
              <p style={{ fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.1em", textTransform: "uppercase" }}>Por que o modelo tradicional faliu?</p>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 14 }}>
              Como a TAGMOB protege o seu VGV
            </h2>
            <p style={{ fontSize: 15, color: "#7878A0", lineHeight: 1.65 }}>
              Compare o modelo tradicional de agências com o ecossistema escalável de preço fixo da TAGMOB.
            </p>
          </div>

          <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 20, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #1A1A30", background: "#09090F" }}>
              <div style={{ padding: "16px 20px", fontSize: 12, fontWeight: 900, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Criterio</div>
              <div style={{ padding: "16px 20px", borderLeft: "1px solid #1A1A30", fontSize: 12, fontWeight: 900, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Modelo Tradicional</div>
              <div style={{ padding: "16px 20px", borderLeft: "1px solid #1A1A30", fontSize: 12, fontWeight: 900, color: "#FF0068", textTransform: "uppercase", letterSpacing: "0.05em" }}>Modelo TAGMOB</div>
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
      </section>

      {/* ══ 7. SIMULADOR DE VALORES & ORÇAMENTO (No fim da página) ═══════════════ */}
      <section id="simulador" style={{ padding: "88px 24px", borderTop: "1px solid #111120", backgroundColor: "#09090F" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
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
                        onClick={() => setSuccessProposal(null)}
                        style={{
                          padding: "10px", borderRadius: 8, backgroundColor: "#1A1A30", border: "1px solid #2E2E4A",
                          color: "#EEEEFF", fontSize: 12, fontWeight: 700, cursor: "pointer"
                        }}
                      >
                        Nova Simulação
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <input
                        type="text"
                        placeholder="Seu Nome *"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", background: "#09090F", border: "1px solid #1A1A30", borderRadius: 8, fontSize: 12.5, color: "#EEEEFF", outline: "none" }}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="E-mail Corporativo *"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", background: "#09090F", border: "1px solid #1A1A30", borderRadius: 8, fontSize: 12.5, color: "#EEEEFF", outline: "none" }}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="WhatsApp / Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", background: "#09090F", border: "1px solid #1A1A30", borderRadius: 8, fontSize: 12.5, color: "#EEEEFF", outline: "none" }}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Nome da Construtora / Incorporadora"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", background: "#09090F", border: "1px solid #1A1A30", borderRadius: 8, fontSize: 12.5, color: "#EEEEFF", outline: "none" }}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Instruções adicionais de escopo ou dúvidas..."
                        rows={3}
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", background: "#09090F", border: "1px solid #1A1A30", borderRadius: 8, fontSize: 12.5, color: "#EEEEFF", outline: "none", resize: "none" }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%", padding: "14px", borderRadius: 10,
                        backgroundColor: "#FF0068", border: "none", color: "#fff",
                        fontSize: 13, fontWeight: 800, cursor: "pointer",
                        boxShadow: "0 4px 20px rgba(255,0,104,0.15)",
                        transition: "all 0.15s ease",
                        marginTop: 4
                      }}
                    >
                      {loading ? "Processando..." : "Solicitar Proposta Comercial"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. CTA FINAL ══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "100px 24px 110px", overflow: "hidden", borderTop: "1px solid #111120", backgroundColor: "#0D0D1A" }}>
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
            <p style={{ fontSize: 12, color: "#2E2E4A", fontStyle: "italic" }}>PENSAR · CRIAR · CONSTRUIR · CONECTAR</p>
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
