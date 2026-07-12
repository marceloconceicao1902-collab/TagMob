import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/crm";

export async function GET() {
  try {
    const companies = await prisma.crmCompany.findMany({
      include: {
        ownerUser: { select: { id: true, fullName: true } },
        _count: { select: { contacts: true, activities: true } },
      },
      orderBy: { nome: "asc" },
    });
    return Response.json({ data: companies });
  } catch (error) {
    console.error("[GET /api/crm/companies]", error);
    return jsonError("Erro ao buscar empresas");
  }
}
