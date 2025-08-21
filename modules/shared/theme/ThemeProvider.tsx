import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, type Theme, type ThemeMode, type ThemeName } from "./tokens";

const STORAGE_KEY = "ui.theme.mode";

type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode;                 // "system" | "light" | "dark"
  setMode: (mode: ThemeMode) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme(); // "light" | "dark" | null
  const [mode, setModeState] = useState<ThemeMode>("system");

  // Load persisted mode on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setModeState(saved);
        }
      } catch {}
    })();
  }, []);

  const setMode = useCallback(async (m: ThemeMode) => {
    setModeState(m);
    try { await AsyncStorage.setItem(STORAGE_KEY, m); } catch {}
  }, []);

  const resolvedName: ThemeName =
    mode === "system" ? ((systemScheme as ThemeName) ?? "light") : mode;

  const theme = useMemo(() => (resolvedName === "dark" ? darkTheme : lightTheme), [resolvedName]);

  const value = useMemo(() => ({ theme, mode, setMode }), [theme, mode, setMode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
