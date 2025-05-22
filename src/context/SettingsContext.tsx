// This Context file handles the settings states

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Settings {
  // Theme settings
  theme: 'light' | 'dark' | 'warm';
  accentColor: string;
  username: string;

  // Layout settings
  compactSidebar: boolean;
  showCategoriesAsGrid: boolean;
  showProductRatings: boolean;
  showOnlyInStock: boolean;
}

const defaultSettings: Settings = {
  // Theme defaults
  theme: 'light',
  accentColor: "",
  username: "User-Name Jake",

  // Layout defaults
  compactSidebar: false,
  showCategoriesAsGrid: false,
  showProductRatings: false,
  showOnlyInStock: false,
};

const SettingsContext = createContext<{
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("settings");
      return saved ? JSON.parse(saved) : defaultSettings;
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
