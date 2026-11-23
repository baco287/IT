import type { Metadata } from "next";
import Redirect from "@/components/Redirect";

/* Frühere Seite /automatisierung – Inhalte stehen jetzt unter Prozessautomatisierung */
export const metadata: Metadata = {
  title: "Seite umgezogen",
  alternates: { canonical: "/leistungen/prozessautomatisierung/" },
};

export default function AutomatisierungPage() {
  return <Redirect to="/leistungen/prozessautomatisierung/" label="Prozessautomatisierung" />;
}
