// This comonent file defines the Purchase History List component of the application

import React from "react";
import Link from "next/link";
import styles from "./PurchaseHistoryList.module.css";

// Dummy data **for now**
const purchasedProducts = [
  { id: 9, name: "Monitor PC Lanix LX215", price: "189.99", date: "2025-04-10", image: "/images/monitor.png", category: "Technology" },
  { id: 109, name: "The Godfather (DVD)", price: "399.99", date: "2025-03-22", image: "/images/THE-godfather.png", category: "Movies & TV" },
];

const PurchaseHistoryList = () => (
  <div>
    {purchasedProducts.length === 0 ? (
      <p>No previous purchases.</p>
    ) : (
      purchasedProducts.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.productImage}>
            <img
              src={product.image || "/images/placeholder.png"}
              alt={product.name}
              className={styles.imageTag}
            />
          </div>
          <div className={styles.productInfo}>
            <Link
              href={`/productdetailedview?productId=${product.id}&category=${encodeURIComponent(product.category)}`}
              className={styles.productName}
            >
              {product.name}
            </Link>
            <hr className={styles.divider} />
            <div className={styles.productPrice}>${product.price}</div>
            <div className={styles.purchaseDate}>{product.date}</div>
          </div>
        </div>
      ))
    )}
  </div>
);

export default PurchaseHistoryList;