// This component file defines the Settings Panel component of the application

"use client";

import React from "react";
import { useSettings } from "@/context/SettingsContext";
import styles from "./ProductDisplaySettings.module.css";

const ProductDisplaySettings = () => {
  const { settings, setSettings } = useSettings();

  return (
    <section className = {styles.productDisplayOptions}>
      <h2 className = "text-xl font-semibold mb-2">Product Display</h2>
      <div>
        <label className = {styles.checkboxLabel}>
          <input
            type = "checkbox"
            className = "mr-2"
            checked = {settings.showProductRatings}
            onChange = {e => setSettings(s => ({ ...s, showProductRatings: e.target.checked }))}
          />
          Show product ratings
        </label>
        <br />
        <label className = {styles.checkboxLabel}>
          <input
            type = "checkbox"
            className = "mr-2"
            checked = {settings.showOnlyInStock}
            onChange = {e => setSettings(s => ({ ...s, showOnlyInStock: e.target.checked }))}
          />
          Show only in-stock products
        </label>
      </div>
    </section>
  );
};

export default ProductDisplaySettings;
