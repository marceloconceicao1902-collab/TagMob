import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/crm";

export async function GET() {
  try {
    const [
      totalLeads,
      leadsNovos,
      totalDeals,
      dealsAtivos,
      valorPipeline,
      atividadesPendentes,
      totalContatos,
      totalEmpresas,
    ] = await Promise.all([
      prisma.leadsContato.count(),
      prisma.leadsContato.count({ where: { status: "NOVO" } }),
      prisma.empreendimento.count(),
      prisma.empreendimento.count({ where: { status: "EM_ANDAMENTO" } }),
      prisma.empreendimento.aggregate({ _sum: { valorContrato: true } }),
      prisma.crmActivity.count({ where: { status: "PENDENTE" } }),
      prisma.crmContact.count(),
      prisma.crmCompany.count(),
    ]);

    const leadsPorStatus = await prisma.leadsContato.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const dealsPorFase = await prisma.empreendimento.groupBy({
      by: ["faseAtual"],
      _count: { id: true },
      _sum: { valorContrato: true },
    });

    return Response.json({
      data: {
        totalLeads,
        leadsNovos,
        totalDeals,
        dealsAtivos,
        valorPipeline: Number(valorPipeline._sum.valorContrato ?? 0),
        atividadesPendentes,
        totalContatos,
        totalEmpresas,
        leadsPorStatus,
        dealsPorFase,
      },
    });
  } catch (error) {
    console.error("[GET /api/crm/metrics]", error);
    return jsonError("Erro ao buscar métricas CRM");
  }
}
