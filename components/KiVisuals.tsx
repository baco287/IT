"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

/* Animierte Illustrationen für die KI-Agenten-Karten.
   Bewusst im hellen Farbschema der Sektion (kein Dark-Mode-Fremdkörper).
   Laufen nur im sichtbaren Bereich und stehen bei reduzierter Bewegung
   sofort im Endzustand – identisch zur bisherigen statischen Variante. */

const LOOP = 9;

/* Sichtbar von `at` bis `until` (Sekunden), danach ausgeblendet. */
const step = (at: number, until = LOOP - 0.6): Transition => ({
  duration: LOOP,
  repeat: Infinity,
  ease: "linear",
  times: [0, at / LOOP, (at + 0.35) / LOOP, until / LOOP, 1],
});

const fade = { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 0] };

/* ---------------- WhatsApp ---------------- */

export function WhatsAppVisual() {
  const reduce = useReducedMotion();
  const bubble = "w-fit max-w-[85%] rounded-lg px-2.5 py-1 text-[11px] leading-snug";
  const inCls = `${bubble} bg-night/6 text-night`;
  const outCls = `${bubble} ml-auto bg-[#0d9b8a] text-white`;

  if (reduce) {
    return (
      <div className="flex h-40 flex-col justify-center gap-1.5 overflow-hidden px-4 sm:px-5">
        <span className={inCls}>Habt ihr morgen noch einen Termin frei?</span>
        <span className={outCls}>Ja – 10:30 oder 14:00 Uhr. Was passt besser?</span>
        <span className={inCls}>14 Uhr bitte!</span>
      </div>
    );
  }

  return (
    <div className="flex h-40 flex-col justify-center gap-1.5 overflow-hidden px-4 sm:px-5">
      <motion.span className={inCls} animate={fade} transition={step(0.4)}>
        Habt ihr morgen noch einen Termin frei?
      </motion.span>

      {/* Tipp-Indikator liegt absolut ueber der Antwortblase und belegt
          daher keine eigene Hoehe – sonst laeuft die Karte ueber. */}
      <div className="relative">
        <motion.span
          className={`${outCls} absolute right-0 top-0 flex gap-1 py-2.5`}
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.14, 0.18, 0.29, 0.33, 1],
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.i
              key={i}
              className="block h-1.5 w-1.5 rounded-full bg-white/80"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.span>

        <motion.span
          className={`${outCls} block`}
          animate={fade}
          transition={step(3.2)}
        >
          Ja – 10:30 oder 14:00 Uhr. Was passt besser?
        </motion.span>
      </div>

      <motion.span className={inCls} animate={fade} transition={step(5.2)}>
        14 Uhr bitte!
      </motion.span>
    </div>
  );
}

/* ---------------- Telefon ---------------- */

const BARS = [0.35, 0.7, 0.45, 0.95, 0.6, 0.8, 0.4, 0.75, 0.5, 0.9, 0.55, 0.7];

export function PhoneVisual() {
  const reduce = useReducedMotion();
  const lines = [
    "14:02 · Anruf angenommen",
    "14:03 · Anliegen: Drucker im Büro Ost",
    "14:04 · Ticket erstellt, Rückruf zugesagt",
  ];

  if (reduce) {
    return (
      <div className="flex h-40 flex-col justify-center gap-1.5 overflow-hidden px-4 sm:px-5 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[#3c4a53]">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
        <p className="text-[#0d9b8a]">✓ zusammengefasst an dein team</p>
      </div>
    );
  }

  return (
    <div className="flex h-40 flex-col justify-center gap-1.5 overflow-hidden px-4 sm:px-5">
      {/* Wellenform */}
      <div className="flex h-5 items-center gap-[3px]">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="w-[3px] flex-none rounded-full bg-[#0d9b8a]/70"
            animate={{ scaleY: [h * 0.3, h, h * 0.4, h * 0.85, h * 0.3] }}
            style={{ height: 18, originY: 0.5 }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.07,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-1 font-[family-name:var(--font-mono)] text-[11px] leading-snug text-[#3c4a53]">
        {lines.map((l, i) => (
          <motion.p key={l} animate={fade} transition={step(0.5 + i * 1.9)}>
            {l}
          </motion.p>
        ))}
        <motion.p
          className="text-[#0d9b8a]"
          animate={fade}
          transition={step(6.2)}
        >
          ✓ zusammengefasst an dein team
        </motion.p>
      </div>
    </div>
  );
}

/* ---------------- E-Mail ---------------- */

const MAILS = [
  { from: "anfrage@… Angebot", status: "beantwortet", tone: "text-[#0d9b8a]" },
  { from: "kunde@… Rechnung", status: "beantwortet", tone: "text-[#0d9b8a]" },
  { from: "partner@… Projekt", status: "entwurf bereit", tone: "text-[#b0653a]" },
];

export function EmailVisual() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="flex h-40 flex-col justify-center gap-1.5 overflow-hidden px-4 sm:px-5 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[#3c4a53]">
        {MAILS.map((m) => (
          <p key={m.from} className="flex justify-between">
            <span>{m.from}</span>
            <span className={m.tone}>{m.status}</span>
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-40 flex-col justify-center gap-1.5 overflow-hidden px-4 sm:px-5 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[#3c4a53]">
      {MAILS.map((m, i) => (
        <motion.p
          key={m.from}
          className="flex justify-between"
          animate={fade}
          transition={step(0.4 + i * 1.6)}
        >
          <span>{m.from}</span>
          {/* Status erscheint kurz nach der Zeile – wirkt wie Verarbeitung */}
          <motion.span
            className={m.tone}
            animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
            transition={{
              duration: LOOP,
              repeat: Infinity,
              ease: "linear",
              times: [
                0,
                (0.4 + i * 1.6) / LOOP,
                (1.1 + i * 1.6) / LOOP,
                (1.45 + i * 1.6) / LOOP,
                (LOOP - 0.6) / LOOP,
                1,
              ],
            }}
          >
            {m.status}
          </motion.span>
        </motion.p>
      ))}
    </div>
  );
}
