/**
 * Matriz de Precificação Oficial (Tabela Sinapro-SP) para TAGMOB OS
 * 
 * "Valores Referenciais de Serviços Internos", publicado pelo Sinapro-SP.
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
  detalhes: string[];
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
    isObrigatorio: true, // ÚNICO ITEM FIXO / MANDATÓRIO DA CAMPANHA
    descricao: "Desenvolvimento mestre da estratégia conceitual da campanha, criação do Key Visual (KV) matriz em altíssima resolução, manifesto da campanha, grid visual orientador e estudo de linguagem cromática imobiliária.",
    detalhes: [
      "Vetorização mestre do Key Visual (Formatos AI, EPS, SVG, PDF em curvas)",
      "Estudo de linguagem cromática imobiliária (HEX, RGB, CMYK e Pantone)",
      "Direção visual de iluminação, textura, atmosfera e tratamento fotográfico",
      "Grid construtivo e guia de proporções técnicas para desdobramentos",
      "Simulação em fotomontagens e mockups 3D de alta fidelidade",
      "Adaptação teste para múltiplos formatos (Master 1:1, 9:16, 16:9, Outdoor)"
    ],
  },

  // ─── BLOCO 02 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-102",
    nome: "Marca/logotipo imobiliário",
    etapa: 2,
    macroEtapaLabel: "BRANDING (MARCA - LOGOTIPO - IDENTIDADE VISUAL)",
    precoBase: 29369.07,
    isObrigatorio: false,
    descricao: "Criação conceitual da assinatura visual da incorporação, vetorização final da marca mestre em curvas com variações de cor, aplicação e teste de redução.",
    detalhes: [
      "Assinatura visual principal e secundária (Vetor AI, EPS, SVG, PDF)",
      "Versões em positiva, negativa, monocromática e aplicação sobre imagens",
      "Estudo de redução mínima técnica para mídias digitais e impressas",
      "Desenvolvimento de tipografia proprietária ou especificação licenciada",
      "Grid construtivo da marca e delimitação de margem de proteção"
    ],
  },
  {
    id: "ent-sin-103",
    nome: "Manual de identidade visual",
    etapa: 2,
    macroEtapaLabel: "BRANDING (MARCA - LOGOTIPO - IDENTIDADE VISUAL)",
    precoBase: 2406.35,
    isObrigatorio: false,
    unidadeMedida: "Por Lâmina",
    descricao: "Guia normativo em PDF interativo detalhando especificações cromáticas, padrões tipográficos, regras de aplicação do logotipo e desdobramentos de marca.",
    detalhes: [
      "Normas de uso e aplicação da marca por lâmina técnica",
      "Especificação de paleta de cores primária e secundária (CMYK, RGB, HEX)",
      "Hierarquia tipográfica para títulos, subtítulos, corpo e chamadas",
      "Matriz de proibições de uso, distorções e aplicações incorretas",
      "Regras para co-branding com construtora e parceiros comerciais"
    ],
  },
  {
    id: "ent-sin-104",
    nome: "Slogan",
    etapa: 2,
    macroEtapaLabel: "BRANDING (MARCA - LOGOTIPO - IDENTIDADE VISUAL)",
    precoBase: 13767.14,
    isObrigatorio: false,
    descricao: "Desenvolvimento de conceito verbal mestre, criação do slogan da incorporação e síntese de posicionamento para ancoragem comercial.",
    detalhes: [
      "Processo de naming e exploração verbal de conceito imobiliário",
      "Registro de defesa conceitual e adequação ao público-alvo",
      "Manual de tom de voz para uso da assinatura em mídias sociais e filmes",
      "Guia de aplicação do slogan junto à marca principal"
    ],
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
    descricao: "Design de lâminas técnicas de apresentação comercial e meeting para convenção de vendas com corretores e investidores.",
    detalhes: [
      "Diagramação visual de lâminas estáticas em formato 16:9 (PPTX e Keynote)",
      "Inclusão de gráficos de vendas, mapas de entorno e diferenciais do produto",
      "Tratamento de renders e perspectivas técnicas inclusas nos slides",
      "Exportação em alta resolução em PDF comercial e versão editável"
    ],
  },
  {
    id: "ent-sin-602",
    nome: "Template para PPT",
    etapa: 3,
    macroEtapaLabel: "MATERIAIS ESPECIAIS",
    precoBase: 9099.40,
    isObrigatorio: false,
    descricao: "Template corporativo editável contendo capa, miolo base, lâminas de transição e encerramento para uso contínuo da equipe comercial.",
    detalhes: [
      "Arquivo master editável em PPTX com máscara de slides",
      "Paleta de cores e fontes nativas configuradas no arquivo",
      "Layouts padronizados para textos, tabelas de preço, fotos e plantas",
      "Guia de instruções para edição rápida pelo time de vendas"
    ],
  },
  {
    id: "ent-sin-604",
    nome: "Assinatura de e-mail",
    etapa: 3,
    macroEtapaLabel: "MATERIAIS ESPECIAIS",
    precoBase: 7514.50,
    isObrigatorio: false,
    descricao: "Design e padronização gráfica de assinatura de e-mail institucional responsiva em HTML e versão estática.",
    detalhes: [
      "Código HTML responsivo com links clicáveis para site e WhatsApp",
      "Formatos PNG/JPG para clientes de e-mail legados (Outlook/Gmail)",
      "Template de aplicação para equipe interna e corretores credenciados",
      "Instruções técnicas para instalação nos gerenciadores de e-mail"
    ],
  },

  // ─── BLOCO 04 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-505",
    nome: "Outdoor",
    etapa: 4,
    macroEtapaLabel: "MÍDIA EXTERIOR (OUT OF HOME E DOOH)",
    precoBase: 16097.55,
    isObrigatorio: false,
    descricao: "Projeto gráfico de grande formato para veiculação externa (Outdoor simples, Backlight ou Frontlight) com preparação técnica para impressão.",
    detalhes: [
      "Layout em alta resolução na escala oficial 9x3m ou proporcional",
      "Fechamento de arquivo em PDF/X-1a com sangria e perfil de cor CMYK",
      "Diagramação com leitura rápida e foco no call to action comercial",
      "Mockup 3D para visualização prévia da aplicação em via pública"
    ],
  },
  {
    id: "ent-sin-508",
    nome: "Vídeos digitais para DOOH e OOH",
    etapa: 4,
    macroEtapaLabel: "MÍDIA EXTERIOR (OUT OF HOME E DOOH)",
    precoBase: 32986.12,
    isObrigatorio: false,
    descricao: "Produção de vídeo animado em motion graphics 2D/3D otimizado para exibições em painéis de LED urbanos, mídias de elevador e shoppings.",
    detalhes: [
      "Animação em motion graphics de alta taxa de quadros (60fps)",
      "Otimização nos formatos verticais (9:16) e horizontais (16:9)",
      "Exportação sem áudio ou com legenda de alto contraste conforme diretrizes DOOH",
      "Formatos MP4/H.264 e ProRes em conformidade com as exibidoras de mídia"
    ],
  },

  // ─── BLOCO 05 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-501",
    nome: "Tapume",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 8380.12,
    isObrigatorio: false,
    descricao: "Projeto de comunicação visual para fechamento de obra e tapumes promocionais com impacto estético e institucional.",
    detalhes: [
      "Projeto executivo de comunicação gráfica por módulos de lona/adesivo",
      "Layout em altíssima resolução com renderização de fachada e frases de impacto",
      "Especificação técnica de materiais (lonas vulcanizadas, ACM ou vinil)",
      "Gabarito com cotas para montagem física pela equipe da obra"
    ],
  },
  {
    id: "ent-sin-502",
    nome: "Cavalete",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 9636.44,
    isObrigatorio: false,
    descricao: "Design gráfico para cavaletes móveis de calçada e banners promocionais direcionais para atrair tráfego ao plantão.",
    detalhes: [
      "Layout bifacial de alto contraste visual para leitura rápida de pedestres e veículos",
      "Fechamento técnico em PDF para impressão em lona ou chapa rígida",
      "Chamadas promocionais de valor, localização e telefone de plantão"
    ],
  },
  {
    id: "ent-sin-503",
    nome: "Cubo/Totem",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 16695.36,
    isObrigatorio: false,
    descricao: "Projeto gráfico tridimensional para totens de plantão de vendas, cubos informativos de maquete e displays de chão.",
    detalhes: [
      "Planificação de facas e dobras para totens e displays de 4 faces",
      "Design focado nos atributos do produto, acabamentos e condições de pagamento",
      "Fechamento técnico para impressão digital em PS, MDF ou papelão ondulado"
    ],
  },
  {
    id: "ent-sin-504",
    nome: "Placa indicativa de rua",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 8425.68,
    isObrigatorio: false,
    descricao: "Comunicação visual para placas direcionais de rua, setas indicativas de trânsito e sinalização de acesso ao estande.",
    detalhes: [
      "Design gráfico de sinalização viária com contraste de cor aprovado",
      "Formatos refletivos e vinílicos para leitura diurna e noturna",
      "Arquivos em vetor fechados para corte eletrônico e serigrafia"
    ],
  },
  {
    id: "ent-sin-506",
    nome: "Fachada externa",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 17708.69,
    isObrigatorio: false,
    descricao: "Projeto de comunicação visual e envelopamento da fachada do plantão de vendas com letreiros e iluminação.",
    detalhes: [
      "Projeto gráfico tridimensional de ambientação de fachada",
      "Especificação de materiais (Letra caixa, backlighting, acrílico e ACM)",
      "Detalhamento de aplicação da marca mestre e elementos conceituais na entrada",
      "Arquivos técnicos em escala real para fabricação pela empresa de sinalização"
    ],
  },
  {
    id: "ent-sin-507",
    nome: "Espaço instagramável",
    etapa: 5,
    macroEtapaLabel: "PDV E SINALIZAÇÃO",
    precoBase: 25043.03,
    isObrigatorio: false,
    descricao: "Conceituação e projeto de ambientação instagramável interativa para fotos de visitantes e corretores no estande.",
    detalhes: [
      "Projeto cenográfico e gráfico de painéis para fotos com a marca do empreendimento",
      "Especificação de frases vazadas em neon LED, arranjos vegetais ou texturas",
      "Gabarito técnico com planta baixa e vista frontal do ambiente fotográfico",
      "Guia de iluminação e ângulos ideais para captura em smartphones"
    ],
  },

  // ─── BLOCO 06 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-605",
    nome: "Camiseta/colete/avental",
    etapa: 6,
    macroEtapaLabel: "BRINDES E MATERIAIS DE APOIO",
    precoBase: 25902.44,
    isObrigatorio: false,
    descricao: "Design de vestuário institucional (camisetas, coletes e aventais) para promotores, recepção e corretores de plantão.",
    detalhes: [
      "Layout de estamparia frontal, traseira e de mangas em vetor",
      "Especificação de cores de tecido, técnicas de silk-screen ou bordado",
      "Mockup tridimensional do vestuário para aprovação comercial"
    ],
  },
  {
    id: "ent-sin-606",
    nome: "Chaveiro/pendrive/squeezer",
    etapa: 6,
    macroEtapaLabel: "BRINDES E MATERIAIS DE APOIO",
    precoBase: 4293.61,
    isObrigatorio: false,
    descricao: "Personalização gráfica de brindes promocionais (garrafas de água, squeezes, chaveiros e pendrives) para distribuição no PDV.",
    detalhes: [
      "Gabarito gráfico com área útil de gravação tampográfica ou laser",
      "Arquivos vetoriais monocromáticos e coloridos preparados para produção",
      "Mockups virtuais dos produtos personalizados"
    ],
  },
  {
    id: "ent-sin-607",
    nome: "Sacola/bolsa",
    etapa: 6,
    macroEtapaLabel: "BRINDES E MATERIAIS DE APOIO",
    precoBase: 4978.37,
    isObrigatorio: false,
    descricao: "Design de embalagens e sacolas promocionais de papel kraft, duplex ou TNT para entrega de materiais ao cliente comprador.",
    detalhes: [
      "Desenho de faca especial de corte, vinco e alças",
      "Aplicação da marca com acabamentos em Hot Stamping, verniz localizado ou serigrafia",
      "Fechamento de arquivo técnico para gráfica rápida ou industrial"
    ],
  },

  // ─── BLOCO 07 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-201",
    nome: "Book (capa)",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 7716.06,
    isObrigatorio: false,
    descricao: "Design de capa e contracapa para o book comercial impresso e digital do produto imobiliário.",
    detalhes: [
      "Design de capa e lombada com acabamentos especiais (Verniz UV, Hot Stamping, Soft Touch)",
      "Fechamento gráfico de alta fidelidade em PDF/X-1a com sangria técnica",
      "Mockups 3D do book fechado e semi-aberto para campanhas digitais"
    ],
  },
  {
    id: "ent-sin-202",
    nome: "Book (miolo)",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 6280.26,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Diagramação técnica e criação gráfica das páginas internas do book promocional por página.",
    detalhes: [
      "Grid de diagramação editorial sofisticado com tratamento de imagens 3D",
      "Formatação de textos descritivos, plantas humanizadas e memoriais",
      "Exportação em PDF de alta resolução para gráfica e PDF leve com links clicáveis"
    ],
  },
  {
    id: "ent-sin-203",
    nome: "Folder/folheto/catálogo",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 4364.01,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Desenvolvimento gráfico de páginas de folders promocionais e catálogos de apresentação de vendas.",
    detalhes: [
      "Diagramação de lâminas com dobras especiais (2 dobras, 3 dobras ou sanfona)",
      "Inserção estratégica de perspectivas ilustradas, mapa de localização e tabela de ofertas",
      "Arquivo pronto para impressão gráfica em CMYK de 300 DPI"
    ],
  },
  {
    id: "ent-sin-204",
    nome: "Folheto técnico",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 4861.02,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Diagramação de folhetos técnicos de vendas com plantas cotadas, especificações de acabamentos e dados de engenharia.",
    detalhes: [
      "Organização técnica de cotas de plantas, quadros de metragens e áreas privativas",
      "Linguagem visual limpa focada em corretores e clientes em fase de decisão",
      "Arquivo final em vetor PDF para impressão ou envio digital"
    ],
  },
  {
    id: "ent-sin-205",
    nome: "Caderno",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 11108.15,
    isObrigatorio: false,
    descricao: "Caderno de Plantas / Caderno Geral compilando todas as tipologias de apartamentos, variações de planta e implantação.",
    detalhes: [
      "Compilação gráfica de todas as opções de plantas (Padronizadas, Opções de ampliação, Garden e Coberturas)",
      "Capa e miolo completos em formato executivo para mesa de atendimento",
      "Sumário navegável e índice técnico de metragens"
    ],
  },
  {
    id: "ent-sin-206",
    nome: "Mapa localização",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 8489.91,
    isObrigatorio: false,
    descricao: "Vetorização ilustrada de mapa de acesso, vias de tráfego, infraestrutura do bairro e pontos de interesse do entorno.",
    detalhes: [
      "Desenvolvimento artístico vetorial de mapa 2.5D ou 2D do entorno",
      "Iconografia personalizada para escolas, parques, metrô, shoppings e hospitais",
      "Arquivo em vetor AI/SVG exportável para livros, folders e site"
    ],
  },
  {
    id: "ent-sin-207",
    nome: "Tabela de preços",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 4861.02,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Formatação gráfica e organização visual de tabelas de preços e tabloides de ofertas por página para consulta da equipe.",
    detalhes: [
      "Hierarquia visual clara de unidades, metragens, fluxo de pagamento e valores",
      "Design de cabeçalhos institucionais e rodapés técnicos com vigência de preço",
      "Arquivos em PDF otimizados para rápida impressão de mesa"
    ],
  },
  {
    id: "ent-sin-208",
    nome: "Cupom/crachá",
    etapa: 7,
    macroEtapaLabel: "MATERIAIS GRÁFICOS (PRODUÇÃO GRÁFICA)",
    precoBase: 6234.70,
    isObrigatorio: false,
    descricao: "Criação visual de fita de acreditação, crachás de identificação do time de vendas, fichas de inscrição e cupons de sorteio.",
    detalhes: [
      "Layout de crachás normatizados para corretores e gerentes de produto",
      "Design de cupons de promoção e fichas de atendimento com numeração sequencial",
      "Fechamento de arquivo pronto para gráfica"
    ],
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
    descricao: "Roteirização técnica publicitária em duas colunas (Áudio e Vídeo) para filmes de TV, cinema e manifesto de marca (15\", 30\", 45\" e 60\").",
    detalhes: [
      "Decupagem de cenas com indicação de locução, acting e elementos visuais",
      "Direcionamento de estilo de trilha sonora, efeitos sonoros e ritmo de corte",
      "Minuta de storyboard conceitual com descrição de enquadramentos",
      "Call to Action verbal e visual com parâmetros de veiculação"
    ],
  },
  {
    id: "ent-sin-401",
    nome: "Roteiro para vídeos de internet, redes sociais e DOOH",
    etapa: 8,
    macroEtapaLabel: "RÁDIO - TV - CINEMA (PRODUÇÃO MULTIMÍDIA)",
    precoBase: 32225.57,
    isObrigatorio: false,
    unidadeMedida: "7\" a 60\"",
    descricao: "Produção de vídeo curto 100% animado em motion graphics para mídias sociais, feed, reels e telas internas sem necessidade de captação.",
    detalhes: [
      "Animação em motion graphics 2D/3D dos renders e plantas do empreendimento",
      "Animação de tipografia e elementos de marca com transições fluidas",
      "Otimização nos formatos 9:16 (Reels/TikTok) e 1:1 (Feed/Display)",
      "Trilha sonora licenciada e sincronização de efeitos sonoros"
    ],
  },
  {
    id: "ent-sin-402",
    nome: "Vinheta de Abertura ou Encerramento",
    etapa: 8,
    macroEtapaLabel: "RÁDIO - TV - CINEMA (PRODUÇÃO MULTIMÍDIA)",
    precoBase: 1231.21,
    isObrigatorio: false,
    unidadeMedida: "5\" a 7\"",
    descricao: "Assinatura animada de 5 a 7 segundos em motion graphics para padronizar a abertura ou encerramento dos vídeos da marca.",
    detalhes: [
      "Animação 3D/2D do logotipo e slogan da incorporadora",
      "Efeito de sound design exclusivo para a assinatura de áudio",
      "Canal alpha (fundo transparente) em ProRes 4444 para fácil sobreposição"
    ],
  },
  {
    id: "ent-sin-403",
    nome: "Roteiro para Vídeos de Internet, Redes Sociais e DOOH",
    etapa: 8,
    macroEtapaLabel: "RÁDIO - TV - CINEMA (PRODUÇÃO MULTIMÍDIA)",
    precoBase: 17240.70,
    isObrigatorio: false,
    descricao: "Roteirização técnica para vídeos digitais, reels de corretores, tour pelo decorado e comerciais de internet.",
    detalhes: [
      "Roteiro dinâmico focado em retenção nos primeiros 3 segundos de vídeo",
      "Instruções de câmera, texto para teleprompter ou dublagem",
      "Sugestões de legendas e chamadas para ação comerciais"
    ],
  },

  // ─── BLOCO 09 (OPCIONAL) ────────────────────────────────────────────────────
  {
    id: "ent-sin-301",
    nome: "Landing Page",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 9736.22,
    isObrigatorio: false,
    descricao: "Design e arquitetura UX/UI de página única de alta conversão para captação de leads do lançamento imobiliário.",
    detalhes: [
      "Layout responsivo Mobile-First (Design em Figma com protótipo navegável)",
      "Seções de Herói, Diferenciais, Galeria de Renders, Plantas, Localização e Form de Contato",
      "Especificação de pixels de rastreamento (Meta Pixel, Google Tag Manager e GA4)",
      "Integração visual com botão flutuante de WhatsApp e formulário de vendas"
    ],
  },
  {
    id: "ent-sin-302",
    nome: "Website",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 53267.73,
    isObrigatorio: false,
    descricao: "Arquitetura UX/UI completa para website institucional do empreendimento com telas institucionais, galeria e filtros.",
    detalhes: [
      "Design de todas as páginas institucionais (Home, O Projeto, Tipologias, Galeria 360°, Entorno, Construtora e Contato)",
      "UI Kit de componentes editáveis no Figma para desenvolvimento Web",
      "Filtro interativo de busca de tipologias por metragem e dormitórios",
      "Layout da área de imprensa e downloads de arquivos para corretores"
    ],
  },
  {
    id: "ent-sin-303",
    nome: "Hotsite",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 29206.08,
    isObrigatorio: false,
    descricao: "Hotsite temático e focado para as fases de pré-lançamento e sustentação de vendas.",
    detalhes: [
      "Layout focado em mistério ou pré-cadastro para contagem regressiva de lançamento",
      "Animações de entrada e interatividade visual leve",
      "Formulário de pré-reserva de unidades integrado ao CRM"
    ],
  },
  {
    id: "ent-sin-304",
    nome: "E-mail Marketing",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 4585.89,
    isObrigatorio: false,
    descricao: "Criação visual e codificação HTML responsivo para disparos de e-mail marketing corporativos e régua de relacionamento.",
    detalhes: [
      "Design de layout e redação publicitária inclusa",
      "Codificação HTML responsiva testada no Mailchimp, RD Station e Hubspot",
      "Imagens fatiadas e hospedadas com links rastreáveis de UTM"
    ],
  },
  {
    id: "ent-sin-305",
    nome: "Convite Digital",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 4815.19,
    isObrigatorio: false,
    descricao: "Card gráfico para WhatsApp e convites digitais com botões interativos de confirmação de presença (RSVP) e localização.",
    detalhes: [
      "Design em formato vertical otimizado para visualização em smartphones",
      "Botões interativos em PDF/Web para abrir Waze/Google Maps e WhatsApp",
      "Versão imagem PNG em altíssima definição para envio rápido"
    ],
  },
  {
    id: "ent-sin-306",
    nome: "Posts (simples)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 4725.19,
    isObrigatorio: false,
    descricao: "Criação de post estático ou GIF animado para redes sociais (Instagram/Facebook/LinkedIn) com copywriting incluso.",
    detalhes: [
      "Design visual de card estático (1080x1080px e 1080x1350px)",
      "Redação de legenda publicitária com hashtags estratégicas",
      "Exportação de imagem pronta para agendamento ou publicação"
    ],
  },
  {
    id: "ent-sin-307",
    nome: "Posts (carrossel)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 9450.38,
    isObrigatorio: false,
    unidadeMedida: "De 2 a 10 telas + Texto",
    descricao: "Design contínuo de post carrossel para redes sociais de 2 a 10 telas para apresentação detalhada de produto.",
    detalhes: [
      "Layout com continuidade panorâmica entre os slides",
      "Exploração de diferenciais, tour por plantas ou diferenciais de lazer",
      "Legenda e CTA focados em direcionamento para conversa no direct ou WhatsApp"
    ],
  },
  {
    id: "ent-sin-308",
    nome: "Stories (Estático)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 2137.54,
    isObrigatorio: false,
    descricao: "Criativo estático na dimensão 9:16 (1080x1920px) para stories do Instagram/Facebook.",
    detalhes: [
      "Design de alto impacto visual otimizado para consumo rápido de 5 segundos",
      "Espaçamento para inserção de figurinhas de link ou enquete do Instagram",
      "Exportação em formato JPG/PNG"
    ],
  },
  {
    id: "ent-sin-309",
    nome: "Stories (Animado/Motion)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 2353.04,
    isObrigatorio: false,
    descricao: "Criativo em motion graphics de 15 segundos na dimensão 9:16 para atração de atenção nos stories.",
    detalhes: [
      "Animação fluida de texto e imagem do empreendimento em motion graphics",
      "Efeitos de transição atrativos para aumentar a retenção do usuário",
      "Exportação em vídeo MP4 de alta resolução"
    ],
  },
  {
    id: "ent-sin-310",
    nome: "Anúncios Display (Master)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 5009.98,
    isObrigatorio: false,
    descricao: "Design master de peças para Google Display Network (GDN) e portais imobiliários em todas as resoluções principais.",
    detalhes: [
      "Criação das peças masters nos formatos 300x250, 728x90, 300x600, 320x50 e 160x600",
      "Foco na legibilidade da oferta e botão de ação evidente",
      "Exportação de arquivos prontos para veiculação no Google Ads"
    ],
  },
  {
    id: "ent-sin-311",
    nome: "Anúncios Display (Adaptação)",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 2353.04,
    isObrigatorio: false,
    descricao: "Adaptação de formato animado HTML5 ou GIF para os demais tamanhos de banners secundários.",
    detalhes: [
      "Desdobramento do layout master para até 5 tamanhos adicionais de banner",
      "Otimização de peso de arquivo (abaixo de 150KB) conforme exigências do Google Ads"
    ],
  },
  {
    id: "ent-sin-312",
    nome: "E-book / Catálogo Digital",
    etapa: 9,
    macroEtapaLabel: "COMUNICAÇÃO DIGITAL, PRODUÇÃO E SERVIÇOS",
    precoBase: 2406.35,
    isObrigatorio: false,
    unidadeMedida: "Valor por página",
    descricao: "Diagramação digital de e-books e catálogos em PDF navegável por página para isca de captura de leads.",
    detalhes: [
      "Diagramação em formato horizontal ou vertical para leitura em tablets e celulares",
      "Links internos clicáveis no PDF para vídeos e formulários",
      "Otimização de tamanho de arquivo sem perda de qualidade visual"
    ],
  },

  // ─── BLOCO 10 (OPCIONAL) ───────────────────────────────────────────────────
  {
    id: "ent-sin-701",
    nome: "Anúncio Jornal (1 Página)",
    etapa: 10,
    macroEtapaLabel: "ADVERTISING (CAMPANHAS PUBLICITÁRIAS - ANÚNCIOS)",
    precoBase: 14153.70,
    isObrigatorio: false,
    descricao: "Layout em alta resolução para veiculação de página inteira em jornais de grande circulação.",
    detalhes: [
      "Fechamento gráfico rigoroso no gabarito oficial do veículo de imprensa",
      "Profilaxia de cor para impressão em papel jornal de alta absorção",
      "Assinatura corporativa, dados de registro de incorporação (RI) e contatos"
    ],
  },
  {
    id: "ent-sin-702",
    nome: "Anúncio Revista (1 Página)",
    etapa: 10,
    macroEtapaLabel: "ADVERTISING (CAMPANHAS PUBLICITÁRIAS - ANÚNCIOS)",
    precoBase: 11784.63,
    isObrigatorio: false,
    descricao: "Layout publicitário de página inteira para revistas de negócios, decoração e setor imobiliário.",
    detalhes: [
      "Design visual refinado com acabamento fotográfico para impressão em papel couchê",
      "Fechamento em PDF/X-1a com marcas de corte e sangria técnicas",
      "Textos institucionais e valorização da marca do lançamento"
    ],
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
