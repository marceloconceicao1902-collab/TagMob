import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserContext, unauthorizedResponse } from "@/lib/clerk";

const CreateBrandSchema = z.object({
  name: z.string().min(2).max(255),
  category: z.enum(["PISO", "LOUCAS", "MOBILIARIO", "AUTOMACAO", "ACABAMENTO"]),
  logoUrl: z.string().url().optional(),
  affiliateConfigJson: z
    .object({
      comissaoPct: z.number().min(0).max(100),
      urlRastreio: z.string().url(),
    })
    .optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? undefined;

  const brands = await prisma.brand.findMany({
    where: {
      ...(category ? { category: category as "PISO" | "LOUCAS" | "MOBILIARIO" | "AUTOMACAO" | "ACABAMENTO" } : {}),
    },
    include: {
      _count: { select: { productSpecs: true, placements: true } },
      contracts: {
        where: { isActive: true, validUntil: { gte: new Date() } },
        select: { exclusivityType: true, productCategory: true, neighborhoodId: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return Response.json({ data: brands });
}

export async function POST(req: NextRequest) {
  const ctx = await getCurrentUserContext(req);
  if (!ctx) return unauthorizedResponse();

  if (ctx.profileType !== "MARCA" && ctx.profileType !== "CONSTRUTORA") {
    return Response.json({ error: "Apenas perfis de Marca podem criar marcas." }, { status: 403 });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return Response.json({ error: "Body inválido" }, { status: 400 }); }

  const parsed = CreateBrandSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 422 });

  const brand = await prisma.brand.create({
    data: {
      ...parsed.data,
      tenantId: ctx.tenantId,
    },
  });

  return Response.json({ data: brand }, { status: 201 });
}
