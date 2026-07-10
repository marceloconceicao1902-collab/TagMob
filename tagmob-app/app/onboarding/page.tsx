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
  // Etapa 1 - OBRIGATÓRIOS (Setup Inicial Fixo)
  { id: "e1-1", nome: "Apresentação de Conceito, Estratégia e Identidade Visual", etapa: 1, etapaLabel: "01. Estratégia & Branding", preco: 6000, descricao: "Estudo de posicionamento, naming e marca mestre", isObrigatorio: true },
  { id: "e1-2", nome: "Filme Conceito de 30\"", etapa: 1, etapaLabel: "01. Estratégia & Branding", preco: 4500, descricao: "Vídeo manifesto de posicionamento conceitual", isObrigatorio: true },
  { id: "e1-3", nome: "Key Visual (KV) Matriz", etapa: 1, etapaLabel: "01. Estratégia & Branding", preco: 3000, descricao: "Identidade visual diretora de desdobramento", isObrigatorio: true },
  { id: "e1-4", nome: "Manual da Marca (Brandbook)", etapa: 1, etapaLabel: "01. Estratégia & Branding", preco: 1500, descricao: "Guia de uso de fontes, paletas e grids do OS", isObrigatorio: true },
  
  // Etapa 2 a 11 - Opcionais Incrementais
  { id: "e3-1", nome: "Book do Cliente - Folhetão", etapa: 3, etapaLabel: "03. Materiais Comerciais", preco: 3500, descricao: "Brochura física e digital AAA em curvas" },
  { id: "e3-2", nome: "Book de Mesa do Corretor", etapa: 3, etapaLabel: "03. Materiais Comerciais", preco: 2800, descricao: "Catálogo técnico com plantas de vendas" },
  { id: "e4-1", nome: "E-mail Marketing + WhatsApp Card", etapa: 4, etapaLabel: "04. Comunicação Digital", preco: 1200, descricao: "Código HTML e criativos prontos p/ disparo" },
  { id: "e5-1", nome: "Pack de Redes Sociais (Carrossel + Stories)", etapa: 5, etapaLabel: "05. Marketing Digital", preco: 2500, descricao: "Templates de feed e stories editáveis via RAG" },
  { id: "e6-1", nome: "Tour Virtual 360° Interativo", etapa: 6, etapaLabel: "06. Conteúdo Audiovisual", preco: 4000, descricao: "Renderização imersiva do decorado 3D" },
  { id: "e7-1", nome: "Ambientação Física Stand (Tapume + Totem)", etapa: 7, etapaLabel: "07. Comunicação Visual", preco: 5000, descricao: "Ficheiros de plotagem e fechamento gráfico" },
  { id: "e8-1", nome: "Template Apresentação Meeting (PPTX)", etapa: 8, etapaLabel: "08. Materiais Eventos", preco: 1800, descricao: "Apresentação comercial dinâmica editável" },
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
    setLoading(true);
    setTimeout(() => {
      router.push("/tagmob-os");
    }, 1200);
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

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF" }}>TOTAL ESTIMADO:</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "#39FF14" }}>R$ {valorTotal.toLocaleString("pt-BR")},00</span>
                </div>

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

    </div>
  );
}
