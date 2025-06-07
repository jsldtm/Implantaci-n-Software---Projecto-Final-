// Código por - Joaquín Saldarriaga
// ThemeProvider.tsx
"use client";
import React, { useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

const themes = {
  light: { bg: "#ffffff", text: "#111827", accent: "#2563eb" },
  dark: { bg: "#23211c", text: "#e7e3d7", accent: "#2563eb" },
  warm: { bg: "#e8e4da", text: "#3c3a36", accent: "#eab308" },
  navy: { bg: "#1e3a8a", text: "#f1f5f9", accent: "#60a5fa" },
  custom: { bg: "#e8e4da", text: "#3c3a36", accent: "#6b5b2a" },
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  useEffect(() => {
    let themeVars = themes[settings.theme as keyof typeof themes];
    if (settings.theme === "custom") {
      themeVars = {
        ...themes.custom,
        bg: settings.accentColor || themes.custom.bg,
        accent: settings.accentColor || themes.custom.accent,
      };
    }
    document.documentElement.style.setProperty('--bg-color', themeVars.bg);
    document.documentElement.style.setProperty('--text-color', themeVars.text);
    document.documentElement.style.setProperty('--accent-color', themeVars.accent);
  }, [settings.theme, settings.accentColor]);

  return <>{children}</>;
}
