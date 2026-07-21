"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Palette, Building2, Zap, Tag, Plus, CheckCircle2,
  ArrowRight, Lock, Eye, Package, Layers, Sparkles,
  Image as ImageIcon, Video, FileText, FileImage, Send,
  Box, Users, ExternalLink, RefreshCw, ChevronRight, Download,
  Filter, Search, Clock, Check, AlertCircle, ShieldAlert, Award, UserCheck
} from "lucide-react";
import {
  MOCK_EMPREENDIMENTOS, MOCK_PROFISSIONAIS, MOCK_CONEXOES_MATCHMAKING, MOCK_PRODUTOS_INDUSTRIA
} from "@/lib/mock-data";
import { CategoriaProfissional, StatusHub, ProClienteConexao, ProfissionalPerfil } from "@/lib/types";

export default function ProfissionaisHubPage() {
  const [tabAtiva, setTabAtiva] = useState<"matchmaking" | "especificacao" | "autonomia_corretor" | "rede_profissionais">("matchmaking");
  const [empSelecionadoId, setEmpSelecionadoId] = useState("emp-001");
  const [notificacao, setNotificacao] = useState<string | null>(null);

  // Filtros de Matchmaking
  const [filtroCategoria, setFiltroCategoria] = useState<string>("TODAS");
  const [statusMatchList, setStatusMatchList] = useState<ProClienteConexao[]>(MOCK_CONEXOES_MATCHMAKING);

  // Perfil Selecionado Atualmente (Simulando o usuário logado)
  const [perfilLogado, setPerfilLogado] = useState<ProfissionalPerfil>(MOCK_PROFISSIONAIS[0]);

  // Autonomia do Corretor — Campos de Edição do CRECI
  const [creciCustom, setCreciCustom] = useState("CRECI SP 214589-F");
  const [telefoneCustom, setTelefoneCustom] = useState("(11) 98765-4321");

  const empAtual = MOCK_EMPREENDIMENTOS.find(e => e.id === empSelecionadoId) ?? MOCK_EMPREENDIMENTOS[0];

  function executarAcao(acaoLabel: string) {
    setNotificacao(acaoLabel);
    setTimeout(() => setNotificacao(null), 3500);
  }

  function atualizarStatusMatch(matchId: string, novoStatus: "Proposta Enviada" | "Em Negociação" | "Contratado") {
    setStatusMatchList(prev => prev.map(m => m.id === matchId ? { ...m, statusMatch: novoStatus } : m));
    executarAcao(`Status da Oportunidade atualizado para: ${novoStatus}`);
  }

  const conexoesFiltradas = statusMatchList.filter(m => {
    if (filtroCategoria !== "TODAS" && m.profissionalCategoria !== filtroCategoria) return false;
    return true;
  });

  return (
    <div style={{ padding: "28px 28px 80px", maxWidth: 1240, margin: "0 auto", color: "#EEEEFF" }}>

      {/* Toast Notificação */}
      {notificacao && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 200,
          backgroundColor: "#39FF14", color: "#000000", fontWeight: 800,
          padding: "14px 22px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 10px 30px rgba(57,255,20,0.4)"
        }}>
          <CheckCircle2 size={20} color="#000" />
          <span>Ação executada: <strong>{notificacao}</strong></span>
        </div>
      )}

      {/* Header com Badges de Credenciamento */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: perfilLogado.statusAprovacao === "APROVADO" ? "#39FF14" : "#FFB800" }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: "#8B5CF6", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Hub de Fornecedores & Inteligência de Rede
            </p>
            <span style={{
              fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 6,
              backgroundColor: perfilLogado.statusAprovacao === "APROVADO" ? "rgba(57,255,20,0.15)" : "rgba(255,184,0,0.15)",
              color: perfilLogado.statusAprovacao === "APROVADO" ? "#39FF14" : "#FFB800",
              border: `1px solid ${perfilLogado.statusAprovacao === "APROVADO" ? "#39FF1440" : "#FFB80040"}`
            }}>
              {perfilLogado.statusAprovacao === "APROVADO" ? "✓ CREDENCIADO & APROVADO" : "PENDENTE DE REGISTRO"}
            </span>
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", color: "#FFFFFF", marginBottom: 4 }}>
            Workspace do Parceiro: {perfilLogado.nomeRazao}
          </h1>
          <p style={{ fontSize: 14, color: "#7878A0" }}>
            Categoria: <strong style={{ color: "#FFF" }}>{perfilLogado.categoria}</strong> · Região: <strong style={{ color: "#FFF" }}>{perfilLogado.regiaoAtuacao}</strong> · Registro: <strong style={{ color: "#A78BFA" }}>{perfilLogado.registroPro || "N/A"}</strong>
          </p>
        </div>

        {/* Seletor de Perfil Simulado */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, backgroundColor: "#111122", padding: "8px 12px", borderRadius: 12, border: "1px solid #1A1A30" }}>
          <span style={{ fontSize: 11, color: "#7878A0" }}>Simular Perfil:</span>
          <select
            value={perfilLogado.id}
            onChange={(e) => {
              const p = MOCK_PROFISSIONAIS.find(item => item.id === e.target.value);
              if (p) setPerfilLogado(p);
            }}
            style={{
              backgroundColor: "#0D0D1A", color: "#FFF", border: "1px solid #2D2D50",
              borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 700, outline: "none"
            }}
          >
            {MOCK_PROFISSIONAIS.map(p => (
              <option key={p.id} value={p.id}>{p.nomeRazao} ({p.categoria})</option>
            ))}
          </select>

          <Link href="/profissionais/cadastro" style={{
            display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "#8B5CF6", color: "#FFF",
            padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 800, textDecoration: "none"
          }}>
            <Plus size={14} /> Novo Credenciamento
          </Link>
        </div>
      </div>

      {/* ABAS NAVEGAÇÃO INTERNA */}
      <div style={{
        display: "flex", gap: 8, borderBottom: "1px solid #1F1F3A", marginBottom: 28, paddingBottom: 4
      }}>
        {[
          { id: "matchmaking", label: "🎯 Vitrine de Oportunidades (Matchmaking Engine)", count: conexoesFiltradas.length },
          { id: "especificacao", label: "🎨 Módulo de Especificação Avançada", count: MOCK_PRODUTOS_INDUSTRIA.length },
          { id: "autonomia_corretor", label: "🚀 Distribuição de Materiais & CRECI (Perfil Corretor)" },
          { id: "rede_profissionais", label: "👥 Rede Credenciada TAGMOB", count: MOCK_PROFISSIONAIS.length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setTabAtiva(tab.id as any)}
            style={{
              padding: "12px 18px", borderRadius: "10px 10px 0 0",
              fontSize: 13, fontWeight: 800, cursor: "pointer",
              border: "none",
              backgroundColor: tabAtiva === tab.id ? "#111122" : "transparent",
              color: tabAtiva === tab.id ? "#39FF14" : "#7878A0",
              borderBottom: tabAtiva === tab.id ? "3px solid #39FF14" : "3px solid transparent",
              transition: "all 0.15s ease"
            }}
          >
            {tab.label} {tab.count !== undefined && <span style={{ opacity: 0.7, fontSize: 11 }}>({tab.count})</span>}
          </button>
        ))}
      </div>

      {/* ══ ABA 1: VITRINE DE OPORTUNIDADES (MATCHMAKING ENGINE) ══════════════ */}
      {tabAtiva === "matchmaking" && (
        <div>
          {/* Card de explicação */}
          <div style={{
            backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16,
            padding: 20, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
          }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>
                Inteligência de Matchmaking por Região Geográfica & Empreendimento
              </h3>
              <p style={{ fontSize: 13, color: "#7878A0" }}>
                O sistema TAGMOB OS cruza os novos compradores e incorporadoras parceiras com profissionais qualificados da região.
              </p>
            </div>

            {/* Filtro por Categoria */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Filter size={15} color="#A78BFA" />
              <span style={{ fontSize: 12, color: "#7878A0", fontWeight: 700 }}>Filtrar Categoria:</span>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                style={{
                  backgroundColor: "#0D0D1A", color: "#FFF", border: "1px solid #2D2D50",
                  borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, outline: "none"
                }}
              >
                <option value="TODAS">Todas as Categorias</option>
                <option value="ARQUITETO">Arquitetos</option>
                <option value="DESIGNER_INTERIORES">Designers de Interiores</option>
                <option value="MARCENEIRO">Marceneiros</option>
                <option value="EMPRESA_REFORMA">Empresas de Reforma</option>
                <option value="CORRETOR">Corretores</option>
              </select>
            </div>
          </div>

          {/* Grid de Cards de Oportunidades */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 18 }}>
            {conexoesFiltradas.map(match => {
              const isMatchLogado = match.profissionalId === perfilLogado.id;
              return (
                <div
                  key={match.id}
                  style={{
                    backgroundColor: "#111122",
                    border: `1px solid ${isMatchLogado ? "#39FF1460" : "#1F1F3A"}`,
                    borderRadius: 16, padding: 20,
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    position: "relative"
                  }}
                >
                  {isMatchLogado && (
                    <span style={{
                      position: "absolute", top: 14, right: 14, fontSize: 10, fontWeight: 900,
                      backgroundColor: "rgba(57,255,20,0.15)", color: "#39FF14", padding: "2px 8px", borderRadius: 6
                    }}>
                      SEU MATCH DIRETO
                    </span>
                  )}

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <Building2 size={16} color="#8B5CF6" />
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#8B5CF6" }}>{match.empreendimentoNome}</span>
                    </div>

                    <h4 style={{ fontSize: 16, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>
                      {match.clienteNome}
                    </h4>

                    <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 12 }}>
                      📍 Localização: <strong>{match.regiao}</strong>
                    </p>

                    <div style={{
                      backgroundColor: "#0D0D1A", padding: "10px 14px", borderRadius: 10,
                      border: "1px solid #1A1A30", marginBottom: 16
                    }}>
                      <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 2 }}>Profissional Sugerido pelo Matchmaking:</p>
                      <p style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF" }}>
                        {match.profissionalNome} <span style={{ fontSize: 11, color: "#A78BFA" }}>({match.profissionalCategoria})</span>
                      </p>
                      {match.valorEstimado && (
                        <p style={{ fontSize: 12, fontWeight: 800, color: "#39FF14", marginTop: 4 }}>
                          Orçamento Estimado: R$ {match.valorEstimado.toLocaleString("pt-BR")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: "#7878A0" }}>Status Atual:</span>
                      <span style={{
                        fontSize: 11, fontWeight: 900, padding: "3px 10px", borderRadius: 6,
                        backgroundColor: match.statusMatch === "Contratado" ? "rgba(57,255,20,0.15)" : match.statusMatch === "Em Negociação" ? "rgba(255,184,0,0.15)" : "rgba(139,92,246,0.15)",
                        color: match.statusMatch === "Contratado" ? "#39FF14" : match.statusMatch === "Em Negociação" ? "#FFB800" : "#A78BFA"
                      }}>
                        {match.statusMatch}
                      </span>
                    </div>

                    {/* Mudar Status da Oportunidade */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                      {(["Proposta Enviada", "Em Negociação", "Contratado"] as const).map(st => (
                        <button
                          key={st}
                          onClick={() => atualizarStatusMatch(match.id, st)}
                          style={{
                            padding: "6px 4px", fontSize: 10, fontWeight: 800, borderRadius: 6,
                            border: `1px solid ${match.statusMatch === st ? "#39FF14" : "#1A1A30"}`,
                            backgroundColor: match.statusMatch === st ? "#39FF1420" : "#0D0D1A",
                            color: match.statusMatch === st ? "#39FF14" : "#7878A0",
                            cursor: "pointer"
                          }}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ ABA 2: MÓDULO DE ESPECIFICAÇÃO AVANÇADA ═══════════════════════════ */}
      {tabAtiva === "especificacao" && (
        <div>
          <div style={{
            backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 20, marginBottom: 24,
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
          }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>
                Especificação Visual & Hub de Marcas Parceiras (AdTech Integration)
              </h3>
              <p style={{ fontSize: 13, color: "#7878A0" }}>
                Especifique itens reais de marcas homologadas nas plantas dos empreendimentos parceiros da TAGMOB.
              </p>
            </div>
            <button
              onClick={() => executarAcao("Sincronizar Catálogo de Especificações 3D")}
              style={{
                backgroundColor: "#8B5CF6", color: "#FFF", padding: "10px 16px", borderRadius: 10,
                fontWeight: 800, fontSize: 12, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6
              }}
            >
              <RefreshCw size={14} /> Sincronizar Plantas & Assets
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {MOCK_PRODUTOS_INDUSTRIA.map(prod => (
              <div key={prod.id} style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 14, padding: 16 }}>
                <div style={{ height: 120, backgroundColor: "#0D0D1A", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Box size={40} color="#8B5CF6" />
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#39FF14", backgroundColor: "#39FF1415", padding: "2px 8px", borderRadius: 4 }}>
                  {prod.categoria}
                </span>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: "#FFF", marginTop: 8, marginBottom: 4 }}>{prod.nome}</h4>
                <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 12 }}>{prod.descricao}</p>
                <button
                  onClick={() => executarAcao(`Especificado no projeto: ${prod.nome}`)}
                  style={{
                    width: "100%", backgroundColor: "#1A1A30", color: "#39FF14", border: "1px solid #39FF1440",
                    padding: "8px 12px", borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                  }}
                >
                  <Plus size={14} /> Especificar no Conceito 3D
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ ABA 3: DISTRIBUIÇÃO DE MATERIAIS & CRECI (PERFIL CORRETOR) ════════ */}
      {tabAtiva === "autonomia_corretor" && (
        <div>
          <div style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Zap size={22} color="#39FF14" />
              <h3 style={{ fontSize: 18, fontWeight: 900, color: "#FFF" }}>Esteira de Autonomia Comercial para Corretores</h3>
            </div>
            <p style={{ fontSize: 13, color: "#7878A0", marginBottom: 20 }}>
              Baixe os materiais de vendas (books, folders, cards social) pré-aprovados pela incorporadora e aplique automaticamente o seu registro de CRECI e WhatsApp de atendimento.
            </p>

            {/* Inputs de Personalização de CRECI */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, backgroundColor: "#0D0D1A", padding: 18, borderRadius: 12, border: "1px solid #1A1A30", marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#A78BFA", marginBottom: 6 }}>
                  Seu Registro de CRECI
                </label>
                <input
                  type="text"
                  value={creciCustom}
                  onChange={e => setCreciCustom(e.target.value)}
                  style={{
                    width: "100%", backgroundColor: "#111122", border: "1px solid #2D2D50",
                    borderRadius: 8, padding: "10px 12px", color: "#FFF", fontSize: 13, fontWeight: 700, outline: "none"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#A78BFA", marginBottom: 6 }}>
                  Telefone de Contato no Material
                </label>
                <input
                  type="text"
                  value={telefoneCustom}
                  onChange={e => setTelefoneCustom(e.target.value)}
                  style={{
                    width: "100%", backgroundColor: "#111122", border: "1px solid #2D2D50",
                    borderRadius: 8, padding: "10px 12px", color: "#FFF", fontSize: 13, fontWeight: 700, outline: "none"
                  }}
                />
              </div>
            </div>

            {/* Cards de Peças Autônomas para Download */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {[
                { nome: "Book Comercial de Mesa (Digital PDF)", formato: "PDF 4K", emp: empAtual.nome },
                { nome: "Cards de Instagram com Marca d'Água CRECI", formato: "PNG 1080x1350", emp: empAtual.nome },
                { nome: "Encarte de Vendas para WhatsApp", formato: "JPG HD", emp: empAtual.nome },
                { nome: "Vídeo Reels com Contato Personalizado", formato: "MP4 60fps", emp: empAtual.nome },
              ].map((mat, i) => (
                <div key={i} style={{ backgroundColor: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <FileText size={16} color="#00E5FF" />
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#00E5FF" }}>{mat.formato}</span>
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: "#FFF", marginBottom: 4 }}>{mat.nome}</h4>
                  <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 12 }}>Empreendimento: {mat.emp}</p>

                  <div style={{ backgroundColor: "#111122", padding: "6px 10px", borderRadius: 6, fontSize: 10, color: "#39FF14", marginBottom: 12 }}>
                    ✓ Estampará: {creciCustom} · {telefoneCustom}
                  </div>

                  <button
                    onClick={() => executarAcao(`Download de Peça Customizada com ${creciCustom}`)}
                    style={{
                      width: "100%", backgroundColor: "#39FF14", color: "#000", border: "none",
                      padding: "8px 12px", borderRadius: 8, fontWeight: 900, fontSize: 12, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                    }}
                  >
                    <Download size={14} /> Baixar Peça Personalizada
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ ABA 4: REDE CREDENCIADA TAGMOB ═══════════════════════════════════ */}
      {tabAtiva === "rede_profissionais" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {MOCK_PROFISSIONAIS.map(pro => (
              <div key={pro.id} style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 14, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 6,
                    backgroundColor: pro.statusAprovacao === "APROVADO" ? "rgba(57,255,20,0.15)" : "rgba(255,184,0,0.15)",
                    color: pro.statusAprovacao === "APROVADO" ? "#39FF14" : "#FFB800"
                  }}>
                    {pro.statusAprovacao}
                  </span>
                  <span style={{ fontSize: 11, color: "#8B5CF6", fontWeight: 800 }}>{pro.categoria}</span>
                </div>

                <h4 style={{ fontSize: 16, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>{pro.nomeRazao}</h4>
                <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 10 }}>📍 {pro.regiaoAtuacao}</p>

                <div style={{ backgroundColor: "#0D0D1A", padding: "8px 12px", borderRadius: 8, fontSize: 11, color: "#A78BFA", marginBottom: 12 }}>
                  Registro: <strong>{pro.registroPro || "Em validação"}</strong>
                </div>

                {pro.marcasInsumos && pro.marcasInsumos.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {pro.marcasInsumos.map(m => (
                      <span key={m} style={{ fontSize: 10, backgroundColor: "#1A1A30", color: "#9CA3AF", padding: "2px 6px", borderRadius: 4 }}>
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
