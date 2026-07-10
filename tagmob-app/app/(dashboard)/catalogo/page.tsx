"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, Filter, Sparkles, Download, Eye, ArrowRight,
  FolderKanban, CheckCircle2, FileText, FileImage, Video,
  Layers, Palette, Share2, Printer, Box, Cpu, ChevronRight,
  Tag, Compass, ShieldCheck, Zap, RefreshCw, Send, Image as ImageIcon,
  Building2, Users, FileCheck, Check
} from "lucide-react";

export type CategoriaProduto = "TODOS" | "ESTRATEGIA" | "VISUAL" | "MIDIA" | "PRODUCAO";

export interface ItemCatalogo {
  id: string;
  nome: string;
  categoria: CategoriaProduto;
  categoriaLabel: string;
  descricao: string;
  formato: string;
  cor: string;
  icon: any;
  status: "APROVADO" | "EM_DESENVOLVIMENTO" | "TEMPLATE_DISPONIVEL";
  stats: string;
  tags: string[];
}

const PRODUTOS_CATALOGO: ItemCatalogo[] = [
  // ─── Estratégia & Marca ───────────────────────────────────────────────────
  {
    id: "prod-1",
    nome: "Estratégia",
    categoria: "ESTRATEGIA",
    categoriaLabel: "Estratégia & Marca",
    descricao: "Direcionamento estratégico da campanha imobiliária, incluindo inteligência de mercado, público-alvo e pilares de comunicação.",
    formato: "PDF Interativo / Deck OS",
    cor: "#FF0068",
    icon: Compass,
    status: "APROVADO",
    stats: "100% alinhado ao VGV",
    tags: ["Estratégia", "Planejamento", "Mercado"]
  },
  {
    id: "prod-2",
    nome: "Posicionamento",
    categoria: "ESTRATEGIA",
    categoriaLabel: "Estratégia & Marca",
    descricao: "Definição do território de marca, proposta única de valor (UVP) e matriz de diferenciação frente aos concorrentes da região.",
    formato: "Matriz de Marca / Documento",
    cor: "#FF0068",
    icon: ShieldCheck,
    status: "APROVADO",
    stats: "Exclusividade garantida",
    tags: ["Branding", "Posicionamento", "UVP"]
  },
  {
    id: "prod-3",
    nome: "Naming",
    categoria: "ESTRATEGIA",
    categoriaLabel: "Estratégia & Marca",
    descricao: "Criação de nome proprietário para o empreendimento com estudo fonético, registro INPI e aderência conceitual ao conceito arquitetônico.",
    formato: "Dossiê Naming + Domínios",
    cor: "#FF0068",
    icon: Tag,
    status: "APROVADO",
    stats: "Domínios & Marcas ok",
    tags: ["Naming", "Registro", "Propriedade"]
  },
  {
    id: "prod-4",
    nome: "Manifesto",
    categoria: "ESTRATEGIA",
    categoriaLabel: "Estratégia & Marca",
    descricao: "Texto inspiracional e manifesto de marca que sintetiza a alma do projeto, utilizado para treinar a IA Contextual RAG da campanha.",
    formato: "Texto Copywriting / RAG",
    cor: "#FF0068",
    icon: FileText,
    status: "APROVADO",
    stats: "Base para IA RAG",
    tags: ["Copywriting", "IA RAG", "Manifesto"]
  },
  {
    id: "prod-5",
    nome: "Conceito Criativo",
    categoria: "ESTRATEGIA",
    categoriaLabel: "Estratégia & Marca",
    descricao: "Big Idea que orienta toda a comunicação visual e verbal do lançamento, conectando arquitetura e estilo de vida.",
    formato: "Concept Book",
    cor: "#FF0068",
    icon: Sparkles,
    status: "APROVADO",
    stats: "Big Idea validada",
    tags: ["Big Idea", "Conceito", "Criatividade"]
  },

  // ─── Design System & Visual ───────────────────────────────────────────────
  {
    id: "prod-6",
    nome: "Key Visual",
    categoria: "VISUAL",
    categoriaLabel: "Design System & Visual",
    descricao: "Peça mestre (KV) que define a linguagem visual principal, composição gráfica e tratamento estético do empreendimento.",
    formato: "PSD / Figma Master",
    cor: "#39FF14",
    icon: Palette,
    status: "APROVADO",
    stats: "Guia Máster de Design",
    tags: ["Key Visual", "KV", "Master Art"]
  },
  {
    id: "prod-7",
    nome: "Identidade Visual",
    categoria: "VISUAL",
    categoriaLabel: "Design System & Visual",
    descricao: "Manual de identidade visual completo: logotipo, variações, tipografia corporativa, gride compositivo e regras de aplicação.",
    formato: "Brandbook PDF / SVG",
    cor: "#39FF14",
    icon: Layers,
    status: "APROVADO",
    stats: "Brandbook V2.1",
    tags: ["Logo", "Brandbook", "Tipografia"]
  },
  {
    id: "prod-8",
    nome: "Biblioteca de imagens",
    categoria: "VISUAL",
    categoriaLabel: "Design System & Visual",
    descricao: "Acervo de renders 3D em alta resolução, fotos de lifestyle tratadas e imagens ambientalizadas com produtos de marcas parceiras.",
    formato: "PNG 4K / RAW / WebP",
    cor: "#39FF14",
    icon: FileImage,
    status: "TEMPLATE_DISPONIVEL",
    stats: "140+ ativos em 4K",
    tags: ["Renders", "Fotos 3D", "Banco de Imagens"]
  },
  {
    id: "prod-9",
    nome: "Fundos",
    categoria: "VISUAL",
    categoriaLabel: "Design System & Visual",
    descricao: "Texturas, backgrounds conceituais e padrões gráficos proprietários para aplicação em peças digitais e impressas.",
    formato: "PNG Transparente / SVG",
    cor: "#39FF14",
    icon: Box,
    status: "TEMPLATE_DISPONIVEL",
    stats: "45 padrões ativos",
    tags: ["Backgrounds", "Texturas", "Patterns"]
  },
  {
    id: "prod-10",
    nome: "Ícones",
    categoria: "VISUAL",
    categoriaLabel: "Design System & Visual",
    descricao: "Set exclusivo de iconografia desenhado para representar áreas comuns, diferenciais construtivos e plantas do projeto.",
    formato: "Vector SVG / Font Icon",
    cor: "#39FF14",
    icon: Cpu,
    status: "APROVADO",
    stats: "32 ícones custom",
    tags: ["Iconografia", "Vetores", "Diferenciais"]
  },

  // ─── Mídia & Conteúdo ─────────────────────────────────────────────────────
  {
    id: "prod-11",
    nome: "Vídeos",
    categoria: "MIDIA",
    categoriaLabel: "Mídia & Conteúdo",
    descricao: "Vídeos institucionais, teasers de lançamento, tours virtuais 3D e pílulas em vídeo otimizadas para Stories e Reels.",
    formato: "MP4 4K / ProRes 1080p",
    cor: "#00E5FF",
    icon: Video,
    status: "EM_DESENVOLVIMENTO",
    stats: "12 vídeos prontos",
    tags: ["Vídeos", "Teasers", "Reels 3D"]
  },
  {
    id: "prod-12",
    nome: "Roteiros",
    categoria: "MIDIA",
    categoriaLabel: "Mídia & Conteúdo",
    descricao: "Scripts e roteiros técnicos para locução de vídeos, vídeos de corretores, podcasts e apresentações de vendas.",
    formato: "Docx / Notion Master",
    cor: "#00E5FF",
    icon: FileText,
    status: "APROVADO",
    stats: "8 roteiros gravados",
    tags: ["Roteiro", "Locução", "Script"]
  },
  {
    id: "prod-13",
    nome: "Templates",
    categoria: "MIDIA",
    categoriaLabel: "Mídia & Conteúdo",
    descricao: "Modelos dinâmicos vinculados ao Editor Autônomo, permitindo que corretores gerem peças personalizadas com segurança gráfica.",
    formato: "TAGMOB Template Engine",
    cor: "#00E5FF",
    icon: Zap,
    status: "TEMPLATE_DISPONIVEL",
    stats: "28 templates ativos",
    tags: ["Editor Autônomo", "Templates", "Canva OS"]
  },
  {
    id: "prod-14",
    nome: "Apresentações",
    categoria: "MIDIA",
    categoriaLabel: "Mídia & Conteúdo",
    descricao: "Decks de vendas interativos para meetings com investidores, treinamento de corretores e espelho de vendas digital.",
    formato: "PPTX / Keynote / Web",
    cor: "#00E5FF",
    icon: Share2,
    status: "APROVADO",
    stats: "Deck Comercial V4",
    tags: ["Slides", "Treinamento", "Deck Vendas"]
  },
  {
    id: "prod-18",
    nome: "Conteúdo para redes sociais",
    categoria: "MIDIA",
    categoriaLabel: "Mídia & Conteúdo",
    descricao: "Calendário editorial, carrosséis educativos, posts de engajamento e legendas otimizadas para Instagram, LinkedIn e TikTok.",
    formato: "Calendário Grid / JPG",
    cor: "#00E5FF",
    icon: Share2,
    status: "TEMPLATE_DISPONIVEL",
    stats: "60+ posts prontos",
    tags: ["Social Media", "Instagram", "Feed"]
  },

  // ─── Arquivos & Produção ──────────────────────────────────────────────────
  {
    id: "prod-15",
    nome: "Arquivos para gráfica",
    categoria: "PRODUCAO",
    categoriaLabel: "Arquivos & Produção",
    descricao: "Fechamento de arquivo profissional para impressão de folders, livros de convenção, tapumes, lonas e catálogos com sangria e faca especial.",
    formato: "PDF/X-1a Alta Resolução",
    cor: "#8B5CF6",
    icon: Printer,
    status: "APROVADO",
    stats: "Faca & Sangria ok",
    tags: ["Gráfica", "Print", "PDF/X-1a"]
  },
  {
    id: "prod-16",
    nome: "Arquivos para fornecedores",
    categoria: "PRODUCAO",
    categoriaLabel: "Arquivos & Produção",
    descricao: "Pacotes técnicos detalhados para comunicação visual, estande de vendas, maquetes físicas e cenografia.",
    formato: "ZIP DWG / AI / DXF",
    cor: "#8B5CF6",
    icon: Box,
    status: "APROVADO",
    stats: "DWG & Vetores ok",
    tags: ["Fornecedores", "Estande", "Cenografia"]
  },
  {
    id: "prod-17",
    nome: "Arquivos digitais",
    categoria: "PRODUCAO",
    categoriaLabel: "Arquivos & Produção",
    descricao: "Kits de banners para mídia programática (Google Ads), e-mail marketing HTML, landing pages e WhatsApp disparos.",
    formato: "HTML5 / GIF / WebP / ZIP",
    cor: "#8B5CF6",
    icon: Download,
    status: "TEMPLATE_DISPONIVEL",
    stats: "Kits Ads Otimizados",
    tags: ["Digital Ads", "HTML5", "Email Mkt"]
  }
];

export default function CatalogoPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaProduto>("TODOS");
  const [busca, setBusca] = useState("");
  const [itemSelecionado, setItemSelecionado] = useState<ItemCatalogo | null>(null);
  const [acaoNotificacao, setAcaoNotificacao] = useState<string | null>(null);

  function executarAcaoCliente(acaoLabel: string) {
    setAcaoNotificacao(acaoLabel);
    setTimeout(() => setAcaoNotificacao(null), 3000);
  }

  const categoriasNav: { id: CategoriaProduto; label: string; count: number; color: string }[] = [
    { id: "TODOS",      label: "Todos os Produtos", count: PRODUTOS_CATALOGO.length, color: "#EEEEFF" },
    { id: "ESTRATEGIA", label: "Estratégia & Marca", count: PRODUTOS_CATALOGO.filter(p => p.categoria === "ESTRATEGIA").length, color: "#FF0068" },
    { id: "VISUAL",     label: "Design System & Visual", count: PRODUTOS_CATALOGO.filter(p => p.categoria === "VISUAL").length, color: "#39FF14" },
    { id: "MIDIA",      label: "Mídia & Conteúdo", count: PRODUTOS_CATALOGO.filter(p => p.categoria === "MIDIA").length, color: "#00E5FF" },
    { id: "PRODUCAO",   label: "Arquivos & Produção", count: PRODUTOS_CATALOGO.filter(p => p.categoria === "PRODUCAO").length, color: "#8B5CF6" },
  ];

  const produtosFiltrados = useMemo(() => {
    return PRODUTOS_CATALOGO.filter((p) => {
      const matchCat = categoriaAtiva === "TODOS" || p.categoria === categoriaAtiva;
      const q = busca.toLowerCase();
      const matchBusca =
        p.nome.toLowerCase().includes(q) ||
        p.descricao.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchBusca;
    });
  }, [categoriaAtiva, busca]);

  const acoesAutonomia = [
    { label: "Gerar um post", icon: Sparkles, color: "#FF0068", desc: "Criar post automático com IA e imagens aprovadas" },
    { label: "Trocar uma foto", icon: ImageIcon, color: "#39FF14", desc: "Substituir foto preservando o grid protegido" },
    { label: "Atualizar um preço", icon: Tag, color: "#FFB800", desc: "Atualizar valores e tabela de unidades em 1 clique" },
    { label: "Montar um folder", icon: FolderKanban, color: "#00E5FF", desc: "Gerar encarte impresso ou digital customizado" },
    { label: "Baixar um vídeo", icon: Video, color: "#8B5CF6", desc: "Download em 4K de vinhetas, Reels e institucionais" },
    { label: "Exportar em PDF", icon: FileText, color: "#FF0068", desc: "Gerar PDF fechado de alta resolução para impressão" },
    { label: "Gerar JPG", icon: FileImage, color: "#39FF14", desc: "Exportar imagem leve pronta para WhatsApp e redes" },
    { label: "Publicar nas redes sociais", icon: Send, color: "#00E5FF", desc: "Disparar publicação direta no Instagram e LinkedIn" },
    { label: "Compartilhar com fornecedores", icon: Box, color: "#8B5CF6", desc: "Enviar pacote técnico para gráficas e cenografia" },
    { label: "Disponibilizar para imobiliárias e corretores", icon: Users, color: "#39FF14", desc: "Distribuir peças na rede de vendas autorizada" },
  ];

  return (
    <div style={{ padding: "28px 28px 80px", maxWidth: 1140, margin: "0 auto" }}>

      {/* Alerta de Notificação de Ação Executada */}
      {acaoNotificacao && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 200,
          backgroundColor: "#39FF14", color: "#000000", fontWeight: 800,
          padding: "14px 22px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 10px 30px rgba(57,255,20,0.4)"
        }}>
          <CheckCircle2 size={20} color="#000" />
          <span>Ação executada com sucesso: <strong>{acaoNotificacao}</strong></span>
        </div>
      )}

      {/* Cabeçalho */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: "#FF0068" }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.08em", textTransform: "uppercase" }}>Catálogo de Produtos & Entregáveis</p>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 4 }}>
            Biblioteca do Ecossistema TAGMOB
          </h1>
          <p style={{ fontSize: 14, color: "#7878A0" }}>
            Explore os 18 ativos essenciais de comunicação, estratégia, design system e produção técnica para empreendimentos.
          </p>
        </div>

        {/* Campo de Busca */}
        <div style={{ position: "relative", minWidth: 280 }}>
          <Search size={16} color="#5A5A7A" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Buscar produto ou formato..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#111120",
              border: "1px solid #1A1A30",
              borderRadius: 10,
              padding: "10px 14px 10px 40px",
              color: "#EEEEFF",
              fontSize: 13,
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* ══ BANNER DE FLUXO E JORNADA ════════════════════════════════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #111120 0%, #16162a 100%)",
        border: "1px solid #1A1A30",
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Sparkles size={18} color="#FF0068" />
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.02em" }}>
            Jornada do Cliente: Do Catálogo à Autonomia Total
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, position: "relative", zIndex: 2 }}>
          {/* Passo 1 */}
          <div style={{ background: "#0D0D1A", border: "1px solid #FF006830", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 900, color: "#000", backgroundColor: "#FF0068", padding: "2px 7px", borderRadius: 10 }}>PASSO 1</span>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF" }}>Seleção no Catálogo</h3>
            </div>
            <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.5 }}>
              O cliente navega na biblioteca de 18 produtos e seleciona os ativos desejados para o lançamento do empreendimento.
            </p>
          </div>

          {/* Passo 2 */}
          <div style={{ background: "#0D0D1A", border: "1px solid #00E5FF30", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 900, color: "#000", backgroundColor: "#00E5FF", padding: "2px 7px", borderRadius: 10 }}>PASSO 2</span>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF" }}>Desenvolvimento Agência</h3>
            </div>
            <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.5 }}>
              A agência cria a estratégia, posicionamento, identidade visual, campanha completa e organiza todo o ecossistema.
            </p>
          </div>

          {/* Passo 3 */}
          <div style={{ background: "#0D0D1A", border: "1px solid #39FF1430", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 900, color: "#000", backgroundColor: "#39FF14", padding: "2px 7px", borderRadius: 10 }}>PASSO 3</span>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF" }}>Autonomia do Cliente</h3>
            </div>
            <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.5 }}>
              Com a campanha no ar, o cliente ganha liberdade total para personalizar, exportar e distribuir peças sem depender da agência.
            </p>
          </div>
        </div>
      </div>

      {/* ══ CENTRAL DE AUTONOMIA DO CLIENTE (10 AÇÕES LIBERADAS) ══════════════ */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Zap size={16} color="#39FF14" />
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF" }}>Central de Autonomia do Cliente (Liberdade Operacional)</h2>
            </div>
            <p style={{ fontSize: 12, color: "#7878A0", marginTop: 2 }}>Clique em qualquer uma das 10 ações abaixo para simular a operação direta pelo cliente:</p>
          </div>
          <Link href="/tagmob-os/emp-004/autonomia" style={{ fontSize: 12, fontWeight: 700, color: "#39FF14", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            Abrir Editor Autônomo Completo →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {acoesAutonomia.map((acao) => {
            const IconComponent = acao.icon;
            return (
              <button
                key={acao.label}
                onClick={() => executarAcaoCliente(acao.label)}
                style={{
                  background: "#111120",
                  border: `1px solid ${acao.color}30`,
                  borderRadius: 12,
                  padding: "14px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = acao.color + "15";
                  e.currentTarget.style.borderColor = acao.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#111120";
                  e.currentTarget.style.borderColor = acao.color + "30";
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  backgroundColor: acao.color + "20",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 8
                }}>
                  <IconComponent size={16} color={acao.color} />
                </div>
                <p style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF", lineHeight: 1.3, marginBottom: 4 }}>{acao.label}</p>
                <p style={{ fontSize: 10, color: "#7878A0", lineHeight: 1.3 }}>{acao.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorias / Abas */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
        {categoriasNav.map((cat) => {
          const ativa = categoriaAtiva === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: ativa ? 700 : 500,
                cursor: "pointer",
                border: `1px solid ${ativa ? cat.color + "40" : "#1A1A30"}`,
                backgroundColor: ativa ? cat.color + "15" : "#111120",
                color: ativa ? (cat.id === "TODOS" ? "#FFFFFF" : cat.color) : "#7878A0",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              <span>{cat.label}</span>
              <span style={{
                fontSize: 11,
                fontWeight: 800,
                padding: "2px 6px",
                borderRadius: 12,
                backgroundColor: ativa ? cat.color : "#1A1A30",
                color: ativa ? "#000000" : "#7878A0",
              }}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de Produtos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {produtosFiltrados.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setItemSelecionado(item)}
              style={{
                background: "#111120",
                border: "1px solid #1A1A30",
                borderRadius: 14,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.15s ease, border-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.cor + "60";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1A1A30";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Faixa decorativa superior */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: item.cor, opacity: 0.8 }} />

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: item.cor + "18",
                    border: `1px solid ${item.cor}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <IconComponent size={20} color={item.cor} />
                  </div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: item.cor,
                    backgroundColor: item.cor + "12",
                    border: `1px solid ${item.cor}25`,
                    padding: "3px 8px",
                    borderRadius: 6,
                  }}>
                    {item.categoriaLabel}
                  </span>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF", marginBottom: 6, letterSpacing: "-0.02em" }}>
                  {item.nome}
                </h3>

                <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.5, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {item.descricao}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                  {item.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 10, color: "#5A5A7A", backgroundColor: "#0D0D1A", border: "1px solid #1A1A30", padding: "2px 6px", borderRadius: 4 }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Rodapé do Card */}
                <div style={{ borderTop: "1px solid #1A1A30", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle2 size={12} color={item.cor} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#EEEEFF" }}>{item.stats}</span>
                  </div>
                  <span style={{ fontSize: 11, color: item.cor, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                    Ver detalhes <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Drawer de Detalhes do Produto */}
      {itemSelecionado && (
        <div
          onClick={() => setItemSelecionado(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#111120",
              border: `1px solid ${itemSelecionado.cor}40`,
              borderRadius: 18,
              maxWidth: 540,
              width: "100%",
              padding: 28,
              position: "relative",
              boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${itemSelecionado.cor}15`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  backgroundColor: itemSelecionado.cor + "20",
                  border: `1px solid ${itemSelecionado.cor}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <itemSelecionado.icon size={26} color={itemSelecionado.cor} />
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: itemSelecionado.cor, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {itemSelecionado.categoriaLabel}
                  </span>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.03em" }}>
                    {itemSelecionado.nome}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setItemSelecionado(null)}
                style={{ background: "none", border: "none", color: "#7878A0", fontSize: 20, cursor: "pointer", fontWeight: 700 }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 14, color: "#EEEEFF", lineHeight: 1.6, marginBottom: 20, backgroundColor: "#0D0D1A", padding: 16, borderRadius: 10, border: "1px solid #1A1A30" }}>
              {itemSelecionado.descricao}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              <div style={{ background: "#0D0D1A", padding: "12px 14px", borderRadius: 8, border: "1px solid #1A1A30" }}>
                <p style={{ fontSize: 10, color: "#7878A0", marginBottom: 2 }}>Formato de Entrega</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{itemSelecionado.formato}</p>
              </div>
              <div style={{ background: "#0D0D1A", padding: "12px 14px", borderRadius: 8, border: "1px solid #1A1A30" }}>
                <p style={{ fontSize: 10, color: "#7878A0", marginBottom: 2 }}>Status no Ecossistema</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: itemSelecionado.cor }}>{itemSelecionado.stats}</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => {
                  executarAcaoCliente(`Acessar Ativo: ${itemSelecionado.nome}`);
                  setItemSelecionado(null);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 10,
                  backgroundColor: itemSelecionado.cor,
                  color: "#000000",
                  fontWeight: 800,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Eye size={16} /> Acessar Ativo no Ecossistema
              </button>
              <button
                onClick={() => setItemSelecionado(null)}
                style={{
                  padding: "12px 20px",
                  borderRadius: 10,
                  backgroundColor: "transparent",
                  color: "#7878A0",
                  fontWeight: 600,
                  fontSize: 14,
                  border: "1px solid #1A1A30",
                  cursor: "pointer",
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
