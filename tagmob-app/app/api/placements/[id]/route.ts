import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserContext, unauthorizedResponse } from "@/lib/clerk";

const UpdateSchema = z.object({
  status: z.enum(["SUGERIDO", "APROVADO", "PUBLICADO", "REJEITADO"]).optional(),
  placementRegion: z.object({ x: z.number(), y: z.number(), width: z.number(), height: z.number() }).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getCurrentUserContext();
  if (!ctx) return unauthorizedResponse();

  const { id } = await params;

  const placement = await prisma.productPlacement.findUnique({
    where: { id },
    include: { brand: { select: { tenantId: true } } },
  });

  if (!placement) return Response.json({ error: "Placement não encontrado." }, { status: 404 });

  // Apenas a marca dona pode aprovar/rejeitar
  if (["APROVADO", "REJEITADO"].includes((await req.clone().json()).status ?? "")) {
    if (placement.brand.tenantId !== ctx.tenantId && ctx.profileType !== "MARCA") {
      return Response.json({ error: "Apenas a marca pode aprovar ou rejeitar placements." }, { status: 403 });
    }
  }

  let body: unknown;
  try { body = await req.json(); } catch { return Response.json({ error: "Body inválido" }, { status: 400 }); }

  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 422 });

  const updated = await prisma.productPlacement.update({ where: { id }, data: parsed.data });
  return Response.json({ data: updated });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Registra um click no placement (endpoint público, sem auth)
  const { id } = await params;
  const placement = await prisma.productPlacement.findUnique({ where: { id }, select: { id: true } });
  if (!placement) return Response.json({ error: "Não encontrado." }, { status: 404 });

  await prisma.productPlacement.update({
    where: { id },
    data: { clickCount: { increment: 1 } },
  });

  return Response.json({ success: true });
}
