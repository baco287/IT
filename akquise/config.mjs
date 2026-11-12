/* Einstellungen des Akquise-Agenten – hier anpassen, nicht in den Skripten. */
export const CONFIG = {
  ort: "Bremen",
  ags: "04011000", // Amtlicher Gemeindeschlüssel der Stadt Bremen (ohne Bremerhaven)

  branchen: {
    restaurant: { osm: '["amenity"="restaurant"]', label: "Restaurant" },
    werkstatt: { osm: '["shop"="car_repair"]', label: "Kfz-Werkstatt" },
  },

  absender: {
    marke: "QonteX",
    firma: "Volt Gas UG (haftungsbeschränkt)",
    strasse: "Pappelallee 64",
    plzOrt: "10437 Berlin",
    telefon: "+49 176 25041651",
    email: "info@qontex.de",
    demoUrl: "qontex.de/demo",
    ansprechpartner: "Sezer Karakus",
  },

  /* Ab diesem Wert bekommt ein Betrieb ein Anschreiben (0–100). */
  mindestScore: 70,

  /* So meldet sich der Webseiten-Check bei fremden Servern. */
  userAgent: "QonteX-Akquise/1.0 (+https://qontex.de)",
  gleichzeitig: 8,
  zeitlimitMs: 12_000,
};
