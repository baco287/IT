import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import zulassung from "@/public/images/refs/deutschezulassung.jpg";
import heizwechsel from "@/public/images/refs/heizwechsel.jpg";
import hairvenly from "@/public/images/refs/hairvenly.jpg";
import voltgas from "@/public/images/refs/volt-gas.jpg";

const TILES = [
  { img: voltgas, cls: "left-[-3rem] top-[9rem] w-[17rem] rotate-[-2deg] blur-[3px] opacity-25" },
  { img: hairvenly, cls: "left-[16rem] top-[16rem] w-[13rem] rotate-[2deg] blur-[4px] opacity-20" },
  { img: zulassung, cls: "right-[10rem] top-[7rem] w-[19rem] rotate-[2deg] blur-[2px] opacity-30" },
  { img: heizwechsel, cls: "right-[-4rem] top-[18rem] w-[15rem] rotate-[-2.5deg] blur-[4px] opacity-20" },
];

/* Finale CTA-Sektion im neon-Stil: Riesen-Headline, schwebende
   Referenz-Kacheln, Buttons und Mono-Chip unten. */
export default function Cta() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-36">
      <div
        className="absolute inset-0 hidden md:block [mask-image:linear-gradient(to_bottom,black_60%,transparent_92%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_92%)]"
        aria-hidden
      >
        {TILES.map((t, i) => (
          <div key={i} className={`absolute ${t.cls}`}>
            {/* Innere Ebene driftet extrem langsam – je Kachel anderes Tempo */}
            <div
              className="tiledrift relative overflow-hidden rounded-xl border border-white/5"
              style={{ animationDuration: `${22 + i * 4}s`, animationDelay: `${i * 3}s` }}
            >
              <Image src={t.img} alt="" className="w-full" sizes="320px" />
              <div className="absolute inset-0 bg-night/60" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl text-[3rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-[4.4rem]">
            IT, die einfach funktioniert.
          </h2>
        </Reveal>

        <Reveal className="mt-28 flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-sm leading-relaxed text-fog">
            Betreut von Menschen, nicht Hotlines. Im kostenlosen Erstgespräch
            klären wir, was Ihre IT sicherer und verlässlicher macht – ehrlich
            und unverbindlich.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/kontakt"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-night transition-colors hover:bg-mist"
            >
              Kostenlose Erstberatung
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-mist transition-colors hover:border-white/40"
            >
              Leistungen ansehen
            </Link>
            <a
              href="mailto:info@qontex.de"
              className="inline-flex items-center rounded-md bg-[#123d43] px-4 py-2.5 font-[family-name:var(--font-mono)] text-sm text-[#9beee0] transition-colors hover:bg-[#175058]"
            >
              $ info@qontex.de
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
