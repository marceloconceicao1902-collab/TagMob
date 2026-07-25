/**
 * Conteúdo institucional da landing page, transcrito do deck "LP TAG MOB".
 * Centralizado aqui para que o copy possa ser revisado sem tocar em layout.
 */

export const HERO_WORDS = [
  { text: "PENSAR.", tone: "white" },
  { text: "CRIAR.", tone: "pink" },
  { text: "CONSTRUIR.", tone: "white" },
  { text: "CONECTAR.", tone: "green" },
] as const;

export const HERO_SUBTITLE =
  "A primeira plataforma criativa desenvolvida para o mercado imobiliário. Estratégia, branding, criação, conteúdo, mídia e tecnologia conectados em um único ecossistema.";

export const MANIFESTO = [
  "O mercado imobiliário mudou. A tecnologia evoluiu. As pessoas mudaram. A forma de comunicar também precisava evoluir.",
  "Foi por isso que nasceu a TAGMOB.",
  "Não somos apenas uma agência, nem apenas uma plataforma. Somos uma nova forma de criar, conectar e transformar a comunicação do mercado imobiliário, reunindo estratégia, criatividade, tecnologia e especialistas em um único ecossistema.",
  "Aqui, cada campanha nasce de uma estratégia sólida. Cada peça faz parte de um sistema. Cada entrega contribui para um resultado maior. Como no Tetris, acreditamos que grandes resultados acontecem quando cada peça encontra o lugar certo. Estratégia, branding, criação, conteúdo, mídia e tecnologia trabalham conectados para construir marcas fortes e campanhas que geram valor.",
  "A tecnologia acelera processos. A inteligência artificial potencializa a produtividade. Mas as grandes ideias continuam nascendo das pessoas. Por isso reunimos profissionais especializados no mercado imobiliário para desenvolver soluções criativas, inteligentes e alinhadas aos objetivos de cada empreendimento.",
  "A TAGMOB não nasceu para digitalizar uma agência. Nasceu para reinventar a forma como incorporadoras, construtoras e equipes criativas trabalham juntas, com mais transparência, colaboração, eficiência e resultado.",
  "Porque o futuro da comunicação imobiliária já começou.",
  "E ele se chama TAGMOB.",
];

export const O_QUE_E = [
  "A TAGMOB é a primeira plataforma criativa desenvolvida para o mercado imobiliário.",
  "Mais do que uma agência, somos um novo modelo de operação que conecta estratégia, criatividade, tecnologia IA e especialistas em um único ambiente digital. Todo o processo acontece de forma organizada, transparente e colaborativa, oferecendo mais agilidade, controle e qualidade para cada campanha.",
  "Mais do que contratar uma agência, você passa a fazer parte de uma operação criativa completa.",
  "Conheça como funciona a nova forma de criar campanhas imobiliárias.",
];

export const NOME_INTRO =
  "A TAGMOB nasce da união de três conceitos que definem nossa essência.";

export const NOME_PARTES = [
  {
    sigla: "T",
    conceito: "Tetris",
    accent: "pink" as const,
    texto:
      "Acreditamos que estratégia, branding, criação, mídia e conteúdo são peças que precisam se encaixar com inteligência para gerar resultados.",
  },
  {
    sigla: "AG",
    conceito: "Agência",
    accent: "cyan" as const,
    texto:
      "Somos especialistas em transformar empreendimentos em marcas fortes, unindo planejamento, criatividade e execução.",
  },
  {
    sigla: "MOB",
    conceito: "Mobilidade",
    accent: "green" as const,
    texto:
      "Atuamos com flexibilidade para montar equipes, processos e soluções sob medida para cada desafio.",
  },
];

export const NOME_FECHAMENTO =
  "Na TAGMOB, cada peça tem uma função, cada estratégia tem um propósito e cada projeto é construído para gerar valor e resultados. Porque grandes marcas nascem quando tudo se encaixa.";

export const COMO_FUNCIONA = [
  "Todo o relacionamento acontece pela plataforma. Briefings, pedidos, aprovações, alterações, arquivos e acompanhamento dos projetos ficam centralizados em um único ambiente.",
  "Você acompanha cada etapa da campanha em tempo real, sem depender de mensagens, e-mails ou ligações para saber o andamento dos trabalhos.",
];

export const COMO_FUNCIONA_PILARES = [
  { titulo: "Briefings e pedidos", texto: "Toda demanda entra pela plataforma, com histórico e contexto preservados." },
  { titulo: "Aprovações e alterações", texto: "Cada rodada de ajuste fica registrada, sem ruído entre equipes." },
  { titulo: "Arquivos organizados", texto: "Materiais aprovados sempre disponíveis para consulta e download." },
  { titulo: "Acompanhamento em tempo real", texto: "Você vê o andamento de cada etapa sem precisar cobrar status." },
];

export const PROCESSO_CRIACAO = [
  "Cada campanha segue um fluxo estruturado.",
  "Os materiais são desenvolvidos por etapas, garantindo que cada entrega sirva de base para a próxima. Isso mantém a consistência da comunicação e evita retrabalho.",
];

export const PRIORIDADES = [
  "Na TAGMOB, cada campanha segue uma sequência lógica de desenvolvimento.",
  "Primeiro é construída a estratégia, depois a identidade visual e, somente então, os materiais de comunicação.",
  "Assim garantimos que todas as peças mantenham unidade e fortaleçam a marca do empreendimento.",
];

export const FLUXO_PADRAO = [
  { codigo: "—", titulo: "Apresentação da Campanha", accent: "pink" as const },
  { codigo: "Job 001", titulo: "Key Visual", accent: "violet" as const },
  { codigo: "Job 002", titulo: "Brandbook", accent: "amber" as const },
  { codigo: "Job 003", titulo: "Assets da Campanha", accent: "cyan" as const },
  { codigo: "Job 004", titulo: "Filme Conceito", accent: "green" as const },
  { codigo: "Job 005", titulo: "Placa de Terreno", accent: "pink" as const },
];

export const PROCESSO_CRIATIVO = [
  {
    titulo: "INSIGHT.",
    linhas: ["Entender o problema de verdade.", "Antes da ideia, vem o olhar certo."],
    accent: "pink" as const,
  },
  {
    titulo: "ESTRATÉGIA.",
    linhas: ["Onde a marca quer chegar.", "Criatividade sem direção é só barulho."],
    accent: "cyan" as const,
  },
  {
    titulo: "CONCEITO.",
    linhas: ["A grande ideia que organiza tudo."],
    accent: "violet" as const,
  },
  {
    titulo: "ESTÉTICA.",
    linhas: ["Forma, linguagem, design, emoção."],
    accent: "amber" as const,
  },
  {
    titulo: "IMPACTO.",
    linhas: ["Quando a ideia encontra o público e faz sentido de verdade."],
    accent: "green" as const,
  },
];

export const PROCESSO_CRIATIVO_FECHAMENTO = [
  "Quando essas peças se encaixam, a comunicação deixa de ser apenas bonita.",
  "Ela funciona.",
];

export type FaqItem = {
  pergunta: string;
  resposta: string[];
  destaque?: "Sim." | "Não.";
};

export const FAQ: FaqItem[] = [
  {
    pergunta: "A campanha é criada por Inteligência Artificial?",
    destaque: "Não.",
    resposta: [
      "Toda estratégia, conceito, direção criativa e identidade visual são desenvolvidos por profissionais especializados no mercado imobiliário.",
      "A criatividade continua sendo humana.",
    ],
  },
  {
    pergunta: "Onde entra a Inteligência Artificial?",
    resposta: [
      "A Inteligência Artificial atua como aceleradora do processo.",
      "Ela auxilia na adaptação de peças para diferentes formatos, criação de versões, automação de tarefas e otimização da produção, sempre supervisionada pela equipe criativa.",
    ],
  },
  {
    pergunta: "A equipe possui experiência no mercado imobiliário?",
    destaque: "Sim.",
    resposta: [
      "A TAGMOB reúne profissionais com ampla experiência em incorporadoras e nas principais agências especializadas em marketing imobiliário de São Paulo, combinando conhecimento estratégico e execução de alto nível.",
    ],
  },
  {
    pergunta: "Os arquivos ficam disponíveis na plataforma?",
    destaque: "Sim.",
    resposta: [
      "Após cada aprovação, todos os materiais ficam organizados na plataforma para consulta e download.",
      "Você encontra facilmente arquivos editáveis, logotipos, fontes, paleta de cores, perspectivas, imagens e demais ativos da campanha.",
    ],
  },
  {
    pergunta: "Preciso instalar algum programa?",
    destaque: "Não.",
    resposta: [
      "A plataforma funciona 100% na nuvem e pode ser acessada por qualquer navegador, em computadores, tablets ou celulares.",
      "Basta estar conectado à internet.",
    ],
  },
  {
    pergunta: "Quantos profissionais participam de uma campanha?",
    resposta: [
      "Cada campanha recebe um Squad exclusivo.",
      "O tamanho da equipe varia conforme a complexidade do projeto, reunindo estrategistas, diretores de criação, designers, redatores, especialistas em mídia, atendimento e produção.",
    ],
  },
  {
    pergunta: "Posso escolher minha equipe?",
    destaque: "Sim.",
    resposta: [
      "Cada profissional possui um perfil com experiência, especialidades e principais projetos desenvolvidos, permitindo que você participe da composição do Squad.",
    ],
  },
  {
    pergunta: "Posso trocar integrantes da equipe?",
    destaque: "Sim.",
    resposta: [
      "A plataforma permite substituir profissionais durante o projeto, além de registrar avaliações e feedbacks que contribuem para a melhoria contínua da operação.",
    ],
  },
  {
    pergunta: "Como funciona a cobrança?",
    resposta: [
      "A TAGMOB trabalha com valores fixos.",
      "Nossa remuneração não está vinculada ao VGV do empreendimento, oferecendo previsibilidade financeira e eliminando negociações mensais e cobranças variáveis.",
    ],
  },
  {
    pergunta: "Posso parcelar minha campanha?",
    destaque: "Sim.",
    resposta: [
      "Disponibilizamos diferentes formas de pagamento para que cada cliente escolha a opção mais adequada ao seu planejamento financeiro.",
    ],
  },
  {
    pergunta: "Os contratos são firmados pela plataforma?",
    destaque: "Sim.",
    resposta: [
      "Todo o processo contratual acontece digitalmente, desde a elaboração até a assinatura eletrônica, proporcionando segurança, agilidade e rastreabilidade.",
    ],
  },
  {
    pergunta: "Posso contratar apenas algumas peças?",
    destaque: "Sim.",
    resposta: [
      "Você escolhe exatamente os materiais ou serviços que deseja desenvolver, sem necessidade de contratar uma campanha completa.",
      "A plataforma funciona como um menu de soluções criativas.",
    ],
  },
  {
    pergunta: "Posso trabalhar por Jobs?",
    destaque: "Sim.",
    resposta: [
      "Você pode contratar uma campanha completa, um pacote mensal (Post Fee) ou apenas os Jobs necessários para atender uma demanda específica.",
    ],
  },
  {
    pergunta: "Preciso baixar a plataforma?",
    destaque: "Não.",
    resposta: [
      "A TAGMOB é totalmente online.",
      "Basta acessar pelo navegador utilizando seu login.",
    ],
  },
  {
    pergunta: "Posso solicitar reuniões?",
    destaque: "Sim.",
    resposta: [
      "Nossa equipe está disponível para reuniões online ou presenciais sempre que o projeto exigir alinhamentos estratégicos ou apresentações.",
    ],
  },
];

export const CONTATO = {
  whatsapp: {
    titulo: "WHATSAPP",
    texto: ["Quer um contato mais próximo conosco?", "Converse a nossa equipe."],
    href: "https://wa.me/5511968356769",
    label: "+55 (11) 96835.6769",
  },
  suporte: {
    titulo: "SUPORTE",
    texto: ["Entre em contato no chat e fale com um de nossos especialistas."],
    href: "/sign-in",
    label: "Acessar a plataforma",
  },
  site: "TAGMOB.COM.BR",
  siteHref: "https://www.tagmob.com.br",
};

export const NAV_LINKS = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#a-tagmob", label: "A TAGMOB" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#processo", label: "Processo" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];
