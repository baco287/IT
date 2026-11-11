/** Zentrale, echte Unternehmens- und Kontaktdaten – einzige Quelle für die gesamte Website. */
export const COMPANY = {
  brand: "QonteX",
  legalName: "Volt Gas UG (haftungsbeschränkt)",
  street: "Pappelallee 64",
  zip: "10437",
  city: "Berlin",
  country: "DE",
  phoneDisplay: "+49 176 25041651",
  phoneE164: "+4917625041651",
  email: "info@qontex.de",
  url: "https://qontex.de",
} as const;

export const PHONE_DISPLAY = COMPANY.phoneDisplay;
export const PHONE_HREF = `tel:${COMPANY.phoneE164}`;
export const EMAIL = COMPANY.email;
export const ADDRESS_LINE = `${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}`;

/** Hauptaktion der Website */
export const CTA_LABEL = "Kostenloses Potenzialgespräch";
