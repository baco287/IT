"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, Phone } from "lucide-react";
import Wordmark from "./Wordmark";
import { PHONE_DISPLAY, PHONE_HREF } from "./Cta";
import agentHead from "@/public/images/qontex-agent-head.png";

const SERVICE_GROUPS = [
  {
    title: "IT-Betreuung",
    items: [
      { href: "/leistungen/managed-it", label: "IT-Betreuung (Managed IT)" },
      { href: "/leistungen/it-support", label: "IT-Support" },
      { href: "/leistungen/cloud-loesungen", label: "Cloud & Microsoft 365" },
      { href: "/leistungen/cybersecurity", label: "IT-Sicherheit" },
      { href: "/leistungen/server-netzwerke", label: "Server & Netzwerke" },
      { href: "/leistungen/backup-recovery", label: "Backup & Wiederherstellung" },
    ],
  },
  {
    title: "Digital & Automatisierung",
    items: [
      { href: "/leistungen/ki-agenten", label: "KI-Agenten" },
      { href: "/leistungen/webseiten", label: "Webseiten & Online-Shops" },
      { href: "/leistungen/online-marketing", label: "Online-Marketing" },
      { href: "/leistungen/social-media", label: "Social Media" },
      { href: "/leistungen/dashboards", label: "Dashboards & Reporting" },
    ],
  },
];

const LINKS = [
  { href: "/leistungen", label: "Leistungen", dropdown: true },
  { href: "/leistungen/ki-agenten", label: "KI-Agenten" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/ueber", label: "Über QonteX" },
  { href: "/kontakt", label: "Kontakt" },
];

function isActive(pathname: string, href: string) {
  if (href === "/leistungen") {
    return pathname.startsWith("/leistungen") && !pathname.startsWith("/leistungen/ki-agenten");
  }
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-200 ${
        scrolled ? "border-line shadow-[0_4px_20px_rgba(8,23,43,0.06)]" : "border-line/70"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="QonteX – zur Startseite" className="flex items-center gap-2.5">
          <Image src={agentHead} alt="" className="h-10 w-10 rounded-full" priority />
          <Wordmark />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href} className="group relative">
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-1 py-6 text-[15px] font-medium transition-colors ${
                      active ? "text-ink" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {l.label}
                    {l.dropdown && (
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden
                      />
                    )}
                  </Link>
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-teal" aria-hidden />
                  )}

                  {l.dropdown && (
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="grid w-[34rem] grid-cols-2 gap-6 rounded-xl border border-line bg-white p-5 shadow-[var(--shadow-card-hover)]">
                        {SERVICE_GROUPS.map((g) => (
                          <div key={g.title}>
                            <p className="mb-2 px-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
                              {g.title}
                            </p>
                            <ul>
                              {g.items.map((it) => (
                                <li key={it.href}>
                                  <Link
                                    href={it.href}
                                    className="block rounded-lg px-2.5 py-2 text-sm text-text transition-colors hover:bg-soft hover:text-ink"
                                  >
                                    {it.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link
                          href="/leistungen"
                          className="col-span-2 inline-flex items-center gap-1.5 border-t border-line px-2.5 pt-4 text-sm font-semibold text-teal-dark hover:underline"
                        >
                          Alle Leistungen ansehen
                          <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
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
            className="hidden items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft sm:inline-flex"
          >
            Kostenloses Erstgespräch
          </Link>
          <a
            href={PHONE_HREF}
            aria-label={`QonteX anrufen: ${PHONE_DISPLAY}`}
            className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-white sm:hidden"
          >
            <Phone size={19} strokeWidth={2} aria-hidden />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg text-ink lg:hidden"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobiles Menü"
          className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white px-5 pb-6 pt-2 lg:hidden"
        >
          <ul className="divide-y divide-line">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  className={`flex items-center justify-between py-4 text-base font-medium ${
                    isActive(pathname, l.href) ? "text-teal-dark" : "text-ink"
                  }`}
                >
                  {l.label}
                  <ArrowRight size={18} strokeWidth={2} className="text-muted" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/kontakt"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 font-semibold text-white"
          >
            Kostenloses Erstgespräch
            <ArrowRight size={17} strokeWidth={2.2} aria-hidden />
          </Link>
        </nav>
      )}
    </header>
  );
}
