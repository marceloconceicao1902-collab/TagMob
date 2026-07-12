import type { Empreendimento as PrismaEmpreendimento, LeadsContato, CrmContact, CrmActivity, CrmCompany, User } from "@prisma/client";
import type { Empreendimento, EmpreendimentoStatus, EmpreendimentoTipo, OSFase, PlanoOS } from "@/lib/types";

type EmpreendimentoWithRelations = PrismaEmpreendimento & {
  responsavelUser?: Pick<User, "id" | "fullName" | "email"> | null;
  tenant?: { name: string } | null;
  _count?: { assets: number };
  assets?: { status: string }[];
};

export function diasNaFase(faseEntradaEm: Date): number {
  return Math.max(0, Math.floor((Date.now() - faseEntradaEm.getTime()) / 86_400_000));
}

export function mapEmpreendimentoToDeal(emp: EmpreendimentoWithRelations): Empreendimento {
  const assets = emp.assets ?? [];
  const totalAssets = emp._count?.assets ?? assets.length;
  const aprovados = assets.filter((a) => a.status === "APROVADO").length;
  const pendentes = assets.filter((a) =>
    ["RASCUNHO", "AGUARDANDO_AGENCIA", "AGUARDANDO_CLIENTE"].includes(a.status)
  ).length;

  return {
    id: emp.id,
    nome: emp.nome,
    tipo: emp.tipo as EmpreendimentoTipo,
    construtora: emp.construtoraNome ?? emp.tenant?.name ?? "—",
    bairro: emp.bairro,
    cidade: emp.cidade,
    fase_atual: emp.faseAtual as OSFase,
    status: emp.status as EmpreendimentoStatus,
    plano: emp.plano as PlanoOS,
    assinatura_ativa: emp.assinaturaAtiva,
    cor_tema: emp.corTema,
    thumbnail_url: emp.thumbnailUrl ?? "",
    criado_em: emp.createdAt.toISOString().slice(0, 10),
    estrategia_completa: emp.faseAtual > 1,
    criacao_completa: emp.faseAtual > 2,
    total_assets: totalAssets,
    assets_aprovados: aprovados,
    assets_pendentes: pendentes,
    valor_contrato: emp.valorContrato ? Number(emp.valorContrato) : undefined,
    responsavel: emp.responsavelUser?.fullName,
    proxima_acao: emp.proximaAcao ?? undefined,
    dias_na_fase: diasNaFase(emp.faseEntradaEm),
  };
}

export type LeadDTO = {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  empresa: string | null;
  mensagem: string | null;
  orcamentoEstimado: { toString(): string } | number | null;
  status: string;
  source?: string;
  prioridade?: number;
  score?: number;
  ownerUserId?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  ownerUser?: Pick<User, "id" | "fullName"> | null;
  convertedEmpreendimento?: { id: string; nome: string } | null;
};

export type ContactDTO = CrmContact & {
  ownerUser?: Pick<User, "id" | "fullName"> | null;
  company?: Pick<CrmCompany, "id" | "nome"> | null;
};

export type ActivityDTO = CrmActivity & {
  ownerUser?: Pick<User, "id" | "fullName"> | null;
  empreendimento?: Pick<PrismaEmpreendimento, "id" | "nome"> | null;
  lead?: Pick<LeadsContato, "id" | "nome" | "email"> | null;
  contact?: Pick<CrmContact, "id" | "nome"> | null;
};

export const LEAD_STATUS_LABELS: Record<string, string> = {
  NOVO: "Novo",
  EM_ATENDIMENTO: "Em atendimento",
  QUALIFICADO: "Qualificado",
  CONVERTIDO: "Convertido",
  ARQUIVADO: "Arquivado",
};

export const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  TAREFA: "Tarefa",
  LIGACAO: "Ligação",
  REUNIAO: "Reunião",
  EMAIL: "E-mail",
  NOTA: "Nota",
  FOLLOW_UP: "Follow-up",
};

export function jsonError(message: string, status = 500) {
  return Response.json({ error: message }, { status });
}
