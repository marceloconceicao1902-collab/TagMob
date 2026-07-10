import Link from "next/link";
import { Plus, Cpu, CheckCircle2, Clock, AlertCircle, Play, ArrowRight, Lock } from "lucide-react";
import { MOCK_EMPREENDIMENTOS } from "@/lib/mock-data";
import { OS_FASES } from "@/lib/types";
import type { Empreendimento, OSFase } from "@/lib/types";

/* ─── Status Badge ─────────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: Empreendimento["status"] }) {
  const cfg = {
    EM_ANDAMENTO: { label: "Em andamento", color: "#00E5FF" },
    APROVADO:     { label: "Aprovado",      color: "#39FF14" },
    PUBLICADO:    { label: "Publicado",     color: "#39FF14" },
    PAUSADO:      { label: "Pausado",       color: "#7878A0" },
  };
  const { label, color } = cfg[status];
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color, backgroundColor: color + "18", border: `1px solid ${color}35`, padding: "2px 8px", borderRadius: 20 }}>
      {label}
    </span>
  );
}

/* ─── Plano Badge ──────────────────────────────────────────────────────────── */
function PlanoBadge({ plano }: { plano: Empreendimento["plano"] }) {
  const cfg = {
    STARTER:    { color: "#7878A0" },
    PRO:        { color: "#8B5CF6" },
    ENTERPRISE: { color: "#FFB800" },
  };
  const { color } = cfg[plano];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color, backgroundColor: color + "18", border: `1px solid ${color}25`, padding: "2px 7px", borderRadius: 4, letterSpacing: "0.06em" }}>
      {plano}
    </span>
  );
}

/* ─── Stepper mini ─────────────────────────────────────────────────────────── */
function StepperMini({ faseAtual }: { faseAtual: OSFase }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {([1, 2, 3, 4, 5] as OSFase[]).map((num) => {
        const done    = num < faseAtual;
        const current = num === faseAtual;
        const fase    = OS_FASES.find((f) => f.num === num)!;
        return (
          <div key={num} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              title={fase.label}
              style={{
                width: 20, height: 20, borderRadius: 5,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 800,
                backgroundColor: done ? fase.cor + "30" : current ? fase.cor + "25" : "#1A1A30",
                border: `1px solid ${done ? fase.cor + "60" : current ? fase.cor + "50" : "#282840"}`,
                color: done || current ? fase.cor : "#3A3A5C",
                flexShrink: 0,
              }}
            >
              {done ? "✓" : num}
            </div>
            {num < 5 && (
              <div style={{ width: 12, height: 1, backgroundColor: done ? fase.cor + "40" : "#1A1A30" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Card do Empreendimento ───────────────────────────────────────────────── */
function EmpreendimentoCard({ emp }: { emp: Empreendimento }) {
  const faseInfo = OS_FASES.find((f) => f.num === emp.fase_atual)!;
  const progressoAprovacao = emp.total_assets > 0
    ? Math.round((emp.assets_aprovados / emp.total_assets) * 100)
    : 0;

  return (
    <Link
      href={`/tagmob-os/${emp.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div style={{
        background: "#111120", border: "1px solid #1A1A30", borderRadius: 14,
        overflow: "hidden", transition: "border-color 0.15s",
        position: "relative",
      }}>
        {/* Barra de cor do tema */}
        <div style={{ height: 3, backgroundColor: emp.cor_tema, opacity: 0.7 }} />

        {/* Thumbnail placeholder */}
        <div style={{
          height: 120, backgroundColor: emp.cor_tema + "08",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderBottom: "1px solid #1A1A30", position: "relative",
        }}>
          <div style={{
            fontSize: 32, fontWeight: 900, color: emp.cor_tema + "30",
            letterSpacing: "-0.04em", textTransform: "uppercase",
          }}>
            {emp.nome.split(" ").map((w) => w[0]).join("").slice(0, 3)}
          </div>

          {/* Fase atual badge */}
          <div style={{
            position: "absolute", bottom: 10, right: 10,
            display: "flex", alignItems: "center", gap: 5,
            backgroundColor: faseInfo.cor + "20", border: `1px solid ${faseInfo.cor}40`,
            borderRadius: 20, padding: "3px 8px",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: faseInfo.cor }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: faseInfo.cor, letterSpacing: "0.04em" }}>
              {String(emp.fase_atual).padStart(2, "0")}. {faseInfo.label}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", marginBottom: 2 }}>{emp.nome}</h3>
              <p style={{ fontSize: 12, color: "#7878A0" }}>{emp.construtora} · {emp.bairro}</p>
            </div>
            <PlanoBadge plano={emp.plano} />
          </div>

          {/* Stepper mini */}
          <div style={{ marginBottom: 12 }}>
            <StepperMini faseAtual={emp.fase_atual} />
          </div>

          {/* Progress de assets (só se tiver assets) */}
          {emp.total_assets > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "#7878A0" }}>Peças aprovadas</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF" }}>
                  {emp.assets_aprovados}/{emp.total_assets}
                </span>
              </div>
              <div style={{ height: 3, borderRadius: 2, backgroundColor: "#1A1A30", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progressoAprovacao}%`, backgroundColor: faseInfo.cor, borderRadius: 2 }} />
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <StatusBadge status={emp.status} />
            {emp.assets_pendentes > 0 && (
              <span style={{ fontSize: 11, color: "#FFB800", display: "flex", alignItems: "center", gap: 4 }}>
                <AlertCircle size={11} />
                {emp.assets_pendentes} pendente{emp.assets_pendentes > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */
export default function TagmobOSHub() {
  const totalPendentes = MOCK_EMPREENDIMENTOS.reduce((s, e) => s + e.assets_pendentes, 0);
  const totalAprovados = MOCK_EMPREENDIMENTOS.reduce((s, e) => s + e.assets_aprovados, 0);
  const totalAssets    = MOCK_EMPREENDIMENTOS.reduce((s, e) => s + e.total_assets, 0);

  return (
    <div style={{ padding: "32px 32px 64px", maxWidth: 1100, margin: "0 auto" }}>

      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#39FF1420", border: "1px solid #39FF1440", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Cpu size={16} color="#39FF14" />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#EEEEFF" }}>TAGMOB OS</h1>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#09090F", backgroundColor: "#39FF14", padding: "2px 7px", borderRadius: 4, letterSpacing: "0.06em" }}>
              Sistema Operacional da Comunicação
            </span>
          </div>
          <p style={{ fontSize: 14, color: "#7878A0" }}>
            Gerencie empreendimentos do briefing ao editor autônomo do cliente — em 5 etapas.
          </p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#39FF14", border: "none", color: "#000", padding: "10px 18px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "-0.01em" }}>
          <Plus size={16} /> Novo Empreendimento
        </button>
      </div>

      {/* Stats do OS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 36 }}>
        {[
          { label: "Empreendimentos",    value: MOCK_EMPREENDIMENTOS.length, icon: Play,         color: "#39FF14" },
          { label: "Peças no pipeline",  value: totalAssets,                  icon: CheckCircle2, color: "#00E5FF" },
          { label: "Aguardando aprovação", value: totalPendentes,             icon: Clock,        color: "#FFB800" },
          { label: "Aprovadas",          value: totalAprovados,               icon: CheckCircle2, color: "#39FF14" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: "16px 18px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: s.color, opacity: 0.6 }} />
            <p style={{ fontSize: 11, color: "#7878A0", marginBottom: 6, fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontSize: 26, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Legenda das 5 fases */}
      <div style={{ background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 12, padding: "14px 20px", marginBottom: 32, display: "flex", gap: 0, alignItems: "center", overflowX: "auto" }}>
        {OS_FASES.map((fase, idx) => (
          <div key={fase.num} style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 12px" }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: fase.cor + "20", border: `1px solid ${fase.cor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: fase.cor, flexShrink: 0 }}>
                {String(fase.num).padStart(2, "0")}
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF", whiteSpace: "nowrap" }}>{fase.label}</p>
                <p style={{ fontSize: 10, color: "#3A3A5C", whiteSpace: "nowrap" }}>{fase.descricao}</p>
              </div>
            </div>
            {idx < OS_FASES.length - 1 && (
              <ArrowRight size={14} color="#2E2E4A" style={{ flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>

      {/* Grid de empreendimentos */}
      <div>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#EEEEFF", marginBottom: 16, letterSpacing: "-0.02em" }}>
          Seus Empreendimentos
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {MOCK_EMPREENDIMENTOS.map((emp) => (
            <EmpreendimentoCard key={emp.id} emp={emp} />
          ))}

          {/* Card de novo empreendimento */}
          <button style={{ background: "transparent", border: "2px dashed #1A1A30", borderRadius: 14, padding: 32, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minHeight: 200, transition: "border-color 0.15s" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#1A1A30", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plus size={20} color="#3A3A5C" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#3A3A5C", marginBottom: 4 }}>Novo Empreendimento</p>
              <p style={{ fontSize: 12, color: "#2E2E4A" }}>Inicie o workflow de 5 etapas</p>
            </div>
          </button>
        </div>
      </div>

      {/* Aviso de bloqueio por assinatura */}
      <div style={{ marginTop: 32, padding: "14px 20px", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 12, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: "#8B5CF620", border: "1px solid #8B5CF640", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Lock size={16} color="#8B5CF6" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 2 }}>
            Modelo SaaS por Empreendimento
          </p>
          <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.5 }}>
            O acesso ao editor e à engine de IA é ativado após a entrega do projeto estratégico, via assinatura mensal recorrente (Starter · Pro · Enterprise). Sem fidelidade.
          </p>
        </div>
        <Link href="#" style={{ fontSize: 13, color: "#8B5CF6", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
          Ver planos →
        </Link>
      </div>
    </div>
  );
}
