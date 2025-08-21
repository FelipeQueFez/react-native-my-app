import { DarkTheme as NavDark, DefaultTheme as NavLight, Theme as NavTheme } from "@react-navigation/native";
import type { Theme } from "./tokens";

export function toNavigationTheme(t: Theme): NavTheme {
  const base = t.name === "dark" ? NavDark : NavLight;
  return {
    ...base,
    colors: {
      ...base.colors,
      background: t.colors.background,
      card: t.colors.card,
      text: t.colors.text,
      border: t.colors.border,
      primary: t.colors.primary,
    },
  };
}
