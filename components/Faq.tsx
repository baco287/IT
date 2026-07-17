"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const FAQS = [
  {
    q: "Für welche Unternehmen arbeitet QonteX?",
    a: "Wir betreuen kleine und mittelständische Unternehmen, die einen zuverlässigen IT-Partner suchen – unabhängig von der Branche. Entscheidend ist nicht Ihre Größe, sondern der Anspruch, dass IT verlässlich funktionieren soll.",
  },
  {
    q: "Übernimmt QonteX auch bestehende IT-Infrastrukturen?",
    a: "Ja. Wir analysieren den Bestand, dokumentieren alle Systeme und übernehmen anschließend den Betrieb – inklusive einer ehrlichen Einschätzung, was gut ist und was verbessert werden sollte. Ein Neuanfang auf der grünen Wiese ist dafür nicht nötig.",
  },
  {
    q: "Bietet QonteX laufenden IT-Support an?",
    a: "Ja, als planbaren Betreuungsvertrag: Updates, Monitoring, Datensicherung und direkter Support gehören dazu. Sie erreichen dabei feste Ansprechpartner, die Ihre Umgebung kennen.",
  },
  {
    q: "Wie schnell erhalten Kunden Unterstützung?",
    a: "Anfragen beantworten wir werktags in der Regel innerhalb kurzer Zeit; im Betreuungsvertrag vereinbaren wir verbindliche Reaktionszeiten, die zu Ihrem Betrieb passen. Kritische Störungen behandeln wir mit Priorität.",
  },
  {
    q: "Unterstützt QonteX Cloud- und Microsoft-365-Umgebungen?",
    a: "Ja. Wir planen und begleiten Cloud-Migrationen, richten Microsoft 365 sicher ein und verwalten hybride Umgebungen – inklusive Zugriffskonzepten, Datensicherung und zentraler Administration.",
  },
  {
    q: "Wie läuft eine erste IT-Beratung ab?",
    a: "Im kostenlosen Erstgespräch besprechen wir Ihre aktuelle Situation und Ihre Ziele – verständlich und ohne Fachchinesisch. Danach erhalten Sie eine klare Empfehlung, wie ein sinnvoller nächster Schritt aussieht. Das Gespräch ist unverbindlich.",
  },
];

function Item({ faq, index }: { faq: (typeof FAQS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = `faq-panel-${index}`;

  return (
    <div className="glass overflow-hidden rounded-xl transition-colors data-[open=true]:border-cyan/25" data-open={open}>
      <button
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-white sm:text-base">{faq.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className={`grid h-7 w-7 flex-none place-items-center rounded-full border ${
            open ? "border-cyan bg-cyan text-[#04222b]" : "border-white/15 text-fog"
          }`}
          aria-hidden
        >
          <Plus size={14} strokeWidth={2.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.25, 1] }}
          >
            <p className="max-w-2xl px-6 pb-5 text-sm leading-relaxed text-fog">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHead label="FAQ" title="Häufige Fragen" />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={0.05 * i}>
              <Item faq={f} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
