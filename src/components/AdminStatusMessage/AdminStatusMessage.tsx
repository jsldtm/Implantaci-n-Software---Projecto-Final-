'use client';

import React from 'react';

interface AdminStatusMessageProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

export default function AdminStatusMessage({ message, type = 'info' }: AdminStatusMessageProps) {
  if (!message) return null;

  const getMessageStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border border-red-200';
      default:
        return 'bg-blue-50 text-blue-800 border border-blue-200';
    }
  };

  const isSuccessMessage = message.includes('Bienvenido') || type === 'success';
  const messageType = isSuccessMessage ? 'success' : (type === 'error' ? 'error' : 'info');

  return (
    <div className={`mt-4 p-3 rounded-md ${getMessageStyles()}`}>
      {message}
    </div>
  );
}
