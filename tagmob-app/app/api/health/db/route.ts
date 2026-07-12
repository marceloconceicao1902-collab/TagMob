import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const counts = await Promise.all([
      prisma.empreendimento.count(),
      prisma.leadsContato.count(),
      prisma.crmContact.count(),
      prisma.crmActivity.count(),
    ]);
    return Response.json({
      status: "ok",
      database: "postgresql",
      counts: {
        empreendimentos: counts[0],
        leads: counts[1],
        contatos: counts[2],
        atividades: counts[3],
      },
    });
  } catch (error) {
    console.error("[GET /api/health/db]", error);
    return Response.json(
      {
        status: "error",
        message: "Banco de dados indisponível. Execute: docker compose up -d && npm run db:push && npm run db:seed",
      },
      { status: 503 }
    );
  }
}
