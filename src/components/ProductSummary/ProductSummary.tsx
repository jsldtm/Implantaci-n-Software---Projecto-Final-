// This file is part of the Product Detailed View page in a Next.js application.
// This file is part of the Product Detailed View page in a Next.js application.
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

// Previous version of ProductSummary component

// interface Props {
//   productId: string;
// }

// const ProductSummary: React.FC<Props> = ({ productId }) => {
//   // Simulate fetching product details based on productId
//   const productDetails = {
//     TW41M0: {
//       id: productId,
//       name: "Waymo Ride Gift Card",
//       description:
//         "Unlock the future of transportation with a Waymo Rides gift card! Imagine gifting the freedom of safe, convenient, and autonomous rides to your loved ones." +
//         " Whether it's for daily commutes, exploring the city, or getting to appointments - a Waymo gift card offers a unique and forward-thinking way to travel. Make your gift truly personal by choosing the exact amount you want to load onto the Waymo Rides gift card. Simply enter your desired value in the field below. Waymo vehicles are framed & designed with passenger comfort and safety in mind!",
//       startingPrice: "$399.99 MXN",
//       prices: ["$399.99 MXN", "$599.99 MXN", "$799.99 MXN"], // Available prices
//       image: "/images/gowaymogo.png",
//     },
//   };

//   // Check if the product exists
//   const product = productDetails[productId];

//   if (!product) {
//     return (
//       <div className = "bg-white rounded-lg shadow-md p-6">
//         <h1 className = "text-2xl font-bold mt-4">Product Not Found! :o</h1>
//         <p className = "text-sm text-gray-500 mt-4">This is not the product you are looking for...</p>
//       </div>
//     );
//   }

//   const [selectedPrice, setSelectedPrice] = useState(product.prices[0]); // Default price is the starting price
//   const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   const selectPrice = (price: string) => {
//     setSelectedPrice(price); // Update selected price
//     setDropdownOpen(false); // Close dropdown
//   };

//   return (
//     <div className = {styles.summary}>
//       <div className = {styles.content}>
//         {/* Product Image */}
//         <div className = {styles.imageContainer}>
//           <img src = {product.image} alt = {product.name} className = {styles.image} />
//         </div>

//         {/* Product Details */}
//         <div className = {styles.details}>
//           <h1 className = {styles.name}>{product.name}</h1>
//           <p className = {styles.startingPrice}>{selectedPrice}</p>
//           <p className = {styles.description}>{product.description}</p>

//           {/* Amount and Add to Cart */}
//           <div className = {styles.amountContainer}>
//             <div className = {styles.amountLabel} onClick = {toggleDropdown}>
//               Amount <span className = {styles.arrow}>▼</span>
//             </div>
//             <input
//               type  = "text"
//               value = {selectedPrice}
//               readOnly
//               className = {styles.amountInput}
//             />
//             {dropdownOpen && (
//               <div className = {styles.dropdown}>
//                 {product.prices.map((price) => (
//                   <div
//                     key = {price}
//                     className = {styles.dropdownItem}
//                     onClick = {() => selectPrice(price)}
//                   >
//                     {price}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button className = {styles.addToCart}>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductSummary;