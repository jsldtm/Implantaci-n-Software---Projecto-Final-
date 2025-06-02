'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock admin credentials for local authentication
const mockAdminCredentials = [
  {
    email: 'admin@outlook.com',
    password: 'Admin123$',
    role: 'admin',
    name: 'Administrador Principal'
  },
  {
    email: 'jake.admin@gmail.com',
    password: 'JakeAdmin123$',
    role: 'admin',
    name: 'Jake Admin'
  },
  {
    email: 'superadmin@yahoo.com',
    password: 'SuperAdmin123$',
    role: 'admin',
    name: 'Super Admin'
  }
];

export default function AdminLoginPortal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check admin credentials
      const admin = mockAdminCredentials.find(
        (admin) => admin.email === email && admin.password === password
      );

      if (admin) {
        // Store admin session in localStorage
        localStorage.setItem('adminSession', JSON.stringify({
          email: admin.email,
          name: admin.name,
          role: admin.role,
          loginTime: new Date().toISOString()
        }));

        setMessage('¡Bienvenido administrador!');
        setTimeout(() => {
          router.push('/adminportal');
        }, 500);
      } else {
        setMessage('Credenciales incorrectas. Solo administradores pueden acceder.');
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
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleAdminLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="admin@finditall.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-md ${
              message.includes('Bienvenido') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}          <div className="mt-6">
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
