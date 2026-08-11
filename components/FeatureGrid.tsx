import {
  ShieldCheck,
  MapPin,
  Activity,
  HardDriveDownload,
  UserRound,
  BadgeEuro,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "DSGVO-konform",
    text: "Saubere Verträge, Auftragsverarbeitung und ein datenschutzbewusster Umgang mit Ihren Systemen.",
  },
  {
    icon: MapPin,
    title: "Hosting in Deutschland",
    text: "Ihre Daten liegen in deutschen Rechenzentren – keine Grauzonen, kein Auslandstransfer.",
  },
  {
    icon: Activity,
    title: "24/7-Monitoring",
    text: "Systeme werden rund um die Uhr überwacht, mit klaren Eskalationswegen im Ernstfall.",
  },
  {
    icon: HardDriveDownload,
    title: "Getestete Backups",
    text: "Datensicherung mit regelmäßiger Wiederherstellungsprobe – nicht nur ein grünes Häkchen.",
  },
  {
    icon: UserRound,
    title: "Persönlicher Ansprechpartner",
    text: "Feste Kontaktperson, die Ihre Umgebung kennt – kein anonymes Ticketsystem.",
  },
  {
    icon: BadgeEuro,
    title: "Transparente Festpreise",
    text: "Der Preis im Angebot ist der Preis auf der Rechnung. Mehraufwand ist unser Risiko.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Warum QonteX"
          title="Auf Nummer sicher – im wörtlichen Sinn"
          text="Vertrauen entsteht aus Grundlagen, nicht aus Versprechen. Das ist bei uns Standard."
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.06}>
              <div className="h-full bg-night p-7 transition-colors hover:bg-white/[0.03]">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-cyan/12 text-cyan">
                  <it.icon size={20} strokeWidth={1.9} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
