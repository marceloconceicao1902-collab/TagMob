import { PrismaClient, ProfileType, PropertyCategory, PropertyStandard, PropertyStatus, ExclusivityType, PlacementStatus, BrandCategory, EmpreendimentoTipo, EmpreendimentoStatus, PlanoOS, AssetTipo, AssetStatus, FieldTipo } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seeding do banco de dados...");

  // ─── 1. NEIGHBORHOODS (Bairros) ──────────────────────────────────────────
  const jardins = await prisma.neighborhood.upsert({
    where: { id: "nh-001" },
    update: {},
    create: {
      id: "nh-001",
      name: "Jardins",
      city: "São Paulo",
      trafficScore: 92,
    },
  });

  const itaim = await prisma.neighborhood.upsert({
    where: { id: "nh-002" },
    update: {},
    create: {
      id: "nh-002",
      name: "Itaim Bibi",
      city: "São Paulo",
      trafficScore: 95,
    },
  });

  const moema = await prisma.neighborhood.upsert({
    where: { id: "nh-003" },
    update: {},
    create: {
      id: "nh-003",
      name: "Moema",
      city: "São Paulo",
      trafficScore: 84,
    },
  });

  console.log("✓ Bairros semeados");

  // ─── 2. TENANTS (Empresas/Organizações) ──────────────────────────────────
  const tenantTegra = await prisma.tenant.upsert({
    where: { slug: "tegra-incorporadora" },
    update: {},
    create: {
      id: "ten-001",
      name: "Tegra Incorporadora",
      slug: "tegra-incorporadora",
      tenantType: "CONSTRUTORA",
    },
  });

  const tenantBrookfield = await prisma.tenant.upsert({
    where: { slug: "brookfield-incorporacoes" },
    update: {},
    create: {
      id: "ten-002",
      name: "Brookfield Incorporações",
      slug: "brookfield-incorporacoes",
      tenantType: "CONSTRUTORA",
    },
  });

  const tenantLopes = await prisma.tenant.upsert({
    where: { slug: "lopes-imobiliaria" },
    update: {},
    create: {
      id: "ten-003",
      name: "Lopes Consultoria Imobiliária",
      slug: "lopes-imobiliaria",
      tenantType: "IMOBILIARIA",
    },
  });

  const tenantPortobello = await prisma.tenant.upsert({
    where: { slug: "portobello-tenant" },
    update: {},
    create: {
      id: "ten-004",
      name: "Portobello S.A.",
      slug: "portobello-tenant",
      tenantType: "MARCA",
    },
  });

  console.log("✓ Tenants semeados");

  // ─── 3. USERS (Usuários dos perfis) ──────────────────────────────────────
  const userTegra = await prisma.user.upsert({
    where: { clerkUserId: "user_tegra_clerk" },
    update: {},
    create: {
      id: "usr-001",
      email: "ricardo.souza@tegra.com.br",
      fullName: "Ricardo Souza — Tegra",
      profileType: ProfileType.CONSTRUTORA,
      clerkUserId: "user_tegra_clerk",
      tenantId: tenantTegra.id,
      phaseAccess: 5,
    },
  });

  const userCorretor = await prisma.user.upsert({
    where: { clerkUserId: "user_corretor_clerk" },
    update: {},
    create: {
      id: "usr-002",
      email: "joao.corretor@lopes.com.br",
      fullName: "João Corretor — Lopes",
      profileType: ProfileType.CORRETOR,
      clerkUserId: "user_corretor_clerk",
      tenantId: tenantLopes.id,
      phaseAccess: 1,
    },
  });

  const userArquiteto = await prisma.user.upsert({
    where: { clerkUserId: "user_arquiteto_clerk" },
    update: {},
    create: {
      id: "usr-003",
      email: "carolina.fernandes@arquiteta.com",
      fullName: "Carolina Fernandes",
      profileType: ProfileType.ARQUITETO,
      clerkUserId: "user_arquiteto_clerk",
      phaseAccess: 2,
    },
  });

  const userMarca = await prisma.user.upsert({
    where: { clerkUserId: "user_marca_clerk" },
    update: {},
    create: {
      id: "usr-004",
      email: "marketing@portobello.com.br",
      fullName: "Ana Lima — Portobello",
      profileType: ProfileType.MARCA,
      clerkUserId: "user_marca_clerk",
      tenantId: tenantPortobello.id,
      phaseAccess: 3,
    },
  });

  console.log("✓ Usuários semeados");

  // ─── 4. BRANDS & PRODUCTS (AdTech Layer) ──────────────────────────────────
  const brandPortobello = await prisma.brand.upsert({
    where: { id: "mrc-001" },
    update: {},
    create: {
      id: "mrc-001",
      name: "Portobello",
      category: BrandCategory.PISO,
      logoUrl: "/mock/logo-portobello.svg",
      tenantId: tenantPortobello.id,
      affiliateConfigJson: { comissaoPct: 5, urlRastreio: "https://portobello.com.br/afiliado/tagmob" },
    },
  });

  const brandDeca = await prisma.brand.upsert({
    where: { id: "mrc-002" },
    update: {},
    create: {
      id: "mrc-002",
      name: "Deca",
      category: BrandCategory.LOUCAS,
      logoUrl: "/mock/logo-deca.svg",
      affiliateConfigJson: { comissaoPct: 7, urlRastreio: "https://deca.com.br/loja/tagmob" },
    },
  });

  const brandPoliform = await prisma.brand.upsert({
    where: { id: "mrc-003" },
    update: {},
    create: {
      id: "mrc-003",
      name: "Poliform",
      category: BrandCategory.MOBILIARIO,
      logoUrl: "/mock/logo-poliform.svg",
      affiliateConfigJson: { comissaoPct: 10, urlRastreio: "https://poliform.it/tagmob" },
    },
  });

  const brandIntelbras = await prisma.brand.upsert({
    where: { id: "mrc-004" },
    update: {},
    create: {
      id: "mrc-004",
      name: "Intelbras",
      category: BrandCategory.AUTOMACAO,
      logoUrl: "/mock/logo-intelbras.svg",
      affiliateConfigJson: { comissaoPct: 4, urlRastreio: "https://intelbras.com.br/home" },
    },
  });

  console.log("✓ Marcas semeadas");

  // Specs dos Produtos das Marcas
  const specPiso = await prisma.productSpec.upsert({
    where: { id: "spc-001" },
    update: {},
    create: {
      id: "spc-001",
      brandId: brandPortobello.id,
      name: "Porcelanato Travertino Marfim 90x90",
      sku: "PTM-9090",
      priceMin: 120.0,
      priceMax: 150.0,
    },
  });

  const specTorneira = await prisma.productSpec.upsert({
    where: { id: "spc-002" },
    update: {},
    create: {
      id: "spc-002",
      brandId: brandDeca.id,
      name: "Torneira Monocomando Cube Cromada",
      sku: "TMC-CUBE",
      priceMin: 850.0,
      priceMax: 1100.0,
    },
  });

  console.log("✓ Especificações de produtos semeadas");

  // ─── 5. PROPERTIES & MEDIA ASSETS (PropTech Layer) ────────────────────────
  const propertyJardins = await prisma.property.upsert({
    where: { id: "imv-001" },
    update: {},
    create: {
      id: "imv-001",
      addressJson: { rua: "Alameda Lorena", numero: "1200", bairro: "Jardins", cidade: "São Paulo", estado: "SP" },
      neighborhoodId: jardins.id,
      tenantId: tenantLopes.id,
      standard: PropertyStandard.ALTO,
      category: PropertyCategory.RESIDENCIAL,
      ownerUserId: userCorretor.id,
      status: PropertyStatus.PUBLICADO,
      metadataJson: { quartos: 3, suites: 3, banheiros: 3, vagas: 2, area: 145, valor: 1850000 },
    },
  });

  const mediaAssetJardins = await prisma.mediaAsset.upsert({
    where: { id: "med-001" },
    update: {},
    create: {
      id: "med-001",
      propertyId: propertyJardins.id,
      url: "/mock/apto-jardins-1.jpg",
      type: "FOTO_PRINCIPAL",
    },
  });

  // Placements criados
  await prisma.productPlacement.upsert({
    where: { id: "plc-001" },
    update: {},
    create: {
      id: "plc-001",
      mediaAssetId: mediaAssetJardins.id,
      brandId: brandPortobello.id,
      productSpecId: specPiso.id,
      placementRegion: { x: 0.1, y: 0.8, width: 0.8, height: 0.2 },
      couponCode: "PORTOBELLO-TAGMOB-5",
      status: PlacementStatus.APROVADO,
      architectUserId: userArquiteto.id,
    },
  });

  console.log("✓ Imóveis e Product Placements semeados");

  // ─── 6. EMPREENDIMENTOS & SUBMÓDULOS (TAGMOB OS Central Incorporadoras) ───
  const empReservaJardins = await prisma.empreendimento.upsert({
    where: { id: "emp-001" },
    update: {},
    create: {
      id: "emp-001",
      nome: "Reserva Jardins",
      tipo: EmpreendimentoTipo.RESIDENCIAL,
      bairro: "Jardins",
      cidade: "São Paulo",
      faseAtual: 4,
      status: EmpreendimentoStatus.EM_ANDAMENTO,
      plano: PlanoOS.ENTERPRISE,
      assinaturaAtiva: true,
      corTema: "#FF0068",
      thumbnailUrl: "/mock/reserva-jardins-thumb.jpg",
      tenantId: tenantTegra.id,
    },
  });

  const empFariaLima = await prisma.empreendimento.upsert({
    where: { id: "emp-002" },
    update: {},
    create: {
      id: "emp-002",
      nome: "Faria Lima Corporate",
      tipo: EmpreendimentoTipo.COMERCIAL,
      bairro: "Faria Lima",
      cidade: "São Paulo",
      faseAtual: 3,
      status: EmpreendimentoStatus.EM_ANDAMENTO,
      plano: PlanoOS.PRO,
      assinaturaAtiva: true,
      corTema: "#8B5CF6",
      tenantId: tenantBrookfield.id,
    },
  });

  console.log("✓ Empreendimentos semeados");

  // Estratégia OS
  await prisma.estrategiaOS.upsert({
    where: { empreendimentoId: empReservaJardins.id },
    update: {},
    create: {
      id: "est-001",
      empreendimentoId: empReservaJardins.id,
      pesquisaMercado: "Análise de 47 empreendimentos concorrentes nos Jardins. Ticket médio de R$2,8M.",
      naming: "**Reserva Jardins** — Evoca exclusividade pela ideia de reserva/preservação.",
      conceitoCriativo: "**'O espaço que você reserva para o que importa.'** — Curadoria de vida.",
      manifesto: "Há lugares que não se encontram. Se reservam. Reserva Jardins é a declaração de como escolheu viver.",
      tomDeVoz: ["Sofisticado", "Seguro", "Poético", "Direto"],
      argumentosVenda: ["245m² de planta livre", "Apenas 4 aptos por andar", "Varanda de 32m²", "Automação integrada"],
      publicoAlvo: "Famílias de classe AB que valorizam privacidade, design e localização premium.",
      posicionamento: "O apartamento de menor quantidade e maior densidade de significado nos Jardins.",
      completo: true,
    },
  });

  // Design System OS
  await prisma.designSystemOS.upsert({
    where: { empreendimentoId: empReservaJardins.id },
    update: {},
    create: {
      id: "ds-001",
      empreendimentoId: empReservaJardins.id,
      keyVisualDescricao: "Fotografia arquitetônica minimalista com tom verde-musgo e off-white.",
      paletaCores: [
        { nome: "Verde Reserva", hex: "#3D5A3E" },
        { nome: "Off-White Puro", hex: "#F8F5EF" },
        { nome: "Cobre Escuro", hex: "#8B6A3E" },
      ],
      fontes: [
        { nome: "Cormorant Garamond", uso: "Títulos e assinaturas premium" },
        { nome: "DM Sans", uso: "Corpo de texto e tabelas" },
      ],
      logoPrincipal: "RJ_logo_principal.svg",
      gridDescricao: "Grid de 12 colunas com margens generosas.",
      completo: true,
    },
  });

  console.log("✓ Estratégia e Design System semeados");

  // Assets OS (Aprovações & Biblioteca)
  const assetPost = await prisma.assetOS.upsert({
    where: { id: "ast-001" },
    update: {},
    create: {
      id: "ast-001",
      empreendimentoId: empReservaJardins.id,
      nome: "Post Instagram — Lançamento",
      tipo: AssetTipo.INSTAGRAM_POST,
      descricao: "Post quadrado com headline principal e CTA de cadastro",
      status: AssetStatus.APROVADO,
      bloqueado: true,
      urlOriginal: "/assets/instagram_post_v2.png",
      urlEditada: "/assets/exports/instagram_post_v2_edit.png",
      dimensoes: "1080x1080px",
      aprovadoAgenciaEm: new Date("2024-05-20T14:30:00Z"),
      aprovadoAgenciaPor: "Ana Lima — TAGMOB",
      aprovadoClienteEm: new Date("2024-05-21T09:15:00Z"),
      aprovadoClientePor: "Ricardo Souza — Tegra",
    },
  });

  const assetPDF = await prisma.assetOS.upsert({
    where: { id: "ast-003" },
    update: {},
    create: {
      id: "ast-003",
      empreendimentoId: empReservaJardins.id,
      nome: "PDF Gráfica — Folheto A4",
      tipo: AssetTipo.PDF_GRAFICA,
      descricao: "Folheto A4 frente e verso para stand de vendas",
      status: AssetStatus.AGUARDANDO_CLIENTE,
      bloqueado: false,
      urlOriginal: "/assets/folheto_a4_v1.pdf",
      dimensoes: "210x297mm",
      aprovadoAgenciaEm: new Date("2024-05-22T11:00:00Z"),
      aprovadoAgenciaPor: "Ana Lima — TAGMOB",
    },
  });

  console.log("✓ Assets semeados");

  // Campos Editáveis
  await prisma.campoEditavel.createMany({
    data: [
      {
        assetId: assetPost.id,
        label: "Preço a partir de",
        tipo: FieldTipo.PRECO,
        valorAtual: "R$ 2.400.000",
        placeholder: "R$ 0.000.000",
        maxChars: 20,
      },
      {
        assetId: assetPost.id,
        label: "CTA Principal",
        tipo: FieldTipo.CTA,
        valorAtual: "AGENDE SUA VISITA",
        placeholder: "Digite o CTA",
        maxChars: 28,
      },
      {
        assetId: assetPDF.id,
        label: "Contato do corretor",
        tipo: FieldTipo.TEXTO,
        valorAtual: "(11) 99999-0000",
        placeholder: "(11) 00000-0000",
        maxChars: 20,
      },
    ],
  });

  // Comentários de Aprovação
  await prisma.comentarioAprovacao.create({
    data: {
      assetId: assetPDF.id,
      autorId: userMarca.id, // Ana Lima
      perfil: "AGENCIA",
      mensagem: "Folheto enviado para aprovação final. Atenção: verso com planta e tabela de áreas.",
      criadoEm: new Date("2024-05-22T11:05:00Z"),
    },
  });

  console.log("✓ Campos editáveis e comentários semeados");

  // ─── 7. GANCHOS DE ESCALA (Corretores, Arquitetos, Exclusividade) ──────────
  
  // Acesso para corretores
  await prisma.corretorAccess.create({
    data: {
      userId: userCorretor.id,
      empreendimentoId: empReservaJardins.id,
      chaveAcesso: "token_reserva_jardins_lopes_2024",
      permitePersonalizacao: true,
    },
  });

  // Projetos de Arquitetos e Especificações
  const projetoInt = await prisma.projetoArquiteto.create({
    data: {
      nome: "Decorado Tipo 245m² — Carolina Fernandes",
      descricao: "Projeto de interiores contemporâneo em tons de terra e off-white.",
      arquitetoId: userArquiteto.id,
      arquitetoCreci: "CRECI-12345-A",
      empreendimentoId: empReservaJardins.id,
      status: "EM_ANDAMENTO",
    },
  });

  // Produto industrializado da marca para matching com projeto do arquiteto
  const produtoPorcelanato = await prisma.produtoIndustria.create({
    data: {
      marcaId: brandPortobello.id,
      nome: "Coleção Marfim Travertino",
      categoria: "Pisos",
      subcategoria: "Porcelanato",
      descricao: "Porcelanato travertino 90x90cm com alta durabilidade",
      imagemUrl: "/mock/portobello-travertino.jpg",
      especificacoes: { Formato: "90x90cm", PEI: 5, Acabamento: "Polido" },
      status: "ATIVO",
      cpvBrl: 45, // 0,45 centavos por visualização
      cpaBrl: 28000, // 280 reais por indicação/venda
    },
  });

  await prisma.especificacaoProduto.create({
    data: {
      projetoId: projetoInt.id,
      produtoIndustriaId: produtoPorcelanato.id,
      ambiente: "Sala de Estar",
      quantidade: 150,
      observacao: "Colocar paginação diagonal de 45 graus",
      leadGerado: true,
    },
  });

  // Regra de exclusividade de marcas
  await prisma.exclusividadeRegra.create({
    data: {
      marcaId: brandPortobello.id,
      tipo: "BAIRRO",
      alvo: "Jardins",
      vigenciaInicio: new Date("2024-01-01T00:00:00Z"),
      vigenciaFim: new Date("2024-12-31T23:59:59Z"),
      ativa: true,
      produtoId: produtoPorcelanato.id,
    },
  });

  console.log("✓ Ganchos de escala (arquitetos, corretores, exclusividades) semeados");
  console.log("==========================================");
  console.log("Seeding concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro durante o seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
