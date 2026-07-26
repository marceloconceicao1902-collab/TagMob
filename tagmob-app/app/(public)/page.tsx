"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowDown, Building2, Palette, Tag, Users, Cpu,
  ShieldCheck, Unlock, Sparkles, ChevronRight, ChevronDown,
  Lock, X, Check, Bot, LayoutGrid, ArrowUpRight, Layers
} from "lucide-react";

import { SimuladorSection } from "./_components/simulador-section";

import {
  COMO_FUNCIONA_ETAPAS,
  CONTATO,
  DIFERENCIAIS_FECHAMENTO,
  DIFERENCIAIS_TABELA,
  DIFERENCIAIS_TITULO,
  ECOSSISTEMA_MODULOS,
  ECOSSISTEMA_OBSERVACAO_ESTRATEGICA,
  ECOSSISTEMA_TITULO,
  FAQ,
  HERO_DESCRIPTION,
  HERO_HIGHLIGHTS,
  HERO_SUBTITLE,
  IA_BENEFICIOS,
  IA_DESCRICAO,
  IA_SUBTITULO,
  IA_TITULO,
  MANIFESTO_PARAGRAFOS,
  MANIFESTO_TITULO,
  MODELO_DESTAQUES,
  MODELO_FECHAMENTO,
  MODELO_FORMATOS,
  MODELO_TEXTO,
  MODELO_TITULO,
  NAV_LINKS,
  O_QUE_E_DESTAQUES,
  O_QUE_E_TEXTO,
  O_QUE_E_TITULO,
  PILARES,
  PILARES_INTRO_TITULO,
  SQUAD_TEXTOS,
  SQUAD_TITULO,
} from "./_content";

function Bloco({ color, w, h, top, left, right, bottom, rotate, opacity = 0.12 }: any) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: w,
        height: h,
        backgroundColor: color,
        borderRadius: 4,
        top,
        left,
        right,
        bottom,
        transform: `rotate(${rotate}deg)`,
        opacity,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "#09090F", color: "#EEEEFF", minHeight: "100vh", fontFamily: "var(--font-sans, system-ui, sans-serif)", overflowX: "hidden" }}>
      {/* ══ NAV FIXED HEADER ════════════════════════════════════════════════ */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "rgba(9, 9, 15, 0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #1A1A30",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo TAGMOB */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, backgroundColor: "#FF0068", borderRadius: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: 4 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ backgroundColor: i === 3 ? "rgba(255,255,255,0.3)" : "#FFFFFF", borderRadius: 1.5 }} />
              ))}
            </div>
            <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: "-0.04em", color: "#EEEEFF" }}>
              <span style={{ color: "#00E5FF" }}>T.</span>AGMOB
            </span>
          </Link>

          {/* Menu de Navegação por Tópicos Clicáveis */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ fontSize: 13, fontWeight: 700, color: "rgba(238, 238, 255, 0.75)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(238, 238, 255, 0.75)")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Botão de Acesso Restrito */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/sign-in"
              style={{
                backgroundColor: "#FF0068",
                color: "#FFFFFF",
                padding: "10px 22px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "-0.01em",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 0 20px rgba(255,0,104,0.35)",
              }}
            >
              <Lock size={15} />
              Acesso Restrito
            </Link>
          </div>
        </div>
      </header>

      {/* Spacing for fixed header */}
      <div style={{ height: 68 }} />

      {/* ══ 1. HERO SECTION ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "90px 24px 100px", overflow: "hidden", textAlign: "center" }}>
        <Bloco color="#FF0068" w={70} h={70} top="8%" left="4%" rotate={15} opacity={0.15} />
        <Bloco color="#00E5FF" w={50} h={50} top="15%" right="6%" rotate={-12} opacity={0.12} />
        <Bloco color="#39FF14" w={60} h={60} bottom="10%" left="8%" rotate={25} opacity={0.12} />

        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Eyebrow badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24, backgroundColor: "rgba(255,0,104,0.1)", border: "1px solid rgba(255,0,104,0.25)", padding: "6px 16px", borderRadius: 20 }}>
            <div style={{ width: 6, height: 6, backgroundColor: "#FF0068", borderRadius: 1 }} />
            PLATAFORMA CRIATIVA IMOBILIÁRIA
          </div>

          {/* Title: PENSAR. CRIAR. CONECTAR. */}
          <h1 style={{ fontSize: "clamp(42px, 8vw, 84px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.95, textTransform: "uppercase", marginBottom: 28 }}>
            PENSAR.<br />
            <span style={{ color: "#FF0068" }}>CRIAR.</span><br />
            <span style={{ color: "#39FF14" }}>CONECTAR.</span>
          </h1>

          {/* Subtitle & Description */}
          <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 800, color: "#EEEEFF", lineHeight: 1.3, marginBottom: 16 }}>
            {HERO_SUBTITLE}
          </h2>
          <p style={{ fontSize: 16, color: "#7878A0", lineHeight: 1.7, maxWidth: 680, margin: "0 auto 36px" }}>
            {HERO_DESCRIPTION}
          </p>

          {/* Highlights pills */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {HERO_HIGHLIGHTS.map((item, idx) => {
              const colors = ["#00E5FF", "#39FF14", "#FF0068"];
              const color = colors[idx % colors.length];
              return (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#111120", border: `1px solid ${color}40`, padding: "8px 18px", borderRadius: 12, fontSize: 14, fontWeight: 800, color: "#EEEEFF" }}>
                  <div style={{ width: 6, height: 6, backgroundColor: color, borderRadius: 1 }} />
                  {item}
                </div>
              );
            })}
          </div>

          {/* Hero Buttons */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#simulador"
              style={{
                backgroundColor: "#FF0068",
                color: "#FFFFFF",
                padding: "16px 36px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 800,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 0 30px rgba(255,0,104,0.4)",
              }}
            >
              Simular Lançamento Agora
              <ArrowRight size={18} />
            </a>
            <Link
              href="/sign-in"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid #1A1A30",
                color: "#EEEEFF",
                padding: "16px 32px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Lock size={16} />
              Acesso Restrito
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 2. MANIFESTO SECTION ════════════════════════════════════════════ */}
      <section id="manifesto" style={{ position: "relative", padding: "90px 24px", backgroundColor: "#0D0D1A", borderTop: "1px solid #111120" }}>
        <Bloco color="#FF0068" w={80} h={80} top="12%" right="5%" rotate={-10} opacity={0.08} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, backgroundColor: "#FF0068", borderRadius: 1 }} />
              O MERCADO MUDOU
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.1 }}>
              O mercado mudou.<br />
              <span style={{ color: "#FF0068" }}>A forma de criar campanhas também.</span>
            </h2>
          </div>

          <div style={{ background: "#111120", border: "1px solid #1A1A30", borderLeft: "4px solid #FF0068", borderRadius: 20, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
            {MANIFESTO_PARAGRAFOS.map((paragrafo, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: idx === MANIFESTO_PARAGRAFOS.length - 1 ? 18 : 15,
                  fontWeight: idx === MANIFESTO_PARAGRAFOS.length - 1 ? 800 : 400,
                  color: idx === MANIFESTO_PARAGRAFOS.length - 1 ? "#EEEEFF" : "#7878A0",
                  lineHeight: 1.75,
                }}
              >
                {paragrafo}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. O QUE É A TAGMOB ══════════════════════════════════════════════ */}
      <section id="a-tagmob" style={{ position: "relative", padding: "90px 24px", borderTop: "1px solid #111120" }}>
        <Bloco color="#00E5FF" w={64} h={64} bottom="10%" left="6%" rotate={18} opacity={0.08} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#00E5FF", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, backgroundColor: "#00E5FF", borderRadius: 1 }} />
              CONCEITO TAGMOB
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.1, marginBottom: 16 }}>
              {O_QUE_E_TITULO}
            </h2>
            <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
              {O_QUE_E_TEXTO.map((p, idx) => (
                <p key={idx} style={{ fontSize: 16, color: "#7878A0", lineHeight: 1.65 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* 3 Highlight Cards (Visual System of commit 6fc9d60) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {O_QUE_E_DESTAQUES.map((destaque, idx) => {
              const colors = ["#FF0068", "#00E5FF", "#39FF14"];
              const codes = ["C1", "C2", "C3"];
              const color = colors[idx];
              const code = codes[idx];
              return (
                <div
                  key={destaque}
                  style={{
                    background: "#111120",
                    border: `1px solid #1A1A30`,
                    borderRadius: 20,
                    padding: 32,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ position: "absolute", top: 20, right: 20, fontSize: 11, fontWeight: 800, color, backgroundColor: `${color}15`, padding: "4px 10px", borderRadius: 6 }}>
                    {code}
                  </span>
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                    <div style={{ width: 10, height: 10, backgroundColor: color, borderRadius: 2 }} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.02em" }}>
                    {destaque}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 4. UM NOVO JEITO DE CRIAR CAMPANHAS (PILARES) ═══════════════════ */}
      <section id="pilares" style={{ position: "relative", padding: "90px 24px", backgroundColor: "#0D0D1A", borderTop: "1px solid #111120" }}>
        <Bloco color="#7B46F8" w={90} h={90} top="15%" right="4%" rotate={-8} opacity={0.08} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#7B46F8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, backgroundColor: "#7B46F8", borderRadius: 1 }} />
              METODOLOGIA DE OPERAÇÃO
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.1 }}>
              {PILARES_INTRO_TITULO}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {PILARES.map((pilar, idx) => {
              const colorMap: Record<string, string> = { pink: "#FF0068", cyan: "#00E5FF", green: "#39FF14" };
              const color = colorMap[pilar.accent] || "#00E5FF";
              return (
                <div
                  key={pilar.sigla}
                  style={{
                    background: "#111120",
                    border: "1px solid #1A1A30",
                    borderTop: `4px solid ${color}`,
                    borderRadius: 20,
                    padding: 32,
                    position: "relative",
                  }}
                >
                  <span style={{ position: "absolute", top: 20, right: 20, fontSize: 11, fontWeight: 800, color, backgroundColor: `${color}15`, padding: "4px 10px", borderRadius: 6 }}>
                    0{idx + 1}
                  </span>
                  <div style={{ fontSize: 12, fontWeight: 900, color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                    {pilar.sigla}
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: "#EEEEFF", marginBottom: 12, letterSpacing: "-0.02em" }}>
                    {pilar.titulo}
                  </h3>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color, marginBottom: 12 }}>
                    {pilar.subtitulo}
                  </h4>
                  <p style={{ fontSize: 14, color: "#7878A0", lineHeight: 1.65 }}>
                    {pilar.texto}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 5. COMO FUNCIONA — TRANSIÇÃO POR ETAPAS (1 A 6) ═════════════════ */}
      <section id="como-funciona" style={{ position: "relative", padding: "90px 24px", borderTop: "1px solid #111120" }}>
        <Bloco color="#FFB800" w={75} h={75} bottom="15%" left="5%" rotate={12} opacity={0.08} />

        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#FFB800", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, backgroundColor: "#FFB800", borderRadius: 1 }} />
              FLUXO DE OPERAÇÃO EM 6 ETAPAS
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.1, marginBottom: 12 }}>
              Como funciona
            </h2>
            <p style={{ fontSize: 15, color: "#7878A0", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
              Cada etapa é desenvolvida em sequência lógica de transição por etapas para garantir unidade e evitar retrabalho.
            </p>
          </div>

          {/* Cards de Etapas com Transição ↓ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {COMO_FUNCIONA_ETAPAS.map((etapa, idx) => {
              const colorMap: Record<string, string> = {
                pink: "#FF0068",
                cyan: "#00E5FF",
                violet: "#7B46F8",
                amber: "#FFB800",
                green: "#39FF14",
              };
              const color = colorMap[etapa.accent] || "#FF0068";
              return (
                <React.Fragment key={etapa.numero}>
                  <div
                    style={{
                      background: "#111120",
                      border: "1px solid #1A1A30",
                      borderRadius: 20,
                      padding: "24px 28px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 20,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        backgroundColor: color,
                        color: "#FFFFFF",
                        fontSize: 18,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: `0 0 16px ${color}40`,
                      }}
                    >
                      {etapa.numero}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.02em", marginBottom: 6 }}>
                        {etapa.titulo}
                      </h3>
                      <p style={{ fontSize: 14, color: "#7878A0", lineHeight: 1.6 }}>
                        {etapa.descricao}
                      </p>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, color, backgroundColor: `${color}15`, padding: "4px 10px", borderRadius: 6 }}>
                      ETAPA 0{etapa.numero}
                    </span>
                  </div>

                  {/* Seta de Transição ↓ */}
                  {idx < COMO_FUNCIONA_ETAPAS.length - 1 && (
                    <div style={{ display: "flex", justifyContent: "center", margin: "-6px 0" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#111120", border: "1px solid #1A1A30", display: "flex", alignItems: "center", justifyContent: "center", color: "#00E5FF" }}>
                        <ArrowDown size={16} />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 6 & 7. SQUADS DE ESPECIALISTAS & IA ══════════════════════════════ */}
      <section id="squads" style={{ position: "relative", padding: "90px 24px", backgroundColor: "#0D0D1A", borderTop: "1px solid #111120" }}>
        <Bloco color="#39FF14" w={80} h={80} top="10%" right="5%" rotate={-15} opacity={0.08} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#39FF14", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, backgroundColor: "#39FF14", borderRadius: 1 }} />
              ESPECIALISTAS & INTELIGÊNCIA ARTIFICIAL
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.1 }}>
              Equipes de alto nível impulsionadas por IA.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {/* Card Squad */}
            <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 20, padding: 36 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#39FF14", backgroundColor: "rgba(57,255,20,0.1)", padding: "4px 12px", borderRadius: 6, marginBottom: 20 }}>
                <Users size={14} /> SQUADS SOB MEDIDA
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: "#EEEEFF", marginBottom: 16, letterSpacing: "-0.02em" }}>
                {SQUAD_TITULO}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {SQUAD_TEXTOS.map((texto, idx) => (
                  <p key={idx} style={{ fontSize: 14, color: "#7878A0", lineHeight: 1.65 }}>
                    {texto}
                  </p>
                ))}
              </div>
            </div>

            {/* Card IA */}
            <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 20, padding: 36 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#00E5FF", backgroundColor: "rgba(0,229,255,0.1)", padding: "4px 12px", borderRadius: 6, marginBottom: 20 }}>
                <Bot size={14} /> CRIATIVIDADE HUMANA + IA
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: "#EEEEFF", marginBottom: 10, letterSpacing: "-0.02em" }}>
                {IA_TITULO}
              </h3>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#00E5FF", marginBottom: 14 }}>
                {IA_SUBTITULO}
              </h4>
              <p style={{ fontSize: 14, color: "#7878A0", lineHeight: 1.65, marginBottom: 20 }}>
                {IA_DESCRICAO}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {IA_BENEFICIOS.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, backgroundColor: "#0D0D1A", border: "1px solid #1A1A30", padding: "10px 14px", borderRadius: 10 }}>
                    <div style={{ width: 5, height: 5, backgroundColor: "#39FF14", borderRadius: 1 }} />
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#EEEEFF" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. ECOSSISTEMA COMPLETO ═════════════════════════════════════════ */}
      <section id="ecossistema" style={{ position: "relative", padding: "90px 24px", borderTop: "1px solid #111120" }}>
        <Bloco color="#FF0068" w={70} h={70} top="15%" left="4%" rotate={10} opacity={0.08} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, backgroundColor: "#FF0068", borderRadius: 1 }} />
              ECOSSISTEMA INTEGRADO
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.1 }}>
              {ECOSSISTEMA_TITULO}
            </h2>
          </div>

          {/* 12 Módulos em Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 40 }}>
            {ECOSSISTEMA_MODULOS.map((modulo) => (
              <div
                key={modulo}
                style={{
                  background: "#111120",
                  border: "1px solid #1A1A30",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ width: 6, height: 6, backgroundColor: "#FF0068", borderRadius: 1, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF" }}>
                  {modulo}
                </span>
              </div>
            ))}
          </div>

          {/* Observação Estratégica incorporada (Highlight Card) */}
          <div
            style={{
              background: "#111120",
              border: "2px solid #00E5FF",
              borderRadius: 20,
              padding: "32px 36px",
              boxShadow: "0 0 40px rgba(0,229,255,0.12)",
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(0,229,255,0.15)", border: "1px solid #00E5FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#00E5FF", flexShrink: 0 }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 900, color: "#00E5FF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                Observação Estratégica de Posicionamento
              </div>
              <p style={{ fontSize: 15, color: "#EEEEFF", lineHeight: 1.7, fontWeight: 500 }}>
                {ECOSSISTEMA_OBSERVACAO_ESTRATEGICA}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. POR QUE A TAGMOB É DIFERENTE? (TABELA COMPARATIVA) ════════════ */}
      <section id="diferenciais" style={{ position: "relative", padding: "90px 24px", backgroundColor: "#0D0D1A", borderTop: "1px solid #111120" }}>
        <Bloco color="#7B46F8" w={85} h={85} bottom="10%" right="6%" rotate={-12} opacity={0.08} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#7B46F8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, backgroundColor: "#7B46F8", borderRadius: 1 }} />
              TABELA COMPARATIVA
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.1 }}>
              {DIFERENCIAIS_TITULO}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Header da Tabela */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 8 }}>
              <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.25)", borderRadius: 12, padding: "14px 20px", fontSize: 13, fontWeight: 900, color: "#EF4444", textTransform: "uppercase" }}>
                Modelo Tradicional (Agência)
              </div>
              <div style={{ background: "rgba(57, 255, 20, 0.1)", border: "1px solid rgba(57, 255, 20, 0.25)", borderRadius: 12, padding: "14px 20px", fontSize: 13, fontWeight: 900, color: "#39FF14", textTransform: "uppercase" }}>
                Plataforma TAGMOB
              </div>
            </div>

            {/* Linhas */}
            {DIFERENCIAIS_TABELA.map((row, idx) => (
              <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <X size={16} color="#EF4444" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#7878A0" }}>{row.tradicional}</span>
                </div>
                <div style={{ background: "#111120", border: "1px solid rgba(57, 255, 20, 0.2)", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <Check size={16} color="#39FF14" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#EEEEFF", fontWeight: 600 }}>{row.tagmob}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: "center", background: "#111120", border: "1px solid #1A1A30", padding: "20px 28px", borderRadius: 16 }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: "#EEEEFF" }}>
              {DIFERENCIAIS_FECHAMENTO}
            </p>
          </div>
        </div>
      </section>

      {/* ══ 10. UM MODELO TRANSPARENTE ═════════════════════════════════════ */}
      <section id="modelo" style={{ position: "relative", padding: "90px 24px", borderTop: "1px solid #111120" }}>
        <Bloco color="#00E5FF" w={80} h={80} top="10%" left="5%" rotate={14} opacity={0.08} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#00E5FF", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, backgroundColor: "#00E5FF", borderRadius: 1 }} />
              PREVISIBILIDADE FINANCEIRA
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.1, marginBottom: 16 }}>
              {MODELO_TITULO}
            </h2>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
              {MODELO_DESTAQUES.map((d) => (
                <div key={d} style={{ fontSize: 16, fontWeight: 900, color: "#FF0068", backgroundColor: "rgba(255,0,104,0.1)", padding: "8px 18px", borderRadius: 12 }}>
                  {d}
                </div>
              ))}
            </div>

            <p style={{ fontSize: 16, color: "#7878A0", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
              {MODELO_TEXTO}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 40 }}>
            {MODELO_FORMATOS.map((f, idx) => {
              const colors = ["#FF0068", "#00E5FF", "#39FF14"];
              const color = colors[idx];
              return (
                <div
                  key={f.titulo}
                  style={{
                    background: "#111120",
                    border: "1px solid #1A1A30",
                    borderRadius: 20,
                    padding: 32,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", color, marginBottom: 20 }}>
                      <ShieldCheck size={20} />
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#EEEEFF", marginBottom: 10, letterSpacing: "-0.02em" }}>
                      {f.titulo}
                    </h3>
                    <p style={{ fontSize: 14, color: "#7878A0", lineHeight: 1.6 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#00E5FF", marginBottom: 24 }}>
              {MODELO_FECHAMENTO}
            </p>
            <Link
              href="/simulador"
              style={{
                backgroundColor: "#FF0068",
                color: "#FFFFFF",
                padding: "16px 36px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 800,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 0 30px rgba(255,0,104,0.4)",
              }}
            >
              Simular Lançamento Agora
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 11. PERGUNTAS FREQUENTES ═════════════════════════════════════════ */}
      <section id="faq" style={{ position: "relative", padding: "90px 24px", backgroundColor: "#0D0D1A", borderTop: "1px solid #111120" }}>
        <Bloco color="#FF0068" w={70} h={70} top="12%" right="4%" rotate={-10} opacity={0.08} />

        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, color: "#FF0068", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, backgroundColor: "#FF0068", borderRadius: 1 }} />
              DÚVIDAS FREQUENTES
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#EEEEFF", lineHeight: 1.1 }}>
              Perguntas Frequentes
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {FAQ.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#111120",
                    border: `1px solid ${isOpen ? "#FF0068" : "#1A1A30"}`,
                    borderRadius: 16,
                    padding: "20px 24px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: isOpen ? "#FF0068" : "#EEEEFF" }}>
                      {item.pergunta}
                    </h3>
                    <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: isOpen ? "#FF0068" : "#7878A0", flexShrink: 0 }}>
                      {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #1A1A30", fontSize: 14, color: "#7878A0", lineHeight: 1.65 }}>
                      {Array.isArray(item.resposta) ? (
                        item.resposta.map((r, i) => <p key={i} style={{ marginBottom: 6 }}>{r}</p>)
                      ) : (
                        <p>{item.resposta}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 12. SIMULADOR DE ESCOPO E INVESTIMENTO ═══════════════════════════ */}
      <SimuladorSection />

      {/* ══ 12. FECHAMENTO & FOOTER ══════════════════════════════════════════ */}
      <footer id="contato" style={{ position: "relative", padding: "80px 24px 40px", borderTop: "1px solid #111120", backgroundColor: "#09090F" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          {/* Closing Manifesto Box */}
          <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 24, padding: "44px 40px", marginBottom: 60, textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 900, color: "#EEEEFF", lineHeight: 1.2, marginBottom: 16 }}>
              O futuro do marketing imobiliário não é contratar uma agência.<br />
              <span style={{ color: "#39FF14" }}>É conectar estratégia, criatividade, tecnologia e pessoas.</span>
            </h2>
            <p style={{ fontSize: 16, color: "#7878A0", maxWidth: 640, margin: "0 auto 32px", lineHeight: 1.65 }}>
              A TAGMOB transforma processos dispersos em uma operação integrada, inteligente e transparente.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={CONTATO.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#39FF14",
                  color: "#09090F",
                  padding: "14px 28px",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 900,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Conversar no WhatsApp <ArrowUpRight size={16} />
              </a>
              <Link
                href="/sign-in"
                style={{
                  backgroundColor: "#1A1A30",
                  border: "1px solid #2E2E4A",
                  color: "#EEEEFF",
                  padding: "14px 28px",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Acessar Plataforma
              </Link>
            </div>
          </div>

          {/* Footer Copyright */}
          <div style={{ borderTop: "1px solid #111120", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 22, height: 22, backgroundColor: "#FF0068", borderRadius: 6, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, padding: 3 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ backgroundColor: i === 3 ? "rgba(255,255,255,0.3)" : "#FFFFFF", borderRadius: 1 }} />
                ))}
              </div>
              <span style={{ fontWeight: 900, fontSize: 14, color: "#EEEEFF" }}>TAGMOB</span>
            </div>
            <p style={{ fontSize: 13, color: "#7878A0" }}>© 2025 TAGMOB. Todos os direitos reservados.</p>
            <p style={{ fontSize: 13, color: "#FF0068", fontWeight: 800 }}>PENSAR · CRIAR · CONECTAR</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
