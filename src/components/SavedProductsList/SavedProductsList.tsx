// This component file defines the Saved Products List component of the application

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./SavedProductsList.module.css";

// Utility to get saved products from localStorage
function getSavedProducts() {
  if (typeof window === "undefined") return [];
  const key = "savedProducts";
  const existing = localStorage.getItem(key);
  if (!existing) return [];
  try {
    return JSON.parse(existing);
  } catch {
    return [];
  }
}

const SavedProductsList = () => {
  const [savedProducts, setSavedProducts] = useState<any[]>([]);

  useEffect(() => {
    setSavedProducts(getSavedProducts());
    // Listen for changes from other tabs/windows
    const handler = () => setSavedProducts(getSavedProducts());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <div>
      {savedProducts.length === 0 ? (
        <p>No saved products yet.</p>
      ) : (
        savedProducts.map((product) => {
          // Robust price display logic
          let displayPrice = "";
          if (
            product.price &&
            typeof product.price === "string" &&
            product.price.trim() !== ""
          ) {
            displayPrice = product.price;
          } else if (typeof product.price === "number") {
            displayPrice = `$${product.price.toFixed(2)}`;
          } else if (product.startingPrice) {
            displayPrice = product.startingPrice;
          } else if (
            product.prices &&
            Array.isArray(product.prices) &&
            product.prices.length > 0
          ) {
            displayPrice = product.prices[0];
          } else {
            displayPrice = "Price not available";
          }
          return (
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
                  href={`/productdetailedview?productId=${product.id}&category=${encodeURIComponent(
                    product.category
                  )}`}
                  className={styles.productName}
                >
                  {product.name}
                </Link>
                <hr className={styles.divider} />
                <div className={styles.productPrice}>{displayPrice}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SavedProductsList;
