"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LeadDetailView from "@/components/pipeline/LeadDetailView";
import { MOCK_LEADS } from "@/lib/mock-data";
import type { LeadDTO } from "@/lib/crm";
import type { Empreendimento } from "@/lib/types";
import { MOCK_EMPREENDIMENTOS } from "@/lib/mock-data";

function findLocalLead(id: string): LeadDTO | null {
  if (typeof window === "undefined") return null;
  try {
    const local = JSON.parse(localStorage.getItem("tagmob_local_leads") || "[]") as LeadDTO[];
    return local.find((l) => l.id === id) ?? null;
  } catch {
    return null;
  }
}

export default function LeadDetalhePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const rawId = params?.id;
  const id = decodeURIComponent(Array.isArray(rawId) ? rawId[0] : String(rawId ?? ""));
  const [lead, setLead] = useState<LeadDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLead = useCallback(async () => {
    if (!id) {
      setError("Lead não encontrado.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const local = findLocalLead(id);
    if (local) {
      setLead(local);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/crm/leads", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        const found = (json.data as LeadDTO[] | undefined)?.find((l) => l.id === id);
        if (found) {
          setLead(found);
          setLoading(false);
          return;
        }
      }
    } catch { /* fallback */ }

    const mock = (MOCK_LEADS as LeadDTO[]).find((l) => l.id === id);
    if (mock) {
      setLead(mock);
      setLoading(false);
      return;
    }

    setError("Lead não encontrado.");
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadLead();
  }, [loadLead]);

  const convertLead = async (current: LeadDTO) => {
    const nome = current.empresa ? `${current.empresa} — Novo OS` : `Projeto ${current.nome}`;

    if (!current.id.startsWith("LEAD-LOCAL-")) {
      try {
        const res = await fetch("/api/crm/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: current.id,
            nome,
            valorContrato: current.orcamentoEstimado ? Number(current.orcamentoEstimado) : undefined,
          }),
        });
        if (res.ok) {
          const json = await res.json();
          const dealId = json.data?.id ?? json.data?.empreendimento?.id;
          if (dealId) {
            router.push(`/negocios/${dealId}`);
            return;
          }
          router.push("/negocios");
          return;
        }
      } catch { /* local fallback */ }
    }

    const novoDeal: Empreendimento = {
      ...MOCK_EMPREENDIMENTOS[0],
      id: `emp-local-${Date.now()}`,
      nome,
      construtora: current.empresa ?? current.nome,
      fase_atual: 1,
      valor_contrato: current.orcamentoEstimado ? Number(current.orcamentoEstimado) : 68_000,
      responsavel: current.ownerUser?.fullName || "Você",
      proxima_acao: "Kick-off de estratégia",
      dias_na_fase: 0,
      plano: "PRO",
      cor_tema: "#FF0068",
    };

    try {
      const localL = JSON.parse(localStorage.getItem("tagmob_local_leads") || "[]");
      localStorage.setItem(
        "tagmob_local_leads",
        JSON.stringify(localL.filter((item: LeadDTO) => item.id !== current.id))
      );
      const localD = JSON.parse(localStorage.getItem("tagmob_local_deals") || "[]");
      localStorage.setItem("tagmob_local_deals", JSON.stringify([novoDeal, ...localD]));
    } catch { /* ignore */ }

    router.push(`/negocios/${novoDeal.id}`);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#09090F", color: "#7878A0",
      }}>
        Carregando lead...
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div style={{ padding: 40, background: "#09090F", minHeight: "60vh" }}>
        <p style={{ color: "#FF0068", fontWeight: 700 }}>{error ?? "Lead não encontrado."}</p>
        <button
          type="button"
          onClick={() => router.push("/negocios")}
          style={{ marginTop: 12, background: "#FF0068", border: "none", borderRadius: 8, padding: "10px 16px", color: "#fff", fontWeight: 700, cursor: "pointer" }}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <LeadDetailView
      lead={lead}
      onBack={() => router.push("/negocios")}
      onLeadChange={setLead}
      onConvert={convertLead}
    />
  );
}
