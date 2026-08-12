"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { MediaAsset } from "@/lib/media";

type Props = {
  asset?: MediaAsset;
  className?: string;
  /** Startverzögerung nach Sichtbarkeit (z. B. 400 ms Versatz je Karte). */
  delayMs?: number;
  /** Statischer Fallback: wird gerendert, wenn das Medium deaktiviert,
      nicht ladbar oder aus Rücksicht (reduced motion, Data-Saver,
      Mobilgerät) nicht abgespielt wird und kein Poster greift. */
  children?: ReactNode;
};

/* Dekoratives Ambient-Video: stumm, ohne Controls, lazy, pausiert
   außerhalb des Viewports und bei verstecktem Tab. Solange
   asset.enabled=false ist, wird ausschließlich der Fallback gerendert –
   ohne einen einzigen Netzwerk-Request. */
export default function SmartAmbientVideo({
  asset,
  className,
  delayMs = 0,
  children,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [posterOnly, setPosterOnly] = useState(false);
  const [mounted, setMounted] = useState(false);

  const active = Boolean(asset?.enabled && (asset.webm || asset.mp4));

  useEffect(() => {
    if (!active) return;
    setMounted(true);
    type SaveDataNavigator = Navigator & { connection?: { saveData?: boolean } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean((navigator as SaveDataNavigator).connection?.saveData);
    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    if (reduce || saveData || mobile) {
      setPosterOnly(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    let timer = 0;
    let inView = false;

    const play = () => {
      timer = window.setTimeout(() => {
        video.play().catch(() => setFailed(true));
      }, delayMs);
    };
    const pause = () => {
      window.clearTimeout(timer);
      video.pause();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) play();
        else pause();
      },
      { threshold: 0.25 }
    );
    io.observe(video);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (inView) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(timer);
    };
  }, [active, delayMs]);

  // Deaktiviert oder fehlgeschlagen → unverändert der statische Fallback.
  if (!active || failed) return <>{children}</>;

  // Poster-Modus (reduced motion, Data-Saver, mobil): Poster, sonst Fallback.
  if (posterOnly) {
    if (!asset?.poster) return <>{children}</>;
    return (
      <div
        className={className}
        style={{ aspectRatio: asset.aspect }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.poster}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={className} style={{ aspectRatio: asset!.aspect }} aria-hidden>
      {/* Bis zum Mount bleibt der Fallback sichtbar – kein leerer Kasten. */}
      {!mounted && children}
      <video
        ref={videoRef}
        muted
        playsInline
        loop={asset!.loop}
        preload="none"
        poster={asset!.poster}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${mounted ? "" : "hidden"}`}
        tabIndex={-1}
      >
        {asset!.webm && <source src={asset!.webm} type="video/webm" />}
        {asset!.mp4 && <source src={asset!.mp4} type="video/mp4" />}
      </video>
    </div>
  );
}
