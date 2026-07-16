import { PrismaClient, ProfileType, PropertyCategory, PropertyStandard, PropertyStatus, ExclusivityType, PlacementStatus, BrandCategory, EmpreendimentoTipo, EmpreendimentoStatus, PlanoOS, AssetTipo, AssetStatus, FieldTipo, LeadStatus, LeadSource } from "@prisma/client";

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

  // ─── 8. CRM — Usuários internos TAGMOB ───────────────────────────────────
  const userAna = await prisma.user.upsert({
    where: { clerkUserId: "user_ana_crm" },
    update: {},
    create: {
      id: "usr-crm-001",
      email: "ana.costa@tagmob.com.br",
      fullName: "Ana Costa",
      profileType: ProfileType.CONSTRUTORA,
      clerkUserId: "user_ana_crm",
      phaseAccess: 5,
    },
  });

  const userRafael = await prisma.user.upsert({
    where: { clerkUserId: "user_rafael_crm" },
    update: {},
    create: {
      id: "usr-crm-002",
      email: "rafael.mendes@tagmob.com.br",
      fullName: "Rafael Mendes",
      profileType: ProfileType.CONSTRUTORA,
      clerkUserId: "user_rafael_crm",
      phaseAccess: 5,
    },
  });

  await prisma.usuarioCrmPerfil.upsert({
    where: { userId: userAna.id },
    update: {},
    create: { userId: userAna.id, funcao: "ATENDIMENTO", ativo: true },
  });

  // Atualizar empreendimentos com campos CRM
  await prisma.empreendimento.update({
    where: { id: empReservaJardins.id },
    data: {
      construtoraNome: "Tegra Incorporadora",
      responsavelUserId: userAna.id,
      valorContrato: 285000,
      proximaAcao: "Revisar 6 assets pendentes",
      probabilidade: 85,
      faseEntradaEm: new Date("2024-06-01"),
    },
  });

  await prisma.empreendimento.update({
    where: { id: empFariaLima.id },
    data: {
      construtoraNome: "Brookfield Incorporações",
      responsavelUserId: userRafael.id,
      valorContrato: 198000,
      proximaAcao: "Gatekeeper — 9 peças pendentes",
      probabilidade: 70,
      faseEntradaEm: new Date("2024-06-20"),
    },
  });

  // Empreendimentos adicionais para pipeline completo
  const empMoema = await prisma.empreendimento.upsert({
    where: { id: "emp-003" },
    update: {},
    create: {
      id: "emp-003",
      nome: "Vista Verde Moema",
      tipo: EmpreendimentoTipo.RESIDENCIAL,
      bairro: "Moema",
      cidade: "São Paulo",
      faseAtual: 2,
      status: EmpreendimentoStatus.EM_ANDAMENTO,
      plano: PlanoOS.PRO,
      assinaturaAtiva: true,
      corTema: "#00E5FF",
      tenantId: tenantTegra.id,
      construtoraNome: "Even Construtora",
      responsavelUserId: userAna.id,
      valorContrato: 142000,
      proximaAcao: "Entregar Key Visual v2",
      probabilidade: 55,
    },
  });

  const empAlphaville = await prisma.empreendimento.upsert({
    where: { id: "emp-004" },
    update: {},
    create: {
      id: "emp-004",
      nome: "Alphaville Signature",
      tipo: EmpreendimentoTipo.RESIDENCIAL,
      bairro: "Alphaville",
      cidade: "Barueri",
      faseAtual: 5,
      status: EmpreendimentoStatus.PUBLICADO,
      plano: PlanoOS.ENTERPRISE,
      assinaturaAtiva: true,
      corTema: "#39FF14",
      tenantId: tenantTegra.id,
      construtoraNome: "Alphaville Urbanismo",
      responsavelUserId: userAna.id,
      valorContrato: 420000,
      proximaAcao: "Monitorar autonomia do cliente",
      probabilidade: 100,
    },
  });

  const empPinheiros = await prisma.empreendimento.upsert({
    where: { id: "emp-005" },
    update: {},
    create: {
      id: "emp-005",
      nome: "Pinheiros Lofts",
      tipo: EmpreendimentoTipo.MISTO,
      bairro: "Pinheiros",
      cidade: "São Paulo",
      faseAtual: 1,
      status: EmpreendimentoStatus.EM_ANDAMENTO,
      plano: PlanoOS.STARTER,
      assinaturaAtiva: true,
      corTema: "#FFB800",
      tenantId: tenantBrookfield.id,
      construtoraNome: "Cyrela Commercial Properties",
      responsavelUserId: userRafael.id,
      valorContrato: 68000,
      proximaAcao: "Workshop de naming com cliente",
      probabilidade: 30,
    },
  });

  console.log("✓ Empreendimentos CRM atualizados");

  // ─── 9. CRM — Empresas e Contatos ────────────────────────────────────────
  const companyEven = await prisma.crmCompany.upsert({
    where: { id: "cmp-001" },
    update: {},
    create: {
      id: "cmp-001",
      nome: "Even Construtora",
      segmento: "Incorporadora",
      cidade: "São Paulo",
      ownerUserId: userAna.id,
    },
  });

  const companyCyrela = await prisma.crmCompany.upsert({
    where: { id: "cmp-002" },
    update: {},
    create: {
      id: "cmp-002",
      nome: "Cyrela Commercial Properties",
      segmento: "Incorporadora",
      cidade: "São Paulo",
      ownerUserId: userRafael.id,
    },
  });

  await prisma.crmContact.createMany({
    data: [
      { id: "ctc-001", nome: "Ricardo Souza", email: "ricardo.souza@tegra.com.br", cargo: "Diretor Comercial", empresaNome: "Tegra Incorporadora", ownerUserId: userAna.id },
      { id: "ctc-002", nome: "Patricia Lima", email: "patricia.lima@even.com.br", cargo: "Gerente de Marketing", empresaNome: "Even Construtora", companyId: companyEven.id, ownerUserId: userAna.id },
      { id: "ctc-003", nome: "Marcos Alves", email: "marcos.alves@cyrela.com.br", cargo: "Head de Lançamentos", empresaNome: "Cyrela", companyId: companyCyrela.id, ownerUserId: userRafael.id },
    ],
    skipDuplicates: true,
  });

  console.log("✓ Empresas e contatos CRM semeados");

  // ─── 10. CRM — Leads ───────────────────────────────────────────────────────
  await prisma.leadsContato.createMany({
    data: [
      {
        id: "lead-001",
        nome: "Fernanda Oliveira",
        email: "fernanda@construtoraabc.com.br",
        telefone: "(11) 98765-4321",
        empresa: "Construtora ABC",
        mensagem: "Interesse em TAGMOB OS para lançamento em Campinas. 3 torres, 180 unidades.",
        orcamentoEstimado: 220000,
        status: "NOVO" as LeadStatus,
        source: "LANDING" as LeadSource,
        prioridade: 1,
        score: 78,
        ownerUserId: userAna.id,
      },
      {
        id: "lead-002",
        nome: "Carlos Mendonça",
        email: "carlos@incorporadora.xyz",
        telefone: "(21) 99876-5432",
        empresa: "Incorporadora XYZ",
        mensagem: "Precisamos de estratégia + criação para empreendimento comercial no Rio.",
        orcamentoEstimado: 350000,
        status: "EM_ATENDIMENTO" as LeadStatus,
        source: "INDICACAO" as LeadSource,
        prioridade: 1,
        score: 85,
        ownerUserId: userRafael.id,
      },
      {
        id: "lead-003",
        nome: "Juliana Prado",
        email: "juliana@startupimob.com",
        empresa: "Startup Imob",
        mensagem: "Queremos entender o modelo STARTER para um loft em Pinheiros.",
        orcamentoEstimado: 68000,
        status: "QUALIFICADO" as LeadStatus,
        source: "EVENTO" as LeadSource,
        prioridade: 2,
        score: 62,
        ownerUserId: userRafael.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✓ Leads CRM semeados");

  // ─── 11. CRM — Atividades ──────────────────────────────────────────────────
  await prisma.crmActivity.createMany({
    data: [
      {
        id: "act-001",
        tipo: "REUNIAO",
        titulo: "Kick-off Reserva Jardins",
        descricao: "Alinhamento de cronograma fase 4 — organização de assets.",
        status: "CONCLUIDA",
        completedAt: new Date("2024-06-10"),
        empreendimentoId: empReservaJardins.id,
        ownerUserId: userAna.id,
      },
      {
        id: "act-002",
        tipo: "TAREFA",
        titulo: "Revisar gatekeeper Faria Lima",
        descricao: "9 peças aguardando aprovação do cliente Brookfield.",
        status: "PENDENTE",
        dueAt: new Date(Date.now() + 2 * 86_400_000),
        empreendimentoId: empFariaLima.id,
        ownerUserId: userRafael.id,
      },
      {
        id: "act-003",
        tipo: "LIGACAO",
        titulo: "Follow-up lead Construtora ABC",
        descricao: "Retornar proposta comercial personalizada.",
        status: "PENDENTE",
        dueAt: new Date(Date.now() + 1 * 86_400_000),
        leadId: "lead-001",
        ownerUserId: userAna.id,
      },
      {
        id: "act-004",
        tipo: "FOLLOW_UP",
        titulo: "Enviar case Alphaville Signature",
        descricao: "Material de referência para prospect Cyrela.",
        status: "PENDENTE",
        dueAt: new Date(Date.now() + 3 * 86_400_000),
        empreendimentoId: empAlphaville.id,
        ownerUserId: userRafael.id,
      },
      {
        id: "act-005",
        tipo: "NOTA",
        titulo: "Workshop naming Pinheiros Lofts",
        descricao: "Cliente aprovou data para sessão de naming e conceito.",
        status: "PENDENTE",
        dueAt: new Date(Date.now() + 5 * 86_400_000),
        empreendimentoId: empPinheiros.id,
        ownerUserId: userRafael.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✓ Atividades CRM semeadas");

  // ─── 9. ENTREGAVEIS (DeliverableItems) ──────────────────────────────────
  console.log("Semeando itens entregáveis...");
  const entregaveisData = [
    // 1. Estratégia, Branding e Conceito
    { id: "ent-101", nome: "Campanha (Conceito, Estratégia e Identidade Visual)", etapa: 1, macroEtapaLabel: "Estratégia e Branding", precoBase: 6000, isObrigatorio: true, descricao: "Estudo de posicionamento, naming e marca mestre" },
    { id: "ent-102", nome: "Filme Conceito", etapa: 1, macroEtapaLabel: "Estratégia e Branding", precoBase: 4500, isObrigatorio: true, descricao: "Vídeo manifesto de posicionamento conceitual de 30s" },
    { id: "ent-103", nome: "KV (Key Visual)", etapa: 1, macroEtapaLabel: "Estratégia e Branding", precoBase: 3000, isObrigatorio: true, descricao: "Identidade visual diretora de desdobramento" },
    { id: "ent-104", nome: "Manual da Marca", etapa: 1, macroEtapaLabel: "Estratégia e Branding", precoBase: 1500, isObrigatorio: true, descricao: "Guia de uso de fontes, paletas e grids do OS" },

    // 2. Materiais Comerciais
    { id: "ent-201", nome: "Book do Cliente – Folhetão (Digital e Impresso)", etapa: 2, macroEtapaLabel: "Materiais Comerciais", precoBase: 3500, isObrigatorio: false, descricao: "Brochura física e digital AAA em curvas" },
    { id: "ent-202", nome: "Book do Cliente – Mini (Digital e Impresso)", etapa: 2, macroEtapaLabel: "Materiais Comerciais", precoBase: 2000, isObrigatorio: false, descricao: "Versão compacta e rápida para abordagem preliminar" },
    { id: "ent-203", nome: "Book de Mesa do Corretor (Digital e Impresso)", etapa: 2, macroEtapaLabel: "Materiais Comerciais", precoBase: 2800, isObrigatorio: false, descricao: "Catálogo técnico com plantas de vendas" },
    { id: "ent-204", nome: "Caderno de Plantas", etapa: 2, macroEtapaLabel: "Materiais Comerciais", precoBase: 1500, isObrigatorio: false, descricao: "Compilado técnico de todas as tipologias" },
    { id: "ent-205", nome: "Folder Prospecto", etapa: 2, macroEtapaLabel: "Materiais Comerciais", precoBase: 1000, isObrigatorio: false, descricao: "Panfleto comercial de distribuição de rua e PDV" },
    { id: "ent-206", nome: "Folheto Intermediário", etapa: 2, macroEtapaLabel: "Materiais Comerciais", precoBase: 1200, isObrigatorio: false, descricao: "Material para meio de funil com mais detalhes técnicos" },
    { id: "ent-207", nome: "Folheto de Combate", etapa: 2, macroEtapaLabel: "Materiais Comerciais", precoBase: 800, isObrigatorio: false, descricao: "Material direto e agressivo focado em preço/condições" },
    { id: "ent-208", nome: "Implantação", etapa: 2, macroEtapaLabel: "Materiais Comerciais", precoBase: 1100, isObrigatorio: false, descricao: "Desenho ilustrado da inserção do prédio no terreno" },
    { id: "ent-209", nome: "Ficha Técnica", etapa: 2, macroEtapaLabel: "Materiais Comerciais", precoBase: 700, isObrigatorio: false, descricao: "Memorial descritivo resumido de acabamentos e metragens" },

    // 3. Comunicação Digital
    { id: "ent-301", nome: "E-mail Marketing", etapa: 3, macroEtapaLabel: "Comunicação Digital", precoBase: 900, isObrigatorio: false, descricao: "Código HTML e criativos prontos p/ disparo" },
    { id: "ent-302", nome: "WhatsApp Card", etapa: 3, macroEtapaLabel: "Comunicação Digital", precoBase: 600, isObrigatorio: false, descricao: "Cards visuais otimizados para compartilhamento rápido" },
    { id: "ent-303", nome: "Convite Digital (Corretores e Clientes)", etapa: 3, macroEtapaLabel: "Comunicação Digital", precoBase: 500, isObrigatorio: false, descricao: "Convite com links para meeting de corretores e clientes" },

    // 4. Eventos de Lançamento
    { id: "ent-401", nome: "Convite Impresso (Corretores e Clientes)", etapa: 4, macroEtapaLabel: "Eventos de Lançamento", precoBase: 700, isObrigatorio: false, descricao: "Design de convite impresso com acabamento premium" },
    { id: "ent-402", nome: "Convite para Meeting", etapa: 4, macroEtapaLabel: "Eventos de Lançamento", precoBase: 500, isObrigatorio: false, descricao: "Convite digital/físico para o meeting de corretores" },
    { id: "ent-403", nome: "Template de Apresentação para Meeting", etapa: 4, macroEtapaLabel: "Eventos de Lançamento", precoBase: 1800, isObrigatorio: false, descricao: "Apresentação comercial dinâmica editável em PPTX" },
    { id: "ent-404", nome: "Backdrop para Eventos", etapa: 4, macroEtapaLabel: "Eventos de Lançamento", precoBase: 1200, isObrigatorio: false, descricao: "Painel fotográfico para recepção e fotos do evento" },
    { id: "ent-405", nome: "Banner Impresso", etapa: 4, macroEtapaLabel: "Eventos de Lançamento", precoBase: 800, isObrigatorio: false, descricao: "Banners sinalizadores de recepção de convenção" },

    // 5. Materiais de Campo
    { id: "ent-501", nome: "Sinalização para Promotores", etapa: 5, macroEtapaLabel: "Materiais de Campo", precoBase: 1100, isObrigatorio: false, descricao: "Coletes, credenciais e bolsas personalizadas" },
    { id: "ent-502", nome: "Folhetos Promocionais", etapa: 5, macroEtapaLabel: "Materiais de Campo", precoBase: 800, isObrigatorio: false, descricao: "Folhetos simplificados de distribuição em massa" },
    { id: "ent-503", nome: "Balcão de Degustação Adesivado", etapa: 5, macroEtapaLabel: "Materiais de Campo", precoBase: 1200, isObrigatorio: false, descricao: "Programação visual para ações em praças e PDV externo" },
    { id: "ent-504", nome: "Garrafa de Água Personalizada", etapa: 5, macroEtapaLabel: "Materiais de Campo", precoBase: 900, isObrigatorio: false, descricao: "Rótulo e embalagem customizados para distribuição" },
    { id: "ent-505", nome: "Lixo Car", etapa: 5, macroEtapaLabel: "Materiais de Campo", precoBase: 700, isObrigatorio: false, descricao: "Design de lixeiras de câmbio para automóveis" },
    { id: "ent-506", nome: "Brindes Especiais", etapa: 5, macroEtapaLabel: "Materiais de Campo", precoBase: 1400, isObrigatorio: false, descricao: "Design de sacolas, chaveiros e brindes promocionais" },

    // 6. Comunicação Visual
    { id: "ent-601", nome: "Comunicação Visual do Estande", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 5500, isObrigatorio: false, descricao: "Sinalização interna, tótens de maquete e ambientação" },
    { id: "ent-602", nome: "Placas de Comunicação Visual", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 2500, isObrigatorio: false, descricao: "Placas internas e indicativas do estande de vendas" },
    { id: "ent-603", nome: "Placa de Produto", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 1800, isObrigatorio: false, descricao: "Placa frontal indicadora do lançamento e metragens" },
    { id: "ent-604", nome: "Placa Seta", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 1200, isObrigatorio: false, descricao: "Setas direcionais externas de trânsito" },
    { id: "ent-605", nome: "Tapume", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 4500, isObrigatorio: false, descricao: "Projeto gráfico de fechamento de lote com apelo visual" },
    { id: "ent-606", nome: "Cavalete", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 800, isObrigatorio: false, descricao: "Cavaletes promocionais móveis para calçada" },
    { id: "ent-607", nome: "Adesivo para Carros", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 1000, isObrigatorio: false, descricao: "Adesivos microperfurados de vidro traseiro" },
    { id: "ent-608", nome: "Faixas", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 1200, isObrigatorio: false, descricao: "Faixas de poste e fachadas promocionais" },
    { id: "ent-609", nome: "Wind Banners", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 1500, isObrigatorio: false, descricao: "Sinalização aérea promocional externa para atração" },
    { id: "ent-610", nome: "Totens Internos e Externos", etapa: 6, macroEtapaLabel: "Comunicação Visual", precoBase: 3500, isObrigatorio: false, descricao: "Totens sinalizadores com iluminação e mapas" },

    // 7. Mídia Impressa
    { id: "ent-701", nome: "Anúncio para Jornal", etapa: 7, macroEtapaLabel: "Mídia Impressa", precoBase: 1600, isObrigatorio: false, descricao: "Páginas inteiras e meia página com especificações" },
    { id: "ent-702", nome: "Anúncio para Revista", etapa: 7, macroEtapaLabel: "Mídia Impressa", precoBase: 1400, isObrigatorio: false, descricao: "Layout premium de alta fidelidade para revistas do setor" },

    // Plataformas Digitais
    { id: "ent-801", nome: "Site ou Landing Page do Empreendimento", etapa: 8, macroEtapaLabel: "Plataformas Digitais", precoBase: 4500, isObrigatorio: false, descricao: "Site completo com galeria, mapa e integração de leads" },
    { id: "ent-802", nome: "Catálogo Digital", etapa: 8, macroEtapaLabel: "Plataformas Digitais", precoBase: 2500, isObrigatorio: false, descricao: "Visualizador PDF/Web com links clicáveis e navegação" },
    { id: "ent-803", nome: "Materiais para Portais Imobiliários", etapa: 8, macroEtapaLabel: "Plataformas Digitais", precoBase: 1500, isObrigatorio: false, descricao: "Banners e fotos redimensionadas nos padrões Zap/VivaReal" },

    // Conteúdo Audiovisual
    { id: "ent-901", nome: "Vídeo Institucional do Empreendimento", etapa: 9, macroEtapaLabel: "Conteúdo Audiovisual", precoBase: 5000, isObrigatorio: false, descricao: "Vídeo com interviews, detalhes de obra e depoimentos" },
    { id: "ent-902", nome: "Vídeo da Região", etapa: 9, macroEtapaLabel: "Conteúdo Audiovisual", precoBase: 3000, isObrigatorio: false, descricao: "Gravações aéreas e highlights da vizinhança" },
    { id: "ent-903", nome: "Vídeo do Decorado", etapa: 9, macroEtapaLabel: "Conteúdo Audiovisual", precoBase: 3500, isObrigatorio: false, descricao: "Apresentação guiada do apartamento decorado" },
    { id: "ent-904", nome: "Tour Virtual 360°", etapa: 9, macroEtapaLabel: "Conteúdo Audiovisual", precoBase: 4000, isObrigatorio: false, descricao: "Ambiente imersivo para navegação online pelo cliente" },

    // Imagens
    { id: "ent-1001", nome: "Maquete Eletrônica (Imagens 3D)", etapa: 10, macroEtapaLabel: "Imagens 3D", precoBase: 6500, isObrigatorio: false, descricao: "Perspectivas externas, áreas comuns e fachadas realistas" },
    { id: "ent-1002", nome: "Perspectivas Ilustradas", etapa: 10, macroEtapaLabel: "Imagens 3D", precoBase: 3500, isObrigatorio: false, descricao: "Tratamento artístico e conceitual de perspectivas do prédio" },
    { id: "ent-1003", nome: "Plantas Humanizadas", etapa: 10, macroEtapaLabel: "Imagens 3D", precoBase: 2200, isObrigatorio: false, descricao: "Esquemas coloridos e decorados de todas as tipologias" },
    { id: "ent-1004", nome: "Fotos Renderizadas", etapa: 10, macroEtapaLabel: "Imagens 3D", precoBase: 2800, isObrigatorio: false, descricao: "Renders estáticos adicionais com detalhes de decoração" },

    // Kits Comerciais
    { id: "ent-1101", nome: "Kit do Corretor", etapa: 11, macroEtapaLabel: "Kits Comerciais", precoBase: 1200, isObrigatorio: false, descricao: "Crachá, bloco de notas, caneta e pasta de apresentação" },
    { id: "ent-1102", nome: "Kit do Cliente", etapa: 11, macroEtapaLabel: "Kits Comerciais", precoBase: 1500, isObrigatorio: false, descricao: "Sacola institucional, memorial descritivo impresso e folder" },
    { id: "ent-1103", nome: "Credenciais e Crachás", etapa: 11, macroEtapaLabel: "Kits Comerciais", precoBase: 600, isObrigatorio: false, descricao: "Acreditação oficial para o time de plantão e promotores" },
    { id: "ent-1104", nome: "Assinatura de E-mail", etapa: 11, macroEtapaLabel: "Kits Comerciais", precoBase: 400, isObrigatorio: false, descricao: "Arte e assinatura em HTML com a marca do lançamento" },

    // Marketing Digital
    { id: "ent-1201", nome: "Posts para Redes Sociais", etapa: 12, macroEtapaLabel: "Marketing Digital", precoBase: 1500, isObrigatorio: false, descricao: "Templates de feed de postagens institucionais" },
    { id: "ent-1202", nome: "Stories", etapa: 12, macroEtapaLabel: "Marketing Digital", precoBase: 1200, isObrigatorio: false, descricao: "Templates de engajamento diário para Instagram" },
    { id: "ent-1203", nome: "Reels", etapa: 12, macroEtapaLabel: "Marketing Digital", precoBase: 2000, isObrigatorio: false, descricao: "Criativos em vídeo vertical editáveis pelo time de marketing" },
    { id: "ent-1204", nome: "Banners Digitais (Google Display e Portais)", etapa: 12, macroEtapaLabel: "Marketing Digital", precoBase: 1800, isObrigatorio: false, descricao: "Desdobramentos de anúncios em todas as resoluções da web" },
    { id: "ent-1205", nome: "Peças para Meta Ads", etapa: 12, macroEtapaLabel: "Marketing Digital", precoBase: 2500, isObrigatorio: false, descricao: "Criativos em vídeo e carrossel focados em conversão de leads" },
    { id: "ent-1206", nome: "Peças para Google Ads", etapa: 12, macroEtapaLabel: "Marketing Digital", precoBase: 1500, isObrigatorio: false, descricao: "Anúncios gráficos para rede de display do Google" },
  ];

  for (const item of entregaveisData) {
    await prisma.entregavelItem.upsert({
      where: { id: item.id },
      update: {
        nome: item.nome,
        etapa: item.etapa,
        macroEtapaLabel: item.macroEtapaLabel,
        precoBase: item.precoBase,
        isObrigatorio: item.isObrigatorio,
        descricao: item.descricao,
      },
      create: {
        id: item.id,
        nome: item.nome,
        etapa: item.etapa,
        macroEtapaLabel: item.macroEtapaLabel,
        precoBase: item.precoBase,
        isObrigatorio: item.isObrigatorio,
        descricao: item.descricao,
      },
    });
  }
  console.log("✓ Itens entregáveis semeados");

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
