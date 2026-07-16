"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, Filter, Plus, User, Clock, ChevronRight,
  DollarSign, AlertCircle, Mail, Phone, Star, Send,
  Calendar, MessageSquare, ArrowLeft, Check, Share2,
  Settings2, PlusCircle, ArrowUpRight, CheckCircle2,
} from "lucide-react";
import { LEAD_STATUS_LABELS, ACTIVITY_TYPE_LABELS } from "@/lib/crm";

export interface CrmLead {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  empresa: string | null;
  mensagem: string | null;
  orcamentoEstimado: number | null;
  status: string;
  source: string;
  prioridade: number;
  score: number;
  assignedTo: string;
  createdAt: string;
}

// Mock Inicial de Leads (CRM)
const INITIAL_LEADS: CrmLead[] = [
  {
    id: "lead-101",
    nome: "Carlos Eduardo Santos",
    email: "carlos.eduardo@email.com",
    telefone: "11988887777",
    empresa: "Santos & Cia Construtora",
    mensagem: "Gostaria de agendar uma apresentação comercial do TagMob OS para nosso próximo lançamento em Pinheiros.",
    orcamentoEstimado: 120000,
    status: "NOVO",
    source: "LANDING",
    prioridade: 1,
    score: 85,
    assignedTo: "Fernanda Lima",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 horas atrás
  },
  {
    id: "lead-102",
    nome: "Beatriz M. Rezende",
    email: "beatriz.rezende@corporativo.com",
    telefone: "11977776666",
    empresa: "Rezende Empreendimentos",
    mensagem: "Estou interessada em contratar o pacote ENTERPRISE para 3 lançamentos simultâneos.",
    orcamentoEstimado: 380000,
    status: "EM_ATENDIMENTO",
    source: "INDICACAO",
    prioridade: 1,
    score: 95,
    assignedTo: "João Pedro",
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(), // 28 horas atrás
  },
  {
    id: "lead-103",
    nome: "Roberto G. Albuquerque",
    email: "roberto.albuquerque@outlook.com",
    telefone: "21966665555",
    empresa: "RGA Incorporadora",
    mensagem: "Solicito contato urgente para alinhamento de briefing sobre o design system do edifício Vista Mar.",
    orcamentoEstimado: 95000,
    status: "QUALIFICADO",
    source: "OUTBOUND",
    prioridade: 2,
    score: 72,
    assignedTo: "Fernanda Lima",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 dias atrás
  },
];

// Mock de Eventos da Linha do Tempo
const INITIAL_EVENTS = [
  {
    id: "evt-1",
    leadId: "lead-101",
    type: "STAGE_CHANGE",
    title: "Lead Criado",
    description: "Lead capturado via Landing Page pública do TagMob.",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    createdByUser: "Sistema TagMob",
  },
  {
    id: "evt-2",
    leadId: "lead-102",
    type: "STAGE_CHANGE",
    title: "Lead Criado",
    description: "Lead inserido por indicação do parceiro comercial.",
    createdAt: new Date(Date.now() - 3600000 * 29).toISOString(),
    createdByUser: "Fernanda Lima",
  },
  {
    id: "evt-3",
    leadId: "lead-102",
    type: "STAGE_CHANGE",
    title: "Alteração de Fase",
    description: "Fase alterada de 'Novo' para 'Em Atendimento'.",
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    createdByUser: "João Pedro",
  },
  {
    id: "evt-4",
    leadId: "lead-102",
    type: "NOTE",
    title: "Anotação de Reunião",
    description: "Cliente deseja customizar a identidade visual e o material impresso. Demonstrou interesse no Combo Opcional de Vídeo Reels.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    createdByUser: "João Pedro",
  },
];

export default function LeadsCrmPage() {
  const [leads, setLeads] = useState<CrmLead[]>(INITIAL_LEADS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  
  // Estados de formulário e modal
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  
  // Novo Lead Form
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadCompany, setNewLeadCompany] = useState("");
  const [newLeadMessage, setNewLeadMessage] = useState("");
  const [newLeadBudget, setNewLeadBudget] = useState("");
  
  // Configuração Distribuidor (Round-Robin)
  const [isRoundRobinActive, setIsRoundRobinActive] = useState(true);
  const [activeTab, setActiveTab] = useState("pipeline"); // "pipeline" | "settings"
  
  // Template de WhatsApp
  const [selectedTemplate, setSelectedTemplate] = useState("welcome");
  
  const selectedLead = leads.find(l => l.id === selectedLeadId);

  // Auto-selecionar primeiro lead se nenhum selecionado para exibir timeline no painel lateral
  useEffect(() => {
    if (leads.length > 0 && !selectedLeadId) {
      setSelectedLeadId(leads[0].id);
    }
  }, [leads, selectedLeadId]);

  // Formatar Moeda
  function formatBRL(v: number) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  }

  // Avançar fase do lead
  const handleAdvanceStage = (leadId: string) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        let nextStatus = lead.status;
        if (lead.status === "NOVO") nextStatus = "EM_ATENDIMENTO";
        else if (lead.status === "EM_ATENDIMENTO") nextStatus = "QUALIFICADO";
        
        // Log timeline event
        const newEvt = {
          id: `evt-${Date.now()}`,
          leadId: lead.id,
          type: "STAGE_CHANGE",
          title: "Alteração de Fase",
          description: `Fase alterada de '${LEAD_STATUS_LABELS[lead.status]}' para '${LEAD_STATUS_LABELS[nextStatus]}'.`,
          createdAt: new Date().toISOString(),
          createdByUser: "João Pedro",
        };
        setEvents(prevEvt => [newEvt, ...prevEvt]);
        
        return { ...lead, status: nextStatus };
      }
      return lead;
    }));
  };

  // Adicionar Anotação na Timeline
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedLeadId) return;

    const newEvt = {
      id: `evt-${Date.now()}`,
      leadId: selectedLeadId,
      type: "NOTE",
      title: "Nota de Acompanhamento",
      description: noteText,
      createdAt: new Date().toISOString(),
      createdByUser: "João Pedro", // Usuário logado simulado
    };

    setEvents(prev => [newEvt, ...prev]);
    setNoteText("");
  };

  // Adicionar Novo Lead Manualmente
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadEmail) return;

    const newId = `lead-${Date.now()}`;
    const newLead = {
      id: newId,
      nome: newLeadName,
      email: newLeadEmail,
      telefone: newLeadPhone || null,
      empresa: newLeadCompany || null,
      mensagem: newLeadMessage || null,
      orcamentoEstimado: newLeadBudget ? Number(newLeadBudget) : null,
      status: "NOVO",
      source: "OUTBOUND",
      prioridade: 2,
      score: Math.floor(Math.random() * 40) + 50, // Score IA aleatório de 50 a 90
      assignedTo: isRoundRobinActive ? (leads.length % 2 === 0 ? "Fernanda Lima" : "João Pedro") : "Sem Atribuição",
      createdAt: new Date().toISOString(),
    };

    setLeads(prev => [newLead, ...prev]);
    
    // Log timeline event
    const newEvt = {
      id: `evt-${Date.now()}`,
      leadId: newId,
      type: "STAGE_CHANGE",
      title: "Lead Criado Manualmente",
      description: `Lead adicionado ao pipeline. Atribuído a ${newLead.assignedTo}.`,
      createdAt: new Date().toISOString(),
      createdByUser: "João Pedro",
    };
    setEvents(prev => [newEvt, ...prev]);

    // Limpar form e fechar modal
    setNewLeadName("");
    setNewLeadEmail("");
    setNewLeadPhone("");
    setNewLeadCompany("");
    setNewLeadMessage("");
    setNewLeadBudget("");
    setShowAddLeadModal(false);
    setSelectedLeadId(newId);
  };

  // Gerar link e logar WhatsApp
  const handleSendWhatsApp = () => {
    if (!selectedLead) return;
    
    const phoneClean = selectedLead.telefone ? selectedLead.telefone.replace(/\D/g, "") : "";
    let message = "";

    if (selectedTemplate === "welcome") {
      message = `Olá ${selectedLead.nome}, aqui é o João da TAGMOB! Recebemos sua mensagem de interesse no TagMob OS para a empresa ${selectedLead.empresa || "sua construtora"}. Gostaria de agendar uma rápida demonstração de 15 minutos esta semana?`;
    } else if (selectedTemplate === "followup") {
      message = `Oi ${selectedLead.nome}, tudo bem? Estou passando para dar um follow-up sobre a proposta que conversamos. Conseguiu dar uma olhada com o time técnico?`;
    } else {
      message = `Prezado ${selectedLead.nome}, gostaria de confirmar nossa reunião de apresentação estratégica agendada. Segue o link de acesso ao Zoom: https://zoom.us/j/tagmob-room`;
    }

    const waUrl = `https://api.whatsapp.com/send?phone=55${phoneClean}&text=${encodeURIComponent(message)}`;
    
    // Log timeline event
    const newEvt = {
      id: `evt-${Date.now()}`,
      leadId: selectedLead.id,
      type: "WHATSAPP_SENT",
      title: "WhatsApp Enviado",
      description: `Disparo manual realizado. Mensagem: "${message.substring(0, 100)}..."`,
      createdAt: new Date().toISOString(),
      createdByUser: "João Pedro",
    };
    setEvents(prev => [newEvt, ...prev]);
    setShowWhatsAppModal(false);

    // Abrir link em nova aba
    window.open(waUrl, "_blank");
  };

  // Filtrar eventos do lead selecionado
  const filteredEvents = events.filter(e => e.leadId === selectedLeadId);

  return (
    <div style={{ minHeight: "100vh", background: "#09090F", display: "flex", flexDirection: "column" }}>
      
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #0D0D1A 0%, #09090F 60%, #FF006804 100%)",
        borderBottom: "1px solid #1A1A30", padding: "28px 36px 18px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#FF006815", border: "1px solid #FF006830", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={16} color="#FF0068" />
              </div>
              <div>
                <p style={{ fontSize: 9, color: "#7878A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Módulo de Relacionamento
                </p>
                <h1 style={{ fontSize: 20, fontWeight: 950, color: "#EEEEFF", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  CRM de Leads & Prospecção
                </h1>
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#7878A0", maxWidth: 600 }}>
              Gerencie contatos vindos de landing pages, controle fila round-robin, dispare mensagens rápidas e visualize o histórico na timeline.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setActiveTab(activeTab === "pipeline" ? "settings" : "pipeline")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "9px 15px", background: "#111120", color: "#7878A0",
                borderRadius: 8, border: "1px solid #1A1A30", fontSize: 12, fontWeight: 700,
                cursor: "pointer", transition: "all 0.12s",
              }}
            >
              <Settings2 size={13} />
              {activeTab === "pipeline" ? "Distribuidor" : "Voltar ao Funil"}
            </button>
            <button
              onClick={() => setShowAddLeadModal(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "9px 16px", background: "#FF0068", color: "#fff",
                borderRadius: 8, border: "none", fontSize: 12, fontWeight: 700,
                boxShadow: "0 0 16px #FF006830", cursor: "pointer",
              }}
            >
              <Plus size={13} />
              Novo Lead
            </button>
          </div>
        </div>

        {/* Mini tabs */}
        <div style={{ display: "flex", gap: 15, fontSize: 12, borderTop: "1px solid #1A1A30", paddingTop: 10 }}>
          <span style={{ color: "#39FF14", fontWeight: 700 }}>● {leads.length} Leads Ativos</span>
          <span style={{ color: "#7878A0" }}>|</span>
          <span style={{ color: "#7878A0" }}>Distribuição Round-Robin: <strong style={{ color: isRoundRobinActive ? "#00E5FF" : "#FFB800" }}>{isRoundRobinActive ? "ATIVADO" : "DESATIVADO"}</strong></span>
        </div>
      </div>

      {/* ── CONTEÚDO PRINCIPAL ───────────────────────────────────────────── */}
      {activeTab === "pipeline" ? (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          
          {/* Colunas do Kanban */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, padding: 24, overflowY: "auto" }}>
            
            {/* Coluna 1: NOVO */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 8, borderBottom: "2px solid #00E5FF30" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#00E5FF", textTransform: "uppercase", letterSpacing: "0.05em" }}>Novo Contato</span>
                <span style={{ fontSize: 10, fontWeight: 800, background: "#00E5FF15", color: "#00E5FF", padding: "2px 8px", borderRadius: 10 }}>
                  {leads.filter(l => l.status === "NOVO").length}
                </span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {leads.filter(l => l.status === "NOVO").map(lead => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isSelected={selectedLeadId === lead.id}
                    onSelect={() => setSelectedLeadId(lead.id)}
                    onAdvance={() => handleAdvanceStage(lead.id)}
                    onWhatsApp={() => { setSelectedLeadId(lead.id); setShowWhatsAppModal(true); }}
                    columnColor="#00E5FF"
                  />
                ))}
                {leads.filter(l => l.status === "NOVO").length === 0 && <EmptyStateCol />}
              </div>
            </div>

            {/* Coluna 2: EM ATENDIMENTO */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 8, borderBottom: "2px solid #FFB80030" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#FFB800", textTransform: "uppercase", letterSpacing: "0.05em" }}>Em Atendimento</span>
                <span style={{ fontSize: 10, fontWeight: 800, background: "#FFB80015", color: "#FFB800", padding: "2px 8px", borderRadius: 10 }}>
                  {leads.filter(l => l.status === "EM_ATENDIMENTO").length}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {leads.filter(l => l.status === "EM_ATENDIMENTO").map(lead => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isSelected={selectedLeadId === lead.id}
                    onSelect={() => setSelectedLeadId(lead.id)}
                    onAdvance={() => handleAdvanceStage(lead.id)}
                    onWhatsApp={() => { setSelectedLeadId(lead.id); setShowWhatsAppModal(true); }}
                    columnColor="#FFB800"
                  />
                ))}
                {leads.filter(l => l.status === "EM_ATENDIMENTO").length === 0 && <EmptyStateCol />}
              </div>
            </div>

            {/* Coluna 3: QUALIFICADO */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 8, borderBottom: "2px solid #8B5CF630" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#8B5CF6", textTransform: "uppercase", letterSpacing: "0.05em" }}>Qualificado</span>
                <span style={{ fontSize: 10, fontWeight: 800, background: "#8B5CF615", color: "#8B5CF6", padding: "2px 8px", borderRadius: 10 }}>
                  {leads.filter(l => l.status === "QUALIFICADO").length}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {leads.filter(l => l.status === "QUALIFICADO").map(lead => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isSelected={selectedLeadId === lead.id}
                    onSelect={() => setSelectedLeadId(lead.id)}
                    onAdvance={() => {}} // Já qualificado, pronto para converter em OS
                    onWhatsApp={() => { setSelectedLeadId(lead.id); setShowWhatsAppModal(true); }}
                    columnColor="#8B5CF6"
                    isQualified
                  />
                ))}
                {leads.filter(l => l.status === "QUALIFICADO").length === 0 && <EmptyStateCol />}
              </div>
            </div>

          </div>

          {/* Barra Lateral: Detalhes & Timeline */}
          <div style={{
            width: 380, borderLeft: "1px solid #1A1A30", background: "#0D0D1A",
            padding: 20, display: "flex", flexDirection: "column", gap: 20,
            overflowY: "auto"
          }}>
            {selectedLead ? (
              <>
                {/* Header Lead */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#00E5FF", background: "#00E5FF10", padding: "2px 6px", borderRadius: 4 }}>
                      SCORE IA: {selectedLead.score}
                    </span>
                    <span style={{ fontSize: 11, color: "#7878A0" }}>Atribuído: {selectedLead.assignedTo}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.02em" }}>{selectedLead.nome}</h3>
                  <p style={{ fontSize: 12, color: "#7878A0", marginTop: 2 }}>{selectedLead.empresa || "Sem empresa cadastrada"}</p>
                </div>

                {/* Contatos rápidos */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 12, background: "#111120", border: "1px solid #1A1A30", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#7878A0" }}>
                    <Mail size={12} color="#5A5A7A" />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selectedLead.email}</span>
                  </div>
                  {selectedLead.telefone && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#7878A0" }}>
                      <Phone size={12} color="#5A5A7A" />
                      <span>{selectedLead.telefone}</span>
                    </div>
                  )}
                  {selectedLead.mensagem && (
                    <div style={{ borderTop: "1px solid #1A1A30", paddingTop: 8, marginTop: 4 }}>
                      <p style={{ fontSize: 10, color: "#5A5A7A", fontWeight: 700, textTransform: "uppercase" }}>Mensagem do Lead:</p>
                      <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.4, marginTop: 2, fontStyle: "italic" }}>"{selectedLead.mensagem}"</p>
                    </div>
                  )}
                </div>

                {/* Botões de Ações rápidas */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button
                    onClick={() => setShowWhatsAppModal(true)}
                    style={{
                      padding: "8px 12px", background: "#39FF1415", border: "1px solid #39FF1430",
                      borderRadius: 8, color: "#39FF14", fontSize: 11, fontWeight: 700,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                    }}
                  >
                    <MessageSquare size={12} /> WhatsApp
                  </button>
                  {selectedLead.status !== "QUALIFICADO" ? (
                    <button
                      onClick={() => handleAdvanceStage(selectedLead.id)}
                      style={{
                        padding: "8px 12px", background: "#FF006815", border: "1px solid #FF006830",
                        borderRadius: 8, color: "#FF0068", fontSize: 11, fontWeight: 700,
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                      }}
                    >
                      Avançar Fase <ChevronRight size={12} />
                    </button>
                  ) : (
                    <Link
                      href={`/negocios?convertLead=${selectedLead.id}`}
                      style={{
                        padding: "8px 12px", background: "#FF0068", color: "#fff",
                        borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: "none",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        boxShadow: "0 0 12px #FF006830"
                      }}
                    >
                      Criar OS/Lançamento <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>

                {/* Timeline Feed */}
                <div style={{ borderTop: "1px solid #1A1A30", paddingTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                  <h4 style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF", textTransform: "uppercase", letterSpacing: "0.05em" }}>Linha do Tempo de Atividades</h4>
                  
                  {/* Novo formulário de Nota */}
                  <form onSubmit={handleAddNote} style={{ display: "flex", gap: 6 }}>
                    <input
                      type="text"
                      placeholder="Adicionar nota interna..."
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      style={{
                        flex: 1, background: "#111120", border: "1px solid #1A1A30",
                        borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#EEEEFF"
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        background: "#FF0068", border: "none", borderRadius: 6,
                        width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer"
                      }}
                    >
                      <Send size={12} color="#fff" />
                    </button>
                  </form>

                  {/* Lista de eventos */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
                    {filteredEvents.map(evt => (
                      <div key={evt.id} style={{ display: "flex", gap: 10, position: "relative" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: "50%",
                            background: evt.type === "STAGE_CHANGE" ? "#FFB80020" : evt.type === "WHATSAPP_SENT" ? "#39FF1420" : "#8B5CF620",
                            border: `1px solid ${evt.type === "STAGE_CHANGE" ? "#FFB80050" : evt.type === "WHATSAPP_SENT" ? "#39FF1450" : "#8B5CF650"}`,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8
                          }}>
                            {evt.type === "STAGE_CHANGE" ? "⚡" : evt.type === "WHATSAPP_SENT" ? "💬" : "📝"}
                          </div>
                          <div style={{ width: 1, flex: 1, background: "#1A1A30", marginTop: 4 }} />
                        </div>
                        <div style={{ flex: 1, background: "#111120", borderRadius: 8, padding: "8px 10px", border: "1px solid #1A1A30" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF" }}>{evt.title}</span>
                            <span style={{ fontSize: 9, color: "#5A5A7A" }}>{new Date(evt.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                          <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.4 }}>{evt.description}</p>
                          <p style={{ fontSize: 9, color: "#5A5A7A", textAlign: "right", marginTop: 4 }}>Por: {evt.createdByUser}</p>
                        </div>
                      </div>
                    ))}
                    {filteredEvents.length === 0 && (
                      <p style={{ fontSize: 11, color: "#5A5A7A", textAlign: "center", padding: "10px 0" }}>Nenhuma anotação registrada.</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#5A5A7A" }}>
                <User size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
                <p style={{ fontSize: 12 }}>Selecione um lead para ver o histórico</p>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Configurações do Distribuidor de Leads */
        <div style={{ padding: 36, maxWidth: 800, display: "flex", flexDirection: "column", gap: 24 }}>
          
          <div style={{ padding: "20px 24px", background: "#111120", border: "1px solid #1A1A30", borderRadius: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF" }}>Regra de Distribuição Round-Robin</h3>
                <p style={{ fontSize: 12, color: "#7878A0", marginTop: 2 }}>Distribua os novos leads recebidos por Landing Pages igualmente entre corretores ativos.</p>
              </div>
              <button
                onClick={() => setIsRoundRobinActive(!isRoundRobinActive)}
                style={{
                  background: isRoundRobinActive ? "#39FF1420" : "#FFB80020",
                  border: `1px solid ${isRoundRobinActive ? "#39FF1440" : "#FFB80040"}`,
                  color: isRoundRobinActive ? "#39FF14" : "#FFB800",
                  padding: "6px 12px", borderRadius: 20, fontSize: 11, fontWeight: 800, cursor: "pointer"
                }}
              >
                {isRoundRobinActive ? "ATIVO" : "INATIVO"}
              </button>
            </div>
            
            <div style={{ borderTop: "1px solid #1A1A30", paddingTop: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF", marginBottom: 10 }}>Fila de Corretores Ativos</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { nome: "Fernanda Lima", especialidade: "Alto Padrão / Jardins", leadsHoje: 4 },
                  { nome: "João Pedro", especialidade: "Médio Padrão / Pinheiros", leadsHoje: 3 },
                  { nome: "Mariana Costa", especialidade: "Lançamentos Comerciais", leadsHoje: 0, inativa: true },
                ].map(corretor => (
                  <div key={corretor.nome} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: corretor.inativa ? "#FFB800" : "#39FF14" }} />
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>{corretor.nome}</p>
                        <p style={{ fontSize: 11, color: "#5A5A7A" }}>Foco: {corretor.especialidade}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: "#7878A0" }}>{corretor.leadsHoje} leads hoje</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: "20px 24px", background: "#111120", border: "1px solid #1A1A30", borderRadius: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", marginBottom: 6 }}>Modelos de Abordagem Rápidos</h3>
            <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 16 }}>Configure as mensagens prontas que serão enviadas nas conversas de WhatsApp.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { tag: "Primeiro Contato", template: "welcome", txt: "Apresentação comercial e convite para reunião rápida de demonstração." },
                { tag: "Follow-up", template: "followup", txt: "Perguntar se o cliente avaliou a proposta com o time técnico." },
                { tag: "Agendamento / Zoom", template: "meeting", txt: "Avisar o link da sala Zoom e confirmar o horário agendado." }
              ].map(t => (
                <div key={t.tag} style={{ padding: 12, background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#00E5FF", background: "#00E5FF10", padding: "2px 6px", borderRadius: 4 }}>{t.tag}</span>
                    <span style={{ fontSize: 11, color: "#5A5A7A" }}>/{t.template}</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.4 }}>{t.txt}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── MODAL: NOVO LEAD ────────────────────────────────────────────── */}
      {showAddLeadModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(4, 4, 8, 0.8)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#0D0D1A", border: "1px solid #1A1A30",
            borderRadius: 14, width: 460, padding: 24, display: "flex",
            flexDirection: "column", gap: 16
          }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: "#EEEEFF" }}>Adicionar Novo Lead</h3>
              <p style={{ fontSize: 11, color: "#7878A0" }}>Insira os dados do contato para adicioná-lo ao funil.</p>
            </div>
            
            <form onSubmit={handleCreateLead} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#7878A0", fontWeight: 600 }}>Nome Completo *</label>
                <input
                  type="text" required
                  value={newLeadName} onChange={e => setNewLeadName(e.target.value)}
                  style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#EEEEFF" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, color: "#7878A0", fontWeight: 600 }}>E-mail *</label>
                  <input
                    type="email" required
                    value={newLeadEmail} onChange={e => setNewLeadEmail(e.target.value)}
                    style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#EEEEFF" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, color: "#7878A0", fontWeight: 600 }}>Telefone (com DDD)</label>
                  <input
                    type="text" placeholder="11999998888"
                    value={newLeadPhone} onChange={e => setNewLeadPhone(e.target.value)}
                    style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#EEEEFF" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, color: "#7878A0", fontWeight: 600 }}>Empresa</label>
                  <input
                    type="text"
                    value={newLeadCompany} onChange={e => setNewLeadCompany(e.target.value)}
                    style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#EEEEFF" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, color: "#7878A0", fontWeight: 600 }}>Orçamento Estimado (R$)</label>
                  <input
                    type="number" placeholder="80000"
                    value={newLeadBudget} onChange={e => setNewLeadBudget(e.target.value)}
                    style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#EEEEFF" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#7878A0", fontWeight: 600 }}>Nota Inicial / Mensagem</label>
                <textarea
                  rows={2}
                  value={newLeadMessage} onChange={e => setNewLeadMessage(e.target.value)}
                  style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#EEEEFF", resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  style={{ padding: "8px 16px", background: "none", border: "1px solid #1A1A30", borderRadius: 8, color: "#7878A0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ padding: "8px 16px", background: "#FF0068", border: "none", borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  Criar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: WHATSAPP TEMPLATE ────────────────────────────────────── */}
      {showWhatsAppModal && selectedLead && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(4, 4, 8, 0.8)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#0D0D1A", border: "1px solid #1A1A30",
            borderRadius: 14, width: 440, padding: 24, display: "flex",
            flexDirection: "column", gap: 16
          }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: "#EEEEFF" }}>Abordagem Rápida via WhatsApp</h3>
              <p style={{ fontSize: 11, color: "#7878A0" }}>Selecione um modelo de mensagem para enviar para <strong>{selectedLead.nome}</strong>.</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { id: "welcome", label: "Apresentação Comercial (Boas-vindas)", txt: `Olá ${selectedLead.nome}, sou o João da TAGMOB...` },
                { id: "followup", label: "Follow-up de Proposta comercial", txt: `Oi ${selectedLead.nome}, conseguiu avaliar com o time...` },
                { id: "meeting", label: "Link da Reunião (Zoom/Google Meet)", txt: `Prezado ${selectedLead.nome}, segue link do Zoom...` },
              ].map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  style={{
                    padding: 12, background: selectedTemplate === t.id ? "#FF006808" : "#111120",
                    border: `1px solid ${selectedTemplate === t.id ? "#FF0068" : "#1A1A30"}`,
                    borderRadius: 8, cursor: "pointer", transition: "all 0.12s"
                  }}
                >
                  <p style={{ fontSize: 12, fontWeight: 700, color: selectedTemplate === t.id ? "#FF0068" : "#EEEEFF" }}>{t.label}</p>
                  <p style={{ fontSize: 10, color: "#5A5A7A", marginTop: 2 }}>{t.txt}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
              <button
                type="button"
                onClick={() => setShowWhatsAppModal(false)}
                style={{ padding: "8px 16px", background: "none", border: "1px solid #1A1A30", borderRadius: 8, color: "#7878A0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSendWhatsApp}
                style={{
                  padding: "8px 16px", background: "#39FF14", border: "none", borderRadius: 8,
                  color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6
                }}
              >
                <MessageSquare size={13} /> Abrir WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Sub-componente: Lead Card no Kanban
function LeadCard({ lead, isSelected, onSelect, onAdvance, onWhatsApp, columnColor, isQualified = false }: {
  lead: any; isSelected: boolean; onSelect: () => void;
  onAdvance: () => void; onWhatsApp: () => void; columnColor: string;
  isQualified?: boolean;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        background: "#111120",
        border: `1px solid ${isSelected ? columnColor : "#1A1A30"}`,
        borderRadius: 12, padding: 14, cursor: "pointer",
        transition: "border-color 0.12s, transform 0.1s"
      }}
      onMouseEnter={e => { if(!isSelected) e.currentTarget.style.borderColor = "#2A2A40"; }}
      onMouseLeave={e => { if(!isSelected) e.currentTarget.style.borderColor = "#1A1A30"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: columnColor, background: columnColor + "10", padding: "2px 6px", borderRadius: 4 }}>
          IA: {lead.score}
        </span>
        {lead.prioridade === 1 && <Star size={11} color="#FFB800" fill="#FFB800" />}
      </div>

      <h4 style={{ fontSize: 13, fontWeight: 850, color: "#EEEEFF", letterSpacing: "-0.01em", marginBottom: 2 }}>{lead.nome}</h4>
      <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 8 }}>{lead.empresa || "—"}</p>

      {lead.orcamentoEstimado != null && (
        <p style={{ fontSize: 12, fontWeight: 750, color: "#EEEEFF", marginBottom: 10 }}>
          {formatBRL(lead.orcamentoEstimado)}
        </p>
      )}

      {/* Ações Rápidas */}
      <div style={{ display: "flex", gap: 6, borderTop: "1px solid #1A1A30", paddingTop: 8, marginTop: 4 }}>
        <button
          onClick={(e) => { e.stopPropagation(); onWhatsApp(); }}
          style={{
            flex: 1, padding: "4px 8px", background: "#39FF1410", border: "1px solid #39FF1420",
            borderRadius: 6, color: "#39FF14", fontSize: 10, fontWeight: 700, cursor: "pointer"
          }}
        >
          WhatsApp
        </button>
        
        {!isQualified ? (
          <button
            onClick={(e) => { e.stopPropagation(); onAdvance(); }}
            style={{
              flex: 1, padding: "4px 8px", background: `${columnColor}10`, border: `1px solid ${columnColor}20`,
              borderRadius: 6, color: columnColor, fontSize: 10, fontWeight: 700, cursor: "pointer"
            }}
          >
            Avançar
          </button>
        ) : (
          <Link
            href={`/negocios?convertLead=${lead.id}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1, padding: "4px 8px", background: "#FF0068", border: "none",
              borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 700,
              textDecoration: "none", cursor: "pointer", display: "inline-flex",
              alignItems: "center", justifyContent: "center", gap: 3
            }}
          >
            Converter <ArrowUpRight size={10} />
          </Link>
        )}
      </div>
    </div>
  );
}

function EmptyStateCol() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 0", background: "#11112008", border: "1px dashed #1A1A30", borderRadius: 12, color: "#5A5A7A" }}>
      <p style={{ fontSize: 11 }}>Sem leads nesta fase</p>
    </div>
  );
}

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
