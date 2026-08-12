"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { MediaAsset } from "@/lib/media";

/* Sorgt dafür, dass immer nur EIN Referenzvideo gleichzeitig läuft. */
let stopActive: (() => void) | null = null;

type Props = {
  asset?: MediaAsset;
  /** Der bestehende statische Screenshot (bleibt Poster und Fallback). */
  children: ReactNode;
};

/* Hover-/Fokus-Preview für Referenzkarten: Standard ist der Screenshot;
   ein kurzes Video startet nur bei Hover oder Tastaturfokus der Karte
   (Desktop mit feinem Zeiger), pausiert beim Verlassen und springt an
   den Anfang zurück. Deaktivierte Medien → unverändert statische Karte. */
export default function ReferenceMedia({ asset, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const active = Boolean(asset?.enabled && (asset.webm || asset.mp4)) && !failed;

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return; // Touch/Mobil & reduzierte Bewegung: nur Poster
    setInteractive(true);

    const wrap = wrapRef.current;
    if (!wrap) return;
    // Tastaturfokus liegt auf dem umschließenden Karten-Link
    const link = wrap.closest("a");

    const start = () => {
      const video = videoRef.current;
      if (!video) return;
      if (stopActive) stopActive();
      stopActive = stop;
      setPlaying(true);
      video.play().catch(() => setFailed(true));
    };
    const stop = () => {
      const video = videoRef.current;
      if (!video) return;
      video.pause();
      video.currentTime = 0;
      setPlaying(false);
      if (stopActive === stop) stopActive = null;
    };

    wrap.addEventListener("mouseenter", start);
    wrap.addEventListener("mouseleave", stop);
    link?.addEventListener("focus", start);
    link?.addEventListener("blur", stop);

    return () => {
      stop();
      wrap.removeEventListener("mouseenter", start);
      wrap.removeEventListener("mouseleave", stop);
      link?.removeEventListener("focus", start);
      link?.removeEventListener("blur", stop);
    };
  }, [active]);

  if (!active) return <>{children}</>;

  return (
    <div ref={wrapRef} className="relative">
      {children}
      {interactive && (
        <video
          ref={videoRef}
          muted
          playsInline
          loop={asset!.loop}
          preload="none"
          onError={() => setFailed(true)}
          aria-hidden
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
            playing ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {asset!.webm && <source src={asset!.webm} type="video/webm" />}
          {asset!.mp4 && <source src={asset!.mp4} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
