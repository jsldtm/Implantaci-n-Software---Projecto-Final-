// Código por - Joaquín Saldarriaga
import React from 'react';
import { useCart } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';
import styles from "./ShoppingCartSummary.module.css";

const ShoppingCartSummary: React.FC = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.16; // Assuming 16% tax
  const total = subtotal + tax;

  return (
    <div className={styles.summary}>
      <h2 className={styles.sectionTitle}>Summary</h2>
      <p>Items Subtotal: MX${subtotal.toFixed(2)}</p>
      <p>Estimated Tax (IVA): MX${tax.toFixed(2)}</p>
      <p className={styles.total}>
        <strong>Total: MX${total.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default ShoppingCartSummary;