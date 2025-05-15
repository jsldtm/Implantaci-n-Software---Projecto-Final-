// This file is a *client* component because it uses the `useRouter` hook from Next.js.
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import useRouter for navigation
import Head from "next/head";
import ProductsListedByCategory from "@/components/ProductsListedByCategory/ProductsListedByCategory";
import Sidebar from "@/components/Sidebar/Sidebar"; // Import Sidebar component
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CategoriesPage: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const searchParams = useSearchParams(); // Access query parameters

  const [categories, setCategories] = useState<
    { id: number; name: string }[]
  >([]); // State to hold categories
  const [chosenCategory, setChosenCategory] = useState<string>("");

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
      setChosenCategory(data[0]?.name || ""); // Set the first category as default
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Dynamically set the title and meta tags */}
      <Head>
        <title>Findit All - Our Categories</title>
        <meta
          name="description"
          content="Explore our categories and find the best products for you."
        />
      </Head>

      {/* Make the entire container scrollable */}
      <div className="flex h-screen overflow-y-auto bg-gray-100">
        {/* Sidebar */}
        <Sidebar portalName="categories" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Our Categories</h1>
            <div className="flex items-center space-x-4">
              <button>
                <NotificationsIcon fontSize="large" />
              </button>
              <button>
                <AccountCircleIcon fontSize="large" />
              </button>
            </div>
          </header>

          {/* Category Tabs */}
          <nav className="bg-blue-100 p-2 flex space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded text-sm ${
                  chosenCategory === category.name
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
                onClick={() => setChosenCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </nav>

          {/* Product Grid */}
          <main className="flex-1 p-3 overflow-y-auto">
            <ProductsListedByCategory
              category={chosenCategory}
              products={[]} // Replace with actual products fetched by category
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;

