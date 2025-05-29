// This file handles the display of the 'product categories' list

"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  image: string;
}

const ProductCategoryList: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]); // Ensure it's an array
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
    try {
        const response = await fetch('/api/categories'); // Ensure the endpoint is correct
        const data = await response.json();

        // Ensure the data is an array before setting it
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("API response is not an array:", data);
          setCategories([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]); // Fallback to an empty array
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/categories?selectedCategory=${encodeURIComponent(categoryName)}`);
  };

  if (isLoading) {
    return <p>Loading categories...</p>; // Show loading state
  }

  if (categories.length === 0) {
    return <p>No categories available.</p>; // Handle empty categories
  }

  return (
    <div className = "relative">
      <div className = "overflow-x-auto no-scrollbar">
        <div className = "flex space-x-6 px-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className = "flex-shrink-0 flex flex-col items-center text-center cursor-pointer w-20"
              onClick={() => handleCategoryClick(category.name)}
            >
              <img
                src={category.image}
                alt={category.name}
                className = "w-16 h-16 rounded-full object-cover border border-gray-300 transition-transform duration-200 hover:scale-110"
              />
              <p className = "text-gray-800 text-sm mt-2">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Fading effect to indicate scrollability - REMOVED */}
      {/* <div className = "absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className = "absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-white to-transparent pointer-events-none"></div> */}
    </div>
  );
};

export default ProductCategoryList;