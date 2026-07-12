"use client";

import { useEffect } from "react";
import { AlertOctagon, RotateCw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro no console para fins de monitoramento
    console.error("Erro capturado pela rota global:", error);
  }, [error]);

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
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button
            onClick={() => reset()}
            style={{
              flex: 1,
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
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 20px",
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
