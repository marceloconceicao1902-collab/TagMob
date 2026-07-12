"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/hub");
    } catch (err: any) {
      console.error("Erro no login:", err);
      // Traduz ou detalha os principais erros do Firebase Auth
      let cleanMsg = err.message;
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        cleanMsg = "E-mail ou senha incorretos. Por favor, verifique suas credenciais.";
      } else if (err.code === "auth/invalid-email") {
        cleanMsg = "O formato do e-mail inserido é inválido.";
      } else if (err.code === "auth/too-many-requests") {
        cleanMsg = "Acesso bloqueado temporariamente por excesso de tentativas. Tente mais tarde.";
      }
      setErrorMsg(cleanMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#09090F", padding: "24px", position: "relative", overflow: "hidden" }}
      className="grid-pattern"
    >
      <div aria-hidden style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,104,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40, textDecoration: "none" }}>
        <div style={{ width: 36, height: 36, backgroundColor: "#FF0068", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff" }}>T</div>
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.04em", color: "#EEEEFF" }}>TAGMOB</span>
      </Link>

      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: 400, background: "#111120", border: "1px solid #1A1A30", borderRadius: 14, padding: 28, position: "relative", zIndex: 1 }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#EEEEFF", marginBottom: 6, letterSpacing: "-0.03em" }}>Entrar na plataforma</h1>
        <p style={{ fontSize: 14, color: "#7878A0", marginBottom: 20 }}>Bem-vindo de volta ao TAGMOB.</p>

        {errorMsg && (
          <div style={{
            background: "rgba(255,0,104,0.1)",
            border: "1px solid rgba(255,0,104,0.3)",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 13,
            color: "#FF0068",
            marginBottom: 20,
            lineHeight: 1.5,
            wordBreak: "break-word"
          }}>
            {errorMsg}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#7878A0", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required
            style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0D0D1A", border: "1px solid #1A1A30", color: "#EEEEFF", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#7878A0", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>Senha</label>
          <div style={{ position: "relative" }}>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
              style={{ width: "100%", padding: "10px 40px 10px 12px", borderRadius: 8, background: "#0D0D1A", border: "1px solid #1A1A30", color: "#EEEEFF", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              {showPassword ? <EyeOff size={15} color="#3A3A5C" /> : <Eye size={15} color="#3A3A5C" />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading}
          style={{ width: "100%", padding: "12px", borderRadius: 9, backgroundColor: "#FF0068", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: loading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading ? "Entrando..." : <><span>Entrar</span><ArrowRight size={15} /></>}
        </button>

        <p style={{ textAlign: "center", fontSize: 13, color: "#7878A0", marginTop: 20 }}>
          Não tem conta?{" "}
          <Link href="/sign-up" style={{ color: "#FF0068", textDecoration: "none", fontWeight: 600 }}>Criar gratuitamente</Link>
        </p>
      </form>
    </div>
  );
}
