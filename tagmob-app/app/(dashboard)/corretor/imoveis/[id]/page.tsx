import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, MapPin, Maximize2, BedDouble, Bath, Car, Sparkles, BarChart2, Zap, CheckCircle2, ExternalLink, Tag, TrendingUp } from "lucide-react";
import { MOCK_IMOVEIS, formatCurrency, getEncaixePerfeito } from "@/lib/mock-data";
import type { Imovel } from "@/lib/types";

function PadraoTag({ padrao }: { padrao: Imovel["padrao"] }) {
  const colors: Record<Imovel["padrao"], string> = { LUXO: "#FFB800", ALTO: "#FF0068", MEDIO: "#8B5CF6", POPULAR: "#7878A0" };
  const c = colors[padrao];
  return <span style={{ fontSize: 11, fontWeight: 700, color: c, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: c + "18", padding: "3px 9px", borderRadius: 5, border: `1px solid ${c}25` }}>{padrao}</span>;
}

function StatusBadge({ status }: { status: Imovel["status"] }) {
  const cfg: Record<Imovel["status"], { label: string; color: string }> = {
    TURBINADO: { label: "Turbinado", color: "#39FF14" },
    PUBLICADO: { label: "Publicado", color: "#00E5FF" },
    RASCUNHO:  { label: "Rascunho",  color: "#FFB800" },
    VENDIDO:   { label: "Vendido",   color: "#7878A0" },
  };
  const { label, color } = cfg[status];
  return <span style={{ fontSize: 12, fontWeight: 700, color, backgroundColor: color + "18", border: `1px solid ${color}35`, padding: "4px 10px", borderRadius: 20 }}>{label}</span>;
}

function InfoChip({ icon: Icon, label, value }: { icon: React.ComponentType<{ size?: number; color?: string }>; label: string; value: string | number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "14px 20px", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 10, minWidth: 80, flex: "1 1 80px" }}>
      <Icon size={18} color="#7878A0" />
      <span style={{ fontSize: 16, fontWeight: 800, color: "#EEEEFF" }}>{value}</span>
      <span style={{ fontSize: 11, color: "#3A3A5C" }}>{label}</span>
    </div>
  );
}

export default async function ImovelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const imovel = MOCK_IMOVEIS.find((i) => i.id === id);
  if (!imovel) notFound();

  const encaixe = getEncaixePerfeito(imovel.id);
  const isTurbinado = imovel.status === "TURBINADO";

  return (
    <div style={{ padding: "32px 32px 64px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, fontSize: 13, color: "#7878A0" }}>
        <Link href="/corretor/imoveis" style={{ display: "flex", alignItems: "center", gap: 6, color: "#7878A0", textDecoration: "none" }}>
          <ArrowLeft size={14} /> Meus Imóveis
        </Link>
        <span style={{ color: "#2E2E4A" }}>/</span>
        <span style={{ color: "#EEEEFF", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{imovel.titulo}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        {/* Coluna esquerda */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Galeria */}
          <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #1A1A30", position: "relative" }}>
            <div style={{ height: 320, background: "#111120", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, position: "relative" }} className="grid-pattern-subtle">
              <Building2 size={48} color="#2E2E4A" />
              <span style={{ fontSize: 13, color: "#3A3A5C" }}>{imovel.imagens.length > 0 ? `${imovel.imagens.length} foto(s)` : "Nenhuma foto adicionada"}</span>
              <div style={{ position: "absolute", top: 14, right: 14 }}><StatusBadge status={imovel.status} /></div>
              {isTurbinado && (
                <div style={{ position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 6, background: "rgba(57,255,20,0.12)", border: "1px solid rgba(57,255,20,0.3)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "#39FF14", fontWeight: 700 }}>
                  <Zap size={11} /> AMBIENTALIZADO COM IA
                </div>
              )}
            </div>
          </div>

          {/* Info do imóvel */}
          <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <PadraoTag padrao={imovel.padrao} />
                  <span style={{ fontSize: 11, color: "#7878A0", textTransform: "uppercase", letterSpacing: "0.06em" }}>{imovel.tipo}</span>
                </div>
                <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", color: "#EEEEFF", marginBottom: 4 }}>{imovel.titulo}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MapPin size={12} color="#7878A0" />
                  <span style={{ fontSize: 13, color: "#7878A0" }}>{imovel.bairro}, {imovel.cidade}</span>
                </div>
              </div>
              <p style={{ fontSize: 24, fontWeight: 900, color: "#EEEEFF", letterSpacing: "-0.04em" }}>{formatCurrency(imovel.preco)}</p>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              <InfoChip icon={Maximize2} label="Área" value={`${imovel.area}m²`} />
              {imovel.quartos > 0 && <InfoChip icon={BedDouble} label="Quartos" value={imovel.quartos} />}
              <InfoChip icon={Bath} label="Banheiros" value={imovel.banheiros} />
              <InfoChip icon={Car} label="Vagas" value={imovel.vagas} />
            </div>

            <p style={{ fontSize: 14, color: "#7878A0", lineHeight: 1.7 }}>{imovel.descricao}</p>
          </div>

          {/* Score IA */}
          {imovel.score_ia > 0 && (
            <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#EEEEFF", marginBottom: 2 }}>Score de Ambientalização — IA</p>
                  <p style={{ fontSize: 12, color: "#7878A0" }}>Baseado na análise das fotos e compatibilidade de mercado</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#39FF1412", border: "1px solid #39FF1425", borderRadius: 8, padding: "6px 12px" }}>
                  <BarChart2 size={16} color="#39FF14" />
                  <span style={{ fontSize: 20, fontWeight: 900, color: "#39FF14" }}>{imovel.score_ia}</span>
                  <span style={{ fontSize: 11, color: "#3A3A5C" }}>/100</span>
                </div>
              </div>
              <div style={{ height: 6, borderRadius: 4, backgroundColor: "#1A1A30", overflow: "hidden", marginBottom: 12 }}>
                <div style={{ height: "100%", width: `${imovel.score_ia}%`, backgroundColor: imovel.score_ia >= 85 ? "#39FF14" : imovel.score_ia >= 65 ? "#FFB800" : "#FF0068", borderRadius: 4 }} />
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[
                  { label: "Qualidade visual", score: Math.min(100, imovel.score_ia + 3) },
                  { label: "Compatib. Pisos",  score: Math.max(60, imovel.score_ia - 8) },
                  { label: "Compatib. Louças", score: Math.max(55, imovel.score_ia - 5) },
                  { label: "Compatib. Móveis", score: Math.max(50, imovel.score_ia - 12) },
                ].map((item) => (
                  <div key={item.label} style={{ minWidth: 100 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: "#7878A0" }}>{item.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#EEEEFF" }}>{item.score}</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, backgroundColor: "#1A1A30", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${item.score}%`, backgroundColor: "#00E5FF", borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coluna direita: Encaixe Perfeito */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#111120", border: "1px solid rgba(255,0,104,0.25)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A1A30", background: "rgba(255,0,104,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
              <Sparkles size={16} color="#FF0068" />
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>Encaixe Perfeito</p>
                <p style={{ fontSize: 11, color: "#7878A0" }}>Marcas compatíveis com este imóvel</p>
              </div>
            </div>

            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              {encaixe.map((item, idx) => (
                <div key={item.marca.id} style={{ padding: "14px 16px", background: "#0D0D1A", border: "1px solid #1A1A30", borderRadius: 10, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, backgroundColor: idx === 0 ? "#FFB800" : idx === 1 ? "#7878A0" : "#8B5CF680" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#EEEEFF" }}>{item.marca.nome}</p>
                      <p style={{ fontSize: 11, color: "#7878A0", marginTop: 1 }}>{item.marca.categoria}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#39FF1415", border: "1px solid #39FF1430", borderRadius: 20, padding: "2px 8px" }}>
                      <TrendingUp size={10} color="#39FF14" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#39FF14" }}>{item.score}%</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: "#7878A0", lineHeight: 1.5, marginBottom: 10 }}>{item.motivo}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                    {item.categorias_match.map((cat) => (
                      <span key={cat} style={{ fontSize: 10, color: "#00E5FF", background: "#00E5FF12", border: "1px solid #00E5FF25", padding: "2px 7px", borderRadius: 4, fontWeight: 600 }}>{cat}</span>
                    ))}
                  </div>
                  <button style={{ width: "100%", padding: "8px", borderRadius: 7, backgroundColor: isTurbinado ? "#1A1A30" : "#FF006820", border: `1px solid ${isTurbinado ? "#2E2E4A" : "#FF006840"}`, color: isTurbinado ? "#3A3A5C" : "#FF0068", fontSize: 12, fontWeight: 700, cursor: isTurbinado ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    {isTurbinado ? <><CheckCircle2 size={12} /> Já aplicado</> : <><Zap size={12} /> Aplicar neste imóvel</>}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ padding: "12px 16px", borderTop: "1px solid #1A1A30", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#3A3A5C" }}>{encaixe.length} marcas encontradas</span>
              <Link href="/corretor/encaixe" style={{ fontSize: 12, color: "#FF0068", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                Ver todas <ExternalLink size={11} />
              </Link>
            </div>
          </div>

          {!isTurbinado && (
            <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#EEEEFF", marginBottom: 6 }}>Próximo passo recomendado</p>
              <p style={{ fontSize: 13, color: "#7878A0", lineHeight: 1.6, marginBottom: 14 }}>
                {imovel.score_ia === 0 ? "Adicione fotos de qualidade para ativar a análise de IA." : "Aceite as sugestões de marcas e turbine este imóvel em menos de 5 minutos."}
              </p>
              <button style={{ width: "100%", padding: "10px", borderRadius: 9, backgroundColor: "#FF0068", border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <Zap size={14} /> {imovel.score_ia === 0 ? "Adicionar fotos" : "Turbinar este imóvel"}
              </button>
            </div>
          )}

          <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
              <Tag size={13} color="#7878A0" />
              <p style={{ fontSize: 13, fontWeight: 600, color: "#EEEEFF" }}>Categorias disponíveis</p>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Pisos", "Revestimentos", "Louças", "Metais", "Mobiliário", "Cozinhas", "Automação", "Iluminação"].map((cat) => (
                <span key={cat} style={{ fontSize: 11, color: "#7878A0", background: "#0D0D1A", border: "1px solid #1A1A30", padding: "4px 9px", borderRadius: 5 }}>{cat}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
