// This is a shopping cart component that displays the items in the cart, a summary of the cart, and a form to proceed with the purchase.

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import ShoppingCartSummary from "../ShoppingCartSummary/ShoppingCartSummary";
import ShoppingCartForm from "../ShoppingCartForm/ShoppingCartForm";
import styles from "./ShoppingCart.module.css";

const OTP_LENGTH = 6;

const ShoppingCart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, saveOrderToHistory } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpError, setOTPError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [securityBanner, setSecurityBanner] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  // Real-time validation for email
  useEffect(() => {
    if (!email) {
      setEmailError("");
      setFormValid(false);
      return;
    }
    const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    setEmailError(valid ? "" : "Please enter a valid email address.");
    setFormValid(valid);
  }, [email]);

  // Handle order placement with simulated secure processing
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    if (!formValid) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setShowSummary(true);
  };

  // Confirm order summary, show payment gateway
  const handleConfirmSummary = () => {
    setShowSummary(false);
    setShowGateway(true);
    setTimeout(() => {
      setShowGateway(false);
      setShowOTP(true);
    }, 1800);
  };

  // Simulated OTP/2FA step
  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== OTP_LENGTH) {
      setOTPError(`Please enter exactly ${OTP_LENGTH} digits.`);
      return;
    }

    setOTPError("");
    setShowOTP(false);
    setProcessing(true);
    setTimeout(() => {
      saveOrderToHistory(cart);
      setOrderPlaced(true);
      clearCart();
      setProcessing(false);
    }, 1200);
    
  };

  if (cart.length === 0 && !orderPlaced) {
    return <p className={styles.emptyCart}>Your cart is empty. Add some items to get started!</p>;
  }

  return (
    <div className={styles.container}>
      {securityBanner && (
        <div className={styles.securityBanner} style={{ background: '#e0f7fa', color: '#00796b', padding: 8, borderRadius: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span role="img" aria-label = "lock">🔒</span>
          Your payment is encrypted and processed securely!
          <button style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#00796b', cursor: 'pointer' }} onClick={() => setSecurityBanner(false)}>✕</button>
        </div>
      )}
      {orderPlaced ? (
        <div className={styles.thankYouMessage}>
          <h1>Thank you for your purchase!</h1>
          <p>Your order has been securely processed. A confirmation email will be sent to <b>{email}</b> shortly.</p>
        </div>
      ) : showGateway ? (
        <div className={styles.gatewayModal} style={{ textAlign: 'center', padding: 32 }}>
          <span role="img" aria-label="lock" style={{ fontSize: 48 }}>🔒</span>
          <h2>Redirecting to secure payment gateway...</h2>
          <div className={styles.spinner} style={{ margin: '24px auto', width: 40, height: 40, border: '4px solid #00796b', borderTop: '4px solid #b2dfdb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : showOTP ? (
        <form className={styles.otpModal} onSubmit={handleOTPSubmit} style={{ textAlign: 'center', padding: 32 }}>
          <span role="img" aria-label="shield" style={{ fontSize: 40 }}>🛡️</span>
          <h2>2-Step Verification (Toy Feature)</h2>
          <p>Enter any {OTP_LENGTH}-digit code to complete your order.</p>
          <input
            type="text"
            value={otp}
            onChange={e => setOTP(e.target.value.replace(/\D/g, ''))}
            maxLength={OTP_LENGTH}
            minLength={OTP_LENGTH}
            style={{ fontSize: 24, letterSpacing: 8, textAlign: 'center', width: 160, margin: '16px 0' }}
            autoFocus
          />
          {otpError && <div style={{ color: 'red', marginBottom: 8 }}>{otpError}</div>}
          <button type="submit" className={styles.submitButton} style={{ width: '100%' }}>Verify</button>
        </form>
      ) : showSummary ? (
        <div className={styles.orderSummaryModal} style={{ padding: 32, maxWidth: 420, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
          <h2>Order Summary</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map(item => (
              <li key={item.id} style={{ marginBottom: 8 }}>{item.name} x{item.quantity} - MX${(item.price * item.quantity).toFixed(2)}</li>
            ))}
          </ul>
          <ShoppingCartSummary />
          <button className={styles.submitButton} style={{ width: '100%', marginTop: 16 }} onClick={handleConfirmSummary}>Confirm &amp; Continue to Payment</button>
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
            {/* Secure Checkout Form */}
            <form ref={formRef} onSubmit={e => { e.preventDefault(); handlePlaceOrder(); }}>
              <div className={styles.form}>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className={styles.input}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={emailError ? { borderColor: 'red' } : {}}
                />
                {emailError && <div style={{ color: 'red', marginBottom: 8 }}>{emailError}</div>}
                {/* ...other fields from ShoppingCartForm... */}
                <h2 className={styles.sectionTitle}>Payment Method</h2>
                <div className={styles.radioGroup}>
                  <label>
                    <input type="radio" name="payment" value="credit" required />
                    Credit/Debit Card
                  </label>
                  <label>
                    <input type="radio" name="payment" value="cash" />
                    Cash on Delivery
                  </label>
                  <label>
                    <input type="radio" name="payment" value="mobile" />
                    Mobile Wallets
                  </label>
                </div>
                <h2 className={styles.sectionTitle}>Mailing Address</h2>
                <input type="text" placeholder="Enter your name" required className={styles.input} />
                <input type="text" placeholder="Enter your address" required className={styles.input} />
                <input type="text" placeholder="Enter your zip code" required className={styles.input} />
              </div>
              {processing && <div className={styles.processing}>Processing payment securely...</div>}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={processing || !formValid}
                style={{ marginTop: 12, width: "100%", opacity: processing ? 0.6 : 1 }}
              >
                {processing ? "Processing..." : "Place Order"}
              </button>
            </form>
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