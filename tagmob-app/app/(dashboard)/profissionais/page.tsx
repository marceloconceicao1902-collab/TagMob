"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2, Palette, ShieldCheck, CheckCircle2, ArrowRight,
  Sparkles, FileText, Globe, Tag, Award, UserCheck, Layers,
  ChevronRight, AlertCircle, Wrench, Briefcase, Compass, Search,
  Filter, Check, X, Clock, Send, Plus, ExternalLink, RefreshCw, Eye,
  Lock, Unlock, Mail, UserPlus, Users, Zap, Star, User
} from "lucide-react";
import {
  MOCK_EMPREENDIMENTOS, MOCK_PROFISSIONAIS, MOCK_SERVICOS_ABERTOS, MOCK_PROPOSTAS_MATCH
} from "@/lib/mock-data";
import {
  CategoriaProfissional, StatusHub, ProfissionalPerfil, ServicoAberto, PropostaMatch, TipoDistribuicao
} from "@/lib/types";

export default function ProfissionaisHubPage() {
  // Alternância principal de visão: ADMIN = Incorporadora / TAGMOB | PROFISSIONAL = Workspace do Profissional
  const [visaoAtiva, setVisaoAtiva] = useState<"ADMIN" | "PROFISSIONAL">("ADMIN");

  // Estado dos Profissionais (Triagem e Base Ativa)
  const [profissionaisList, setProfissionaisList] = useState<ProfissionalPerfil[]>(MOCK_PROFISSIONAIS);
  const [filtroCategoriaAdmin, setFiltroCategoriaAdmin] = useState<string>("TODOS");
  const [buscaAdmin, setBuscaAdmin] = useState<string>("");

  // Sub-abas do Painel Admin Incorporadora
  const [subTabAdmin, setSubTabAdmin] = useState<"HOMOLOGACAO" | "DEMANDAS_SERVICOS">("HOMOLOGACAO");

  // Estado da Visão do Profissional
  const [subTabProfissional, setSubTabProfissional] = useState<"FASES_PROJETOS" | "BALCAO_OPORTUNIDADES">("BALCAO_OPORTUNIDADES");
  const [servicosAbertosList, setServicosAbertosList] = useState<ServicoAberto[]>(MOCK_SERVICOS_ABERTOS);
  const [propostasList, setPropostasList] = useState<PropostaMatch[]>(MOCK_PROPOSTAS_MATCH);

  // Perfil Selecionado na Visão do Profissional (Simulação de conta logada)
  const [perfilLogado, setPerfilLogado] = useState<ProfissionalPerfil>(
    MOCK_PROFISSIONAIS.find((p: ProfissionalPerfil) => p.statusAprovacao === "APROVADO") || MOCK_PROFISSIONAIS[0]
  );

  // Filtro de tipo de oportunidade no Balcão do Profissional
  const [filtroOportunidadeProfissional, setFiltroOportunidadeProfissional] = useState<"TODAS" | "CONVITE_DIRETO" | "VAGA_ABERTA">("TODAS");

  // Modal / Form de Oferta Ativa do Profissional
  const [modalOfertaAberta, setModalOfertaAberta] = useState<boolean>(false);
  const [empSelecionadoOferta, setEmpSelecionadoOferta] = useState<string>(MOCK_EMPREENDIMENTOS[0].id);
  const [mensagemOferta, setMensagemOferta] = useState<string>("");
  const [valorOferta, setValorOferta] = useState<string>("");

  // Modal / Form de Criação de Serviço em Aberto (Incorporadora)
  const [modalCriarDemandaAberta, setModalCriarDemandaAberta] = useState<boolean>(false);
  const [novoTitulo, setNovoTitulo] = useState<string>("");
  const [novoEmpId, setNovoEmpId] = useState<string>(MOCK_EMPREENDIMENTOS[0].id);
  const [novaCategoria, setNovaCategoria] = useState<CategoriaProfissional>("MARCENEIRO");
  const [novaDescricao, setNovaDescricao] = useState<string>("");
  const [novoOrcamento, setNovoOrcamento] = useState<string>("");
  const [novoPrazo, setNovoPrazo] = useState<string>("");
  const [novoTipoDistribuicao, setNovoTipoDistribuicao] = useState<TipoDistribuicao>("ABERTO");
  const [convidadosSelecionadosIds, setConvidadosSelecionadosIds] = useState<string[]>([]);
  const [buscaModalConvite, setBuscaModalConvite] = useState<string>("");
  const [filtroCatModalConvite, setFiltroCatModalConvite] = useState<string>("TODOS");

  // Toast de feedback
  const [notificacao, setNotificacao] = useState<string | null>(null);

  function mostrarNotificacao(msg: string) {
    setNotificacao(msg);
    setTimeout(() => setNotificacao(null), 4000);
  }

  // ─── AÇÕES DE ADMIN (TRIAGEM & APROVAÇÃO) ─────────────────────────
  function aprovarProfissional(id: string) {
    setProfissionaisList((prev: ProfissionalPerfil[]) => prev.map((p: ProfissionalPerfil) => p.id === id ? { ...p, statusAprovacao: "APROVADO" } : p));
    mostrarNotificacao("Profissional aprovado e homologado na base ativa!");
  }

  function recusarProfissional(id: string) {
    setProfissionaisList((prev: ProfissionalPerfil[]) => prev.map((p: ProfissionalPerfil) => p.id === id ? { ...p, statusAprovacao: "BLOQUEADO" } : p));
    mostrarNotificacao("Cadastro do profissional recusado.");
  }

  // ─── AÇÃO DA INCORPORADORA (CRIAR SERVIÇO EM ABERTO / DEMANDA) ─────
  function alternarSelecaoConvidado(id: string) {
    setConvidadosSelecionadosIds((prev: string[]) =>
      prev.includes(id) ? prev.filter((x: string) => x !== id) : [...prev, id]
    );
  }

  function criarNovoServicoDemandado(e: React.FormEvent) {
    e.preventDefault();
    if (!novoTitulo.trim() || !novaDescricao.trim()) {
      mostrarNotificacao("Por favor, preencha o título e a descrição do serviço.");
      return;
    }

    if (novoTipoDistribuicao === "DIRECIONADO" && convidadosSelecionadosIds.length === 0) {
      mostrarNotificacao("No Modo Direcionado (Privado), selecione ao menos 1 profissional da lista de convidados.");
      return;
    }

    const emp = MOCK_EMPREENDIMENTOS.find((e: any) => e.id === novoEmpId);
    const idServico = `srv-${Date.now()}`;
    const novoServico: ServicoAberto = {
      id: idServico,
      empreendimentoId: emp?.id || novoEmpId,
      empreendimentoNome: emp?.nome || "Empreendimento TAGMOB",
      incorporadoraNome: emp?.construtora || "Incorporadora Conectada",
      bairroCidade: `${emp?.bairro || "Centro"} — ${emp?.cidade || "SP"}`,
      titulo: novoTitulo,
      categoria: novaCategoria,
      descricao: novaDescricao,
      orcamentoEst: novoOrcamento ? parseFloat(novoOrcamento) : undefined,
      prazo: novoPrazo || "A combinar",
      status: "ABERTO",
      tipoDistribuicao: novoTipoDistribuicao,
      convidadosIds: novoTipoDistribuicao === "DIRECIONADO" ? convidadosSelecionadosIds : [],
      convidados: novoTipoDistribuicao === "DIRECIONADO" ? convidadosSelecionadosIds.map((pId: string) => ({
        id: `cnv-${Date.now()}-${pId}`,
        servicoId: idServico,
        profissionalId: pId,
        statusConvite: "Enviado",
        createdAt: new Date().toISOString().split("T")[0]
      })) : [],
      createdAt: new Date().toISOString().split("T")[0],
    };

    setServicosAbertosList((prev: ServicoAberto[]) => [novoServico, ...prev]);
    setModalCriarDemandaAberta(false);

    // Reset Form
    setNovoTitulo("");
    setNovaDescricao("");
    setNovoOrcamento("");
    setNovoPrazo("");
    setNovoTipoDistribuicao("ABERTO");
    setConvidadosSelecionadosIds([]);

    const msgSucesso = novoTipoDistribuicao === "DIRECIONADO"
      ? `Serviço Direcionado criado! Convite exclusivo enviado para ${convidadosSelecionadosIds.length} profissional(is) selecionado(s).`
      : `Serviço Aberto publicado no Balcão Geral da categoria ${novaCategoria}!`;

    mostrarNotificacao(msgSucesso);
  }

  // ─── AÇÕES DO PROFISSIONAL (CANDIDATURA & OFERTA ATIVA) ───────────
  function candidatarSeVaga(servico: ServicoAberto) {
    const novaProposta: PropostaMatch = {
      id: `prop-${Date.now()}`,
      profissionalId: perfilLogado.id,
      profissionalNome: perfilLogado.nomeRazao || "Profissional",
      servicoId: servico.id,
      empreendimentoId: servico.empreendimentoId,
      empreendimentoNome: servico.empreendimentoNome,
      tipoMatch: "CANDIDATURA_PASSIVA",
      mensagem: `Proposta enviada por ${perfilLogado.nomeRazao} para "${servico.titulo}".`,
      valorProposta: servico.orcamentoEst,
      status: "EM_ANALISE",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPropostasList((prev: PropostaMatch[]) => [novaProposta, ...prev]);
    mostrarNotificacao(`Proposta enviada com sucesso para: ${servico.titulo}`);
  }

  function enviarOfertaAtiva(e: React.FormEvent) {
    e.preventDefault();
    const emp = MOCK_EMPREENDIMENTOS.find((e: any) => e.id === empSelecionadoOferta);

    const novaOferta: PropostaMatch = {
      id: `prop-${Date.now()}`,
      profissionalId: perfilLogado.id,
      profissionalNome: perfilLogado.nomeRazao || "Profissional",
      empreendimentoId: emp?.id,
      empreendimentoNome: emp?.nome,
      tipoMatch: "OFERTA_ATIVA",
      mensagem: mensagemOferta || `Oferta comercial ativa de ${perfilLogado.nomeRazao} para ${emp?.nome}.`,
      valorProposta: valorOferta ? parseFloat(valorOferta) : undefined,
      status: "ENVIADA",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPropostasList((prev: PropostaMatch[]) => [novaOferta, ...prev]);
    setModalOfertaAberta(false);
    setMensagemOferta("");
    setValorOferta("");
    mostrarNotificacao(`Oferta ativa enviada com sucesso para ${emp?.nome}!`);
  }

  // Filtros da Visão Admin
  const inscritosPendentes = profissionaisList.filter((p: ProfissionalPerfil) => p.statusAprovacao === "PENDENTE");
  const profissionaisAtivos = profissionaisList.filter((p: ProfissionalPerfil) => {
    if (p.statusAprovacao !== "APROVADO") return false;
    if (filtroCategoriaAdmin !== "TODOS" && p.categoria !== filtroCategoriaAdmin) return false;
    if (buscaAdmin && !p.nomeRazao?.toLowerCase().includes(buscaAdmin.toLowerCase()) && !p.regiaoAtuacao?.toLowerCase().includes(buscaAdmin.toLowerCase())) return false;
    return true;
  });

  // Filtro para Seleção de Convidados no Modal da Incorporadora
  const profissionaisParaConviteModal = profissionaisList.filter((p: ProfissionalPerfil) => {
    if (p.statusAprovacao !== "APROVADO") return false;
    if (filtroCatModalConvite !== "TODOS" && p.categoria !== filtroCatModalConvite) return false;
    if (buscaModalConvite && !p.nomeRazao?.toLowerCase().includes(buscaModalConvite.toLowerCase()) && !p.regiaoAtuacao?.toLowerCase().includes(buscaModalConvite.toLowerCase())) return false;
    return true;
  });

  // Visibilidade de Oportunidades para o Profissional Logado
  const oportunidadesVisiveisProfissional = servicosAbertosList.filter((srv: ServicoAberto) => {
    // REGRA DE PRIVACIDADE E VISIBILIDADE:
    // Modo DIRECIONADO: O serviço fica OCULTO para a base geral e só é visível se o profissional logado foi explicitamente convidado.
    if (srv.tipoDistribuicao === "DIRECIONADO") {
      const foiConvidado = srv.convidadosIds?.includes(perfilLogado.id);
      if (!foiConvidado) return false;
    }

    // Filtros das Abas do Balcão
    if (filtroOportunidadeProfissional === "CONVITE_DIRETO" && srv.tipoDistribuicao !== "DIRECIONADO") return false;
    if (filtroOportunidadeProfissional === "VAGA_ABERTA" && srv.tipoDistribuicao !== "ABERTO") return false;

    return true;
  });

  const qtdConvitesDiretosLogado = servicosAbertosList.filter(
    (s: ServicoAberto) => s.tipoDistribuicao === "DIRECIONADO" && s.convidadosIds?.includes(perfilLogado.id)
  ).length;

  return (
    <div style={{ padding: "28px 28px 80px", maxWidth: 1280, margin: "0 auto", color: "#EEEEFF" }}>

      {/* Toast Notificação */}
      {notificacao && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 500,
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
        flexWrap: "wrap", gap: 16, marginBottom: 28, borderBottom: "1px solid #1F1F3A", paddingBottom: 20
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#39FF14" }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: "#39FF14", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              TAGMOB OS · Hub de Conexões & Demanda sob Medida
            </p>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", color: "#FFFFFF", marginBottom: 4 }}>
            Módulo de Profissionais & Ordens de Serviços
          </h1>
          <p style={{ fontSize: 13, color: "#7878A0" }}>
            Gestão de credenciamento, concorrência dinâmica e direcionamento exclusivo de demandas.
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
            <Building2 size={16} /> Visão 1: Painel Admin / Incorporadora
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

          {/* Sub-menu do Admin */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setSubTabAdmin("HOMOLOGACAO")}
                style={{
                  padding: "10px 16px", borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: "pointer",
                  border: "1px solid",
                  backgroundColor: subTabAdmin === "HOMOLOGACAO" ? "#1F1F3A" : "#0D0D1A",
                  borderColor: subTabAdmin === "HOMOLOGACAO" ? "#8B5CF6" : "#1F1F3A",
                  color: subTabAdmin === "HOMOLOGACAO" ? "#FFF" : "#7878A0",
                  display: "flex", alignItems: "center", gap: 8
                }}
              >
                <ShieldCheck size={16} color={subTabAdmin === "HOMOLOGACAO" ? "#39FF14" : "#7878A0"} />
                Fila de Homologação ({inscritosPendentes.length}) & Base Ativa ({profissionaisAtivos.length})
              </button>

              <button
                onClick={() => setSubTabAdmin("DEMANDAS_SERVICOS")}
                style={{
                  padding: "10px 16px", borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: "pointer",
                  border: "1px solid",
                  backgroundColor: subTabAdmin === "DEMANDAS_SERVICOS" ? "#1F1F3A" : "#0D0D1A",
                  borderColor: subTabAdmin === "DEMANDAS_SERVICOS" ? "#8B5CF6" : "#1F1F3A",
                  color: subTabAdmin === "DEMANDAS_SERVICOS" ? "#FFF" : "#7878A0",
                  display: "flex", alignItems: "center", gap: 8
                }}
              >
                <Layers size={16} color={subTabAdmin === "DEMANDAS_SERVICOS" ? "#8B5CF6" : "#7878A0"} />
                Demandas & Ordens de Serviço ({servicosAbertosList.length})
              </button>
            </div>

            {/* BOTÃO PRINCIPAL: ABRIR NOVA ORDEM DE SERVIÇO */}
            <button
              onClick={() => setModalCriarDemandaAberta(true)}
              style={{
                backgroundColor: "#8B5CF6", color: "#FFFFFF", padding: "12px 20px", borderRadius: 12,
                fontWeight: 900, fontSize: 13, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 4px 20px rgba(139,92,246,0.4)"
              }}
            >
              <Plus size={18} /> Abrir Nova Ordem de Serviço / Demanda
            </button>
          </div>

          {/* SUB-ABA 1: HOMOLOGAÇÃO & BASE DE PROFISSIONAIS */}
          {subTabAdmin === "HOMOLOGACAO" && (
            <div>
              {/* SECTION 1: PAINEL DE TRIAGEM (APPROVAL PIPELINE) */}
              <div style={{ marginBottom: 36 }}>
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
                    <p style={{ fontSize: 12, color: "#7878A0", marginTop: 4 }}>Todos os profissionais inscritos já foram homologados na plataforma.</p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
                    {inscritosPendentes.map((pro: ProfissionalPerfil) => (
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
                      Profissionais aptos para direcionamento privado e convites diretos sob demanda.
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBuscaAdmin(e.target.value)}
                        style={{
                          width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                          borderRadius: 8, padding: "8px 10px 8px 30px", color: "#FFF", fontSize: 12, outline: "none"
                        }}
                      />
                    </div>

                    <select
                      value={filtroCategoriaAdmin}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltroCategoriaAdmin(e.target.value)}
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
                  {profissionaisAtivos.map((pro: ProfissionalPerfil) => (
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
                          {pro.marcasInsumos.map((m: string) => (
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

          {/* SUB-ABA 2: GESTÃO DE DEMANDAS & SERVIÇOS DA INCORPORADORA */}
          {subTabAdmin === "DEMANDAS_SERVICOS" && (
            <div>
              <div style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>
                      Ordens de Serviço & Demandas Abertas
                    </h2>
                    <p style={{ fontSize: 13, color: "#7878A0" }}>
                      Acompanhe as oportunidades publicadas e gerencie a visibilidade entre Concorrência Geral e Convites Direcionados.
                    </p>
                  </div>

                  <button
                    onClick={() => setModalCriarDemandaAberta(true)}
                    style={{
                      backgroundColor: "#39FF14", color: "#000", padding: "10px 18px", borderRadius: 10,
                      fontWeight: 900, fontSize: 12, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                      boxShadow: "0 4px 15px rgba(57,255,20,0.3)"
                    }}
                  >
                    <Plus size={16} /> Nova Ordem de Serviço
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 18 }}>
                {servicosAbertosList.map((srv: ServicoAberto) => {
                  const eDirecionado = srv.tipoDistribuicao === "DIRECIONADO";
                  const propostasDoServico = propostasList.filter((p: PropostaMatch) => p.servicoId === srv.id);

                  return (
                    <div
                      key={srv.id}
                      style={{
                        backgroundColor: "#111122",
                        border: `1px solid ${eDirecionado ? "#8B5CF680" : "#1F1F3A"}`,
                        borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between"
                      }}
                    >
                      <div>
                        {/* BADGES DE VISIBILIDADE / TIPO DE DISTRIBUIÇÃO */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                          <span style={{ fontSize: 10, fontWeight: 900, color: "#39FF14", backgroundColor: "#39FF1415", padding: "3px 8px", borderRadius: 4 }}>
                            {srv.categoria}
                          </span>

                          {eDirecionado ? (
                            <span style={{
                              fontSize: 11, fontWeight: 900, color: "#A78BFA", backgroundColor: "#8B5CF625",
                              border: "1px solid #8B5CF650", padding: "3px 10px", borderRadius: 12,
                              display: "inline-flex", alignItems: "center", gap: 4
                            }}>
                              <Lock size={12} /> MODALIDADE: DIRECIONADO (PRIVADO)
                            </span>
                          ) : (
                            <span style={{
                              fontSize: 11, fontWeight: 900, color: "#00E5FF", backgroundColor: "#00E5FF15",
                              border: "1px solid #00E5FF40", padding: "3px 10px", borderRadius: 12,
                              display: "inline-flex", alignItems: "center", gap: 4
                            }}>
                              <Globe size={12} /> MODALIDADE: ABERTO (PÚBLICO)
                            </span>
                          )}
                        </div>

                        <h3 style={{ fontSize: 17, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>{srv.titulo}</h3>
                        <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 12 }}>
                          Empreendimento: <strong style={{ color: "#FFF" }}>{srv.empreendimentoNome}</strong> ({srv.incorporadoraNome})
                        </p>

                        <div style={{ backgroundColor: "#0D0D1A", padding: "12px", borderRadius: 10, border: "1px solid #1A1A30", marginBottom: 14 }}>
                          <p style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.4 }}>{srv.descricao}</p>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 8, borderTop: "1px solid #1A1A30" }}>
                            <span style={{ fontSize: 11, color: "#7878A0" }}>Prazo: <strong style={{ color: "#FFF" }}>{srv.prazo || "Imediato"}</strong></span>
                            {srv.orcamentoEst && (
                              <span style={{ fontSize: 13, fontWeight: 900, color: "#39FF14" }}>
                                R$ {srv.orcamentoEst.toLocaleString("pt-BR")}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* LISTA DE CONVIDADOS DIRETO (SE FOR DIRECIONADO) */}
                        {eDirecionado && (
                          <div style={{ backgroundColor: "#8B5CF610", border: "1px solid #8B5CF630", padding: 10, borderRadius: 10, marginBottom: 14 }}>
                            <p style={{ fontSize: 11, fontWeight: 800, color: "#A78BFA", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                              <UserCheck size={12} /> Profissionais Convidados Exclusivos ({srv.convidadosIds?.length || 0}):
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {srv.convidadosIds?.map((pId: string) => {
                                const pObj = profissionaisList.find((x: ProfissionalPerfil) => x.id === pId);
                                return (
                                  <span key={pId} style={{ fontSize: 10, fontWeight: 700, backgroundColor: "#8B5CF630", color: "#FFF", padding: "3px 8px", borderRadius: 6 }}>
                                    👤 {pObj?.nomeRazao || pId}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* PROPOSTAS RECEBIDAS */}
                      <div style={{ borderTop: "1px solid #1F1F3A", paddingTop: 12, marginTop: 4 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 12, fontWeight: 800, color: "#FFF" }}>
                            Propostas Recebidas: <strong style={{ color: "#39FF14" }}>{propostasDoServico.length}</strong>
                          </span>
                          <span style={{ fontSize: 11, color: "#7878A0" }}>Status: {srv.status}</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 💼 VISÃO 2: WORKSPACE DO PROFISSIONAL (PARCEIRO INSCRITO)              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {visaoAtiva === "PROFISSIONAL" && (
        <div>

          {/* CHAVE DE SIMULAÇÃO DE PERFIL LOGADO DO PROFISSIONAL */}
          <div style={{
            backgroundColor: "#111122", border: "1px solid #39FF1440", borderRadius: 16, padding: "14px 20px",
            marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
            boxShadow: "0 4px 20px rgba(57,255,20,0.06)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", backgroundColor: "#39FF1420",
                display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #39FF14"
              }}>
                <User size={20} color="#39FF14" />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, color: "#39FF14", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Simulação de Perfil de Profissional Logado
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#FFF" }}>
                  {perfilLogado.nomeRazao} <span style={{ fontSize: 12, color: "#8B5CF6", fontWeight: 700 }}>({perfilLogado.categoria})</span>
                </h3>
              </div>
            </div>

            {/* SELETOR PARA ALTERNAR O PERFIL SIMULADO */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, color: "#7878A0", fontWeight: 700 }}>Alternar Perfil:</span>
              <select
                value={perfilLogado.id}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const pro = profissionaisList.find((p: ProfissionalPerfil) => p.id === e.target.value);
                  if (pro) setPerfilLogado(pro);
                }}
                style={{
                  backgroundColor: "#0D0D1A", color: "#39FF14", border: "1px solid #39FF1450",
                  borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 800, outline: "none", cursor: "pointer"
                }}
              >
                {profissionaisList.filter((p: ProfissionalPerfil) => p.statusAprovacao === "APROVADO").map((p: ProfissionalPerfil) => (
                  <option key={p.id} value={p.id}>
                    {p.nomeRazao} — {p.categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sub-Abas do Workspace do Profissional */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1F1F3A", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setSubTabProfissional("BALCAO_OPORTUNIDADES")}
                style={{
                  padding: "12px 18px", borderRadius: "10px 10px 0 0",
                  fontSize: 13, fontWeight: 800, cursor: "pointer", border: "none",
                  backgroundColor: subTabProfissional === "BALCAO_OPORTUNIDADES" ? "#111122" : "transparent",
                  color: subTabProfissional === "BALCAO_OPORTUNIDADES" ? "#39FF14" : "#7878A0",
                  borderBottom: subTabProfissional === "BALCAO_OPORTUNIDADES" ? "3px solid #39FF14" : "3px solid transparent",
                  display: "flex", alignItems: "center", gap: 8
                }}
              >
                💼 Balcão de Oportunidades & Convites ({oportunidadesVisiveisProfissional.length})
                {qtdConvitesDiretosLogado > 0 && (
                  <span style={{ fontSize: 10, fontWeight: 900, backgroundColor: "#8B5CF6", color: "#FFF", padding: "2px 7px", borderRadius: 10 }}>
                    {qtdConvitesDiretosLogado} Convites Diretos!
                  </span>
                )}
              </button>

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
                📊 Monitor de Fases dos Lançamentos
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

          {/* ── SUB-ABA B: BALCÃO DE OPORTUNIDADES & CANDIDATURAS ──────────── */}
          {subTabProfissional === "BALCAO_OPORTUNIDADES" && (
            <div>

              {/* FILTROS DO BALCÃO DE SERVIÇOS (CONVITES DIRETO vs VAGAS ABERTAS) */}
              <div style={{
                backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 20, marginBottom: 24,
                display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
              }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: "#FFF", marginBottom: 2 }}>
                    Balcão de Oportunidades & Demandas de Incorporadoras
                  </h3>
                  <p style={{ fontSize: 12, color: "#7878A0" }}>
                    Visualização filtrada por permissão e convites exclusivos para o seu perfil.
                  </p>
                </div>

                {/* FILTROS PILL */}
                <div style={{ display: "flex", gap: 8, backgroundColor: "#0D0D1A", padding: 4, borderRadius: 10, border: "1px solid #1F1F3A" }}>
                  <button
                    onClick={() => setFiltroOportunidadeProfissional("TODAS")}
                    style={{
                      padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: "pointer", border: "none",
                      backgroundColor: filtroOportunidadeProfissional === "TODAS" ? "#1F1F3A" : "transparent",
                      color: filtroOportunidadeProfissional === "TODAS" ? "#FFF" : "#7878A0",
                    }}
                  >
                    Todas ({oportunidadesVisiveisProfissional.length})
                  </button>

                  <button
                    onClick={() => setFiltroOportunidadeProfissional("CONVITE_DIRETO")}
                    style={{
                      padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: "pointer", border: "none",
                      backgroundColor: filtroOportunidadeProfissional === "CONVITE_DIRETO" ? "#8B5CF6" : "transparent",
                      color: filtroOportunidadeProfissional === "CONVITE_DIRETO" ? "#FFF" : "#A78BFA",
                      display: "flex", alignItems: "center", gap: 6
                    }}
                  >
                    <Zap size={13} fill="#A78BFA" /> ⚡ Convites Diretos ({qtdConvitesDiretosLogado})
                  </button>

                  <button
                    onClick={() => setFiltroOportunidadeProfissional("VAGA_ABERTA")}
                    style={{
                      padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: "pointer", border: "none",
                      backgroundColor: filtroOportunidadeProfissional === "VAGA_ABERTA" ? "#39FF14" : "transparent",
                      color: filtroOportunidadeProfissional === "VAGA_ABERTA" ? "#000" : "#7878A0",
                      display: "flex", alignItems: "center", gap: 6
                    }}
                  >
                    <Globe size={13} /> 🌐 Vagas Abertas
                  </button>
                </div>
              </div>

              {/* GRID DE OPORTUNIDADES VISÍVEIS */}
              {oportunidadesVisiveisProfissional.length === 0 ? (
                <div style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 40, textAlign: "center", marginBottom: 40 }}>
                  <AlertCircle size={36} color="#7878A0" style={{ margin: "0 auto 12px" }} />
                  <p style={{ fontSize: 15, fontWeight: 800, color: "#FFF" }}>Nenhuma oportunidade encontrada com este filtro.</p>
                  <p style={{ fontSize: 12, color: "#7878A0", marginTop: 4 }}>
                    Se a Incorporadora cadastrou um serviço no modo Privado (Direcionado), apenas os profissionais convidados visualizam o item.
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(370px, 1fr))", gap: 18, marginBottom: 40 }}>
                  {oportunidadesVisiveisProfissional.map((srv: ServicoAberto) => {
                    const eConviteDireto = srv.tipoDistribuicao === "DIRECIONADO";
                    const jaCandidatou = propostasList.some((p: PropostaMatch) => p.servicoId === srv.id && p.profissionalId === perfilLogado.id);

                    return (
                      <div
                        key={srv.id}
                        style={{
                          backgroundColor: "#111122",
                          border: `1px solid ${eConviteDireto ? "#8B5CF6" : "#1F1F3A"}`,
                          borderRadius: 18,
                          padding: 22,
                          display: "flex", flexDirection: "column", justifyContent: "space-between",
                          position: "relative", overflow: "hidden",
                          boxShadow: eConviteDireto ? "0 8px 30px rgba(139,92,246,0.18)" : "none"
                        }}
                      >
                        {/* BANNER REFORÇADO DE CONVITE DIRETO */}
                        {eConviteDireto && (
                          <div style={{
                            backgroundColor: "#8B5CF6", color: "#FFFFFF", fontSize: 11, fontWeight: 900,
                            padding: "6px 14px", margin: "-22px -22px 16px -22px",
                            display: "flex", alignItems: "center", justifyContent: "space-between"
                          }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <Zap size={14} fill="#FFF" /> ⚡ CONVITE DIRETO EXCLUSIVO — SUA EMPRESA FOI SELECIONADA
                            </span>
                            <span style={{ fontSize: 9, backgroundColor: "#FFF", color: "#8B5CF6", padding: "1px 6px", borderRadius: 4, textTransform: "uppercase" }}>
                              Prioridade Alta
                            </span>
                          </div>
                        )}

                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <span style={{ fontSize: 10, fontWeight: 900, color: "#39FF14", backgroundColor: "#39FF1415", padding: "2px 8px", borderRadius: 4 }}>
                              {srv.categoria}
                            </span>

                            {!eConviteDireto && (
                              <span style={{ fontSize: 10, fontWeight: 800, color: "#00E5FF", backgroundColor: "#00E5FF15", padding: "2px 8px", borderRadius: 4 }}>
                                🌐 VAGA ABERTA (CONCORRÊNCIA)
                              </span>
                            )}

                            <span style={{ fontSize: 11, color: "#00E5FF", fontWeight: 800 }}>Prazo: {srv.prazo || "Imediato"}</span>
                          </div>

                          <h4 style={{ fontSize: 17, fontWeight: 900, color: "#FFF", marginBottom: 6 }}>{srv.titulo}</h4>
                          <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 12 }}>
                            Empreendimento: <strong style={{ color: "#FFF" }}>{srv.empreendimentoNome}</strong> ({srv.incorporadoraNome})
                          </p>

                          <div style={{ backgroundColor: "#0D0D1A", padding: "12px", borderRadius: 12, border: "1px solid #1A1A30", marginBottom: 16 }}>
                            <p style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.4 }}>{srv.descricao}</p>
                            {srv.orcamentoEst && (
                              <p style={{ fontSize: 13, fontWeight: 900, color: "#39FF14", marginTop: 8 }}>
                                Verba Prevista: R$ {srv.orcamentoEst.toLocaleString("pt-BR")}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* BOTÃO DE RESPOSTA / CANDIDATURA */}
                        {jaCandidatou ? (
                          <div style={{
                            backgroundColor: "rgba(57,255,20,0.1)", border: "1px solid #39FF1440",
                            borderRadius: 12, padding: "12px", textAlign: "center", fontSize: 12, fontWeight: 800, color: "#39FF14"
                          }}>
                            ✓ PROPOSTA / RESPOSTA ENVIADA À INCORPORADORA
                          </div>
                        ) : (
                          <button
                            onClick={() => candidatarSeVaga(srv)}
                            style={{
                              backgroundColor: eConviteDireto ? "#8B5CF6" : "#39FF14",
                              color: eConviteDireto ? "#FFF" : "#000",
                              border: "none",
                              borderRadius: 12, padding: "13px", fontSize: 13, fontWeight: 900, cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                              boxShadow: eConviteDireto ? "0 4px 15px rgba(139,92,246,0.4)" : "0 4px 15px rgba(57,255,20,0.3)"
                            }}
                          >
                            <Send size={16} /> {eConviteDireto ? "Aceitar Convite & Enviar Proposta Exclusiva" : "Candidatar-se a esta Vaga"}
                          </button>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}

              {/* LISTA DE PROPOSTAS & OFERTAS ENVIADAS PELO PROFISSIONAL */}
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#FFF", marginBottom: 16 }}>
                  Histórico de Minhas Propostas & Ofertas Ativas Enviadas
                </h3>

                <div style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {propostasList.filter((p: PropostaMatch) => p.profissionalId === perfilLogado.id).length === 0 ? (
                      <p style={{ fontSize: 12, color: "#7878A0", textAlign: "center", padding: "12px 0" }}>
                        Você ainda não enviou propostas para o perfil {perfilLogado.nomeRazao}.
                      </p>
                    ) : (
                      propostasList.filter((p: PropostaMatch) => p.profissionalId === perfilLogado.id).map((prop: PropostaMatch) => (
                        <div key={prop.id} style={{ backgroundColor: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <span style={{
                                fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 4,
                                backgroundColor: prop.tipoMatch === "OFERTA_ATIVA" ? "#8B5CF620" : "#00E5FF20",
                                color: prop.tipoMatch === "OFERTA_ATIVA" ? "#8B5CF6" : "#00E5FF"
                              }}>
                                {prop.tipoMatch === "OFERTA_ATIVA" ? "OFERTA ATIVA" : "CANDIDATURA"}
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
                      ))
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── SUB-ABA A: MONITOR DE PROJETOS EM ANDAMENTO (FASES) ────────── */}
          {subTabProfissional === "FASES_PROJETOS" && (
            <div>
              <div style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16, padding: 20, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>
                  Linha do Tempo de Fases dos Empreendimentos TAGMOB
                </h3>
                <p style={{ fontSize: 13, color: "#7878A0" }}>
                  Acompanhe a fase de cada lançamento para abordar a Incorporadora no momento exato de decisão.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {MOCK_EMPREENDIMENTOS.map((emp: any) => {
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
                        {[1, 2, 3, 4, 5].map((stepNum: number) => {
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

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 🛠️ MODAL 1: ABRIR NOVA ORDEM DE SERVIÇO / DEMANDA (INCORPORADORA)      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {modalCriarDemandaAberta && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 400, backgroundColor: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>
          <div style={{
            backgroundColor: "#111122", border: "1px solid #8B5CF6", borderRadius: 20,
            padding: 32, maxWidth: 640, width: "100%", maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 20px 60px rgba(139,92,246,0.3)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: "#FFF" }}>Cadastrar Novo Serviço em Aberto</h3>
                <p style={{ fontSize: 12, color: "#7878A0" }}>Defina as regras de concorrência e visibilidade para os parceiros</p>
              </div>
              <button onClick={() => setModalCriarDemandaAberta(false)} style={{ background: "none", border: "none", color: "#7878A0", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={criarNovoServicoDemandado}>
              {/* TÍTULO E CATEGORIA */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                    Título do Serviço / Demanda *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Marcenaria Fina do Decorado"
                    value={novoTitulo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNovoTitulo(e.target.value)}
                    style={{
                      width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                      borderRadius: 10, padding: "10px 12px", color: "#FFF", fontSize: 13, outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                    Categoria do Profissional *
                  </label>
                  <select
                    value={novaCategoria}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNovaCategoria(e.target.value as CategoriaProfissional)}
                    style={{
                      width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                      borderRadius: 10, padding: "10px 12px", color: "#FFF", fontSize: 13, outline: "none"
                    }}
                  >
                    <option value="ARQUITETO">Arquitetos</option>
                    <option value="DESIGNER_INTERIORES">Designers de Interiores</option>
                    <option value="MARCENEIRO">Marceneiros</option>
                    <option value="EMPRESA_REFORMA">Empresas de Reforma</option>
                    <option value="CORRETOR">Corretores</option>
                    <option value="ENGENHEIRO">Engenheiros</option>
                  </select>
                </div>
              </div>

              {/* EMPREENDIMENTO E VERBA */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                    Empreendimento *
                  </label>
                  <select
                    value={novoEmpId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNovoEmpId(e.target.value)}
                    style={{
                      width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                      borderRadius: 10, padding: "10px 12px", color: "#FFF", fontSize: 13, outline: "none"
                    }}
                  >
                    {MOCK_EMPREENDIMENTOS.map((e: any) => (
                      <option key={e.id} value={e.id}>{e.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                    Verba Prevista (R$)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 85000"
                    value={novoOrcamento}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNovoOrcamento(e.target.value)}
                    style={{
                      width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                      borderRadius: 10, padding: "10px 12px", color: "#FFF", fontSize: 13, outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                    Prazo de Entrega
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 30 dias"
                    value={novoPrazo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNovoPrazo(e.target.value)}
                    style={{
                      width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                      borderRadius: 10, padding: "10px 12px", color: "#FFF", fontSize: 13, outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* DESCRIÇÃO DO SERVIÇO */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                  Descrição / Escopo Técnico do Serviço *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detalhe os requisitos, prazos e especificações para execução..."
                  value={novaDescricao}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNovaDescricao(e.target.value)}
                  style={{
                    width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                    borderRadius: 10, padding: "10px 12px", color: "#FFF", fontSize: 13, outline: "none", resize: "none"
                  }}
                />
              </div>

              {/* ════ CHAVE DE VISIBILIDADE / TIPO DE DISTRIBUIÇÃO ════ */}
              <div style={{
                backgroundColor: "#0D0D1A", border: "1px solid #2D2D50", borderRadius: 14, padding: 18, marginBottom: 20
              }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#FFF", marginBottom: 8 }}>
                  🎯 Tipo de Distribuição & Visibilidade da Demanda
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  {/* Opção A: Aberto */}
                  <div
                    onClick={() => setNovoTipoDistribuicao("ABERTO")}
                    style={{
                      border: `2px solid ${novoTipoDistribuicao === "ABERTO" ? "#39FF14" : "#1F1F3A"}`,
                      backgroundColor: novoTipoDistribuicao === "ABERTO" ? "#39FF1410" : "#111122",
                      borderRadius: 12, padding: 14, cursor: "pointer", transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <Globe size={16} color={novoTipoDistribuicao === "ABERTO" ? "#39FF14" : "#7878A0"} />
                      <strong style={{ fontSize: 13, color: novoTipoDistribuicao === "ABERTO" ? "#39FF14" : "#FFF" }}>
                        Opção A: Modo Aberto
                      </strong>
                    </div>
                    <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.3 }}>
                      Concorrência Geral: publicado no Balcão de Oportunidades. Todos os profissionais da categoria visualizam.
                    </p>
                  </div>

                  {/* Opção B: Direcionado */}
                  <div
                    onClick={() => setNovoTipoDistribuicao("DIRECIONADO")}
                    style={{
                      border: `2px solid ${novoTipoDistribuicao === "DIRECIONADO" ? "#8B5CF6" : "#1F1F3A"}`,
                      backgroundColor: novoTipoDistribuicao === "DIRECIONADO" ? "#8B5CF615" : "#111122",
                      borderRadius: 12, padding: 14, cursor: "pointer", transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <Lock size={16} color={novoTipoDistribuicao === "DIRECIONADO" ? "#A78BFA" : "#7878A0"} />
                      <strong style={{ fontSize: 13, color: novoTipoDistribuicao === "DIRECIONADO" ? "#A78BFA" : "#FFF" }}>
                        Opção B: Modo Direcionado
                      </strong>
                    </div>
                    <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.3 }}>
                      Profissionais Específicos: Oculto para a base geral. Apenas os profissionais selecionados recebem o convite.
                    </p>
                  </div>
                </div>

                {/* PAINEL DE SELEÇÃO DE PROFISSIONAIS (EXIBIDO QUANDO MODO DIRECIONADO) */}
                {novoTipoDistribuicao === "DIRECIONADO" && (
                  <div style={{ borderTop: "1px solid #1F1F3A", paddingTop: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: "#A78BFA" }}>
                        Selecione os Profissionais Convidados ({convidadosSelecionadosIds.length} selecionado(s)):
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                      <input
                        type="text"
                        placeholder="Filtrar por nome..."
                        value={buscaModalConvite}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBuscaModalConvite(e.target.value)}
                        style={{
                          flex: 1, backgroundColor: "#111122", border: "1px solid #2D2D50",
                          borderRadius: 8, padding: "6px 10px", color: "#FFF", fontSize: 12
                        }}
                      />
                      <select
                        value={filtroCatModalConvite}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltroCatModalConvite(e.target.value)}
                        style={{
                          backgroundColor: "#111122", color: "#FFF", border: "1px solid #2D2D50",
                          borderRadius: 8, padding: "6px 10px", fontSize: 11, outline: "none"
                        }}
                      >
                        <option value="TODOS">Todas Categorias</option>
                        <option value="ARQUITETO">Arquitetos</option>
                        <option value="MARCENEIRO">Marceneiros</option>
                        <option value="DESIGNER_INTERIORES">Designers</option>
                        <option value="EMPRESA_REFORMA">Reforma</option>
                      </select>
                    </div>

                    {/* LISTA DE CHECKBOXES COM AVATARES */}
                    <div style={{ maxHeight: 180, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingRight: 4 }}>
                      {profissionaisParaConviteModal.length === 0 ? (
                        <p style={{ fontSize: 11, color: "#7878A0" }}>Nenhum profissional encontrado.</p>
                      ) : (
                        profissionaisParaConviteModal.map((pro: ProfissionalPerfil) => {
                          const estaSelecionado = convidadosSelecionadosIds.includes(pro.id);
                          return (
                            <label
                              key={pro.id}
                              style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: "8px 12px", borderRadius: 10, cursor: "pointer",
                                backgroundColor: estaSelecionado ? "#8B5CF625" : "#111122",
                                border: `1px solid ${estaSelecionado ? "#8B5CF6" : "#1F1F3A"}`
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <input
                                  type="checkbox"
                                  checked={estaSelecionado}
                                  onChange={() => alternarSelecaoConvidado(pro.id)}
                                  style={{ cursor: "pointer", width: 16, height: 16, accentColor: "#8B5CF6" }}
                                />
                                <div style={{
                                  width: 30, height: 30, borderRadius: "50%", backgroundColor: "#1F1F3A",
                                  display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 11, fontWeight: 900
                                }}>
                                  {pro.nomeRazao?.substring(0, 2).toUpperCase() || "PR"}
                                </div>
                                <div>
                                  <p style={{ fontSize: 12, fontWeight: 800, color: "#FFF" }}>{pro.nomeRazao}</p>
                                  <p style={{ fontSize: 10, color: "#7878A0" }}>{pro.categoria} · 📍 {pro.regiaoAtuacao}</p>
                                </div>
                              </div>

                              <span style={{ fontSize: 10, color: "#A78BFA", backgroundColor: "#8B5CF615", padding: "2px 6px", borderRadius: 4 }}>
                                {pro.registroPro || "Homologado"}
                              </span>
                            </label>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* BOTOES MODAL */}
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setModalCriarDemandaAberta(false)}
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
                  <Plus size={16} /> Publicar Demanda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ MODAL 2: DE OFERTA COMERCIAL ATIVA ═══════════════════════════════════ */}
      {modalOfertaAberta && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 400, backgroundColor: "rgba(0,0,0,0.8)",
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
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmpSelecionadoOferta(e.target.value)}
                  style={{
                    width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #2D2D50",
                    borderRadius: 10, padding: "12px", color: "#FFF", fontSize: 14, outline: "none"
                  }}
                >
                  {MOCK_EMPREENDIMENTOS.map((e: any) => (
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValorOferta(e.target.value)}
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
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMensagemOferta(e.target.value)}
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
