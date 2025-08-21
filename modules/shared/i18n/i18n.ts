import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANG, PERSIST_KEY, type AppLanguage } from "./languages";

// static resources (simple, no http backend)
import en from "./locales/en/common.json";
import es from "./locales/es/common.json";
import pt from "./locales/pt/common.json";

const resources = {
  en: { common: en },
  es: { common: es },
  pt: { common: pt },
} as const;

const deviceLang =
  Localization.getLocales?.()[0]?.languageCode?.toLowerCase() ?? DEFAULT_LANG;

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources,
    lng: deviceLang,
    fallbackLng: DEFAULT_LANG,
    defaultNS: "common",
    interpolation: { escapeValue: false },
    returnNull: false,
  });

// try to load persisted language after init (fire-and-forget)
(async () => {
  try {
    const saved = await AsyncStorage.getItem(PERSIST_KEY);
    if (saved && saved !== i18n.language) await i18n.changeLanguage(saved);
  } catch {}
})();

export async function setAppLanguage(lng: AppLanguage) {
  await AsyncStorage.setItem(PERSIST_KEY, lng);
  await i18n.changeLanguage(lng);
}

export default i18n;
