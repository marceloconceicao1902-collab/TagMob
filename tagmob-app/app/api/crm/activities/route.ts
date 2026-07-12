import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/crm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const empreendimentoId = searchParams.get("empreendimentoId");
  const leadId = searchParams.get("leadId");

  try {
    const activities = await prisma.crmActivity.findMany({
      where: {
        ...(status && { status: status as "PENDENTE" | "CONCLUIDA" | "CANCELADA" }),
        ...(empreendimentoId && { empreendimentoId }),
        ...(leadId && { leadId }),
      },
      include: {
        ownerUser: { select: { id: true, fullName: true } },
        empreendimento: { select: { id: true, nome: true } },
        lead: { select: { id: true, nome: true, email: true } },
        contact: { select: { id: true, nome: true } },
      },
      orderBy: [{ status: "asc" }, { dueAt: "asc" }, { createdAt: "desc" }],
    });
    return Response.json({ data: activities });
  } catch (error) {
    console.error("[GET /api/crm/activities]", error);
    return jsonError("Erro ao buscar atividades");
  }
}

const CreateActivitySchema = z.object({
  tipo: z.enum(["TAREFA", "LIGACAO", "REUNIAO", "EMAIL", "NOTA", "FOLLOW_UP"]),
  titulo: z.string().min(1),
  descricao: z.string().optional().nullable(),
  dueAt: z.string().datetime().optional().nullable(),
  ownerUserId: z.string().optional().nullable(),
  empreendimentoId: z.string().optional().nullable(),
  leadId: z.string().optional().nullable(),
  contactId: z.string().optional().nullable(),
  companyId: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Body inválido", 400);
  }

  const parsed = CreateActivitySchema.safeParse(body);
  if (!parsed.success) return jsonError("Dados inválidos", 422);

  const { dueAt, ...rest } = parsed.data;

  try {
    const activity = await prisma.crmActivity.create({
      data: {
        ...rest,
        dueAt: dueAt ? new Date(dueAt) : undefined,
      },
      include: {
        ownerUser: { select: { id: true, fullName: true } },
        empreendimento: { select: { id: true, nome: true } },
        lead: { select: { id: true, nome: true, email: true } },
        contact: { select: { id: true, nome: true } },
      },
    });
    return Response.json({ data: activity }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/crm/activities]", error);
    return jsonError("Erro ao criar atividade");
  }
}

const PatchActivitySchema = z.object({
  id: z.string(),
  status: z.enum(["PENDENTE", "CONCLUIDA", "CANCELADA"]).optional(),
  titulo: z.string().optional(),
  descricao: z.string().optional().nullable(),
});

export async function PATCH(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Body inválido", 400);
  }

  const parsed = PatchActivitySchema.safeParse(body);
  if (!parsed.success) return jsonError("Dados inválidos", 422);

  const { id, status, titulo, descricao } = parsed.data;

  try {
    const activity = await prisma.crmActivity.update({
      where: { id },
      data: {
        ...(status && { status, ...(status === "CONCLUIDA" && { completedAt: new Date() }) }),
        ...(titulo && { titulo }),
        ...(descricao !== undefined && { descricao }),
      },
      include: {
        ownerUser: { select: { id: true, fullName: true } },
        empreendimento: { select: { id: true, nome: true } },
        lead: { select: { id: true, nome: true, email: true } },
        contact: { select: { id: true, nome: true } },
      },
    });
    return Response.json({ data: activity });
  } catch (error) {
    console.error("[PATCH /api/crm/activities]", error);
    return jsonError("Erro ao atualizar atividade");
  }
}
