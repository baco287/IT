import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    slug: "webseiten",
    title: "Webseiten & Online-Shops.",
    text: "Moderne, schnelle Webseiten wie in den Referenzen oben – konzipiert, gebaut und danach zuverlässig betreut.",
    linkLabel: "Mehr zu Webseiten",
  },
  {
    slug: "online-marketing",
    title: "Ads & Online-Marketing.",
    text: "Google- und Meta-Kampagnen mit sauberem Tracking und einem Reporting, das du wirklich verstehst.",
    linkLabel: "Mehr zu Online-Marketing",
  },
  {
    slug: "social-media",
    title: "Social Media.",
    text: "Strategie, Content und Betreuung deiner Kanäle – konstant sichtbar statt sporadisch aktiv.",
    linkLabel: "Mehr zu Social Media",
  },
];

/* Kompakte Sektion direkt nach den Referenzen: die Digital-Leistungen,
   mit denen genau solche Projekte entstehen. */
export default function DigitalTrio() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-[2.4rem]">
            Sichtbar werden.{" "}
            <span className="text-fog">
              Webseiten, Werbeanzeigen und Social Media – aus derselben Hand wie
              deine IT.
            </span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.slug} delay={i * 0.06}>
              <li className="group border-t border-white/12 pt-5 transition-[border-color] duration-300 hover:border-cyan/60">
                <p className="text-sm leading-relaxed text-fog">
                  <span className="font-semibold text-white/85 transition-colors duration-300 group-hover:text-white">
                    {it.title}
                  </span>{" "}
                  {it.text}
                </p>
                <Link
                  href={`/leistungen/${it.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:underline"
                >
                  {it.linkLabel}
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
