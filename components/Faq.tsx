"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHead, container } from "./ui";
import { FAQS } from "@/lib/faqs";

function Item({ faq, index }: { faq: (typeof FAQS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${index}`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-200 ${
        open ? "border-teal-dark" : "border-line"
      }`}
    >
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          <span className="text-[17px] font-semibold leading-snug text-ink">{faq.q}</span>
          <span
            className={`grid h-8 w-8 flex-none place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-200 motion-reduce:transition-none ${
              open ? "rotate-45 border-ink bg-ink text-white" : "border-line text-ink"
            }`}
            aria-hidden
          >
            <Plus size={15} strokeWidth={2.5} />
          </span>
        </button>
      </h3>
      {/* Antwort bleibt im Dokument (auch für Suchmaschinen), wird nur ein- und ausgeblendet */}
      <div id={id} hidden={!open}>
        <p className="max-w-3xl px-6 pb-6 text-[16px] leading-relaxed text-muted">{faq.a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="bg-soft py-20 lg:py-24">
      <div className={`${container} max-w-4xl`}>
        <SectionHead eyebrow="Häufige Fragen" title="Gut zu wissen" />
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <Item key={f.q} faq={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
