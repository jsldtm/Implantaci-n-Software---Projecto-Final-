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
import React, { useState } from 'react';

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

const Sidebar: React.FC<SidebarProps> = ({
  defaultSelected = "Inception",
  portalName,
  onHomeClick,
  onSearchClick,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultSelected);

  // Define the options for the Sidebar
  const options = [
    {
      name: "Inception",
      icon: <HomeIcon className="h-6 w-6" />,
      onClick: () => {
        setSelectedOption("Inception");
        if (onHomeClick) onHomeClick();
      },
      showIn: ["finditallmain", "shopping-cart", "categories", "productdetailedview"], // Portals where this icon should appear
    },
    {
      name: "Search",
      icon: <SearchIcon className="h-6 w-6" />,
      onClick: () => {
        setSelectedOption("Search");
        if (onSearchClick) onSearchClick();
      },
      showIn: ["finditallmain", "shopping-cart", "categories", "productdetailedview"],
    },
    {
      name: "Saved",
      icon: <BookmarkIcon className="h-6 w-6" />,
      onClick: () => setSelectedOption("Saved"),
      showIn: ["finditallmain", "shopping-cart", "categories", "productdetailedview"],
    },
    {
      name: "Cart",
      icon: <ShoppingCartIcon className="h-6 w-6" />,
      onClick: () => setSelectedOption("Cart"),
      showIn: ["shopping-cart"], // Only show in the "shopping-cart" portal
    },
    {
      name: "Settings",
      icon: <Cog6ToothIcon className="h-6 w-6" />,
      onClick: () => setSelectedOption("Settings"),
      showIn: ["finditallmain", "shopping-cart", "categories", "productdetailedview"],
    },
  ];

  return (
    <div className = {styles.sidebar}>
      {options
        .filter((option) => option.showIn.includes(portalName)) // Filter icons based on the portal
        .map((option) => (
          <button
            key = {option.name}
            className = {`${styles.option} ${
              selectedOption === option.name ? styles.selected : ""
            }`}
            onClick = {option.onClick}
          >
            {option.icon}
            <span className = {styles.label}>{option.name}</span>
          </button>
        ))}
    </div>
  );
};

export default Sidebar;