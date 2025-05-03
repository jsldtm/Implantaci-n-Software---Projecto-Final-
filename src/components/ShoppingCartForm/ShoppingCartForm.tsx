import React from 'react';

const ShoppingCartForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Information</h2>
      <input type="email" placeholder="Enter your email address" required />
      <h2>Payment Method</h2>
      <div>
        <label>
          <input type="radio" name="payment" value="credit" required />
          Credit/Debit Card
        </label>
        <label>
          <input type="radio" name="payment" value="cash" />
          Cash on Delivery
        </label>
      </div>
      <h2>Mailing Address</h2>
      <input type="text" placeholder="Enter your name" required />
      <input type="text" placeholder="Enter your address" required />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default ShoppingCartForm;