/* ============================================================
   Zentrale Medienkonfiguration für alle Videos/Cinemagraphs.

   Aktivierung: `enabled: true` setzen, SOBALD die Dateien unter
   /public/... tatsächlich vorliegen. Solange enabled=false ist,
   rendert SmartAmbientVideo ausschließlich den statischen
   Fallback – es entstehen keine Requests und keine 404s.

   Pfade sind relativ zu /public.
   ============================================================ */

export type MediaAsset = {
  /** Nur aktivieren, wenn die Dateien wirklich existieren. */
  enabled: boolean;
  webm?: string;
  mp4?: string;
  poster?: string;
  /** Reserviertes Seitenverhältnis gegen Layout-Shift, z. B. "16/9". */
  aspect: string;
  loop?: boolean;
  /** Verhalten auf Mobilgeräten: Poster (Standard) oder gar nichts. */
  mobile?: "poster" | "none";
};

const off = (base: string, aspect = "16/9", loop = true): MediaAsset => ({
  enabled: false,
  webm: `${base}.webm`,
  mp4: `${base}.mp4`,
  poster: `${base}-poster.webp`,
  aspect,
  loop,
  mobile: "poster",
});

export const MEDIA = {
  /* KI-Agenten-Karten auf der Startseite (oberer Illustrationsbereich).
     Erwartete Dateien: /public/media/ai/… */
  ai: {
    whatsapp: off("/media/ai/whatsapp-agent", "3/1.2"),
    phone: off("/media/ai/phone-agent", "3/1.2"),
    email: off("/media/ai/email-agent", "3/1.2"),
  },

  /* Referenzkarten: kurzes Preview nur bei Hover/Fokus (Desktop).
     Poster bleiben die vorhandenen Screenshots. */
  references: {
    "volt-gas": { enabled: false, webm: "/media/references/volt-gas-preview.webm", mp4: "/media/references/volt-gas-preview.mp4", aspect: "3/2", loop: true } as MediaAsset,
    deutschezulassung: { enabled: false, webm: "/media/references/deutschezulassung-preview.webm", mp4: "/media/references/deutschezulassung-preview.mp4", aspect: "3/2", loop: true } as MediaAsset,
    heizwechsel: { enabled: false, webm: "/media/references/heizwechsel-preview.webm", mp4: "/media/references/heizwechsel-preview.mp4", aspect: "3/2", loop: true } as MediaAsset,
    hairvenly: { enabled: false, webm: "/media/references/hairvenly-preview.webm", mp4: "/media/references/hairvenly-preview.mp4", aspect: "3/2", loop: true } as MediaAsset,
  },

  /* Hero-Medienbereich der Leistungs-Unterseiten (rechts neben dem Text). */
  services: {
    "ki-agenten": off("/media/services/ai-agents-loop"),
    cybersecurity: off("/media/services/cybersecurity-loop"),
    webseiten: off("/media/services/web-development-loop"),
    "cloud-loesungen": off("/media/services/cloud-loop"),
    "backup-recovery": off("/media/services/backup-loop"),
    "managed-it": off("/media/services/managed-it-loop"),
  } as Record<string, MediaAsset>,

  /* Ruhige Cinemagraphs auf der Lösungsseite (ersetzen die Bilder). */
  solutions: {
    server: { enabled: false, webm: "/media/solutions/server-cinemagraph.webm", aspect: "16/9", loop: true } as MediaAsset,
    processor: { enabled: false, webm: "/media/solutions/processor-cinemagraph.webm", aspect: "16/9", loop: true } as MediaAsset,
    memory: { enabled: false, webm: "/media/solutions/memory-cinemagraph.webm", aspect: "16/9", loop: true } as MediaAsset,
    cloud: { enabled: false, webm: "/media/solutions/cloud-cinemagraph.webm", aspect: "16/9", loop: true } as MediaAsset,
  },

  /* Über-QonteX: nur für echtes, eigenes Material – kein Stock, keine KI-Menschen. */
  about: {
    team: off("/media/about/qontex-team"),
  },
} as const;
