// This file is a client component because it uses the `useState` and `useEffect` hooks from React.
"use client";

import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { useSettings } from "@/context/SettingsContext";
import styles from './MainHeader.module.css'; // Import the CSS module

const MainHeader: React.FC = () => {
  const { settings } = useSettings();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAccountClick = () => {
    router.push('/loginportal');
  };

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    if (response.ok) {
      router.push('/loginportal');
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Welcome, {settings.username}!</h1>
      <div className = "flex items-center space-x-4">
        {isClient && (
          <>
            <button aria-label = "Notifications" className={styles.iconButton}>
              <NotificationsIcon fontSize = "large" />
            </button>
            <button aria-label = "Account" onClick={handleAccountClick} className={styles.iconButton}>
              <AccountCircleIcon fontSize = "large" />
            </button>
            <button aria-label = "Logout" onClick={handleLogout} className={styles.iconButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
