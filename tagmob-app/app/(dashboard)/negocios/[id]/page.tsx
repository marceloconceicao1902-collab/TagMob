"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DealDetailDrawer from "@/components/pipeline/DealDetailDrawer";
import type { Empreendimento } from "@/lib/types";
import { MOCK_EMPREENDIMENTOS } from "@/lib/mock-data";

function findLocalDeal(id: string): Empreendimento | null {
  if (typeof window === "undefined") return null;
  try {
    const local = JSON.parse(localStorage.getItem("tagmob_local_deals") || "[]") as Empreendimento[];
    return local.find((d) => d.id === id) ?? null;
  } catch {
    return null;
  }
}

export default function NegocioDetalhePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const rawId = params?.id;
  const id = decodeURIComponent(Array.isArray(rawId) ? rawId[0] : String(rawId ?? ""));
  const [deal, setDeal] = useState<Empreendimento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDeal = useCallback(async () => {
    if (!id) {
      setError("Negócio não encontrado.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const localHit = findLocalDeal(id);
    if (localHit) {
      setDeal(localHit);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/crm/deals", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        const found = (json.data as Empreendimento[] | undefined)?.find((d) => d.id === id);
        if (found) {
          setDeal(found);
          setLoading(false);
          return;
        }
      }
    } catch {
      /* fallback */
    }

    const mock = MOCK_EMPREENDIMENTOS.find((d) => d.id === id);
    if (mock) {
      setDeal(mock);
      setLoading(false);
      return;
    }

    setDeal(null);
    setError("Negócio não encontrado.");
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadDeal();
  }, [loadDeal]);

  if (loading) {
    return (
      <div style={{
        minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#09090F", color: "#7878A0", fontSize: 14,
      }}>
        Carregando negócio...
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div style={{ padding: "40px 36px", background: "#09090F", minHeight: "60vh" }}>
        <p style={{ color: "#FF0068", fontWeight: 700, marginBottom: 12 }}>{error ?? "Negócio não encontrado."}</p>
        <button
          type="button"
          onClick={() => router.push("/negocios")}
          style={{
            background: "#FF0068", border: "none", borderRadius: 8, padding: "10px 16px",
            color: "#fff", fontWeight: 700, cursor: "pointer",
          }}
        >
          Voltar para Negócios
        </button>
      </div>
    );
  }

  return (
    <DealDetailDrawer
      variant="page"
      deal={deal}
      onClose={() => router.push("/negocios")}
      onDealChange={(updated) => {
        setDeal(updated);
        if (typeof window !== "undefined" && updated.id.startsWith("emp-local-")) {
          try {
            const local = JSON.parse(localStorage.getItem("tagmob_local_deals") || "[]") as Empreendimento[];
            localStorage.setItem(
              "tagmob_local_deals",
              JSON.stringify(local.map((d) => (d.id === updated.id ? updated : d)))
            );
          } catch { /* ignore */ }
        }
      }}
    />
  );
}
