// import React, { useState } from 'react';

"use client";

import { PlusIcon, BookmarkIcon, Cog6ToothIcon, MagnifyingGlassIcon as SearchIcon, HomeIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

// Import the CSS styles
import styles from "./Sidebar.module.css";

interface SidebarProps {
  defaultSelected?: string; // Default selected icon
  onHomeClick?: () => void; // Callback for "Inception" icon click
  onSearchClick?: () => void; // Callback for "Search" icon click
}

const Sidebar: React.FC<SidebarProps> = ({
  defaultSelected = "Inception",
  onHomeClick,
  onSearchClick,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultSelected);

  const options = [
    {
      name: "Inception",
      icon: <HomeIcon className="h-6 w-6" />,
      onClick: () => {
        setSelectedOption("Inception");
        if (onHomeClick) onHomeClick(); // Trigger navigation callback
      },
    },
    {
      name: "Search",
      icon: <SearchIcon className="h-6 w-6" />,
      onClick: () => {
        setSelectedOption("Search");
        if (onSearchClick) onSearchClick(); // Trigger navigation callback
      },
    },
    {
      name: "Saved",
      icon: <BookmarkIcon className="h-6 w-6" />,
      onClick: () => setSelectedOption("Saved"),
    },
    {
      name: "Settings",
      icon: <Cog6ToothIcon className="h-6 w-6" />,
      onClick: () => setSelectedOption("Settings"),
    },
  ];

  return (
    <div className = {styles.sidebar}>
      {options.map((option) => (
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