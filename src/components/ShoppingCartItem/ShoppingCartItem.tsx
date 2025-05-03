
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
      <img src={item.image} alt={item.name} className={styles.image} />
      <div className={styles.details}>
        <h3>{item.name}</h3>
        <p>{item.price.toFixed(2)} MXN</p>
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={handleQuantityChange}
        />
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default ShoppingCartItem;