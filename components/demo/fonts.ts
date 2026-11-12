import { Barlow_Condensed, JetBrains_Mono, Karla, Playfair_Display } from "next/font/google";

/* Schriften der beiden Beispielbetriebe – bewusst anders als die QonteX-Hausschrift. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const karla = Karla({ subsets: ["latin"], variable: "--font-karla", display: "swap" });
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});
const jbMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", display: "swap" });

export const demoFontVars = `${playfair.variable} ${karla.variable} ${barlow.variable} ${jbMono.variable}`;
