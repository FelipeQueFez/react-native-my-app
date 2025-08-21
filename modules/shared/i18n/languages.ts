export const supportedLanguages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
] as const;

export type AppLanguage = typeof supportedLanguages[number]["code"];
export const DEFAULT_LANG: AppLanguage = "en";
export const PERSIST_KEY = "i18n.lang";
