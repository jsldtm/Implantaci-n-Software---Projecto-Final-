// Código por - Joaquín Saldarriaga
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';
import { AdminDataManager } from '@/data/adminData';

interface AdminInfo {
  role: string;
  loginTime: string;
  [key: string]: any;
}

export default function AdminPortal() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in via localStorage
    const checkAdminSession = () => {
      try {
        const adminSession = localStorage.getItem('adminSession');
        
        if (adminSession) {
          const sessionData = JSON.parse(adminSession);
          const loginTime = new Date(sessionData.loginTime);
          const now = new Date();
          const diffHours = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
          
          // Session expires after 8 hours
          if (diffHours < 8 && sessionData.role === 'admin') {
            setIsAdmin(true);
            setAdminInfo(sessionData);
            // Initialize mock data
            AdminDataManager.initializeData();
          } else {
            // Session expired
            localStorage.removeItem('adminSession');
            router.push('/adminloginportal');
          }
        } else {
          // No session found
          router.push('/adminloginportal');
        }
      } catch (error) {
        console.error('Error verificando sesión de admin:', error);
        router.push('/adminloginportal');
      } finally {
        setLoading(false);
      }
    };

    checkAdminSession();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    router.push('/adminloginportal');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Verificando acceso de administrador...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-red-600">Acceso denegado. Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard adminInfo={adminInfo} onLogout={handleLogout} />
    </div>
  );
}
