// This file is part of the Product Detailed View page in a Next.js application.
import React from "react";
import styles from "./ProductSummary.module.css";

export default function ProductSummary({ productId }: { productId: string }) {
  const product = {
    id: productId,
    name: "Waymo Ride Gift Card",
    description:
      "Unlock the future of transportation with a Waymo Rides gift card! Imagine gifting the freedom of safe, convenient, and autonomous rides to your loved ones." +
      
      " Whether it's for daily commutes, exploring the city, or getting to appointments - a Waymo gift card offers a unique and forward-thinking way to travel. Make your gift truly personal by choosing the exact amount you want to load onto the Waymo Rides gift card. Simply enter your desired value in the field below. Waymo vehicles are framed & designed with passenger comfort and safety in mind!",
    price: "$599.99 MXN",
    image: "/images/gowaymogo.png",
  };

  return (
    <div className={styles.summary}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>
      <h1 className={styles.name}>{product.name}</h1>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>{product.price}</p>
      <button className={styles.addToCart}>Add to Cart</button>
    </div>
  );
}