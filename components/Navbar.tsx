"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import Wordmark from "./Wordmark";
import { btnSignal } from "./ui";
import { NAV, NAV_GROUPS, isActive, type NavGroup } from "@/lib/navigation";
import { CTA_LABEL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/company";

type GroupKey = "leistungen" | "loesungen";

/* Aufklappmenü am Desktop: per Klick, Tastatur und Maus bedienbar, Esc schließt. */
function DesktopGroup({
  id,
  group,
  open,
  active,
  onOpen,
  onClose,
}: {
  id: GroupKey;
  group: NavGroup;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: (focusButton?: boolean) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  /* Per Maus geöffnet? Dann schließt ein Klick auf denselben Punkt das Menü nicht gleich wieder. */
  const openedByHover = useRef(false);
  const panelId = `menu-${id}`;

  // Esc schließt und gibt den Fokus an den Button zurück
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <li
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return; // Touch öffnet nur per Tippen
        window.clearTimeout(timer.current);
        if (!open) openedByHover.current = true;
        onOpen();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        timer.current = window.setTimeout(() => {
          openedByHover.current = false;
          onClose();
        }, 140);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (open && openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          openedByHover.current = false;
          if (open) onClose();
          else onOpen();
        }}
        className={`relative inline-flex h-[72px] items-center gap-1 px-1 text-[15px] font-medium transition-colors ${
          active || open ? "text-white" : "text-haze hover:text-white"
        }`}
      >
        {group.label}
        <ChevronDown
          size={15}
          strokeWidth={2.2}
          className={`transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
        {active && <span className="absolute inset-x-1 bottom-[18px] h-px bg-signal" aria-hidden />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-[64px] z-50 w-[27rem] -translate-x-1/2 pt-2"
      >
        <div className="rounded-[18px] border border-edge bg-night-2 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
          <ul>
            {group.items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => onClose()}
                  className="block rounded-[10px] px-4 py-3 transition-colors hover:bg-night-3"
                >
                  <span className="block text-[15px] font-semibold text-white">{it.label}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-haze">{it.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={group.href}
            onClick={() => onClose()}
            className="mt-1 block rounded-[10px] border-t border-edge px-4 py-3 text-[14px] font-semibold text-signal transition-colors hover:bg-night-3"
          >
            {group.overview}
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<GroupKey | null>(null);
  const [mobileGroup, setMobileGroup] = useState<GroupKey | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menüs schließen, sobald eine andere Seite geöffnet wird
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Mobiles Menü: Seite dahinter sperren, Esc schließt
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const behind = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    behind.forEach((el) => el.setAttribute("inert", ""));
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      behind.forEach((el) => el.removeAttribute("inert"));
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`on-dark sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-200 ${
        scrolled || mobileOpen ? "border-edge bg-night/95" : "border-transparent bg-night"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[78rem] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="QonteX – zur Startseite" className="flex min-h-11 flex-none items-center">
          <Wordmark />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => {
              if (item.kind === "group") {
                const group = NAV_GROUPS[item.key];
                return (
                  <DesktopGroup
                    key={item.key}
                    id={item.key}
                    group={group}
                    open={openGroup === item.key}
                    active={isActive(pathname, group.href)}
                    onOpen={() => setOpenGroup(item.key)}
                    onClose={() => setOpenGroup((g) => (g === item.key ? null : g))}
                  />
                );
              }
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex h-[72px] items-center px-1 text-[15px] font-medium transition-colors ${
                      active ? "text-white" : "text-haze hover:text-white"
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-1 bottom-[18px] h-px bg-signal" aria-hidden />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/kontakt"
            className="hidden min-h-11 items-center justify-center rounded-[10px] bg-signal px-5 text-[15px] font-semibold text-night transition-colors hover:bg-signal-hover sm:inline-flex"
          >
            {CTA_LABEL}
          </Link>
          <a
            href={PHONE_HREF}
            aria-label={`QonteX anrufen: ${PHONE_DISPLAY}`}
            className="grid h-11 w-11 place-items-center rounded-[10px] border border-edge text-white sm:hidden"
          >
            <Phone size={18} strokeWidth={2} aria-hidden />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-[10px] border border-edge text-white transition-colors hover:border-haze lg:hidden"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobiles Menü"
          className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-edge bg-night lg:hidden"
        >
          <div className="mx-auto w-full max-w-2xl px-5 pb-10 pt-2 sm:px-8">
            <ul className="divide-y divide-edge">
              {NAV.map((item) => {
                if (item.kind === "link") {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-14 items-center text-[17px] font-semibold ${
                          active ? "text-signal" : "text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const group = NAV_GROUPS[item.key];
                const expanded = mobileGroup === item.key;
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      className="flex min-h-14 w-full items-center justify-between text-left text-[17px] font-semibold text-white"
                      aria-expanded={expanded}
                      aria-controls={`mobile-${item.key}`}
                      onClick={() => setMobileGroup(expanded ? null : item.key)}
                    >
                      {group.label}
                      <ChevronDown
                        size={20}
                        strokeWidth={2}
                        className={`text-haze transition-transform duration-200 motion-reduce:transition-none ${
                          expanded ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>
                    <ul id={`mobile-${item.key}`} hidden={!expanded} className="pb-3">
                      {group.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            onClick={closeMobile}
                            aria-current={isActive(pathname, it.href) ? "page" : undefined}
                            className="flex min-h-12 items-center pl-4 text-[16px] text-white/85"
                          >
                            {it.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={group.href}
                          onClick={closeMobile}
                          className="flex min-h-12 items-center pl-4 text-[15px] font-semibold text-signal"
                        >
                          {group.overview}
                        </Link>
                      </li>
                    </ul>
                  </li>
                );
              })}
            </ul>

            <Link href="/kontakt" onClick={closeMobile} className={`${btnSignal} mt-6 w-full`}>
              {CTA_LABEL}
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={PHONE_HREF}
                className="flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-edge text-[15px] font-semibold text-white"
              >
                <Phone size={17} strokeWidth={2} className="text-signal" aria-hidden />
                Anrufen
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-edge text-[15px] font-semibold text-white"
              >
                <MessageCircle size={17} strokeWidth={2} className="text-signal" aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
