"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Wordmark from "./Wordmark";

const LINKS = [
  { href: "/#start", label: "Startseite" },
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#loesungen", label: "Lösungen" },
  { href: "/#ueber", label: "Über QonteX" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Navbar() {
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
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/#start" aria-label="QonteX – zur Startseite">
          <Wordmark />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-fog transition-colors hover:text-mist"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#kontakt"
            className="hidden items-center gap-2 rounded-xl bg-gradient-to-br from-cyan-soft to-cyan px-5 py-2.5 text-sm font-semibold text-[#04222b] shadow-[0_8px_24px_rgba(45,212,234,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(45,212,234,0.35)] sm:inline-flex"
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
            className="glass-strong mx-4 mb-4 rounded-2xl p-3 lg:hidden"
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
                    className="block rounded-xl px-4 py-3 font-medium text-mist hover:bg-white/5"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-2 border-t border-white/10 pt-3">
                <Link
                  href="/#kontakt"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-cyan-soft to-cyan px-4 py-3 font-semibold text-[#04222b]"
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
