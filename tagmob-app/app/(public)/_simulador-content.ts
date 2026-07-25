export type Deliverable = {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  desc: string;
  isObrigatorio: boolean;
  detalhes: string[];
};

export const DELIVERABLES: Deliverable[] = [
  {
    id: "pkg-estrategia",
    nome: "Campanha (Conceito, Estratégia e Identidade Visual)",
    categoria: "Estratégia & Branding",
    preco: 15000,
    desc: "Apresentação da estratégia de marca, posicionamento mestre e marca mestre",
    isObrigatorio: true,
    detalhes: [
      "Campanha (Apresentação do Conceito, Estratégia e Identidade Visual)",
      "Filme Conceito",
      "KV (Key Visual)",
      "Manual da Marca",
    ],
  },
  {
    id: "pkg-comerciais",
    nome: "Materiais Comerciais de Venda",
    categoria: "Materiais Comerciais",
    preco: 18000,
    desc: "Principais ferramentas utilizadas pela equipe comercial durante todo o processo de vendas",
    isObrigatorio: false,
    detalhes: [
      "Book do Cliente – Folhetão (Digital e Impresso)",
      "Book do Cliente – Mini (Digital e Impresso)",
      "Book de Mesa do Corretor (Digital e Impresso)",
      "Caderno de Plantas",
      "Folder Prospecto",
      "Folheto Intermediário",
      "Folheto de Combate",
      "Implantação",
      "Ficha Técnica",
    ],
  },
  {
    id: "pkg-digital",
    nome: "Comunicação Digital",
    categoria: "Comunicação Digital",
    preco: 8000,
    desc: "Materiais destinados à divulgação e ao relacionamento com clientes e corretores",
    isObrigatorio: false,
    detalhes: ["E-mail Marketing", "WhatsApp Card", "Convite Digital (Corretores e Clientes)"],
  },
  {
    id: "pkg-eventos",
    nome: "Eventos de Lançamento",
    categoria: "Eventos Lançamento",
    preco: 12000,
    desc: "Materiais de suporte para convenções, treinamentos e eventos de lançamento",
    isObrigatorio: false,
    detalhes: [
      "Convite Impresso (Corretores e Clientes)",
      "Convite para Meeting",
      "Template de Apresentação para Meeting",
      "Backdrop para Eventos",
      "Banner Impresso Sinalizador",
    ],
  },
  {
    id: "pkg-campo",
    nome: "Materiais de Campo",
    categoria: "Materiais de Campo",
    preco: 9500,
    desc: "Materiais promocionais físicos e sinalização para ações externas de rua",
    isObrigatorio: false,
    detalhes: [
      "Sinalização para Promotores (Colete, Credencial e Pasta)",
      "Folhetos Promocionais",
      "Balcão de Degustação Adesivado",
      "Garrafa de Água Personalizada",
      "Lixo Car Personalizado",
      "Brindes Especiais",
    ],
  },
  {
    id: "pkg-visual",
    nome: "Comunicação Visual",
    categoria: "Comunicação Visual",
    preco: 16000,
    desc: "Sinalização e ambientação para o estande de vendas e pontos estratégicos",
    isObrigatorio: false,
    detalhes: [
      "Comunicação Visual do Estande",
      "Placas de Comunicação Visual",
      "Placa de Produto",
      "Placa Seta de Trânsito",
      "Tapume de Fechamento",
      "Cavalete Promocional",
      "Adesivo Microperfurado para Carros",
      "Faixas de Poste",
      "Wind Banners Promocionais",
      "Totens Internos e Externos",
    ],
  },
  {
    id: "pkg-midia-impressa",
    nome: "Mídia Impressa",
    categoria: "Mídia Impressa",
    preco: 5000,
    desc: "Anúncios estruturados para veiculação em jornais e revistas físicas",
    isObrigatorio: false,
    detalhes: ["Anúncio para Jornal", "Anúncio para Revista"],
  },
  {
    id: "pkg-plataformas",
    nome: "Plataformas Digitais",
    categoria: "Plataformas Digitais",
    preco: 11000,
    desc: "Desenvolvimento de site oficial, catálogo digital interativo e portais imobiliários",
    isObrigatorio: false,
    detalhes: [
      "Site ou Landing Page do Empreendimento",
      "Catálogo Digital Interativo",
      "Materiais para Portais Imobiliários",
    ],
  },
  {
    id: "pkg-audiovisual",
    nome: "Conteúdo Audiovisual",
    categoria: "Audiovisual",
    preco: 14000,
    desc: "Vídeos do decorado, institucionais e tour virtual 360 graus",
    isObrigatorio: false,
    detalhes: [
      "Vídeo Institucional do Empreendimento",
      "Vídeo da Região",
      "Vídeo do Decorado",
      "Tour Virtual 360°",
    ],
  },
  {
    id: "pkg-imagens",
    nome: "Imagens & Renders 3D",
    categoria: "Imagens & Renders",
    preco: 15000,
    desc: "Perspectivas externas, internas, de lazer e plantas humanizadas coloridas",
    isObrigatorio: false,
    detalhes: [
      "Maquete Eletrônica (Imagens 3D)",
      "Perspectivas Ilustradas",
      "Plantas Humanizadas Coloridas",
      "Fotos Renderizadas Premium",
    ],
  },
  {
    id: "pkg-kits",
    nome: "Kits Comerciais de Venda",
    categoria: "Kits Comerciais",
    preco: 4500,
    desc: "Kits de apresentação para corretores e sacola institucional para clientes",
    isObrigatorio: false,
    detalhes: [
      "Kit do Corretor de Vendas",
      "Kit do Cliente Comprador",
      "Credenciais e Crachás Oficiais",
      "Design de Assinatura de E-mail",
    ],
  },
  {
    id: "pkg-marketing",
    nome: "Marketing Digital",
    categoria: "Marketing Digital",
    preco: 10000,
    desc: "Templates de redes sociais, stories, reels e criativos para campanhas patrocinadas",
    isObrigatorio: false,
    detalhes: [
      "Posts para Redes Sociais",
      "Stories Instagram",
      "Reels / TikTok",
      "Banners Google Display e Portais",
      "Peças para Meta Ads (Anúncios)",
      "Peças para Google Ads (Display)",
    ],
  },
];

export const COMPARATIVE_ROWS = [
  {
    criterio: "Base de Precificação",
    trad: "% sobre VGV (2%–4% do valor das vendas)",
    tag: "Escopo fechado + entregáveis reais",
  },
  {
    criterio: "Transparência de Custos",
    trad: "Opaco — cresce com o sucesso do cliente",
    tag: "Preço fixo por item no simulador",
  },
  {
    criterio: "Setup Inicial (Etapa 1)",
    trad: "Embutido no VGV — invisível",
    tag: "Combo fixo mandatório com KV, Filme, Manual e Campanha",
  },
  {
    criterio: "Personalização",
    trad: "Pacotes fechados sem flexibilidade",
    tag: "Carrinho modular: adiciona só o que faz sentido",
  },
  {
    criterio: "Modelo de Contrato",
    trad: "Apenas Projeto Fechado",
    tag: "Projeto Fechado, Fee Mensal, Banco de Horas ou Por Demanda",
  },
  {
    criterio: "Autonomia do Cliente",
    trad: "Zero — tudo passa pela agência",
    tag: "OS: edita variáveis de texto, fotos, exporta em segundos",
  },
];
