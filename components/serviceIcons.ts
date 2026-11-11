import {
  Workflow,
  PanelsTopLeft,
  Search,
  Megaphone,
  Handshake,
  Bot,
  Target,
  Share2,
  BarChart3,
  Server,
  Headset,
  Cloud,
  ShieldCheck,
  Network,
  DatabaseBackup,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  prozessautomatisierung: Workflow,
  webseiten: PanelsTopLeft,
  "seo-ki-agenten": Search,
  "marketing-automatisierung": Megaphone,
  "crm-vertrieb": Handshake,
  "ki-agenten": Bot,
  "online-marketing": Target,
  "social-media": Share2,
  dashboards: BarChart3,
  "managed-it": Server,
  "it-support": Headset,
  "cloud-loesungen": Cloud,
  cybersecurity: ShieldCheck,
  "server-netzwerke": Network,
  "backup-recovery": DatabaseBackup,
};

export function serviceIcon(slug: string): LucideIcon {
  return ICONS[slug] ?? Sparkles;
}
