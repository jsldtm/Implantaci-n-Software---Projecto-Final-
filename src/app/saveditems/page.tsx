// This page file defines the Saved Items page of the application

"use client";

import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainHeader from "@/components/MainHeader/MainHeader";
import SavedProductsList from "@/components/SavedProductsList/SavedProductsList";
import PurchaseHistoryList from "@/components/PurchaseHistoryList/PurchaseHistoryList";

// Defining the 'Saved Items' page component
const SavedItemsPage = () => {
  return (
    <div className = "flex h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <Sidebar portalName = "saveditems" />
      <div className = "flex-1 overflow-y-auto p-4">
        <MainHeader />
        <div className = "grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div>
            <h2 className = "text-xl font-bold mb-2">Saved Products</h2>
            <SavedProductsList />
          </div>
          <div>
            <h2 className = "text-xl font-bold mb-2">Previously Purchased</h2>
            <PurchaseHistoryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedItemsPage;