// This page file defines the Settings page of the application

import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainHeader from "@/components/MainHeader/MainHeader";
import SettingsPanel from "@/components/Settings/SettingsPanel";

const SettingsPage = () => {
  const { settings } = useSettings();
  return (
    <div className="flex h-screen">
      <Sidebar portalName="settings" />
      <div className="flex-1 overflow-y-auto p-4">
        <MainHeader username={`User-Name ${settings.username}`} />
        <SettingsPanel />
      </div>
    </div>
  );
};

export default SettingsPage;
