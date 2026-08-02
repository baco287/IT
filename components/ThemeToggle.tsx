"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Umschalter zwischen dunklem und hellem Theme, Auswahl wird gespeichert. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("qx-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.dataset.theme = stored;
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("qx-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Helles Design aktivieren" : "Dunkles Design aktivieren"
      }
      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-fog transition-colors hover:border-cyan/40 hover:text-cyan"
    >
      {theme === "dark" ? (
        <Sun size={17} strokeWidth={2} aria-hidden />
      ) : (
        <Moon size={17} strokeWidth={2} aria-hidden />
      )}
    </button>
  );
}
