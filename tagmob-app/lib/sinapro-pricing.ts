/**
 * Matriz de Precificação Oficial (Tabela Sinapro-SP) para TAGMOB OS
 * 
 * Contém a definição completa de entregáveis, valores por hora-homem e motor de cálculo
 * de orçamentos por escopo com suporte a:
 * - Core Fixo Etapa 1 (Mandatório)
 * - Peças Opcionais Selecionadas
 * - Horas Adicionais por Especialidade
 * - Desconto Regional (Interior) até 40%
 * - Taxa de Refação Adicional (+40% sobre a peça/escopo se fora do briefing aprovado)
 */

export interface SinaproDeliverable {
  id: string;
  nome: string;
  etapa: number; // 1 a 7
  macroEtapaLabel: string;
  precoBase: number; // Em BRL (float)
  isObrigatorio: boolean;
  unidadeMedida?: string; // Ex: "Por lâmina", "Valor por página", "Slide", etc.
  descricao: string;
}

export interface HourlyRateArea {
  id: string;
  area: string;
  taxaPorHora: number; // BRL/hora
  descricao: string;
}

export interface CalculationInput {
  selectedDeliverableIds: string[]; // Lista de IDs de entregáveis selecionados
  deliverableQuantities?: Record<string, number>; // Quantidade por entregável (ex: nº de páginas/slides)
  extraHoursByArea?: Record<string, number>; // Quantidade de horas adicionais por ID de área
  descontoInteriorPct?: number; // 0.0 a 0.40 (ex: 0.20 para 20%)
  aplicaRefacao?: boolean; // Se true, aplica +40% (ou taxa informada) de refação
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
  // ─── 01. Estratégia, Branding e Conceito Criativo (Core Fixo - Etapa 1) ─────
  {
    id: "ent-sin-101",
    nome: "Criação de Tema/Conceito de Campanha (Key Visual Matriz)",
    etapa: 1,
    macroEtapaLabel: "Estratégia, Branding e Conceito Criativo",
    precoBase: 48231.93,
    isObrigatorio: true,
    descricao: "Conceituação mestre da campanha e desenvolvimento do Key Visual matriz do empreendimento.",
  },
  {
    id: "ent-sin-102",
    nome: "Marca/Logotipo Imobiliário (Criação + Finalização)",
    etapa: 1,
    macroEtapaLabel: "Estratégia, Branding e Conceito Criativo",
    precoBase: 29369.07,
    isObrigatorio: true,
    descricao: "Criação completa e vetorização final da assinatura visual e marca mestre.",
  },
  {
    id: "ent-sin-103",
    nome: "Manual de Identidade Visual (Por Lâmina)",
    etapa: 1,
    macroEtapaLabel: "Estratégia, Branding e Conceito Criativo",
    precoBase: 2406.35,
    isObrigatorio: true,
    unidadeMedida: "Por Lâmina",
    descricao: "Guia normativo de aplicação da marca, tipografias, paleta e regras de desdobramento.",
  },
  {
    id: "ent-sin-104",
    nome: "Slogan",
    etapa: 1,
    macroEtapaLabel: "Estratégia, Branding e Conceito Criativo",
    precoBase: 13767.14,
    isObrigatorio: true,
    descricao: "Criação de conceito verbal e assinatura sintetizada de posicionamento do produto.",
  },
  {
    id: "ent-sin-105",
    nome: "Roteiro de Filme/VT Conceito (15\"/30\"/45\"/60\")",
    etapa: 1,
    macroEtapaLabel: "Estratégia, Branding e Conceito Criativo",
    precoBase: 34481.36,
    isObrigatorio: true,
    unidadeMedida: "15\"/30\"/45\"/60\"",
    descricao: "Roteirização técnica para vídeos manifestos e inserções comerciais.",
  },

  // ─── 02. Materiais Comerciais & Gráficos ────────────────────────────────────
  {
    id: "ent-sin-201",
    nome: "Book (Capa)",
    etapa: 2,
    macroEtapaLabel: "Materiais Comerciais & Gráficos",
    precoBase: 7716.06,
    isObrigatorio: false,
    descricao: "Design de capa e contracapa para o book promocional do produto imobiliário.",
  },
  {
    id: "ent-sin-202",
    nome: "Book (Miolo - Valor por página)",
    etapa: 2,
    macroEtapaLabel: "Materiais Comerciais & Gráficos",
    precoBase: 6280.26,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Diagramação e criação visual das páginas internas do book institucional.",
  },
  {
    id: "ent-sin-203",
    nome: "Folder/Folheto/Catálogo (Valor por página)",
    etapa: 2,
    macroEtapaLabel: "Materiais Comerciais & Gráficos",
    precoBase: 4364.01,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Desenvolvimento de páginas para folder comercial de apresentação.",
  },
  {
    id: "ent-sin-204",
    nome: "Folheto Técnico (Valor por página)",
    etapa: 2,
    macroEtapaLabel: "Materiais Comerciais & Gráficos",
    precoBase: 4861.02,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Formatação visual de plantas, metragens e especificações técnicas por página.",
  },
  {
    id: "ent-sin-205",
    nome: "Caderno de Plantas/Caderno Geral (Capa + Miolo)",
    etapa: 2,
    macroEtapaLabel: "Materiais Comerciais & Gráficos",
    precoBase: 11108.15,
    isObrigatorio: false,
    descricao: "Compilado técnico completo com todas as tipologias de apartamentos e implantação.",
  },
  {
    id: "ent-sin-206",
    nome: "Mapa de Localização (Desenvolvimento de Trajeto)",
    etapa: 2,
    macroEtapaLabel: "Materiais Comerciais & Gráficos",
    precoBase: 8489.91,
    isObrigatorio: false,
    descricao: "Vetorização ilustrada de mapa de acesso, facilidades do entorno e vias.",
  },
  {
    id: "ent-sin-207",
    nome: "Tabela de Preços / Tabloide de Ofertas (Valor por página)",
    etapa: 2,
    macroEtapaLabel: "Materiais Comerciais & Gráficos",
    precoBase: 4861.02,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Design visual e organização gráfica de tabelas comerciais para corretores.",
  },
  {
    id: "ent-sin-208",
    nome: "Ficha Técnica / Ficha de Inscrição / Crachá",
    etapa: 2,
    macroEtapaLabel: "Materiais Comerciais & Gráficos",
    precoBase: 6234.70,
    isObrigatorio: false,
    descricao: "Desenvolvimento de ficha técnica padronizada ou crachás de identificação.",
  },

  // ─── 03. Comunicação & Marketing Digital ──────────────────────────────────
  {
    id: "ent-sin-301",
    nome: "Landing Page (Criação de layout de página única)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 9736.22,
    isObrigatorio: false,
    descricao: "Design responsivo de Landing Page de conversão de leads para o lançamento.",
  },
  {
    id: "ent-sin-302",
    nome: "Website Completo (Layout de telas institucionais/UX)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 53267.73,
    isObrigatorio: false,
    descricao: "Arquitetura de informação, UX/UI completo e layout de todas as seções do site.",
  },
  {
    id: "ent-sin-303",
    nome: "Hotsite de Lançamento (Estrutura focada/UX)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 29206.08,
    isObrigatorio: false,
    descricao: "Hotsite temático e focado na apresentação de produto pré e pós-lançamento.",
  },
  {
    id: "ent-sin-304",
    nome: "E-mail Marketing (Criação e produção do HTML)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 4585.89,
    isObrigatorio: false,
    descricao: "Criação visual e codificação HTML responsivo para disparos de e-mail.",
  },
  {
    id: "ent-sin-305",
    nome: "Card para WhatsApp / Convite Digital",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 4815.19,
    isObrigatorio: false,
    descricao: "Arte Otimizada para envio rápido via WhatsApp e redes com CTA de contato.",
  },
  {
    id: "ent-sin-306",
    nome: "Post Simples Redes Sociais (Card estático/GIF + Texto)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 4725.19,
    isObrigatorio: false,
    descricao: "Criação de post estático ou GIF animado com redação publicitária inclusa.",
  },
  {
    id: "ent-sin-307",
    nome: "Post Carrossel Redes Sociais (De 2 a 10 telas + Texto)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 9450.38,
    isObrigatorio: false,
    unidadeMedida: "De 2 a 10 telas + Texto",
    descricao: "Design contínuo de carrossel de até 10 slides para engajamento e detalhes.",
  },
  {
    id: "ent-sin-308",
    nome: "Stories (Estático)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 2137.54,
    isObrigatorio: false,
    descricao: "Criativo vertical estático no formato 9:16 para Instagram/Facebook.",
  },
  {
    id: "ent-sin-309",
    nome: "Stories (Animado/Motion)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 2353.04,
    isObrigatorio: false,
    descricao: "Criativo vertical animado em motion graphics 9:16 para atração de atenção.",
  },
  {
    id: "ent-sin-310",
    nome: "Anúncios Display GDN (Master - Quaisquer dimensões)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 5009.98,
    isObrigatorio: false,
    descricao: "Design mestre de peças para Google Display Network em todas as resoluções padrão.",
  },
  {
    id: "ent-sin-311",
    nome: "Anúncios Display GDN (Adaptação de formato animado)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 2353.04,
    isObrigatorio: false,
    descricao: "Adaptação de formato animado HTML5 / GIF para os demais tamanhos de banner.",
  },
  {
    id: "ent-sin-312",
    nome: "E-book / Catálogo Digital (Valor por página)",
    etapa: 3,
    macroEtapaLabel: "Comunicação & Marketing Digital",
    precoBase: 2406.35,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Diagramação digital interativa com links navegáveis para download.",
  },

  // ─── 04. Conteúdo Audiovisual & Vídeos Curtos ───────────────────────────────
  {
    id: "ent-sin-401",
    nome: "Vídeos Curtos Digitais / Cartelados para Redes Sociais ou Mídia Indoor (Sem captação, com Motion Graphics - 7\" a 60\")",
    etapa: 4,
    macroEtapaLabel: "Conteúdo Audiovisual & Vídeos Curtos",
    precoBase: 32225.57,
    isObrigatorio: false,
    unidadeMedida: "7\" a 60\"",
    descricao: "Produção de vídeo curto 100% animado com motion graphics para redes sociais ou DOOH.",
  },
  {
    id: "ent-sin-402",
    nome: "Vinheta de Abertura ou Encerramento (5\" a 7\")",
    etapa: 4,
    macroEtapaLabel: "Conteúdo Audiovisual & Vídeos Curtos",
    precoBase: 1231.21,
    isObrigatorio: false,
    unidadeMedida: "5\" a 7\"",
    descricao: "Assinatura animada de 5 a 7 segundos para abertura ou encerramento de vídeos.",
  },
  {
    id: "ent-sin-403",
    nome: "Roteiro para Vídeos de Internet, Redes Sociais e DOOH",
    etapa: 4,
    macroEtapaLabel: "Conteúdo Audiovisual & Vídeos Curtos",
    precoBase: 17240.70,
    isObrigatorio: false,
    descricao: "Criação de roteiro técnico, loco e direção de cena para mídias digitais.",
  },

  // ─── 05. Comunicação Visual & Mídia Exterior (OOH / DOOH) ───────────────────
  {
    id: "ent-sin-501",
    nome: "Tapume (Comunicação Visual de Obra)",
    etapa: 5,
    macroEtapaLabel: "Comunicação Visual & Mídia Exterior (OOH / DOOH)",
    precoBase: 8380.12,
    isObrigatorio: false,
    descricao: "Projeto gráfico de fechamento de obra e tapume com apelo institucional.",
  },
  {
    id: "ent-sin-502",
    nome: "Cavalete / Banner Promocional",
    etapa: 5,
    macroEtapaLabel: "Comunicação Visual & Mídia Exterior (OOH / DOOH)",
    precoBase: 9636.44,
    isObrigatorio: false,
    descricao: "Design gráfico para cavaletes móveis de calçada e banners de sinalização.",
  },
  {
    id: "ent-sin-503",
    nome: "Totem / Cubo / Display de Chão",
    etapa: 5,
    macroEtapaLabel: "Comunicação Visual & Mídia Exterior (OOH / DOOH)",
    precoBase: 16695.36,
    isObrigatorio: false,
    descricao: "Comunicação visual para totens de plantão, cubos tridimensionais e displays.",
  },
  {
    id: "ent-sin-504",
    nome: "Placa Indicativa / Placa Seta",
    etapa: 5,
    macroEtapaLabel: "Comunicação Visual & Mídia Exterior (OOH / DOOH)",
    precoBase: 8425.68,
    isObrigatorio: false,
    descricao: "Design de placas de sinalização direcional e indicação de estande.",
  },
  {
    id: "ent-sin-505",
    nome: "Outdoor (Simples, Backlight ou Frontlight)",
    etapa: 5,
    macroEtapaLabel: "Comunicação Visual & Mídia Exterior (OOH / DOOH)",
    precoBase: 16097.55,
    isObrigatorio: false,
    descricao: "Layout para grandes formatos de mídia exterior (Outdoor, Backlight ou Frontlight).",
  },
  {
    id: "ent-sin-506",
    nome: "Fachada Externa (Plantão de Vendas)",
    etapa: 5,
    macroEtapaLabel: "Comunicação Visual & Mídia Exterior (OOH / DOOH)",
    precoBase: 17708.69,
    isObrigatorio: false,
    descricao: "Projeto de comunicação visual e envelopamento da fachada do plantão.",
  },
  {
    id: "ent-sin-507",
    nome: "Espaço Instagramável",
    etapa: 5,
    macroEtapaLabel: "Comunicação Visual & Mídia Exterior (OOH / DOOH)",
    precoBase: 25043.03,
    isObrigatorio: false,
    descricao: "Conceituação e projeto gráfico de ambientação instagramável no estande.",
  },
  {
    id: "ent-sin-508",
    nome: "Vídeos Digitais para DOOH e OOH (Painéis de Led)",
    etapa: 5,
    macroEtapaLabel: "Comunicação Visual & Mídia Exterior (OOH / DOOH)",
    precoBase: 32986.12,
    isObrigatorio: false,
    descricao: "Animação de alta resolução otimizada para painéis de LED urbanos e shoppings.",
  },

  // ─── 06. Materiais para Eventos & Promocionais (Brindes) ────────────────────
  {
    id: "ent-sin-601",
    nome: "Template de Apresentação para Meeting (Valor por Slide Estático)",
    etapa: 6,
    macroEtapaLabel: "Materiais para Eventos & Promocionais (Brindes)",
    precoBase: 2406.35,
    isObrigatorio: false,
    unidadeMedida: "Valor por Slide Estático",
    descricao: "Design de lâminas de apresentação para a convenção de corretores.",
  },
  {
    id: "ent-sin-602",
    nome: "Template Corporativo (Capa + Miolo base)",
    etapa: 6,
    macroEtapaLabel: "Materiais para Eventos & Promocionais (Brindes)",
    precoBase: 9099.40,
    isObrigatorio: false,
    descricao: "Template editável em PowerPoint/Slides para uso contínuo do marketing.",
  },
  {
    id: "ent-sin-603",
    nome: "Backdrop / Fundo de Palco",
    etapa: 6,
    macroEtapaLabel: "Materiais para Eventos & Promocionais (Brindes)",
    precoBase: 9762.07,
    isObrigatorio: false,
    descricao: "Painel fotográfico de fundo de palco para coletivas e eventos de lançamento.",
  },
  {
    id: "ent-sin-604",
    nome: "Convite Impresso com Envelope",
    etapa: 6,
    macroEtapaLabel: "Materiais para Eventos & Promocionais (Brindes)",
    precoBase: 7514.50,
    isObrigatorio: false,
    descricao: "Design de convite impresso de alto padrão com acabamentos especiais.",
  },
  {
    id: "ent-sin-605",
    nome: "Uniforme (Promotores/Equipe)",
    etapa: 6,
    macroEtapaLabel: "Materiais para Eventos & Promocionais (Brindes)",
    precoBase: 25902.44,
    isObrigatorio: false,
    descricao: "Layout de estamparia e corte para vestuário de promotores e recepcionistas.",
  },
  {
    id: "ent-sin-606",
    nome: "Garrafa de Água Personalizada / Chaveiro / Squeezer (Brindes)",
    etapa: 6,
    macroEtapaLabel: "Materiais para Eventos & Promocionais (Brindes)",
    precoBase: 4293.61,
    isObrigatorio: false,
    descricao: "Personalização gráfica de brindes institucionais para o estande.",
  },
  {
    id: "ent-sin-607",
    nome: "Sacola / Bolsa Promocional",
    etapa: 6,
    macroEtapaLabel: "Materiais para Eventos & Promocionais (Brindes)",
    precoBase: 4978.37,
    isObrigatorio: false,
    descricao: "Design de sacolas e embalagens de entrega de kits para compradores.",
  },

  // ─── 07. Mídia Impressa (Tradicional) ───────────────────────────────────────
  {
    id: "ent-sin-701",
    nome: "Anúncio para Jornal (Página Inteira)",
    etapa: 7,
    macroEtapaLabel: "Mídia Impressa (Tradicional)",
    precoBase: 14153.70,
    isObrigatorio: false,
    descricao: "Layout em alta resolução para veiculação de página inteira em jornais.",
  },
  {
    id: "ent-sin-702",
    nome: "Anúncio para Revista (Página Inteira)",
    etapa: 7,
    macroEtapaLabel: "Mídia Impressa (Tradicional)",
    precoBase: 11784.63,
    isObrigatorio: false,
    descricao: "Anúncio institucional de página inteira para revistas segmentadas.",
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

  // Garante limite máximo do desconto de interior em 40%
  const descontoValido = Math.min(Math.max(descontoInteriorPct, 0), 0.40);
  const taxaRefacaoValida = aplicaRefacao ? Math.max(taxaRefacaoPct, 0) : 0;

  // Garantir que todos os mandatórios da Etapa 1 estão no cálculo
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

  // Somatório bruto
  const subtotalBruto = valorEtapa1Fixo + valorPecasOpcionais + valorHorasAdicionais;

  // Aplicação do Desconto Comercial de Interior (até 40%)
  const valorDescontoInterior = subtotalBruto * descontoValido;
  const subtotalComDesconto = subtotalBruto - valorDescontoInterior;

  // Aplicação da Taxa de Refação (+40% se houver desvio de briefing)
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
