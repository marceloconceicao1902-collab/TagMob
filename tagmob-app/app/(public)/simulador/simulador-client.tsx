"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Check, ChevronDown, Lock, X, Percent, Clock, AlertTriangle, Building2, MapPin, FileText, Info, ShoppingCart, ArrowUp } from "lucide-react";

import {
  SINAPRO_DELIVERABLES,
  SINAPRO_HOURLY_RATES,
  calculateSinaproBudget,
} from "@/lib/sinapro-pricing";
import { COMPARATIVE_ROWS, SINAPRO_DISCLAIMER_TEXT } from "../_simulador-content";
import { DeckHeading } from "../_components/deck-split";
import { Reveal } from "../_components/reveal";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function SimuladorClient() {
  // Apenas o item de BLOCO 01 é obrigatório e selecionado por padrão
  const [selectedItems, setSelectedItems] = useState<string[]>(
    SINAPRO_DELIVERABLES.filter((d) => d.isObrigatorio).map((d) => d.id),
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleItem = (id: string, isObrigatorio?: boolean) => {
    if (isObrigatorio) return; // Trava obrigatória no 1º item do Bloco 01
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
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

  // Cálculo reativo usando a engine Sinapro
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

  // Lista única de blocos/categorias em UPPERCASE
  const categories = useMemo(() => {
    const cats = Array.from(new Set(SINAPRO_DELIVERABLES.map((d) => d.macroEtapaLabel.toUpperCase())));
    return ["TODAS", ...cats];
  }, []);

  const filteredDeliverables = useMemo(() => {
    if (activeCategory === "TODAS") return SINAPRO_DELIVERABLES;
    return SINAPRO_DELIVERABLES.filter((d) => d.macroEtapaLabel.toUpperCase() === activeCategory);
  }, [activeCategory]);

  const scrollToSummary = () => {
    const el = document.getElementById("resumo-orcamento-panel");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) {
      setErro("Preencha nome e e-mail corporativo para gerar a proposta.");
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

    const fallbackId = "COTACAO-SINAPRO-" + Math.random().toString(36).substring(2, 9).toUpperCase();

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
              prioridade: 1,
              score: 90,
              createdAt: new Date().toISOString(),
            },
            ...existing,
          ]),
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
      // Mantém fallback do protocolo local
    }

    setLoading(false);
    setSuccessProposal({
      id: proposalId,
      total: calcResult.valorTotal,
      itemsCount: selectedItems.length,
    });
    setNome("");
    setEmail("");
    setTelefone("");
    setEmpresa("");
    setMensagem("");
  };

  const inputClass =
    "w-full rounded-lg border border-white/12 bg-ink-deep px-3.5 py-2.5 text-[0.85rem] text-white outline-none transition-colors placeholder:text-white/35 focus:border-pink";

  return (
    <>
      {/* Cabeçalho */}
      <section className="relative overflow-hidden px-6 pb-14 pt-16 sm:px-10 lg:pb-20 lg:pt-24">
        <div
          aria-hidden
          className="deck-grid absolute inset-0"
          style={
            {
              "--deck-grid-color": "rgba(255,255,255,0.04)",
              "--deck-grid-size": "62px",
            } as React.CSSProperties
          }
        />
        <div className="relative z-10 mx-auto max-w-[84rem]">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.18em] text-green">
              <span>Tabela Oficial de Preços · Sinapro-SP</span>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <DeckHeading className="mt-4">
              Preços &amp; Tabela
              <br />Referencial de Serviços
            </DeckHeading>
          </Reveal>
          
          {/* Informação Oficial Sinapro-SP */}
          <Reveal delay={120}>
            <div className="mt-6 flex max-w-3xl items-center gap-3 rounded-xl border border-cyan/30 bg-cyan/[0.06] p-4 backdrop-blur-md">
              <Info className="shrink-0 text-cyan" size={20} />
              <p className="text-[0.825rem] font-semibold leading-relaxed text-cyan/90 sm:text-[0.875rem]">
                Os valores seguem rigorosamente a tabela <strong>&ldquo;Valores Referenciais de Serviços Internos&rdquo;</strong>, publicada pelo <strong>Sinapro-SP</strong>.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-white/65 sm:text-base">
              Consulte a matriz completa de custos para o seu lançamento imobiliário. Selecione os entregáveis e acompanhe a evolução do investimento em tempo real conforme rola a página.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Barra Flutuante de Totalização que Acompanha a Rolagem */}
      {isScrolledPastHero && (
        <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-green/40 bg-[#0C0C1A]/95 p-3.5 px-6 shadow-2xl backdrop-blur-xl transition-all">
          <div className="flex flex-col">
            <span className="text-[0.65rem] font-extrabold uppercase tracking-wider text-white/50">
              Total Atual ({calcResult.detalhesDeliverables.length} itens)
            </span>
            <span className="font-display text-lg font-black text-green sm:text-xl">
              R$ {brl(calcResult.valorTotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToSummary}
            className="flex items-center gap-2 rounded-xl bg-pink px-4 py-2.5 text-[0.775rem] font-black uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.03]"
          >
            <ShoppingCart size={15} />
            <span>Ver Resumo / Cotar</span>
          </button>
        </div>
      )}

      {/* Tabela de Preços e Configurador */}
      <section className="px-6 pb-20 sm:px-10 lg:pb-28">
        <div className="mx-auto grid max-w-[84rem] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex flex-col gap-6">
            
            {/* Filtros por Macro Etapa (UPPERCASE) */}
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-ink-deep p-3.5">
              <span className="mr-2 text-[0.7rem] font-extrabold uppercase tracking-wider text-white/40">
                Blocos Sinapro-SP:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-[0.7rem] font-black uppercase tracking-wide transition-all ${
                    activeCategory === cat
                      ? "bg-pink text-white shadow-md"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat === "TODAS" ? "Todos os 10 Blocos" : cat}
                </button>
              ))}
            </div>

            {/* Checklist de Entregáveis Detalhados */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-[0.725rem] font-black uppercase tracking-[0.18em] text-white/40">
                  Matriz de Entregáveis Referenciais ({filteredDeliverables.length} itens)
                </p>
                <span className="text-[0.675rem] uppercase font-bold text-pink">
                  * 1º Item do Bloco 01 Fixo Mandatório
                </span>
              </div>

              {filteredDeliverables.map((d) => {
                const isSelected = selectedItems.includes(d.id);
                const isExpanded = expandedPackages.includes(d.id);
                const qtd = quantities[d.id] || 1;

                if (d.isObrigatorio) {
                  return (
                    <div
                      key={d.id}
                      className="rounded-2xl border border-pink/40 bg-pink/[0.06] p-5 shadow-sm"
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-display text-[0.7rem] font-black uppercase tracking-[0.12em] text-pink">
                          BLOCO 01 · {d.macroEtapaLabel.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1 rounded border border-pink/50 bg-pink/10 px-2 py-0.5 text-[0.625rem] font-bold uppercase text-pink">
                          <Lock size={10} /> MANDATÓRIO DA CAMPANHA
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-[0.925rem] font-extrabold uppercase tracking-wide text-white">
                            {d.nome}
                          </p>
                          <p className="mt-1.5 text-[0.8rem] leading-relaxed text-white/70">
                            {d.descricao}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-[0.95rem] font-black text-pink">
                            R$ {brl(d.precoBase)}
                          </span>
                        </div>
                      </div>

                      {/* Entregáveis Inclusos Detalhados */}
                      {d.detalhes && d.detalhes.length > 0 && (
                        <div className="mt-4 border-t border-pink/20 pt-3">
                          <button
                            type="button"
                            onClick={(e) => togglePackageExpanded(d.id, e)}
                            className="flex items-center gap-1.5 text-[0.75rem] font-black uppercase tracking-wider text-pink"
                          >
                            {isExpanded ? "Ocultar especificações técnicas" : "Ver entregáveis inclusos no escopo"}
                            <ChevronDown
                              size={14}
                              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </button>
                          {isExpanded && (
                            <ul className="mt-3 grid gap-2 sm:grid-cols-2 rounded-xl border border-pink/20 bg-pink/10 p-3.5">
                              {d.detalhes.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-[0.75rem] text-white/80">
                                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-pink" />
                                  <span>{item}</span>
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
                    className={`rounded-2xl border p-5 transition-all ${
                      isSelected
                        ? "border-green/40 bg-green/[0.04]"
                        : "border-white/10 bg-ink-deep hover:border-white/20"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div
                        onClick={() => toggleItem(d.id, d.isObrigatorio)}
                        className="flex flex-1 cursor-pointer items-start gap-3"
                      >
                        <span
                          className={`mt-1 flex size-[20px] shrink-0 items-center justify-center rounded border ${
                            isSelected ? "border-green bg-green/20" : "border-white/25"
                          }`}
                        >
                          {isSelected && <Check size={12} className="text-green" strokeWidth={3} />}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[0.875rem] font-bold text-white">{d.nome}</span>
                            <span className="rounded bg-white/10 px-2 py-0.5 text-[0.625rem] font-extrabold uppercase tracking-wider text-white/60">
                              {d.macroEtapaLabel.toUpperCase()}
                            </span>
                            {d.unidadeMedida && (
                              <span className="rounded bg-cyan/10 px-2 py-0.5 text-[0.625rem] font-bold text-cyan">
                                {d.unidadeMedida}
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-[0.8rem] leading-relaxed text-white/65">{d.descricao}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-white/10 pt-2 sm:border-t-0 sm:pt-0">
                        {isSelected && d.unidadeMedida && (
                          <div className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-ink p-1">
                            <span className="px-1 text-[0.65rem] font-bold text-white/40">Qtd:</span>
                            <button
                              type="button"
                              onClick={(e) => updateQuantity(d.id, -1, e)}
                              className="flex size-5 items-center justify-center rounded bg-white/10 text-[0.75rem] font-bold text-white hover:bg-white/20"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-[0.8rem] font-bold text-white">
                              {qtd}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => updateQuantity(d.id, 1, e)}
                              className="flex size-5 items-center justify-center rounded bg-white/10 text-[0.75rem] font-bold text-white hover:bg-white/20"
                            >
                              +
                            </button>
                          </div>
                        )}

                        <span
                          className={`text-[0.875rem] font-black ${
                            isSelected ? "text-green" : "text-white"
                          }`}
                        >
                          R$ {brl(d.precoBase * (isSelected ? qtd : 1))}
                        </span>
                      </div>
                    </div>

                    {/* Entregáveis Inclusos Detalhados (Opcionais) */}
                    {d.detalhes && d.detalhes.length > 0 && (
                      <div className="mt-3 border-t border-white/10 pt-3">
                        <button
                          type="button"
                          onClick={(e) => togglePackageExpanded(d.id, e)}
                          className="flex items-center gap-1.5 text-[0.725rem] font-extrabold uppercase tracking-wider text-cyan"
                        >
                          {isExpanded ? "Ocultar especificações técnicas" : "Ver entregáveis inclusos no escopo"}
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isExpanded && (
                          <ul className="mt-2.5 grid gap-2 sm:grid-cols-2 rounded-xl border border-white/10 bg-ink p-3.5">
                            {d.detalhes.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-[0.75rem] text-white/75">
                                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-cyan" />
                                <span>{item}</span>
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

            {/* Calculadora de Horas Adicionais por Especialidade */}
            <div className="rounded-2xl border border-white/10 bg-ink-deep p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Clock className="text-cyan" size={18} />
                  <h3 className="text-[0.95rem] font-extrabold uppercase tracking-wide text-white">
                    Demandas Extras · Tabela de Hora-Homem
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHourlyRates(!showHourlyRates)}
                  className="text-[0.75rem] font-bold text-cyan hover:underline"
                >
                  {showHourlyRates ? "Ocultar tabela" : "Ver / Adicionar horas"}
                </button>
              </div>

              {showHourlyRates && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {SINAPRO_HOURLY_RATES.map((rate) => {
                    const h = extraHours[rate.id] || 0;
                    return (
                      <div
                        key={rate.id}
                        className="flex flex-col justify-between rounded-xl border border-white/10 bg-ink p-3.5"
                      >
                        <div>
                          <div className="flex justify-between text-[0.8rem] font-bold text-white">
                            <span className="uppercase">{rate.area}</span>
                            <span className="text-cyan">R$ {brl(rate.taxaPorHora)}/h</span>
                          </div>
                          <p className="mt-1 text-[0.7rem] text-white/45">{rate.descricao}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2">
                          <span className="text-[0.725rem] text-white/60">Horas extras:</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max="500"
                              value={h}
                              onChange={(e) =>
                                updateExtraHours(rate.id, parseInt(e.target.value) || 0)
                              }
                              className="w-16 rounded border border-white/15 bg-ink-deep px-2 py-1 text-center text-[0.8rem] font-bold text-white outline-none focus:border-cyan"
                            />
                            <span className="text-[0.75rem] font-bold text-cyan">
                              = R$ {brl(h * rate.taxaPorHora)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Comparativo de Modelo */}
            <div className="rounded-2xl border border-white/10 bg-ink-deep p-6">
              <h3 className="text-[0.95rem] font-extrabold uppercase tracking-wide text-white">
                Comparativo: Modelo Tradicional (% VGV) vs TAGMOB OS (Sinapro-SP)
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-[0.8rem]">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40">
                      <th className="pb-2 font-bold uppercase tracking-wider">Critério</th>
                      <th className="pb-2 font-bold uppercase tracking-wider">Agências Tradicionais</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-green">TAGMOB OS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/70">
                    {COMPARATIVE_ROWS.map((row) => (
                      <tr key={row.criterio}>
                        <td className="py-2.5 font-bold text-white">{row.criterio}</td>
                        <td className="py-2.5 text-white/50">{row.trad}</td>
                        <td className="py-2.5 font-semibold text-green">{row.tag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Painel do Orçamento & Formulário — STICKY PERFEITO NO SCROLL */}
          <div
            id="resumo-orcamento-panel"
            className="flex flex-col gap-6 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto"
          >
            {/* Resumo do Cálculo */}
            <div className="rounded-2xl border border-white/15 bg-ink-deep p-6 shadow-xl">
              <p className="font-display text-[0.7rem] font-black uppercase tracking-[0.16em] text-white/40">
                Resumo de Preços (Sinapro-SP)
              </p>

              {/* Informação Técnica Sinapro-SP */}
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-[0.725rem] text-white/70">
                <Info size={14} className="mt-0.5 shrink-0 text-cyan" />
                <span>Valores Referenciais de Serviços Internos, publicado pelo Sinapro-SP.</span>
              </div>

              {/* Regras Comerciais: Desconto Interior + Refação */}
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-ink p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[0.775rem] font-bold text-white">
                    <MapPin size={14} className="text-green" />
                    <span className="uppercase">Desconto Interior (Até 40%)</span>
                  </div>
                  <span className="text-[0.8rem] font-black text-green">
                    {(descontoInteriorPct * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.40"
                  step="0.05"
                  value={descontoInteriorPct}
                  onChange={(e) => setDescontoInteriorPct(parseFloat(e.target.value))}
                  className="w-full accent-green cursor-pointer"
                />
                <p className="text-[0.675rem] text-white/40">
                  Desconto comercial configurável para campanhas de incorporadoras do interior.
                </p>

                <div className="mt-2 border-t border-white/10 pt-3">
                  <label className="flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      checked={aplicaRefacao}
                      onChange={(e) => setAplicaRefacao(e.target.checked)}
                      className="mt-0.5 accent-pink cursor-pointer"
                    />
                    <div>
                      <span className="text-[0.775rem] font-bold uppercase text-pink">
                        Taxa de Refação Adicional (+40%)
                      </span>
                      <p className="text-[0.675rem] text-white/40">
                        Aplicada caso ocorram alterações fora do briefing original aprovado.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Decomposição do Valor */}
              <div className="mt-5 flex flex-col gap-2.5 border-b border-white/10 pb-4 text-[0.825rem]">
                <div className="flex justify-between">
                  <span className="text-white/60 uppercase text-[0.75rem]">Criação de Campanha (Bloco 01)</span>
                  <span className="font-bold text-pink">R$ {brl(calcResult.valorEtapa1Fixo)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 uppercase text-[0.75rem]">Peças Opcionais</span>
                  <span className="font-bold text-white">R$ {brl(calcResult.valorPecasOpcionais)}</span>
                </div>
                {calcResult.valorHorasAdicionais > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/60 uppercase text-[0.75rem]">Horas Adicionais</span>
                    <span className="font-bold text-cyan">R$ {brl(calcResult.valorHorasAdicionais)}</span>
                  </div>
                )}
                {calcResult.valorDescontoInterior > 0 && (
                  <div className="flex justify-between text-green">
                    <span className="uppercase text-[0.75rem]">Desconto Interior ({(descontoInteriorPct * 100).toFixed(0)}%)</span>
                    <span className="font-bold">- R$ {brl(calcResult.valorDescontoInterior)}</span>
                  </div>
                )}
                {calcResult.valorTaxaRefacao > 0 && (
                  <div className="flex justify-between text-pink">
                    <span className="uppercase text-[0.75rem]">Taxa de Refação (+40%)</span>
                    <span className="font-bold">+ R$ {brl(calcResult.valorTaxaRefacao)}</span>
                  </div>
                )}
              </div>

              {/* Total Final */}
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-[0.8rem] font-black uppercase tracking-wide text-white">
                  Investimento Total
                </span>
                <span className="font-display text-2xl font-black tracking-[-0.03em] text-green">
                  R$ {brl(calcResult.valorTotal)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                aria-expanded={showDetails}
                className="mt-3 flex items-center gap-1.5 text-[0.75rem] font-bold text-cyan"
              >
                {showDetails ? "Ocultar detalhamento de peças" : "Ver detalhamento de peças selecionadas"}
                <ChevronDown
                  size={13}
                  className={`transition-transform ${showDetails ? "rotate-180" : ""}`}
                />
              </button>

              {showDetails && (
                <div className="mt-4 flex max-h-52 flex-col gap-2 overflow-y-auto rounded-xl border border-white/10 bg-ink p-3.5">
                  {calcResult.detalhesDeliverables.map((item) => (
                    <div key={item.deliverable.id} className="flex justify-between gap-2 text-[0.75rem]">
                      <span className="truncate text-white/60">
                        {item.deliverable.nome} {item.quantidade > 1 ? `(x${item.quantidade})` : ""}
                      </span>
                      <span
                        className={`shrink-0 font-semibold ${
                          item.deliverable.isObrigatorio ? "text-pink" : "text-white"
                        }`}
                      >
                        R$ {brl(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Form de Proposta */}
              {successProposal ? (
                <div className="mt-6 rounded-xl border border-green/30 bg-green/10 p-5 text-center">
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-green/20 text-green">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <h4 className="mt-3 font-display text-[0.95rem] font-bold text-white uppercase">
                    Cotação Gerada com Sucesso!
                  </h4>
                  <p className="mt-1 text-[0.775rem] text-white/70">
                    Protocolo: <strong>{successProposal.id}</strong>
                  </p>
                  <p className="mt-2 text-[0.8rem] font-extrabold text-green">
                    Valor Orçado: R$ {brl(successProposal.total)}
                  </p>
                  <p className="mt-3 text-[0.725rem] text-white/50">
                    Nossa equipe comercial entrará em contato para formalizar o contrato.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccessProposal(null)}
                    className="mt-4 w-full rounded-lg bg-white/10 py-2 text-[0.775rem] font-bold text-white hover:bg-white/20"
                  >
                    Simular Novos Preços
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Seu nome completo *"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    placeholder="E-mail corporativo *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp / Telefone com DDD"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Nome da Incorporadora / Construtora"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    className={inputClass}
                  />
                  <textarea
                    placeholder="Instruções sobre o empreendimento ou especificações adicionais..."
                    rows={3}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                  {erro && <p className="text-[0.775rem] font-semibold text-pink">{erro}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 rounded-xl bg-pink py-3.5 text-[0.85rem] font-extrabold uppercase tracking-wider text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {loading ? "Gerando cotação..." : "Solicitar Proposta de Preços (Sinapro-SP)"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
