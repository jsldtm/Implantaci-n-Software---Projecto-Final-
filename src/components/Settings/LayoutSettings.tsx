// This component file defines the Settings Panel component of the application

"use client";

import React from "react";
import styles from "./LayoutSettings.module.css";
import { useSettings } from "@/context/SettingsContext";

const LayoutSettings = () => {
  const { settings, setSettings } = useSettings();

  return (
    <section className={styles.layoutOptions}>
      <h2 className="text-xl font-semibold mb-2">Layout & Structure</h2>
      <div>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={settings.compactSidebar}
            onChange={e => setSettings(s => ({ ...s, compactSidebar: e.target.checked }))}
          />
          Compact sidebar
        </label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={settings.showCategoriesAsGrid}
            onChange={e => setSettings(s => ({ ...s, showCategoriesAsGrid: e.target.checked }))}
          />
          Show categories as grid
        </label>
      </div>
    </section>
  );
};

export default LayoutSettings;
