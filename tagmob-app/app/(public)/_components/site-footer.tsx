import Link from "next/link";

import { CONTATO, NAV_LINKS } from "../_content";
import { TagmobBadge, TagmobWordmark } from "./tagmob-mark";

export function SiteFooter() {
  return (
    <footer
      className="border-t px-6 py-14 sm:px-10"
      style={{ backgroundColor: "#0A0A14", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="mx-auto max-w-[84rem]">
        <div className="flex flex-wrap justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <TagmobBadge accent="pink" size={28} className="rounded-lg" />
              <TagmobWordmark accent="cyan" className="text-base" />
            </div>
            <p
              className="mt-4 text-[0.85rem] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              A primeira plataforma criativa desenvolvida para o mercado imobiliário.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Seções do site">
            <p
              className="font-display text-[0.65rem] font-black uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.30)" }}
            >
              Navegar
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.85rem] transition-colors hover:opacity-100"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p
              className="font-display text-[0.65rem] font-black uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.30)" }}
            >
              Contato
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={CONTATO.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.85rem] transition-colors hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  WhatsApp {CONTATO.whatsapp.label}
                </a>
              </li>
              <li>
                <a
                  href={CONTATO.siteHref}
                  className="text-[0.85rem] transition-colors hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  tagmob.com.br
                </a>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="text-[0.85rem] transition-colors hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Entrar na plataforma
                </Link>
              </li>
              <li>
                <Link
                  href="/simulador"
                  className="text-[0.85rem] transition-colors hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Simulador de escopo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-7"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.30)" }}>
            © {new Date().getFullYear()} TAGMOB. Todos os direitos reservados.
          </p>
          <p
            className="font-display text-[0.7rem] font-bold uppercase tracking-[0.14em]"
            style={{ color: "rgba(255,255,255,0.30)" }}
          >
            Pensar · Criar · Construir · Conectar
          </p>
        </div>
      </div>
    </footer>
  );
}
