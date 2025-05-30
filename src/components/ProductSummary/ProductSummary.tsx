// This file is part of the Product Detailed View page in the FindItAll portal!.

"use client";

import { useCart } from "../../context/CartContext";
import React, { useState, useEffect } from "react";
import styles from "./ProductSummary.module.css";
import { BookmarkIcon } from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  startingPrice?: string;
  prices?: string[];
  image: string;
  category: string;
}

interface Props {
  product: Product;
}

// You can change this value to control the pop-up scale
const SAVE_ANIMATION_SCALE = 1.1;

const ProductSummary: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedPrice, setSelectedPrice] = useState<string>(
    product.prices ? product.prices[0] : product.price ? product.price.toString() : "0"
  );
  const [saved, setSaved] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Check if product is already saved on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "savedProducts";
    const existing = localStorage.getItem(key);
    if (existing) {
      try {
        const savedArr = JSON.parse(existing);
        if (savedArr.some((p: any) => p.id === product.id)) {
          setSaved(true);
        }
      } catch {}
    }
  }, [product.id]);

  const handleAddToCart = () => {
    // Remove all non-numeric characters except dot for decimals
    const numericPrice = parseFloat(selectedPrice.replace(/[^\d.]/g, ""));
    addToCart({
      id: `${product.id}-${numericPrice}`, // Unique per product+price
      name: product.name,
      price: numericPrice,
      quantity: 1,
      image: product.image,
    });

    // Trigger the cart-updated event
    const event = new CustomEvent("cart-updated");
    window.dispatchEvent(event);
  };

  const handleSaveForLater = () => {
    saveProductForLater(product);
    setSaved(true);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 350); // Animation duration
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrice(price);
  };

  // Split the description into paragraphs using "\n" as the delimiter
  const descriptionParagraphs = product.description.split("\n");

  // Utility to save product to localStorage
  function saveProductForLater(product: Product) {
    if (typeof window === "undefined") return;
    const key  = "savedProducts";
    const existing = localStorage.getItem(key);
    let saved: Product[] = [];
    if (existing) {
      try {
        saved = JSON.parse(existing);
      } catch {}
    }
    // Avoid duplicates by id
    if (!saved.some((p) => p.id === product.id)) {
      saved.push(product);
      localStorage.setItem(key, JSON.stringify(saved));
    }
  }

  return (
    <div className = {styles.summary}>
      {/* Product Image */}
      <div className = {styles.imageContainer}>
        <img src = {product.image} alt = {product.name} className = {styles.image} />
      </div>

      {/* Product Details */}
      <div className = {styles.details}>
        <h1 className = {styles.name}>{product.name}</h1>
        <p className = {styles.startingPrice}>
          {product.startingPrice
            ? product.startingPrice
            : `$${selectedPrice} MXN`}
        </p>

        {/* Render each paragraph */}
        {descriptionParagraphs.map((paragraph, index) => (
          <p key = {index} className = {styles.description}>
            {paragraph}
          </p>
        ))}

        {/* Amount and Add to Cart */}
        {(product.prices || product.price) && (
          <div className = {styles.amountAndCartContainer}>
            {/* Amount Section for multi-price */}
            {product.prices ? (
              <div className = {styles.amountContainer}>
                <label className = {styles.amountLabel}>Amount</label>
                <select
                  className = {styles.amountInput}
                  value = {selectedPrice}
                  onChange = {(e) => handlePriceChange(e.target.value)}
                >
                  {product.prices.map((price) => (
                    <option key = {price} value = {price}>
                      {price}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {/* Add to Cart Button */}
            <button className = {styles.addToCart} onClick = {handleAddToCart}>
              Add to Cart
            </button>
            {/* Save for Later Circular Button */}
            <button
              className = {
                styles.saveForLater +
                (animating ? " " + styles.saveForLaterAnimating : "") +
                (saved ? " " + styles.saveForLaterFilled : "")
              }
              title = "Save for later"
              onClick = {handleSaveForLater}
              style = {animating ? { transform: `scale(${SAVE_ANIMATION_SCALE})` } : {}}
            >
              <BookmarkIcon className = {styles.bookmarkIcon + (saved ? " " + styles.bookmarkIconFilled : "")}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSummary;

