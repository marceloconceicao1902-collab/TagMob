import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SINAPRO_DELIVERABLES, SINAPRO_HOURLY_RATES } from "@/lib/sinapro-pricing";

export async function GET() {
  try {
    const itemsFromDb = await prisma.entregavelItem.findMany({
      orderBy: [{ etapa: "asc" }, { precoBase: "desc" }],
    });

    if (itemsFromDb.length === 0) {
      return NextResponse.json({
        success: true,
        source: "static_sinapro",
        data: SINAPRO_DELIVERABLES,
        hourlyRates: SINAPRO_HOURLY_RATES,
      });
    }

    return NextResponse.json({
      success: true,
      source: "database",
      data: itemsFromDb,
      hourlyRates: SINAPRO_HOURLY_RATES,
    });
  } catch (error) {
    console.error("Erro ao buscar entregáveis Sinapro-SP:", error);
    return NextResponse.json(
      {
        success: false,
        source: "fallback_static",
        data: SINAPRO_DELIVERABLES,
        hourlyRates: SINAPRO_HOURLY_RATES,
      },
      { status: 500 }
    );
  }
}
