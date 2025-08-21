import { Pressable, Text, View } from "react-native";
import { useTheme } from "../ThemeProvider";
import type { ThemeMode } from "../tokens";

const OPTIONS: { key: ThemeMode; label: string }[] = [
  { key: "system", label: "System" },
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
];

export default function ThemeSwitcher() {
  const { mode, setMode, theme } = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {OPTIONS.map(({ key, label }) => {
        const active = key === mode;
        return (
          <Pressable
            key={key}
            onPress={() => setMode(key)}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: theme.radius.md,
              borderWidth: 1,
              borderColor: active ? theme.colors.text : theme.colors.border,
              backgroundColor: active ? theme.colors.card : "transparent",
              opacity: active ? 1 : 0.8
            }}
            accessibilityRole="button"
            accessibilityLabel={`Switch theme to ${label}`}
          >
            <Text style={{ color: theme.colors.text, fontWeight: active ? "700" : "400" }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
