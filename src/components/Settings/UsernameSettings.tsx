// Código por - Joaquín Saldarriaga
// This component file defines the Settings Panel component of the application

"use client";

import React, { useState } from "react";
import { useUsername } from "@/context/UsernameContext";
import { useSettings } from "@/context/SettingsContext";

const UsernameSettings = () => {
  const { settings, setSettings } = useSettings();
  const [input, setInput] = useState(settings.username);

  const handleSave = () => {
    setSettings(prev => ({
      ...prev,
      username: input
    }));
  };

  return (
    <section>
      <h2 className = "text-xl font-semibold mb-2">Displayed Username</h2>
      <input
        className = "border px-2 py-1 rounded mr-2"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button className = "px-3 py-1 bg-blue-600 text-white rounded" onClick={handleSave}>
        Save
      </button>
      <div className = "mt-2 text-gray-600">
        Current: <span className = "font-bold">{settings.username}</span>
      </div>
    </section>
  );
};

export default UsernameSettings;
