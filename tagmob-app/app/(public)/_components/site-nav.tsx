"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "../_content";
import { TagmobBadge, TagmobWordmark } from "./tagmob-mark";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  // Detectar scroll a partir do .snap-container (não do window)
  useEffect(() => {
    const container = document.getElementById("snap-main");
    if (!container) return;

    const onScroll = () => setScrolled(container.scrollTop > 24);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer para destacar a seção ativa no nav
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", "")).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { threshold: 0.5 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Fechar menu mobile ao clicar em link
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: scrolled || open ? "1px solid rgba(255,255,255,0.10)" : "1px solid transparent",
        backgroundColor: scrolled || open ? "rgba(14,14,28,0.92)" : "transparent",
        backdropFilter: scrolled || open ? "blur(20px)" : "none",
      }}
    >
      <nav
        className="mx-auto flex h-16 max-w-[84rem] items-center gap-8 px-6 sm:px-10"
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="TAGMOB — início">
          <TagmobBadge accent="pink" size={30} className="rounded-lg" />
          <TagmobWordmark accent="cyan" className="text-lg" style={{ color: "#FFFFFF" } as React.CSSProperties} />
        </Link>

        {/* Links desktop */}
        <ul className="ml-auto hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-[0.8rem] font-bold transition-all duration-200"
                  style={{
                    color: isActive ? "#FF0068" : "rgba(255,255,255,0.70)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                      style={{ backgroundColor: "#FF0068" }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTAs */}
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Link
            href="/sign-in"
            className="hidden text-[0.8rem] font-bold transition-opacity hover:opacity-70 sm:block"
            style={{ color: "#FFFFFF" }}
          >
            Entrar
          </Link>
          <Link
            href="/simulador"
            className="rounded-lg px-4 py-2 text-[0.8rem] font-bold text-white transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: "#FF0068" }}
          >
            Iniciar Projeto
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-lg transition-colors lg:hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#FFFFFF",
            }}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div
          className="border-t lg:hidden"
          style={{ backgroundColor: "#0E0E1C", borderColor: "rgba(255,255,255,0.10)" }}
        >
          <ul className="mx-auto flex max-w-[84rem] flex-col px-6 py-3 sm:px-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block border-b py-3.5 font-display text-sm font-bold uppercase tracking-wide"
                  style={{
                    borderColor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="block py-3.5 font-display text-sm font-bold uppercase tracking-wide"
                style={{ color: "#00E5FF" }}
              >
                Entrar na plataforma
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
