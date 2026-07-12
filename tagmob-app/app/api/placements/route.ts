import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserContext, unauthorizedResponse } from "@/lib/clerk";
import { checkPlacementConflict } from "@/lib/conflict-matrix";

const CreatePlacementSchema = z.object({
  mediaAssetId: z.string().uuid(),
  brandId: z.string().uuid(),
  productSpecId: z.string().uuid().optional(),
  placementRegion: z
    .object({
      x: z.number().min(0).max(1),
      y: z.number().min(0).max(1),
      width: z.number().min(0).max(1),
      height: z.number().min(0).max(1),
    })
    .optional(),
  couponCode: z.string().max(50).optional(),
});

const UpdatePlacementSchema = z.object({
  status: z.enum(["SUGERIDO", "APROVADO", "PUBLICADO", "REJEITADO"]).optional(),
  placementRegion: z
    .object({
      x: z.number().min(0).max(1),
      y: z.number().min(0).max(1),
      width: z.number().min(0).max(1),
      height: z.number().min(0).max(1),
    })
    .optional(),
});

export async function GET(req: NextRequest) {
  const ctx = await getCurrentUserContext(req);
  if (!ctx) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const propertyId = searchParams.get("propertyId") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

  const placements = await prisma.productPlacement.findMany({
    where: {
      ...(status ? { status: status as "SUGERIDO" | "APROVADO" | "PUBLICADO" | "REJEITADO" } : {}),
      ...(propertyId
        ? { mediaAsset: { propertyId } }
        : ctx.profileType === "MARCA" && ctx.tenantId
        ? { brand: { tenantId: ctx.tenantId } }
        : ctx.profileType === "ARQUITETO" && ctx.dbUserId
        ? { architectUserId: ctx.dbUserId }
        : {}),
    },
    include: {
      brand: { select: { id: true, name: true, category: true, logoUrl: true } },
      productSpec: { select: { id: true, name: true, sku: true, priceMin: true, priceMax: true } },
      mediaAsset: {
        select: {
          id: true,
          url: true,
          type: true,
          property: { select: { id: true, addressJson: true, standard: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ data: placements });
}

export async function POST(req: NextRequest) {
  const ctx = await getCurrentUserContext(req);
  if (!ctx) return unauthorizedResponse();

  if (!["ARQUITETO", "MARCA", "CORRETOR"].includes(ctx.profileType)) {
    return Response.json({ error: "Perfil não autorizado a criar placements." }, { status: 403 });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return Response.json({ error: "Body inválido" }, { status: 400 }); }

  const parsed = CreatePlacementSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 422 });

  // Busca o imóvel via mediaAsset para verificar conflito
  const mediaAsset = await prisma.mediaAsset.findUnique({
    where: { id: parsed.data.mediaAssetId },
    select: { propertyId: true },
  });

  if (!mediaAsset) return Response.json({ error: "Ativo de mídia não encontrado." }, { status: 404 });

  // Busca a categoria do produto/marca para verificação de conflito
  const brand = await prisma.brand.findUnique({
    where: { id: parsed.data.brandId },
    select: { category: true },
  });

  if (!brand) return Response.json({ error: "Marca não encontrada." }, { status: 404 });

  // Verifica a Matriz de Conflito de Canal
  const conflict = await checkPlacementConflict({
    brandId: parsed.data.brandId,
    propertyId: mediaAsset.propertyId,
    productCategory: brand.category.toLowerCase(),
  });

  if (conflict.hasConflict) {
    return Response.json(
      { error: "Conflito de exclusividade detectado.", details: conflict.message },
      { status: 409 }
    );
  }

  const placement = await prisma.productPlacement.create({
    data: {
      ...parsed.data,
      architectUserId: ctx.profileType === "ARQUITETO" ? ctx.dbUserId : null,
      status: "SUGERIDO",
    },
    include: {
      brand: { select: { name: true } },
      productSpec: { select: { name: true } },
    },
  });

  return Response.json({ data: placement }, { status: 201 });
}
