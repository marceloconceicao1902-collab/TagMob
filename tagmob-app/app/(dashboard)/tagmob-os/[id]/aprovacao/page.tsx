"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ShieldCheck, CheckCircle2, XCircle, Clock,
  MessageSquare, AlertCircle, Eye, Lock, FileText, Sparkles,
} from "lucide-react";
import { MOCK_EMPREENDIMENTOS, getAssetsEmpreendimento } from "@/lib/mock-data";
import type { AssetOS, AssetStatus } from "@/lib/types";

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function statusLabel(s: AssetStatus): { label: string; color: string } {
  const m: Record<AssetStatus, { label: string; color: string }> = {
    RASCUNHO:           { label: "Rascunho",           color: "#3A3A5C" },
    AGUARDANDO_AGENCIA: { label: "Ag. Agência",        color: "#FF0068" },
    AGUARDANDO_CLIENTE: { label: "Ag. Cliente",        color: "#FFB800" },
    APROVADO:           { label: "Aprovado",           color: "#39FF14" },
    REPROVADO:          { label: "Reprovado",          color: "#FF4444" },
  };
  return m[s];
}

function tipoIcone(tipo: AssetOS["tipo"]) {
  const m: Record<AssetOS["tipo"], string> = {
    INSTAGRAM_POST: "IG",
    STORY:          "ST",
    BANNER_DIGITAL: "BN",
    PDF_GRAFICA:    "PDF",
    VIDEO_REELS:    "VD",
    ENCARTE:        "EN",
  };
  return m[tipo];
}

/* ─── Timeline de Aprovação ─────────────────────────────────────────────────── */
function TimelineAprovacao({ asset }: { asset: AssetOS }) {
  const steps = [
    {
      label: "Criação pela Agência",
      desc: "Peça criada e verificada internamente",
      ok: true,
      data: asset.criado_em,
      cor: "#8B5CF6",
    },
    {
      label: "Revisão da Agência",
      desc: "TAGMOB aprova antes de enviar ao cliente",
      ok: !!asset.aprovado_agencia_em,
      data: asset.aprovado_agencia_por
        ? `${asset.aprovado_agencia_por} · ${new Date(asset.aprovado_agencia_em!).toLocaleDateString("pt-BR")}`
        : "Pendente",
      cor: "#FF0068",
    },
    {
      label: "Aprovação do Cliente",
      desc: "Cliente assina digitalmente",
      ok: !!asset.aprovado_cliente_em,
      data: asset.aprovado_cliente_por
        ? `${asset.aprovado_cliente_por} · ${new Date(asset.aprovado_cliente_em!).toLocaleDateString("pt-BR")}`
        : "Pendente",
      cor: "#FFB800",
    },
    {
      label: "Entra na Biblioteca Viva",
      desc: "Asset disponível no editor do cliente",
      ok: asset.status === "APROVADO",
      data: asset.status === "APROVADO" ? "Disponível" : "Aguardando",
      cor: "#39FF14",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, flexShrink: 0 }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: step.ok ? step.cor + "25" : "#1A1A30",
              border: `1.5px solid ${step.ok ? step.cor + "60" : "#282840"}`,
              fontSize: 10, fontWeight: 800,
              color: step.ok ? step.cor : "#3A3A5C",
            }}>
              {step.ok ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 1.5, height: 24, backgroundColor: step.ok ? step.cor + "35" : "#1A1A30" }} />
            )}
          </div>
          <div style={{ paddingBottom: i < steps.length - 1 ? 8 : 0 }}>
            <p style={{ fontSize: 13, fontWeight: step.ok ? 700 : 500, color: step.ok ? "#EEEEFF" : "#3A3A5C", lineHeight: 1.2, marginBottom: 2 }}>{step.label}</p>
            <p style={{ fontSize: 11, color: step.ok ? "#7878A0" : "#2E2E4A", marginBottom: 2 }}>{step.desc}</p>
            {step.ok && <p style={{ fontSize: 10, color: step.cor + "90" }}>{step.data}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Card de Asset ─────────────────────────────────────────────────────────── */
function AssetCard({
  asset,
  selected,
  onSelect,
}: {
  asset: AssetOS;
  selected: boolean;
  onSelect: () => void;
}) {
  const st = statusLabel(asset.status);
  const pendente = asset.status === "AGUARDANDO_AGENCIA" || asset.status === "AGUARDANDO_CLIENTE";

  return (
    <button
      onClick={onSelect}
      style={{
        background: "none", width: "100%", textAlign: "left",
        padding: "14px 16px", cursor: "pointer",
        backgroundColor: selected ? "#FF006808" : "transparent",
        border: `1px solid ${selected ? "#FF006835" : "transparent"}`,
        borderRadius: 10, transition: "all 0.1s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Tipo */}
        <div style={{ width: 38, height: 30, borderRadius: 7, backgroundColor: pendente ? "#FFB80018" : "#1A1A30", border: `1px solid ${pendente ? "#FFB80030" : "#282840"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: pendente ? "#FFB800" : "#3A3A5C", flexShrink: 0, letterSpacing: "0.06em" }}>
          {tipoIcone(asset.tipo)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#EEEEFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{asset.nome}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: st.color, backgroundColor: st.color + "18", padding: "1px 6px", borderRadius: 3 }}>
              {st.label}
            </span>
            {asset.comentarios.length > 0 && (
              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#7878A0" }}>
                <MessageSquare size={9} />
                {asset.comentarios.length}
              </span>
            )}
          </div>
        </div>

        {pendente && (
          <AlertCircle size={14} color="#FFB800" style={{ flexShrink: 0 }} />
        )}
      </div>
    </button>
  );
}

/* ─── Painel de Detalhe ─────────────────────────────────────────────────────── */
function PainelDetalhe({ asset, onAprovar, onReprovar }: { asset: AssetOS; onAprovar: (id: string) => void; onReprovar: (id: string) => void }) {
  const st = statusLabel(asset.status);
  const podeAgencia = asset.status === "AGUARDANDO_AGENCIA";
  const podeCliente = asset.status === "AGUARDANDO_CLIENTE";
  const podeAprovar = podeAgencia || podeCliente;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, height: "100%" }}>
      {/* Preview da peça */}
      <div style={{ background: "#0D0D1A", borderBottom: "1px solid #1A1A30", padding: 24, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 180, position: "relative" }}>
        <div style={{ width: "100%", maxWidth: 240, aspectRatio: asset.tipo === "STORY" ? "9/16" : "1/1", background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", maxHeight: 180 }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "#3A3A5C", marginBottom: 4 }}>{tipoIcone(asset.tipo)}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#2E2E4A", letterSpacing: "-0.02em" }}>{asset.dimensoes}</p>
          </div>
        </div>
        {asset.bloqueado && (
          <div style={{ position: "absolute", top: 10, right: 10, display: "flex", alignItems: "center", gap: 5, background: "rgba(255,0,104,0.1)", border: "1px solid rgba(255,0,104,0.3)", borderRadius: 6, padding: "3px 8px" }}>
            <Lock size={10} color="#FF0068" />
            <span style={{ fontSize: 9, color: "#FF0068", fontWeight: 700 }}>AGÊNCIA IP</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: 20, flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Nome e status */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF" }}>{asset.nome}</h3>
            <span style={{ fontSize: 11, fontWeight: 700, color: st.color, backgroundColor: st.color + "18", padding: "3px 10px", borderRadius: 20 }}>
              {st.label}
            </span>
          </div>
          <p style={{ fontSize: 13, color: "#7878A0", lineHeight: 1.5 }}>{asset.descricao}</p>
        </div>

        {/* Campos editáveis */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
            Variáveis editáveis pelo cliente
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {asset.campos_editaveis.map((campo) => (
              <div key={campo.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 12px", background: "#111120", border: "1px solid #1A1A30", borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Sparkles size={11} color="#39FF14" />
                  <span style={{ fontSize: 12, color: "#7878A0" }}>{campo.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>{campo.valor_atual}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
            Pipeline de Aprovação
          </p>
          <TimelineAprovacao asset={asset} />
        </div>

        {/* Comentários */}
        {asset.comentarios.length > 0 && (
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
              Comentários
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {asset.comentarios.map((c) => (
                <div key={c.id} style={{ padding: "10px 12px", background: "#111120", border: "1px solid #1A1A30", borderRadius: 8 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: c.perfil === "AGENCIA" ? "#FF0068" : "#FFB800" }}>{c.autor}</span>
                    <span style={{ fontSize: 10, color: "#2E2E4A" }}>{c.perfil}</span>
                    <span style={{ fontSize: 10, color: "#2E2E4A", marginLeft: "auto" }}>{new Date(c.criado_em).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.6 }}>{c.mensagem}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ações de aprovação */}
      {podeAprovar && (
        <div style={{ padding: 16, borderTop: "1px solid #1A1A30", display: "flex", flexDirection: "column", gap: 10, backgroundColor: "#0D0D1A" }}>
          <div style={{ padding: "10px 12px", background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 8 }}>
            <p style={{ fontSize: 11, color: "#FFB800", fontWeight: 600 }}>
              {podeAgencia ? "⚡ Ação da Agência TAGMOB" : "⚡ Ação do Cliente"}
            </p>
            <p style={{ fontSize: 11, color: "#7878A0", marginTop: 2, lineHeight: 1.5 }}>
              {podeAgencia
                ? "Revise a peça e aprove para envio ao cliente, ou reprove com comentário."
                : "Cliente precisa assinar digitalmente para liberar esta peça na biblioteca."}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onReprovar(asset.id)}
              style={{ flex: 1, padding: "10px", borderRadius: 8, background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.3)", color: "#FF4444", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              <XCircle size={14} /> Reprovar
            </button>
            <button
              onClick={() => onAprovar(asset.id)}
              style={{ flex: 1, padding: "10px", borderRadius: 8, background: "#39FF14", border: "none", color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              <CheckCircle2 size={14} /> Aprovar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */
export default function GatekeeperPage() {
  const empId    = "emp-001";
  const emp      = MOCK_EMPREENDIMENTOS.find((e) => e.id === empId)!;
  const allAssets = getAssetsEmpreendimento(empId);

  const [assets, setAssets]   = useState<AssetOS[]>(allAssets);
  const [selected, setSelected] = useState<AssetOS | null>(allAssets.find((a) => a.status !== "APROVADO") ?? allAssets[0]);
  const [filtro, setFiltro]   = useState<"TODOS" | AssetStatus>("TODOS");

  const filtrados = filtro === "TODOS" ? assets : assets.filter((a) => a.status === filtro);

  function handleAprovar(id: string) {
    setAssets((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const novoStatus: AssetStatus =
          a.status === "AGUARDANDO_AGENCIA" ? "AGUARDANDO_CLIENTE" : "APROVADO";
        return {
          ...a,
          status: novoStatus,
          aprovado_agencia_em: a.status === "AGUARDANDO_AGENCIA" ? new Date().toISOString() : a.aprovado_agencia_em,
          aprovado_agencia_por: a.status === "AGUARDANDO_AGENCIA" ? "Você — TAGMOB" : a.aprovado_agencia_por,
          aprovado_cliente_em: novoStatus === "APROVADO" ? new Date().toISOString() : null,
          aprovado_cliente_por: novoStatus === "APROVADO" ? "Cliente Demo" : null,
        };
      })
    );
    const updated = assets.find((a) => a.id === id);
    if (updated) setSelected({ ...updated, status: updated.status === "AGUARDANDO_AGENCIA" ? "AGUARDANDO_CLIENTE" : "APROVADO" });
  }

  function handleReprovar(id: string) {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "REPROVADO" as AssetStatus } : a))
    );
  }

  const counts = {
    pendentes: assets.filter((a) => a.status === "AGUARDANDO_AGENCIA" || a.status === "AGUARDANDO_CLIENTE").length,
    aprovados: assets.filter((a) => a.status === "APROVADO").length,
    total:     assets.length,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

      {/* Header fixo */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #1A1A30", background: "#0D0D1A", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", flexShrink: 0 }}>
        <Link href={`/tagmob-os/${empId}`} style={{ display: "flex", alignItems: "center", gap: 6, color: "#7878A0", textDecoration: "none", fontSize: 13 }}>
          <ArrowLeft size={14} /> {emp.nome}
        </Link>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 14px", backgroundColor: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", borderRadius: 9 }}>
            <ShieldCheck size={15} color="#FFB800" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#FFB800" }}>Gatekeeper — Agência → Cliente</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#7878A0" }}>
            <span><span style={{ color: "#FFB800", fontWeight: 700 }}>{counts.pendentes}</span> pendente{counts.pendentes !== 1 ? "s" : ""}</span>
            <span>·</span>
            <span><span style={{ color: "#39FF14", fontWeight: 700 }}>{counts.aprovados}</span> aprovada{counts.aprovados !== 1 ? "s" : ""}</span>
            <span>·</span>
            <span>{counts.total} total</span>
          </div>
        </div>
      </div>

      {/* Corpo do Gatekeeper */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Lista de assets */}
        <div style={{ width: 280, borderRight: "1px solid #1A1A30", display: "flex", flexDirection: "column", flexShrink: 0 }}>

          {/* Filtros */}
          <div style={{ padding: "10px 12px", borderBottom: "1px solid #1A1A30", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(["TODOS", "AGUARDANDO_AGENCIA", "AGUARDANDO_CLIENTE", "APROVADO"] as const).map((f) => {
              const labels: Record<string, string> = { TODOS: "Todos", AGUARDANDO_AGENCIA: "Ag. Agência", AGUARDANDO_CLIENTE: "Ag. Cliente", APROVADO: "Aprovados" };
              const colors: Record<string, string> = { TODOS: "#7878A0", AGUARDANDO_AGENCIA: "#FF0068", AGUARDANDO_CLIENTE: "#FFB800", APROVADO: "#39FF14" };
              return (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  style={{ padding: "3px 10px", borderRadius: 20, cursor: "pointer", fontSize: 11, fontWeight: 700, backgroundColor: filtro === f ? colors[f] + "20" : "transparent", border: `1px solid ${filtro === f ? colors[f] + "50" : "#1A1A30"}`, color: filtro === f ? colors[f] : "#3A3A5C" }}
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
            {filtrados.length === 0 ? (
              <div style={{ textAlign: "center", padding: 32 }}>
                <CheckCircle2 size={24} color="#39FF14" style={{ margin: "0 auto 8px" }} />
                <p style={{ fontSize: 13, color: "#3A3A5C" }}>Nenhuma peça neste filtro</p>
              </div>
            ) : (
              filtrados.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  selected={selected?.id === asset.id}
                  onSelect={() => setSelected(asset)}
                />
              ))
            )}
          </div>
        </div>

        {/* Painel de detalhe */}
        <div style={{ flex: 1, overflowY: "auto", background: "#0D0D1A" }}>
          {selected ? (
            <PainelDetalhe
              asset={assets.find((a) => a.id === selected.id) ?? selected}
              onAprovar={handleAprovar}
              onReprovar={handleReprovar}
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 12 }}>
              <Eye size={32} color="#2E2E4A" />
              <p style={{ fontSize: 13, color: "#3A3A5C" }}>Selecione uma peça para revisar</p>
            </div>
          )}
        </div>

        {/* Coluna de auditoria */}
        <div style={{ width: 240, borderLeft: "1px solid #1A1A30", padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", flexShrink: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Log de Auditoria
          </p>

          {/* Progresso geral */}
          <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 10, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "#7878A0" }}>Aprovação geral</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF" }}>{Math.round((counts.aprovados / counts.total) * 100)}%</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: "#1A1A30" }}>
              <div style={{ height: "100%", width: `${(counts.aprovados / counts.total) * 100}%`, backgroundColor: "#39FF14", borderRadius: 2, transition: "width 0.3s" }} />
            </div>
          </div>

          {/* Eventos recentes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {assets.filter((a) => a.aprovado_agencia_em || a.aprovado_cliente_em).map((a) => (
              <div key={a.id} style={{ padding: "8px 10px", background: "#111120", border: "1px solid #1A1A30", borderRadius: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#EEEEFF", marginBottom: 2, lineHeight: 1.3 }}>{a.nome}</p>
                {a.aprovado_cliente_em && (
                  <p style={{ fontSize: 10, color: "#39FF14" }}>✓ Cliente: {new Date(a.aprovado_cliente_em).toLocaleDateString("pt-BR")}</p>
                )}
                {a.aprovado_agencia_em && !a.aprovado_cliente_em && (
                  <p style={{ fontSize: 10, color: "#FFB800" }}>⏳ Ag. cliente…</p>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", padding: 12, background: "rgba(255,0,104,0.04)", border: "1px solid rgba(255,0,104,0.15)", borderRadius: 8 }}>
            <div style={{ display: "flex", gap: 7, marginBottom: 4 }}>
              <Lock size={11} color="#FF0068" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 11, color: "#FF0068", fontWeight: 700 }}>Regra do Gatekeeper</p>
            </div>
            <p style={{ fontSize: 10, color: "#3A3A5C", lineHeight: 1.6 }}>
              Nenhuma peça entra na biblioteca do cliente sem assinatura digital nos dois níveis: Agência e Cliente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
