"use client";

import { useEffect, useState, type RefObject } from "react";

/** true, solange das Element sichtbar im Viewport liegt. */
export function useInView(ref: RefObject<Element | null>, threshold = 0.3): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return inView;
}

/**
 * Steuert, ob eine Beispiel-Animation automatisch läuft.
 * Startet nur, wenn der Nutzer keine reduzierte Bewegung wünscht –
 * per Klick auf „Abspielen" lässt sie sich trotzdem jederzeit starten.
 */
export function useAutoplay(): [boolean, (value: boolean) => void] {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!mq.matches);
  }, []);

  return [playing, setPlaying];
}
