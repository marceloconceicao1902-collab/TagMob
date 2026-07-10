"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ─── Sign In Button ──────────────────────────────────────────────────── */
export function AuthSignInButton({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/corretor" prefetch={false} style={{ textDecoration: "none" }}>
      {children}
    </Link>
  );
}

/* ─── Sign Up Button ──────────────────────────────────────────────────── */
export function AuthSignUpButton({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/corretor" prefetch={false} style={{ textDecoration: "none" }}>
      {children}
    </Link>
  );
}

/* ─── Nav Auth Area ───────────────────────────────────────────────────── */
export function NavAuthArea() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Link
        href="/corretor"
        prefetch={false}
        style={{
          background: "none",
          border: "1px solid #1A1A30",
          color: "#EEEEFF",
          padding: "8px 18px",
          borderRadius: 8,
          fontSize: 14,
          cursor: "pointer",
          fontWeight: 500,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        Ver Demo
      </Link>
      <Link
        href="/corretor"
        prefetch={false}
        style={{
          backgroundColor: "#FF0068",
          border: "none",
          color: "#fff",
          padding: "8px 18px",
          borderRadius: 8,
          fontSize: 14,
          cursor: "pointer",
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          textDecoration: "none",
        }}
      >
        Começar grátis
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

/* ─── CTA Final Button ────────────────────────────────────────────────── */
export function CtaFinalButton() {
  return (
    <Link
      href="/corretor"
      prefetch={false}
      style={{
        backgroundColor: "#FF0068",
        border: "none",
        color: "#fff",
        padding: "16px 36px",
        borderRadius: 12,
        fontSize: 16,
        cursor: "pointer",
        fontWeight: 700,
        letterSpacing: "-0.01em",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
      }}
    >
      Explorar o Demo
      <ArrowRight size={18} />
    </Link>
  );
}
