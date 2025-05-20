// This component file defines the Settings Panel component of the application

import React from "react";
import styles from "./ProductDisplaySettings.module.css";

const ProductDisplaySettings = () => (
  <section>
    <h2 className = "text-xl font-semibold mb-2">Product Display</h2>
    <div>
      <label>
        <input type = "checkbox" className = "mr-2" />
        Show product ratings
      </label>
      <br />
      <label>
        <input type = "checkbox" className = "mr-2" />
        Show only in-stock products
      </label>
    </div>
  </section>
);

export default ProductDisplaySettings;