import Image from "next/image";
import { Laptop, Shield, Mail, RefreshCw, Eye, HardDriveDownload, Users } from "lucide-react";
import Reveal from "./Reveal";
import { Eyebrow, container } from "./ui";
import securityImg from "@/public/images/security.jpg";

const POINTS = [
  { icon: Laptop, label: "Virenschutz für alle Geräte" },
  { icon: Shield, label: "Firewall & Netzwerkschutz" },
  { icon: Mail, label: "Schutz vor Phishing-E-Mails" },
  { icon: RefreshCw, label: "Regelmäßige Sicherheitsupdates" },
  { icon: Eye, label: "Laufende Überwachung" },
  { icon: HardDriveDownload, label: "Getestete Datensicherung" },
  { icon: Users, label: "Schulung Ihrer Mitarbeiter" },
];

export default function Security() {
  return (
    <section id="sicherheit" className="bg-soft py-16 lg:py-20">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        <div>
          <Eyebrow>IT-Sicherheit</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[2.4rem]">
            Sicherheit beginnt, bevor ein Angriff passiert.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
            Wir schützen Ihre Systeme, Daten und Arbeitsplätze mit abgestimmten
            Maßnahmen – technisch, organisatorisch und durch geschulte Mitarbeiter.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p.label} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
                <p.icon size={19} strokeWidth={1.9} className="flex-none text-teal-dark" aria-hidden />
                <span className="text-[15px] font-medium text-ink">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-2xl border border-line">
            <Image
              src={securityImg}
              alt="Beleuchtete Leiterbahnen als Symbol für IT-Sicherheit"
              className="aspect-[4/3] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
