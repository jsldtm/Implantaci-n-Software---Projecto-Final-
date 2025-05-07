// This is a shopping cart component that displays the items in the cart, a summary of the cart, and a form to proceed with the purchase.

"use client";

import React from 'react';
import { useCart } from '../../context/CartContext';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import ShoppingCartSummary from '../ShoppingCartSummary/ShoppingCartSummary';
import ShoppingCartForm from '../ShoppingCartForm/ShoppingCartForm';
import styles from './ShoppingCart.module.css';

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return <p>Your cart is empty. Add some items to get started!</p>;
  
  }


  return (
    <div>
      <h1>Your Shopping List</h1>
      {cart.map((item) => (
        <div key = {item.id}>
          <img src = {item.image} alt = {item.name} />
          <p>{item.name}</p>
          <p>Price: ${item.price.toFixed(2)} MXN</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick = {() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
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