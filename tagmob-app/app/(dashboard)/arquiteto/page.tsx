"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Palette, Building2, Zap, Tag, Plus, CheckCircle2,
  ArrowRight, Lock, Eye, Package, Layers, Sparkles,
  Image as ImageIcon, Video, FileText, FileImage, Send,
  Box, Users, ExternalLink, RefreshCw, ChevronRight, Download
} from "lucide-react";
import { MOCK_EMPREENDIMENTOS } from "@/lib/mock-data";

export default function ArquitetoPage() {
  const [empSelecionadoId, setEmpSelecionadoId] = useState("emp-001");
  const [notificacao, setNotificacao] = useState<string | null>(null);

  const empAtual = MOCK_EMPREENDIMENTOS.find(e => e.id === empSelecionadoId) ?? MOCK_EMPREENDIMENTOS[0];

  function executarAcao(acaoLabel: string) {
    setNotificacao(acaoLabel);
    setTimeout(() => setNotificacao(null), 3000);
  }

  // Itens selecionados no Catálogo para este Empreendimento
  const itensSelecionadosCatalogo = [
    { id: "cat-1", nome: "Estratégia & Manifesto", categoria: "Estratégia", formato: "Deck OS / PDF", cor: "#FF0068", icon: Sparkles, ambiente: "Geral / Lançamento" },
    { id: "cat-2", nome: "Key Visual & Brandbook", categoria: "Design System", formato: "Figma Master / SVG", cor: "#39FF14", icon: Palette, ambiente: "Fachada & Interiores" },
    { id: "cat-3", nome: "Biblioteca de Renders 3D", categoria: "Visual", formato: "PNG 4K / RAW", cor: "#39FF14", icon: ImageIcon, ambiente: "Living & Suíte Master" },
    { id: "cat-4", nome: "Vídeo Tour Virtual 3D", categoria: "Mídia", formato: "MP4 4K 60fps", cor: "#00E5FF", icon: Video, ambiente: "Área de Lazer & Rooftop" },
    { id: "cat-5", nome: "Templates Dinâmicos OS", categoria: "Mídia", formato: "Template Engine", cor: "#00E5FF", icon: Zap, ambiente: "Redes Sociais & Vendas" },
    { id: "cat-6", nome: "Especificação Porcelanato Portobello", categoria: "Marcas", formato: "Piso 120×120 Natural", cor: "#8B5CF6", icon: Box, ambiente: "Cozinha & Varanda Gourmet" },
    { id: "cat-7", nome: "Especificação Louças Deca", categoria: "Marcas", formato: "Torneira Gold / Bacia Eco", cor: "#8B5CF6", icon: Box, ambiente: "Banheiros Suítes" },
  ];

  const acoesAutonomia = [
    { label: "Gerar um post", icon: Sparkles, color: "#FF0068" },
    { label: "Trocar uma foto", icon: ImageIcon, color: "#39FF14" },
    { label: "Atualizar um preço", icon: Tag, color: "#FFB800" },
    { label: "Montar um folder", icon: FolderKanbanIcon, color: "#00E5FF" },
    { label: "Baixar um vídeo", icon: Video, color: "#8B5CF6" },
    { label: "Exportar em PDF", icon: FileText, color: "#FF0068" },
    { label: "Gerar JPG", icon: FileImage, color: "#39FF14" },
    { label: "Publicar nas redes sociais", icon: Send, color: "#00E5FF" },
    { label: "Compartilhar com fornecedores", icon: Box, color: "#8B5CF6" },
    { label: "Disponibilizar para imobiliárias e corretores", icon: Users, color: "#39FF14" },
  ];

  function FolderKanbanIcon(props: any) {
    return <Layers {...props} />;
  }

  return (
    <div style={{ padding: "28px 28px 80px", maxWidth: 1140, margin: "0 auto" }}>

      {/* Toast de Notificação */}
      {notificacao && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 200,
          backgroundColor: "#39FF14", color: "#000000", fontWeight: 800,
          padding: "14px 22px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 10px 30px rgba(57,255,20,0.4)"
        }}>
          <CheckCircle2 size={20} color="#000" />
          <span>Ação executada no projeto: <strong>{notificacao}</strong></span>
        </div>
      )}

      {/* Cabeçalho */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: "#8B5CF6" }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: "#8B5CF6", letterSpacing: "0.08em", textTransform: "uppercase" }}>Portal do Arquiteto & Especificador</p>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 4 }}>
            Gestão de Projetos & Escolhas do Catálogo
          </h1>
          <p style={{ fontSize: 14, color: "#7878A0" }}>
            Visualize o Empreendimento, acompanhe os itens selecionados no catálogo e execute ações operacionais instantâneas.
          </p>
        </div>

        <Link href="/catalogo" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#FF0068", color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
          <Plus size={15} /> Selecionar Mais do Catálogo
        </Link>
      </div>

      {/* ══ 1. VISÃO DO EMPREENDIMENTO ════════════════════════════════════════ */}
      <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, padding: 24, marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Building2 size={22} color="#8B5CF6" />
            <h2 style={{ fontSize: 18, fontWeight: 900, color: "#EEEEFF" }}>Visão Geral do Empreendimento</h2>
          </div>

          {/* Seletor de Empreendimento */}
          <div style={{ display: "flex", gap: 8 }}>
            {MOCK_EMPREENDIMENTOS.map(emp => (
              <button
                key={emp.id}
                onClick={() => setEmpSelecionadoId(emp.id)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: `1px solid ${emp.id === empSelecionadoId ? "#8B5CF6" : "#1A1A30"}`,
                  backgroundColor: emp.id === empSelecionadoId ? "#8B5CF620" : "#0D0D1A",
                  color: emp.id === empSelecionadoId ? "#8B5CF6" : "#7878A0",
                }}
              >
                {emp.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Card Detalhes do Empreendimento */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 16, backgroundColor: "#0D0D1A", padding: 20, borderRadius: 12, border: "1px solid #1A1A30" }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#39FF14", backgroundColor: "#39FF1415", padding: "2px 8px", borderRadius: 4 }}>
              EMPREENDIMENTO ATIVO
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#EEEEFF", marginTop: 6, marginBottom: 4 }}>{empAtual.nome}</h3>
            <p style={{ fontSize: 12, color: "#7878A0" }}>Construtora: <strong>{empAtual.construtora}</strong> · {empAtual.bairro}, {empAtual.cidade}</p>
          </div>

          <div style={{ borderLeft: "1px solid #1A1A30", paddingLeft: 16 }}>
            <p style={{ fontSize: 10, color: "#7878A0", marginBottom: 4 }}>Fase do Projeto</p>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#FF0068" }}>Fase 4 — Organização</p>
            <p style={{ fontSize: 10, color: "#5A5A7A", marginTop: 2 }}>Indexação de Ativos</p>
          </div>

          <div style={{ borderLeft: "1px solid #1A1A30", paddingLeft: 16 }}>
            <p style={{ fontSize: 10, color: "#7878A0", marginBottom: 4 }}>Itens do Catálogo</p>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#39FF14" }}>{itensSelecionadosCatalogo.length} Ativos</p>
            <p style={{ fontSize: 10, color: "#5A5A7A", marginTop: 2 }}>100% Especificados</p>
          </div>

          <div style={{ borderLeft: "1px solid #1A1A30", paddingLeft: 16 }}>
            <p style={{ fontSize: 10, color: "#7878A0", marginBottom: 4 }}>Status de Autonomia</p>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#00E5FF" }}>Liberado</p>
            <p style={{ fontSize: 10, color: "#5A5A7A", marginTop: 2 }}>10 ações ativas</p>
          </div>
        </div>
      </div>

      {/* ══ 2. ITENS SELECIONADOS NO CATÁLOGO ═════════════════════════════════ */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Package size={18} color="#FF0068" />
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "#EEEEFF" }}>Itens Selecionados no Catálogo para o Empreendimento</h2>
          </div>
          <span style={{ fontSize: 12, color: "#7878A0" }}>Exibindo {itensSelecionadosCatalogo.length} entregáveis vinculados</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
          {itensSelecionadosCatalogo.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  background: "#111120",
                  border: "1px solid #1A1A30",
                  borderRadius: 12,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8,
                    backgroundColor: item.cor + "20",
                    border: `1px solid ${item.cor}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <IconComponent size={18} color={item.cor} />
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 800, color: item.cor }}>{item.categoria}</span>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", lineHeight: 1.2 }}>{item.nome}</h4>
                  </div>
                </div>

                <div style={{ backgroundColor: "#0D0D1A", padding: "8px 12px", borderRadius: 8, border: "1px solid #1A1A30", marginBottom: 12 }}>
                  <p style={{ fontSize: 10, color: "#7878A0" }}>Ambiente / Aplicação:</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF" }}>{item.ambiente}</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1A1A30", paddingTop: 10 }}>
                  <span style={{ fontSize: 10, color: "#5A5A7A" }}>{item.formato}</span>
                  <button
                    onClick={() => executarAcao(`Visualizar ${item.nome}`)}
                    style={{ background: "none", border: "none", color: item.cor, fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}
                  >
                    Ver Ativo <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ 3. AÇÕES DE AUTONOMIA DISPONÍVEIS NO PROJETO ══════════════════════ */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Zap size={18} color="#39FF14" />
          <h2 style={{ fontSize: 17, fontWeight: 800, color: "#EEEEFF" }}>Ações Operacionais de Autonomia (Disponíveis para o Arquitetos/Cliente)</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {acoesAutonomia.map((acao) => {
            const IconComponent = acao.icon;
            return (
              <button
                key={acao.label}
                onClick={() => executarAcao(acao.label)}
                style={{
                  background: "#111120",
                  border: `1px solid ${acao.color}30`,
                  borderRadius: 12,
                  padding: "16px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
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
                  width: 36, height: 36, borderRadius: 10,
                  backgroundColor: acao.color + "20",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 10
                }}>
                  <IconComponent size={18} color={acao.color} />
                </div>
                <p style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF", lineHeight: 1.3 }}>{acao.label}</p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
