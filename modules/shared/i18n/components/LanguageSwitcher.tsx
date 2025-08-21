import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { setAppLanguage } from "../i18n";
import { supportedLanguages, type AppLanguage } from "../languages";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = (i18n.language || "en").split("-")[0] as AppLanguage;

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {supportedLanguages.map(({ code, label }) => {
        const active = current === code;
        return (
          <Pressable
            key={code}
            onPress={() => setAppLanguage(code)}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: active ? "#333" : "#ccc",
              opacity: active ? 1 : 0.7
            }}
            accessibilityRole="button"
            accessibilityLabel={`Switch language to ${label}`}
          >
            <Text style={{ fontWeight: active ? "700" : "400" }}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
