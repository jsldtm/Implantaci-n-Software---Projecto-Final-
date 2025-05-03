"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductsListedByCategory: React.FC<Props> = ({ category, products }) => {
  const router = useRouter();

  // Map product.id to productDetails key
  const productDetailsMap = {
    7: "TW41M0", // Example mapping
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-40 w-full object-contain rounded-md"
          />
          {/* Updated clickable product name */}
          <h3
            className="text-md font-semibold mt-2 text-blue-600 cursor-pointer hover:underline"
            onClick={() =>
              router.push(
                `/productdetailedview?productId=${productDetailsMap[product.id]}&category=${category}`
              )
            }
          >
            {product.name}
          </h3>
          {/* Conditional price display */}
          <p className="text-sm text-gray-600">
            {product.name === "Waymo ride Gift Card!"
              ? `Starting at $${product.price.toFixed(2)} MXN`
              : `$${product.price.toFixed(2)} MXN`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductsListedByCategory;