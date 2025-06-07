// Código por - Joaquín Saldarriaga
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminAuthForm from '../../components/AdminAuthForm';
import AdminCredentialsValidator from '../../components/AdminCredentialsValidator';
import AdminStatusMessage from '../../components/AdminStatusMessage';

export default function AdminLoginPortal() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAdminLogin = async (email: string, password: string) => {
    setLoading(true);
    setMessage('');

    try {
      const result = await AdminCredentialsValidator.validateCredentials(email, password);

      if (result.isValid && result.user) {
        AdminCredentialsValidator.storeAdminSession(result.user);
        setMessage('¡Bienvenido administrador!');
        setTimeout(() => {
          router.push('/adminportal');
        }, 500);
      } else {
        setMessage(result.errorMessage || 'Error de autenticación');
      }
    } catch (error: any) {
      console.error('Error en login de admin:', error);
      setMessage('Error en el sistema. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Portal de Administrador
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa tus credenciales de administrador
          </p>
        </div>
      </div>      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AdminAuthForm onSubmit={handleAdminLogin} loading={loading} />

          <AdminStatusMessage 
            message={message} 
            type={message.includes('Bienvenido') ? 'success' : 'error'} 
          /><div className="mt-6">
            <div className="text-xs text-gray-500 mb-4 p-3 bg-blue-50 rounded-md">
              <strong>Credenciales de prueba:</strong><br />
              Email: admin@outlook.com<br />
              Contraseña: Admin123$
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => router.push('/loginportal')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Volver al Login de Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
