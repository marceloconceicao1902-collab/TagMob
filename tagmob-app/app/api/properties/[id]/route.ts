import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserContext, unauthorizedResponse } from "@/lib/clerk";

const UpdatePropertySchema = z.object({
  status: z.enum(["RASCUNHO", "PUBLICADO", "ARQUIVADO"]).optional(),
  metadataJson: z.record(z.unknown()).optional(),
  neighborhoodId: z.string().uuid().optional(),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getCurrentUserContext(req);
  if (!ctx) return unauthorizedResponse();

  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      neighborhood: true,
      mediaAssets: { orderBy: { createdAt: "desc" } },
      matchingScores: {
        include: { brand: { select: { id: true, name: true, category: true, logoUrl: true } } },
        orderBy: { score: "desc" },
        take: 5,
      },
    },
  });

  if (!property) return Response.json({ error: "Imóvel não encontrado" }, { status: 404 });

  const isOwner = property.ownerUserId === ctx.dbUserId || property.tenantId === ctx.tenantId;
  if (!isOwner && ctx.profileType !== "MARCA" && ctx.profileType !== "ARQUITETO") {
    return Response.json({ error: "Acesso negado" }, { status: 403 });
  }

  return Response.json({ data: property });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getCurrentUserContext(req);
  if (!ctx) return unauthorizedResponse();

  const { id } = await params;

  const property = await prisma.property.findUnique({ where: { id }, select: { ownerUserId: true, tenantId: true } });
  if (!property) return Response.json({ error: "Imóvel não encontrado" }, { status: 404 });

  const isOwner = property.ownerUserId === ctx.dbUserId || property.tenantId === ctx.tenantId;
  if (!isOwner) return Response.json({ error: "Acesso negado" }, { status: 403 });

  let body: unknown;
  try { body = await req.json(); } catch { return Response.json({ error: "Body inválido" }, { status: 400 }); }

  const parsed = UpdatePropertySchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 422 });

  const updated = await prisma.property.update({ where: { id }, data: parsed.data });
  return Response.json({ data: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await getCurrentUserContext(req);
  if (!ctx) return unauthorizedResponse();

  const { id } = await params;

  const property = await prisma.property.findUnique({ where: { id }, select: { ownerUserId: true, tenantId: true } });
  if (!property) return Response.json({ error: "Imóvel não encontrado" }, { status: 404 });

  const isOwner = property.ownerUserId === ctx.dbUserId || property.tenantId === ctx.tenantId;
  if (!isOwner) return Response.json({ error: "Acesso negado" }, { status: 403 });

  await prisma.property.update({ where: { id }, data: { status: "ARQUIVADO" } });
  return Response.json({ success: true });
}
