import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CONTATO, NAV_LINKS } from "../_content";
import { ACCENT_HEX } from "./accents";
import { TagmobBadge, TagmobWordmark } from "./tagmob-mark";

export function SiteFooter() {
  return (
    <footer
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "#0A0A14" }}
    >
      {/* ── Topo: headline grande + CTA ── */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-10 pt-20 pb-12 text-center sm:px-14"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Badge */}
        <TagmobBadge accent="pink" size={56} className="mb-8 rounded-2xl" />

        {/* Wordmark grande */}
        <TagmobWordmark
          accent="cyan"
          className="text-4xl sm:text-5xl"
          style={{ color: "#FFFFFF" }}
        />

        {/* Tagline */}
        <p
          className="mt-5 max-w-sm text-[0.9375rem] leading-[1.7]"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          A primeira plataforma criativa desenvolvida para o mercado imobiliário.
        </p>

        {/* Slogan */}
        <p
          className="mt-6 font-display text-[0.68rem] font-black uppercase tracking-[0.22em]"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Pensar · Criar · Construir · Conectar
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/simulador"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-display text-[0.82rem] font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: "#FF0068" }}
          >
            Iniciar Projeto <ArrowRight size={15} />
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-display text-[0.82rem] font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              backgroundColor: "rgba(255,255,255,0.04)",
              color: "#FFFFFF",
            }}
          >
            Entrar na Plataforma
          </Link>
        </div>
      </div>

      {/* ── Centro: links organizados ── */}
      <div className="px-10 py-12 sm:px-14">
        <div className="mx-auto flex max-w-2xl flex-wrap justify-between gap-10">
          {/* Navegar */}
          <nav aria-label="Seções do site">
            <p
              className="mb-4 font-display text-[0.62rem] font-black uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Navegar
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.875rem] transition-opacity hover:opacity-100"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <p
              className="mb-4 font-display text-[0.62rem] font-black uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Contato
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={CONTATO.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.875rem] transition-opacity hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  WhatsApp {CONTATO.whatsapp.label}
                </a>
              </li>
              <li>
                <a
                  href={CONTATO.siteHref}
                  className="text-[0.875rem] transition-opacity hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  tagmob.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Plataforma */}
          <div>
            <p
              className="mb-4 font-display text-[0.62rem] font-black uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Plataforma
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/sign-in"
                  className="text-[0.875rem] transition-opacity hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Entrar na plataforma
                </Link>
              </li>
              <li>
                <Link
                  href="/simulador"
                  className="text-[0.875rem] transition-opacity hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Simulador de escopo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Rodapé: copyright ── */}
      <div
        className="px-10 py-6 sm:px-14"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-3">
          <p className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.28)" }}>
            © {new Date().getFullYear()} TAGMOB. Todos os direitos reservados.
          </p>
          <a
            href={CONTATO.siteHref}
            className="font-display text-[0.68rem] font-black uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            {CONTATO.site}
          </a>
        </div>
      </div>
    </footer>
  );
}
