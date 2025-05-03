// This is a shopping cart component that displays the items in the cart, a summary of the cart, and a form to proceed with the purchase.

"use client";

import React from 'react';
import { useCart } from '../../context/CartContext';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import ShoppingCartSummary from '../ShoppingCartSummary/ShoppingCartSummary';
import ShoppingCartForm from '../ShoppingCartForm/ShoppingCartForm';
import styles from './ShoppingCart.module.css';

const ShoppingCart: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className={styles.container}>
      <h1>Your Shopping List</h1>
      <div className={styles.cart}>
        {/* Left Column: Items */}
        <div className={styles.items}>
          {cart.map((item) => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right Column: Summary and Form */}
        <div className={styles.summary}>
          <ShoppingCartSummary />
          <ShoppingCartForm />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;