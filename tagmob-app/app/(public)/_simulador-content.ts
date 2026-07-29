import { SINAPRO_DELIVERABLES, SinaproDeliverable } from "@/lib/sinapro-pricing";

export type Deliverable = {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  desc: string;
  isObrigatorio: boolean;
  unidadeMedida?: string;
  detalhes: string[];
};

export const DELIVERABLES: Deliverable[] = SINAPRO_DELIVERABLES.map((item: SinaproDeliverable) => ({
  id: item.id,
  nome: item.nome,
  categoria: item.macroEtapaLabel,
  preco: item.precoBase,
  desc: item.descricao,
  isObrigatorio: item.isObrigatorio,
  unidadeMedida: item.unidadeMedida,
  detalhes: [item.nome],
}));

export const COMPARATIVE_ROWS = [
  {
    criterio: "Base de Precificação",
    trad: "% sobre VGV (2%–4% do valor das vendas)",
    tag: "Tabela Oficial Sinapro-SP + Escopo Transparente",
  },
  {
    criterio: "Transparência de Custos",
    trad: "Opaco — cresce com o sucesso do cliente",
    tag: "Valores referenciais fixos por produto/entregável",
  },
  {
    criterio: "Setup Inicial (Core Fixo - Etapa 1)",
    trad: "Embutido no VGV — invisível e variável",
    tag: "Combo fixo mandatório (KV, Logo, Manual, Slogan, Roteiro VT)",
  },
  {
    criterio: "Personalização & Descontos",
    trad: "Pacotes fechados sem flexibilidade regional",
    tag: "Desconto Comercial Interior SP (até 40%) + Carrinho Modular",
  },
  {
    criterio: "Regras de Refação",
    trad: "Refações cobradas sem regra clara",
    tag: "Taxa adicional objetiva de 40% em desvios do briefing aprovado",
  },
  {
    criterio: "Demandas Extras (Hora-Homem)",
    trad: "Custo por hora arbitrário",
    tag: "Calculadora transparente por especialidade (R$ 429 a R$ 1.787/h)",
  },
];
