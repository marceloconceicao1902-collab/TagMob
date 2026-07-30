"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Check, ChevronDown, Lock, X, Calculator, Info, Clock, MapPin, ShoppingCart } from "lucide-react";

import {
  SINAPRO_DELIVERABLES,
  SINAPRO_HOURLY_RATES,
  calculateSinaproBudget,
  SinaproDeliverable,
} from "@/lib/sinapro-pricing";
import { COMPARATIVE_ROWS } from "../_simulador-content";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function SimuladorSection() {
  // Apenas o item de BLOCO 01 é obrigatório e selecionado por padrão
  const [selectedItems, setSelectedItems] = useState<string[]>(
    SINAPRO_DELIVERABLES.filter((d) => d.isObrigatorio).map((d) => d.id)
  );

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [extraHours, setExtraHours] = useState<Record<string, number>>({});
  const [descontoInteriorPct, setDescontoInteriorPct] = useState<number>(0);
  const [aplicaRefacao, setAplicaRefacao] = useState<boolean>(false);

  // Formulário de Lead
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

  const [showDetails, setShowDetails] = useState(false);
  const [showHourlyRates, setShowHourlyRates] = useState(false);
  const [expandedPackages, setExpandedPackages] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("TODAS");
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastHero(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePackageExpanded = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPackages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleItem = (id: string, isObrigatorio?: boolean) => {
    if (isObrigatorio) return;
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const updateQuantity = (id: string, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const updateExtraHours = (areaId: string, hours: number) => {
    setExtraHours((prev) => ({
      ...prev,
      [areaId]: Math.max(0, hours),
    }));
  };

  // Cálculo reativo usando a engine Sinapro-SP
  const calcResult = useMemo(() => {
    return calculateSinaproBudget({
      selectedDeliverableIds: selectedItems,
      deliverableQuantities: quantities,
      extraHoursByArea: extraHours,
      descontoInteriorPct,
      aplicaRefacao,
      taxaRefacaoPct: 0.40,
    });
  }, [selectedItems, quantities, extraHours, descontoInteriorPct, aplicaRefacao]);

  // Lista de 10 blocos em UPPERCASE
  const categories = useMemo(() => {
    const cats = Array.from(new Set(SINAPRO_DELIVERABLES.map((d) => d.macroEtapaLabel.toUpperCase())));
    return ["TODAS", ...cats];
  }, []);

  const filteredDeliverables = useMemo(() => {
    if (activeCategory === "TODAS") return SINAPRO_DELIVERABLES;
    return SINAPRO_DELIVERABLES.filter((d) => d.macroEtapaLabel.toUpperCase() === activeCategory);
  }, [activeCategory]);

  const scrollToSummary = () => {
    const el = document.getElementById("resumo-orcamento-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) {
      setErro("Preencha nome e e-mail corporativo para receber a proposta.");
      return;
    }
    setErro(null);
    setLoading(true);

    const itemsSelecionadosStr = calcResult.detalhesDeliverables
      .map((d) => `${d.deliverable.nome} (x${d.quantidade}) - R$ ${brl(d.subtotal)}`)
      .join("\n- ");

    const horasStr = calcResult.detalhesHoras.length > 0
      ? "\nHoras Adicionais:\n- " + calcResult.detalhesHoras.map((h) => `${h.area.area}: ${h.horas}h (R$ ${brl(h.subtotal)})`).join("\n- ")
      : "";

    const descStr = descontoInteriorPct > 0 ? `\nDesconto Interior: ${(descontoInteriorPct * 100).toFixed(0)}% (-R$ ${brl(calcResult.valorDescontoInterior)})` : "";
    const refacaoStr = aplicaRefacao ? `\nTaxa de Refação Fora Briefing (+40%): +R$ ${brl(calcResult.valorTaxaRefacao)}` : "";

    const mensagemFinal = `Cotação de Preços (Sinapro-SP):\n\nCriação de Campanha: R$ ${brl(calcResult.valorEtapa1Fixo)}\nOpcionais: R$ ${brl(calcResult.valorPecasOpcionais)}${horasStr}${descStr}${refacaoStr}\n\nItens Selecionados:\n- ${itemsSelecionadosStr}\n\nObservações: ${mensagem || "Nenhuma"}`;

    const leadData = {
      nome,
      email,
      telefone: telefone || null,
      empresa: empresa || null,
      mensagem: mensagemFinal,
      orcamentoEstimado: calcResult.valorTotal,
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
    setSuccessProposal({ id: proposalId, total: calcResult.valorTotal, itemsCount: selectedItems.length });
  };

  return (
    <section
      id="simulador"
      style={{
        position: "relative",
        padding: "80px 24px",
        backgroundColor: "#0D0D1A",
        borderTop: "1px solid #111120",
      }}
    >
      {/* Widget Flutuante de Totalização no Scroll */}
      {isScrolledPastHero && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            backgroundColor: "rgba(12, 12, 26, 0.95)",
            border: "1px solid rgba(57, 255, 20, 0.4)",
            borderRadius: 16,
            padding: "12px 24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              INVESTIMENTO TOTAL ({calcResult.detalhesDeliverables.length} ITENS)
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#39FF14" }}>
              R$ {brl(calcResult.valorTotal)}
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToSummary}
            style={{
              backgroundColor: "#FF0068",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 10,
              padding: "10px 18px",
              fontSize: 12,
              fontWeight: 900,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              textTransform: "uppercase",
              boxShadow: "0 0 15px rgba(255,0,104,0.4)",
            }}
          >
            <ShoppingCart size={15} />
            Ver Resumo
          </button>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Cabeçalho Limpo */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
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
              letterSpacing: "-0.03em",
              color: "#FF0068",
              lineHeight: 1.15,
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            Preços &amp; Tabela Referencial
          </h2>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              fontWeight: 700,
              color: "#00E5FF",
              backgroundColor: "rgba(0,229,255,0.06)",
              border: "1px solid rgba(0,229,255,0.25)",
              padding: "10px 20px",
              borderRadius: 12,
              marginBottom: 16,
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            <Info size={18} style={{ flexShrink: 0 }} />
            <span>Os valores seguem rigorosamente a tabela &ldquo;Valores Referenciais de Serviços Internos&rdquo;, publicada pelo Sinapro-SP.</span>
          </div>

          <p style={{ fontSize: 15, color: "#7878A0", maxWidth: 680, margin: "0 auto", lineHeight: 1.6 }}>
            Selecione as entregas do seu lançamento e acompanhe o orçamento atualizado em tempo real.
          </p>
        </div>

        {/* Layout Grid 2 Colunas no Desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(340px, 420px)",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* Coluna Esquerda: Filtros + Produtos */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            {/* Filtros de Blocos em Caixa Alta */}
            <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, padding: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#7878A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                FILTRAR POR BLOCOS SINAPRO-SP:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: activeCategory === cat ? "#FF0068" : "rgba(255,255,255,0.05)",
                      color: activeCategory === cat ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {cat === "TODAS" ? "Todos os 10 Blocos" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Checklist de Produtos */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, fontWeight: 800, color: "#00E5FF", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <span>MATRIZ DE ENTREGÁVEIS REFERENCIAIS ({filteredDeliverables.length} ITENS)</span>
                <span style={{ color: "#FF0068" }}>* 1º ITEM DO BLOCO 01 FIXO MANDATÓRIO</span>
              </div>

              {filteredDeliverables.map((d) => {
                const isSelected = selectedItems.includes(d.id);
                const isExpanded = expandedPackages.includes(d.id);
                const qtd = quantities[d.id] || 1;

                if (d.isObrigatorio) {
                  return (
                    <div
                      key={d.id}
                      style={{
                        background: "rgba(255,0,104,0.06)",
                        border: "2px solid #FF0068",
                        borderRadius: 18,
                        padding: 22,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 10, fontWeight: 900, color: "#FF0068", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          BLOCO 01 · {d.macroEtapaLabel.toUpperCase()}
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: "#FF0068", backgroundColor: "rgba(255,0,104,0.15)", padding: "3px 8px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4 }}>
                          <Lock size={10} /> MANDATÓRIO DA CAMPANHA
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                        <div>
                          <h4 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF" }}>{d.nome}</h4>
                          <p style={{ fontSize: 13, color: "#7878A0", marginTop: 6, lineHeight: 1.5 }}>{d.descricao}</p>
                        </div>
                        <span style={{ fontSize: 16, fontWeight: 900, color: "#FF0068", flexShrink: 0 }}>
                          R$ {brl(d.precoBase)}
                        </span>
                      </div>

                      {d.detalhes && d.detalhes.length > 0 && (
                        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,0,104,0.2)" }}>
                          <button
                            type="button"
                            onClick={(e) => togglePackageExpanded(d.id, e)}
                            style={{ background: "none", border: "none", color: "#FF0068", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                          >
                            {isExpanded ? "Ocultar especificações técnicas" : "Ver entregáveis inclusos no escopo"}
                            <ChevronDown size={14} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                          </button>
                          {isExpanded && (
                            <ul style={{ marginTop: 10, padding: 14, background: "rgba(255,0,104,0.1)", borderRadius: 12, border: "1px solid rgba(255,0,104,0.2)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
                              {d.detalhes.map((item) => (
                                <li key={item} style={{ fontSize: 12, color: "#EEEEFF", display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#FF0068", flexShrink: 0 }} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={d.id}
                    style={{
                      background: "#111120",
                      border: `1px solid ${isSelected ? "#39FF14" : "#1A1A30"}`,
                      borderRadius: 16,
                      padding: 20,
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                      <div
                        onClick={() => toggleItem(d.id)}
                        style={{ display: "flex", alignItems: "flex-start", gap: 14, flex: 1, cursor: "pointer" }}
                      >
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
                            marginTop: 2,
                          }}
                        >
                          {isSelected && <Check size={14} color="#09090F" strokeWidth={3} />}
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <h4 style={{ fontSize: 15, fontWeight: 800, color: isSelected ? "#EEEEFF" : "#7878A0" }}>{d.nome}</h4>
                            <span style={{ fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,0.6)", backgroundColor: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase" }}>
                              {d.macroEtapaLabel.toUpperCase()}
                            </span>
                            {d.unidadeMedida && (
                              <span style={{ fontSize: 9, fontWeight: 800, color: "#00E5FF", backgroundColor: "rgba(0,229,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>
                                {d.unidadeMedida}
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: 12, color: "#7878A0", marginTop: 4, lineHeight: 1.5 }}>{d.descricao}</p>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                        {isSelected && d.unidadeMedida && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 6, padding: "2px 6px" }}>
                            <span style={{ fontSize: 10, color: "#7878A0" }}>Qtd:</span>
                            <button
                              type="button"
                              onClick={(e) => updateQuantity(d.id, -1, e)}
                              style={{ width: 20, height: 20, background: "#1A1A30", border: "none", borderRadius: 4, color: "#FFF", fontSize: 12, fontWeight: 800, cursor: "pointer" }}
                            >
                              -
                            </button>
                            <span style={{ fontSize: 12, fontWeight: 800, color: "#FFF", width: 16, textAlign: "center" }}>{qtd}</span>
                            <button
                              type="button"
                              onClick={(e) => updateQuantity(d.id, 1, e)}
                              style={{ width: 20, height: 20, background: "#1A1A30", border: "none", borderRadius: 4, color: "#FFF", fontSize: 12, fontWeight: 800, cursor: "pointer" }}
                            >
                              +
                            </button>
                          </div>
                        )}

                        <span style={{ fontSize: 15, fontWeight: 900, color: isSelected ? "#39FF14" : "#7878A0" }}>
                          R$ {brl(d.precoBase * (isSelected ? qtd : 1))}
                        </span>
                      </div>
                    </div>

                    {d.detalhes && d.detalhes.length > 0 && (
                      <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #1A1A30" }}>
                        <button
                          type="button"
                          onClick={(e) => togglePackageExpanded(d.id, e)}
                          style={{ background: "none", border: "none", color: "#00E5FF", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                        >
                          {isExpanded ? "Ocultar especificações técnicas" : "Ver entregáveis inclusos no escopo"}
                          <ChevronDown size={14} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                        </button>
                        {isExpanded && (
                          <ul style={{ marginTop: 8, padding: 12, background: "#0D0D1A", borderRadius: 10, border: "1px solid #1A1A30", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 6 }}>
                            {d.detalhes.map((item) => (
                              <li key={item} style={{ fontSize: 12, color: "#7878A0", display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#00E5FF", flexShrink: 0 }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calculadora de Hora-Homem */}
            <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1A1A30", paddingBottom: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, color: "#EEEEFF", textTransform: "uppercase" }}>
                  <Clock size={16} color="#00E5FF" />
                  Demandas Extras · Tabela de Hora-Homem
                </div>
                <button
                  type="button"
                  onClick={() => setShowHourlyRates(!showHourlyRates)}
                  style={{ background: "none", border: "none", color: "#00E5FF", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  {showHourlyRates ? "Ocultar tabela" : "Ver / Adicionar horas"}
                </button>
              </div>

              {showHourlyRates && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 12 }}>
                  {SINAPRO_HOURLY_RATES.map((rate) => {
                    const h = extraHours[rate.id] || 0;
                    return (
                      <div key={rate.id} style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, color: "#EEEEFF" }}>
                          <span>{rate.area.toUpperCase()}</span>
                          <span style={{ color: "#00E5FF" }}>R$ {brl(rate.taxaPorHora)}/h</span>
                        </div>
                        <p style={{ fontSize: 11, color: "#7878A0", marginTop: 4 }}>{rate.descricao}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, paddingTop: 8, borderTop: "1px solid #1A1A30" }}>
                          <span style={{ fontSize: 11, color: "#7878A0" }}>Horas extras:</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="number"
                              min="0"
                              max="500"
                              value={h}
                              onChange={(e) => updateExtraHours(rate.id, parseInt(e.target.value) || 0)}
                              style={{ width: 54, background: "#111120", border: "1px solid #2E2E4A", borderRadius: 4, padding: "2px 4px", color: "#FFF", fontSize: 12, textAlign: "center", outline: "none" }}
                            />
                            <span style={{ fontSize: 12, fontWeight: 800, color: "#00E5FF" }}>= R$ {brl(h * rate.taxaPorHora)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Comparativo de Modelo */}
            <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, padding: 22 }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF", textTransform: "uppercase", marginBottom: 12 }}>
                Comparativo: Modelo Tradicional (% VGV) vs TAGMOB OS (Sinapro-SP)
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", textAlign: "left", fontSize: 12, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1A1A30", color: "#7878A0" }}>
                      <th style={{ paddingBottom: 8, textTransform: "uppercase" }}>Critério</th>
                      <th style={{ paddingBottom: 8, textTransform: "uppercase" }}>Agências Tradicionais</th>
                      <th style={{ paddingBottom: 8, textTransform: "uppercase", color: "#39FF14" }}>TAGMOB OS</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#EEEEFF" }}>
                    {COMPARATIVE_ROWS.map((row) => (
                      <tr key={row.criterio} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "8px 0", fontWeight: 700 }}>{row.criterio}</td>
                        <td style={{ padding: "8px 0", color: "#7878A0" }}>{row.trad}</td>
                        <td style={{ padding: "8px 0", fontWeight: 700, color: "#39FF14" }}>{row.tag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Coluna Direita: PAINEL STICKY PERFEITO */}
          <div
            id="resumo-orcamento-card"
            style={{
              position: "sticky",
              top: 90,
              alignSelf: "start",
              background: "#111120",
              border: "1px solid #1A1A30",
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 0 30px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 900, color: "#39FF14", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              RESUMO DO ORÇAMENTO
            </div>

            <div style={{ fontSize: 32, fontWeight: 900, color: "#39FF14", letterSpacing: "-0.04em", marginBottom: 4 }}>
              R$ {brl(calcResult.valorTotal)}
            </div>

            <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 18 }}>
              {calcResult.detalhesDeliverables.length} entregáveis selecionados · Preço Fixo sem VGV
            </p>

            {/* Aviso Sinapro-SP */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 10, padding: 10, marginBottom: 16, fontSize: 11, color: "#00E5FF", lineHeight: 1.4 }}>
              <Info size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>Valores Referenciais de Serviços Internos, publicado pelo Sinapro-SP.</span>
            </div>

            {/* Desconto Interior + Refação */}
            <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 14, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, textTransform: "uppercase" }}>
                  <MapPin size={14} color="#39FF14" /> Desconto Interior
                </span>
                <span style={{ color: "#39FF14", fontWeight: 900 }}>{(descontoInteriorPct * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.40"
                step="0.05"
                value={descontoInteriorPct}
                onChange={(e) => setDescontoInteriorPct(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#39FF14", cursor: "pointer" }}
              />
              <p style={{ fontSize: 10, color: "#7878A0", marginTop: 4 }}>Desconto para campanhas do interior de SP.</p>

              <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #1A1A30" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={aplicaRefacao}
                    onChange={(e) => setAplicaRefacao(e.target.checked)}
                    style={{ marginTop: 2, accentColor: "#FF0068" }}
                  />
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#FF0068", textTransform: "uppercase" }}>Taxa de Refação Adicional (+40%)</span>
                    <p style={{ fontSize: 10, color: "#7878A0" }}>Para alterações fora do briefing aprovado.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Form de Lead */}
            {successProposal ? (
              <div style={{ background: "rgba(57,255,20,0.1)", border: "1px solid #39FF14", borderRadius: 12, padding: 18, textAlign: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(57,255,20,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  <Check size={20} color="#39FF14" strokeWidth={3} />
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 900, color: "#EEEEFF", textTransform: "uppercase" }}>Proposta Gerada!</h4>
                <p style={{ fontSize: 12, color: "#7878A0", marginTop: 4 }}>Protocolo: <strong style={{ color: "#00E5FF" }}>{successProposal.id}</strong></p>
                <p style={{ fontSize: 14, fontWeight: 900, color: "#39FF14", marginTop: 6 }}>R$ {brl(successProposal.total)}</p>
                <button
                  type="button"
                  onClick={() => setSuccessProposal(null)}
                  style={{ width: "100%", marginTop: 12, padding: 10, borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "none", color: "#FFF", fontSize: 12, fontWeight: 800, cursor: "pointer" }}
                >
                  Simular Novo Orçamento
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {erro && (
                  <div style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #EF4444", borderRadius: 8, padding: 8, fontSize: 11, color: "#EF4444" }}>
                    {erro}
                  </div>
                )}

                <div>
                  <label style={{ fontSize: 10, fontWeight: 800, color: "#EEEEFF", display: "block", marginBottom: 3, textTransform: "uppercase" }}>
                    NOME COMPLETO *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{ width: "100%", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 10px", color: "#EEEEFF", fontSize: 12, outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 10, fontWeight: 800, color: "#EEEEFF", display: "block", marginBottom: 3, textTransform: "uppercase" }}>
                    E-MAIL CORPORATIVO *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu.email@incorporadora.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 10px", color: "#EEEEFF", fontSize: 12, outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 10, fontWeight: 800, color: "#EEEEFF", display: "block", marginBottom: 3, textTransform: "uppercase" }}>
                    TELEFONE / WHATSAPP
                  </label>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    style={{ width: "100%", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 10px", color: "#EEEEFF", fontSize: 12, outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 10, fontWeight: 800, color: "#EEEEFF", display: "block", marginBottom: 3, textTransform: "uppercase" }}>
                    EMPRESA / INCORPORADORA
                  </label>
                  <input
                    type="text"
                    placeholder="Nome da incorporadora"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    style={{ width: "100%", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 10px", color: "#EEEEFF", fontSize: 12, outline: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor: "#FF0068",
                    color: "#FFFFFF",
                    border: "none",
                    fontSize: 13,
                    fontWeight: 900,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    boxShadow: "0 0 20px rgba(255,0,104,0.3)",
                  }}
                >
                  {loading ? "Gerando Proposta..." : "Gerar Proposta de Lançamento"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
