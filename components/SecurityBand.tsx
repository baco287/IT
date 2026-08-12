import {
  ShieldCheck,
  Activity,
  Server,
  Lock,
  HardDriveDownload,
  Clock,
} from "lucide-react";
import Reveal from "./Reveal";
import Counter from "./Counter";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Mehrschichtige Sicherheit",
    text: "Firewall, Endpoint-Schutz und E-Mail-Sicherheit greifen ineinander – kein einzelnes Produkt, sondern ein Konzept.",
  },
  {
    icon: Activity,
    title: "24/7-Monitoring",
    text: "Wir sehen Probleme, bevor du sie bemerkst – mit klaren Eskalationswegen, wenn es darauf ankommt.",
  },
  {
    icon: HardDriveDownload,
    title: "Getestete Backups",
    text: "Datensicherung mit regelmäßiger Wiederherstellungsprobe. Im Ernstfall zählt, dass es wirklich zurückkommt.",
  },
];

const STATS = [
  { value: <Counter to={24} suffix="/7" />, label: "Systemüberwachung" },
  { value: <><Counter to={99} />,9 %</>, label: "Angestrebte Verfügbarkeit" },
  { value: <>&lt; <Counter to={24} /> h</>, label: "Reaktionszeit" },
  { value: <Counter to={1} />, label: "Persönlicher Ansprechpartner" },
];

export default function SecurityBand() {
  return (
    <section className="section-dark px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#8fb6ec]">
            <Lock size={13} aria-hidden />
            Sicherheit &amp; Betrieb
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            IT, die läuft – und geschützt bleibt.
          </h2>
          <p className="mt-4 leading-relaxed text-[#b9c8de]">
            Sicherheit ist bei uns kein Zusatz, sondern Grundlage. Deine Systeme
            werden kontinuierlich überwacht, aktuell gehalten und gesichert –
            damit ein Zwischenfall kein Stillstand wird.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.06]">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#2660b4]/25 text-[#8fb6ec]">
                  <p.icon size={21} strokeWidth={1.9} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#b9c8de]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 grid grid-cols-2 gap-y-8 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-9 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-4 ${i > 0 ? "border-l border-white/10" : ""} ${
                  i === 2 ? "max-lg:border-l-0" : ""
                }`}
              >
                <p className="flex items-center gap-1.5 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
                  <Server size={18} className="hidden text-[#8fb6ec] sm:block" aria-hidden />
                  {s.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-[#9fb2cc]">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 flex items-center gap-2 text-sm text-[#9fb2cc]">
            <Clock size={15} className="text-[#8fb6ec]" aria-hidden />
            Angaben sind Leistungsversprechen, keine vertraglichen Zusagen –
            konkrete Werte vereinbaren wir individuell im Betreuungsvertrag.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
