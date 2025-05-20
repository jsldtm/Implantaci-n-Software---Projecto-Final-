// This page file defines the Settings page of the application

import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainHeader from "@/components/MainHeader/MainHeader";
import SettingsPanel from "@/components/Settings/SettingsPanel";

const SettingsPage = () => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar portalName="settings" />
    <div className="flex-1 overflow-y-auto p-4">
      <MainHeader username="User-Name Jake" />
      <SettingsPanel />
    </div>
  </div>
);

export default SettingsPage;