"use client"; // This is a client component

import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainHeader from "@/components/MainHeader/MainHeader";
import ProductCategoryList from "@/components/ProductCategoryList/ProductCategoryList";
import NewAndTrendyList from "@/components/NewAndTrendyList/NewAndTrendyList";
import SavedForLaterList from "@/components/SavedForLaterList/SavedForLaterList";
import { useRouter } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";

// This Page file defines the main page of the application
const EcommerceHomePage = () => {
  const router = useRouter();
  const { settings } = useSettings();

  const categories = [
    "Office & writing",
    "Technology",
    "Accessories",
    "Shirts",
    "Household",
    "Movies & TV",
    "Pet supplies",
    "Sports",
    "Books",
  ];

  const handleCategoryClick = (category: string) => {
    router.push(`categories?selectedCategory=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar navigation */}
        <Sidebar portalName="finditallmain" />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Main header */}
          <MainHeader />

          {/* Product categories */}
          <div className="mt-1 scrollable-container">
            <ProductCategoryList />
          </div>

          {/* New and trendy */}
          <div className="mt-1 scrollable-container">
            <NewAndTrendyList />
          </div>

          {/* Saved for later */}
          <div className="mt-1 scrollable-container">
            <SavedForLaterList />
          </div>
        </div>
      </div>
    </>
  );
};

export default EcommerceHomePage;