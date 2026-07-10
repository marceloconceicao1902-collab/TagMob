"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Lock, Unlock, Download, Share2, FileImage,
  FileText, Sparkles, CheckCircle2, AlertCircle, Image,
  RotateCcw, Cpu, ExternalLink,
} from "lucide-react";
import { MOCK_EMPREENDIMENTOS, getAssetsEmpreendimento } from "@/lib/mock-data";
import type { AssetOS, CampoEditavel } from "@/lib/types";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const TIPO_LABELS: Record<AssetOS["tipo"], string> = {
  INSTAGRAM_POST: "Post Instagram",
  STORY:          "Story",
  BANNER_DIGITAL: "Banner Digital",
  PDF_GRAFICA:    "PDF Gráfica",
  VIDEO_REELS:    "Vídeo Reels",
  ENCARTE:        "Encarte",
};

/* ─── Canvas Preview ──────────────────────────────────────────────────────── */
function CanvasPreview({ asset, campos }: { asset: AssetOS; campos: CampoEditavel[] }) {
  const isStory    = asset.tipo === "STORY";
  const isPortrait = isStory;

  const preco = campos.find((c) => c.tipo === "PRECO")?.valor_atual ?? "";
  const cta   = campos.find((c) => c.tipo === "CTA")?.valor_atual ?? "";
  const texto = campos.find((c) => c.tipo === "TEXTO")?.valor_atual ?? "";

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, background: "#09090F", borderRadius: 12, minHeight: 320,
      position: "relative",
    }}>
      {/* Peça simulada */}
      <div style={{
        width: isPortrait ? 160 : 240,
        height: isPortrait ? 284 : 240,
        borderRadius: 12, overflow: "hidden",
        background: "linear-gradient(135deg, #3D5A3E 0%, #2C2C2C 60%, #1a1a1a 100%)",
        position: "relative",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.8)",
        flexShrink: 0,
      }}>
        {/* Grid overlay bloqueado */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)", pointerEvents: "none" }} />

        {/* Logo bloqueada */}
        <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.08)", borderRadius: 4, padding: "3px 7px" }}>
          <p style={{ fontSize: 8, fontWeight: 900, color: "#EDE8DF", letterSpacing: "0.1em" }}>RESERVA JARDINS</p>
        </div>

        {/* Imagem substituível */}
        <div style={{ position: "absolute", top: isPortrait ? 40 : 30, left: 12, right: 12, height: isPortrait ? 130 : 110, background: "#3D5A3E40", border: "1px dashed rgba(57,255,20,0.4)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <div style={{ textAlign: "center" }}>
            <Image size={16} color="#39FF1480" style={{ margin: "0 auto 4px" }} />
            <p style={{ fontSize: 8, color: "#39FF1480" }}>Substituível</p>
          </div>
        </div>

        {/* Conteúdo dinâmico */}
        <div style={{ position: "absolute", bottom: isPortrait ? 50 : 40, left: 12, right: 12 }}>
          {preco && (
            <div style={{ background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "4px 8px", marginBottom: 4, display: "inline-block" }}>
              <p style={{ fontSize: 8, color: "#EDE8DF80" }}>A partir de</p>
              <p style={{ fontSize: 11, fontWeight: 900, color: "#EDE8DF", letterSpacing: "-0.02em" }}>{preco}</p>
            </div>
          )}
          {texto && (
            <p style={{ fontSize: 8, color: "#EDE8DFB0", lineHeight: 1.4 }}>{texto}</p>
          )}
        </div>

        {/* CTA bloqueado na estrutura, mas texto editável */}
        {cta && (
          <div style={{ position: "absolute", bottom: 10, left: 12, right: 12, background: "#3D5A3E", borderRadius: 6, padding: "5px 10px", textAlign: "center" }}>
            <p style={{ fontSize: 9, fontWeight: 800, color: "#EDE8DF", letterSpacing: "0.05em" }}>{cta}</p>
          </div>
        )}
      </div>

      {/* Badge bloqueado */}
      <div style={{ position: "absolute", top: 8, right: 8, display: "flex", alignItems: "center", gap: 5, background: "rgba(255,0,104,0.12)", border: "1px solid rgba(255,0,104,0.3)", borderRadius: 6, padding: "4px 8px" }}>
        <Lock size={10} color="#FF0068" />
        <span style={{ fontSize: 9, color: "#FF0068", fontWeight: 700 }}>Grid e tipografia bloqueados</span>
      </div>
    </div>
  );
}

/* ─── Campo de Edição ─────────────────────────────────────────────────────── */
function CampoEdicao({
  campo,
  valor,
  onChange,
}: {
  campo: CampoEditavel;
  valor: string;
  onChange: (v: string) => void;
}) {
  const labelColors: Record<CampoEditavel["tipo"], string> = {
    PRECO:   "#39FF14",
    TEXTO:   "#00E5FF",
    CTA:     "#FFB800",
    IMAGEM:  "#8B5CF6",
  };
  const color = labelColors[campo.tipo] ?? "#7878A0";
  const chars = valor.length;
  const max   = campo.max_chars ?? 100;

  if (campo.tipo === "IMAGEM") {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#EEEEFF" }}>{campo.label}</p>
          <span style={{ fontSize: 10, color, backgroundColor: color + "18", padding: "1px 6px", borderRadius: 3 }}>IMAGEM</span>
        </div>
        <div style={{ border: "1px dashed rgba(139,92,246,0.4)", borderRadius: 8, padding: 16, textAlign: "center", cursor: "pointer", background: "rgba(139,92,246,0.04)" }}>
          <Image size={18} color="#8B5CF680" style={{ margin: "0 auto 6px" }} />
          <p style={{ fontSize: 11, color: "#3A3A5C" }}>Selecionar da biblioteca aprovada</p>
        </div>
        <p style={{ fontSize: 10, color: "#2E2E4A", marginTop: 4 }}>Somente imagens aprovadas pela agência</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#EEEEFF" }}>{campo.label}</p>
        <span style={{ fontSize: 10, color, backgroundColor: color + "18", padding: "1px 6px", borderRadius: 3, fontWeight: 700 }}>
          {campo.tipo}
        </span>
      </div>
      <textarea
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        maxLength={max}
        rows={2}
        style={{
          width: "100%", padding: "10px 12px", borderRadius: 8,
          background: "#111120", border: `1px solid ${color}35`,
          color: "#EEEEFF", fontSize: 13, fontFamily: "inherit",
          resize: "none", outline: "none", boxSizing: "border-box",
          lineHeight: 1.5,
        }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
        <span style={{ fontSize: 10, color: chars > max * 0.9 ? "#FFB800" : "#3A3A5C" }}>
          {chars}/{max}
        </span>
      </div>
    </div>
  );
}

/* ─── Área de ativos bloqueados ───────────────────────────────────────────── */
function LockedAssets() {
  const items = [
    { label: "Grid e diagramação",       icon: Lock },
    { label: "Fontes e tipografia",       icon: Lock },
    { label: "Paleta hexadecimal",        icon: Lock },
    { label: "Logomarca",                 icon: Lock },
    { label: "Tom de voz institucional",  icon: Lock },
    { label: "Manifesto",                 icon: Lock },
  ];
  return (
    <div style={{ background: "#0D0D1A", border: "1px solid rgba(255,0,104,0.15)", borderRadius: 10, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
        <Lock size={12} color="#FF0068" />
        <p style={{ fontSize: 11, fontWeight: 700, color: "#FF0068", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Propriedade Intelectual — Bloqueado
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.5 }}>
            <item.icon size={10} color="#FF0068" />
            <span style={{ fontSize: 11, color: "#7878A0" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Export Actions ──────────────────────────────────────────────────────── */
function ExportPanel({ assetNome }: { assetNome: string }) {
  const [exported, setExported] = useState<string | null>(null);

  function handleExport(tipo: string) {
    setExported(tipo);
    setTimeout(() => setExported(null), 2500);
  }

  const acoes = [
    { label: "Gerar um post",           icon: Sparkles,  color: "#FF0068", tipo: "POST" },
    { label: "Trocar uma foto",          icon: Image,     color: "#39FF14", tipo: "FOTO" },
    { label: "Atualizar um preço",      icon: Lock,      color: "#FFB800", tipo: "PRECO" },
    { label: "Montar um folder",        icon: FileText,  color: "#00E5FF", tipo: "FOLDER" },
    { label: "Baixar um vídeo",         icon: ExternalLink, color: "#8B5CF6", tipo: "VIDEO" },
    { label: "Exportar em PDF",         icon: FileText,  color: "#FF0068", tipo: "PDF" },
    { label: "Gerar JPG",                icon: FileImage, color: "#39FF14", tipo: "JPG" },
    { label: "Publicar nas redes sociais", icon: Share2,  color: "#00E5FF", tipo: "REDES" },
    { label: "Compartilhar com fornecedores", icon: Download, color: "#8B5CF6", tipo: "FORNECEDORES" },
    { label: "Disponibilizar para imobiliárias e corretores", icon: Share2, color: "#39FF14", tipo: "CORRETORES" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
        Ações de Autonomia do Cliente
      </p>
      {acoes.map((action) => (
        <button
          key={action.tipo}
          onClick={() => handleExport(action.tipo)}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 8, cursor: "pointer", width: "100%",
            background: exported === action.tipo ? action.color + "20" : "#111120",
            border: `1px solid ${exported === action.tipo ? action.color + "50" : "#1A1A30"}`,
            color: exported === action.tipo ? action.color : "#EEEEFF",
            fontSize: 12, fontWeight: 600, textAlign: "left",
            transition: "all 0.2s",
          }}
        >
          {exported === action.tipo
            ? <CheckCircle2 size={14} color={action.color} />
            : <action.icon size={14} color={exported === action.tipo ? action.color : action.color} />
          }
          {exported === action.tipo ? "Executado!" : action.label}
        </button>
      ))}
    </div>
  );
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function AutonomiaPage() {
  const empId   = "emp-001";
  const emp     = MOCK_EMPREENDIMENTOS.find((e) => e.id === empId)!;
  const approved = getAssetsEmpreendimento(empId).filter((a) => a.status === "APROVADO");

  const [selectedAsset, setSelectedAsset]   = useState<AssetOS>(approved[0]);
  const [camposValues, setCamposValues]     = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    approved[0]?.campos_editaveis.forEach((c) => { init[c.id] = c.valor_atual; });
    return init;
  });
  const [aiPrompt, setAiPrompt]             = useState("");
  const [aiResponse, setAiResponse]         = useState<string | null>(null);
  const [aiLoading, setAiLoading]           = useState(false);
  const [hasChanges, setHasChanges]         = useState(false);

  function selectAsset(asset: AssetOS) {
    setSelectedAsset(asset);
    const init: Record<string, string> = {};
    asset.campos_editaveis.forEach((c) => { init[c.id] = c.valor_atual; });
    setCamposValues(init);
    setHasChanges(false);
  }

  function handleCampoChange(id: string, value: string) {
    setCamposValues((prev) => ({ ...prev, [id]: value }));
    setHasChanges(true);
  }

  function handleReset() {
    const init: Record<string, string> = {};
    selectedAsset.campos_editaveis.forEach((c) => { init[c.id] = c.valor_atual; });
    setCamposValues(init);
    setHasChanges(false);
  }

  function handleAiSubmit() {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    setTimeout(() => {
      setAiLoading(false);
      setAiResponse(
        `**Copy gerada pela IA (base: Manifesto + Tom de Voz):**\n\nHá lugares que não se encontram. Se reservam.\n\nReserva Jardins — ${aiPrompt.includes("investidor") ? "sua decisão mais inteligente de 2024. Rentabilidade acima de 8% a.a. em um dos endereços mais valorizados de São Paulo." : "onde cada detalhe foi cuidado para que o extraordinário pareça natural."}\n\nA partir de R$ 2.400.000 · Apenas 4 aptos por andar\n\n#ReservaJardins #AltoTadrão #SãoPaulo`
      );
    }, 1800);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "#09090F" }}>

      {/* Header */}
      <div style={{ padding: "12px 20px", borderBottom: "1px solid #1A1A30", background: "#0D0D1A", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <Link href={`/tagmob-os/${empId}`} style={{ display: "flex", alignItems: "center", gap: 6, color: "#7878A0", textDecoration: "none", fontSize: 13, flexShrink: 0 }}>
          <ArrowLeft size={14} /> {emp.nome}
        </Link>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.25)", borderRadius: 9 }}>
          <Unlock size={14} color="#39FF14" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#39FF14" }}>Autonomia do Cliente</span>
          <span style={{ fontSize: 10, color: "#39FF1480" }}>Editor Restrito</span>
        </div>
        {hasChanges && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#FFB800" }}>
            <AlertCircle size={12} />
            Alterações não salvas
          </div>
        )}
        {hasChanges && (
          <button
            onClick={handleReset}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "transparent", border: "1px solid #1A1A30", color: "#7878A0", fontSize: 12, cursor: "pointer" }}
          >
            <RotateCcw size={12} /> Reverter
          </button>
        )}
        {hasChanges && (
          <button
            onClick={() => setHasChanges(false)}
            style={{ padding: "7px 16px", borderRadius: 8, background: "#39FF14", border: "none", color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          >
            <CheckCircle2 size={14} /> Salvar Versão
          </button>
        )}
      </div>

      {/* Corpo */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Lista de peças aprovadas */}
        <div style={{ width: 220, borderRight: "1px solid #1A1A30", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto", background: "#0D0D1A" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid #1A1A30" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Biblioteca Aprovada ({approved.length})
            </p>
          </div>
          <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 2 }}>
            {approved.map((asset) => (
              <button
                key={asset.id}
                onClick={() => selectAsset(asset)}
                style={{
                  background: selectedAsset.id === asset.id ? "#39FF1410" : "transparent",
                  border: `1px solid ${selectedAsset.id === asset.id ? "#39FF1430" : "transparent"}`,
                  borderRadius: 8, padding: "10px 12px", cursor: "pointer", textAlign: "left", width: "100%",
                }}
              >
                <p style={{ fontSize: 12, fontWeight: 600, color: "#EEEEFF", marginBottom: 2 }}>{asset.nome}</p>
                <p style={{ fontSize: 10, color: "#3A3A5C" }}>{TIPO_LABELS[asset.tipo]} · {asset.dimensoes}</p>
                <p style={{ fontSize: 10, color: "#39FF14", marginTop: 2 }}>
                  {asset.campos_editaveis.length} campo{asset.campos_editaveis.length !== 1 ? "s" : ""} editável{asset.campos_editaveis.length !== 1 ? "is" : ""}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas de Preview */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Toolbar do canvas */}
          <div style={{ padding: "8px 16px", borderBottom: "1px solid #1A1A30", background: "#0D0D1A", display: "flex", alignItems: "center", gap: 8 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", flex: 1 }}>{selectedAsset.nome}</p>
            <span style={{ fontSize: 10, color: "#7878A0" }}>{selectedAsset.dimensoes}</span>
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <CanvasPreview
              asset={selectedAsset}
              campos={selectedAsset.campos_editaveis.map((c) => ({ ...c, valor_atual: camposValues[c.id] ?? c.valor_atual }))}
            />
          </div>
        </div>

        {/* Painel direito: campos editáveis + export */}
        <div style={{ width: 300, borderLeft: "1px solid #1A1A30", display: "flex", flexDirection: "column", overflowY: "auto", flexShrink: 0 }}>

          {/* Campos editáveis */}
          <div style={{ padding: 16, borderBottom: "1px solid #1A1A30", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Unlock size={13} color="#39FF14" />
              <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>Campos editáveis</p>
            </div>

            {selectedAsset.campos_editaveis.map((campo) => (
              <CampoEdicao
                key={campo.id}
                campo={campo}
                valor={camposValues[campo.id] ?? campo.valor_atual}
                onChange={(v) => handleCampoChange(campo.id, v)}
              />
            ))}
          </div>

          {/* Bloqueados */}
          <div style={{ padding: 16, borderBottom: "1px solid #1A1A30" }}>
            <LockedAssets />
          </div>

          {/* Export */}
          <div style={{ padding: 16, borderBottom: "1px solid #1A1A30" }}>
            <ExportPanel assetNome={selectedAsset.nome} />
          </div>

          {/* IA Contextual */}
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
              <Cpu size={13} color="#FF0068" />
              <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF" }}>IA Contextual</p>
              <span style={{ fontSize: 9, color: "#FF006890", fontStyle: "italic" }}>RAG</span>
            </div>

            {aiResponse ? (
              <div style={{ background: "#111120", border: "1px solid rgba(255,0,104,0.2)", borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <p style={{ fontSize: 11, color: "#EEEEFF", lineHeight: 1.7, whiteSpace: "pre-line" }}>{aiResponse}</p>
                <button
                  onClick={() => setAiResponse(null)}
                  style={{ marginTop: 8, fontSize: 11, color: "#FF0068", background: "transparent", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }}
                >
                  Gerar nova versão →
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={`"Crie um post para investidores no Instagram"`}
                  rows={3}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#111120", border: "1px solid #1A1A30", color: "#EEEEFF", fontSize: 12, fontFamily: "inherit", resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.5, fontStyle: aiPrompt ? "normal" : "italic" }}
                />
                <button
                  onClick={handleAiSubmit}
                  disabled={aiLoading || !aiPrompt.trim()}
                  style={{ padding: "9px", borderRadius: 8, background: aiLoading ? "#1A1A30" : "#FF0068", border: "none", color: aiLoading ? "#3A3A5C" : "#fff", fontSize: 12, fontWeight: 700, cursor: aiLoading || !aiPrompt.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                >
                  {aiLoading ? (
                    <><Sparkles size={13} /> Gerando com contexto do empreendimento…</>
                  ) : (
                    <><Sparkles size={13} /> Gerar com IA</>
                  )}
                </button>
                <p style={{ fontSize: 10, color: "#2E2E4A", lineHeight: 1.6 }}>
                  A IA usa exclusivamente o Manifesto, Tom de Voz e Assets aprovados deste empreendimento.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
