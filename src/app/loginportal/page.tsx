// This is the login page for the application
// It contains a login form for users to enter their credentials

"use client"; // Ensure this is a client component

import React from 'react';
import UserLoginForm from '../../components/UserLoginForm/UserLoginForm'; // Adjust the import path as necessary

const LoginPortal: React.FC = () => {
  return (
    <div className  = "min-h-screen flex items-center justify-center bg-sky-500">
      <div className  = "w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <UserLoginForm />
      </div>
    </div>
  );
};

export default LoginPortal;