"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Building2, CheckCircle2, Sparkles } from "lucide-react";

type FormData = { titulo: string; tipo: string; padrao: string; bairro: string; cidade: string; preco: string; area: string; quartos: string; banheiros: string; vagas: string; descricao: string; };
const INITIAL: FormData = { titulo: "", tipo: "APARTAMENTO", padrao: "ALTO", bairro: "", cidade: "São Paulo", preco: "", area: "", quartos: "3", banheiros: "2", vagas: "1", descricao: "" };

const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0D0D1A", border: "1px solid #1A1A30", color: "#EEEEFF", fontSize: 14, outline: "none", fontFamily: "inherit" };
const labelStyle = { display: "block" as const, fontSize: 12, fontWeight: 600, color: "#7878A0", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" as const };

export default function NovoImovelPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState<1 | 2>(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (f: keyof FormData, v: string) => setForm((p) => ({ ...p, [f]: v }));
  const isStep1Valid = () => form.titulo.trim() && form.bairro.trim() && form.preco && form.area;

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaved(true);
    setTimeout(() => router.push("/corretor/imoveis"), 1500);
  }

  if (saved) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#39FF1420", border: "2px solid #39FF14", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircle2 size={28} color="#39FF14" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#EEEEFF", letterSpacing: "-0.03em" }}>Imóvel cadastrado!</h2>
        <p style={{ fontSize: 14, color: "#7878A0" }}>Redirecionando...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 32px 64px", maxWidth: 760, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, fontSize: 13, color: "#7878A0" }}>
        <Link href="/corretor/imoveis" style={{ display: "flex", alignItems: "center", gap: 6, color: "#7878A0", textDecoration: "none" }}>
          <ArrowLeft size={14} /> Meus Imóveis
        </Link>
        <span style={{ color: "#2E2E4A" }}>/</span>
        <span style={{ color: "#EEEEFF" }}>Novo Imóvel</span>
      </div>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#EEEEFF", marginBottom: 4 }}>Cadastrar Novo Imóvel</h1>
        <p style={{ fontSize: 14, color: "#7878A0" }}>A IA analisa as fotos automaticamente ao publicar.</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {[{ num: 1, label: "Dados Básicos" }, { num: 2, label: "Fotos e Publicação" }].map((s) => {
          const active = step === s.num, done = step > s.num;
          return (
            <div key={s.num} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, padding: "10px 14px", borderRadius: 9, background: active ? "rgba(255,0,104,0.08)" : "#111120", border: `1px solid ${active ? "rgba(255,0,104,0.3)" : "#1A1A30"}` }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, backgroundColor: done ? "#39FF14" : active ? "#FF0068" : "#1A1A30", color: done || active ? "#000" : "#3A3A5C" }}>
                {done ? "✓" : s.num}
              </div>
              <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#EEEEFF" : "#7878A0" }}>{s.label}</span>
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <div style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={labelStyle}>Título do anúncio *</label>
            <input value={form.titulo} onChange={(e) => update("titulo", e.target.value)} placeholder="Ex: Apartamento Alto Padrão — Jardins" style={inputStyle} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Tipo</label>
              <select value={form.tipo} onChange={(e) => update("tipo", e.target.value)} style={inputStyle}>
                {[["APARTAMENTO","Apartamento"],["CASA","Casa"],["COBERTURA","Cobertura"],["COMERCIAL","Comercial"],["LOTE","Lote"]].map(([v,l]) => <option key={v} value={v} style={{ background: "#0D0D1A" }}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Padrão</label>
              <select value={form.padrao} onChange={(e) => update("padrao", e.target.value)} style={inputStyle}>
                {[["LUXO","Luxo"],["ALTO","Alto Padrão"],["MEDIO","Médio Padrão"],["POPULAR","Popular"]].map(([v,l]) => <option key={v} value={v} style={{ background: "#0D0D1A" }}>{l}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Bairro *</label>
            <input value={form.bairro} onChange={(e) => update("bairro", e.target.value)} placeholder="Ex: Jardins, Itaim Bibi..." style={inputStyle} />
            <p style={{ fontSize: 11, color: "#3A3A5C", marginTop: 4 }}>Usado pelo Encaixe Perfeito para sugerir marcas compatíveis.</p>
          </div>
          <div>
            <label style={labelStyle}>Cidade</label>
            <input value={form.cidade} onChange={(e) => update("cidade", e.target.value)} placeholder="São Paulo" style={inputStyle} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Preço (R$) *</label>
              <input type="number" value={form.preco} onChange={(e) => update("preco", e.target.value)} placeholder="1850000" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Área (m²) *</label>
              <input type="number" value={form.area} onChange={(e) => update("area", e.target.value)} placeholder="145" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div><label style={labelStyle}>Quartos</label><input type="number" value={form.quartos} onChange={(e) => update("quartos", e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Banheiros</label><input type="number" value={form.banheiros} onChange={(e) => update("banheiros", e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Vagas</label><input type="number" value={form.vagas} onChange={(e) => update("vagas", e.target.value)} style={inputStyle} /></div>
          </div>
          <div>
            <label style={labelStyle}>Descrição</label>
            <textarea value={form.descricao} onChange={(e) => update("descricao", e.target.value)} placeholder="Descreva os diferenciais. Boa descrição melhora o score de IA." rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
          </div>
          <button onClick={() => setStep(2)} disabled={!isStep1Valid()} style={{ padding: "12px", borderRadius: 10, backgroundColor: isStep1Valid() ? "#FF0068" : "#1A1A30", border: "none", color: isStep1Valid() ? "#fff" : "#2E2E4A", fontSize: 14, fontWeight: 700, cursor: isStep1Valid() ? "pointer" : "not-allowed" }}>
            Próximo → Fotos e Publicação
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "#111120", border: "2px dashed #1A1A30", borderRadius: 14, padding: 40, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: "#1A1A30", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Upload size={22} color="#7878A0" />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#EEEEFF", marginBottom: 4 }}>Arraste as fotos ou clique para selecionar</p>
              <p style={{ fontSize: 13, color: "#7878A0" }}>PNG, JPG até 10MB. Mínimo 3 fotos para score IA mais alto.</p>
            </div>
          </div>

          <div style={{ padding: 16, background: "rgba(255,0,104,0.05)", border: "1px solid rgba(255,0,104,0.15)", borderRadius: 12, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Sparkles size={16} color="#FF0068" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#EEEEFF", marginBottom: 4 }}>Dica para maximizar o Score de IA</p>
              <p style={{ fontSize: 12, color: "#7878A0", lineHeight: 1.6 }}>Fotos com boa iluminação natural e acabamentos visíveis (piso, azulejo, louças) elevam o score e aumentam as sugestões do Encaixe Perfeito.</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px", borderRadius: 10, background: "#111120", border: "1px solid #1A1A30", color: "#7878A0", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>← Voltar</button>
            <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: "12px", borderRadius: 10, backgroundColor: "#FF0068", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: saving ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {saving ? "Salvando..." : <><Building2 size={15} /> Salvar e publicar rascunho</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
