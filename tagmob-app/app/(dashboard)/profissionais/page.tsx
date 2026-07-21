"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2, Palette, ShieldCheck, CheckCircle2, ArrowRight,
  Sparkles, FileText, Globe, Tag, Award, UserCheck, Layers,
  ChevronRight, AlertCircle, Wrench, Briefcase, Compass, Search,
  Filter, Check, X, Clock, Send, Plus, ExternalLink, RefreshCw, Eye
} from "lucide-react";
import {
  MOCK_EMPREENDIMENTOS, MOCK_PROFISSIONAIS, MOCK_SERVICOS_ABERTOS, MOCK_PROPOSTAS_MATCH
} from "@/lib/mock-data";
import {
  CategoriaProfissional, StatusHub, ProfissionalPerfil, ServicoAberto, PropostaMatch
} from "@/lib/types";

export default function ProfissionaisHubPage() {
  // Alternância principal de visão: 1 = Admin / Incorporadora | 2 = Workspace do Profissional
  const [visaoAtiva, setVisaoAtiva] = useState<"ADMIN" | "PROFISSIONAL">("ADMIN");

  // Estado dos Profissionais (Triagem e Base Ativa)
  const [profissionaisList, setProfissionaisList] = useState<ProfissionalPerfil[]>(MOCK_PROFISSIONAIS);
  const [filtroCategoriaAdmin, setFiltroCategoriaAdmin] = useState<string>("TODOS");
  const [buscaAdmin, setBuscaAdmin] = useState<string>("");

  // Estado da Visão do Profissional
  const [subTabProfissional, setSubTabProfissional] = useState<"FASES_PROJETOS" | "BALCAO_OPORTUNIDADES">("FASES_PROJETOS");
  const [servicosAbertosList, setServicosAbertosList] = useState<ServicoAberto[]>(MOCK_SERVICOS_ABERTOS);
  const [propostasList, setPropostasList] = useState<PropostaMatch[]>(MOCK_PROPOSTAS_MATCH);

  // Perfil Selecionado na Visão do Profissional
  const [perfilLogado, setPerfilLogado] = useState<ProfissionalPerfil>(MOCK_PROFISSIONAIS[0]);

  // Modal / Form de Oferta Ativa
  const [modalOfertaAberta, setModalOfertaAberta] = useState(false);
  const [empSelecionadoOferta, setEmpSelecionadoOferta] = useState(MOCK_EMPREENDIMENTOS[0].id);
  const [mensagemOferta, setMensagemOferta] = useState("");
  const [valorOferta, setValorOferta] = useState("");

  // Toast de feedback
  const [notificacao, setNotificacao] = useState<string | null>(null);

  function mostrarNotificacao(msg: string) {
    setNotificacao(msg);
    setTimeout(() => setNotificacao(null), 3500);
  }

  // ─── AÇÕES DE ADMIN (TRIAGEM & APROVAÇÃO) ─────────────────────────
  function aprovarProfissional(id: string) {
    setProfissionaisList(prev => prev.map(p => p.id === id ? { ...p, statusAprovacao: "APROVADO" } : p));
    mostrarNotificacao("Profissional aprovado e homologado na base ativa!");
  }

  function recusarProfissional(id: string) {
    setProfissionaisList(prev => prev.map(p => p.id === id ? { ...p, statusAprovacao: "BLOQUEADO" } : p));
    mostrarNotificacao("Cadastro do profissional recusado.");
  }

  // ─── AÇÕES DO PROFISSIONAL (CANDIDATURA & OFERTA ATIVA) ───────────
  function candidatarSeVaga(servico: ServicoAberto) {
    const novaProposta: PropostaMatch = {
      id: `prop-${Date.now()}`,
      profissionalId: perfilLogado.id,
      profissionalNome: perfilLogado.nomeRazao,
      servicoId: servico.id,
      empreendimentoId: servico.empreendimentoId,
      empreendimentoNome: servico.empreendimentoNome,
      tipoMatch: "CANDIDATURA_PASSIVA",
      mensagem: `Candidatura direta enviada por ${perfilLogado.nomeRazao} para a vaga "${servico.titulo}".`,
      valorProposta: servico.orcamentoEst,
      status: "EM_ANALISE",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPropostasList(prev => [novaProposta, ...prev]);
    mostrarNotificacao(`Candidatura enviada para: ${servico.titulo}`);
  }

  function enviarOfertaAtiva(e: React.FormEvent) {
    e.preventDefault();
    const emp = MOCK_EMPREENDIMENTOS.find(e => e.id === empSelecionadoOferta);

    const novaOferta: PropostaMatch = {
      id: `prop-${Date.now()}`,
      profissionalId: perfilLogado.id,
      profissionalNome: perfilLogado.nomeRazao,
      empreendimentoId: emp?.id,
      empreendimentoNome: emp?.nome,
      tipoMatch: "OFERTA_ATIVA",
      mensagem: mensagemOferta || `Oferta comercial ativa de ${perfilLogado.nomeRazao} para ${emp?.nome}.`,
      valorProposta: valorOferta ? parseFloat(valorOferta) : undefined,
      status: "ENVIADA",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPropostasList(prev => [novaOferta, ...prev]);
    setModalOfertaAberta(false);
    setMensagemOferta("");
    setValorOferta("");
    mostrarNotificacao(`Oferta ativa enviada com sucesso para ${emp?.nome}!`);
  }

  // Filtros da Visão Admin
  const inscritosPendentes = profissionaisList.filter(p => p.statusAprovacao === "PENDENTE");
  const profissionaisAtivos = profissionaisList.filter(p => {
    if (p.statusAprovacao !== "APROVADO") return false;
    if (filtroCategoriaAdmin !== "TODOS" && p.categoria !== filtroCategoriaAdmin) return false;
    if (buscaAdmin && !p.nomeRazao.toLowerCase().includes(buscaAdmin.toLowerCase()) && !p.regiaoAtuacao.toLowerCase().includes(buscaAdmin.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ padding: "28px 28px 80px", maxWidth: 1280, margin: "0 auto", color: "#EEEEFF" }}>

      {/* Toast Notificação */}
      {notificacao && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 200,
          backgroundColor: "#39FF14", color: "#000000", fontWeight: 800,
          padding: "14px 22px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 10px 30px rgba(57,255,20,0.4)"
        }}>
          <CheckCircle2 size={20} color="#000" />
          <span>{notificacao}</span>
        </div>
      )}

      {/* Top Header & Visão Switcher */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16, marginBottom: 32, borderBottom: "1px solid #1F1F3A", paddingBottom: 20
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#39FF14" }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: "#39FF14", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              TAGMOB OS · Hub de Conexões & Pipeline de Serviços
            </p>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", color: "#FFFFFF", marginBottom: 4 }}>
            Módulo de Profissionais & Parceiros
          </h1>
          <p style={{ fontSize: 13, color: "#7878A0" }}>
            Administração de credenciamento de um lado e busca ativa de oportunidades de serviços do outro.
          </p>
        </div>

        {/* TOGGLE SWITCH DE VISÕES */}
        <div style={{
          backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 14, padding: 6,
          display: "flex", gap: 6
        }}>
          <button
            onClick={() => setVisaoAtiva("ADMIN")}
            style={{
              padding: "10px 18px", borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: "pointer",
              border: "none",
              backgroundColor: visaoAtiva === "ADMIN" ? "#8B5CF6" : "transparent",
              color: visaoAtiva === "ADMIN" ? "#FFF" : "#7878A0",
              boxShadow: visaoAtiva === "ADMIN" ? "0 4px 15px rgba(139,92,246,0.4)" : "none",
              transition: "all 0.15s ease", display: "flex", alignItems: "center", gap: 8
            }}
          >
            <Building2 size={16} /> Visão 1: Painel Admin (TAGMOB / Incorporadora)
          </button>

          <button
            onClick={() => setVisaoAtiva("PROFISSIONAL")}
            style={{
              padding: "10px 18px", borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: "pointer",
              border: "none",
              backgroundColor: visaoAtiva === "PROFISSIONAL" ? "#39FF14" : "transparent",
              color: visaoAtiva === "PROFISSIONAL" ? "#000" : "#7878A0",
              boxShadow: visaoAtiva === "PROFISSIONAL" ? "0 4px 15px rgba(57,255,20,0.4)" : "none",
              transition: "all 0.15s ease", display: "flex", alignItems: "center", gap: 8
            }}
          >
            <Briefcase size={16} /> Visão 2: Workspace do Profissional
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 🏢 VISÃO 1: PAINEL ADMINISTRATIVO (TAGMOB / INCORPORADORA)           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {visaoAtiva === "ADMIN" && (
        <div>

          {/* SECTION 1: PAINEL DE TRIAGEM (APPROVAL PIPELINE) */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Clock size={20} color="#FFB800" />
                <h2 style={{ fontSize: 18, fontWeight: 900, color: "#FFFFFF" }}>
                  Painel de Triagem & Homologação (Fila de Cadastro)
                </h2>
                <span style={{
                  fontSize: 11, fontWeight: 900, backgroundColor: "#FFB80020", color: "#FFB800",
                  padding: "2px 8px", borderRadius: 12, border: "1px solid #FFB80040"
                }}>
                  {inscritosPendentes.length} Pendentes
                </span>
              </div>
              <span style={{ fontSize: 12, color: "#7878A0" }}>Ação rápida em 1 clique para aprovar ou recusar credenciados</span>
            </div>

            {inscritosPendentes.length === 0 ? (
              <div style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 32, textAlign: "center" }}>
                <CheckCircle2 size={32} color="#39FF14" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontSize: 14, fontWeight: 700, color: "#FFF" }}>Nenhum cadastro pendente de aprovação no momento.</p>
                <p style={{ fontSize: 12, color: "#7878A0", marginTop: 4 }}>Todos os profissionais inscritos já foram homologados.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
                {inscritosPendentes.map(pro => (
                  <div
                    key={pro.id}
                    style={{
                      backgroundColor: "#111122", border: "1px solid #FFB80050", borderRadius: 16,
                      padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between",
                      boxShadow: "0 8px 25px rgba(255,184,0,0.05)"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 900, color: "#8B5CF6", backgroundColor: "#8B5CF620", padding: "2px 8px", borderRadius: 4 }}>
                          {pro.categoria}
                        </span>
                        <span style={{ fontSize: 11, color: "#FFB800", fontWeight: 800 }}>⏳ AGUARDANDO TRIAGEM</span>
                      </div>

                      <h3 style={{ fontSize: 16, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>{pro.nomeRazao}</h3>
                      <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 8 }}>CNPJ/CPF: <strong>{pro.cnpjCpf}</strong></p>

                      <div style={{ backgroundColor: "#0D0D1A", padding: "10px 12px", borderRadius: 10, border: "1px solid #1A1A30", marginBottom: 16 }}>
                        <p style={{ fontSize: 11, color: "#7878A0" }}>📍 Região: <strong style={{ color: "#FFF" }}>{pro.regiaoAtuacao}</strong></p>
                        <p style={{ fontSize: 11, color: "#7878A0", marginTop: 2 }}>
                          📜 Registro Técnico: <strong style={{ color: "#A78BFA" }}>{pro.registroPro || "Não informado"}</strong>
                        </p>
                        {pro.portfolioUrl && (
                          <a
                            href={pro.portfolioUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#39FF14", fontWeight: 700, marginTop: 6, textDecoration: "none" }}
                          >
                            Ver Portfólio <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Botões Rápidos [Aprovar] / [Recusar] */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <button
                        onClick={() => recusarProfissional(pro.id)}
                        style={{
                          backgroundColor: "#FF006815", color: "#FF0068", border: "1px solid #FF006840",
                          borderRadius: 10, padding: "10px", fontSize: 12, fontWeight: 800, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                        }}
                      >
                        <X size={15} /> Recusar
                      </button>

                      <button
                        onClick={() => aprovarProfissional(pro.id)}
                        style={{
                          backgroundColor: "#39FF14", color: "#000", border: "none",
                          borderRadius: 10, padding: "10px", fontSize: 12, fontWeight: 900, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                          boxShadow: "0 4px 15px rgba(57,255,20,0.3)"
                        }}
                      >
                        <Check size={15} /> Aprovar Profissional
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 2: VISUALIZAÇÃO DA BASE ATIVA HOMOLOGADA */}
          <div>
            <div style={{
              backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 20, marginBottom: 20,
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
            }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 900, color: "#FFFFFF", marginBottom: 2 }}>
                  Base de Profissionais Homologados ({profissionaisAtivos.length})
                </h2>
                <p style={{ fontSize: 12, color: "#7878A0" }}>
                  Profissionais aptos para indicação direta e execução de serviços para os empreendimentos.
                </p>
              </div>

              {/* Filtros e Busca Avançada */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ position: "relative", width: 220 }}>
                  <Search size={14} color="#7878A0" style={{ position: "absolute", left: 10, top: 11 }} />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou região..."
                    value={buscaAdmin}
                    onChange={e => setBuscaAdmin(e.target.value)}
                    style={{
                      width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                      borderRadius: 8, padding: "8px 10px 8px 30px", color: "#FFF", fontSize: 12, outline: "none"
                    }}
                  />
                </div>

                <select
                  value={filtroCategoriaAdmin}
                  onChange={e => setFiltroCategoriaAdmin(e.target.value)}
                  style={{
                    backgroundColor: "#0D0D1A", color: "#FFF", border: "1px solid #2D2D50",
                    borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 700, outline: "none"
                  }}
                >
                  <option value="TODOS">Todas as Categorias</option>
                  <option value="ARQUITETO">Arquitetos</option>
                  <option value="DESIGNER_INTERIORES">Designers de Interiores</option>
                  <option value="MARCENEIRO">Marceneiros</option>
                  <option value="EMPRESA_REFORMA">Empresas de Reforma</option>
                  <option value="CORRETOR">Corretores</option>
                  <option value="ENGENHEIRO">Engenheiros</option>
                </select>
              </div>
            </div>

            {/* Grid da Base Ativa */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {profissionaisAtivos.map(pro => (
                <div key={pro.id} style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 14, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: "#39FF14", backgroundColor: "#39FF1415", padding: "2px 8px", borderRadius: 4 }}>
                      ✓ CREDENCIADO ATIVO
                    </span>
                    <span style={{ fontSize: 11, color: "#8B5CF6", fontWeight: 800 }}>{pro.categoria}</span>
                  </div>

                  <h4 style={{ fontSize: 16, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>{pro.nomeRazao}</h4>
                  <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 8 }}>📍 {pro.regiaoAtuacao}</p>

                  <div style={{ backgroundColor: "#0D0D1A", padding: "8px 12px", borderRadius: 8, fontSize: 11, color: "#A78BFA", marginBottom: 12 }}>
                    Registro Pro: <strong>{pro.registroPro || "CNPJ Homologado"}</strong>
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

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 💼 VISÃO 2: WORKSPACE DO PROFISSIONAL (PARCEIRO INSCRITO)              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {visaoAtiva === "PROFISSIONAL" && (
        <div>

          {/* Sub-Abas do Workspace do Profissional */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1F1F3A", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setSubTabProfissional("FASES_PROJETOS")}
                style={{
                  padding: "12px 18px", borderRadius: "10px 10px 0 0",
                  fontSize: 13, fontWeight: 800, cursor: "pointer", border: "none",
                  backgroundColor: subTabProfissional === "FASES_PROJETOS" ? "#111122" : "transparent",
                  color: subTabProfissional === "FASES_PROJETOS" ? "#39FF14" : "#7878A0",
                  borderBottom: subTabProfissional === "FASES_PROJETOS" ? "3px solid #39FF14" : "3px solid transparent",
                }}
              >
                📊 A. Monitor de Projetos (Visão de Fases dos Lançamentos)
              </button>

              <button
                onClick={() => setSubTabProfissional("BALCAO_OPORTUNIDADES")}
                style={{
                  padding: "12px 18px", borderRadius: "10px 10px 0 0",
                  fontSize: 13, fontWeight: 800, cursor: "pointer", border: "none",
                  backgroundColor: subTabProfissional === "BALCAO_OPORTUNIDADES" ? "#111122" : "transparent",
                  color: subTabProfissional === "BALCAO_OPORTUNIDADES" ? "#39FF14" : "#7878A0",
                  borderBottom: subTabProfissional === "BALCAO_OPORTUNIDADES" ? "3px solid #39FF14" : "3px solid transparent",
                }}
              >
                💼 B. Balcão de Oportunidades & Oferta Ativa ({servicosAbertosList.length})
              </button>
            </div>

            {/* Botão de Enviar Oferta Ativa */}
            <button
              onClick={() => setModalOfertaAberta(true)}
              style={{
                backgroundColor: "#8B5CF6", color: "#FFF", padding: "10px 18px", borderRadius: 10,
                fontWeight: 800, fontSize: 12, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 4px 15px rgba(139,92,246,0.3)"
              }}
            >
              <Send size={14} /> Enviar Proposta/Oferta Ativa
            </button>
          </div>

          {/* ── SUB-ABA A: MONITOR DE PROJETOS EM ANDAMENTO (FASES) ────────── */}
          {subTabProfissional === "FASES_PROJETOS" && (
            <div>
              <div style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 20, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>
                  Linha do Tempo de Fases dos Empreendimentos TAGMOB
                </h3>
                <p style={{ fontSize: 13, color: "#7878A0" }}>
                  Acompanhe em qual fase cada lançamento se encontra para abordar a Incorporadora ou o Comprador Final no momento exato de decisão.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {MOCK_EMPREENDIMENTOS.map(emp => {
                  const faseNomeMap: Record<number, string> = {
                    1: "Fase 1 — Estratégia & Naming",
                    2: "Fase 2 — Lançamento & Plantão",
                    3: "Fase 3 — Obras Iniciadas",
                    4: "Fase 4 — Unidades & Decoração",
                    5: "Fase 5 — Entrega de Chaves"
                  };

                  const dicaMomentoMap: Record<number, string> = {
                    1: "💡 Momento ideal para Arquitetos & Conceito Criativo",
                    2: "💡 Momento ideal para Corretores & Empresas de Reforma do Plantão",
                    3: "💡 Momento ideal para Engenharia Civil & Estruturas",
                    4: "💡 Momento ideal para Marceneiros & Designers de Interiores",
                    5: "💡 Momento ideal para Reformas Finais & Mobiliário do Comprador"
                  };

                  return (
                    <div key={emp.id} style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 24 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                        <div>
                          <span style={{ fontSize: 10, fontWeight: 900, color: "#39FF14", backgroundColor: "#39FF1415", padding: "2px 8px", borderRadius: 4 }}>
                            {emp.tipo} · {emp.bairro}, {emp.cidade}
                          </span>
                          <h3 style={{ fontSize: 20, fontWeight: 900, color: "#FFF", marginTop: 6, marginBottom: 2 }}>{emp.nome}</h3>
                          <p style={{ fontSize: 12, color: "#7878A0" }}>Incorporadora: <strong>{emp.construtora}</strong></p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: 11, color: "#8B5CF6", fontWeight: 800 }}>Status Atual do Projeto:</span>
                          <p style={{ fontSize: 16, fontWeight: 900, color: "#39FF14", marginTop: 2 }}>
                            {faseNomeMap[emp.fase_atual]}
                          </p>
                        </div>
                      </div>

                      {/* Stepper de Fases Visual */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 16 }}>
                        {[1, 2, 3, 4, 5].map(stepNum => {
                          const isCurrent = stepNum === emp.fase_atual;
                          const isDone = stepNum < emp.fase_atual;
                          return (
                            <div
                              key={stepNum}
                              style={{
                                backgroundColor: isCurrent ? "#39FF1420" : isDone ? "#1A1A30" : "#0D0D1A",
                                border: `1px solid ${isCurrent ? "#39FF14" : isDone ? "#2D2D50" : "#1A1A30"}`,
                                borderRadius: 10, padding: "10px 8px", textAlign: "center"
                              }}
                            >
                              <div style={{
                                width: 22, height: 22, borderRadius: "50%",
                                backgroundColor: isCurrent ? "#39FF14" : isDone ? "#8B5CF6" : "#1F1F3A",
                                color: isCurrent ? "#000" : "#FFF",
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                fontSize: 10, fontWeight: 900, marginBottom: 6
                              }}>
                                {isDone ? "✓" : stepNum}
                              </div>
                              <p style={{ fontSize: 10, fontWeight: 800, color: isCurrent ? "#39FF14" : isDone ? "#EEEEFF" : "#5A5A7A" }}>
                                {faseNomeMap[stepNum].replace(/Fase \d — /, "")}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Dica de Abordagem Comercial */}
                      <div style={{ backgroundColor: "#0D0D1A", padding: "10px 14px", borderRadius: 10, border: "1px solid #1A1A30", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#FFB800" }}>
                          {dicaMomentoMap[emp.fase_atual]}
                        </span>

                        <button
                          onClick={() => {
                            setEmpSelecionadoOferta(emp.id);
                            setModalOfertaAberta(true);
                          }}
                          style={{
                            backgroundColor: "#8B5CF6", color: "#FFF", border: "none", padding: "6px 12px",
                            borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 4
                          }}
                        >
                          Ofertar Serviço <ArrowRight size={12} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── SUB-ABA B: BALCÃO DE OPORTUNIDADES & CANDIDATURAS ──────────── */}
          {subTabProfissional === "BALCAO_OPORTUNIDADES" && (
            <div>

              {/* VAGAS DO EMPREENDIMENTO (AÇÃO PASSIVA) */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>
                    Vagas & Demandas Abertas pelas Incorporadoras (Ação Passiva)
                  </h3>
                  <p style={{ fontSize: 13, color: "#7878A0" }}>
                    Demandas ativas de serviços postadas diretamente pelas Incorporadoras na rede TAGMOB.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
                  {servicosAbertosList.map(srv => {
                    const jaCandidatou = propostasList.some(p => p.servicoId === srv.id && p.profissionalId === perfilLogado.id);
                    return (
                      <div
                        key={srv.id}
                        style={{
                          backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16,
                          padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between"
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <span style={{ fontSize: 10, fontWeight: 900, color: "#39FF14", backgroundColor: "#39FF1415", padding: "2px 8px", borderRadius: 4 }}>
                              {srv.categoria}
                            </span>
                            <span style={{ fontSize: 11, color: "#00E5FF", fontWeight: 800 }}>Prazo: {srv.prazo || "Imediato"}</span>
                          </div>

                          <h4 style={{ fontSize: 16, fontWeight: 900, color: "#FFF", marginBottom: 6 }}>{srv.titulo}</h4>
                          <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 12 }}>
                            Empreendimento: <strong style={{ color: "#FFF" }}>{srv.empreendimentoNome}</strong> ({srv.incorporadoraNome})
                          </p>

                          <div style={{ backgroundColor: "#0D0D1A", padding: "10px 12px", borderRadius: 10, border: "1px solid #1A1A30", marginBottom: 16 }}>
                            <p style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.4 }}>{srv.descricao}</p>
                            {srv.orcamentoEst && (
                              <p style={{ fontSize: 13, fontWeight: 900, color: "#39FF14", marginTop: 8 }}>
                                Verba Prevista: R$ {srv.orcamentoEst.toLocaleString("pt-BR")}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Botão [Candidatar-se] */}
                        {jaCandidatou ? (
                          <div style={{
                            backgroundColor: "rgba(57,255,20,0.1)", border: "1px solid #39FF1440",
                            borderRadius: 10, padding: "10px", textAlign: "center", fontSize: 12, fontWeight: 800, color: "#39FF14"
                          }}>
                            ✓ CANDIDATURA ENVIADA
                          </div>
                        ) : (
                          <button
                            onClick={() => candidatarSeVaga(srv)}
                            style={{
                              backgroundColor: "#39FF14", color: "#000", border: "none",
                              borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 900, cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                              boxShadow: "0 4px 15px rgba(57,255,20,0.3)"
                            }}
                          >
                            <CheckCircle2 size={16} /> Candidatar-se a esta Vaga
                          </button>
                        )}

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* LISTA DE PROPOSTAS & OFERTAS ENVIADAS PELO PROFISSIONAL */}
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#FFF", marginBottom: 16 }}>
                  Histórico de Minhas Propostas & Ofertas Ativas Enviadas
                </h3>

                <div style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {propostasList.map(prop => (
                      <div key={prop.id} style={{ backgroundColor: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{
                              fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 4,
                              backgroundColor: prop.tipoMatch === "OFERTA_ATIVA" ? "#8B5CF620" : "#00E5FF20",
                              color: prop.tipoMatch === "OFERTA_ATIVA" ? "#8B5CF6" : "#00E5FF"
                            }}>
                              {prop.tipoMatch === "OFERTA_ATIVA" ? "OFERTA ATIVA" : "CANDIDATURA PASSIVA"}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 800, color: "#FFF" }}>{prop.empreendimentoNome}</span>
                          </div>
                          <p style={{ fontSize: 12, color: "#7878A0" }}>"{prop.mensagem}"</p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span style={{
                            fontSize: 11, fontWeight: 900, padding: "3px 10px", borderRadius: 6,
                            backgroundColor: prop.status === "ACEITA" ? "rgba(57,255,20,0.15)" : "rgba(255,184,0,0.15)",
                            color: prop.status === "ACEITA" ? "#39FF14" : "#FFB800"
                          }}>
                            {prop.status}
                          </span>
                          {prop.valorProposta && (
                            <p style={{ fontSize: 12, fontWeight: 800, color: "#39FF14", marginTop: 4 }}>
                              R$ {prop.valorProposta.toLocaleString("pt-BR")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ══ MODAL DE OFERTA COMERCIAL ATIVA ═══════════════════════════════════ */}
      {modalOfertaAberta && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300, backgroundColor: "rgba(0,0,0,0.8)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>
          <div style={{
            backgroundColor: "#111122", border: "1px solid #8B5CF6", borderRadius: 20,
            padding: 32, maxWidth: 540, width: "100%", boxShadow: "0 20px 60px rgba(139,92,246,0.3)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: "#FFF" }}>Enviar Oferta Ativa para Empreendimento</h3>
              <button onClick={() => setModalOfertaAberta(false)} style={{ background: "none", border: "none", color: "#7878A0", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={enviarOfertaAtiva}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                  Selecione o Empreendimento Alvo *
                </label>
                <select
                  value={empSelecionadoOferta}
                  onChange={e => setEmpSelecionadoOferta(e.target.value)}
                  style={{
                    width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                    borderRadius: 10, padding: "12px", color: "#FFF", fontSize: 14, outline: "none"
                  }}
                >
                  {MOCK_EMPREENDIMENTOS.map(e => (
                    <option key={e.id} value={e.id}>{e.nome} — {e.bairro} ({e.construtora})</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                  Valor Estimado da Proposta (R$)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 50000"
                  value={valorOferta}
                  onChange={e => setValorOferta(e.target.value)}
                  style={{
                    width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                    borderRadius: 10, padding: "12px", color: "#FFF", fontSize: 14, outline: "none"
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                  Mensagem / Apresentação do Serviço *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Descreva como o seu escritório ou empresa pode agregar valor a este empreendimento..."
                  value={mensagemOferta}
                  onChange={e => setMensagemOferta(e.target.value)}
                  style={{
                    width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                    borderRadius: 10, padding: "12px", color: "#FFF", fontSize: 13, outline: "none", resize: "none"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setModalOfertaAberta(false)}
                  style={{
                    backgroundColor: "#1A1A30", color: "#FFF", border: "none",
                    padding: "12px 20px", borderRadius: 10, fontWeight: 700, cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  style={{
                    backgroundColor: "#8B5CF6", color: "#FFF", border: "none",
                    padding: "12px 24px", borderRadius: 10, fontWeight: 900, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 15px rgba(139,92,246,0.4)"
                  }}
                >
                  <Send size={16} /> Enviar Proposta Ativa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
