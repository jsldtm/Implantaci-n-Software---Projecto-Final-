import React from 'react';
import styles from "./ShoppingCartForm.module.css";

interface ShoppingCartFormProps {
  onPlaceOrder: () => void; // Callback for placing the order
}

const ShoppingCartForm: React.FC<ShoppingCartFormProps> = ({ onPlaceOrder }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    onPlaceOrder(); // Trigger the callback
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.sectionTitle}>Contact Information</h2>
      <input type="email" placeholder="Enter your email address" required className={styles.input} />

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

      <button type="submit" className={styles.submitButton}>
        Place Order
      </button>
    </form>
  );
};

export default ShoppingCartForm;