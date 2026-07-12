"use client";

import { useEffect, useState } from "react";
import { AlertOctagon, RotateCw, Home, Copy, Check } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.error("Erro capturado pela rota global:", error);
  }, [error]);

  function handleCopy() {
    const text = [
      `Mensagem: ${error.message || "Erro desconhecido"}`,
      error.digest ? `Digest: ${error.digest}` : "",
      error.stack ? `\nStack Trace:\n${error.stack}` : "",
      `\nURL: ${typeof window !== "undefined" ? window.location.href : ""}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].filter(Boolean).join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#09090F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "var(--font-inter), sans-serif",
      color: "#EEEEFF"
    }}>
      <div style={{
        maxWidth: 580,
        width: "100%",
        background: "#111120",
        border: "1px solid #FF006830",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 0 30px rgba(255,0,104,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 20
      }}>
        {/* Ícone e Título */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            backgroundColor: "#FF006815",
            border: "1px solid #FF006830",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <AlertOctagon size={20} color="#FF0068" />
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.02em", color: "#EEEEFF", margin: 0 }}>
              Ops! Algo deu errado.
            </h2>
            <p style={{ fontSize: 12, color: "#7878A0", margin: "2px 0 0" }}>
              Um erro inesperado ocorreu durante a execução.
            </p>
          </div>
        </div>

        {/* Detalhes do Erro */}
        <div style={{
          background: "#0D0D1A",
          border: "1px solid #1A1A30",
          borderRadius: 8,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: "#FF0068", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
              Mensagem de Erro
            </p>
            <p style={{ fontSize: 13, color: "#EEEEFF", fontWeight: 600, margin: "4px 0 0", lineHeight: 1.5 }}>
              {error.message || "Erro desconhecido"}
            </p>
          </div>

          {error.digest && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#00E5FF", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                Digest Hash
              </p>
              <code style={{ fontSize: 11, color: "#7878A0", fontFamily: "monospace", display: "block", marginTop: 4 }}>
                {error.digest}
              </code>
            </div>
          )}

          {error.stack && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#FFB800", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 4px" }}>
                Stack Trace
              </p>
              <pre style={{
                fontSize: 11,
                color: "#5A5A7A",
                fontFamily: "monospace",
                margin: 0,
                whiteSpace: "pre-wrap",
                maxHeight: 180,
                overflowY: "auto",
                lineHeight: 1.5,
                padding: "8px 0"
              }}>
                {error.stack}
              </pre>
            </div>
          )}
        </div>

        {/* Controles de Ação */}
        <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => reset()}
            style={{
              flex: 1,
              minWidth: 140,
              backgroundColor: "#FF0068",
              border: "none",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "opacity 0.15s"
            }}
          >
            <RotateCw size={14} />
            Tentar novamente
          </button>

          <button
            onClick={handleCopy}
            title="Copiar detalhes do erro para a área de transferência"
            style={{
              backgroundColor: copied ? "#00E5FF18" : "#1A1A30",
              border: `1px solid ${copied ? "#00E5FF60" : "#2A2A44"}`,
              color: copied ? "#00E5FF" : "#A0A0C0",
              padding: "12px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              transition: "all 0.2s",
              whiteSpace: "nowrap"
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copiado!" : "Copiar erro"}
          </button>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 16px",
              borderRadius: 8,
              border: "1px solid #1A1A30",
              color: "#7878A0",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              transition: "color 0.15s, border-color 0.15s"
            }}
          >
            <Home size={14} />
            Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
