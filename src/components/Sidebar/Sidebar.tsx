// import React, { useState } from 'react';

"use client";

import { PlusIcon, BookmarkIcon, Cog6ToothIcon, MagnifyingGlassIcon as SearchIcon, HomeIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Inception');

  const options = [
    { name: 'Inception', icon: <HomeIcon className="h-6 w-6" /> },
    { name: 'Search', icon: <SearchIcon className="h-6 w-6" /> },
    { name: 'Saved', icon: <BookmarkIcon className="h-6 w-6" /> },
    { name: 'Settings', icon: <Cog6ToothIcon className="h-6 w-6" /> },
  ];

  return (
    <div className="w-20 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6">
      {options.map((option) => (
        <button
          key={option.name}
          className={`flex flex-col items-center space-y-1 ${
            selectedOption === option.name ? 'text-blue-500' : 'text-gray-400'
          } hover:text-blue-500`}
          onClick={() => setSelectedOption(option.name)}
        >
          {option.icon}
          <span className="text-xs">{option.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;