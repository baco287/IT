"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SplitSection } from "./ui";
import { FAQS } from "@/lib/faqs";

function Item({ faq, index }: { faq: (typeof FAQS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${index}`;

  return (
    <div className="border-b border-ink/15">
      <h3>
        <button
          type="button"
          className="-mx-3 flex w-[calc(100%+1.5rem)] items-center justify-between gap-5 px-3 py-5 text-left transition-colors hover:bg-teal-tint"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          <span className="font-[family-name:var(--font-body)] text-[17px] font-semibold leading-snug text-ink">
            {faq.q}
          </span>
          <Plus
            size={20}
            strokeWidth={2.4}
            className={`flex-none text-ink transition-transform duration-200 motion-reduce:transition-none ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden
          />
        </button>
      </h3>
      {/* Antwort bleibt im Dokument (auch für Suchmaschinen), wird nur ein- und ausgeblendet */}
      <div id={id} hidden={!open}>
        <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-muted">{faq.a}</p>
      </div>
    </div>
  );
}

/* Fragen als aufklappbare Zeilen mit Linien */
export default function Faq() {
  return (
    <SplitSection id="faq" headingId="faq-heading" title="Häufige Fragen">
      <div className="border-t-2 border-ink">
        {FAQS.map((f, i) => (
          <Item key={f.q} faq={f} index={i} />
        ))}
      </div>
    </SplitSection>
  );
}
