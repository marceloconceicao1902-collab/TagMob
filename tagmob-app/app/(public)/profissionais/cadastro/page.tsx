"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2, Palette, ShieldCheck, CheckCircle2, ArrowRight,
  Sparkles, FileText, Globe, Tag, Award, UserCheck, Layers,
  ChevronRight, AlertCircle, Wrench, Briefcase, Compass
} from "lucide-react";
import { CategoriaProfissional } from "@/lib/types";

const CATEGORIAS: { key: CategoriaProfissional; label: string; desc: string; icon: any; regLabel: string }[] = [
  { key: "ARQUITETO", label: "Arquiteto(a)", desc: "Projetos arquitetônicos e interiores para novos empreendimentos", icon: Palette, regLabel: "Número CAU" },
  { key: "DESIGNER_INTERIORES", label: "Designer de Interiores", desc: "Ambientação, mobiliário e acabamentos de alto padrão", icon: Sparkles, regLabel: "Número ABD / Registro" },
  { key: "MARCENEIRO", label: "Marcenaria / Mobiliário", desc: "Móveis planejados e marcenaria técnica sob medida", icon: Wrench, regLabel: "CNPJ / Registro Comercial" },
  { key: "EMPRESA_REFORMA", label: "Empresa de Reforma", desc: "Gestão completa de obras, civil, elétrica e acabamento", icon: Building2, regLabel: "CREA / CNPJ" },
  { key: "CORRETOR", label: "Corretor / Imobiliária", desc: "Parceiro de vendas com materiais exclusivos de autonomia", icon: Briefcase, regLabel: "Número CRECI" },
  { key: "ENGENHEIRO", label: "Engenheiro Civil", desc: "Projetos estruturais, laudos e execução de obras", icon: Compass, regLabel: "Número CREA" },
];

const MARCAS_PARCEIRAS = [
  "Portobello", "Deca", "Suvinil", "Tramontina", "Todeschini",
  "Duratex", "Arauco", "Tigre", "Hafele", "Docol", "Quartzolit", "Gerdau"
];

export default function OnboardingProfissionalPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    nomeRazao: "",
    cnpjCpf: "",
    email: "",
    telefone: "",
    categoria: "ARQUITETO" as CategoriaProfissional,
    registroPro: "",
    regiaoAtuacao: "",
    portfolioUrl: "",
    marcasInsumos: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const catSelecionadaInfo = CATEGORIAS.find(c => c.key === formData.categoria) || CATEGORIAS[0];

  function toggleMarca(marca: string) {
    setFormData(prev => {
      const existe = prev.marcasInsumos.includes(marca);
      return {
        ...prev,
        marcasInsumos: existe
          ? prev.marcasInsumos.filter(m => m !== marca)
          : [...prev.marcasInsumos, marca]
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      const res = await fetch("/api/profissionais/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao realizar cadastro.");
      }

      setSucesso(true);
    } catch (err: any) {
      setErro(err.message || "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#090911", color: "#EEEEFF", minHeight: "100vh", padding: "40px 20px 100px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header Breadcrumb & Title */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            backgroundColor: "rgba(139, 92, 246, 0.12)", border: "1px solid rgba(139, 92, 246, 0.3)",
            padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 800, color: "#A78BFA",
            marginBottom: 16
          }}>
            <Sparkles size={14} /> TAGMOB HUB DE PROFISSIONAIS & PARCEIROS
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", color: "#FFFFFF", marginBottom: 12 }}>
            Credenciamento de Parceiros da Construção Civil
          </h1>
          <p style={{ fontSize: 16, color: "#9CA3AF", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            Conecte seu escritório ou empresa diretamente aos empreendimentos e compradores finais ativos na rede TAGMOB OS.
          </p>
        </div>

        {/* Stepper Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 16,
          padding: "16px 24px", marginBottom: 36
        }}>
          {[
            { num: 1, title: "1. Categoria & Perfil" },
            { num: 2, title: "2. Dados Corporativos" },
            { num: 3, title: "3. Credenciais & Marcas" },
          ].map(s => (
            <div
              key={s.num}
              onClick={() => s.num < step && setStep(s.num as any)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                cursor: s.num < step ? "pointer" : "default",
                opacity: step === s.num ? 1 : 0.5,
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                backgroundColor: step === s.num ? "#8B5CF6" : step > s.num ? "#39FF14" : "#1A1A30",
                color: step > s.num ? "#000" : "#FFF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 12
              }}>
                {step > s.num ? <CheckCircle2 size={16} /> : s.num}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: step === s.num ? "#EEEEFF" : "#9CA3AF" }}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form Body */}
        {sucesso ? (
          <div style={{
            backgroundColor: "#111122", border: "1px solid #39FF1440", borderRadius: 20,
            padding: 48, textAlign: "center", boxShadow: "0 20px 50px rgba(57,255,20,0.1)"
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", backgroundColor: "rgba(57,255,20,0.15)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20
            }}>
              <CheckCircle2 size={40} color="#39FF14" />
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF", marginBottom: 12 }}>
              Credenciamento Solicitado com Sucesso!
            </h2>
            <p style={{ fontSize: 15, color: "#9CA3AF", maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.6 }}>
              Seus dados foram recebidos. Nosso time de curadoria avaliará seu registro profissional (<strong>{formData.registroPro || "Em análise"}</strong>) e você receberá o convite de acesso ao Workspace Privado.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link href="/profissionais" style={{
                backgroundColor: "#8B5CF6", color: "#FFF", padding: "12px 24px", borderRadius: 12,
                fontWeight: 800, fontSize: 14, textDecoration: "none"
              }}>
                Ir para Workspace Privado
              </Link>
              <button onClick={() => { setSucesso(false); setStep(1); }} style={{
                backgroundColor: "#1A1A30", color: "#EEEEFF", padding: "12px 24px", borderRadius: 12,
                fontWeight: 700, fontSize: 14, border: "1px solid #2D2D50", cursor: "pointer"
              }}>
                Novo Cadastro
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ backgroundColor: "#111122", border: "1px solid #1F1F3A", borderRadius: 20, padding: 32 }}>

            {erro && (
              <div style={{
                backgroundColor: "#FF006815", border: "1px solid #FF0068", borderRadius: 12,
                padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10, color: "#FF0068", fontSize: 13, fontWeight: 700
              }}>
                <AlertCircle size={18} />
                <span>{erro}</span>
              </div>
            )}

            {/* ETAPA 1: SELEÇÃO DE CATEGORIA */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#FFF", marginBottom: 8 }}>
                  Qual o seu segmento profissional?
                </h3>
                <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 24 }}>
                  Selecione a categoria principal que melhor descreve sua área de atuação no setor imobiliário e construção.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16, marginBottom: 32 }}>
                  {CATEGORIAS.map(cat => {
                    const IconComp = cat.icon;
                    const isSelected = formData.categoria === cat.key;
                    return (
                      <div
                        key={cat.key}
                        onClick={() => setFormData({ ...formData, categoria: cat.key })}
                        style={{
                          backgroundColor: isSelected ? "rgba(139, 92, 246, 0.15)" : "#0D0D1A",
                          border: `2px solid ${isSelected ? "#8B5CF6" : "#1A1A30"}`,
                          borderRadius: 14, padding: 18, cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            backgroundColor: isSelected ? "#8B5CF6" : "#1A1A30",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>
                            <IconComp size={18} color={isSelected ? "#FFF" : "#A78BFA"} />
                          </div>
                          {isSelected && <CheckCircle2 size={18} color="#39FF14" />}
                        </div>
                        <h4 style={{ fontSize: 15, fontWeight: 800, color: "#FFF", marginBottom: 4 }}>{cat.label}</h4>
                        <p style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.4 }}>{cat.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      backgroundColor: "#8B5CF6", color: "#FFF", border: "none",
                      padding: "12px 24px", borderRadius: 12, fontWeight: 800, fontSize: 14,
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 8
                    }}
                  >
                    Próximo Passo <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2: DADOS CORPORATIVOS & LOCALIZAÇÃO */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#FFF", marginBottom: 8 }}>
                  Dados de Contato & Região de Atuação
                </h3>
                <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 24 }}>
                  Informe seus dados comerciais para o cruzamento de inteligência de Matchmaking por localização.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                      Nome Completo / Razão Social *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Studio Arq Ltda ou Mariana Souza"
                      value={formData.nomeRazao}
                      onChange={e => setFormData({ ...formData, nomeRazao: e.target.value })}
                      style={{
                        width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #1A1A30",
                        borderRadius: 10, padding: "12px 14px", color: "#FFF", fontSize: 14, outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                      CNPJ ou CPF *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 00.000.000/0001-00"
                      value={formData.cnpjCpf}
                      onChange={e => setFormData({ ...formData, cnpjCpf: e.target.value })}
                      style={{
                        width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #1A1A30",
                        borderRadius: 10, padding: "12px 14px", color: "#FFF", fontSize: 14, outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                      E-mail Comercial
                    </label>
                    <input
                      type="email"
                      placeholder="contato@empresa.com.br"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #1A1A30",
                        borderRadius: 10, padding: "12px 14px", color: "#FFF", fontSize: 14, outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="text"
                      placeholder="(11) 99999-8888"
                      value={formData.telefone}
                      onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                      style={{
                        width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #1A1A30",
                        borderRadius: 10, padding: "12px 14px", color: "#FFF", fontSize: 14, outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                    Região Principal de Atuação (Cidade/Bairros) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: São Paulo — Jardins, Moema, Pinheiros e Alphaville"
                    value={formData.regiaoAtuacao}
                    onChange={e => setFormData({ ...formData, regiaoAtuacao: e.target.value })}
                    style={{
                      width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #1A1A30",
                      borderRadius: 10, padding: "12px 14px", color: "#FFF", fontSize: 14, outline: "none"
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      backgroundColor: "#1A1A30", color: "#FFF", border: "none",
                      padding: "12px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer"
                    }}
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    style={{
                      backgroundColor: "#8B5CF6", color: "#FFF", border: "none",
                      padding: "12px 24px", borderRadius: 12, fontWeight: 800, fontSize: 14,
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 8
                    }}
                  >
                    Próximo Passo <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3: CREDENCIAIS & MARCAS DE INSUMO */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#FFF", marginBottom: 8 }}>
                  Especificações Técnicas & Marcas Parceiras
                </h3>
                <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 24 }}>
                  Ganchos de escala: registre suas credenciais técnicas e as marcas com as quais você já costuma trabalhar.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                      {catSelecionadaInfo.regLabel} (Opcional/Recomendado)
                    </label>
                    <input
                      type="text"
                      placeholder={`Ex: ${catSelecionadaInfo.regLabel} 123456`}
                      value={formData.registroPro}
                      onChange={e => setFormData({ ...formData, registroPro: e.target.value })}
                      style={{
                        width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #1A1A30",
                        borderRadius: 10, padding: "12px 14px", color: "#FFF", fontSize: 14, outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 6 }}>
                      Link do Portfólio / Instagram / PDF
                    </label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/seu_perfil"
                      value={formData.portfolioUrl}
                      onChange={e => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      style={{
                        width: "100%", backgroundColor: "#0D0D1A", border: "1px solid #1A1A30",
                        borderRadius: 10, padding: "12px 14px", color: "#FFF", fontSize: 14, outline: "none"
                      }}
                    />
                  </div>
                </div>

                {/* Seleção de Marcas de Insumos */}
                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 10 }}>
                    Marcas de Insumos & Produtos com que costuma trabalhar:
                  </label>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {MARCAS_PARCEIRAS.map(marca => {
                      const isSelected = formData.marcasInsumos.includes(marca);
                      return (
                        <button
                          key={marca}
                          type="button"
                          onClick={() => toggleMarca(marca)}
                          style={{
                            padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                            border: `1px solid ${isSelected ? "#39FF14" : "#1A1A30"}`,
                            backgroundColor: isSelected ? "rgba(57,255,20,0.15)" : "#0D0D1A",
                            color: isSelected ? "#39FF14" : "#9CA3AF",
                            cursor: "pointer", transition: "all 0.15s ease"
                          }}
                        >
                          {isSelected && "✓ "} {marca}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      backgroundColor: "#1A1A30", color: "#FFF", border: "none",
                      padding: "12px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer"
                    }}
                  >
                    Voltar
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#39FF14", color: "#000", border: "none",
                      padding: "12px 32px", borderRadius: 12, fontWeight: 900, fontSize: 15,
                      cursor: loading ? "wait" : "pointer", display: "flex", alignItems: "center", gap: 8,
                      boxShadow: "0 10px 25px rgba(57,255,20,0.3)"
                    }}
                  >
                    {loading ? "Enviando..." : "Concluir Credenciamento"} <CheckCircle2 size={18} />
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}
