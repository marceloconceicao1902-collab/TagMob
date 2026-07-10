import { prisma } from "./prisma";

export interface ConflictCheckParams {
  brandId: string;
  propertyId: string;
  productCategory: string;
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  message?: string;
}

/**
 * Verifica se um produto ou marca possui conflito de exclusividade para um determinado imóvel.
 */
export async function checkPlacementConflict(
  params: ConflictCheckParams
): Promise<ConflictCheckResult> {
  const { brandId, propertyId, productCategory } = params;

  try {
    // Busca informações do imóvel para verificar bairro e construtora/tenant
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { neighborhoodId: true, tenantId: true, standard: true },
    });

    if (!property) {
      return { hasConflict: false };
    }

    // Busca contratos ativos de outras marcas concorrentes da mesma categoria que possuam exclusividade
    const conflictingContracts = await prisma.brandContract.findMany({
      where: {
        isActive: true,
        validUntil: { gte: new Date() },
        brandId: { not: brandId },
        productCategory: { equals: productCategory, mode: "insensitive" },
        OR: [
          { exclusivityType: "EMPREENDIMENTO" },
          { exclusivityType: "BAIRRO", neighborhoodId: property.neighborhoodId },
          { exclusivityType: "REGIAO" },
        ],
      },
      include: {
        brand: { select: { name: true } },
      },
    });

    if (conflictingContracts.length > 0) {
      const exclusiveBrand = conflictingContracts[0].brand.name;
      const type = conflictingContracts[0].exclusivityType;
      return {
        hasConflict: true,
        message: `A marca ${exclusiveBrand} possui exclusividade de ${type.toLowerCase()} para a categoria ${productCategory}.`,
      };
    }
  } catch (error) {
    console.warn("[checkPlacementConflict] Consulta ao banco ignorada (modo demo ou DB inacessível):", error);
  }

  return { hasConflict: false };
}
