import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserContext, unauthorizedResponse } from "@/lib/clerk";

const CreatePropertySchema = z.object({
  addressJson: z.object({
    rua: z.string().min(1),
    numero: z.string().optional(),
    bairro: z.string().min(1),
    cidade: z.string().min(1),
    estado: z.string().length(2),
    cep: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
  neighborhoodId: z.string().uuid().optional(),
  category: z.enum(["RESIDENCIAL", "COMERCIAL", "LANCAMENTO"]),
  standard: z.enum(["ALTO", "MEDIO", "POPULAR"]),
  metadataJson: z
    .object({
      quartos: z.number().optional(),
      suites: z.number().optional(),
      banheiros: z.number().optional(),
      vagas: z.number().optional(),
      area: z.number().optional(),
      andar: z.number().optional(),
      valor: z.number().optional(),
    })
    .optional(),
});

export async function GET(req: NextRequest) {
  const ctx = await getCurrentUserContext(req);
  if (!ctx) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? undefined;
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);

  try {
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where: {
          ...(ctx.tenantId ? { tenantId: ctx.tenantId } : { ownerUserId: ctx.dbUserId ?? "" }),
          ...(status ? { status: status as "RASCUNHO" | "PUBLICADO" | "ARQUIVADO" } : {}),
        },
        include: {
          neighborhood: { select: { name: true, city: true, trafficScore: true } },
          _count: { select: { mediaAssets: true, matchingScores: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.property.count({
        where: {
          ...(ctx.tenantId ? { tenantId: ctx.tenantId } : { ownerUserId: ctx.dbUserId ?? "" }),
        },
      }),
    ]);

    return Response.json({ data: properties, total, page, limit });
  } catch (error) {
    console.error("[GET /api/properties]", error);
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ctx = await getCurrentUserContext(req);
  if (!ctx) return unauthorizedResponse();

  if (!["CORRETOR", "IMOBILIARIA", "CONSTRUTORA"].includes(ctx.profileType)) {
    return Response.json({ error: "Apenas corretores, imobiliárias e construtoras podem cadastrar imóveis." }, { status: 403 });
  }

  if (!ctx.dbUserId) {
    return Response.json({ error: "Usuário não encontrado no banco. Complete o onboarding." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const parsed = CreatePropertySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 422 });
  }

  try {
    const property = await prisma.property.create({
      data: {
        ...parsed.data,
        ownerUserId: ctx.dbUserId,
        tenantId: ctx.tenantId,
        status: "RASCUNHO",
      },
    });

    return Response.json({ data: property }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/properties]", error);
    return Response.json({ error: "Erro ao criar imóvel" }, { status: 500 });
  }
}
