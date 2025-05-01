// This file is part of the Product Detailed View page in a Next.js application.
"use client"; // Mark this file as a client component

"use client"; // Mark this file as a client component

import React, { useState } from "react";
import styles from "./ProductSummary.module.css";

export default function ProductSummary({ productId }: { productId: string }) {
  const product = {
    id: productId,
    name: "Waymo Ride Gift Card",
    description:
      "Unlock the future of transportation with a Waymo Rides gift card! Imagine gifting the freedom of safe, convenient, and autonomous rides to your loved ones." +
      " Whether it's for daily commutes, exploring the city, or getting to appointments - a Waymo gift card offers a unique and forward-thinking way to travel. Make your gift truly personal by choosing the exact amount you want to load onto the Waymo Rides gift card. Simply enter your desired value in the field below. Waymo vehicles are framed & designed with passenger comfort and safety in mind!",
    startingPrice: "$399.99 MXN",
    prices: ["$399.99 MXN", "$599.99 MXN", "$799.99 MXN"], // Available prices
    image: "/images/gowaymogo.png",
  };

  const [selectedPrice, setSelectedPrice] = useState(product.prices[0]); // Default price is the starting price
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    console.log("Dropdown state:", !dropdownOpen); // Debugging
  };

  const selectPrice = (price: string) => {
    console.log("Selected price:", price); // Debugging
    setSelectedPrice(price); // Update selected price
    setDropdownOpen(false); // Close dropdown
  };

  return (
    <div className = {styles.summary}>
      <div className = {styles.content}>
        {/* Image Section */}
        <div className = {styles.imageContainer}>
          <img src = {product.image} alt = {product.name} className = {styles.image} />
        </div>

        {/* Text Section */}
        <div className = {styles.details}>
          <h1 className = {styles.name}>{product.name}</h1>
          <p className = {styles.startingPrice}>Starting at {product.startingPrice}</p>
          <p className = {styles.description}>{product.description}</p>

          {/* Amount Dropdown */}
          <div className = {styles.amountContainer}>
            <div className = {styles.amountLabel} onClick = {toggleDropdown}>
              Amount <span className = {styles.arrow}>{dropdownOpen ? "▲" : "▼"}</span>
            </div>
            <div className = {styles.amountInput}>{selectedPrice}</div>
            {dropdownOpen && (
              <div className = {styles.dropdown}>
                {product.prices.map((price) => (
                  <div
                    key = {price}
                    className = {styles.dropdownItem}
                    onClick = {() => selectPrice(price)}
                  >
                    {price}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className = {styles.addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}