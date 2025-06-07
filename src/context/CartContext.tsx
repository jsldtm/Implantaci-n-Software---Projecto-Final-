// Código por - Joaquín Saldarriaga
// This file defines a context for managing the shopping cart state in a React application
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  saveOrderToHistory: (order: CartItem[]) => void;
  getPurchaseHistory: () => Array<{ id: number; date: string; items: CartItem[] }> ;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch {}
    }
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If the item already exists, update its quantity
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }

      // If the item doesn't exist, add it to the cart
      return [...prev, { ...item, quantity: item.quantity }];
    });

    // Trigger a global cart update event
    const event = new CustomEvent("cart-updated");
    window.dispatchEvent(event);
    
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Remove an item from the cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // --- Purchase History Utilities ---
  const saveOrderToHistory = (order: CartItem[]) => {
    const history = getPurchaseHistory();
    const newHistory = [
      {
        id: Date.now(),
        date: new Date().toISOString(),
        items: order,
      },
      ...history,
    ];
    localStorage.setItem('purchaseHistory', JSON.stringify(newHistory));
  };

  const getPurchaseHistory = (): Array<{ id: number; date: string; items: CartItem[] }> => {
    const history = localStorage.getItem('purchaseHistory');
    return history ? JSON.parse(history) : [];
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, saveOrderToHistory, getPurchaseHistory }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};