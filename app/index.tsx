import { useTheme } from "@shared/theme";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, Text, View } from "react-native";

export default function Home() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 20, color: theme.colors.text, }}>{t("appName")}</Text>

      {/* Link wraps the native Button */}
      <Link href="/todos" asChild style={{ color: theme.colors.text, }}>
        <Button title={t("nav.openTodos")} />
      </Link>
    </View>
  );
}
