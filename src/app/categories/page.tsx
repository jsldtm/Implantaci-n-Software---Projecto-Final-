// Código por - Joaquín Saldarriaga
// --- PRESENTATION-READY COMMENTS ---
// This file implements the main Categories page for FindItAll.
// It demonstrates dynamic category loading, category selection, product search/filtering, and sidebar navigation.
//
// PRESENTATION STEPS:
// 1. When the page loads, it fetches the list of categories from the API (see useEffect).
// 2. The first category is selected by default, and the sidebar is shown on the left.
// 3. The user can search for products by name within the selected category using the search input.
// 4. Category tabs allow switching between categories; clicking a tab updates the product list below.
// 5. The <ProductsListedByCategory> component displays products for the selected category and search term.
// 6. The sidebar provides navigation to other core features (cart, saved, settings, etc.).
// 7. The header includes notification and account icons for future extensibility.
// 8. All UI is responsive and styled for clarity.
//
// KEY CODE SECTIONS:
// - useEffect: Fetches categories from the API on mount.
// - State: Tracks categories, selected category, and search term.
// - Sidebar: Renders navigation on the left.
// - Category Tabs: Allow switching and searching within categories.
// - ProductsListedByCategory: Renders filtered products for the selected category.
//
// --- END PRESENTATION COMMENTS ---

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
  const [searchTerm, setSearchTerm] = useState("");

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
          name = "description"
          content = "Explore our categories and find the best products for you."
        />
      </Head>

      {/* Make the entire container scrollable */}
      <div className = "flex min-h-screen h-screen overflow-y-auto" style={{ backgroundColor: "var(--accent-color)" }}>        {/* Sidebar */}
        <Sidebar portalName = "categories" />

        {/* Main Content */}
        <div className = "flex-1 flex flex-col">
          {/* Header */}
          <header
            className = "p-4 flex items-center justify-between"
            style={{
              backgroundColor: "#3887f6", // Set to normal blue
              color: "#fff", // Set to white for text and icons
            }}
          >
            <h1 className = "text-xl font-bold">Our Categories</h1>
            <div className = "flex items-center space-x-4">
              <button>
                <NotificationsIcon fontSize = "large" />
              </button>
              <button>
                <AccountCircleIcon fontSize = "large" />
              </button>
            </div>
          </header>

          {/* Category Tabs */}
          <nav
            className = "p-2 flex space-x-4"
            style={{ backgroundColor: "#f3f4f6" }} // Neutral grey
          >
            {/* Search input */}
            <input
              type = "text"
              placeholder = "Search products by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className = "px-2 py-1 rounded border border-gray-300 text-sm mr-2"
              style={{ minWidth: 100, maxWidth: 130, height: 60, maxHeight: 70 }}
            />
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded text-sm ${
                  chosenCategory === category.name
                    ? "text-gray-900 font-semibold"
                    : "text-gray-700"
                }`}
                style={{
                  backgroundColor:
                    chosenCategory === category.name
                      ? "#e5e7eb" // Slightly darker grey for selected
                      : "#f3f4f6",
                  color:
                    chosenCategory === category.name ? "#111827" : "#374151", // gray-900 or gray-700
                }}
                onClick={() => setChosenCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </nav>

          {/* Product Grid */}
          <main className = "flex-1 p-3 overflow-y-auto">
            <ProductsListedByCategory
              category={chosenCategory}
              searchTerm={searchTerm}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;

