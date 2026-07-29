/**
 * Matriz de Precificação Oficial (Tabela Sinapro-SP) para TAGMOB OS
 * 
 * Estrutura oficial padronizada em 10 Blocos (Macro Etapas) com títulos em UPPERCASE.
 * Apenas o item de BLOCO 01 ("Criação de tema/conceito de Campanha (key visual)") é mandatório e fixo no topo.
 */

export interface SinaproDeliverable {
  id: string;
  nome: string;
  etapa: number; // 1 a 10
  macroEtapaLabel: string;
  precoBase: number; // Em BRL (float)
  isObrigatorio: boolean;
  unidadeMedida?: string;
  descricao: string;
}

export interface HourlyRateArea {
  id: string;
  area: string;
  taxaPorHora: number;
  descricao: string;
}

export interface CalculationInput {
  selectedDeliverableIds: string[];
  deliverableQuantities?: Record<string, number>;
  extraHoursByArea?: Record<string, number>;
  descontoInteriorPct?: number; // 0.0 a 0.40
  aplicaRefacao?: boolean;
  taxaRefacaoPct?: number; // Padrão 0.40 (40%)
}

export interface CalculationResult {
  valorEtapa1Fixo: number;
  valorPecasOpcionais: number;
  valorHorasAdicionais: number;
  subtotalBruto: number;
  valorDescontoInterior: number;
  subtotalComDesconto: number;
  valorTaxaRefacao: number;
  valorTotal: number;
  detalhesDeliverables: Array<{
    deliverable: SinaproDeliverable;
    quantidade: number;
    subtotal: number;
  }>;
  detalhesHoras: Array<{
    area: HourlyRateArea;
    horas: number;
    subtotal: number;
  }>;
}

export const SINAPRO_HOURLY_RATES: HourlyRateArea[] = [
  {
    id: "hr-planejamento",
    area: "Planejamento",
    taxaPorHora: 681.53,
    descricao: "Pesquisa de mercado, posicionamento e arquitetura de marca imobiliária",
  },
  {
    id: "hr-atendimento",
    area: "Atendimento e Gestão",
    taxaPorHora: 546.83,
    descricao: "Gestão de projeto, atendimento ao cliente e acompanhamento de workflow",
  },
  {
    id: "hr-design",
    area: "Design / Criação",
    taxaPorHora: 546.83,
    descricao: "Criação visual de peças gráficas, digitais e key visuals",
  },
  {
    id: "hr-conteudo",
    area: "Produção de Conteúdo (Web/Redes Sociais)",
    taxaPorHora: 474.11,
    descricao: "Redação publicitária, roteiros e copywriting para redes sociais",
  },
  {
    id: "hr-programacao",
    area: "Programação",
    taxaPorHora: 429.93,
    descricao: "Desenvolvimento de landing pages, hotsites e produção de HTML",
  },
  {
    id: "hr-motion",
    area: "Edição de Vídeo / Motion",
    taxaPorHora: 615.74,
    descricao: "Edição, motion graphics e montagem audiovisual",
  },
  {
    id: "hr-tratamento",
    area: "Tratamento de Imagem Avançado / Sistema",
    taxaPorHora: 1375.05,
    descricao: "Retoque foto-realista avançado e arquitetura de sistemas",
  },
  {
    id: "hr-3d",
    area: "Ilustração 3D / Perspectiva Humana",
    taxaPorHora: 1787.58,
    descricao: "Modelagem 3D, perspectivas humanizadas e renderização foto-realista",
  },
];

export const SINAPRO_DELIVERABLES: SinaproDeliverable[] = [
  // ─── BLOCO 01 (MANDATÓRIO) ──────────────────────────────────────────────────
  {
    id: "ent-sin-101",
    nome: "Criação de tema/conceito de Campanha (key visual)",
    etapa: 1,
    macroEtapaLabel: "CRIAÇÃO DE CAMPANHA",
    precoBase: 48231.93,
    isObrigatorio: true, // ÚNICO ITEM FIXO / MANDATÓRIO
    descricao: "Conceituação mestre da campanha e desenvolvimento do Key Visual matriz do empreendimento.",
  },

  // ─── BLOCO 02 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-102",
    nome: "Marca/logotipo imobiliário",
    etapa: 2,
    macroEtapaLabel: "BRANDING (MARCA - LOGOTIPO - IDENTIDADE VISUAL)",
    precoBase: 29369.07,
    isObrigatorio: false,
    descricao: "Criação completa e vetorização final da assinatura visual e marca mestre.",
  },
  {
    id: "ent-sin-103",
    nome: "Manual de identidade visual",
    etapa: 2,
    macroEtapaLabel: "BRANDING (MARCA - LOGOTIPO - IDENTIDADE VISUAL)",
    precoBase: 2406.35,
    isObrigatorio: false,
    unidadeMedida: "Por Lâmina",
    descricao: "Guia normativo de aplicação da marca, tipografias, paleta e regras de desdobramento.",
  },
  {
    id: "ent-sin-104",
    nome: "Slogan",
    etapa: 2,
    macroEtapaLabel: "BRANDING (MARCA - LOGOTIPO - IDENTIDADE VISUAL)",
    precoBase: 13767.14,
    isObrigatorio: false,
    descricao: "Criação de conceito verbal e assinatura sintetizada de posicionamento do produto.",
  },

  // ─── BLOCO 03 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-601",
    nome: "Apresentação de PPT / Keynote",
    etapa: 3,
    macroEtapaLabel: "MATERIAIS ESPECIAIS",
    precoBase: 2406.35,
    isObrigatorio: false,
    unidadeMedida: "Valor por Slide Estático",
    descricao: "Design de lâminas de apresentação comercial e meeting para a convenção.",
  },
  {
    id: "ent-sin-602",
    nome: "Template para PPT",
    etapa: 3,
    macroEtapaLabel: "MATERIAIS ESPECIAIS",
    precoBase: 9099.40,
    isObrigatorio: false,
    descricao: "Template corporativo editável (Capa + Miolo base) para uso contínuo.",
  },
  {
    id: "ent-sin-604",
    nome: "Assinatura de e-mail",
    etapa: 3,
    macroEtapaLabel: "MATERIAIS ESPECIAIS",
    precoBase: 7514.50,
    isObrigatorio: false,
    descricao: "Design e padronização visual de assinatura de e-mail corporativa.",
  },

  // ─── BLOCO 04 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-505",
    nome: "Outdoor",
    etapa: 4,
    macroEtapaLabel: "MÍDIA EXTERIOR (OUT OF HOME E DOOH)",
    precoBase: 16097.55,
    isObrigatorio: false,
    descricao: "Layout para grandes formatos de mídia exterior (Outdoor simples, Backlight ou Frontlight).",
  },
  {
    id: "ent-sin-508",
    nome: "Vídeos digitais para DOOH e OOH",
    etapa: 4,
    macroEtapaLabel: "MÍDIA EXTERIOR (OUT OF HOME E DOOH)",
    precoBase: 32986.12,
    isObrigatorio: false,
    descricao: "Animação de alta resolução otimizada para painéis de LED urbanos e shoppings.",
  },

  // ─── BLOCO 05 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-501",
    nome: "Tapume",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 8380.12,
    isObrigatorio: false,
    descricao: "Projeto gráfico de fechamento de obra e tapume com apelo institucional.",
  },
  {
    id: "ent-sin-502",
    nome: "Cavalete",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 9636.44,
    isObrigatorio: false,
    descricao: "Design gráfico para cavaletes móveis de calçada e banners promocionais.",
  },
  {
    id: "ent-sin-503",
    nome: "Cubo/Totem",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 16695.36,
    isObrigatorio: false,
    descricao: "Comunicação visual para totens de plantão, cubos tridimensionais e displays de chão.",
  },
  {
    id: "ent-sin-504",
    nome: "Placa indicativa de rua",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 8425.68,
    isObrigatorio: false,
    descricao: "Design de placas de sinalização direcional e placas seta de trânsito.",
  },
  {
    id: "ent-sin-506",
    nome: "Fachada externa",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 17708.69,
    isObrigatorio: false,
    descricao: "Projeto de comunicação visual e envelopamento da fachada do plantão de vendas.",
  },
  {
    id: "ent-sin-507",
    nome: "Espaço instagramável",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 25043.03,
    isObrigatorio: false,
    descricao: "Conceituação e projeto gráfico de ambientação instagramável no estande.",
  },

  // ─── BLOCO 06 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-605",
    nome: "Camiseta/colete/avental",
    etapa: 6,
    macroEtapaLabel: "BRINDES E MATERIAIS DE APOIO",
    precoBase: 25902.44,
    isObrigatorio: false,
    descricao: "Layout de estamparia e uniforme para promotores e equipe de plantão.",
  },
  {
    id: "ent-sin-606",
    nome: "Chaveiro/pendrive/squeezer",
    etapa: 6,
    macroEtapaLabel: "BRINDES E MATERIAIS DE APOIO",
    precoBase: 4293.61,
    isObrigatorio: false,
    descricao: "Personalização gráfica de brindes promocionais (garrafas, chaveiros e squeezes).",
  },
  {
    id: "ent-sin-607",
    nome: "Sacola/bolsa",
    etapa: 6,
    macroEtapaLabel: "BRINDES E MATERIAIS DE APOIO",
    precoBase: 4978.37,
    isObrigatorio: false,
    descricao: "Design de sacolas e bolsas promocionais para entrega de kits.",
  },

  // ─── BLOCO 07 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-201",
    nome: "Book (capa)",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 7716.06,
    isObrigatorio: false,
    descricao: "Design de capa e contracapa para o book promocional do produto imobiliário.",
  },
  {
    id: "ent-sin-202",
    nome: "Book (miolo)",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 6280.26,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Diagramação e criação visual das páginas internas do book.",
  },
  {
    id: "ent-sin-203",
    nome: "Folder/folheto/catálogo",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 4364.01,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Desenvolvimento de páginas para folder e catálogo comercial.",
  },
  {
    id: "ent-sin-204",
    nome: "Folheto técnico",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 4861.02,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Formatação visual de plantas, metragens e especificações técnicas por página.",
  },
  {
    id: "ent-sin-205",
    nome: "Caderno",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 11108.15,
    isObrigatorio: false,
    descricao: "Caderno de plantas / Caderno geral (Capa + Miolo).",
  },
  {
    id: "ent-sin-206",
    nome: "Mapa localização",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 8489.91,
    isObrigatorio: false,
    descricao: "Desenvolvimento de trajeto e vetorização ilustrada de mapa de acesso.",
  },
  {
    id: "ent-sin-207",
    nome: "Tabela de preços",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 4861.02,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Tabela de preços / Tabloide de ofertas por página.",
  },
  {
    id: "ent-sin-208",
    nome: "Cupom/crachá",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 6234.70,
    isObrigatorio: false,
    descricao: "Ficha técnica / Ficha de inscrição / Crachá e cupons.",
  },

  // ─── BLOCO 08 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-105",
    nome: "Roteiro de filme/VT",
    etapa: 8,
    macroEtapaLabel: "RÁDIO - TV - CINEMA (PRODUÇÃO MULTIMÍDIA)",
    precoBase: 34481.36,
    isObrigatorio: false,
    unidadeMedida: "15\"/30\"/45\"/60\"",
    descricao: "Roteiro de Filme/VT Conceito (15\"/30\"/45\"/60\").",
  },
  {
    id: "ent-sin-401",
    nome: "Roteiro para vídeos de internet, redes sociais e DOOH",
    etapa: 8,
    macroEtapaLabel: "RÁDIO - TV - CINEMA (PRODUÇÃO MULTIMÍDIA)",
    precoBase: 32225.57,
    isObrigatorio: false,
    unidadeMedida: "7\" a 60\"",
    descricao: "Vídeos curtos digitais / cartelados para redes sociais ou mídia indoor.",
  },
  {
    id: "ent-sin-402",
    nome: "Vinheta de Abertura ou Encerramento",
    etapa: 8,
    macroEtapaLabel: "RÁDIO - TV - CINEMA (PRODUÇÃO MULTIMÍDIA)",
    precoBase: 1231.21,
    isObrigatorio: false,
    unidadeMedida: "5\" a 7\"",
    descricao: "Vinheta de abertura ou encerramento para audiovisual.",
  },
  {
    id: "ent-sin-403",
    nome: "Roteiro para Vídeos de Internet, Redes Sociais e DOOH",
    etapa: 8,
    macroEtapaLabel: "RÁDIO - TV - CINEMA (PRODUÇÃO MULTIMÍDIA)",
    precoBase: 17240.70,
    isObrigatorio: false,
    descricao: "Criação de roteiro técnico, locução e direção para mídias digitais.",
  },

  // ─── BLOCO 09 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-301",
    nome: "Landing Page",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 9736.22,
    isObrigatorio: false,
    descricao: "Criação de layout de página única responsivo para conversão de leads.",
  },
  {
    id: "ent-sin-302",
    nome: "Website",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 53267.73,
    isObrigatorio: false,
    descricao: "Website completo com layout de telas institucionais e UX/UI.",
  },
  {
    id: "ent-sin-303",
    nome: "Hotsite",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 29206.08,
    isObrigatorio: false,
    descricao: "Hotsite de lançamento com estrutura focada/UX.",
  },
  {
    id: "ent-sin-304",
    nome: "E-mail Marketing",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 4585.89,
    isObrigatorio: false,
    descricao: "Criação e produção do HTML responsivo para e-mail marketing.",
  },
  {
    id: "ent-sin-305",
    nome: "Convite Digital",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 4815.19,
    isObrigatorio: false,
    descricao: "Card para WhatsApp / Convite Digital de fácil compartilhamento.",
  },
  {
    id: "ent-sin-306",
    nome: "Posts (simples)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 4725.19,
    isObrigatorio: false,
    descricao: "Post simples para redes sociais (Card estático/GIF + Texto).",
  },
  {
    id: "ent-sin-307",
    nome: "Posts (carrossel)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 9450.38,
    isObrigatorio: false,
    unidadeMedida: "De 2 a 10 telas + Texto",
    descricao: "Post carrossel redes sociais (De 2 a 10 telas + Texto).",
  },
  {
    id: "ent-sin-308",
    nome: "Stories (Estático)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 2137.54,
    isObrigatorio: false,
    descricao: "Criativo estático em formato vertical 9:16.",
  },
  {
    id: "ent-sin-309",
    nome: "Stories (Animado/Motion)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 2353.04,
    isObrigatorio: false,
    descricao: "Stories animado em motion graphics 9:16.",
  },
  {
    id: "ent-sin-310",
    nome: "Anúncios Display (Master)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 5009.98,
    isObrigatorio: false,
    descricao: "Anúncios Display GDN (Master - quaisquer dimensões).",
  },
  {
    id: "ent-sin-311",
    nome: "Anúncios Display (Adaptação)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 2353.04,
    isObrigatorio: false,
    descricao: "Anúncios Display GDN (Adaptação de formato animado).",
  },
  {
    id: "ent-sin-312",
    nome: "E-book / Catálogo Digital",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 2406.35,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "E-book / Catálogo digital diagramado por página.",
  },

  // ─── BLOCO 10 (OPCIONAL) ───────────────────────────────────────────────────
  {
    id: "ent-sin-701",
    nome: "Anúncio Jornal (1 Página)",
    etapa: 10,
    macroEtapaLabel: "ADVERTISING (CAMPANHAS PUBLICITÁRIAS - ANÚNCIOS)",
    precoBase: 14153.70,
    isObrigatorio: false,
    descricao: "Anúncio para Jornal (Página Inteira).",
  },
  {
    id: "ent-sin-702",
    nome: "Anúncio Revista (1 Página)",
    etapa: 10,
    macroEtapaLabel: "ADVERTISING (CAMPANHAS PUBLICITÁRIAS - ANÚNCIOS)",
    precoBase: 11784.63,
    isObrigatorio: false,
    descricao: "Anúncio para Revista (Página Inteira).",
  },
];

/**
 * Executa o cálculo de orçamento conforme a fórmula oficial TAGMOB OS / Sinapro-SP:
 * 
 * Valor Total = [ (Setup Fixo Etapa 1) + sum(Peças Opcionais * Quantidade) + sum(Horas Adicionais * Taxa) ]
 *               * (1 - Desconto Interior) * (1 + Taxa Refação)
 */
export function calculateSinaproBudget(input: CalculationInput): CalculationResult {
  const {
    selectedDeliverableIds,
    deliverableQuantities = {},
    extraHoursByArea = {},
    descontoInteriorPct = 0, // Máximo 0.40 (40%)
    aplicaRefacao = false,
    taxaRefacaoPct = 0.40, // +40%
  } = input;

  const descontoValido = Math.min(Math.max(descontoInteriorPct, 0), 0.40);
  const taxaRefacaoValida = aplicaRefacao ? Math.max(taxaRefacaoPct, 0) : 0;

  // Apenas o item de BLOCO 01 é obrigatório
  const mandatoryDeliverables = SINAPRO_DELIVERABLES.filter((d) => d.isObrigatorio);
  const mandatoryIds = mandatoryDeliverables.map((d) => d.id);
  const fullSelectedIds = Array.from(new Set([...mandatoryIds, ...selectedDeliverableIds]));

  let valorEtapa1Fixo = 0;
  let valorPecasOpcionais = 0;
  const detalhesDeliverables: CalculationResult["detalhesDeliverables"] = [];

  fullSelectedIds.forEach((id) => {
    const item = SINAPRO_DELIVERABLES.find((d) => d.id === id);
    if (!item) return;

    const quantidade = deliverableQuantities[id] && deliverableQuantities[id] > 0
      ? deliverableQuantities[id]
      : 1;

    const subtotal = item.precoBase * quantidade;

    if (item.isObrigatorio) {
      valorEtapa1Fixo += subtotal;
    } else {
      valorPecasOpcionais += subtotal;
    }

    detalhesDeliverables.push({
      deliverable: item,
      quantidade,
      subtotal,
    });
  });

  // Cálculo das Horas Adicionais
  let valorHorasAdicionais = 0;
  const detalhesHoras: CalculationResult["detalhesHoras"] = [];

  SINAPRO_HOURLY_RATES.forEach((area) => {
    const horas = extraHoursByArea[area.id] || 0;
    if (horas > 0) {
      const subtotal = area.taxaPorHora * horas;
      valorHorasAdicionais += subtotal;
      detalhesHoras.push({
        area,
        horas,
        subtotal,
      });
    }
  });

  const subtotalBruto = valorEtapa1Fixo + valorPecasOpcionais + valorHorasAdicionais;
  const valorDescontoInterior = subtotalBruto * descontoValido;
  const subtotalComDesconto = subtotalBruto - valorDescontoInterior;
  const valorTaxaRefacao = subtotalComDesconto * taxaRefacaoValida;
  const valorTotal = subtotalComDesconto + valorTaxaRefacao;

  return {
    valorEtapa1Fixo: Number(valorEtapa1Fixo.toFixed(2)),
    valorPecasOpcionais: Number(valorPecasOpcionais.toFixed(2)),
    valorHorasAdicionais: Number(valorHorasAdicionais.toFixed(2)),
    subtotalBruto: Number(subtotalBruto.toFixed(2)),
    valorDescontoInterior: Number(valorDescontoInterior.toFixed(2)),
    subtotalComDesconto: Number(subtotalComDesconto.toFixed(2)),
    valorTaxaRefacao: Number(valorTaxaRefacao.toFixed(2)),
    valorTotal: Number(valorTotal.toFixed(2)),
    detalhesDeliverables,
    detalhesHoras,
  };
}
