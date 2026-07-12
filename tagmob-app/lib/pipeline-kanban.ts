import { OS_FASES } from "@/lib/types";
import type { Empreendimento, OSFase } from "@/lib/types";
import type { LeadDTO } from "@/lib/crm";

export type PipelineColumnId = "leads" | OSFase;

export type KanbanColumn = {
  id: PipelineColumnId;
  title: string;
  subtitle: string;
  color: string;
  deals: Empreendimento[];
  leads: LeadDTO[];
};

export const LEADS_COLUMN_META = {
  id: "leads" as const,
  title: "Leads",
  subtitle: "Prospects aguardando qualificação e conversão",
  color: "#FFB800",
};

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function groupDealsByFase(deals: Empreendimento[]): KanbanColumn[] {
  return OS_FASES.map((fase) => ({
    id: fase.num,
    title: fase.label,
    subtitle: fase.descricao,
    color: fase.cor,
    deals: deals.filter((d) => d.fase_atual === fase.num),
    leads: [],
  }));
}

export function buildPipelineColumns(deals: Empreendimento[], leads: LeadDTO[]): KanbanColumn[] {
  const activeLeads = leads.filter((l) => l.status !== "CONVERTIDO" && l.status !== "ARQUIVADO");
  return [
    { ...LEADS_COLUMN_META, deals: [], leads: activeLeads },
    ...groupDealsByFase(deals),
  ];
}

export function filterLeads(leads: LeadDTO[], query: string): LeadDTO[] {
  const q = query.trim().toLowerCase();
  if (!q) return leads;
  return leads.filter(
    (l) =>
      l.nome.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.empresa?.toLowerCase().includes(q) ?? false)
  );
}

export function calcPipelineMetrics(deals: Empreendimento[], leads: LeadDTO[] = []) {
  const valorTotal = deals.reduce((sum, d) => sum + (d.valor_contrato ?? 0), 0);
  const emAndamento = deals.filter((d) => d.status === "EM_ANDAMENTO").length;
  const publicados = deals.filter((d) => d.status === "PUBLICADO").length;
  const pendentes = deals.reduce((sum, d) => sum + d.assets_pendentes, 0);
  const diasMedio = deals.length
    ? Math.round(deals.reduce((sum, d) => sum + (d.dias_na_fase ?? 0), 0) / deals.length)
    : 0;
  const leadsAtivos = leads.filter((l) => l.status !== "CONVERTIDO" && l.status !== "ARQUIVADO").length;

  return { valorTotal, emAndamento, publicados, pendentes, diasMedio, total: deals.length, leadsAtivos };
}

export function filterDeals(deals: Empreendimento[], query: string): Empreendimento[] {
  const q = query.trim().toLowerCase();
  if (!q) return deals;
  return deals.filter(
    (d) =>
      d.nome.toLowerCase().includes(q) ||
      d.construtora.toLowerCase().includes(q) ||
      d.bairro.toLowerCase().includes(q) ||
      d.responsavel?.toLowerCase().includes(q)
  );
}

export const PLANO_VALOR: Record<Empreendimento["plano"], number> = {
  STARTER: 68_000,
  PRO: 142_000,
  ENTERPRISE: 285_000,
};
