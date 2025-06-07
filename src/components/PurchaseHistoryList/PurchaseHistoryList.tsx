// Código por - Joaquín Saldarriaga
// This comonent file defines the Purchase History List component of the application

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import styles from "./PurchaseHistoryList.module.css";

const PurchaseHistoryList = () => {
  const { getPurchaseHistory } = useCart();
  const [history, setHistory] = useState<Array<{ id: number; date: string; items: any[] }>>([]);

  useEffect(() => {
    setHistory(getPurchaseHistory());
  }, [getPurchaseHistory]);

  if (history.length === 0) {
    return <p>No previous purchases.</p>;
  }

  return (
    <div>
      {history.map((order) => (
        <div key={order.id} className={styles.productCard}>
          <div className={styles.purchaseDate}>Order Date: {new Date(order.date).toLocaleString()}</div>
          {order.items.map((product) => (
            <div key={product.id} className={styles.productInfo}>
              <img
                src={product.image || "/images/placeholder.png"}
                alt={product.name}
                className={styles.imageTag}
              />
              <span className={styles.productName}>{product.name}</span>
              <span className={styles.productPrice}>${product.price}</span>
              <span>Qty: {product.quantity}</span>
            </div>
          ))}
          <hr className={styles.divider} />
        </div>
      ))}
    </div>
  );
};

export default PurchaseHistoryList;