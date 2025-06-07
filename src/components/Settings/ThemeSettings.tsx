// Código por - Joaquín Saldarriaga
// This component file defines the Settings Panel component of the application

"use client";

import React, { useEffect } from "react";
import styles from "./ThemeSettings.module.css";
import { useSettings } from "@/context/SettingsContext";

const themes = {
  light: { bg: "#ffffff", text: "#111827", accent: "#2563eb" },
  dark: { bg: "#23211c", text: "#e7e3d7", accent: "#2563eb" },
  warm: { bg: "#e8e4da", text: "#3c3a36", accent: "#eab308" },
  navy: { bg: "#1e3a8a", text: "#f1f5f9", accent: "#60a5fa" }, // Navy Blue theme
  custom: { bg: "#e8e4da", text: "#3c3a36", accent: "#6b5b2a" }, // Added custom theme
};

const ThemeSettings = () => {
  const { settings, setSettings } = useSettings();

  // Sync CSS variables with settings on mount and when settings change
  useEffect(() => {
    let themeVars = themes[settings.theme];
    // If custom theme, override bg and accent with accentColor
    if (settings.theme === "custom") {
      themeVars = {
        ...themes.custom,
        bg: settings.accentColor || themes.custom.bg,
        accent: settings.accentColor || themes.custom.accent,
      };
    }
    document.documentElement.style.setProperty('--bg-color', themeVars.bg);
    document.documentElement.style.setProperty('--text-color', themeVars.text);
    document.documentElement.style.setProperty(
      '--accent-color',
      themeVars.accent
    );
  }, [settings.theme, settings.accentColor]);

  const handleThemeChange = (theme: keyof typeof themes) => {
    setSettings((prev) => ({
      ...prev,
      theme,
      accentColor: "",
    }));
  };

  const handleAccentColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      accentColor: e.target.value,
      theme: "custom"
    }));
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Theme & Color</h2>
      <div className={styles.themeOptions}>
        {Object.entries(themes).map(([key, value]) => (
          <button
            key={key}
            className={`${styles.themeButton} ${settings.theme === key ? styles.selected : ""}`}
            onClick={() => handleThemeChange(key as keyof typeof themes)}            style={
              key === "warm"
                ? {
                    background: settings.theme === "warm" ? value.accent : value.bg,
                    color: settings.theme === "warm" ? "#FFF7E6" : value.text,
                  }
                : key === "navy"
                ? {
                    background: settings.theme === "navy" ? value.accent : value.bg,
                    color: settings.theme === "navy" ? "#ffffff" : value.text,
                  }
                : undefined
            }          >
            {key === 'navy' ? 'Navy Blue' : key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
        {/* Custom color box as a theme option, styled as a square color input */}
        <input
          type="color"
          className={styles.colorPicker}
          title="Accent Color"
          value={settings.accentColor || themes[settings.theme]?.accent || "#6b5b2a"}
          onChange={handleAccentColorChange}
          style={{
            width: 40,
            height: 40,
            borderRadius: 4,
            border: settings.theme === "custom" ? "2px solid #2563eb" : "none",
            boxSizing: "border-box",
            padding: 0,
            background: "none",
            cursor: "pointer",
          }}
        />
      </div>
    </section>
  );
};

export default ThemeSettings;