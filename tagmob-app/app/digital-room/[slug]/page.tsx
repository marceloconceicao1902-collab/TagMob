"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import {
  Building2, MapPin, BedDouble, Calendar, ArrowRight,
  Maximize2, Car, Compass, Mail, Phone, ShieldCheck,
  Check, MessageSquare, Star, Heart, Sparkles,
} from "lucide-react";

// Mock de Detalhes dos Empreendimentos Cadastrados
const MOCK_ROOMS: Record<string, {
  nome: string;
  subtitulo: string;
  bairro: string;
  cidade: string;
  descricao: string;
  cor: string;
  plantas: string[];
  precoDesde: number;
  entrega: string;
  diferenciais: string[];
  especs: { suites: number; area: string; vagas: number; face: string };
}> = {
  "icone-jardins": {
    nome: "Ícone Jardins",
    subtitulo: "A reinvenção do luxo contemporâneo no coração dos Jardins",
    bairro: "Jardins",
    cidade: "São Paulo — SP",
    descricao: "O Ícone Jardins une arquitetura autoral, design biofílico e a exclusividade de viver em uma das esquinas mais nobres da cidade. Um projeto esculpido para quem exige sofisticação e conforto absoluto em cada metro quadrado.",
    cor: "#FF0068",
    precoDesde: 2450000,
    entrega: "Dezembro de 2027",
    plantas: ["145m² — 3 Suítes", "190m² — 4 Suítes (Duplex)"],
    diferenciais: [
      "Piscina coberta climatizada de 25m",
      "Lobby com pé-direito de 7m assinado por designer renomado",
      "Fechaduras eletrônicas por biometria nas portas sociais",
      "Ponto de recarga rápida para carros elétricos por vaga",
      "Gerador full atendendo todas as unidades privativas"
    ],
    especs: { suites: 3, area: "145 a 190m²", vagas: 2, face: "Norte" }
  },
  "vista-morumbi": {
    nome: "Vista Morumbi",
    subtitulo: "Vida integrada com lazer suspenso e vista permanente da cidade",
    bairro: "Morumbi",
    cidade: "São Paulo — SP",
    descricao: "Um refúgio urbano de alto padrão projetado para proporcionar bem-estar para toda a família. No Vista Morumbi, as áreas comuns suspensas integram a natureza com o horizonte urbano paulistano.",
    cor: "#00E5FF",
    precoDesde: 1100000,
    entrega: "Julho de 2026",
    plantas: ["85m² — 2 Suítes", "112m² — 3 Suítes"],
    diferenciais: [
      "Quadra de tênis oficial de saibro",
      "Fitness center de 200m² com equipamentos de última geração",
      "Coworking integrado com cabines acústicas privadas",
      "Varanda gourmet integrada de 15m²",
      "Certificação LEED de sustentabilidade"
    ],
    especs: { suites: 2, area: "85 a 112m²", vagas: 2, face: "Leste" }
  }
};

const CORRETOR_MOCK: Record<string, { nome: string; creci: string; telefone: string; foto: string }> = {
  "joao": {
    nome: "João Pedro",
    creci: "CRECI 198.234-F",
    telefone: "11988887777",
    foto: "JP"
  },
  "fernanda": {
    nome: "Fernanda Lima",
    creci: "CRECI 244.512-F",
    telefone: "11977776666",
    foto: "FL"
  }
};

export default function DigitalRoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const slug = (params?.slug as string) || "icone-jardins";
  const roomData = MOCK_ROOMS[slug] || MOCK_ROOMS["icone-jardins"];
  
  const corretorKey = searchParams.get("corretor") || "";
  const corretor = CORRETOR_MOCK[corretorKey.toLowerCase()];

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setIsSubmitting(true);
    
    // Simular API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Salvar em localStorage para simular integração com o CRM
      const existingLeads = JSON.parse(localStorage.getItem("crm_leads") || "[]");
      existingLeads.unshift({
        id: `lead-${Date.now()}`,
        nome: formName,
        email: formEmail,
        telefone: formPhone || null,
        mensagem: `Interesse enviado via Sala de Vendas Digital: ${roomData.nome}. Corretor: ${corretor?.nome || "Canal Direto"}.`,
        status: "NOVO",
        createdAt: new Date().toISOString(),
        score: 90
      });
      localStorage.setItem("crm_leads", JSON.stringify(existingLeads));
      
    }, 1200);
  };

  function fmtBRL(v: number) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#06060B", color: "#EEEEFF", fontFamily: "sans-serif" }}>
      
      {/* ── HEADER DE NAVEGAÇÃO PÚBLICA ────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        backgroundColor: "rgba(6, 6, 11, 0.75)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 24, height: 24, backgroundColor: roomData.cor, borderRadius: 6,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, padding: 4
          }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 1 }} />
            ))}
          </div>
          <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: "-0.04em" }}>TAGMOB SHOWROOM</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button 
            onClick={() => setLiked(!liked)} 
            style={{ 
              background: "none", border: "none", cursor: "pointer", 
              display: "flex", alignItems: "center", gap: 6, color: liked ? "#FF0068" : "#7878A0",
              fontSize: 12, fontWeight: 700 
            }}
          >
            <Heart size={14} fill={liked ? "#FF0068" : "none"} /> {liked ? "Favoritado" : "Favoritar"}
          </button>
        </div>
      </header>

      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(180deg, rgba(6, 6, 11, 0.1) 0%, #06060B 100%), linear-gradient(135deg, ${roomData.cor}18 0%, rgba(6, 6, 11, 0.95) 100%)`,
        padding: "80px 40px 40px", borderBottom: "1px solid rgba(255,255,255,0.04)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 50, alignItems: "center" }}>
          
          {/* Apresentação do Empreendimento */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, color: roomData.cor,
              backgroundColor: roomData.cor + "12", border: `1px solid ${roomData.cor}30`,
              padding: "4px 10px", borderRadius: 20, alignSelf: "flex-start", letterSpacing: "0.08em"
            }}>
              LANÇAMENTO RESIDENCIAL DE ALTO PADRÃO
            </span>
            
            <h1 style={{ fontSize: 44, fontWeight: 950, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              {roomData.nome}
            </h1>
            
            <p style={{ fontSize: 18, color: "#7878A0", fontWeight: 500, lineHeight: 1.4 }}>
              {roomData.subtitulo}
            </p>

            <div style={{ display: "flex", gap: 15, fontSize: 13, color: "#5A5A7A", marginTop: 10 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <MapPin size={14} color={roomData.cor} /> {roomData.bairro} · {roomData.cidade}
              </span>
              <span>•</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Calendar size={14} /> Entrega: {roomData.entrega}
              </span>
            </div>

            <p style={{ fontSize: 14, color: "#7878A0", lineHeight: 1.6, marginTop: 15 }}>
              {roomData.descricao}
            </p>

            {/* Grid de Especificações Rápidas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 20 }}>
              {[
                { icon: Maximize2, label: "Metragem", value: roomData.especs.area },
                { icon: BedDouble, label: "Suítes", value: `${roomData.especs.suites} Suítes` },
                { icon: Car, label: "Vagas", value: `${roomData.especs.vagas} Vagas` },
                { icon: Compass, label: "Sol", value: roomData.especs.face }
              ].map(item => (
                <div key={item.label} style={{ background: "#11112060", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                  <item.icon size={14} color="#7878A0" />
                  <span style={{ fontSize: 10, color: "#5A5A7A" }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card de Conversão Lateral */}
          <div style={{
            background: "#0D0D1A", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16, padding: 30, display: "flex", flexDirection: "column", gap: 20,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
          }}>
            <div>
              <p style={{ fontSize: 11, color: "#7878A0" }}>Valor a partir de</p>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: roomData.cor }}>{fmtBRL(roomData.precoDesde)}</h2>
              <p style={{ fontSize: 11, color: "#5A5A7A", marginTop: 4 }}>Fluxo de pagamento facilitado sob demanda</p>
            </div>

            {/* Corretor Referenciado */}
            {corretor && (
              <div style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 10
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: `${roomData.cor}18`, border: `1px solid ${roomData.cor}30`,
                  display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: roomData.cor
                }}>
                  {corretor.foto}
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>Atendimento Exclusivo</p>
                  <p style={{ fontSize: 11, color: "#7878A0" }}>{corretor.nome} · <span style={{ fontSize: 9 }}>{corretor.creci}</span></p>
                </div>
              </div>
            )}

            {/* Form */}
            {!isSuccess ? (
              <form onSubmit={handleInterestSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 12, color: "#7878A0", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: 6 }}>Solicitar Apresentação e Plantas</p>
                
                <input
                  type="text" placeholder="Seu Nome Completo" required
                  value={formName} onChange={e => setFormName(e.target.value)}
                  style={{ background: "#111120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#fff" }}
                />
                <input
                  type="email" placeholder="E-mail principal" required
                  value={formEmail} onChange={e => setFormEmail(e.target.value)}
                  style={{ background: "#111120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#fff" }}
                />
                <input
                  type="text" placeholder="WhatsApp (com DDD)"
                  value={formPhone} onChange={e => setFormPhone(e.target.value)}
                  style={{ background: "#111120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#fff" }}
                />

                <button
                  type="submit" disabled={isSubmitting}
                  style={{
                    padding: "10px 16px", background: roomData.cor, border: "none",
                    borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 700,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    marginTop: 4, transition: "opacity 0.15s"
                  }}
                >
                  {isSubmitting ? "Enviando..." : "Tenho Interesse"}
                  <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <div style={{
                padding: "20px 14px", background: "rgba(57, 255, 20, 0.05)",
                border: "1px solid rgba(57, 255, 20, 0.2)", borderRadius: 10,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center"
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: "rgba(57, 255, 20, 0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Check size={16} color="#39FF14" />
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: "#39FF14" }}>Solicitação Enviada!</h4>
                  <p style={{ fontSize: 11, color: "#7878A0", marginTop: 4, lineHeight: 1.4 }}>
                    Obrigado pelo contato. {corretor ? `${corretor.nome} entrará` : "Um corretor especialista entrará"} em contato nas próximas horas.
                  </p>
                </div>
              </div>
            )}

            {corretor && (
              <a
                href={`https://api.whatsapp.com/send?phone=55${corretor.telefone}&text=Olá%20${corretor.nome},%20gostaria%20de%20saber%20mais%20sobre%20o%20${roomData.nome}`}
                target="_blank"
                style={{
                  padding: "9px 16px", background: "rgba(57, 255, 20, 0.1)", border: "1px solid rgba(57, 255, 20, 0.2)",
                  borderRadius: 8, color: "#39FF14", fontSize: 12, fontWeight: 700,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  textDecoration: "none"
                }}
              >
                <MessageSquare size={13} /> Falar Direct no WhatsApp
              </a>
            )}

          </div>

        </div>
      </section>

      {/* ── CONTEÚDO DETALHADO ────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "60px auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 50 }}>
        
        {/* Diferenciais */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em" }}>Diferenciais Construtivos</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {roomData.diferenciais.map((d, index) => (
              <div key={index} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", background: `${roomData.cor}10`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2
                }}>
                  <Sparkles size={11} color={roomData.cor} />
                </div>
                <p style={{ fontSize: 14, color: "#7878A0", lineHeight: 1.5 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plantas */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em" }}>Opções de Plantas</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {roomData.plantas.map((planta, index) => (
              <div key={index} style={{
                padding: "16px 20px", background: "#11112060",
                border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12,
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{planta}</span>
                <span style={{ fontSize: 10, color: roomData.cor, fontWeight: 800, background: roomData.cor + "10", padding: "3px 8px", borderRadius: 4 }}>DISPONÍVEL</span>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
