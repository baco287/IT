import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* Klassen zusammenführen – wird von shadcn, Magic UI und React Bits erwartet
   (Import „@/lib/utils“). Spätere Klassen gewinnen bei Konflikten. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
