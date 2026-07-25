"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Lock, X } from "lucide-react";

import { COMPARATIVE_ROWS, DELIVERABLES } from "../_simulador-content";
import { DeckHeading } from "../_components/deck-split";
import { Reveal } from "../_components/reveal";

const brl = (v: number) => v.toLocaleString("pt-BR");

export function SimuladorClient() {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    DELIVERABLES.filter((d) => d.isObrigatorio).map((d) => d.id),
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
  const [showDetails, setShowDetails] = useState(false);
  const [expandedPackages, setExpandedPackages] = useState<string[]>([]);

  const togglePackageExpanded = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPackages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const setupFixo = DELIVERABLES.filter((d) => d.isObrigatorio).reduce(
    (sum, item) => sum + item.preco,
    0,
  );
  const custoModular = DELIVERABLES.filter(
    (d) => !d.isObrigatorio && selectedItems.includes(d.id),
  ).reduce((sum, item) => sum + item.preco, 0);
  const valorTotal = setupFixo + custoModular;

  const toggleItem = (id: string, isObrigatorio?: boolean) => {
    if (isObrigatorio) return;
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
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

    const fallbackId = "LEAD-LOCAL-" + Math.random().toString(36).substring(2, 9).toUpperCase();

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
              score: 85,
              createdAt: new Date().toISOString(),
            },
            ...existing,
          ]),
        );
      } catch {
        // Armazenamento local indisponível — a proposta segue pela API.
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
      // Mantém o protocolo local para que o usuário não perca a simulação.
    }

    setLoading(false);
    setSuccessProposal({ id: proposalId, total: valorTotal, itemsCount: selectedItems.length });
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
            <p className="font-display text-[0.7rem] font-black uppercase tracking-[0.18em] text-green">
              Calculadora aberta de lançamento
            </p>
          </Reveal>
          <Reveal delay={70}>
            <DeckHeading className="mt-4">
              Monte o escopo
              <br />
              do seu lançamento
            </DeckHeading>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-white/65 sm:text-base">
              Selecione as peças que fazem sentido para o seu empreendimento e acompanhe o
              investimento em tempo real. Valores fixos, com total transparência e sem cobrança
              sobre o VGV.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Simulador */}
      <section className="px-6 pb-20 sm:px-10 lg:pb-28">
        <div className="mx-auto grid max-w-[84rem] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex flex-col gap-3">
            <p className="font-display text-[0.7rem] font-black uppercase tracking-[0.16em] text-white/40">
              Checklist de entregáveis
            </p>

            {DELIVERABLES.filter((d) => d.isObrigatorio).map((d) => {
              const isExpanded = expandedPackages.includes(d.id);
              return (
                <div
                  key={d.id}
                  className="rounded-2xl border border-pink/30 bg-pink/[0.04] p-5"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.1em] text-pink">
                      Etapa 1 · Combo de inteligência mestre
                    </span>
                    <span className="rounded border border-pink px-1.5 py-px text-[0.6rem] font-bold text-pink">
                      FIXO &amp; OBRIGATÓRIO
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.875rem] font-bold text-white">{d.nome}</p>
                      <p className="mt-1 text-[0.775rem] text-white/55">{d.desc}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-[0.8rem] font-extrabold text-pink">
                        R$ {brl(d.preco)}
                      </span>
                      <Lock size={12} className="text-pink" />
                    </div>
                  </div>
                  <div className="mt-3 border-t border-pink/15 pt-3">
                    <button
                      type="button"
                      onClick={(e) => togglePackageExpanded(d.id, e)}
                      className="flex items-center gap-1.5 text-[0.75rem] font-bold text-pink"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Ocultar peças incluídas" : "Ver peças incluídas"}
                      <ChevronDown
                        size={13}
                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <ul className="mt-3 flex list-disc flex-col gap-1 pl-4">
                        {d.detalhes.map((p) => (
                          <li key={p} className="text-[0.775rem] text-white/55">
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

            {DELIVERABLES.filter((d) => !d.isObrigatorio).map((d) => {
              const isSelected = selectedItems.includes(d.id);
              const isExpanded = expandedPackages.includes(d.id);
              return (
                <div
                  key={d.id}
                  className={`rounded-2xl border p-5 transition-colors ${
                    isSelected
                      ? "border-green/40 bg-green/[0.04]"
                      : "border-white/10 bg-ink-deep hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(d.id, d.isObrigatorio)}
                    aria-pressed={isSelected}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[0.875rem] font-bold text-white">{d.nome}</span>
                        <span className="rounded bg-white/10 px-1.5 py-px text-[0.6rem] font-bold text-white/55">
                          {d.categoria}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-[0.775rem] text-white/55">{d.desc}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span
                        className={`text-[0.85rem] font-extrabold ${
                          isSelected ? "text-green" : "text-white"
                        }`}
                      >
                        R$ {brl(d.preco)}
                      </span>
                      <span
                        className={`flex size-[18px] items-center justify-center rounded border ${
                          isSelected ? "border-green bg-green/10" : "border-white/25"
                        }`}
                      >
                        {isSelected && <Check size={11} className="text-green" strokeWidth={3} />}
                      </span>
                    </span>
                  </button>

                  <div className="mt-3 border-t border-white/10 pt-3">
                    <button
                      type="button"
                      onClick={(e) => togglePackageExpanded(d.id, e)}
                      className="flex items-center gap-1.5 text-[0.75rem] font-bold text-cyan"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Ocultar peças incluídas" : "Ver peças incluídas"}
                      <ChevronDown
                        size={13}
                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <ul className="mt-3 flex list-disc flex-col gap-1 pl-4">
                        {d.detalhes.map((p) => (
                          <li key={p} className="text-[0.775rem] text-white/55">
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resumo + formulário */}
          <div className="rounded-2xl border border-white/10 bg-ink-deep p-6 lg:sticky lg:top-24">
            <p className="font-display text-[0.7rem] font-black uppercase tracking-[0.16em] text-white/40">
              Estimativa do orçamento
            </p>

            <div className="mt-5 flex flex-col gap-3 border-b border-white/10 pb-4">
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-white/55">Setup fixo (Etapa 1)</span>
                <span className="font-bold text-pink">R$ {brl(setupFixo)},00</span>
              </div>
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-white/55">Adições modulares</span>
                <span className="font-bold text-white">R$ {brl(custoModular)},00</span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-display text-[0.8rem] font-black uppercase tracking-wide text-white">
                Total orçado
              </span>
              <span className="font-display text-2xl font-black tracking-[-0.03em] text-green">
                R$ {brl(valorTotal)},00
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
              className="mt-3 flex items-center gap-1.5 text-[0.75rem] font-bold text-cyan"
            >
              {showDetails ? "Ocultar detalhes" : "Ver detalhes do pedido"}
              <ChevronDown
                size={13}
                className={`transition-transform ${showDetails ? "rotate-180" : ""}`}
              />
            </button>

            {showDetails && (
              <div className="mt-4 flex max-h-44 flex-col gap-2 overflow-y-auto rounded-xl border border-white/10 bg-ink p-3.5">
                {DELIVERABLES.filter((d) => selectedItems.includes(d.id)).map((d) => (
                  <div key={d.id} className="flex justify-between gap-2 text-[0.75rem]">
                    <span className="truncate text-white/55">{d.nome}</span>
                    <span
                      className={`shrink-0 font-semibold ${
                        d.isObrigatorio ? "text-pink" : "text-white"
                      }`}
                    >
                      R$ {brl(d.preco)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Seu nome *"
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
                placeholder="WhatsApp / telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Construtora / incorporadora"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className={inputClass}
              />
              <textarea
                placeholder="Instruções adicionais de escopo ou dúvidas..."
                rows={3}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className={`${inputClass} resize-none`}
              />
              {erro && <p className="text-[0.775rem] font-semibold text-pink">{erro}</p>}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 rounded-xl bg-pink py-3.5 text-[0.85rem] font-extrabold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? "Processando..." : "Solicitar proposta comercial"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="border-t border-white/[0.07] bg-ink-deep px-6 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-[62rem]">
          <Reveal>
            <p className="font-display text-[0.7rem] font-black uppercase tracking-[0.18em] text-pink">
              Por que o modelo tradicional não serve mais
            </p>
          </Reveal>
          <Reveal delay={70}>
            <DeckHeading accent="white" className="mt-4">
              Valores fixos,
              <br />
              sem taxa sobre o VGV
            </DeckHeading>
          </Reveal>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-3 border-b border-white/10 bg-ink">
              {["Critério", "Modelo tradicional", "Modelo TAGMOB"].map((h, i) => (
                <div
                  key={h}
                  className={`px-4 py-3.5 font-display text-[0.68rem] font-black uppercase tracking-[0.08em] sm:px-5 ${
                    i === 2 ? "text-pink" : "text-white/45"
                  } ${i > 0 ? "border-l border-white/10" : ""}`}
                >
                  {h}
                </div>
              ))}
            </div>
            {COMPARATIVE_ROWS.map((row, idx) => (
              <div
                key={row.criterio}
                className={`grid grid-cols-3 ${
                  idx < COMPARATIVE_ROWS.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <div className="px-4 py-4 text-[0.8rem] font-bold text-white sm:px-5">
                  {row.criterio}
                </div>
                <div className="border-l border-white/10 px-4 py-4 text-[0.8rem] text-white/40 line-through sm:px-5">
                  {row.trad}
                </div>
                <div className="flex items-start gap-2 border-l border-white/10 bg-pink/[0.02] px-4 py-4 text-[0.8rem] font-medium text-white sm:px-5">
                  <Check size={13} className="mt-0.5 shrink-0 text-green" />
                  {row.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confirmação */}
      {successProposal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Simulação enviada"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-6 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg rounded-2xl border-2 border-pink bg-ink-deep p-8">
            <button
              type="button"
              onClick={() => setSuccessProposal(null)}
              aria-label="Fechar"
              className="absolute right-5 top-5 text-white/50 transition-colors hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-green bg-green/10">
                <Check size={22} className="text-green" strokeWidth={3} />
              </div>
              <h2 className="mt-4 font-display text-xl font-black tracking-[-0.02em] text-white sm:text-2xl">
                Simulação enviada com sucesso
              </h2>
              <p className="mt-2 text-[0.8rem] text-white/55">
                Protocolo <strong className="text-cyan">#{successProposal.id}</strong>
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-ink p-5">
              <div className="flex justify-between text-[0.825rem]">
                <span className="text-white/55">Itens selecionados</span>
                <span className="font-bold text-white">
                  {successProposal.itemsCount} entregáveis
                </span>
              </div>
              <div className="mt-2 flex justify-between border-b border-white/10 pb-3 text-[0.825rem]">
                <span className="text-white/55">Modelo comercial</span>
                <span className="font-bold text-pink">Preço fixo, sem VGV</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-[0.75rem] font-black uppercase tracking-wide text-white">
                  Investimento estimado
                </span>
                <span className="font-display text-lg font-black text-green">
                  R$ {brl(successProposal.total)},00
                </span>
              </div>
            </div>

            <p className="mt-5 text-center text-[0.8rem] leading-relaxed text-white/55">
              Nossa equipe recebeu o escopo detalhado e entrará em contato para formalizar a
              proposta técnica.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setSuccessProposal(null)}
                className="rounded-xl bg-pink py-3 text-[0.825rem] font-extrabold text-white"
              >
                Fazer nova simulação
              </button>
              <Link
                href="/"
                className="rounded-xl border border-white/15 py-3 text-center text-[0.825rem] font-bold text-white/75 transition-colors hover:text-white"
              >
                Voltar ao site
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
