// This component file defines the Settings Panel component of the application

"use client";

import React, { useEffect } from "react";
import styles from "./ThemeSettings.module.css";
import { useSettings } from "@/context/SettingsContext";

const themes = {
  light: { bg: "#ffffff", text: "#111827", accent: "#2563eb" },
  dark: { bg: "#23211c", text: "#e7e3d7", accent: "#2563eb" },
  warm: { bg: "#e8e4da", text: "#3c3a36", accent: "#eab308" },
};

const ThemeSettings = () => {
  const { settings, setSettings } = useSettings();

  // Sync CSS variables with settings on mount and when settings change
  useEffect(() => {
    const themeVars = themes[settings.theme];
    document.documentElement.style.setProperty('--bg-color', themeVars.bg);
    document.documentElement.style.setProperty('--text-color', themeVars.text);
    // Use custom accent color if set, otherwise use theme default
    document.documentElement.style.setProperty(
      '--accent-color',
      settings.accentColor || themeVars.accent
    );
  }, [settings.theme, settings.accentColor]);

  const handleThemeChange = (theme: keyof typeof themes) => {
    setSettings((prev) => ({
      ...prev,
      theme,
      // Reset accentColor to theme default when switching theme
      accentColor: "",
    }));
  };

  const handleAccentColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, accentColor: e.target.value }));
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Theme & Color</h2>
      <div className={styles.themeOptions}>
        {Object.entries(themes).map(([key, value]) => (
          <button
            key={key}
            className={`${styles.themeButton} ${settings.theme === key ? styles.selected : ""}`}
            onClick={() => handleThemeChange(key as keyof typeof themes)}
            style={
              key === "warm"
                ? {
                    background: settings.theme === "warm" ? value.accent : value.bg,
                    color: settings.theme === "warm" ? "#fff" : value.text,
                  }
                : undefined
            }
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
        <input
          type="color"
          className={styles.colorPicker}
          title="Accent Color"
          value={settings.accentColor || themes[settings.theme].accent}
          onChange={handleAccentColorChange}
        />
      </div>
    </section>
  );
};

export default ThemeSettings;