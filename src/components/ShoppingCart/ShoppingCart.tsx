// This is a shopping cart component that displays the items in the cart, a summary of the cart, and a form to proceed with the purchase.

"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import ShoppingCartSummary from "../ShoppingCartSummary/ShoppingCartSummary";
import ShoppingCartForm from "../ShoppingCartForm/ShoppingCartForm";
import styles from "./ShoppingCart.module.css";

const ShoppingCart: React.FC = () => {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Fetch cart items from the API when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("/api/cart");
      const data = await response.json();
      data.forEach((item) => addToCart(item)); // Populate the cart context
    };

    fetchCart();
  }, [addToCart]);

  // Add an item to the cart
  const addItemToCart = async (item) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const data = await response.json();
    addToCart(data.cartItem); // Update the cart context
  };

  // Update the quantity of an item in the cart
  const updateItemQuantity = async (itemId, quantity) => {
    const response = await fetch(`/api/cart/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    const data = await response.json();
    updateQuantity(itemId, data.updatedQuantity);
  };

  // Remove an item from the cart
  const removeItemFromCart = async (itemId) => {
    await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
    removeFromCart(itemId);
  };

  // Handle order placement
  const handlePlaceOrder = async () => {
    // Simulate order placement API call
    await fetch("/api/cart/checkout", { method: "POST" });

    setOrderPlaced(true); // Show thank-you message
    clearCart(); // Clear the cart after placing the order
  };

  if (cart.length === 0 && !orderPlaced) {
    return <p className={styles.emptyCart}>Your cart is empty. Add some items to get started!</p>;
  }

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      {orderPlaced ? (
        <div className={styles.thankYouMessage}>
          <h1>Thank you very much!</h1>
          <p>Your order has been received.</p>
        </div>
      ) : (
        <>
          <div className={styles.leftColumn}>
            <h1 className={styles.title}>Your Shopping List</h1>
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <ShoppingCartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeItemFromCart(item.id)}
                  onUpdateQuantity={(quantity) => updateItemQuantity(item.id, quantity)}
                />
              ))}
            </div>
          </div>

          <div className={styles.rightColumn}>
            <ShoppingCartForm onPlaceOrder={handlePlaceOrder} />
            <ShoppingCartSummary totalPrice={totalPrice} />
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;

// Original approach for the 'return' statement

//   return (
//     <div className = {styles.container}>
//       <h1>Your Shopping List</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty. Add some items to get started!</p>
//       ) : (
//         <div className = {styles.cart}>
//           {/* Left Column: Items */}
//           <div className = {styles.items}>
//             {cart.map((item) => (
//               <ShoppingCartItem key = {item.id} item = {item} />
//             ))}
//           </div>

//           {/* Right Column: Summary and Form */}
//           <div className = {styles.summary}>
//             <ShoppingCartSummary />
//             <ShoppingCartForm />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShoppingCart;