import Link from "next/link";
import { offerHref, type Offer } from "@/lib/offers";
import { rowLink } from "./ui";

/* Große, ganz anklickbare Zeilen für die Übersichtsseiten: Name, ein Satz, Auszug aus dem Umfang */
export default function OfferRows({ offers, linkLabel }: { offers: Offer[]; linkLabel: string }) {
  return (
    <ul className="border-t border-ink/80">
      {offers.map((o) => (
        <li key={o.slug} className="border-b border-rule">
          <div className="relative -mx-4 grid gap-x-12 gap-y-4 rounded-[18px] px-4 py-8 transition-colors hover:bg-fog lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-start lg:py-10">
            <div>
              <h2 className="text-[1.65rem] leading-[1.15] sm:text-[1.9rem]">
                <Link href={offerHref(o)} className={rowLink}>
                  {o.name}
                </Link>
              </h2>
              <p className="mt-2.5 max-w-[30rem] text-[17px] leading-relaxed text-muted">{o.short}</p>
            </div>
            <ul className="grid gap-y-1.5 text-[15.5px] leading-snug text-text lg:pt-2">
              {o.scope.slice(0, 4).map((s) => (
                <li key={s} className="flex gap-3">
                  <span aria-hidden className="mt-[0.55em] h-1 w-1 flex-none rounded-full bg-signal-ink" />
                  {s}
                </li>
              ))}
            </ul>
            <span aria-hidden className="text-[15px] font-semibold text-signal-ink underline decoration-signal-ink/35 decoration-2 underline-offset-[5px] lg:pt-2">
              {linkLabel}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
