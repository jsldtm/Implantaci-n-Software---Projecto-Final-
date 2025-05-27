// This file includes the ProductsListedByCategory component
// which fetches and displays products based on the selected category.

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface Product {
  id: number;
  name: string;
  price?: number;
  image: string;
}

interface Props {
  category: string;
  searchTerm?: string;
}

const ProductsListedByCategory: React.FC<Props> = ({ category, searchTerm  = "" }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/categories/${category}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products for category: ${category}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductsByCategory();
  }, [category]);

  // Filter products by search term (case-insensitive)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className = "text-red-500">{error}</p>;
  }

  if (filteredProducts.length === 0) {
    return <p>No products found for this search.</p>;
  }

  return (
    <div className = "grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className = "bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          onClick={() => router.push(`/productdetailedview?productId=${product.id}&category=${category}`)} // Navigate to Product Detailed View
        >
          <img
            src={product.image}
            alt={product.name}
            className = "h-40 w-full object-contain rounded-md"
          />
          <h3
            className = "text-md font-semibold mt-2 text-blue-600 cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card click event
              router.push(`/productdetailedview?productId=${product.id}&category=${category}`);
            }}
          >
            {product.name}
          </h3>
          <p className = "text-sm text-gray-600">
            {product.price !== undefined
              ? `$${product.price.toFixed(2)} MXN`
              : "Price not available"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductsListedByCategory;
