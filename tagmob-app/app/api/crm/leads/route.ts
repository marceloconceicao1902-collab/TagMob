import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/crm";

export async function GET() {
  try {
    const leads = await prisma.leadsContato.findMany({
      include: {
        ownerUser: { select: { id: true, fullName: true } },
        convertedEmpreendimento: { select: { id: true, nome: true } },
      },
      orderBy: [{ prioridade: "asc" }, { createdAt: "desc" }],
    });
    return Response.json({ data: leads });
  } catch (error) {
    console.error("[GET /api/crm/leads]", error);
    return jsonError("Erro ao buscar leads");
  }
}

const PatchLeadSchema = z.object({
  id: z.string(),
  status: z.enum(["NOVO", "EM_ATENDIMENTO", "QUALIFICADO", "CONVERTIDO", "ARQUIVADO"]).optional(),
  ownerUserId: z.string().nullable().optional(),
  prioridade: z.number().int().min(1).max(3).optional(),
  score: z.number().int().min(0).max(100).optional(),
});

export async function PATCH(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Body inválido", 400);
  }

  const parsed = PatchLeadSchema.safeParse(body);
  if (!parsed.success) return jsonError("Dados inválidos", 422);

  const { id, ...data } = parsed.data;

  try {
    const lead = await prisma.leadsContato.update({
      where: { id },
      data,
      include: {
        ownerUser: { select: { id: true, fullName: true } },
        convertedEmpreendimento: { select: { id: true, nome: true } },
      },
    });
    return Response.json({ data: lead });
  } catch (error) {
    console.error("[PATCH /api/crm/leads]", error);
    return jsonError("Erro ao atualizar lead");
  }
}

const ConvertSchema = z.object({
  leadId: z.string(),
  nome: z.string().min(1),
  tipo: z.enum(["RESIDENCIAL", "COMERCIAL", "MISTO"]).default("RESIDENCIAL"),
  bairro: z.string().default("São Paulo"),
  cidade: z.string().default("São Paulo"),
  tenantId: z.string().optional(),
  valorContrato: z.number().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Body inválido", 400);
  }

  const parsed = ConvertSchema.safeParse(body);
  if (!parsed.success) return jsonError("Dados inválidos", 422);

  const { leadId, nome, tipo, bairro, cidade, tenantId, valorContrato } = parsed.data;

  try {
    const lead = await prisma.leadsContato.findUnique({ where: { id: leadId } });
    if (!lead) return jsonError("Lead não encontrado", 404);
    if (lead.status === "CONVERTIDO") return jsonError("Lead já convertido", 409);

    const defaultTenant = tenantId ?? (await prisma.tenant.findFirst({ select: { id: true } }))?.id;
    if (!defaultTenant) return jsonError("Nenhum tenant configurado", 500);

    const deal = await prisma.$transaction(async (tx) => {
      const emp = await tx.empreendimento.create({
        data: {
          nome,
          tipo,
          bairro,
          cidade,
          tenantId: defaultTenant,
          construtoraNome: lead.empresa ?? undefined,
          responsavelUserId: lead.ownerUserId,
          valorContrato: valorContrato ?? (lead.orcamentoEstimado ? Number(lead.orcamentoEstimado) : undefined),
          proximaAcao: "Kick-off de estratégia TAGMOB OS",
          faseAtual: 1,
          leadOrigemId: leadId,
          corTema: "#FF0068",
        },
      });

      await tx.leadsContato.update({
        where: { id: leadId },
        data: { status: "CONVERTIDO" },
      });

      await tx.crmActivity.create({
        data: {
          tipo: "NOTA",
          titulo: "Lead convertido em negócio",
          descricao: `${lead.nome} convertido para o empreendimento "${nome}".`,
          status: "CONCLUIDA",
          completedAt: new Date(),
          leadId,
          empreendimentoId: emp.id,
          ownerUserId: lead.ownerUserId,
        },
      });

      return emp;
    });

    return Response.json({ data: deal }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/crm/leads convert]", error);
    return jsonError("Erro ao converter lead");
  }
}
