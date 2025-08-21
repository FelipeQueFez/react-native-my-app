export type ThemeName = "light" | "dark";
export type ThemeMode = "system" | ThemeName;

export type Theme = {
  name: ThemeName;
  colors: {
    background: string;
    text: string;
    card: string;
    primary: string;
    border: string;
    muted: string;
    danger: string;
  };
  radius: { sm: number; md: number; lg: number };
  spacing: (n: number) => number; // 1 => 4px, 2 => 8px...
};

export const lightTheme: Theme = {
  name: "light",
  colors: {
    background: "#ffffff",
    text: "#111111",
    card: "#f8f8f8",
    primary: "#3b82f6",
    border: "#e5e7eb",
    muted: "#6b7280",
    danger: "#ef4444",
  },
  radius: { sm: 6, md: 10, lg: 16 },
  spacing: (n) => n * 4,
};

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    background: "#0b0b0d",
    text: "#f5f5f5",
    card: "#151518",
    primary: "#60a5fa",
    border: "#2a2a2e",
    muted: "#9ca3af",
    danger: "#f87171",
  },
  radius: { sm: 6, md: 10, lg: 16 },
  spacing: (n) => n * 4,
};
