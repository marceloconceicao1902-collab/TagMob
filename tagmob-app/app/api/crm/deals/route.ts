import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, mapEmpreendimentoToDeal } from "@/lib/crm";

const DEAL_INCLUDE = {
  responsavelUser: { select: { id: true, fullName: true, email: true } },
  tenant: { select: { name: true } },
  assets: { select: { status: true } },
} as const;

export async function GET() {
  try {
    const deals = await prisma.empreendimento.findMany({
      include: DEAL_INCLUDE,
      orderBy: { updatedAt: "desc" },
    });
    return Response.json({ data: deals.map(mapEmpreendimentoToDeal) });
  } catch (error) {
    console.error("[GET /api/crm/deals]", error);
    return jsonError("Erro ao buscar negócios");
  }
}

const PatchDealSchema = z.object({
  id: z.string(),
  fase_atual: z.number().int().min(1).max(5).optional(),
  status: z.enum(["EM_ANDAMENTO", "APROVADO", "PUBLICADO", "PAUSADO"]).optional(),
  proxima_acao: z.string().optional().nullable(),
  valor_contrato: z.number().optional().nullable(),
  responsavelUserId: z.string().optional().nullable(),
  probabilidade: z.number().int().min(0).max(100).optional(),
});

export async function PATCH(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Body inválido", 400);
  }

  const parsed = PatchDealSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Dados inválidos", 422);
  }

  const { id, fase_atual, status, proxima_acao, valor_contrato, responsavelUserId, probabilidade } = parsed.data;

  try {
    const existing = await prisma.empreendimento.findUnique({ where: { id } });
    if (!existing) return jsonError("Negócio não encontrado", 404);

    const faseChanged = fase_atual != null && fase_atual !== existing.faseAtual;

    const updated = await prisma.empreendimento.update({
      where: { id },
      data: {
        ...(fase_atual != null && { faseAtual: fase_atual }),
        ...(faseChanged && { faseEntradaEm: new Date() }),
        ...(status && { status }),
        ...(proxima_acao !== undefined && { proximaAcao: proxima_acao }),
        ...(valor_contrato !== undefined && { valorContrato: valor_contrato }),
        ...(responsavelUserId !== undefined && { responsavelUserId }),
        ...(probabilidade != null && { probabilidade }),
      },
      include: DEAL_INCLUDE,
    });

    if (faseChanged) {
      await prisma.crmActivity.create({
        data: {
          tipo: "NOTA",
          titulo: `Negócio movido para fase ${fase_atual}`,
          descricao: `Etapa atualizada de ${existing.faseAtual} para ${fase_atual} no pipeline TAGMOB OS.`,
          status: "CONCLUIDA",
          completedAt: new Date(),
          empreendimentoId: id,
          ownerUserId: responsavelUserId ?? existing.responsavelUserId,
        },
      });
    }

    return Response.json({ data: mapEmpreendimentoToDeal(updated) });
  } catch (error) {
    console.error("[PATCH /api/crm/deals]", error);
    return jsonError("Erro ao atualizar negócio");
  }
}
