// This file is a client component because it uses the `useState` and `useEffect` hooks from React.
"use client";

import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface MainHeaderProps {
  username: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ username }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure icons are rendered only on the client
  }, []);

  return (
    <header className = "bg-blue-500 text-white p-4 flex items-center justify-between">
      <h1 className = "text-xl font-bold">Welcome, {username}!</h1>
      <div className = "flex items-center space-x-4">
        {isClient && (
          <>
            <button aria-label = "Notifications">
              <NotificationsIcon fontSize = "large" />
            </button>
            <button aria-label = "Account">
              <AccountCircleIcon fontSize = "large" />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default MainHeader;