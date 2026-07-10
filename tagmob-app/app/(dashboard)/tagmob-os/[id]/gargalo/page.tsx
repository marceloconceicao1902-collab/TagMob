"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft, Cpu, AlertCircle, CheckCircle2, Clock, Sparkles,
  Layers, ChevronRight, CornerDownRight, RotateCcw, AlertTriangle,
  History, Play, MessageSquare, FileText, Palette, FileCode, Printer
} from "lucide-react";
import { getEmpreendimento } from "@/lib/mock-data";

export type SubStatusInterno =
  | "BRIEFING_RECEBIDO"
  | "ESTRATEGIA_DEFINIDA"
  | "CONCEITO_APROVADO"
  | "EM_CRIACAO"
  | "FECHAMENTO_GRAFICO"
  | "PRONTO_PARA_APRESENTACAO";

export type DepartamentoAgencia =
  | "ATENDIMENTO"
  | "PLANEJAMENTO"
  | "CRIACAO"
  | "REDACAO"
  | "DESIGN"
  | "AUDIOVISUAL_WEB"
  | "PRODUCAO_GRAFICA";

interface EntregavelInterno {
  id: string;
  nome: string;
  departamento: DepartamentoAgencia;
  subStatus: SubStatusInterno;
  versao: number;
  briefingTexto?: string;
  comentariosInternos: { autor: string; depto: string; texto: string; data: string }[];
}

interface RefacaoLog {
  id: string;
  nomeItem: string;
  origem: DepartamentoAgencia;
  destino: DepartamentoAgencia;
  motivo: string;
  data: string;
  autor: string;
}

const PIPELINE_ESTADOS: { status: SubStatusInterno; label: string; cor: string; desc: string }[] = [
  { status: "BRIEFING_RECEBIDO",         label: "Briefing Recebido",       cor: "#FF0068", desc: "Coleta de informações iniciais pelo Atendimento" },
  { status: "ESTRATEGIA_DEFINIDA",       label: "Estratégia Definida",     cor: "#8B5CF6", desc: "Posicionamento e público definidos pelo Planejamento" },
  { status: "CONCEITO_APROVADO",         label: "Conceito Aprovado",       cor: "#FFB800", desc: "Linha de comunicação aprovada pela Direção de Criação" },
  { status: "EM_CRIACAO",                label: "Em Criação",              cor: "#00E5FF", desc: "Produção de copy (Redação) e desdobramento visual (Design)" },
  { status: "FECHAMENTO_GRAFICO",        label: "Fechamento Gráfico",      cor: "#EC4899", desc: "Provas digitais homologadas e exportadas para gráfica" },
  { status: "PRONTO_PARA_APRESENTACAO",  label: "Pronto para Apresentar", cor: "#39FF14", desc: "Peça finalizada pronta para validação com cliente" },
];

const DEPTO_INFO: Record<DepartamentoAgencia, { label: string; cor: string; responsavel: string; icon: any }> = {
  ATENDIMENTO:      { label: "Atendimento",      cor: "#FF0068", responsavel: "Juliana Santos",   icon: Layers },
  PLANEJAMENTO:     { label: "Planejamento",     cor: "#8B5CF6", responsavel: "Felipe Melo",      icon: Cpu },
  CRIACAO:          { label: "Direção de Criação",cor: "#FFB800", responsavel: "Marcus Brandão",  icon: Sparkles },
  REDACAO:          { label: "Redação",          cor: "#00E5FF", responsavel: "Carolina Prado",   icon: FileText },
  DESIGN:           { label: "Design & Arte",    cor: "#EC4899", responsavel: "Luiz Gustavo",     icon: Palette },
  AUDIOVISUAL_WEB:  { label: "Audiovisual & Web",cor: "#6366F1", responsavel: "Thiago Rocha",     icon: FileCode },
  PRODUCAO_GRAFICA: { label: "Produção Gráfica", cor: "#39FF14", responsavel: "Valter Souza",     icon: Printer },
};

const MOCK_ITENS_INTERNOS: EntregavelInterno[] = [
  {
    id: "itm-01",
    nome: "Manifesto da Marca (Campanha Reserva)",
    departamento: "CRIACAO",
    subStatus: "ESTRATEGIA_DEFINIDA",
    versao: 2,
    briefingTexto: "O espaço que você reserva para o que importa. Foco na curadoria de tempo e silêncio.",
    comentariosInternos: [
      { autor: "Felipe Melo", depto: "PLANEJAMENTO", texto: "Posicionamento validado. Próximo de iniciar redação da peça.", data: "10/07/2026" }
    ]
  },
  {
    id: "itm-02",
    nome: "Book de Mesa do Corretor (Capa dura)",
    departamento: "REDACAO",
    subStatus: "EM_CRIACAO",
    versao: 1,
    briefingTexto: "Texto focado em dados técnicos, metragens livres e valor de m2.",
    comentariosInternos: []
  },
  {
    id: "itm-03",
    nome: "Key Visual (KV) Matriz Lançamento",
    departamento: "DESIGN",
    subStatus: "EM_CRIACAO",
    versao: 3,
    briefingTexto: "Cantos retos, estética retro-tech com cores verde-musgo e off-white.",
    comentariosInternos: [
      { autor: "Marcus Brandão", depto: "CRIACAO", texto: "Ajustar o contraste do verde do tapume.", data: "08/07/2026" }
    ]
  },
  {
    id: "itm-04",
    nome: "Filme Conceito de 60s (Teaser)",
    departamento: "AUDIOVISUAL_WEB",
    subStatus: "EM_CRIACAO",
    versao: 1,
    briefingTexto: "Teaser da região dos Jardins no amanhecer com narração em off suave.",
    comentariosInternos: []
  },
  {
    id: "itm-05",
    nome: "Folheto Intermediário Blitz de Vendas",
    departamento: "PRODUCAO_GRAFICA",
    subStatus: "FECHAMENTO_GRAFICO",
    versao: 2,
    briefingTexto: "Folheto A5 com sangrias de 3mm e cores calibradas em CMYK.",
    comentariosInternos: []
  },
  {
    id: "itm-06",
    nome: "WhatsApp Card de Lançamento",
    departamento: "ATENDIMENTO",
    subStatus: "PRONTO_PARA_APRESENTACAO",
    versao: 4,
    briefingTexto: "Formato quadrado 1080x1080 com botão simulado de ação.",
    comentariosInternos: [
      { autor: "Valter Souza", depto: "PRODUCAO_GRAFICA", texto: "Versão digital homologada, exportado em PNG compacto.", data: "09/07/2026" }
    ]
  },
  {
    id: "itm-07",
    nome: "Posts de Redes Sociais (Carrossel)",
    departamento: "DESIGN",
    subStatus: "EM_CRIACAO",
    versao: 2,
    briefingTexto: "Carrossel de 4 cards explicando diferenciais das garagens e lazer.",
    comentariosInternos: []
  },
  {
    id: "itm-08",
    nome: "Landing Page de Cadastro",
    departamento: "AUDIOVISUAL_WEB",
    subStatus: "EM_CRIACAO",
    versao: 1,
    briefingTexto: "LP com formulário integrado e SEO configurado.",
    comentariosInternos: []
  },
  {
    id: "itm-09",
    nome: "Tapume Stand de Vendas",
    departamento: "PRODUCAO_GRAFICA",
    subStatus: "FECHAMENTO_GRAFICO",
    versao: 2,
    briefingTexto: "Adesivo vinílico de 12 metros. Resolução de impressão mínima de 150dpi.",
    comentariosInternos: []
  },
  {
    id: "itm-10",
    nome: "Template de Apresentação para Meeting",
    departamento: "REDACAO",
    subStatus: "EM_CRIACAO",
    versao: 1,
    briefingTexto: "Copys conceituais para introdução e argumentação comercial do meeting.",
    comentariosInternos: []
  }
];

export default function AgencyWorkflowDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const empId = resolvedParams?.id || "emp-001";
  const emp = getEmpreendimento(empId) || { nome: "Reserva Jardins", bairro: "Jardins" };

  const [itens, setItens] = useState<EntregavelInterno[]>(MOCK_ITENS_INTERNOS);
  const [refacaoLogs, setRefacaoLogs] = useState<RefacaoLog[]>([
    {
      id: "log-1",
      nomeItem: "Manifesto da Marca (Campanha Reserva)",
      origem: "CRIACAO",
      destino: "REDACAO",
      motivo: "O slogan não conversa com a linguagem de curadoria silenciosa. Reduzir a repetição.",
      data: "10/07/2026 - 15:40",
      autor: "Marcus Brandão (Criação)"
    },
    {
      id: "log-2",
      nomeItem: "Book de Mesa do Corretor (Capa dura)",
      origem: "DESIGN",
      destino: "REDACAO",
      motivo: "Ajustar o número de caracteres nas colunas secundárias de plantas do living.",
      data: "09/07/2026 - 11:22",
      autor: "Luiz Gustavo (Design)"
    }
  ]);
  const [selectedDeptoFilter, setSelectedDeptoFilter] = useState<"TODOS" | DepartamentoAgencia>("TODOS");
  const [selectedItem, setSelectedItem] = useState<EntregavelInterno | null>(MOCK_ITENS_INTERNOS[0]);
  const [motivoAjuste, setMotivoAjuste] = useState("");
  const [showAjusteModal, setShowAjusteModal] = useState(false);
  const [targetRejeicaoDepto, setTargetRejeicaoDepto] = useState<DepartamentoAgencia>("REDACAO");
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);

  const DEPTO_ORDEM: DepartamentoAgencia[] = [
    "ATENDIMENTO",
    "PLANEJAMENTO",
    "CRIACAO",
    "REDACAO",
    "DESIGN",
    "AUDIOVISUAL_WEB",
    "PRODUCAO_GRAFICA"
  ];

  const deptoCounts = DEPTO_ORDEM.reduce((acc, depto) => {
    acc[depto] = itens.filter(i => i.departamento === depto).length;
    return acc;
  }, {} as Record<DepartamentoAgencia, number>);

  function handleAvancarItem(itemId: string) {
    let automaticBriefingAlert = false;

    setItens(prev =>
      prev.map(item => {
        if (item.id !== itemId) return item;
        
        const currentIndex = DEPTO_ORDEM.indexOf(item.departamento);
        if (currentIndex === -1 || currentIndex === DEPTO_ORDEM.length - 1) {
          const novoStatus = "PRONTO_PARA_APRESENTACAO" as SubStatusInterno;
          const novoDepto = "ATENDIMENTO" as DepartamentoAgencia;
          const updated = {
            ...item,
            departamento: novoDepto,
            subStatus: novoStatus,
            versao: item.versao + 1
          };
          if (selectedItem?.id === itemId) setSelectedItem(updated);
          return updated;
        }

        const nextDepto = DEPTO_ORDEM[currentIndex + 1];
        
        let novoSubStatus = item.subStatus;
        if (nextDepto === "PLANEJAMENTO") novoSubStatus = "ESTRATEGIA_DEFINIDA";
        else if (nextDepto === "CRIACAO") novoSubStatus = "CONCEITO_APROVADO";
        else if (nextDepto === "REDACAO" || nextDepto === "DESIGN" || nextDepto === "AUDIOVISUAL_WEB") {
          novoSubStatus = "EM_CRIACAO";
          if (nextDepto === "DESIGN") {
            automaticBriefingAlert = true;
          }
        } else if (nextDepto === "PRODUCAO_GRAFICA") novoSubStatus = "FECHAMENTO_GRAFICO";

        const updated = {
          ...item,
          departamento: nextDepto,
          subStatus: novoSubStatus,
        };

        if (selectedItem?.id === itemId) setSelectedItem(updated);
        return updated;
      })
    );

    if (automaticBriefingAlert) {
      triggerFeedback("⚡ AUTOMAÇÃO DE BRIEFING: Textos homologados da Redação foram vinculados automaticamente ao card de Design!");
    } else {
      triggerFeedback("Item avançado com sucesso na pipeline interna da agência!");
    }
  }

  function handleRejeitarInterno() {
    if (!selectedItem || !motivoAjuste.trim()) return;

    setItens(prev =>
      prev.map(item => {
        if (item.id !== selectedItem.id) return item;

        const updated: EntregavelInterno = {
          ...item,
          departamento: targetRejeicaoDepto,
          subStatus: "EM_CRIACAO",
          versao: item.versao + 1,
          comentariosInternos: [
            ...item.comentariosInternos,
            {
              autor: "Marcus Brandão (Criação)",
              depto: "CRIACAO",
              texto: `[REFAÇÃO INTERNA]: Mapeado para ${targetRejeicaoDepto}. Motivo: ${motivoAjuste}`,
              data: new Date().toLocaleDateString("pt-BR")
            }
          ]
        };
        setSelectedItem(updated);
        return updated;
      })
    );

    const novoLog: RefacaoLog = {
      id: `log-${Date.now()}`,
      nomeItem: selectedItem.nome,
      origem: selectedItem.departamento,
      destino: targetRejeicaoDepto,
      motivo: motivoAjuste,
      data: `${new Date().toLocaleDateString("pt-BR")} - ${new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}`,
      autor: "Operações TAGMOB"
    };
    setRefacaoLogs(prev => [novoLog, ...prev]);

    setMotivoAjuste("");
    setShowAjusteModal(false);
    triggerFeedback(`Item movido de volta para ${targetRejeicaoDepto} (Refação Interna Registrada)`);
  }

  function triggerFeedback(msg: string) {
    setFeedbackSuccess(msg);
    setTimeout(() => setFeedbackSuccess(null), 4000);
  }

  const filteredItens = selectedDeptoFilter === "TODOS"
    ? itens
    : itens.filter(i => i.departamento === selectedDeptoFilter);

  const maiorGargalo = Object.keys(deptoCounts).reduce((a, b) => 
    deptoCounts[a as DepartamentoAgencia] > deptoCounts[b as DepartamentoAgencia] ? a : b
  ) as DepartamentoAgencia;

  return (
    <div style={{ padding: "28px 28px 80px", maxWidth: 1140, margin: "0 auto", backgroundColor: "#09090F", minHeight: "100vh", color: "#EDE8DF" }}>
      
      {feedbackSuccess && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 300,
          backgroundColor: "#39FF14", color: "#000000", fontWeight: 800,
          padding: "14px 22px", borderRadius: 10, display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 10px 30px rgba(57,255,20,0.3)", border: "1px solid rgba(0, 0, 0, 0.15)",
          fontSize: 12
        }}>
          <CheckCircle2 size={16} />
          <span>{feedbackSuccess}</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, fontSize: 13, color: "#7878A0" }}>
        <Link href={`/tagmob-os/${empId}`} style={{ display: "flex", alignItems: "center", gap: 6, color: "#7878A0", textDecoration: "none" }}>
          <ArrowLeft size={14} /> Workspace de Lançamento
        </Link>
        <span style={{ color: "#2E2E4A" }}>/</span>
        <span style={{ color: "#EEEEFF" }}>Operações Internas TAGMOB</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Cpu size={14} color="#FF0068" />
            <p style={{ fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Engine de Produção Interna & Governança
            </p>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", marginBottom: 4 }}>
            Controle de Gargalos da Agência
          </h1>
          <p style={{ fontSize: 13, color: "#7878A0" }}>
            Monitore o fluxo produtivo linear do empreendimento <strong>{emp.nome}</strong>. Aloque recursos e aproveite a automação de briefings.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", backgroundColor: "rgba(255,0,104,0.08)", border: "1px solid rgba(255,0,104,0.25)", borderRadius: 10 }}>
          <AlertCircle size={14} color="#FF0068" />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#FF0068" }}>
            Maior Gargalo: {DEPTO_INFO[maiorGargalo].label} ({deptoCounts[maiorGargalo]} peças)
          </span>
        </div>
      </div>

      <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: 12, fontWeight: 800, color: "#7878A0", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <Layers size={14} color="#FF0068" /> Volume de Peças Retidas por Departamento
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10 }}>
          {DEPTO_ORDEM.map((depto, index) => {
            const count = deptoCounts[depto] || 0;
            const info = DEPTO_INFO[depto];
            const isHighest = depto === maiorGargalo;
            
            return (
              <div 
                key={depto}
                onClick={() => setSelectedDeptoFilter(depto)} 
                style={{ 
                  background: selectedDeptoFilter === depto ? "rgba(255,255,255,0.02)" : "#0D0D1A", 
                  border: `1.5px solid ${selectedDeptoFilter === depto ? info.cor : "#1A1A30"}`,
                  borderRadius: 10, padding: 14, cursor: "pointer", transition: "all 0.15s",
                  display: "flex", flexDirection: "column", gap: 10, position: "relative"
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: info.cor }} />
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: 10, color: "#3A3A5C", fontWeight: 800 }}>{(index+1).toString().padStart(2, '0')}</span>
                  <info.icon size={12} color={info.cor} />
                </div>
                
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{info.label}</p>
                  <p style={{ fontSize: 9, color: "#3A3A5C", marginTop: 1 }}>{info.responsavel}</p>
                </div>
                
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: isHighest ? "#FF0068" : "#EDE8DF" }}>{count}</span>
                  <span style={{ fontSize: 10, color: "#3A3A5C" }}>peça{count !== 1 ? "s" : ""}</span>
                </div>
              </div>
            );
          })}
        </div>

        {selectedDeptoFilter !== "TODOS" && (
          <button 
            onClick={() => setSelectedDeptoFilter("TODOS")}
            style={{ marginTop: 12, padding: "5px 12px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid #1A1A30", color: "#7878A0", fontSize: 10, cursor: "pointer" }}
          >
            Limpar Filtro e Mostrar Todos
          </button>
        )}
      </div>

      <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, padding: 18, marginBottom: 24, overflowX: "auto" }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: "#7878A0", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          Esteira Linear de Campanhas (Sub-status da Máquina de Estados)
        </p>
        <div style={{ display: "flex", gap: 0, alignItems: "center", minWidth: 800 }}>
          {PIPELINE_ESTADOS.map((est, i) => (
            <div key={est.status} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ 
                padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: `1px solid #1A1A30`, 
                borderRadius: 8, flex: 1, display: "flex", flexDirection: "column", gap: 3
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: est.cor }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: est.cor }}>{est.label}</span>
                </div>
                <p style={{ fontSize: 9, color: "#3A3A5C", lineHeight: 1.3 }}>{est.desc}</p>
              </div>
              {i < PIPELINE_ESTADOS.length - 1 && (
                <ChevronRight size={16} color="#1A1A30" style={{ margin: "0 8px" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
        
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h2 style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF" }}>
              Checklist de Peças ({filteredItens.length} no filtro)
            </h2>
            <span style={{ fontSize: 10, color: "#3A3A5C" }}>Selecione um item para operá-lo</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredItens.map(item => {
              const depto = DEPTO_INFO[item.departamento];
              const subStatusLabel = PIPELINE_ESTADOS.find(e => e.status === item.subStatus)?.label || item.subStatus;
              const isSelected = selectedItem?.id === item.id;
              
              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{ 
                    background: isSelected ? "rgba(255,0,104,0.03)" : "#0D0D1A", 
                    border: `1.5px solid ${isSelected ? "#FF006840" : "#1A1A30"}`,
                    borderRadius: 12, padding: "12px 16px", cursor: "pointer", transition: "all 0.1s",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nome}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: depto.cor, backgroundColor: depto.cor + "15", padding: "1px 6px", borderRadius: 3 }}>
                        {depto.label}
                      </span>
                      <span style={{ fontSize: 9, color: "#7878A0", background: "rgba(255,255,255,0.03)", padding: "1px 6px", borderRadius: 3 }}>
                        {subStatusLabel}
                      </span>
                      <span style={{ fontSize: 9, color: "#3A3A5C" }}>v{item.versao}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAvancarItem(item.id); }}
                      style={{ 
                        padding: "6px 12px", background: "#FF006815", border: "1px solid #FF006840", 
                        borderRadius: 6, color: "#FF0068", fontSize: 11, fontWeight: 800, cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 4
                      }}
                    >
                      Avançar <Play size={10} style={{ fill: "currentColor" }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          {selectedItem ? (
            <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 14, padding: 20 }}>
              <div style={{ borderBottom: "1px solid #1A1A30", paddingBottom: 14, marginBottom: 14 }}>
                <p style={{ fontSize: 10, fontWeight: 800, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase" }}>Ficha Operacional do Card</p>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#EEEEFF", marginTop: 4 }}>{selectedItem.nome}</h3>
                <p style={{ fontSize: 11, color: "#7878A0", marginTop: 2 }}>Responsável atual: <strong>{DEPTO_INFO[selectedItem.departamento].responsavel} ({DEPTO_INFO[selectedItem.departamento].label})</strong></p>
              </div>

              <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: 12, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Sparkles size={11} color="#39FF14" />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#39FF14", letterSpacing: "0.04em", textTransform: "uppercase" }}>Briefing / Copy Ingestada</span>
                </div>
                <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.5 }}>
                  {selectedItem.briefingTexto || "Briefing em elaboração pelo redator da agência."}
                </p>
                {selectedItem.departamento === "DESIGN" && (
                  <p style={{ fontSize: 10, color: "#39FF14", marginTop: 6, fontStyle: "italic" }}>
                    ✓ O Designer visualiza o texto final aprovado acima no seu card.
                  </p>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase" }}>Ações do Atendimento / Operações</p>
                
                <div style={{ display: "flex", gap: 8 }}>
                  <button 
                    onClick={() => setShowAjusteModal(true)}
                    style={{ 
                      flex: 1, padding: "8px", borderRadius: 8, background: "rgba(255,184,0,0.1)", 
                      border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800", fontSize: 12, 
                      fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                    }}
                  >
                    <RotateCcw size={12} /> Refação Interna
                  </button>
                  <button 
                    onClick={() => handleAvancarItem(selectedItem.id)}
                    style={{ 
                      flex: 1, padding: "8px", borderRadius: 8, background: "#39FF14", 
                      border: "none", color: "#000", fontSize: 12, 
                      fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                    }}
                  >
                    <Play size={12} /> Próxima Etapa
                  </button>
                </div>
              </div>

              {showAjusteModal && (
                <div style={{ background: "#111120", border: "1px solid #FFB80040", borderRadius: 8, padding: 14, marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#FFB800", marginBottom: 8 }}>Mover de Volta para Refação</p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                    <label style={{ fontSize: 10, color: "#7878A0" }}>Selecionar departamento de destino:</label>
                    <select 
                      value={targetRejeicaoDepto} 
                      onChange={(e) => setTargetRejeicaoDepto(e.target.value as DepartamentoAgencia)}
                      style={{ background: "#09090F", border: "1px solid #1A1A30", color: "#EDE8DF", padding: "6px", fontSize: 12, borderRadius: 4 }}
                    >
                      <option value="PLANEJAMENTO">Planejamento</option>
                      <option value="CRIACAO">Criação</option>
                      <option value="REDACAO">Redação</option>
                      <option value="DESIGN">Design</option>
                      <option value="AUDIOVISUAL_WEB">Audiovisual</option>
                    </select>
                  </div>

                  <textarea 
                    value={motivoAjuste}
                    onChange={(e) => setMotivoAjuste(e.target.value)}
                    placeholder="Escreva as anotações visuais e o motivo do ajuste..."
                    style={{ 
                      width: "100%", background: "#09090F", border: "1px solid #1A1A30", 
                      color: "#EDE8DF", padding: 8, fontSize: 12, borderRadius: 4, height: 70, 
                      resize: "none", outline: "none", boxSizing: "border-box"
                    }}
                  />

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 8 }}>
                    <button 
                      onClick={() => setShowAjusteModal(false)}
                      style={{ background: "transparent", border: "none", color: "#7878A0", fontSize: 11, cursor: "pointer" }}
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={handleRejeitarInterno}
                      style={{ background: "#FFB800", border: "none", color: "#000", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                    >
                      Confirmar Envio
                    </button>
                  </div>
                </div>
              )}

              <div>
                <p style={{ fontSize: 11, fontWeight: 800, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Comentários de Operação</p>
                {selectedItem.comentariosInternos.length === 0 ? (
                  <p style={{ fontSize: 11, color: "#3A3A5C", fontStyle: "italic" }}>Sem comentários internos anteriores.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {selectedItem.comentariosInternos.map((c, idx) => (
                      <div key={idx} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 6, padding: "8px 10px", fontSize: 11 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "#7878A0", marginBottom: 4 }}>
                          <strong>{c.autor}</strong>
                          <span style={{ color: "#3A3A5C", marginLeft: "auto" }}>{c.data}</span>
                        </div>
                        <p style={{ color: "#EDE8DF" }}>{c.texto}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 14, padding: 32, textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#3A3A5C" }}>Nenhum item selecionado para operação.</p>
            </div>
          )}
          
          <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 14, padding: 20, marginTop: 20 }}>
            <h3 style={{ fontSize: 12, fontWeight: 800, color: "#7878A0", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <History size={14} color="#FF0068" /> Log de Refação Interna (Oculto do Cliente)
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 200, overflowY: "auto" }}>
              {refacaoLogs.map(log => (
                <div key={log.id} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: 10, fontSize: 11 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#7878A0", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, color: "#EEEEFF" }}>{log.nomeItem}</span>
                    <span style={{ color: "#3A3A5C" }}>{log.data}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#FFB800", marginBottom: 4 }}>
                    <CornerDownRight size={10} />
                    <span>Movido de <strong>{log.origem}</strong> para <strong>{log.destino}</strong></span>
                  </div>
                  <p style={{ color: "#7878A0", fontStyle: "italic", borderLeft: "1.5px solid #FFB800", paddingLeft: 6, marginLeft: 2 }}>{log.motivo}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>

      </div>

    </div>
  );
}
