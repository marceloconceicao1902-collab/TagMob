"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0D0D1A", border: "1px solid #1A1A30", color: "#EEEEFF", fontSize: 14, outline: "none", fontFamily: "inherit" };
  const labelStyle = { display: "block" as const, fontSize: 12, fontWeight: 600, color: "#7878A0", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" as const };

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    router.push("/onboarding");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#09090F", padding: "24px", position: "relative", overflow: "hidden" }} className="grid-pattern">
      <div aria-hidden style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40, textDecoration: "none" }}>
        <div style={{ width: 36, height: 36, backgroundColor: "#FF0068", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff" }}>T</div>
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.04em", color: "#EEEEFF" }}>TAGMOB</span>
      </Link>

      <div style={{ width: "100%", maxWidth: 420, background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, padding: 28, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {[1, 2].map((s) => <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: s <= step ? "#FF0068" : "#1A1A30", transition: "background 0.3s" }} />)}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#EEEEFF", marginBottom: 6, letterSpacing: "-0.03em" }}>
          {step === 1 ? "Criar sua conta" : "Configure sua senha"}
        </h1>
        <p style={{ fontSize: 14, color: "#7878A0", marginBottom: 24 }}>
          {step === 1 ? "Comece gratuitamente. Sem cartão de crédito." : "Quase lá!"}
        </p>

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div><label style={labelStyle}>Nome</label><input type="text" placeholder="João" required style={inputStyle} /></div>
              <div><label style={labelStyle}>Sobrenome</label><input type="text" placeholder="Silva" required style={inputStyle} /></div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>E-mail</label>
              <input type="email" placeholder="joao@email.com" required style={inputStyle} />
            </div>
            <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: 9, backgroundColor: "#FF0068", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              Continuar <ArrowRight size={15} />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2}>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Senha</label>
              <input type="password" placeholder="Mínimo 8 caracteres" minLength={8} required style={inputStyle} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Confirmar Senha</label>
              <input type="password" placeholder="Repita a senha" required style={inputStyle} />
            </div>
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", borderRadius: 9, backgroundColor: "#FF0068", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: loading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {loading ? "Criando..." : <><span>Criar conta</span><ArrowRight size={15} /></>}
            </button>
          </form>
        )}

        <p style={{ textAlign: "center", fontSize: 13, color: "#7878A0", marginTop: 20 }}>
          Já tem conta?{" "}
          <Link href="/sign-in" style={{ color: "#FF0068", textDecoration: "none", fontWeight: 600 }}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}
