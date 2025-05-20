// This component file defines the Settings Panel component of the application

import React from "react";

const ThemeSettings = () => (
  <section>
    <h2 className = "text-xl font-semibold mb-2">Theme & Color</h2>
    <div className = "flex gap-4">
      <button className = "px-4 py-2 rounded bg-gray-200">Light</button>
      <button className = "px-4 py-2 rounded bg-gray-800 text-white">Dark</button>
      <input type = "color" className = "ml-4" title = "Accent Color" />
    </div>
  </section>
);

export default ThemeSettings;