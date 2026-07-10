export type ProfileType = "CORRETOR" | "IMOBILIARIA" | "ARQUITETO" | "MARCA" | "CONSTRUTORA";

// ─── TAGMOB OS ────────────────────────────────────────────────────────────────

export type OSFase = 1 | 2 | 3 | 4 | 5;

export type OSFaseInfo = {
  num: OSFase;
  label: string;
  descricao: string;
  cor: string;
};

export const OS_FASES: OSFaseInfo[] = [
  { num: 1, label: "Estratégia",            descricao: "Pesquisa, Naming, Conceito e Manifesto",                    cor: "#FF0068" },
  { num: 2, label: "Criação",               descricao: "Key Visual, vídeos, fontes, paletas e templates",            cor: "#8B5CF6" },
  { num: 3, label: "Aprovação",             descricao: "Gatekeeper: Agência → Cliente",                              cor: "#FFB800" },
  { num: 4, label: "Organização",           descricao: "Engine de indexação e interconexão de peças",                cor: "#00E5FF" },
  { num: 5, label: "Autonomia do Cliente",  descricao: "Editor restrito para operação sem dependência da agência",   cor: "#39FF14" },
];

export type EmpreendimentoStatus = "EM_ANDAMENTO" | "APROVADO" | "PUBLICADO" | "PAUSADO";
export type EmpreendimentoTipo   = "RESIDENCIAL" | "COMERCIAL" | "MISTO";
export type PlanoOS               = "STARTER" | "PRO" | "ENTERPRISE";

export interface Empreendimento {
  id: string;
  nome: string;
  tipo: EmpreendimentoTipo;
  construtora: string;
  bairro: string;
  cidade: string;
  fase_atual: OSFase;
  status: EmpreendimentoStatus;
  plano: PlanoOS;
  assinatura_ativa: boolean;
  cor_tema: string;
  thumbnail_url: string;
  criado_em: string;
  estrategia_completa: boolean;
  criacao_completa: boolean;
  total_assets: number;
  assets_aprovados: number;
  assets_pendentes: number;
}

export type AssetTipo   = "INSTAGRAM_POST" | "STORY" | "BANNER_DIGITAL" | "PDF_GRAFICA" | "VIDEO_REELS" | "ENCARTE";
export type AssetStatus = "RASCUNHO" | "AGUARDANDO_AGENCIA" | "AGUARDANDO_CLIENTE" | "APROVADO" | "REPROVADO";

export interface CampoEditavel {
  id: string;
  label: string;
  tipo: "TEXTO" | "PRECO" | "IMAGEM" | "CTA";
  valor_atual: string;
  placeholder: string;
  max_chars?: number;
}

export interface ComentarioAprovacao {
  id: string;
  autor: string;
  perfil: "AGENCIA" | "CLIENTE";
  mensagem: string;
  criado_em: string;
}

export interface AssetOS {
  id: string;
  empreendimento_id: string;
  nome: string;
  tipo: AssetTipo;
  descricao: string;
  status: AssetStatus;
  bloqueado: boolean;
  aprovado_agencia_em: string | null;
  aprovado_agencia_por: string | null;
  aprovado_cliente_em: string | null;
  aprovado_cliente_por: string | null;
  comentarios: ComentarioAprovacao[];
  campos_editaveis: CampoEditavel[];
  dimensoes: string;
  criado_em: string;
}

export interface EstrategiaOS {
  empreendimento_id: string;
  pesquisa_mercado: string;
  naming: string;
  conceito_criativo: string;
  manifesto: string;
  tom_de_voz: string[];
  argumentos_venda: string[];
  publico_alvo: string;
  posicionamento: string;
  completo: boolean;
}

export interface DesignSystemOS {
  empreendimento_id: string;
  key_visual_descricao: string;
  paleta_cores: { nome: string; hex: string }[];
  fontes: { nome: string; uso: string }[];
  logo_principal: string;
  grid_descricao: string;
  completo: boolean;
}

export type ImovelTipo = "APARTAMENTO" | "CASA" | "COMERCIAL" | "LOTE" | "COBERTURA";
export type ImovelPadrao = "LUXO" | "ALTO" | "MEDIO" | "POPULAR";
export type ImovelStatus = "RASCUNHO" | "PUBLICADO" | "TURBINADO" | "VENDIDO";

export type CampanhaStatus = "RASCUNHO" | "ATIVA" | "PAUSADA" | "ENCERRADA";

export type EventoTipo = "IMPRESSAO" | "CLIQUE" | "LEAD" | "CONVERSAO";

export interface Imovel {
  id: string;
  titulo: string;
  bairro: string;
  cidade: string;
  tipo: ImovelTipo;
  padrao: ImovelPadrao;
  status: ImovelStatus;
  preco: number;
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  descricao: string;
  imagens: string[];
  score_ia: number;
  visualizacoes?: number;
  leads_gerados?: number;
  criado_em: string;
  atualizado_em: string;
}

export interface Marca {
  id: string;
  nome: string;
  categoria: string;
  logo_url: string;
  score_compatibilidade?: number;
  produtos_disponiveis: number;
  campanha_ativa: boolean;
}

export interface ProdutoMarca {
  id: string;
  marca_id: string;
  marca_nome: string;
  nome: string;
  categoria: string;
  imagem_url: string;
  especificacoes: Record<string, string>;
}

export interface EncaixePerfeito {
  marca: Marca;
  motivo: string;
  categorias_match: string[];
  score: number;
}

export interface Stat {
  label: string;
  value: string | number;
  change?: string;
  change_type?: "up" | "down" | "neutral";
}

// ─── HUB DO ECOSSISTEMA ───────────────────────────────────────────────────────

export type AtorHub = "TAGMOB" | "CONSTRUTORA" | "ARQUITETO" | "MARCA" | "CORRETOR";

export type ProdutoStatus = "ATIVO" | "PAUSADO" | "EXCLUSIVO";

export type TipoExclusividade = "BAIRRO" | "EMPREENDIMENTO" | "PADRAO" | "REGIAO";

export interface ProdutoIndustria {
  id: string;
  marca_id: string;
  marca_nome: string;
  nome: string;
  categoria: string;
  subcategoria: string;
  descricao: string;
  imagem_url: string;
  especificacoes: Record<string, string>;
  status: ProdutoStatus;
  cpv_brl: number;           // custo por visualização em centavos
  cpa_brl: number;           // custo por afiliação (comissão)
  total_specs: number;       // vezes especificado por arquitetos
  total_impressoes: number;
  total_leads: number;
  exclusividades: ExclusividadeRegra[];
}

export interface ExclusividadeRegra {
  id: string;
  marca_id: string;
  tipo: TipoExclusividade;
  alvo: string;              // ex: "Jardins", "Alto Padrão", "emp-001"
  vigencia_inicio: string;
  vigencia_fim: string | null;
  ativa: boolean;
}

export interface EspecificacaoArquiteto {
  id: string;
  projeto_id: string;
  arquiteto_nome: string;
  empreendimento_id: string;
  empreendimento_nome: string;
  produto: ProdutoIndustria;
  ambiente: string;          // "Sala", "Cozinha", "Banheiro Social"…
  quantidade: number;
  observacao: string;
  criado_em: string;
  lead_gerado: boolean;
}

export interface ProjetoArquiteto {
  id: string;
  nome: string;
  arquiteto_nome: string;
  arquiteto_creci: string;
  empreendimento_id: string;
  empreendimento_nome: string;
  descricao: string;
  ambientes: string[];
  specs_count: number;
  marcas_specs: string[];
  status: "RASCUNHO" | "EM_ANDAMENTO" | "ENTREGUE";
  criado_em: string;
}

export interface MetricaAdTech {
  marca_id: string;
  marca_nome: string;
  periodo: string;
  impressoes: number;
  cliques: number;
  specs_arquitetos: number;
  leads: number;
  ctr: number;               // click-through rate %
  receita_brl: number;
  conversoes: number;
}

export interface HubMetrica {
  ativos_em_circulacao: number;
  leads_gerados_mes: number;
  receita_adtech_mes: number;
  corretores_ativos: number;
  arquitetos_ativos: number;
  marcas_ativas: number;
  specs_mes: number;
  empreendimentos_ativos: number;
}
