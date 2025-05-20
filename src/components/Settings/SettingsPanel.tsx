// This component file defines the Settings Panel component of the application

import React from "react";
import ThemeSettings from "./ThemeSettings";
import LayoutSettings from "./LayoutSettings";
import ProductDisplaySettings from "./ProductDisplaySettings";
import UsernameSettings from "./UsernameSettings";

const SettingsPanel = () => (
  <div className = "space-y-8 max-w-2xl mx-auto">
    <h1 className = "text-2xl font-bold mb-4">Settings</h1>
    <ThemeSettings />
    <LayoutSettings />
    <ProductDisplaySettings />
    <UsernameSettings />
  </div>
);

export default SettingsPanel;