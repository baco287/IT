"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SplitSection, textLink } from "./ui";
import { FAQS } from "@/lib/faqs";

type FaqEntry = (typeof FAQS)[number];

function Item({ faq, index }: { faq: FaqEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${index}`;

  return (
    <div className="border-b border-rule">
      <h3>
        <button
          type="button"
          className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          <span className="font-[family-name:var(--font-body)] text-[17px] font-semibold leading-snug text-ink">
            {faq.q}
          </span>
          <Plus
            size={20}
            strokeWidth={2.2}
            className={`flex-none text-signal-ink transition-transform duration-200 motion-reduce:transition-none ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden
          />
        </button>
      </h3>
      {/* Antwort bleibt im Dokument (auch für Suchmaschinen), wird nur ein- und ausgeblendet */}
      <div id={id} hidden={!open}>
        <p className="max-w-2xl pb-6 text-[16.5px] leading-relaxed text-muted">{faq.a}</p>
      </div>
    </div>
  );
}

/* Fragen als aufklappbare Zeilen. Mit `items` nur eine Auswahl (Startseite) samt Verweis auf alle. */
export default function Faq({
  items = FAQS,
  title = "Häufige Fragen",
  text,
  showAllLink = false,
}: {
  items?: FaqEntry[];
  title?: string;
  text?: string;
  showAllLink?: boolean;
}) {
  return (
    <SplitSection
      id="faq"
      headingId="faq-heading"
      title={title}
      text={text}
      tone="fog"
      extra={
        showAllLink ? (
          <Link href="/kontakt#faq" className={`inline-flex min-h-11 items-center text-[15.5px] ${textLink}`}>
            Alle Fragen ansehen
          </Link>
        ) : undefined
      }
    >
      <div className="border-t border-ink/80">
        {items.map((f, i) => (
          <Item key={f.q} faq={f} index={i} />
        ))}
      </div>
    </SplitSection>
  );
}
