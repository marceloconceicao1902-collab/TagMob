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
  detalhes?: string[];
}

const DELIVERABLES: DeliverableOption[] = [
  {
    id: "pkg-estrategia",
    nome: "Campanha (Conceito, Estratégia e Identidade Visual)",
    etapa: 1,
    etapaLabel: "Estratégia & Branding",
    preco: 15000,
    descricao: "Apresentação da estratégia de marca, posicionamento mestre e marca mestre",
    isObrigatorio: true,
    detalhes: [
      "Campanha (Apresentação do Conceito, Estratégia e Identidade Visual)",
      "Filme Conceito",
      "KV (Key Visual)",
      "Manual da Marca"
    ]
  },
  {
    id: "pkg-comerciais",
    nome: "Materiais Comerciais de Venda",
    etapa: 2,
    etapaLabel: "Materiais Comerciais",
    preco: 18000,
    descricao: "Principais ferramentas utilizadas pela equipe comercial durante todo o processo de vendas",
    detalhes: [
      "Book do Cliente – Folhetão (Digital e Impresso)",
      "Book do Cliente – Mini (Digital e Impresso)",
      "Book de Mesa do Corretor (Digital e Impresso)",
      "Caderno de Plantas",
      "Folder Prospecto",
      "Folheto Intermediário",
      "Folheto de Combate",
      "Implantação",
      "Ficha Técnica"
    ]
  },
  {
    id: "pkg-digital",
    nome: "Comunicação Digital",
    etapa: 3,
    etapaLabel: "Comunicação Digital",
    preco: 8000,
    descricao: "Materiais destinados à divulgação e ao relacionamento com clientes e corretores",
    detalhes: [
      "E-mail Marketing",
      "WhatsApp Card",
      "Convite Digital (Corretores e Clientes)"
    ]
  },
  {
    id: "pkg-eventos",
    nome: "Eventos de Lançamento",
    etapa: 4,
    etapaLabel: "Eventos Lançamento",
    preco: 12000,
    descricao: "Materiais de suporte para convenções, treinamentos e eventos de lançamento",
    detalhes: [
      "Convite Impresso (Corretores e Clientes)",
      "Convite para Meeting",
      "Template de Apresentação para Meeting",
      "Backdrop para Eventos",
      "Banner Impresso Sinalizador"
    ]
  },
  {
    id: "pkg-campo",
    nome: "Materiais de Campo",
    etapa: 5,
    etapaLabel: "Materiais de Campo",
    preco: 9500,
    descricao: "Materiais promocionais físicos e sinalização para ações externas de rua",
    detalhes: [
      "Sinalização para Promotores (Colete, Credencial e Pasta)",
      "Folhetos Promocionais",
      "Balcão de Degustação Adesivado",
      "Garrafa de Água Personalizada",
      "Lixo Car Personalizado",
      "Brindes Especiais"
    ]
  },
  {
    id: "pkg-visual",
    nome: "Comunicação Visual",
    etapa: 6,
    etapaLabel: "Comunicação Visual",
    preco: 16000,
    descricao: "Sinalização e ambientação para o estande de vendas e pontos estratégicos",
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
      "Totens Internos e Externos"
    ]
  },
  {
    id: "pkg-midia-impressa",
    nome: "Mídia Impressa",
    etapa: 7,
    etapaLabel: "Mídia Impressa",
    preco: 5000,
    descricao: "Anúncios estruturados para veiculação em jornais e revistas físicas",
    detalhes: [
      "Anúncio para Jornal",
      "Anúncio para Revista"
    ]
  },
  {
    id: "pkg-plataformas",
    nome: "Plataformas Digitais",
    etapa: 8,
    etapaLabel: "Plataformas Digitais",
    preco: 11000,
    descricao: "Desenvolvimento de site oficial, catálogo digital interativo e portais imobiliários",
    detalhes: [
      "Site ou Landing Page do Empreendimento",
      "Catálogo Digital Interativo",
      "Materiais para Portais Imobiliários"
    ]
  },
  {
    id: "pkg-audiovisual",
    nome: "Conteúdo Audiovisual",
    etapa: 9,
    etapaLabel: "Audiovisual",
    preco: 14000,
    descricao: "Vídeos do decorado, institucionais e tour virtual 360 graus",
    detalhes: [
      "Vídeo Institucional do Empreendimento",
      "Vídeo da Região",
      "Vídeo do Decorado",
      "Tour Virtual 360°"
    ]
  },
  {
    id: "pkg-imagens",
    nome: "Imagens & Renders 3D",
    etapa: 10,
    etapaLabel: "Imagens & Renders",
    preco: 15000,
    descricao: "Perspectivas externas, internas, de lazer e plantas humanizadas coloridas",
    detalhes: [
      "Maquete Eletrônica (Imagens 3D)",
      "Perspectivas Ilustradas",
      "Plantas Humanizadas Coloridas",
      "Fotos Renderizadas Premium"
    ]
  },
  {
    id: "pkg-kits",
    nome: "Kits Comerciais de Venda",
    etapa: 11,
    etapaLabel: "Kits Comerciais",
    preco: 4500,
    descricao: "Kits de apresentação para corretores e sacola institucional para clientes",
    detalhes: [
      "Kit do Corretor de Vendas",
      "Kit do Cliente Comprador",
      "Credenciais e Crachás Oficiais",
      "Design de Assinatura de E-mail"
    ]
  },
  {
    id: "pkg-marketing",
    nome: "Marketing Digital",
    etapa: 12,
    etapaLabel: "Marketing Digital",
    preco: 10000,
    descricao: "Templates de redes sociais, stories, reels e criativos para campanhas patrocinadas",
    detalhes: [
      "Posts para Redes Sociais",
      "Stories Instagram",
      "Reels / TikTok",
      "Banners Google Display e Portais",
      "Peças para Meta Ads (Anúncios)",
      "Peças para Google Ads (Display)"
    ]
  }
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
  const [expandedPackages, setExpandedPackages] = useState<string[]>([]);

  const togglePackageExpanded = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPackages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  
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
                const isExpanded = expandedPackages.includes(d.id);
                
                return (
                  <div 
                    key={d.id}
                    onClick={() => toggleDeliverable(d.id, d.isObrigatorio)}
                    style={{
                      background: d.isObrigatorio ? "rgba(255,0,104,0.02)" : isSelected ? "rgba(57,255,20,0.02)" : "#111120",
                      border: `1.5px solid ${d.isObrigatorio ? "#FF006840" : isSelected ? "#39FF1440" : "#1A1A30"}`,
                      borderRadius: 12, padding: "14px 18px", cursor: d.isObrigatorio ? "default" : "pointer",
                      display: "flex", flexDirection: "column", gap: 10,
                      transition: "all 0.1s"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
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

                    <div style={{ borderTop: `1px solid ${d.isObrigatorio ? 'rgba(255,0,104,0.15)' : '#1A1A30'}`, paddingTop: 8, marginTop: 2 }} onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => togglePackageExpanded(d.id, e)}
                        style={{ background: "none", border: "none", color: d.isObrigatorio ? "#FF0068" : "#00E5FF", fontSize: 11, fontWeight: 700, cursor: "pointer", padding: 0, outline: "none", display: "flex", alignItems: "center", gap: 3 }}
                      >
                        {isExpanded ? "Ocultar peças incluídas ▲" : "Ver peças incluídas ▼"}
                      </button>
                      {isExpanded && d.detalhes && (
                        <ul style={{ marginTop: 8, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4, listStyleType: "disc" }}>
                          {d.detalhes.map((p, idx) => (
                            <li key={idx} style={{ fontSize: 11, color: "#7878A0" }}>{p}</li>
                          ))}
                        </ul>
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
