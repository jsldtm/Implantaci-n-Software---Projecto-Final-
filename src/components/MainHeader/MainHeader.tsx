// This file is a client component because it uses the `useState` and `useEffect` hooks from React.
"use client";

import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import styles from './MainHeader.module.css'; // Import the CSS module

interface MainHeaderProps {
  username: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ username }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    setIsClient(true); // Ensure icons are rendered only on the client
  }, []);

  const handleAccountClick = () => {
    router.push('/loginportal'); // Navigate to the login portal
  };

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    if (response.ok) {
      router.push('/loginportal'); // Redirect to login portal
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Welcome, {username}!</h1>
      <div className="flex items-center space-x-4">
        {isClient && (
          <>
            <button
              aria-label="Notifications"
              className={styles.iconButton} // Apply the CSS module class
            >
              <NotificationsIcon fontSize="large" />
            </button>
            <button
              aria-label="Account"
              onClick={handleAccountClick}
              className={styles.iconButton} // Apply the CSS module class
            >
              <AccountCircleIcon fontSize="large" />
            </button>
            <button
              aria-label="Logout"
              onClick={handleLogout} // Call the logout function
              className={styles.iconButton} // Apply the CSS module class
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
