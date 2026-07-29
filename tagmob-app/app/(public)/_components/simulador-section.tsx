"use client";

import React, { useState } from "react";
import { Check, ChevronDown, Lock, ShieldCheck, Sparkles, X, Calculator } from "lucide-react";

import { DELIVERABLES } from "../_simulador-content";
import { DeckHeading } from "./deck-split";
import { Reveal } from "./reveal";

const brl = (v: number) => v.toLocaleString("pt-BR");

export function SimuladorSection() {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    DELIVERABLES.filter((d) => d.isObrigatorio).map((d) => d.id)
  );

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [successProposal, setSuccessProposal] = useState<{
    id: string;
    total: number;
    itemsCount: number;
  } | null>(null);
  const [expandedPackages, setExpandedPackages] = useState<string[]>([]);

  const togglePackageExpanded = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPackages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const setupFixo = DELIVERABLES.filter((d) => d.isObrigatorio).reduce(
    (sum, item) => sum + item.preco,
    0
  );
  const custoModular = DELIVERABLES.filter(
    (d) => !d.isObrigatorio && selectedItems.includes(d.id)
  ).reduce((sum, item) => sum + item.preco, 0);
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
      setErro("Preencha nome e e-mail para receber a proposta.");
      return;
    }
    setErro(null);
    setLoading(true);

    const itemsSelecionados = DELIVERABLES.filter((d) => selectedItems.includes(d.id))
      .map((d) => d.nome)
      .join(", ");
    const mensagemAdicional = mensagem ? `\n\nMensagem do cliente: ${mensagem}` : "";
    const mensagemFinal = `Simulação de Escopo:\nProdutos: ${itemsSelecionados}${mensagemAdicional}`;

    const leadData = {
      nome,
      email,
      telefone: telefone || null,
      empresa: empresa || null,
      mensagem: mensagemFinal,
      orcamentoEstimado: valorTotal,
    };

    const fallbackId = "TAGMOB-PROPOSTA-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    if (typeof window !== "undefined") {
      try {
        const existing = JSON.parse(localStorage.getItem("tagmob_local_leads") || "[]");
        localStorage.setItem(
          "tagmob_local_leads",
          JSON.stringify([
            {
              ...leadData,
              id: fallbackId,
              status: "NOVO",
              prioridade: 2,
              score: 90,
              createdAt: new Date().toISOString(),
            },
            ...existing,
          ])
        );
      } catch {
        // Fallback local
      }
    }

    let proposalId = fallbackId;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      const data = await res.json();
      proposalId = data?.data?.id || fallbackId;
    } catch {
      // Usa id gerado localmente
    }

    setLoading(false);
    setSuccessProposal({ id: proposalId, total: valorTotal, itemsCount: selectedItems.length });
  };

  return (
    <section
      id="simulador"
      style={{
        position: "relative",
        padding: "90px 24px",
        backgroundColor: "#0D0D1A",
        borderTop: "1px solid #111120",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Cabeçalho do Simulador */}
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 800,
              color: "#39FF14",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 16,
              backgroundColor: "rgba(57, 255, 20, 0.1)",
              border: "1px solid rgba(57, 255, 20, 0.25)",
              padding: "6px 16px",
              borderRadius: 20,
            }}
          >
            <Calculator size={14} />
            TABELA DE PREÇOS E INVESTIMENTO
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 48px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#EEEEFF",
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Preços &amp; Tabela de Lançamento
          </h2>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#00E5FF", marginBottom: 16 }}>
            Os valores seguem a tabela &ldquo;Valores Referenciais de Serviços Internos&rdquo;, publicada pelo Sinapro-SP.
          </p>
          <p style={{ fontSize: 16, color: "#7878A0", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            Selecione as entregas necessárias para o seu empreendimento e acompanhe a estimativa com valores fixos e transparência total.
          </p>
        </div>

        {/* Simulador Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Coluna Esquerda: Checklist de Produtos */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#00E5FF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
              CHECKLIST DE ENTREGÁVEIS DA CAMPANHA
            </div>

            {/* Itens Obrigatórios */}
            {DELIVERABLES.filter((d) => d.isObrigatorio).map((d) => {
              const isExpanded = expandedPackages.includes(d.id);
              return (
                <div
                  key={d.id}
                  style={{
                    background: "#111120",
                    border: "2px solid #FF0068",
                    borderRadius: 18,
                    padding: 24,
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 900, color: "#FF0068", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      ETAPA 1 · CONFIGURAÇÃO BASE MANDATÓRIA
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#FF0068", backgroundColor: "rgba(255,0,104,0.15)", padding: "3px 8px", borderRadius: 4 }}>
                      FIXO
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF" }}>{d.nome}</h4>
                      <p style={{ fontSize: 13, color: "#7878A0", marginTop: 4 }}>{d.desc}</p>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#FF0068", flexShrink: 0 }}>
                      R$ {brl(d.preco)},00
                    </span>
                  </div>

                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,0,104,0.2)" }}>
                    <button
                      type="button"
                      onClick={(e) => togglePackageExpanded(d.id, e)}
                      style={{ background: "none", border: "none", color: "#FF0068", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                    >
                      {isExpanded ? "Ocultar detalhes" : "Ver entregáveis incluídos"}
                      <ChevronDown size={14} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>
                    {isExpanded && (
                      <ul style={{ marginTop: 10, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                        {d.detalhes.map((item) => (
                          <li key={item} style={{ fontSize: 13, color: "#7878A0" }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Itens Modulares Opcionais */}
            {DELIVERABLES.filter((d) => !d.isObrigatorio).map((d) => {
              const isSelected = selectedItems.includes(d.id);
              const isExpanded = expandedPackages.includes(d.id);
              return (
                <div
                  key={d.id}
                  onClick={() => toggleItem(d.id)}
                  style={{
                    background: "#111120",
                    border: `1px solid ${isSelected ? "#39FF14" : "#1A1A30"}`,
                    borderRadius: 16,
                    padding: 20,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          border: `2px solid ${isSelected ? "#39FF14" : "#2E2E4A"}`,
                          backgroundColor: isSelected ? "#39FF14" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {isSelected && <Check size={14} color="#09090F" strokeWidth={3} />}
                      </div>
                      <div>
                        <h4 style={{ fontSize: 15, fontWeight: 800, color: isSelected ? "#EEEEFF" : "#7878A0" }}>{d.nome}</h4>
                        <p style={{ fontSize: 12, color: "#7878A0", marginTop: 2 }}>{d.desc}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 900, color: isSelected ? "#39FF14" : "#7878A0", flexShrink: 0 }}>
                      + R$ {brl(d.preco)},00
                    </span>
                  </div>

                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #1A1A30" }}>
                    <button
                      type="button"
                      onClick={(e) => togglePackageExpanded(d.id, e)}
                      style={{ background: "none", border: "none", color: "#7878A0", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                    >
                      {isExpanded ? "Ocultar detalhes" : "Ver peças do pacote"}
                      <ChevronDown size={14} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>
                    {isExpanded && (
                      <ul style={{ marginTop: 8, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                        {d.detalhes.map((item) => (
                          <li key={item} style={{ fontSize: 12, color: "#7878A0" }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coluna Direita: Sticky Summary Box & Form */}
          <div
            style={{
              position: "sticky",
              top: 90,
              alignSelf: "start",
              background: "#111120",
              border: "1px solid #1A1A30",
              borderRadius: 20,
              padding: 28,
              boxShadow: "0 0 30px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 900, color: "#39FF14", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              RESUMO DO ORÇAMENTO
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#39FF14", letterSpacing: "-0.04em", marginBottom: 4 }}>
              R$ {brl(valorTotal)},00
            </div>
            <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 20 }}>
              {selectedItems.length} entregáveis selecionados · Preço Fixo sem VGV
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {erro && (
                <div style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #EF4444", borderRadius: 8, padding: 10, fontSize: 12, color: "#EF4444" }}>
                  {erro}
                </div>
              )}

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF", display: "block", marginBottom: 4 }}>
                  NOME COMPLETO *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{ width: "100%", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "10px 12px", color: "#EEEEFF", fontSize: 13, outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF", display: "block", marginBottom: 4 }}>
                  E-MAIL CORPORATIVO *
                </label>
                <input
                  type="email"
                  required
                  placeholder="seu.email@incorporadora.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "10px 12px", color: "#EEEEFF", fontSize: 13, outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF", display: "block", marginBottom: 4 }}>
                  TELEFONE / WHATSAPP
                </label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  style={{ width: "100%", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "10px 12px", color: "#EEEEFF", fontSize: 13, outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF", display: "block", marginBottom: 4 }}>
                  EMPRESA / INCORPORADORA
                </label>
                <input
                  type="text"
                  placeholder="Nome da incorporadora"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  style={{ width: "100%", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "10px 12px", color: "#EEEEFF", fontSize: 13, outline: "none" }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor: "#FF0068",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: 14,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(255,0,104,0.3)",
                }}
              >
                {loading ? "Gerando Proposta..." : "Gerar Proposta de Lançamento"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação da Proposta */}
      {successProposal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(9,9,15,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#111120", border: "2px solid #39FF14", borderRadius: 20, maxWidth: 520, width: "100%", padding: 32, position: "relative", boxShadow: "0 0 40px rgba(57,255,20,0.2)" }}>
            <button onClick={() => setSuccessProposal(null)} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", color: "#7878A0", cursor: "pointer" }}>
              <X size={20} />
            </button>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "rgba(57,255,20,0.1)", border: "2px solid #39FF14", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Check size={24} color="#39FF14" strokeWidth={3} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF" }}>Simulação Gerada com Sucesso!</h3>
              <p style={{ fontSize: 13, color: "#7878A0", marginTop: 6 }}>
                Protocolo de Proposta <strong style={{ color: "#00E5FF" }}>#{successProposal.id}</strong>
              </p>
            </div>

            <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 18, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: "#7878A0" }}>Entregáveis Selecionados:</span>
                <span style={{ fontWeight: 700, color: "#EEEEFF" }}>{successProposal.itemsCount} pacotes</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #1A1A30", paddingBottom: 10, marginBottom: 10 }}>
                <span style={{ color: "#7878A0" }}>Modelo Comercial:</span>
                <span style={{ fontWeight: 700, color: "#FF0068" }}>Preço Fixo Sem VGV</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF" }}>INVESTIMENTO TOTAL:</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: "#39FF14" }}>R$ {brl(successProposal.total)},00</span>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#7878A0", lineHeight: 1.6, marginBottom: 20 }}>
                Nossa equipe comercial já recebeu os detalhes da sua simulação e entrará em contato para formalizar a proposta.
              </p>
              <button
                onClick={() => setSuccessProposal(null)}
                style={{ width: "100%", padding: 12, borderRadius: 8, backgroundColor: "#1A1A30", border: "1px solid #2E2E4A", color: "#EEEEFF", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
