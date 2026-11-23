import { LEISTUNGEN, LOESUNGEN, offerHref } from "./offers";

export type NavLink = { href: string; label: string; text?: string };
export type NavGroup = { label: string; href: string; overview: string; items: NavLink[] };

/** Hauptnavigation: Startseite | Leistungen | Lösungen | Über QonteX | Kontakt */
export const NAV_GROUPS: Record<"leistungen" | "loesungen", NavGroup> = {
  leistungen: {
    label: "Leistungen",
    href: "/leistungen",
    overview: "Alle Leistungen im Überblick",
    items: LEISTUNGEN.map((o) => ({ href: offerHref(o), label: o.name, text: o.short })),
  },
  loesungen: {
    label: "Lösungen",
    href: "/loesungen",
    overview: "Alle Lösungen im Überblick",
    items: LOESUNGEN.map((o) => ({ href: offerHref(o), label: o.name, text: o.short })),
  },
};

export type NavItem = { kind: "link"; href: string; label: string } | { kind: "group"; key: "leistungen" | "loesungen" };

export const NAV: NavItem[] = [
  { kind: "link", href: "/", label: "Startseite" },
  { kind: "group", key: "leistungen" },
  { kind: "group", key: "loesungen" },
  { kind: "link", href: "/ueber", label: "Über QonteX" },
  { kind: "link", href: "/kontakt", label: "Kontakt" },
];

export function isActive(pathname: string, href: string): boolean {
  const p = pathname.replace(/\/$/, "") || "/";
  if (href === "/") return p === "/";
  return p === href || p.startsWith(`${href}/`);
}
