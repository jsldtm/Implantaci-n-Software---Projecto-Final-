// This page file defines the Settings page of the application

"use client";

import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainHeader from "@/components/MainHeader/MainHeader";
import SettingsPanel from "@/components/Settings/SettingsPanel";
import { useSettings } from "@/context/SettingsContext";

const SettingsPage = () => {
  const { settings } = useSettings();
  return (
    <div className = "flex h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <Sidebar portalName = "settings" />
      <div className = "flex-1 overflow-y-auto p-4">
        <MainHeader />
        <SettingsPanel />
      </div>
    </div>
  );
};

export default SettingsPage;
