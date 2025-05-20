// This component file defines the Saved Products List component of the application

import React from "react";
import Link from "next/link";
import styles from "./SavedProductsList.module.css";

// Dummy data for now
const savedProducts = [
  { id: 2, name: "Wireless Desk Charging", price: "149.99", image: "/images/wireless-charger.png", category: "Technology" },
  { id: 51, name: "Classic Cotton T-Shirt", price: "299.99", image: "/images/tshirt.png", category: "Shirts" },
  
];

const SavedProductsList = () => (
  <div>
    {savedProducts.length === 0 ? (
      <p>No saved products yet.</p>
    ) : (
      savedProducts.map((product) => (
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
          </div>
        </div>
      ))
    )}
  </div>
);

export default SavedProductsList;
