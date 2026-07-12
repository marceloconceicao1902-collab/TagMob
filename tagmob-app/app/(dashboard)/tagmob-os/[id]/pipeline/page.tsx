import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Search, Plus, Filter, LayoutGrid, Kanban,
  CheckCircle2, Clock, AlertCircle, Sparkles, FileText,
  User, MessageSquare, ChevronRight, BarChart2, ShieldCheck,
  Zap, Lock, Unlock, Settings
} from "lucide-react";
import { getEmpreendimento, getAssetsEmpreendimento } from "@/lib/mock-data";
import { OS_FASES } from "@/lib/types";

export default async function PipelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const emp = getEmpreendimento(id);
  if (!emp) notFound();

  const allAssets = getAssetsEmpreendimento(id);

  // Group columns in HubSpot style
  const columns = [
    {
      id: "briefing",
      title: "Briefing / Atendimento",
      color: "#FF0068",
      assets: allAssets.filter((a) => a.status === "AGUARDANDO_AGENCIA"),
    },
    {
      id: "criacao",
      title: "Em Criação (TAGMOB)",
      color: "#8B5CF6",
      assets: allAssets.filter((a) => a.status === "RASCUNHO" || a.id === "ast-004"), // ast-004 is customer comments but let's mock here
    },
    {
      id: "fechamento",
      title: "Fechamento Técnico",
      color: "#FFB800",
      // Mocking some other tasks in progress
      assets: [
        { id: "mock-001", nome: "Folder Prospecto - Dobrável", tipo: "ENCARTE", dimensoes: "A4", status: "FECHAMENTO", campos_editaveis: [] }
      ],
    },
    {
      id: "aprovacao",
      title: "Aprovação Cliente",
      color: "#00E5FF",
      assets: allAssets.filter((a) => a.status === "AGUARDANDO_CLIENTE"),
    },
    {
      id: "aprovado",
      title: "Aprovado (Vivo no OS)",
      color: "#39FF14",
      assets: allAssets.filter((a) => a.status === "APROVADO"),
    },
  ];

  return (
    <div style={{ padding: "32px", minHeight: "100vh", backgroundColor: "#09090F" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, fontSize: 13, color: "#7878A0" }}>
        <Link href={`/tagmob-os/${id}`} style={{ display: "flex", alignItems: "center", gap: 6, color: "#7878A0", textDecoration: "none" }}>
          <ArrowLeft size={14} /> Voltar ao Workspace
        </Link>
        <span style={{ color: "#2E2E4A" }}>/</span>
        <span style={{ color: "#EEEEFF" }}>{emp.nome}</span>
        <span style={{ color: "#2E2E4A" }}>/</span>
        <span style={{ color: "#00E5FF" }}>Pipeline HubSpot</span>
      </div>

      {/* Title Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#00E5FF", backgroundColor: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)", padding: "2px 8px", borderRadius: 4 }}>
              HUBSPOT PROJECTS CRM
            </span>
            <span style={{ fontSize: 12, color: "#7878A0" }}>{emp.tipo}</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.03em", color: "#EEEEFF" }}>Pipeline de Produção do Lançamento</h1>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color="#7878A0" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Buscar entregável..."
              style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px 8px 32px", fontSize: 13, color: "#EEEEFF", outline: "none", width: 220 }}
            />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px", color: "#7878A0", fontSize: 13, cursor: "pointer" }}>
            <Filter size={14} /> Filtrar
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#FF0068", border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            <Plus size={14} /> Novo Item
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, overflowX: "auto", paddingBottom: 16 }}>
        {columns.map((col) => (
          <div key={col.id} style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 220 }}>
            {/* Column Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 8, borderBottom: `2.5px solid ${col.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: col.color }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: "#EEEEFF" }}>{col.title}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#7878A0", backgroundColor: "#111120", padding: "1px 6px", borderRadius: 10 }}>
                {col.assets.length}
              </span>
            </div>

            {/* Column Body / Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: "60vh", background: "rgba(17,17,32,0.15)", borderRadius: 12, padding: 8, border: "1px dashed rgba(26,26,48,0.4)" }}>
              {col.assets.length === 0 ? (
                <div style={{ padding: "32px 16px", textAlign: "center", fontSize: 11, color: "#3A3A5C" }}>
                  Nenhum item nesta etapa
                </div>
              ) : (
                col.assets.map((asset: any) => (
                  <div
                    key={asset.id}
                    style={{
                      background: "#111120",
                      border: "1px solid #1A1A30",
                      borderRadius: 12,
                      padding: 14,
                      cursor: "grab",
                      transition: "border-color 0.15s ease",
                      position: "relative"
                    }}
                  >
                    {/* Top elements */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: col.color, backgroundColor: col.color + "12", padding: "2px 6px", borderRadius: 4 }}>
                        {asset.tipo}
                      </span>
                      <span style={{ fontSize: 10, color: "#3A3A5C" }}>ID: {asset.id.slice(0, 5)}</span>
                    </div>

                    {/* Card Title */}
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 6 }}>
                      {asset.nome}
                    </p>

                    {/* Card Meta info */}
                    <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.4, marginBottom: 12 }}>
                      {asset.dimensoes || "Tamanho padrão"}
                    </p>

                    {/* Card Bottom / Footer info */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1A1A30", paddingTop: 10, fontSize: 11 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#7878A0" }}>
                        <Clock size={11} />
                        <span>v1.0</span>
                      </div>
                      
                      {/* Interaction badge */}
                      {asset.status === "AGUARDANDO_CLIENTE" ? (
                        <Link href={`/tagmob-os/${id}/aprovacao`} style={{ display: "flex", alignItems: "center", gap: 3, color: "#FFB800", textDecoration: "none", fontWeight: 700, fontSize: 10 }}>
                          Aprovar <ChevronRight size={10} />
                        </Link>
                      ) : asset.status === "APROVADO" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#39FF14" }}>
                          <CheckCircle2 size={11} />
                          <span style={{ fontSize: 10, fontWeight: 700 }}>PRONTO</span>
                        </div>
                      ) : (
                        <span style={{ color: "#3A3A5C", fontSize: 10 }}>Aguardando</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
