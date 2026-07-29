import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateSinaproBudget, CalculationInput } from "@/lib/sinapro-pricing";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      empreendimentoId,
      selectedDeliverableIds = [],
      deliverableQuantities = {},
      extraHoursByArea = {},
      descontoInteriorPct = 0,
      aplicaRefacao = false,
      tipoContrato = "PROJETO_FECHADO",
    } = body;

    const calc = calculateSinaproBudget({
      selectedDeliverableIds,
      deliverableQuantities,
      extraHoursByArea,
      descontoInteriorPct,
      aplicaRefacao,
    });

    let orcamentoSaved = null;

    if (empreendimentoId) {
      orcamentoSaved = await prisma.orcamentoContratado.create({
        data: {
          empreendimentoId,
          valorEtapa1Fixo: calc.valorEtapa1Fixo,
          valorVariavel: calc.valorPecasOpcionais + calc.valorHorasAdicionais,
          valorTotal: calc.valorTotal,
          tipoContrato,
          etapa1Paga: false,
        },
      });
    }

    // Payload estruturado para integração com o HubSpot (Configurador Comercial)
    const hubspotConfiguratorPayload = {
      dealProperties: {
        hs_deal_amount: calc.valorTotal,
        sinapro_setup_fixo_etapa1: calc.valorEtapa1Fixo,
        sinapro_pecas_opcionais: calc.valorPecasOpcionais,
        sinapro_horas_adicionais: calc.valorHorasAdicionais,
        sinapro_desconto_interior_pct: descontoInteriorPct,
        sinapro_desconto_interior_val: calc.valorDescontoInterior,
        sinapro_taxa_refacao_pct: aplicaRefacao ? 0.40 : 0,
        sinapro_taxa_refacao_val: calc.valorTaxaRefacao,
      },
      lineItems: calc.detalhesDeliverables.map((item) => ({
        name: item.deliverable.nome,
        price: item.deliverable.precoBase,
        quantity: item.quantidade,
        amount: item.subtotal,
        sku: item.deliverable.id,
      })),
      hourlyLineItems: calc.detalhesHoras.map((item) => ({
        name: `Hora Extra - ${item.area.area}`,
        price: item.area.taxaPorHora,
        quantity: item.horas,
        amount: item.subtotal,
        sku: item.area.id,
      })),
    };

    return NextResponse.json({
      success: true,
      calculation: calc,
      orcamento: orcamentoSaved,
      hubspotPayload: hubspotConfiguratorPayload,
    });
  } catch (error) {
    console.error("Erro no cálculo/criação do orçamento Sinapro:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao calcular orçamento com a matriz Sinapro-SP" },
      { status: 500 }
    );
  }
}
