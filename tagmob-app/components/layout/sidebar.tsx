"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import {
  LayoutDashboard, FolderKanban, Palette, Home,
  LogOut, ChevronRight, Settings, Building2,
} from "lucide-react";

type NavItem = {
  label: string; href: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  badge?: string; color: string;
};

const NAV: NavItem[] = [
  { label: "Página Inicial",    href: "/hub",               icon: Home,            color: "#00E5FF" },
  { label: "Negócios",          href: "/negocios",          icon: Building2,       color: "#FF0068", badge: "OS" },
  { label: "Catálogo",          href: "/catalogo",          icon: FolderKanban,    color: "#FF0068", badge: "NOVO" },
  { label: "Profissionais",     href: "/arquiteto",         icon: Palette,         color: "#8B5CF6" },
  { label: "Visão Geral",       href: "/resumo",            icon: LayoutDashboard, color: "#FFB800" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    getFirebaseAuth()
      .then((auth) => {
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
      })
      .catch(() => {});

    return () => unsubscribe?.();
  }, []);

  function isActive(href: string) {
    if (href === "/hub")       return pathname === "/hub";
    if (href === "/resumo")    return pathname === "/resumo";
    if (href === "/catalogo")  return pathname === "/catalogo"  || pathname.startsWith("/catalogo");
    if (href === "/arquiteto") return pathname === "/arquiteto" || pathname.startsWith("/arquiteto");
    if (href === "/negocios") {
      return pathname === "/negocios" || pathname.startsWith("/negocios/")
        || pathname.startsWith("/construtora")
        || pathname === "/contatos" || pathname === "/atividades" || pathname === "/leads";
    }
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    try {
      const auth = await getFirebaseAuth();
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return (
    <aside style={{
      width: 220, minWidth: 220, height: "100vh", position: "sticky", top: 0,
      display: "flex", flexDirection: "column",
      backgroundColor: "#0D0D1A", borderRight: "1px solid #1A1A30",
    }}>

      {/* Logo */}
      <div style={{ padding: "18px 16px 16px", borderBottom: "1px solid #1A1A30", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, backgroundColor: "#FF0068", borderRadius: 7, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, padding: 5, flexShrink: 0 }}>
          {[0,1,2,3].map((i) => (
            <div key={i} style={{ backgroundColor: i === 3 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.92)", borderRadius: 1 }} />
          ))}
        </div>
        <div>
          <p style={{ fontWeight: 900, fontSize: 14, letterSpacing: "-0.05em", color: "#EEEEFF", lineHeight: 1 }}>TAGMOB</p>
          <p style={{ fontSize: 9, color: "#2E2E4A", letterSpacing: "0.07em", textTransform: "uppercase", marginTop: 1 }}>OS da Comunicação</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        {NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 11px", borderRadius: 9, textDecoration: "none",
                backgroundColor: active ? item.color + "14" : "transparent",
                border: `1px solid ${active ? item.color + "35" : "transparent"}`,
                color: active ? item.color : "#5A5A7A",
                fontSize: 13, fontWeight: active ? 700 : 500,
                transition: "all 0.12s",
              }}
            >
              <item.icon size={15} color={active ? item.color : "#3A3A5C"} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{ fontSize: 10, fontWeight: 800, color: "#000", backgroundColor: item.color, padding: "1px 6px", borderRadius: 10 }}>
                  {item.badge}
                </span>
              )}
              {active && <ChevronRight size={11} color={item.color + "80"} />}
            </Link>
          );
        })}
      </nav>

      {/* Config + usuário */}
      <div style={{ borderTop: "1px solid #1A1A30" }}>
        <Link href="/corretor/configuracoes" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", color: "#3A3A5C", fontSize: 12, textDecoration: "none" }}>
          <Settings size={13} color="#3A3A5C" /> Configurações
        </Link>
        <div style={{ padding: "10px 14px", borderTop: "1px solid #1A1A30", display: "flex", alignItems: "center", gap: 9 }}>
          {user?.photoURL ? (
            <img src={user.photoURL} style={{ width: 28, height: 28, borderRadius: "50%" }} alt="Avatar" />
          ) : (
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#FF006815", border: "1px solid #FF006830", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#FF0068", flexShrink: 0 }}>
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#EEEEFF", lineHeight: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.displayName || user?.email?.split("@")[0] || "Usuário"}
            </p>
            <p style={{ fontSize: 10, color: "#2E2E4A", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email || ""}
            </p>
          </div>
          <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
            <LogOut size={13} color="#2E2E4A" />
          </button>
        </div>
      </div>
    </aside>
  );
}
