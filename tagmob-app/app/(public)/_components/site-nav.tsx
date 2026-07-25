"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "../_content";
import { TagmobBadge, TagmobWordmark } from "./tagmob-mark";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/90 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[84rem] items-center gap-8 px-6 sm:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="TAGMOB — início">
          <TagmobBadge accent="pink" size={30} className="rounded-lg" />
          <TagmobWordmark accent="cyan" className="text-lg text-white" />
        </Link>

        <ul className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.8rem] font-bold text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Link
            href="/sign-in"
            className="hidden text-[0.8rem] font-bold text-white transition-opacity hover:opacity-70 sm:block"
          >
            Entrar
          </Link>
          <Link
            href="/simulador"
            className="rounded-lg bg-pink px-4 py-2 text-[0.8rem] font-bold text-white transition-transform hover:scale-[1.03]"
          >
            Iniciar Projeto
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <ul className="mx-auto flex max-w-[84rem] flex-col px-6 py-3 sm:px-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white/75"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="block py-3.5 font-display text-sm font-bold uppercase tracking-wide text-cyan"
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
