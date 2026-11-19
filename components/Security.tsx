import Image from "next/image";
import { CheckRows, PlainSection, h2Split } from "./ui";
import securityImg from "@/public/images/security.jpg";

const POINTS = [
  "Virenschutz für alle Geräte",
  "Firewall & Netzwerkschutz",
  "Schutz vor Phishing-E-Mails",
  "Regelmäßige Sicherheitsupdates",
  "Laufende Überwachung",
  "Getestete Datensicherung",
  "Schulung Ihrer Mitarbeiter",
];

export default function Security() {
  return (
    <PlainSection id="sicherheit">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <h2 className={h2Split}>Sicherheit beginnt, bevor ein Angriff passiert.</h2>
          <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-muted">
            Wir schützen Ihre Systeme, Daten und Arbeitsplätze mit abgestimmten Maßnahmen –
            technisch, organisatorisch und durch geschulte Mitarbeiter.
          </p>
          <div className="mt-8">
            <CheckRows items={POINTS} columns={2} />
          </div>
        </div>
        <Image
          src={securityImg}
          alt="Beleuchtete Leiterbahnen als Symbol für IT-Sicherheit"
          className="aspect-[4/3] w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          placeholder="blur"
        />
      </div>
    </PlainSection>
  );
}
