/** Zentrale, echte Unternehmens- und Kontaktdaten – einzige Quelle für die gesamte Website. */
export const COMPANY = {
  brand: "QonteX",
  legalName: "Volt Gas UG (haftungsbeschränkt)",
  street: "Pappelallee 64",
  zip: "10437",
  city: "Berlin",
  country: "DE",
  /** Einzige QonteX-Nummer: Anrufe und WhatsApp Business (seit 23.11.2026) */
  phoneDisplay: "+49 160 95257592",
  phoneE164: "+4916095257592",
  email: "info@qontex.de",
  url: "https://qontex.de",
} as const;

export const PHONE_DISPLAY = COMPANY.phoneDisplay;
export const PHONE_HREF = `tel:${COMPANY.phoneE164}`;
/** Öffnet den WhatsApp-Chat mit derselben Nummer (App auf dem Handy, WhatsApp Web/Desktop am Rechner) */
export const WHATSAPP_HREF = `https://wa.me/${COMPANY.phoneE164.replace("+", "")}`;
export const EMAIL = COMPANY.email;
export const ADDRESS_LINE = `${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}`;

/** Hauptaktion der Website */
export const CTA_LABEL = "Kostenloses Potenzialgespräch";
