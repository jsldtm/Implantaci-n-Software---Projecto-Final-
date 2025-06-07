// Código por - Joaquín Saldarriaga
// This file contains the elaborated FloatingCartIcon component

"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./FloatingCartElement.module.css";

const FloatingCartIcon: React.FC = () => {
  const { cart } = useCart();
  const router = useRouter(); // Initialize router
  const [showNotification, setShowNotification] = useState(false);

  // Calculate the total quantity of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleCartUpdate = () => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1100); // Hide after 1.1 seconds
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  // Handle click to navigate to the shopping cart portal
  const handleClick = () => {
    router.push("/shoppingcart"); // Navigate to the shopping cart portal
  };

  return (
    <div className={styles.cartIconContainer} onClick={handleClick}>
      <div className={styles.cartIcon}>
        <ShoppingCartIcon className={styles.icon} />
        {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
      </div>
      {showNotification && <span className={styles.notification}>+1</span>}
    </div>
  );
};

export default FloatingCartIcon;