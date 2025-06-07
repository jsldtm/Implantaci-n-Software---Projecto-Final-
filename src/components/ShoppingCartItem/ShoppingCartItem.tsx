
// Código por - Joaquín Saldarriaga
"use client";

// This is a shopping cart component that displays the items in the cart, a summary of the cart, and a form to proceed with the purchase.

import React from 'react';
import { CartItem, useCart } from '../../context/CartContext';
import styles from './ShoppingCartItem.module.css';

interface ShoppingCartItemProps {
  item: CartItem;
}

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuantity(item.id, parseInt(e.target.value, 10));
  };

  return (
    <div className={styles.item}>
      <div className={styles.imageCircle}>
        <img src={item.image} alt={item.name} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h3>{item.name}</h3>
        <p>Price: MX${item.price.toFixed(2)}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Total: MX${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ShoppingCartItem;