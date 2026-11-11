import { Clock3, PiggyBank, TrendingUp } from "lucide-react";
import SavingsCalculator from "./SavingsCalculator";
import { IconTile, SectionHead, container } from "./ui";

const BENEFITS = [
  {
    icon: Clock3,
    title: "Zeit sparen",
    text: "Wiederkehrende Tätigkeiten und Routineanfragen automatisieren.",
  },
  {
    icon: PiggyBank,
    title: "Kosten reduzieren",
    text: "Manuelle Bearbeitungszeiten und unnötige Prozessschritte verringern.",
  },
  {
    icon: TrendingUp,
    title: "Wachstum ermöglichen",
    text: "Mehr Anfragen bearbeiten, ohne jeden zusätzlichen Vorgang manuell abwickeln zu müssen.",
  },
];

/* Einsparpotenzial: drei Vorteile und ein transparenter Rechner mit eigenen Annahmen */
export default function Savings({ tone = "white" }: { tone?: "white" | "soft" }) {
  return (
    <section aria-labelledby="savings-heading" className={`${tone === "soft" ? "bg-soft" : "bg-white"} py-20 lg:py-28`}>
      <div className={container}>
        <SectionHead
          eyebrow="Einsparpotenzial"
          title={
            <span id="savings-heading">
              Weniger manuelle Arbeit. <br className="hidden sm:block" />
              Mehr Zeit für Ihr Geschäft.
            </span>
          }
          text="Automatisierung lohnt sich dort, wo dieselben Handgriffe jeden Tag wiederkehren. Rechnen Sie mit Ihren eigenen Zahlen nach, was das für Ihr Unternehmen bedeuten könnte."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <ul className="divide-y divide-line border-y border-line lg:self-start">
            {BENEFITS.map((b) => (
              <li key={b.title} className="flex items-start gap-5 py-6">
                <IconTile>
                  <b.icon size={23} strokeWidth={1.8} aria-hidden />
                </IconTile>
                <div>
                  <h3 className="text-[1.2rem] font-bold">{b.title}</h3>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-muted">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <SavingsCalculator />
        </div>
      </div>
    </section>
  );
}
