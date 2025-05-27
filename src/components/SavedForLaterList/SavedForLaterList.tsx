"use client";

import React, { useEffect, useState } from "react";
import arrowRight from "public/images/arrow-right.svg";

interface SavedItem {
  name: string;
  image: string;
}

const SavedForLaterList = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]); // State to hold saved items

  // Fetch saved items from the API when the component mounts
  useEffect(() => {
    const fetchSavedItems = async () => {
      const response = await fetch("/api/saved");
      const data = await response.json();
      setSavedItems(data);
    };

    fetchSavedItems();
  }, []);

  return (
    <div className = "py-4">
      {/* Static heading */}
      <h2 className = "text-lg font-semibold text-gray-800 mb-4">
        Saved for later... →
      </h2>

      {/* Scrollable container for items */}
      <div className = "scrollable-container">
        {savedItems.map((item) => (
          <div key={item.name} className = "saved-for-later-item">
            <img
              src={item.image}
              alt={item.name || "Product image"} // Fallback alt text
              className = "w-16 h-16 object-cover rounded-md"
            />
            <span className = "text-sm text-center text-gray-700">
              {item.name || "Unnamed Product"} {/* Fallback name */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForLaterList;