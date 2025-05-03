// This is a shopping cart page component that uses the ShoppingCart component and wraps it with the CartProvider context.

"use client";

import React from "react";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import { CartProvider } from "../../context/CartContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../../components/ShoppingCartPortal/ShoppingCartPortal.module.css";

const ShoppingCartPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Sidebar portalName="shopping-cart" /> {/* Pass the portal name */}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <CartProvider>
          <ShoppingCart />
        </CartProvider>
      </div>
    </div>
  );
};

export default ShoppingCartPage;