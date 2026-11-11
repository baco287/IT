"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Phone,
  Workflow,
  PanelsTopLeft,
  Search,
  Megaphone,
  Handshake,
  Server,
  type LucideIcon,
} from "lucide-react";
import Wordmark from "./Wordmark";
import { btnPrimary } from "./ui";
import { CTA_LABEL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";
import agentHead from "@/public/images/qontex-agent-head.png";

type ServiceLink = { href: string; label: string; text: string; icon: LucideIcon };

const SERVICE_LINKS: ServiceLink[] = [
  {
    href: "/leistungen/prozessautomatisierung",
    label: "Prozessautomatisierung",
    text: "Wiederkehrende Aufgaben digitalisieren",
    icon: Workflow,
  },
  {
    href: "/leistungen/webseiten",
    label: "Webseiten & Landingpages",
    text: "Seiten, die Anfragen bringen können",
    icon: PanelsTopLeft,
  },
  {
    href: "/leistungen/seo-ki-agenten",
    label: "SEO & KI-Agenten",
    text: "Sichtbarkeit in Suchmaschinen verbessern",
    icon: Search,
  },
  {
    href: "/leistungen/marketing-automatisierung",
    label: "Marketing-Automatisierung",
    text: "Kampagnen und Inhalte effizient organisieren",
    icon: Megaphone,
  },
  {
    href: "/leistungen/crm-vertrieb",
    label: "CRM & Vertrieb",
    text: "Anfragen strukturiert nachverfolgen",
    icon: Handshake,
  },
  {
    href: "/loesungen",
    label: "IT & Infrastruktur",
    text: "Das technische Fundament",
    icon: Server,
  },
];

const LINKS = [
  { href: "/leistungen", label: "Leistungen", dropdown: true },
  { href: "/automatisierung", label: "Automatisierung" },
  { href: "/#so-funktionierts", label: "So funktioniert’s" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/ueber", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/leistungen") {
    return pathname.startsWith("/leistungen") || pathname.startsWith("/loesungen");
  }
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü schließen, sobald eine andere Seite geöffnet wird
  useEffect(() => setOpen(false), [pathname]);

  // Offenes Menü: Hintergrund nicht mitscrollen, Escape schließt
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-200 ${
        scrolled || open ? "border-line shadow-[0_8px_24px_-14px_rgba(7,24,45,0.22)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="QonteX – zur Startseite" className="flex flex-none items-center gap-2.5">
          <Image src={agentHead} alt="" className="h-10 w-10 rounded-full" priority />
          <Wordmark />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href} className="group relative flex h-[76px] items-center">
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center gap-1 py-1.5 text-[15px] font-medium transition-colors ${
                      active ? "text-ink" : "text-ink/75 hover:text-ink"
                    }`}
                  >
                    {l.label}
                    {l.dropdown && (
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180"
                        aria-hidden
                      />
                    )}
                    {active && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-teal" aria-hidden />
                    )}
                  </Link>

                  {l.dropdown && (
                    <div className="invisible absolute -left-6 top-full z-50 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="w-[41rem] rounded-2xl border border-line bg-white p-3 shadow-[var(--shadow-card-hover)]">
                        <ul className="grid grid-cols-2 gap-1">
                          {SERVICE_LINKS.map((it) => (
                            <li key={it.href}>
                              <Link
                                href={it.href}
                                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-soft"
                              >
                                <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-teal-tint text-teal-text">
                                  <it.icon size={19} strokeWidth={1.8} aria-hidden />
                                </span>
                                <span>
                                  <span className="block text-[15px] font-semibold text-ink">{it.label}</span>
                                  <span className="mt-0.5 block text-[13px] leading-snug text-muted">{it.text}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/leistungen"
                          className="mt-2 flex items-center justify-between rounded-xl bg-soft px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-teal-tint"
                        >
                          Alle Leistungen im Überblick
                          <ArrowRight size={16} strokeWidth={2.2} className="text-teal-text" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/kontakt"
            className="hidden min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ink-soft sm:inline-flex"
          >
            {CTA_LABEL}
          </Link>
          <a
            href={PHONE_HREF}
            aria-label={`QonteX anrufen: ${PHONE_DISPLAY}`}
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white sm:hidden"
          >
            <Phone size={18} strokeWidth={2} aria-hidden />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink xl:hidden"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobiles Menü"
          className="h-[calc(100dvh-76px)] overflow-y-auto border-t border-line bg-white xl:hidden"
        >
          <div className="mx-auto w-full max-w-2xl px-5 pb-10 pt-3 sm:px-8">
            <ul className="divide-y divide-line">
              <li>
                <Link
                  href="/"
                  onClick={close}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className="flex min-h-14 items-center text-[17px] font-semibold text-ink"
                >
                  Startseite
                </Link>
              </li>
              {LINKS.map((l) =>
                l.dropdown ? (
                  <li key={l.href}>
                    <button
                      type="button"
                      className="flex min-h-14 w-full items-center justify-between text-left text-[17px] font-semibold text-ink"
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      {l.label}
                      <ChevronDown
                        size={20}
                        strokeWidth={2}
                        className={`text-muted transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    {servicesOpen && (
                      <ul id="mobile-services" className="pb-4">
                        {SERVICE_LINKS.map((it) => (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              onClick={close}
                              className="flex min-h-12 items-center gap-3 rounded-lg px-1 text-[16px] font-medium text-ink"
                            >
                              <it.icon size={19} strokeWidth={1.8} className="flex-none text-teal-dark" aria-hidden />
                              {it.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/leistungen"
                            onClick={close}
                            className="mt-1 flex min-h-12 items-center gap-2 px-1 text-[15px] font-semibold text-teal-text"
                          >
                            Alle Leistungen im Überblick
                            <ArrowRight size={16} strokeWidth={2.2} aria-hidden />
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={close}
                      aria-current={isActive(pathname, l.href) ? "page" : undefined}
                      className={`flex min-h-14 items-center text-[17px] font-semibold ${
                        isActive(pathname, l.href) ? "text-teal-text" : "text-ink"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <Link href="/kontakt" onClick={close} className={`${btnPrimary} mt-6 w-full`}>
              {CTA_LABEL}
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
            </Link>
            <a
              href={PHONE_HREF}
              className="mt-3 flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-line text-[15px] font-semibold text-ink"
            >
              <Phone size={17} strokeWidth={2} className="text-teal-dark" aria-hidden />
              {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
