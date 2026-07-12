"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox, Search, Filter, ArrowRight, User, Building2,
  Mail, Phone, Star, CheckCircle2, RefreshCw,
} from "lucide-react";
import { LEAD_STATUS_LABELS } from "@/lib/crm";
import type { LeadDTO } from "@/lib/crm";

const STATUS_COLORS: Record<string, string> = {
  NOVO: "#00E5FF",
  EM_ATENDIMENTO: "#FFB800",
  QUALIFICADO: "#8B5CF6",
  CONVERTIDO: "#39FF14",
  ARQUIVADO: "#7878A0",
};

export default function LeadsInboxPage() {
  const [leads, setLeads] = useState<LeadDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("TODOS");
  const [search, setSearch] = useState("");

  async function loadLeads() {
    setLoading(true);
    try {
      const res = await fetch("/api/crm/leads");
      const json = await res.json();
      if (json.data) setLeads(json.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadLeads(); }, []);

  async function updateStatus(id: string, status: string) {
    const res = await fetch("/api/crm/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const json = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === id ? json.data : l)));
    }
  }

  async function convertLead(lead: LeadDTO) {
    const nome = lead.empresa ? `${lead.empresa} — Novo OS` : `Projeto ${lead.nome}`;
    const res = await fetch("/api/crm/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId: lead.id,
        nome,
        valorContrato: lead.orcamentoEstimado ? Number(lead.orcamentoEstimado) : undefined,
      }),
    });
    if (res.ok) await loadLeads();
  }

  const filtered = leads.filter((l) => {
    if (filter !== "TODOS" && l.status !== filter) return false;
    const q = search.toLowerCase();
    if (!q) return true;
    return l.nome.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.empresa?.toLowerCase().includes(q) ?? false);
  });

  const counts = leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ padding: "28px 32px", minHeight: "100vh", backgroundColor: "#09090F" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Inbox size={18} color="#FF0068" />
            <span style={{ fontSize: 10, fontWeight: 800, color: "#FF0068", letterSpacing: "0.06em" }}>CRM · LEADS</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "#EEEEFF" }}>Inbox de Leads</h1>
          <p style={{ fontSize: 14, color: "#7878A0", marginTop: 4 }}>Qualifique, atribua e converta leads em negócios TAGMOB OS.</p>
        </div>
        <button onClick={loadLeads} style={{ display: "flex", alignItems: "center", gap: 6, background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px", color: "#7878A0", cursor: "pointer", fontSize: 13 }}>
          <RefreshCw size={14} /> Atualizar
        </button>
      </div>

      {/* Status tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["TODOS", "NOVO", "EM_ATENDIMENTO", "QUALIFICADO", "CONVERTIDO"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer",
              background: filter === s ? (STATUS_COLORS[s] ?? "#FF0068") + "20" : "#111120",
              border: `1px solid ${filter === s ? (STATUS_COLORS[s] ?? "#FF0068") + "40" : "#1A1A30"}`,
              color: filter === s ? (STATUS_COLORS[s] ?? "#FF0068") : "#7878A0",
            }}
          >
            {s === "TODOS" ? "Todos" : LEAD_STATUS_LABELS[s]} {s !== "TODOS" && counts[s] ? `(${counts[s]})` : s === "TODOS" ? `(${leads.length})` : ""}
          </button>
        ))}
      </div>

      <div style={{ position: "relative", marginBottom: 20, maxWidth: 320 }}>
        <Search size={14} color="#7878A0" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar lead..."
          style={{ width: "100%", background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px 8px 34px", fontSize: 13, color: "#EEEEFF", outline: "none" }}
        />
      </div>

      {loading ? (
        <p style={{ color: "#7878A0" }}>Carregando leads...</p>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 48, color: "#3A3A5C" }}>
          <Inbox size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p>Nenhum lead encontrado. Leads da landing page aparecem aqui automaticamente.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((lead) => {
            const color = STATUS_COLORS[lead.status] ?? "#7878A0";
            return (
              <div key={lead.id} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color, backgroundColor: color + "18", padding: "2px 8px", borderRadius: 4 }}>
                        {LEAD_STATUS_LABELS[lead.status]}
                      </span>
                      {lead.prioridade === 1 && <Star size={12} color="#FFB800" fill="#FFB800" />}
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#EEEEFF", marginBottom: 4 }}>{lead.nome}</h3>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12, color: "#7878A0" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Mail size={12} />{lead.email}</span>
                      {lead.telefone && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Phone size={12} />{lead.telefone}</span>}
                      {lead.empresa && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Building2 size={12} />{lead.empresa}</span>}
                    </div>
                    {lead.mensagem && <p style={{ fontSize: 12, color: "#3A3A5C", marginTop: 8, lineHeight: 1.4 }}>{lead.mensagem.slice(0, 120)}{lead.mensagem.length > 120 ? "…" : ""}</p>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                    {lead.orcamentoEstimado && (
                      <span style={{ fontSize: 14, fontWeight: 800, color: "#FF0068" }}>
                        R$ {Number(lead.orcamentoEstimado).toLocaleString("pt-BR")}
                      </span>
                    )}
                    {lead.ownerUser && (
                      <span style={{ fontSize: 11, color: "#7878A0", display: "flex", alignItems: "center", gap: 4 }}>
                        <User size={11} /> {lead.ownerUser.fullName}
                      </span>
                    )}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {lead.status === "NOVO" && (
                        <button onClick={() => updateStatus(lead.id, "EM_ATENDIMENTO")} style={{ fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 6, background: "#FFB80020", border: "1px solid #FFB80040", color: "#FFB800", cursor: "pointer" }}>
                          Atender
                        </button>
                      )}
                      {lead.status !== "CONVERTIDO" && lead.status !== "ARQUIVADO" && (
                        <button onClick={() => convertLead(lead)} style={{ fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 6, background: "#39FF1420", border: "1px solid #39FF1440", color: "#39FF14", cursor: "pointer" }}>
                          Converter em negócio
                        </button>
                      )}
                      {lead.convertedEmpreendimento && (
                        <Link href={`/tagmob-os/${lead.convertedEmpreendimento.id}`} style={{ fontSize: 11, fontWeight: 700, color: "#00E5FF", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                          <CheckCircle2 size={11} /> {lead.convertedEmpreendimento.nome} <ArrowRight size={10} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
