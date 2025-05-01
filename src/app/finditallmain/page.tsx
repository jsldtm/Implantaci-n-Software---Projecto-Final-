"use client"; // This is a client component

import React from "react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainHeader from "@/components/MainHeader/MainHeader";
import ProductCategoryList from "@/components/ProductCategoryList/ProductCategoryList";
import NewAndTrendyList from "@/components/NewAndTrendyList/NewAndTrendyList";
import SavedForLaterList from "@/components/SavedForLaterList/SavedForLaterList";
import { useRouter } from "next/navigation";

const EcommerceHomePage = () => {
  const router = useRouter();

  return (
    <>
      {/* Dynamically set the title and meta tags */}
      <Head>
        <title>Findit All - Where you can Find. It. All!</title>
        <meta name = "description" content = "Explore our Portal!" />
      </Head>

      <div className = "flex h-screen bg-gray-100">
        {/* Sidebar navigation */}
        <Sidebar
          defaultSelected = "Inception" // Default to "Inception" icon
          onHomeClick={() => router.push("/finditallmain")} // Navigate to "finditallmain"
          onSearchClick={() => router.push("/productdetailedview")} // Navigate to "productdetailedview"
        />

        {/* Main content */}
        <div className = "flex-1 overflow-y-auto p-4">
          {/* Main header */}
          <MainHeader username = "User-Name Jake" />

          {/* Product categories */}
          <div className = "mt-1 scrollable-container">
            <ProductCategoryList />
          </div>

          {/* New and trendy */}
          <div className = "mt-1 scrollable-container">
            <NewAndTrendyList />
          </div>

          {/* Saved for later */}
          <div className = "mt-1 scrollable-container">
            <SavedForLaterList />
          </div>
        </div>
      </div>
    </>
  );
};

export default EcommerceHomePage;