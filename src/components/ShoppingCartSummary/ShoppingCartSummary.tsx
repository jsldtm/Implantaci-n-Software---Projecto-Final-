import React from 'react';
import { useCart } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';

const ShoppingCartSummary: React.FC = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.16; // Assuming 16% tax
  const total = subtotal + tax;

  return (
    <div>
      <h2>Summary</h2>
      <p>Items Subtotal: MX${subtotal.toFixed(2)}</p>
      <p>Estimated Tax (IVA): MX${tax.toFixed(2)}</p>
      <p>
        <strong>Total: MX${total.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default ShoppingCartSummary;