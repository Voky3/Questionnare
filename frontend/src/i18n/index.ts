import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import cz from "./cz.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      cz: { translation: cz },
    },
    fallbackLng: "cz",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;