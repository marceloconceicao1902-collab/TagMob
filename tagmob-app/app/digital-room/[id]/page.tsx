"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2, CheckCircle2, DollarSign, Package, Sparkles,
  ArrowRight, ShieldCheck, Clock, Plus, Check, Send, Phone, Mail,
  ChevronRight, Lock, X, Download, FileText, Video, Image as ImageIcon,
  FileArchive, Eye, ExternalLink
} from "lucide-react";
import { MOCK_EMPREENDIMENTOS, MOCK_LEADS } from "@/lib/mock-data";
import { formatBRL } from "@/lib/pipeline-kanban";
import type { Empreendimento } from "@/lib/types";

type DeliverableFile = {
  id: string;
  nome: string;
  formato: string;
  tamanho: string;
  tipo: "pdf" | "video" | "image" | "zip";
  url: string;
};

type DeliverablePackage = {
  id: string;
  nome: string;
  status: "Aprovado" | "Em Produção" | "Liberado" | "Em Análise";
  cor: string;
  desc: string;
  arquivos: DeliverableFile[];
};

const DEFAULT_PACKAGES: DeliverablePackage[] = [
  {
    id: "pkg-1",
    nome: "Campanha & Inteligência Mestre",
    status: "Aprovado",
    cor: "#39FF14",
    desc: "Key Visual, Manual de Marca, Filme Conceito e Diretrizes do Lançamento",
    arquivos: [
      { id: "f-101", nome: "Brandbook_KeyVisual_4K.pdf", formato: "PDF", tamanho: "24.5 MB", tipo: "pdf", url: "#" },
      { id: "f-102", nome: "Filme_Conceito_Manifesto_4K.mp4", formato: "MP4", tamanho: "182.0 MB", tipo: "video", url: "#" },
      { id: "f-103", nome: "Manual_Identidade_Visual.pdf", formato: "PDF", tamanho: "12.8 MB", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: "pkg-2",
    nome: "Materiais Comerciais de Venda",
    status: "Liberado",
    cor: "#39FF14",
    desc: "Book Digital do Cliente, Caderno de Plantas Humanizadas e Folheto de Combate",
    arquivos: [
      { id: "f-201", nome: "Book_Digital_Cliente_Completo.pdf", formato: "PDF", tamanho: "48.2 MB", tipo: "pdf", url: "#" },
      { id: "f-202", nome: "Caderno_Plantas_Humanizadas_HD.pdf", formato: "PDF", tamanho: "31.5 MB", tipo: "pdf", url: "#" },
      { id: "f-203", nome: "Folheto_Combate_Equipe_Vendas.pdf", formato: "PDF", tamanho: "8.4 MB", tipo: "pdf", url: "#" },
    ],
  },
  {
    id: "pkg-3",
    nome: "Comunicação Digital para Corretores",
    status: "Liberado",
    cor: "#39FF14",
    desc: "Templates WhatsApp Card, E-mail Marketing e Banners para Redes Sociais",
    arquivos: [
      { id: "f-301", nome: "Kit_Templates_WhatsApp_Vendas.zip", formato: "ZIP", tamanho: "65.0 MB", tipo: "zip", url: "#" },
      { id: "f-302", nome: "Header_Email_Marketing_HD.png", formato: "PNG", tamanho: "4.2 MB", tipo: "image", url: "#" },
      { id: "f-303", nome: "Banners_Instagram_Feed_Story.zip", formato: "ZIP", tamanho: "54.1 MB", tipo: "zip", url: "#" },
    ],
  },
  {
    id: "pkg-4",
    nome: "Product Placement & Acabamentos",
    status: "Em Análise",
    cor: "#FFB800",
    desc: "Catálogo técnico com especificações reais das Marcas parceiras e Fornecedores",
    arquivos: [
      { id: "f-401", nome: "Especificacoes_Marcas_Preliminar.pdf", formato: "PDF", tamanho: "14.1 MB", tipo: "pdf", url: "#" },
    ],
  },
];

const EXTRA_PACKAGES = [
  { id: "opt-visual", nome: "Comunicação Visual do Estande", preco: 16000, desc: "Sinalização, placas, wind banners e totens" },
  { id: "opt-video", nome: "Vídeo Tour Virtual 360°", preco: 14000, desc: "Imersão 3D completa para os compradores" },
  { id: "opt-midia", nome: "Anúncios para Mídia Impressa", preco: 5000, desc: "Formatos prontos para jornais e revistas" },
  { id: "opt-campo", nome: "Kits de Ação de Campo", preco: 9500, desc: "Sinalização, brindes e materiais para promotores" },
];

export default function DigitalRoomClientPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [deal, setDeal] = useState<Empreendimento | null>(null);
  const [lead, setLead] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal de Adicionais
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [requestedSuccess, setRequestedSuccess] = useState(false);

  // Modal de Download / Ver Material
  const [selectedPackage, setSelectedPackage] = useState<DeliverablePackage | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const triggerDownload = (fileName: string) => {
    setDownloadToast(`✓ Baixando arquivo: ${fileName}`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const triggerDownloadAll = (pkgName: string) => {
    setDownloadToast(`✓ Preparando pacote completo (.ZIP) de: ${pkgName}`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  useEffect(() => {
    let foundDeal: any = null;
    let foundLead: any = null;

    if (typeof window !== "undefined") {
      try {
        const localDeals = JSON.parse(localStorage.getItem("tagmob_local_deals") || "[]");
        foundDeal = localDeals.find((d: any) => d.id === id);

        if (!foundDeal) {
          const localLeads = JSON.parse(localStorage.getItem("tagmob_local_leads") || "[]");
          foundLead = localLeads.find((l: any) => l.id === id);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (!foundDeal && !foundLead) {
      foundDeal = MOCK_EMPREENDIMENTOS.find((d) => d.id === id);
      if (!foundDeal) {
        foundLead = MOCK_LEADS.find((l) => l.id === id);
      }
    }

    setDeal(foundDeal || null);
    setLead(foundLead || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#09090F", color: "#EEEEFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Carregando seu portal exclusivo...
      </div>
    );
  }

  const title = deal?.nome || lead?.empresa || `Projeto ${lead?.nome || "TAGMOB"}`;
  const construtora = deal?.construtora || lead?.empresa || lead?.nome || "Cliente TAGMOB";
  const valorTotal = deal?.valor_contrato || Number(lead?.orcamentoEstimado || 68000);
  const faseNome = deal ? `Fase ${deal.fase_atual} — TAGMOB OS` : "Qualificação & Proposta";
  const progresso = deal ? Math.round(((deal.assets_aprovados || 1) / (deal.total_assets || 5)) * 100) : 20;

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((i) => i !== extraId) : [...prev, extraId]
    );
  };

  const handleRequestExtras = () => {
    setRequestedSuccess(true);
    setTimeout(() => {
      setShowAddModal(false);
      setRequestedSuccess(false);
      setSelectedExtras([]);
    }, 2500);
  };

  return (
    <div style={{ backgroundColor: "#09090F", color: "#EEEEFF", minHeight: "100vh" }}>
      {/* Toast Floating */}
      {downloadToast && (
        <div style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 1000,
          backgroundColor: "#39FF14", color: "#000", fontWeight: 800, fontSize: 13,
          padding: "14px 22px", borderRadius: 12, boxShadow: "0 8px 30px rgba(57,255,20,0.4)"
        }}>
          {downloadToast}
        </div>
      )}

      {/* Top Banner Exclusivo */}
      <nav style={{ borderBottom: "1px solid #1A1A30", backgroundColor: "#0D0D1A", padding: "16px 32px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#FF0068", borderRadius: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: 5 }}>
              {[0,1,2,3].map((i) => <div key={i} style={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 1 }} />)}
            </div>
            <div>
              <span style={{ fontWeight: 900, fontSize: 16, color: "#EEEEFF" }}>TAGMOB</span>
              <span style={{ fontSize: 10, color: "#39FF14", backgroundColor: "#39FF1415", border: "1px solid #39FF1430", padding: "2px 8px", borderRadius: 12, marginLeft: 10 }}>
                Acesso Exclusivo do Cliente
              </span>
            </div>
          </div>

          <div style={{ fontSize: 12, color: "#7878A0" }}>
            Protocolo: <strong style={{ color: "#00E5FF" }}>#{id}</strong>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "36px 24px 80px" }}>
        {/* Header do Negócio */}
        <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 20, padding: 32, marginBottom: 32, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #FF0068, #00E5FF, #39FF14)" }} />
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#FF0068", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Acompanhamento em Tempo Real
              </span>
              <h1 style={{ fontSize: 32, fontWeight: 900, color: "#EEEEFF", marginTop: 4, letterSpacing: "-0.03em" }}>{title}</h1>
              <p style={{ fontSize: 14, color: "#7878A0", marginTop: 4 }}>
                {construtora} · Gestão Comercial & Ambientalização
              </p>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  backgroundColor: "#FF0068", color: "#fff", border: "none",
                  padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                  cursor: "pointer", boxShadow: "0 4px 20px rgba(255,0,104,0.2)"
                }}
              >
                <Plus size={16} /> Solicitar Adicionais
              </button>
            </div>
          </div>

          {/* Cards de Status */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 28, paddingTop: 24, borderTop: "1px solid #1A1A30" }}>
            <div style={{ background: "#0D0D1A", padding: 16, borderRadius: 12, border: "1px solid #1A1A30" }}>
              <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 4 }}>Etapa Atual</p>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#00E5FF" }}>{faseNome}</p>
            </div>

            <div style={{ background: "#0D0D1A", padding: 16, borderRadius: 12, border: "1px solid #1A1A30" }}>
              <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 4 }}>Progresso Geral</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 6, backgroundColor: "#1A1A30", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progresso}%`, backgroundColor: "#39FF14", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#39FF14" }}>{progresso}%</span>
              </div>
            </div>

            <div style={{ background: "#0D0D1A", padding: 16, borderRadius: 12, border: "1px solid #1A1A30" }}>
              <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 4 }}>Valor do Escopo</p>
              <p style={{ fontSize: 16, fontWeight: 900, color: "#EEEEFF" }}>{formatBRL(valorTotal)}</p>
            </div>
          </div>
        </div>

        {/* Grid de Seções */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          {/* Entregáveis & Pacotes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#EEEEFF", display: "flex", alignItems: "center", gap: 8 }}>
                  <Package size={18} color="#FF0068" /> Pacotes de Entrega Inclusos
                </h3>
                <span style={{ fontSize: 12, color: "#7878A0" }}>Clique em <strong>Ver Material</strong> para baixar os entregáveis</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {DEFAULT_PACKAGES.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 14,
                      padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center",
                      gap: 16, flexWrap: "wrap"
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 260 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <p style={{ fontSize: 15, fontWeight: 800, color: "#EEEEFF" }}>{item.nome}</p>
                        <span style={{
                          fontSize: 10, fontWeight: 800, color: item.cor,
                          backgroundColor: item.cor + "15", border: `1px solid ${item.cor}30`,
                          padding: "2px 8px", borderRadius: 6
                        }}>
                          {item.status}
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: "#7878A0" }}>{item.desc}</p>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                        <span style={{ fontSize: 11, color: "#5A5A7A", display: "flex", alignItems: "center", gap: 4 }}>
                          <FileText size={12} color="#7878A0" /> {item.arquivos.length} arquivos disponíveis
                        </span>
                      </div>
                    </div>

                    {/* Botão Ver Material */}
                    <button
                      onClick={() => setSelectedPackage(item)}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        backgroundColor: "#FF0068", color: "#fff", border: "none",
                        padding: "10px 18px", borderRadius: 10, fontSize: 12, fontWeight: 800,
                        cursor: "pointer", boxShadow: "0 4px 14px rgba(255,0,104,0.2)",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <Download size={14} /> Ver Material
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Atendimento & Suporte Direct */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF", marginBottom: 14 }}>Seu Executivo de Contas</h3>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #1A1A30" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#FF006820", border: "1px solid #FF006840", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#FF0068" }}>
                  TG
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF" }}>Equipe de Vendas TAGMOB</p>
                  <p style={{ fontSize: 11, color: "#7878A0" }}>Atendimento Comercial Dedicado</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a
                  href="https://wa.me/5511968356769"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "12px", borderRadius: 10, backgroundColor: "#39FF14", color: "#000",
                    fontSize: 13, fontWeight: 800, textDecoration: "none"
                  }}
                >
                  <Phone size={14} /> Falar via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Central de Downloads (Ver Material) */}
      {selectedPackage && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(9,9,15,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#111120", border: "2px solid #FF0068", borderRadius: 20, maxWidth: 620, width: "100%", padding: 32, position: "relative" }}>
            <button onClick={() => setSelectedPackage(null)} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", color: "#7878A0", cursor: "pointer" }}>
              <X size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: selectedPackage.cor, backgroundColor: selectedPackage.cor + "15", border: `1px solid ${selectedPackage.cor}30`, padding: "2px 8px", borderRadius: 4 }}>
                {selectedPackage.status}
              </span>
              <span style={{ fontSize: 11, color: "#7878A0" }}>Central de Downloads</span>
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#EEEEFF", marginBottom: 6 }}>{selectedPackage.nome}</h3>
            <p style={{ fontSize: 13, color: "#7878A0", marginBottom: 20 }}>
              {selectedPackage.desc}
            </p>

            {/* Header da lista com botão Baixar Todos */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid #1A1A30" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>
                Arquivos do Pacote ({selectedPackage.arquivos.length})
              </span>

              <button
                onClick={() => triggerDownloadAll(selectedPackage.nome)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, backgroundColor: "#39FF1420",
                  border: "1px solid #39FF1440", color: "#39FF14", padding: "6px 12px",
                  borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: "pointer"
                }}
              >
                <FileArchive size={13} /> Baixar Todos (.ZIP)
              </button>
            </div>

            {/* Lista de Arquivos para Download */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, maxHeight: 320, overflowY: "auto", paddingRight: 4 }}>
              {selectedPackage.arquivos.map((file) => (
                <div
                  key={file.id}
                  style={{
                    background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12,
                    padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: "#FF006815", border: "1px solid #FF006830", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {file.tipo === "pdf" && <FileText size={18} color="#FF0068" />}
                      {file.tipo === "video" && <Video size={18} color="#00E5FF" />}
                      {file.tipo === "image" && <ImageIcon size={18} color="#39FF14" />}
                      {file.tipo === "zip" && <FileArchive size={18} color="#FFB800" />}
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {file.nome}
                      </p>
                      <p style={{ fontSize: 11, color: "#7878A0", marginTop: 1 }}>
                        Formato: <strong>{file.formato}</strong> · {file.tamanho}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => triggerDownload(file.nome)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      backgroundColor: "#FF006815", border: "1px solid #FF006835",
                      color: "#FF0068", padding: "8px 14px", borderRadius: 8,
                      fontSize: 11, fontWeight: 800, cursor: "pointer", flexShrink: 0
                    }}
                  >
                    <Download size={13} /> Baixar
                  </button>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => setSelectedPackage(null)}
                style={{
                  padding: "10px 20px", borderRadius: 10, backgroundColor: "#1A1A30",
                  color: "#EEEEFF", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer"
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Solicitar Adicionais */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(9,9,15,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#111120", border: "2px solid #FF0068", borderRadius: 20, maxWidth: 540, width: "100%", padding: 32, position: "relative" }}>
            <button onClick={() => setShowAddModal(false)} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", color: "#7878A0", cursor: "pointer" }}>
              <X size={18} />
            </button>

            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#EEEEFF", marginBottom: 6 }}>Solicitar Itens Adicionais</h3>
            <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 20 }}>
              Selecione quais módulos extras você deseja integrar ao lançamento do seu empreendimento:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {EXTRA_PACKAGES.map((opt) => {
                const isSel = selectedExtras.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleExtra(opt.id)}
                    style={{
                      background: isSel ? "rgba(57,255,20,0.04)" : "#0D0D1A",
                      border: `1.5px solid ${isSel ? "#39FF14" : "#1A1A30"}`,
                      borderRadius: 12, padding: 14, cursor: "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>{opt.nome}</p>
                      <p style={{ fontSize: 11, color: "#7878A0" }}>{opt.desc}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: isSel ? "#39FF14" : "#EEEEFF" }}>
                        + {formatBRL(opt.preco)}
                      </span>
                      <div style={{
                        width: 18, height: 18, borderRadius: 4,
                        border: `1.5px solid ${isSel ? "#39FF14" : "#2E2E4A"}`,
                        backgroundColor: isSel ? "#39FF14" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        {isSel && <Check size={11} color="#000" strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {requestedSuccess ? (
              <div style={{ padding: 14, borderRadius: 10, backgroundColor: "rgba(57,255,20,0.1)", border: "1px solid #39FF14", textAlign: "center", color: "#39FF14", fontWeight: 800, fontSize: 13 }}>
                ✓ Solicitação enviada! Nossa equipe entrará em contato para incluir os itens.
              </div>
            ) : (
              <button
                onClick={handleRequestExtras}
                disabled={selectedExtras.length === 0}
                style={{
                  width: "100%", padding: 14, borderRadius: 12,
                  backgroundColor: selectedExtras.length > 0 ? "#FF0068" : "#1A1A30",
                  color: selectedExtras.length > 0 ? "#fff" : "#5A5A7A",
                  border: "none", fontSize: 13, fontWeight: 800, cursor: selectedExtras.length > 0 ? "pointer" : "not-allowed"
                }}
              >
                Confirmar Solicitação de Adicionais
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
