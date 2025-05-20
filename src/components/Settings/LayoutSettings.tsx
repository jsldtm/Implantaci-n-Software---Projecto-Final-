// This component file defines the Settings Panel component of the application

import React from "react";
import styles from "./LayoutSettings.module.css";

const LayoutSettings = () => (
  <section>
    <h2 className = "text-xl font-semibold mb-2">Layout & Structure</h2>
    <div>
      <label>
        <input type = "checkbox" className = "mr-2" />
        Compact sidebar
      </label>
      <br />
      <label>
        <input type = "checkbox" className = "mr-2" />
        Show categories as grid
      </label>
    </div>
  </section>
);

export default LayoutSettings;
