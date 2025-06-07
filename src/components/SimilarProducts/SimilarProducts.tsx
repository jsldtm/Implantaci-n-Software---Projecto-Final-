// Código por - Joaquín Saldarriaga
// This file is part of the Product Detailed View page
// It provides a "Back to Categories" link that allows...
//    users to navigate back to the specified category page.

import React from "react";
import { PlayIcon } from "@heroicons/react/24/outline"; // Import Heroicons PlayIcon
import styles from "./SimilarProducts.module.css";

export default function SimilarProducts() {
  const products = [
    {
      id: 1,
      name: "Licensed Jaguar I-Pace R.C. Toy Car",
      description:
        "Experience the thrill of the iconic Jaguar I-PACE in a fun, remote-controlled package! This meticulously detailed R.C. car captures the sleek lines and sporty elegance of the original electric SUV. Perfect for racing around the house, this toy vehicle provides hours of entertainment.",
      price: "$1799.99 MXN",
      image: "/images/minijaguarrc.png",
    },
    {
      id: 2,
      name: "Google Home Mini 2nd Generation - Chalk",
      description:
        "Meet the helpful little speaker that's all ears. The Google Home Mini (2nd Gen) in Chalk lets you go hands-free for a world of information and control. Just say 'Hey Google' to play music, get the news, set alarms, and even control compatible smart home devices.",
      price: "$1199.99 MXN",
      image: "/images/google-home.png",
    },
    {
      id: 3,
      name: "Uber One Gift Card",
      description:
        "The Uber One Gift Card: Unlock VIP treatment for rides and deliveries! Give the gift of savings, convenience, and exclusive benefits with an Uber One membership. Enjoy the freedom to experience premium perks.",
      price: "$119.99 MXN",
      image: "/images/uber-one.png",
    },
  ];

  return (
    <div className = {styles.similarProducts}>
      <h2 className = {styles.title}>Similar products</h2>
      <div className = {styles.list}>
        {products.map((product) => (
          <div key = {product.id} className = {styles.product}>
            <img src = {product.image} alt = {product.name} className = {styles.image} />
            <div className = {styles.details}>
              <h3 className = {styles.name}>{product.name}</h3>
              <p className = {styles.description}>{product.description}</p>
              <div className = {styles.actions}>
                <button className = {styles.addToCart}>Add to Cart</button>
                <span className = {styles.price}>{product.price}</span>
              </div>
            </div>
            <PlayIcon className = {styles.arrow} /> {/* Use Heroicons PlayIcon */}
          </div>
        ))}
      </div>
    </div>
  );
}