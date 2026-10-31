"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import Wordmark from "./Wordmark";
import agentHead from "@/public/images/qontex-agent-head.png";

type NavLink = {
  href: string;
  label: string;
  children?: Array<{ group?: string; items: Array<{ href: string; label: string }> }>;
};

const LINKS: NavLink[] = [
  { href: "/", label: "Startseite" },
  {
    href: "/leistungen",
    label: "Leistungen",
    children: [
      {
        group: "IT-Leistungen",
        items: [
          { href: "/leistungen/managed-it", label: "Managed IT Services" },
          { href: "/leistungen/it-support", label: "IT-Support" },
          { href: "/leistungen/cloud-loesungen", label: "Cloud-Lösungen" },
          { href: "/leistungen/cybersecurity", label: "Cybersecurity" },
          { href: "/leistungen/server-netzwerke", label: "Server & Netzwerke" },
          { href: "/leistungen/backup-recovery", label: "Backup & Recovery" },
        ],
      },
      {
        group: "Digital & KI",
        items: [
          { href: "/leistungen/ki-agenten", label: "KI-Agenten" },
          { href: "/leistungen/webseiten", label: "Webseiten & Online-Shops" },
          { href: "/leistungen/online-marketing", label: "Ads & Online-Marketing" },
          { href: "/leistungen/social-media", label: "Social Media" },
          { href: "/leistungen/dashboards", label: "Dashboards & Reporting" },
        ],
      },
    ],
  },
  {
    href: "/loesungen",
    label: "Lösungen",
    children: [
      {
        items: [
          { href: "/loesungen#loesungen", label: "Server & Infrastruktur" },
          { href: "/loesungen#sicherheit", label: "Sicherheit" },
          { href: "/loesungen#cloud", label: "Cloud & Vernetzung" },
        ],
      },
    ],
  },
  { href: "/ueber", label: "Über QonteX" },
  { href: "/kontakt", label: "Kontakt" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b border-white/6" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="QonteX – zur Startseite"
          className="flex items-center gap-3"
        >
          <Image
            src={agentHead}
            alt=""
            className="h-10 w-10 rounded-full ring-1 ring-cyan/30"
            priority
          />
          <Wordmark />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href} className="group relative">
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors ${
                      active ? "text-white" : "text-fog hover:text-mist"
                    }`}
                  >
                    {l.label}
                    {l.children && (
                      <ChevronDown
                        size={14}
                        strokeWidth={2.2}
                        className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden
                      />
                    )}
                    {active && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_rgba(25,216,242,0.8)]"
                        aria-hidden
                      />
                    )}
                  </Link>

                  {l.children && (
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div
                        className={`grid gap-6 rounded-2xl border border-white/10 bg-navy/95 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md ${
                          l.children.length > 1 ? "w-[30rem] grid-cols-2" : "w-60"
                        }`}
                      >
                        {l.children.map((g, gi) => (
                          <div key={gi}>
                            {g.group && (
                              <p className="mb-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-fog/70">
                                {g.group}
                              </p>
                            )}
                            <ul className="grid gap-0.5">
                              {g.items.map((it) => (
                                <li key={it.href}>
                                  <Link
                                    href={it.href}
                                    className="block rounded-lg px-2.5 py-1.5 text-sm text-mist transition-colors hover:bg-cyan/10 hover:text-white"
                                  >
                                    {it.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/kontakt"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-cyan-soft px-5 py-2.5 text-sm font-semibold text-[#03222b] shadow-[0_8px_26px_rgba(25,216,242,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(25,216,242,0.4)] sm:inline-flex"
          >
            IT-Beratung anfragen
            <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
          </Link>
          <button
            className="rounded-lg p-2 text-mist lg:hidden"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobiles Menü"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="glass-strong mx-4 mb-4 max-h-[75vh] overflow-y-auto rounded-2xl p-3 lg:hidden"
          >
            <ul>
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, l.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 font-medium hover:bg-white/5 ${
                      isActive(pathname, l.href) ? "text-cyan" : "text-mist"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-2 border-t border-white/10 pt-3">
                <Link
                  href="/kontakt"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-cyan-soft px-4 py-3 font-semibold text-[#03222b]"
                >
                  IT-Beratung anfragen
                  <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
