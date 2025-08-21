import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../modules/shared/i18n/i18n"; // keep i18n init
import { ThemeProvider, toNavigationTheme, useTheme } from "../modules/shared/theme";

function NavWithTheme() {
  const { theme } = useTheme();
  const navTheme = toNavigationTheme(theme);
  return (
    <>
      {/* Pass theme to React Navigation */}
      <Stack screenOptions={{
                 // header background
          headerStyle: { backgroundColor: theme.colors.card },
          // back arrow & action icons color
          headerTintColor: theme.colors.text,
          // title color / style
          headerTitleStyle: { color: theme.colors.text, fontWeight: "700" },
          // content background behind screens
          contentStyle: { backgroundColor: theme.colors.background },
          // optional: remove bottom hairline or recolor it
          headerShadowVisible: true,
      }} />
      {/* Status bar contrast */}
      <StatusBar style={theme.name === "dark" ? "light" : "dark"} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <NavWithTheme />
    </ThemeProvider>
  );
}
