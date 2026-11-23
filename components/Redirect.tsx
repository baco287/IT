import Link from "next/link";
import { BASE_PATH } from "@/lib/company";

/**
 * Weiterleitung für frühere Adressen. Die Website ist ein statischer Export, daher
 * leitet die Seite selbst per meta refresh weiter (React setzt das Tag in den <head>).
 * Für Suchmaschinen zeigt die kanonische Adresse auf das neue Ziel (siehe generateMetadata).
 */
export default function Redirect({ to, label }: { to: string; label: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${BASE_PATH}${to}`} />
      <main id="inhalt" className="mx-auto max-w-2xl px-5 py-24 sm:px-8">
        <h1 className="text-[2rem]">Diese Seite ist umgezogen</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-muted">
          Sie werden weitergeleitet. Falls nicht, geht es hier weiter:{" "}
          <Link href={to} className="font-semibold text-signal-ink underline underline-offset-4">
            {label}
          </Link>
        </p>
      </main>
    </>
  );
}
