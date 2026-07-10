"use client";

import { useState } from "react";
import { ShieldCheck, TrendingDown, Sparkles, AlertTriangle, Check, X, ArrowRight } from "lucide-react";

// ─── Dados comparativos ────────────────────────────────────────────────────────
const rows = [
  {
    criterio: "Base de Precificação",
    trad: "% sobre VGV (2%–4% do valor das vendas)",
    tag: "Escopo fechado + entregáveis reais",
    tagIcon: "check",
  },
  {
    criterio: "Transparência de Custos",
    trad: "Opaco — cresce com o sucesso do cliente",
    tag: "Preço fixo por item no carrinho",
    tagIcon: "check",
  },
  {
    criterio: "Setup Inicial (Etapa 1)",
    trad: "Embutido no VGV — invisível",
    tag: "Combo fixo mandatório com KV, Film, Manual e Campanha",
    tagIcon: "check",
  },
  {
    criterio: "Personalização",
    trad: "Pacotes fechados sem flexibilidade",
    tag: "Carrinho modular: adiciona só o que faz sentido",
    tagIcon: "check",
  },
  {
    criterio: "Modelo de Contrato",
    trad: "Apenas Projeto Fechado",
    tag: "Projeto Fechado, Fee Mensal, Banco de Horas ou Por Demanda",
    tagIcon: "check",
  },
  {
    criterio: "Autonomia do Cliente",
    trad: "Zero — tudo passa pela agência",
    tag: "OS: edita variáveis, troca fotos, exporta em segundos",
    tagIcon: "check",
  },
  {
    criterio: "Fidelidade Longa",
    trad: "Contrato anual obrigatório",
    tag: "Sem fidelidade — você contrata o que precisa",
    tagIcon: "check",
  },
  {
    criterio: "IA na Campanha",
    trad: "Não há",
    tag: "Engine RAG contextualizada ao manifesto do empreendimento",
    tagIcon: "check",
  },
];

// ─── Componente principal ──────────────────────────────────────────────────────
export function ModelComparison() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="w-full my-10 px-2">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 mb-4">
          <Sparkles size={12} className="text-[var(--color-cyan)]" />
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-cyan)]">
            Modelo Anti-VGV
          </span>
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-fg)] mb-2 tracking-tight">
          Por que o modelo TAGMOB é diferente?
        </h2>
        <p className="text-sm text-[var(--color-muted)] max-w-xl mx-auto">
          A indústria cobra sobre o seu sucesso. Nós cobramos pelo nosso trabalho.
        </p>
      </div>

      {/* Table container */}
      <div className="rounded-2xl border border-[var(--color-line)] overflow-hidden bg-[var(--color-card)]">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-[var(--color-line)]">
          <div className="px-5 py-4 flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-widest">
              Critério
            </span>
          </div>

          {/* Tradicional */}
          <div className="px-5 py-4 border-l border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown size={14} className="text-[var(--color-danger)]" />
              <span className="text-xs font-bold text-[var(--color-danger)] uppercase tracking-wider">
                Modelo Tradicional
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-muted)] leading-relaxed">
              Baseado em % do VGV
            </p>
          </div>

          {/* TAGMOB */}
          <div className="px-5 py-4 border-l border-[var(--color-pink)]/30 bg-[var(--color-pink)]/5 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--color-pink) 0, var(--color-pink) 1px, transparent 0, transparent 50%)",
                backgroundSize: "8px 8px",
              }}
            />
            <div className="relative flex items-center gap-2 mb-1">
              <ShieldCheck size={14} className="text-[var(--color-pink)]" />
              <span className="text-xs font-bold text-[var(--color-pink)] uppercase tracking-wider">
                Modelo TAGMOB
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-muted)] leading-relaxed">
              Baseado em escopo real
            </p>
            <div className="absolute top-2 right-2">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-pink)] text-white">
                RECOMENDADO
              </span>
            </div>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_1fr_1fr] border-b border-[var(--color-line)] last:border-b-0 transition-colors duration-150 cursor-default ${
              hoveredRow === i ? "bg-[var(--color-card-hover)]" : ""
            }`}
            onMouseEnter={() => setHoveredRow(i)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Critério */}
            <div className="px-5 py-4 flex items-center">
              <span className="text-sm font-medium text-[var(--color-fg)]">
                {row.criterio}
              </span>
            </div>

            {/* Coluna Tradicional */}
            <div className="px-5 py-4 border-l border-[var(--color-line)] bg-[var(--color-surface)] flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0">
                <X size={13} className="text-[var(--color-danger)]/60" />
              </span>
              <span className="text-sm text-[var(--color-muted)] line-through decoration-[var(--color-danger)]/30 leading-relaxed">
                {row.trad}
              </span>
            </div>

            {/* Coluna TAGMOB */}
            <div
              className={`px-5 py-4 border-l flex items-start gap-2 transition-colors duration-150 ${
                hoveredRow === i
                  ? "border-[var(--color-pink)]/50 bg-[var(--color-pink)]/8"
                  : "border-[var(--color-pink)]/20 bg-[var(--color-pink)]/3"
              }`}
            >
              <span className="mt-0.5 flex-shrink-0">
                <Check size={13} className="text-[var(--color-green)]" />
              </span>
              <span className="text-sm text-[var(--color-fg)] font-medium leading-relaxed">
                {row.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-6 p-5 rounded-xl border border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 flex items-start gap-4">
        <AlertTriangle size={20} className="text-[var(--color-amber)] flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-[var(--color-amber)] mb-1">
            Etapa 1 é obrigatória e inegociável
          </p>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            O Combo Fixo de Setup (KV, Filme Conceito 30", Manual da Marca e Campanha) é o
            alicerce intelectual de toda campanha. Sem ele, os materiais subsequentes perdem
            coerência e o sistema não libera o carrinho modular.
          </p>
        </div>
        <button className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-[var(--color-amber)] text-[var(--color-base)] hover:brightness-110 transition-all duration-150">
          Ver o Combo
          <ArrowRight size={12} />
        </button>
      </div>
    </section>
  );
}
