// This is a shopping cart component that displays the items in the cart, a summary of the cart, and a form to proceed with the purchase.

"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import ShoppingCartSummary from "../ShoppingCartSummary/ShoppingCartSummary";
import ShoppingCartForm from "../ShoppingCartForm/ShoppingCartForm";
import styles from "./ShoppingCart.module.css";

const ShoppingCart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, saveOrderToHistory } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Handle order placement
  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      saveOrderToHistory(cart);
    }
    setOrderPlaced(true); // Show thank-you message
    clearCart(); // Clear the cart after placing the order
  };

  if (cart.length === 0 && !orderPlaced) {
    return <p className={styles.emptyCart}>Your cart is empty. Add some items to get started!</p>;
  }

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
                <ShoppingCartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className={styles.rightColumn}>
            <ShoppingCartForm onPlaceOrder={handlePlaceOrder} />
            <ShoppingCartSummary />
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