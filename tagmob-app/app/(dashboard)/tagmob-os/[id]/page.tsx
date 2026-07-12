import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, CheckCircle2, Clock, Sparkles, FileText,
  Palette, ShieldCheck, Database, Unlock, ArrowRight,
  ExternalLink, MessageSquare, AlertCircle, Cpu,
} from "lucide-react";
import {
  getEmpreendimento, getAssetsEmpreendimento,
  getEstrategia, getDesignSystem,
} from "@/lib/mock-data";
import { OS_FASES } from "@/lib/types";
import type { OSFase } from "@/lib/types";

/* ─── Stepper ───────────────────────────────────────────────────────────────── */
function Stepper({ faseAtual, emId }: { faseAtual: OSFase; emId: string }) {
  const FASE_HREFS: Record<OSFase, string> = {
    1: `/tagmob-os/${emId}`,
    2: `/tagmob-os/${emId}`,
    3: `/tagmob-os/${emId}/aprovacao`,
    4: `/tagmob-os/${emId}`,
    5: `/tagmob-os/${emId}/autonomia`,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 4 }}>
      {OS_FASES.map((fase, idx) => {
        const done    = fase.num < faseAtual;
        const current = fase.num === faseAtual;
        const future  = fase.num > faseAtual;

        return (
          <div key={fase.num} style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
            <Link
              href={future ? "#" : FASE_HREFS[fase.num]}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 16px", borderRadius: 10,
                backgroundColor: current ? fase.cor + "15" : done ? "#111120" : "transparent",
                border: `1px solid ${current ? fase.cor + "50" : done ? "#1A1A30" : "transparent"}`,
                cursor: future ? "not-allowed" : "pointer",
                transition: "all 0.15s",
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, flexShrink: 0,
                  backgroundColor: done ? fase.cor + "25" : current ? fase.cor + "20" : "#1A1A30",
                  border: `1px solid ${done ? fase.cor + "50" : current ? fase.cor + "40" : "#282840"}`,
                  color: done || current ? fase.cor : "#3A3A5C",
                }}>
                  {done ? "✓" : String(fase.num).padStart(2, "0")}
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: current ? 700 : done ? 600 : 400, color: current ? fase.cor : done ? "#EEEEFF" : "#3A3A5C", lineHeight: 1, whiteSpace: "nowrap" }}>
                    {fase.label}
                  </p>
                  {current && (
                    <p style={{ fontSize: 10, color: fase.cor + "90", marginTop: 1, whiteSpace: "nowrap" }}>
                      Etapa atual
                    </p>
                  )}
                </div>
              </div>
            </Link>
            {idx < OS_FASES.length - 1 && (
              <div style={{ width: 24, height: 1, backgroundColor: fase.num < faseAtual ? fase.cor + "30" : "#1A1A30", flexShrink: 0, margin: "0 2px" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Módulo de Estratégia ──────────────────────────────────────────────────── */
function ModuloEstrategia({ emId }: { emId: string }) {
  const estrategia = getEstrategia(emId);

  if (!estrategia) {
    return (
      <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 32, textAlign: "center" }}>
        <p style={{ fontSize: 14, color: "#7878A0" }}>Estratégia ainda não preenchida.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {[
        { label: "Pesquisa de Mercado",  icon: FileText,       valor: estrategia.pesquisa_mercado, cor: "#FF0068"  },
        { label: "Naming",               icon: Sparkles,       valor: estrategia.naming,           cor: "#8B5CF6"  },
        { label: "Conceito Criativo",    icon: Sparkles,       valor: estrategia.conceito_criativo, cor: "#00E5FF" },
        { label: "Manifesto",            icon: FileText,       valor: estrategia.manifesto,         cor: "#39FF14" },
      ].map((item) => (
        <div key={item.label} style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: item.cor + "18", border: `1px solid ${item.cor}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <item.icon size={14} color={item.cor} />
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#7878A0", letterSpacing: "0.04em", textTransform: "uppercase" }}>{item.label}</p>
          </div>
          <p style={{ fontSize: 14, color: "#EEEEFF", lineHeight: 1.75, whiteSpace: "pre-line" }}>{item.valor}</p>
        </div>
      ))}

      {/* Tom de Voz */}
      <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#7878A0", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>Tom de Voz</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {estrategia.tom_de_voz.map((t) => (
            <span key={t} style={{ fontSize: 13, color: "#FF0068", background: "#FF006812", border: "1px solid #FF006825", padding: "4px 12px", borderRadius: 20 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Argumentos de Venda */}
      <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#7878A0", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>Argumentos de Venda</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {estrategia.argumentos_venda.map((arg, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: "#39FF14", marginTop: 6, flexShrink: 0 }} />
              <p style={{ fontSize: 14, color: "#EEEEFF" }}>{arg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Módulo de Criação (Design System) ─────────────────────────────────────── */
function ModuloCriacao({ emId }: { emId: string }) {
  const ds = getDesignSystem(emId);

  if (!ds) {
    return (
      <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 32, textAlign: "center" }}>
        <p style={{ fontSize: 14, color: "#7878A0" }}>Design System em construção.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Key Visual */}
      <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#7878A0", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 10 }}>Key Visual</p>
        <p style={{ fontSize: 14, color: "#EEEEFF", lineHeight: 1.7 }}>{ds.key_visual_descricao}</p>
      </div>

      {/* Paleta */}
      <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#7878A0", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14 }}>
          Paleta de Cores — Propriedade Intelectual TAGMOB
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {ds.paleta_cores.map((cor) => (
            <div key={cor.hex} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, backgroundColor: cor.hex, border: "1px solid rgba(255,255,255,0.06)" }} />
              <p style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF", textAlign: "center" }}>{cor.nome}</p>
              <p style={{ fontSize: 10, color: "#7878A0", fontFamily: "monospace" }}>{cor.hex}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "8px 12px", background: "rgba(255,0,104,0.05)", border: "1px solid rgba(255,0,104,0.2)", borderRadius: 8, display: "flex", gap: 8, alignItems: "center" }}>
          <ShieldCheck size={12} color="#FF0068" />
          <p style={{ fontSize: 11, color: "#FF0068" }}>Hexadecimais bloqueados para edição pelo cliente</p>
        </div>
      </div>

      {/* Tipografia */}
      <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#7878A0", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14 }}>Tipografia</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ds.fontes.map((fonte) => (
            <div key={fonte.nome} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF" }}>{fonte.nome}</p>
              <p style={{ fontSize: 12, color: "#7878A0", textAlign: "right" }}>{fonte.uso}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Módulo de Organização ─────────────────────────────────────────────────── */
function ModuloOrganizacao({ emId }: { emId: string }) {
  const assets = getAssetsEmpreendimento(emId).filter((a) => a.status === "APROVADO");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: 16, background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 12, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Database size={16} color="#00E5FF" style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 4 }}>Engine de Indexação Ativa</p>
          <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.6 }}>
            Todas as {assets.length} peças aprovadas estão indexadas e interconectadas. A alteração de uma variável (preço, metragem, CTA) atualiza automaticamente todas as peças vinculadas à campanha.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { label: "Peças indexadas",       value: assets.length,     color: "#00E5FF" },
          { label: "Variáveis monitoradas", value: assets.reduce((s, a) => s + a.campos_editaveis.length, 0), color: "#39FF14" },
          { label: "Categorias",            value: 5,                  color: "#FFB800" },
          { label: "Última sync",           value: "agora",            color: "#8B5CF6" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 10, padding: "12px 16px" }}>
            <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid #1A1A30", backgroundColor: "#0D0D1A" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#3A3A5C", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Biblioteca de Peças Aprovadas
          </p>
        </div>
        {assets.map((asset, idx) => (
          <div key={asset.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderBottom: idx < assets.length - 1 ? "1px solid #1A1A30" : "none" }}>
            <div style={{ width: 36, height: 28, borderRadius: 6, backgroundColor: "#1A1A30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Palette size={14} color="#3A3A5C" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#EEEEFF" }}>{asset.nome}</p>
              <p style={{ fontSize: 11, color: "#3A3A5C" }}>{asset.dimensoes} · {asset.campos_editaveis.length} variável{asset.campos_editaveis.length !== 1 ? "s" : ""}</p>
            </div>
            <CheckCircle2 size={14} color="#39FF14" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */
export default async function EmpreendimentoWorkspace({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const emp = getEmpreendimento(id);
  if (!emp) notFound();

  const faseInfo  = OS_FASES.find((f) => f.num === emp.fase_atual)!;
  const allAssets = getAssetsEmpreendimento(id);
  const pendentes = allAssets.filter((a) => a.status === "AGUARDANDO_AGENCIA" || a.status === "AGUARDANDO_CLIENTE");

  const MODULO_ICONS = {
    1: Sparkles,
    2: Palette,
    3: ShieldCheck,
    4: Database,
    5: Unlock,
  } as Record<number, React.ComponentType<{ size?: number; color?: string }>>;

  return (
    <div style={{ padding: "32px 32px 64px", maxWidth: 1100, margin: "0 auto" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, fontSize: 13, color: "#7878A0" }}>
        <Link href="/tagmob-os" style={{ display: "flex", alignItems: "center", gap: 6, color: "#7878A0", textDecoration: "none" }}>
          <ArrowLeft size={14} /> TAGMOB OS
        </Link>
        <span style={{ color: "#2E2E4A" }}>/</span>
        <span style={{ color: "#EEEEFF" }}>{emp.nome}</span>
      </div>

      {/* Header do empreendimento */}
      <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, padding: 24, marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: emp.cor_tema, opacity: 0.7 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 10px", backgroundColor: faseInfo.cor + "18", border: `1px solid ${faseInfo.cor}35`, borderRadius: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: faseInfo.cor }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: faseInfo.cor, letterSpacing: "0.04em" }}>
                  {String(emp.fase_atual).padStart(2, "0")}. {faseInfo.label}
                </span>
              </div>
              <span style={{ fontSize: 11, color: "#7878A0" }}>{emp.tipo}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: emp.plano === "ENTERPRISE" ? "#FFB800" : emp.plano === "PRO" ? "#8B5CF6" : "#7878A0", backgroundColor: (emp.plano === "ENTERPRISE" ? "#FFB800" : emp.plano === "PRO" ? "#8B5CF6" : "#7878A0") + "18", padding: "2px 7px", borderRadius: 4, border: "1px solid currentcolor" }}>
                {emp.plano}
              </span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.03em", color: "#EEEEFF", marginBottom: 4 }}>{emp.nome}</h1>
            <p style={{ fontSize: 14, color: "#7878A0" }}>{emp.construtora} · {emp.bairro}, {emp.cidade}</p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {pendentes.length > 0 && (
              <Link href={`/tagmob-os/${id}/aprovacao`} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800", padding: "9px 16px", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                <AlertCircle size={14} />
                {pendentes.length} pendente{pendentes.length > 1 ? "s" : ""} de aprovação
              </Link>
            )}
            <Link href={`/tagmob-os/${id}/pipeline`} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)", color: "#00E5FF", padding: "9px 16px", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              <Cpu size={14} />
              Pipeline de Peças
            </Link>
            <Link href={`/tagmob-os/${id}/autonomia`} style={{ display: "flex", alignItems: "center", gap: 7, backgroundColor: "#39FF14", color: "#000", padding: "9px 16px", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              <Unlock size={14} />
              Editor do Cliente
            </Link>
          </div>
        </div>
      </div>

      {/* Stepper horizontal */}
      <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: "12px 16px", marginBottom: 28, overflowX: "auto" }}>
        <Stepper faseAtual={emp.fase_atual} emId={id} />
      </div>

      {/* Layout 2 colunas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>

        {/* Conteúdo da fase atual */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: faseInfo.cor + "18", border: `1px solid ${faseInfo.cor}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {(() => { const Icon = MODULO_ICONS[emp.fase_atual]; return <Icon size={18} color={faseInfo.cor} />; })()}
            </div>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.02em" }}>
                {String(emp.fase_atual).padStart(2, "0")}. {faseInfo.label}
              </h2>
              <p style={{ fontSize: 12, color: "#7878A0" }}>{faseInfo.descricao}</p>
            </div>
          </div>

          {emp.fase_atual === 1 && <ModuloEstrategia emId={id} />}
          {emp.fase_atual === 2 && <ModuloCriacao emId={id} />}
          {emp.fase_atual === 3 && (
            <div style={{ textAlign: "center", padding: 40, background: "#111120", border: "1px solid #1A1A30", borderRadius: 12 }}>
              <ShieldCheck size={32} color="#FFB800" style={{ marginBottom: 12 }} />
              <p style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", marginBottom: 8 }}>Módulo de Aprovação</p>
              <p style={{ fontSize: 13, color: "#7878A0", marginBottom: 20 }}>{pendentes.length} peças aguardando aprovação no Gatekeeper.</p>
              <Link href={`/tagmob-os/${id}/aprovacao`} style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#FFB800", color: "#000", padding: "10px 20px", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                Abrir Gatekeeper <ArrowRight size={14} />
              </Link>
            </div>
          )}
          {emp.fase_atual === 4 && <ModuloOrganizacao emId={id} />}
          {emp.fase_atual === 5 && (
            <div style={{ textAlign: "center", padding: 40, background: "#111120", border: "1px solid #1A1A30", borderRadius: 12 }}>
              <Unlock size={32} color="#39FF14" style={{ marginBottom: 12 }} />
              <p style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", marginBottom: 8 }}>Autonomia ativa</p>
              <p style={{ fontSize: 13, color: "#7878A0", marginBottom: 20 }}>O cliente já tem acesso ao editor restrito com todas as {allAssets.filter((a) => a.status === "APROVADO").length} peças aprovadas.</p>
              <Link href={`/tagmob-os/${id}/autonomia`} style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#39FF14", color: "#000", padding: "10px 20px", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                Abrir Editor do Cliente <ExternalLink size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Coluna lateral */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Engine de IA Contextual */}
          <div style={{ background: "#111120", border: "1px solid rgba(255,0,104,0.25)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #1A1A30", background: "rgba(255,0,104,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
              <Cpu size={15} color="#FF0068" />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>Engine IA Contextual</p>
                <p style={{ fontSize: 10, color: "#7878A0" }}>RAG — consome Estratégia + Design System</p>
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <p style={{ fontSize: 12, color: "#7878A0", marginBottom: 6 }}>Contexto carregado:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    { label: "Manifesto",        ok: true  },
                    { label: "Tom de voz",        ok: true  },
                    { label: "Argumentos venda",  ok: true  },
                    { label: "Key Visual",        ok: emp.criacao_completa },
                    { label: "Paleta de cores",   ok: emp.criacao_completa },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: item.ok ? "#39FF14" : "#2E2E4A", flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: item.ok ? "#EEEEFF" : "#3A3A5C" }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input de prompt */}
              <div>
                <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px", marginBottom: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <MessageSquare size={13} color="#3A3A5C" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: "#3A3A5C", fontStyle: "italic" }}>
                    "Crie um post para investidores no Instagram"
                  </p>
                </div>
                <button style={{ width: "100%", padding: "9px", borderRadius: 8, backgroundColor: "#FF0068", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Sparkles size={13} />
                  Gerar com IA
                </button>
              </div>

              <p style={{ fontSize: 10, color: "#2E2E4A", marginTop: 8, textAlign: "center", lineHeight: 1.5 }}>
                A IA usa o Manifesto, Tom de Voz e Key Visual deste empreendimento como base exclusiva de contexto.
              </p>
            </div>
          </div>

          {/* Assets */}
          <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #1A1A30", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF" }}>Pipeline de Peças</p>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Link href={`/tagmob-os/${id}/gargalo`} style={{ fontSize: 11, color: "#FFB800", textDecoration: "none", fontWeight: 600 }}>
                  Gargalo Agência →
                </Link>
                <span style={{ color: "#2E2E4A", fontSize: 10 }}>|</span>
                <Link href={`/tagmob-os/${id}/aprovacao`} style={{ fontSize: 11, color: "#FF0068", textDecoration: "none", fontWeight: 600 }}>
                  Gatekeeper →
                </Link>
              </div>
            </div>
            <div style={{ padding: "8px 0" }}>
              {[
                { label: "Aprovadas",          value: allAssets.filter((a) => a.status === "APROVADO").length,           color: "#39FF14" },
                { label: "Ag. cliente",         value: allAssets.filter((a) => a.status === "AGUARDANDO_CLIENTE").length, color: "#FFB800" },
                { label: "Ag. agência",         value: allAssets.filter((a) => a.status === "AGUARDANDO_AGENCIA").length, color: "#FF0068" },
                { label: "Rascunho",            value: allAssets.filter((a) => a.status === "RASCUNHO").length,           color: "#3A3A5C" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#7878A0" }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: item.value > 0 ? item.color : "#2E2E4A" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
