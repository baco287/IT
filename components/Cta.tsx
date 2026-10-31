import Link from "next/link";
import Reveal from "./Reveal";

/* Abstrakte, unscharfe Interface-Flächen als Tiefenebene (keine Projekt-Screenshots) */
const TILES = [
  { cls: "left-[-3rem] top-[9rem] h-[11rem] w-[17rem] rotate-[-2deg] blur-[3px] opacity-30", bars: [70, 45, 85, 30] },
  { cls: "left-[16rem] top-[16rem] h-[8.5rem] w-[13rem] rotate-[2deg] blur-[4px] opacity-25", bars: [55, 80, 40] },
  { cls: "right-[10rem] top-[7rem] h-[12rem] w-[19rem] rotate-[2deg] blur-[2px] opacity-35", bars: [60, 90, 50, 75] },
  { cls: "right-[-4rem] top-[18rem] h-[10rem] w-[15rem] rotate-[-2.5deg] blur-[4px] opacity-25", bars: [80, 35, 65] },
];

/* Finale CTA-Sektion: Riesen-Headline, schwebende Interface-Kacheln,
   Buttons und Mono-Chip unten. */
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
              className="tiledrift relative h-full overflow-hidden rounded-xl border border-cyan/20 bg-[linear-gradient(160deg,rgba(25,216,242,0.14),rgba(9,26,44,0.9))] p-4"
              style={{ animationDuration: `${22 + i * 4}s`, animationDelay: `${i * 3}s` }}
            >
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/25" />
                <span className="h-2 w-2 rounded-full bg-white/25" />
                <span className="h-2 w-2 rounded-full bg-white/25" />
              </div>
              <div className="mt-4 space-y-2.5">
                {t.bars.map((w, j) => (
                  <span
                    key={j}
                    className="block h-2 rounded-full bg-cyan/40"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
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
            klären wir, was deine IT sicherer und verlässlicher macht – ehrlich
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
