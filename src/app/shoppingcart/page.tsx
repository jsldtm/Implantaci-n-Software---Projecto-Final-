// This is a shopping cart page component that uses the ShoppingCart component and wraps it with the CartProvider context.

"use client";

import React from "react";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../../components/ShoppingCartPortal/ShoppingCartPortal.module.css";

const ShoppingCartPage: React.FC = () => {
  return (
    <div className = {styles.layout}>
      {/* Sidebar */}
      <div className = {styles.sidebar}>
        <Sidebar portalName = "shopping-cart" />
      </div>

      {/* Main Content */}
      <div className = {styles.mainContent}>
        <ShoppingCart />
      </div>
    </div>
  );
};

export default ShoppingCartPage;