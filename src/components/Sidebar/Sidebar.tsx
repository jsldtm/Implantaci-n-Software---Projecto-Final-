// import React, { useState } from 'react';

"use client";

import {
  PlusIcon,
  ShoppingCartIcon,
  BookmarkIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon as SearchIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Import the CSS styles
import styles from "./Sidebar.module.css";

// Trying to make the icons shown according to the selected portal
interface SidebarProps {
  defaultSelected?: string; // Default selected icon
  portalName: string; // Name of the portal (e.g., "shopping-cart", "finditallmain")
  onHomeClick?: () => void; // Callback for "Inception" icon click
  onSearchClick?: () => void; // Callback for "Search" icon click
}

interface SidebarProps {
  defaultSelected?: string; // Default selected icon
  portalName: string; // Name of the portal (e.g., "shopping-cart", "finditallmain")
  onHomeClick?: () => void; // Callback for "Inception" icon click
  onSearchClick?: () => void; // Callback for "Search" icon click
}

// Map portalName to sidebar option name
const portalToOption: Record<string, string> = {
  "finditallmain": "Inception",
  "categories": "Search",
  "saveditems": "Saved",
  "shopping-cart": "Cart",
  "settings": "Settings",
  "productdetailedview": "Inception", // or whatever makes sense for your app
};

const Sidebar: React.FC<SidebarProps> = ({
  defaultSelected = "Inception",
  portalName,
  onHomeClick,
  onSearchClick,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    portalToOption[portalName] || defaultSelected
  );
  const router = useRouter();

  useEffect(() => {
    setSelectedOption(portalToOption[portalName] || defaultSelected);
  }, [portalName, defaultSelected]);

  const options = [
    {
      name: "Inception",
      icon: <HomeIcon className="h-6 w-6" />,
      onClick: () => {
        setSelectedOption("Inception");
        router.push("/finditallmain"); // Navigate to the 'finditallmain' portal
      },
      showIn: ["finditallmain", "shopping-cart", "categories", "productdetailedview", "saveditems"],
    },
    {
      name: "Search",
      icon: <SearchIcon className="h-6 w-6" />,
      onClick: () => {
        setSelectedOption("Search");
        router.push("/categories"); // Navigate to the 'categories' portal
      },
      showIn: ["finditallmain", "shopping-cart", "categories", "productdetailedview", "saveditems"],
    },
    {
      name: "Saved",
      icon: <BookmarkIcon className="h-6 w-6" />,
      onClick: () => {
        setSelectedOption("Saved");
        router.push("/saveditems"); // <-- Add this line!
      },
      showIn: ["finditallmain", "shopping-cart", "categories", "productdetailedview", "saveditems"],
    },
    {
      name: "Cart",
      icon: <ShoppingCartIcon className="h-6 w-6" />,
      onClick: () => setSelectedOption("Cart"),
      showIn: ["shopping-cart"],
    },
    {
      name: "Settings",
      icon: <Cog6ToothIcon className="h-6 w-6" />,
      onClick: () => setSelectedOption("Settings"),
      showIn: ["finditallmain", "shopping-cart", "categories", "productdetailedview", "saveditems"],
    },
  ];

  return (
    <div className={styles.sidebar}>
      {options
        .filter((option) => option.showIn.includes(portalName))
        .map((option) => (
          <button
            key={option.name}
            className={`${styles.option} ${
              selectedOption === option.name ? styles.selected : ""
            }`}
            onClick={option.onClick}
          >
            {option.icon}
            <span className={styles.label}>{option.name}</span>
          </button>
        ))}
    </div>
  );
};

export default Sidebar;