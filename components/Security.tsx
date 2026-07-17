import Image from "next/image";
import {
  Laptop,
  Shield,
  Mail,
  RefreshCw,
  Eye,
  HardDriveDownload,
  Users,
} from "lucide-react";
import Reveal from "./Reveal";
import securityImg from "@/public/images/security.jpg";

const POINTS = [
  { icon: Laptop, label: "Endpoint Protection" },
  { icon: Shield, label: "Firewall & Netzwerksicherheit" },
  { icon: Mail, label: "E-Mail-Sicherheit" },
  { icon: RefreshCw, label: "Sicherheitsupdates" },
  { icon: Eye, label: "Monitoring" },
  { icon: HardDriveDownload, label: "Backup-Strategien" },
  { icon: Users, label: "Mitarbeitersensibilisierung" },
];

export default function Security() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Dunklerer, dramatischerer Grund */}
      <div className="absolute inset-0 bg-[#04070c]" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_78%_40%,rgba(45,212,234,0.07),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="glass mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
              Cybersecurity
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Sicherheit beginnt, bevor ein Angriff passiert.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-fog">
              QonteX schützt Ihre Systeme, Daten und digitalen Arbeitsplätze mit
              modernen Sicherheitskonzepten, kontinuierlicher Überwachung und klar
              definierten Schutzmaßnahmen.
            </p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <Reveal key={p.label} delay={0.05 * i}>
                <li className="glass flex items-center gap-3 rounded-xl px-4 py-3">
                  <p.icon size={17} strokeWidth={2} className="flex-none text-cyan" aria-hidden />
                  <span className="text-sm font-medium text-mist">{p.label}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.15}>
          <div className="glass relative overflow-hidden rounded-2xl">
            <Image
              src={securityImg}
              alt="Beleuchteter Schaltplan als Symbol für mehrschichtige IT-Sicherheit"
              className="aspect-[4/3] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#04070c]/80 via-transparent to-transparent"
              aria-hidden
            />
            <div className="glass-strong absolute bottom-4 left-4 right-4 rounded-xl px-5 py-3.5">
              <p className="text-sm font-semibold text-white">
                Mehrschichtiger Schutz
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-fog">
                Technik, Prozesse und Menschen – Sicherheit auf allen Ebenen.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
