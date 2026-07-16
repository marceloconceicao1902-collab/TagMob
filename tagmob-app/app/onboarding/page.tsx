"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, Layers, Palette, TrendingUp, ArrowRight, Check, 
  Sparkles, Cpu, ShieldCheck, HelpCircle, Lock, Undo2, ShoppingBag 
} from "lucide-react";
import { ModelComparison } from "@/components/billing/ModelComparison";

type ProfileOption = {
  id: string;
  label: string;
  descricao: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  redirectTo: string;
};

const PROFILE_OPTIONS: ProfileOption[] = [
  {
    id: "CORRETOR",
    label: "Corretor de Imóveis",
    descricao: "Quero turbinar meus imóveis com conteúdo de ambientalização e gerar mais leads.",
    icon: Layers,
    color: "#00E5FF",
    redirectTo: "/corretor",
  },
  {
    id: "IMOBILIARIA",
    label: "Imobiliária",
    descricao: "Gerencio uma equipe de corretores e quero elevar o padrão visual de toda a carteira.",
    icon: Building2,
    color: "#00E5FF",
    redirectTo: "/corretor",
  },
  {
    id: "MARCA",
    label: "Marca do Segmento",
    descricao: "Quero que meus produtos apareçam nos imóveis certos, no momento de maior intenção de compra.",
    icon: TrendingUp,
    color: "#39FF14",
    redirectTo: "/corretor",
  },
  {
    id: "ARQUITETO",
    label: "Arquiteto / Designer",
    descricao: "Quero especificar produtos de marcas parceiras nos meus projetos e gerar leads de reforma.",
    icon: Palette,
    color: "#FFB800",
    redirectTo: "/corretor",
  },
  {
    id: "CONSTRUTORA",
    label: "Construtora / Incorporadora",
    descricao: "Tenho empreendimentos em pré-lançamento e quero posicionamento de marca institucional.",
    icon: Building2,
    color: "#FF0068",
    redirectTo: "/tagmob-os",
  },
];

interface DeliverableOption {
  id: string;
  nome: string;
  etapa: number;
  etapaLabel: string;
  preco: number;
  descricao: string;
  isObrigatorio?: boolean;
}

const DELIVERABLES: DeliverableOption[] = [
  // 1. Estratégia, Branding e Conceito
  { id: "e1-1", nome: "Campanha (Conceito, Estratégia e Identidade Visual)", etapa: 1, etapaLabel: "01. Estratégia & Branding", preco: 6000, descricao: "Apresentação da estratégia de marca, posicionamento mestre e marca mestre", isObrigatorio: true },
  { id: "e1-2", nome: "Filme Conceito", etapa: 1, etapaLabel: "01. Estratégia & Branding", preco: 4500, descricao: "Vídeo manifesto de posicionamento conceitual", isObrigatorio: true },
  { id: "e1-3", nome: "KV (Key Visual)", etapa: 1, etapaLabel: "01. Estratégia & Branding", preco: 3000, descricao: "Identidade visual diretora de desdobramento", isObrigatorio: true },
  { id: "e1-4", nome: "Manual da Marca", etapa: 1, etapaLabel: "01. Estratégia & Branding", preco: 1500, descricao: "Guia de uso de fontes, paletas e grids do OS", isObrigatorio: true },
  
  // 2. Materiais Comerciais
  { id: "e2-1", nome: "Book do Cliente – Folhetão (Digital e Impresso)", etapa: 2, etapaLabel: "02. Materiais Comerciais", preco: 3500, descricao: "Brochura física e digital AAA em curvas" },
  { id: "e2-2", nome: "Book do Cliente – Mini (Digital e Impresso)", etapa: 2, etapaLabel: "02. Materiais Comerciais", preco: 2000, descricao: "Versão compacta e rápida para abordagem preliminar" },
  { id: "e2-3", nome: "Book de Mesa do Corretor (Digital e Impresso)", etapa: 2, etapaLabel: "02. Materiais Comerciais", preco: 2800, descricao: "Catálogo técnico com plantas de vendas" },
  { id: "e2-4", nome: "Caderno de Plantas", etapa: 2, etapaLabel: "02. Materiais Comerciais", preco: 1500, descricao: "Compilado técnico de todas as tipologias" },
  { id: "e2-5", nome: "Folder Prospecto", etapa: 2, etapaLabel: "02. Materiais Comerciais", preco: 1000, descricao: "Panfleto comercial de distribuição de rua e PDV" },
  { id: "e2-6", nome: "Folheto Intermediário", etapa: 2, etapaLabel: "02. Materiais Comerciais", preco: 1200, descricao: "Material para meio de funil com mais detalhes técnicos" },
  { id: "e2-7", nome: "Folheto de Combate", etapa: 2, etapaLabel: "02. Materiais Comerciais", preco: 800, descricao: "Material direto e agressivo focado em preço/condições" },
  { id: "e2-8", nome: "Implantação Ilustrada", etapa: 2, etapaLabel: "02. Materiais Comerciais", preco: 1100, descricao: "Desenho ilustrado da inserção do prédio no terreno" },
  { id: "e2-9", nome: "Ficha Técnica Geral", etapa: 2, etapaLabel: "02. Materiais Comerciais", preco: 700, descricao: "Memorial descritivo resumido de acabamentos e metragens" },

  // 3. Comunicação Digital
  { id: "e3-1", nome: "E-mail Marketing Lançamento", etapa: 3, etapaLabel: "03. Comunicação Digital", preco: 900, descricao: "Código HTML e criativos prontos p/ disparo" },
  { id: "e3-2", nome: "WhatsApp Card Promocional", etapa: 3, etapaLabel: "03. Comunicação Digital", preco: 600, descricao: "Cards visuais otimizados para compartilhamento rápido" },
  { id: "e3-3", nome: "Convite Digital (Corretores e Clientes)", etapa: 3, etapaLabel: "03. Comunicação Digital", preco: 500, descricao: "Convite com links para meeting de corretores e clientes" },

  // 4. Eventos de Lançamento
  { id: "e4-1", nome: "Convite Impresso Lançamento", etapa: 4, etapaLabel: "04. Eventos Lançamento", preco: 700, descricao: "Design de convite impresso com acabamento premium" },
  { id: "e4-2", nome: "Convite para Meeting", etapa: 4, etapaLabel: "04. Eventos Lançamento", preco: 500, descricao: "Convite digital/físico para o meeting de corretores" },
  { id: "e4-3", nome: "Template de Apresentação para Meeting", etapa: 4, etapaLabel: "04. Eventos Lançamento", preco: 1800, descricao: "Apresentação comercial dinâmica editável em PPTX" },
  { id: "e4-4", nome: "Backdrop para Eventos", etapa: 4, etapaLabel: "04. Eventos Lançamento", preco: 1200, descricao: "Painel fotográfico para recepção e fotos do evento" },
  { id: "e4-5", nome: "Banner Impresso Sinalizador", etapa: 4, etapaLabel: "04. Eventos Lançamento", preco: 800, descricao: "Banners sinalizadores de recepção de convenção" },

  // 5. Materiais de Campo
  { id: "e5-1", nome: "Sinalização para Promotores", etapa: 5, etapaLabel: "05. Materiais de Campo", preco: 1100, descricao: "Coletes, credenciais e bolsas personalizadas" },
  { id: "e5-2", nome: "Folhetos Promocionais", etapa: 5, etapaLabel: "05. Materiais de Campo", preco: 800, descricao: "Folhetos simplificados de distribuição em massa" },
  { id: "e5-3", nome: "Balcão de Degustação Adesivado", etapa: 5, etapaLabel: "05. Materiais de Campo", preco: 1200, descricao: "Programação visual para ações em praças e PDV externo" },
  { id: "e5-4", nome: "Garrafa de Água Personalizada", etapa: 5, etapaLabel: "05. Materiais de Campo", preco: 900, descricao: "Rótulo e embalagem customizados para distribuição" },
  { id: "e5-5", nome: "Lixo Car Personalizado", etapa: 5, etapaLabel: "05. Materiais de Campo", preco: 700, descricao: "Design de lixeiras de câmbio para automóveis" },
  { id: "e5-6", nome: "Brindes Especiais", etapa: 5, etapaLabel: "05. Materiais de Campo", preco: 1400, descricao: "Design de sacolas, chaveiros e brindes promocionais" },

  // 6. Comunicação Visual
  { id: "e6-1", nome: "Comunicação Visual do Estande", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 5500, descricao: "Sinalização interna, tótens de maquete e ambientação" },
  { id: "e6-2", nome: "Placas de Comunicação Visual", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 2500, descricao: "Placas internas e indicativas do estande de vendas" },
  { id: "e6-3", nome: "Placa de Produto", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 1800, descricao: "Placa frontal indicadora do lançamento e metragens" },
  { id: "e6-4", nome: "Placa Seta de Trânsito", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 1200, descricao: "Setas direcionais externas de trânsito" },
  { id: "e6-5", nome: "Tapume de Fechamento", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 4500, descricao: "Projeto gráfico de fechamento de lote com apelo visual" },
  { id: "e6-6", nome: "Cavalete Promocional", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 800, descricao: "Cavaletes promocionais móveis para calçada" },
  { id: "e6-7", nome: "Adesivo Microperfurado para Carros", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 1000, descricao: "Adesivos microperfurados de vidro traseiro" },
  { id: "e6-8", nome: "Faixas de Poste", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 1200, descricao: "Faixas de poste e fachadas promocionais" },
  { id: "e6-9", nome: "Wind Banners Promocionais", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 1500, descricao: "Sinalização aérea promocional externa para atração" },
  { id: "e6-10", nome: "Totens Internos e Externos", etapa: 6, etapaLabel: "06. Comunicação Visual", preco: 3500, descricao: "Totens sinalizadores com iluminação e mapas" },

  // 7. Mídia Impressa
  { id: "e7-1", nome: "Anúncio para Jornal", etapa: 7, etapaLabel: "07. Mídia Impressa", preco: 1600, descricao: "Páginas inteiras e meia página com especificações" },
  { id: "e7-2", nome: "Anúncio para Revista", etapa: 7, etapaLabel: "07. Mídia Impressa", preco: 1400, descricao: "Layout premium de alta fidelidade para revistas do setor" },

  // Plataformas Digitais
  { id: "e8-1", nome: "Site ou Landing Page do Empreendimento", etapa: 8, etapaLabel: "08. Plataformas Digitais", preco: 4500, descricao: "Site completo com galeria, mapa e integração de leads" },
  { id: "e8-2", nome: "Catálogo Digital Interativo", etapa: 8, etapaLabel: "08. Plataformas Digitais", preco: 2500, descricao: "Visualizador PDF/Web com links clicáveis e navegação" },
  { id: "e8-3", nome: "Materiais para Portais Imobiliários", etapa: 8, etapaLabel: "08. Plataformas Digitais", preco: 1500, descricao: "Banners e fotos redimensionadas nos padrões Zap/VivaReal" },

  // Conteúdo Audiovisual
  { id: "e9-1", nome: "Vídeo Institucional do Empreendimento", etapa: 9, etapaLabel: "09. Audiovisual", preco: 5000, descricao: "Vídeo com entrevistas, detalhes de obra e depoimentos" },
  { id: "e9-2", nome: "Vídeo da Região", etapa: 9, etapaLabel: "09. Audiovisual", preco: 3000, descricao: "Gravações aéreas e highlights da vizinhança" },
  { id: "e9-3", nome: "Vídeo do Decorado", etapa: 9, etapaLabel: "09. Audiovisual", preco: 3500, descricao: "Apresentação guiada do apartamento decorado" },
  { id: "e9-4", nome: "Tour Virtual 360°", etapa: 9, etapaLabel: "09. Audiovisual", preco: 4000, descricao: "Ambiente imersivo para navegação online pelo cliente" },

  // Imagens
  { id: "e10-1", nome: "Maquete Eletrônica (Imagens 3D)", etapa: 10, etapaLabel: "10. Imagens & Renders", preco: 6500, descricao: "Perspectivas externas, áreas comuns e fachadas realistas" },
  { id: "e10-2", nome: "Perspectivas Ilustradas", etapa: 10, etapaLabel: "10. Imagens & Renders", preco: 3500, descricao: "Tratamento artístico e conceitual de perspectivas do prédio" },
  { id: "e10-3", nome: "Plantas Humanizadas Coloridas", etapa: 10, etapaLabel: "10. Imagens & Renders", preco: 2200, descricao: "Esquemas coloridos e decorados de todas as tipologias" },
  { id: "e10-4", nome: "Fotos Renderizadas Premium", etapa: 10, etapaLabel: "10. Imagens & Renders", preco: 2800, descricao: "Renders estáticos adicionais com detalhes de decoração" },

  // Kits Comerciais
  { id: "e11-1", nome: "Kit do Corretor de Vendas", etapa: 11, etapaLabel: "11. Kits Comerciais", preco: 1200, descricao: "Crachá, bloco de notas, caneta e pasta de apresentação" },
  { id: "e11-2", nome: "Kit do Cliente Comprador", etapa: 11, etapaLabel: "11. Kits Comerciais", preco: 1500, descricao: "Sacola institucional, memorial descritivo impresso e folder" },
  { id: "e11-3", nome: "Credenciais e Crachás Oficiais", etapa: 11, etapaLabel: "11. Kits Comerciais", preco: 600, descricao: "Acreditação oficial para o time de plantão e promotores" },
  { id: "e11-4", nome: "Design de Assinatura de E-mail", etapa: 11, etapaLabel: "11. Kits Comerciais", preco: 400, descricao: "Arte e assinatura em HTML com a marca do lançamento" },

  // Marketing Digital
  { id: "e12-1", nome: "Posts para Redes Sociais", etapa: 12, etapaLabel: "12. Marketing Digital", preco: 1500, descricao: "Templates de feed de postagens institucionais" },
  { id: "e12-2", nome: "Stories Instagram", etapa: 12, etapaLabel: "12. Marketing Digital", preco: 1200, descricao: "Templates de engajamento diário para Instagram" },
  { id: "e12-3", nome: "Reels / TikTok", etapa: 12, etapaLabel: "12. Marketing Digital", preco: 2000, descricao: "Criativos em vídeo vertical editáveis pelo time de marketing" },
  { id: "e12-4", nome: "Banners Google Display e Portais", etapa: 12, etapaLabel: "12. Marketing Digital", preco: 1800, descricao: "Desdobramentos de anúncios em todas as resoluções da web" },
  { id: "e12-5", nome: "Peças para Meta Ads (Anúncios)", etapa: 12, etapaLabel: "12. Marketing Digital", preco: 2500, descricao: "Criativos em vídeo e carrossel focados em conversão de leads" },
  { id: "e12-6", nome: "Peças para Google Ads (Display)", etapa: 12, etapaLabel: "12. Marketing Digital", preco: 1500, descricao: "Anúncios gráficos para rede de display do Google" },
];

export default function OnboardingPage() {
  const router = useRouter();
  
  // Controle de etapas do onboarding: 
  // 0 = Escolha Perfil, 1 = Storytelling TAGMOB, 2 = Carrinho/Configurador Construtora
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  
  // Seleção de peças no carrinho
  const [selectedItems, setSelectedItems] = useState<string[]>(
    DELIVERABLES.filter(d => d.isObrigatorio).map(d => d.id)
  );

  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const [clienteNome, setClienteNome] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");
  const [clienteEmpresa, setClienteEmpresa] = useState("");

  // Cálculos financeiros
  const valorEtapa1Fixo = DELIVERABLES.filter(d => d.isObrigatorio)
                                      .reduce((acc, curr) => acc + curr.preco, 0);

  const valorVariavel = DELIVERABLES.filter(d => !d.isObrigatorio && selectedItems.includes(d.id))
                                    .reduce((acc, curr) => acc + curr.preco, 0);

  const valorTotal = valorEtapa1Fixo + valorVariavel;

  function handleContinueFromProfile() {
    if (!selectedProfile) return;
    if (selectedProfile === "CONSTRUTORA") {
      setOnboardingStep(1); // Vai para Storytelling da Construtora
    } else {
      setLoading(true);
      const option = PROFILE_OPTIONS.find((p) => p.id === selectedProfile);
      router.push(option?.redirectTo ?? "/corretor");
    }
  }

  function toggleDeliverable(id: string, isObrigatorio?: boolean) {
    if (isObrigatorio) return; // Trava financeira da Etapa 1 imutável
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function handleFinalizeCheckout() {
    setOnboardingStep(3); // Direciona para o formulário de cadastro de Lead
  }

  async function handleSubmitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!clienteNome || !clienteEmail || !clienteTelefone || !clienteEmpresa) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    const itemsSelecionados = DELIVERABLES.filter(d => selectedItems.includes(d.id))
                                          .map(d => d.nome)
                                          .join(", ");
    const mensagem = `Simulação de Escopo Onboarding:\nProdutos: ${itemsSelecionados}`;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: clienteNome,
          email: clienteEmail,
          telefone: clienteTelefone,
          empresa: clienteEmpresa,
          mensagem: mensagem,
          orcamentoEstimado: valorTotal,
        }),
      });

      if (res.ok) {
        setOnboardingStep(4); // Sucesso
      } else {
        const errorData = await res.json();
        alert("Erro ao criar lead: " + (errorData.error || "Tente novamente."));
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão ao criar lead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#09090F",
        color: "#EEEEFF",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="grid-pattern"
    >
      {/* Header Fixo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, zIndex: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#FF0068",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 14,
            color: "#fff",
          }}
        >
          T
        </div>
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.04em" }}>TAGMOB</span>
      </div>

      {/* ══ STEP 0: ESCOLHA DE PERFIL ════════════════════════════════════════ */}
      {onboardingStep === 0 && (
        <div style={{ maxWidth: 640, width: "100%", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
              Selecione sua Operação
            </h1>
            <p style={{ fontSize: 14, color: "#7878A0" }}>
              Escolha seu perfil de atuação no ecossistema imobiliário.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {PROFILE_OPTIONS.map((option) => {
              const isSelected = selectedProfile === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedProfile(option.id)}
                  style={{
                    background: isSelected ? option.color + "12" : "#111120",
                    border: `1px solid ${isSelected ? option.color + "60" : "#1A1A30"}`,
                    borderRadius: 12,
                    padding: "14px 18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textAlign: "left",
                    width: "100%",
                    transition: "all 0.15s ease",
                    outline: "none",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: option.color + (isSelected ? "20" : "12"),
                      border: `1px solid ${option.color}${isSelected ? "40" : "20"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <option.icon size={18} color={option.color} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF", marginBottom: 2 }}>
                      {option.label}
                    </p>
                    <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.45 }}>
                      {option.descricao}
                    </p>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        backgroundColor: option.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={12} color="#000" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleContinueFromProfile}
            disabled={!selectedProfile || loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 10,
              backgroundColor: selectedProfile ? "#FF0068" : "#1A1A30",
              border: "none",
              color: selectedProfile ? "#fff" : "#3A3A5C",
              fontSize: 14,
              fontWeight: 700,
              cursor: selectedProfile ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 0.15s ease",
            }}
          >
            {loading ? "Processando..." : "Continuar"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </div>
      )}

      {/* ══ STEP 1: STORYTELLING INSTITUCIONAL (O SIGNIFICADO DA TAGMOB) ════ */}
      {onboardingStep === 1 && (
        <div style={{ maxWidth: 740, width: "100%", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ color: "#FF0068", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" }}>Manifesto Conceitual</span>
            <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", marginTop: 4 }}>
              Como Enxergamos a Comunicação
            </h1>
            <p style={{ fontSize: 14, color: "#7878A0", marginTop: 4 }}>
              O DNA de design e mobilidade que molda nosso software.
            </p>
          </div>

          {/* Grid do Acrônimo T.AG.MOB estilo Tetris */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
            {[
              {
                letra: "T",
                palavra: "Tetris",
                cor: "#FF0068",
                desc: "Assim como no jogo, acreditamos que cada projeto é formado por diversas peças. Estratégia, branding, criação, mídia, conteúdo e experiência precisam se encaixar perfeitamente para construir um resultado sólido. Não basta ter boas peças; é preciso colocá-las no lugar certo, no momento certo."
              },
              {
                letra: "AG",
                palavra: "Agência",
                cor: "#8B5CF6",
                desc: "Somos uma agência especializada em transformar empreendimentos em marcas desejadas. Unimos estratégia, criatividade e execução para desenvolver campanhas completas, capazes de gerar valor para incorporadoras, construtoras e clientes."
              },
              {
                letra: "MOB",
                palavra: "Mobilidade",
                cor: "#39FF14",
                desc: "Representa nossa capacidade de adaptação. Cada empreendimento possui um desafio diferente, e nossa estrutura é flexível para montar equipes, processos e soluções sob medida para cada projeto. Trabalhamos com agilidade, integrando talentos e especialidades conforme a necessidade de cada campanha."
              }
            ].map((bloco) => (
              <div 
                key={bloco.letra}
                style={{ 
                  background: "#111120", border: "1px solid #1A1A30", borderLeft: `4px solid ${bloco.cor}`,
                  borderRadius: 12, padding: 20, display: "flex", gap: 18, alignItems: "flex-start"
                }}
              >
                <div style={{ 
                  width: 46, height: 46, borderRadius: 8, backgroundColor: bloco.cor + "15", 
                  border: `1px solid ${bloco.cor}30`, display: "flex", alignItems: "center", 
                  justifyContent: "center", fontSize: 16, fontWeight: 900, color: bloco.cor, flexShrink: 0 
                }}>
                  {bloco.letra}
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: bloco.cor }}>{bloco.palavra}</h3>
                  <p style={{ fontSize: 13, color: "#7878A0", lineHeight: 1.6, marginTop: 4 }}>{bloco.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <button
              onClick={() => setOnboardingStep(0)}
              style={{ 
                padding: "12px 20px", borderRadius: 10, background: "transparent", 
                border: "1px solid #1A1A30", color: "#7878A0", fontSize: 14, fontWeight: 700, cursor: "pointer" 
              }}
            >
              Voltar
            </button>
            
            <button
              onClick={() => setOnboardingStep(2)}
              style={{
                flex: 1, padding: "12px", borderRadius: 10, backgroundColor: "#FF0068",
                border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}
            >
              Entendido, Configurar Campanha <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 2: CONFIGURADOR DE ESCOPO / CHECKOUT FINANCEIRO ════════════ */}
      {onboardingStep === 2 && (
        <div style={{ maxWidth: 1040, width: "100%", zIndex: 10 }}>
          
          {/* Header do checkout */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span style={{ color: "#39FF14", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" }}>Configuração de Escopo e Assinatura</span>
            <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", marginTop: 4 }}>
              Orçamento do Lançamento
            </h1>
            <p style={{ fontSize: 13, color: "#7878A0", marginTop: 4 }}>
              Selecione as peças. O combo estratégico (Etapa 1) é o setup mínimo inviolável.
            </p>
          </div>

          {/* Grid de Duas Colunas */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "start", marginBottom: 28 }}>
            
            {/* Coluna Esquerda: Lista de Entregáveis */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#7878A0", textTransform: "uppercase" }}>Checklist de Peças</span>
                <span style={{ fontSize: 11, color: "#39FF14", display: "flex", alignItems: "center", gap: 4 }}>
                  <ShoppingBag size={12} /> {selectedItems.length} peças selecionadas
                </span>
              </div>

              {DELIVERABLES.map(d => {
                const isSelected = selectedItems.includes(d.id);
                
                return (
                  <div 
                    key={d.id}
                    onClick={() => toggleDeliverable(d.id, d.isObrigatorio)}
                    style={{
                      background: d.isObrigatorio ? "rgba(255,0,104,0.02)" : isSelected ? "rgba(57,255,20,0.02)" : "#111120",
                      border: `1.5px solid ${d.isObrigatorio ? "#FF006840" : isSelected ? "#39FF1440" : "#1A1A30"}`,
                      borderRadius: 12, padding: "14px 18px", cursor: d.isObrigatorio ? "default" : "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14,
                      transition: "all 0.1s"
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{d.nome}</p>
                        <span style={{ 
                          fontSize: 9, fontWeight: 700, color: d.isObrigatorio ? "#FF0068" : "#7878A0", 
                          backgroundColor: (d.isObrigatorio ? "#FF0068" : "#7878A0") + "12", 
                          padding: "1px 6px", borderRadius: 3, border: "1px solid currentcolor"
                        }}>
                          {d.etapaLabel}
                        </span>
                      </div>
                      <p style={{ fontSize: 11, color: "#7878A0", marginTop: 4 }}>{d.descricao}</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: d.isObrigatorio ? "#FF0068" : "#EDE8DF" }}>
                        R$ {d.preco.toLocaleString("pt-BR")}
                      </span>
                      
                      {d.isObrigatorio ? (
                        <div style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: "#FF006815", border: "1px solid #FF006840", display: "flex", alignItems: "center", justifyContent: "center" }} title="Setup Fixo Obrigatório">
                          <Lock size={10} color="#FF0068" style={{ margin: "auto" }} />
                        </div>
                      ) : (
                        <div style={{ 
                          width: 20, height: 20, borderRadius: 5, 
                          backgroundColor: isSelected ? "#39FF1415" : "transparent", 
                          border: `1.5px solid ${isSelected ? "#39FF1440" : "#282840"}`,
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          {isSelected && <Check size={12} color="#39FF14" strokeWidth={3} />}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coluna Direita: Resumo Financeiro & Validador de Modelo */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              
              {/* Box de Resumo Financeiro */}
              <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 14, padding: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: "#7878A0", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>Resumo do Orçamento</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 10, borderBottom: "1px solid #1A1A30", paddingBottom: 14, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#7878A0" }}>Setup Fixo (Etapa 1):</span>
                    <span style={{ fontWeight: 700, color: "#FF0068" }}>R$ {valorEtapa1Fixo.toLocaleString("pt-BR")},00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#7878A0" }}>Peças Incrementais:</span>
                    <span style={{ fontWeight: 700, color: "#EEEEFF" }}>R$ {valorVariavel.toLocaleString("pt-BR")},00</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF" }}>TOTAL ESTIMADO:</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "#39FF14" }}>R$ {valorTotal.toLocaleString("pt-BR")},00</span>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#00E5FF",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: "4px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      outline: "none",
                    }}
                  >
                    {showDetails ? "Ocultar Detalhes ▲" : "Ver Mais (Detalhes do Pedido) ▼"}
                  </button>
                </div>

                {showDetails && (
                  <div style={{
                    marginBottom: 16,
                    padding: "12px 14px",
                    background: "#09090F",
                    border: "1px solid #1A1A30",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    maxHeight: 180,
                    overflowY: "auto",
                  }}>
                    <p style={{ fontSize: 10, fontWeight: 800, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Itens Selecionados</p>
                    {DELIVERABLES.filter(d => selectedItems.includes(d.id)).map(d => (
                      <div key={d.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7878A0" }}>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>• {d.nome}</span>
                        <span style={{ color: d.isObrigatorio ? "#FF0068" : "#EEEEFF", fontWeight: 600 }}>R$ {d.preco.toLocaleString("pt-BR")}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ padding: "10px", background: "rgba(255,0,104,0.05)", border: "1px solid rgba(255,0,104,0.25)", borderRadius: 8, marginBottom: 16 }}>
                  <p style={{ fontSize: 11, color: "#FF0068", lineHeight: 1.5 }}>
                    💡 <strong>Combo Mestre Ativo:</strong> A Etapa 1 calibra a IA RAG com o seu manual de marca e KV oficial para os desdobramentos automáticos.
                  </p>
                </div>

                <button
                  onClick={handleFinalizeCheckout}
                  disabled={loading}
                  style={{
                    width: "100%", padding: "12px", borderRadius: 8, backgroundColor: "#39FF14",
                    border: "none", color: "#000", fontSize: 13, fontWeight: 800, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "opacity 0.2s"
                  }}
                >
                  {loading ? "Inicializando Central..." : "Ativar Central TAGMOB OS"}
                </button>
              </div>

              {/* Validação Psicológica - Modelo Tradicional vs TAGMOB */}
              <div>
                <ModelComparison />
              </div>

            </div>

          </div>

          {/* Navegação de checkout */}
          <div style={{ display: "flex", justifyContent: "flex-start", gap: 12 }}>
            <button
              onClick={() => setOnboardingStep(1)}
              style={{ 
                padding: "10px 18px", borderRadius: 10, background: "transparent", 
                border: "1px solid #1A1A30", color: "#7878A0", fontSize: 13, fontWeight: 700, cursor: "pointer" 
              }}
            >
              Voltar ao Manifesto
            </button>
          </div>

        </div>
      )}

      {/* ══ STEP 3: CADASTRO DO CLIENTE (GERAR LEAD) ════════════════════════ */}
      {onboardingStep === 3 && (
        <div style={{ maxWidth: 540, width: "100%", zIndex: 10 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span style={{ color: "#00E5FF", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" }}>Etapa Final de Configuração</span>
            <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", marginTop: 4 }}>
              Cadastre sua Incorporadora
            </h1>
            <p style={{ fontSize: 13, color: "#7878A0", marginTop: 4 }}>
              Para salvar seu escopo simulado de <strong>R$ {valorTotal.toLocaleString("pt-BR")},00</strong> e iniciar o atendimento com nossa equipe.
            </p>
          </div>

          <form onSubmit={handleSubmitLead} style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 16, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#7878A0", textTransform: "uppercase" }}>Seu Nome Completo *</label>
              <input 
                type="text"
                required
                placeholder="Ex: Ricardo Souza"
                value={clienteNome}
                onChange={(e) => setClienteNome(e.target.value)}
                style={{
                  background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                  padding: "10px 14px", fontSize: 13, color: "#EEEEFF", outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#7878A0", textTransform: "uppercase" }}>E-mail Corporativo *</label>
              <input 
                type="email"
                required
                placeholder="Ex: ricardo.souza@incorporadora.com"
                value={clienteEmail}
                onChange={(e) => setClienteEmail(e.target.value)}
                style={{
                  background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                  padding: "10px 14px", fontSize: 13, color: "#EEEEFF", outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#7878A0", textTransform: "uppercase" }}>WhatsApp Corporativo *</label>
              <input 
                type="tel"
                required
                placeholder="Ex: (11) 99999-9999"
                value={clienteTelefone}
                onChange={(e) => setClienteTelefone(e.target.value)}
                style={{
                  background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                  padding: "10px 14px", fontSize: 13, color: "#EEEEFF", outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#7878A0", textTransform: "uppercase" }}>Nome da Construtora / Incorporadora *</label>
              <input 
                type="text"
                required
                placeholder="Ex: Tegra Incorporadora"
                value={clienteEmpresa}
                onChange={(e) => setClienteEmpresa(e.target.value)}
                style={{
                  background: "#111120", border: "1px solid #1A1A30", borderRadius: 8,
                  padding: "10px 14px", fontSize: 13, color: "#EEEEFF", outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 10 }}>
              <button
                type="button"
                onClick={() => setOnboardingStep(2)}
                style={{
                  padding: "12px 20px", borderRadius: 8, background: "transparent",
                  border: "1px solid #1A1A30", color: "#7878A0", fontSize: 13, fontWeight: 700, cursor: "pointer"
                }}
              >
                Editar Orçamento
              </button>

              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1, padding: "12px", borderRadius: 8, backgroundColor: "#FF0068",
                  border: "none", color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                }}
              >
                {loading ? "Registrando..." : "Enviar Simulação & Criar Negócio"} <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ══ STEP 4: TELA DE SUCESSO ═════════════════════════════════════════ */}
      {onboardingStep === 4 && (
        <div style={{ maxWidth: 540, width: "100%", zIndex: 10, textAlign: "center" }}>
          <div style={{
            background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 20, padding: "40px 32px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 20
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%", backgroundColor: "rgba(57, 255, 20, 0.08)",
              border: "2px solid #39FF14", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#39FF14", marginBottom: 8
            }}>
              <Check size={28} strokeWidth={3} />
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.03em" }}>
              Simulação Enviada com Sucesso!
            </h2>
            
            <p style={{ fontSize: 14, color: "#7878A0", lineHeight: 1.6 }}>
              Olá <strong>{clienteNome}</strong>, registramos o interesse de <strong>{clienteEmpresa}</strong>. 
              Sua estimativa de escopo está orçada em <strong>R$ {valorTotal.toLocaleString("pt-BR")},00</strong>.
            </p>

            <div style={{
              width: "100%", padding: "14px 18px", background: "rgba(0, 229, 255, 0.04)",
              border: "1px solid rgba(0, 229, 255, 0.2)", borderRadius: 12, textAlign: "left", fontSize: 12.5,
              color: "#7878A0"
            }}>
              <p style={{ fontWeight: 800, color: "#00E5FF", marginBottom: 6 }}>Próximos Passos:</p>
              <p style={{ marginBottom: 4 }}>• O negócio foi gerado no topo da esteira do CRM (como "Novo Lead").</p>
              <p style={{ marginBottom: 4 }}>• Um especialista comercial entrará em contato via WhatsApp no número <strong>{clienteTelefone}</strong>.</p>
              <p>• Analisaremos os {selectedItems.length} entregáveis selecionados para iniciar a sua central TAGMOB OS.</p>
            </div>

            <div style={{ display: "flex", gap: 12, width: "100%", marginTop: 10 }}>
              <button
                onClick={() => {
                  setClienteNome("");
                  setClienteEmail("");
                  setClienteTelefone("");
                  setClienteEmpresa("");
                  setOnboardingStep(0);
                }}
                style={{
                  flex: 1, padding: "12px", borderRadius: 8, background: "transparent",
                  border: "1px solid #1A1A30", color: "#7878A0", fontSize: 13, fontWeight: 700, cursor: "pointer"
                }}
              >
                Nova Simulação
              </button>

              <button
                onClick={() => router.push("/leads")}
                style={{
                  flex: 1.2, padding: "12px", borderRadius: 8, backgroundColor: "#39FF14",
                  border: "none", color: "#000", fontSize: 13, fontWeight: 800, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                }}
              >
                Ir para o CRM (Pipeline) <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
