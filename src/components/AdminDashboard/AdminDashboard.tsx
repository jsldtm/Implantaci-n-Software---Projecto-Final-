// Directiva de Next.js para indicar que este es un componente del cliente (client-side)
'use client';

// Importación de React hooks para manejo de estado
import React, { useState } from 'react';
// Importación del router de Next.js para navegación programática
import { useRouter } from 'next/navigation';
// Importación de todos los subcomponentes del dashboard administrativo
import ProductManagement from './ProductManagement';    // Gestión de productos (CRUD)
import UserManagement from './UserManagement';          // Gestión de usuarios y roles
import InventoryManagement from './InventoryManagement'; // Control de inventario y stock
import AdminStats from './AdminStats';                  // Dashboard principal con estadísticas

// Tipo TypeScript que define las pestañas disponibles en el dashboard
type TabType = 'dashboard' | 'products' | 'users' | 'inventory';

// Componente principal del Dashboard Administrativo
// Actúa como contenedor y sistema de navegación entre diferentes módulos administrativos
export default function AdminDashboard() {
  // Estado que controla qué pestaña está actualmente activa/visible
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  // Hook del router para navegación programática entre páginas
  const router = useRouter();
  
  // Función que maneja el cierre de sesión del administrador
  const handleLogout = () => {
    try {
      // Elimina la sesión administrativa del almacenamiento local
      localStorage.removeItem('adminSession');
      alert('Sesión cerrada correctamente'); // Notifica al usuario
      router.push('/finditallmain');         // Redirige a la página principal
    } catch (error) {
      // Manejo de errores en caso de fallo al cerrar sesión
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión');
    }
  };

  // Configuración de las pestañas del dashboard con metadata
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },   // Vista general con estadísticas
    { id: 'products', name: 'Productos', icon: '📦' },   // Gestión de productos
    { id: 'users', name: 'Usuarios', icon: '👥' },       // Gestión de usuarios
    { id: 'inventory', name: 'Inventario', icon: '📋' }, // Control de stock
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Barra superior del dashboard administrativo */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Título del panel administrativo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administrador</h1>
            </div>
            {/* Botones de navegación y acciones en la parte derecha */}
            <div className="flex items-center space-x-4">
              {/* Botón para ver la tienda desde perspectiva de cliente */}
              <button
                onClick={() => router.push('/finditallmain')}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Ver Tienda
              </button>
              {/* Botón para cerrar sesión administrativa */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenedor principal del dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de navegación con pestañas del dashboard */}
        <div className="mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {/* Mapea cada pestaña y crea un botón de navegación */}
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)} // Cambia la pestaña activa
                className={`${
                  // Aplica estilos condicionales dependiendo si la pestaña está activa
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'     // Estilos para pestaña activa
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' // Estilos para pestañas inactivas
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>  {/* Ícono de la pestaña */}
                <span>{tab.name}</span>  {/* Nombre de la pestaña */}
              </button>
            ))}
          </nav>
        </div>

        {/* Área de contenido principal que cambia según la pestaña activa */}
        <div className="bg-white rounded-lg shadow">
          {/* Renderizado condicional de componentes según la pestaña seleccionada */}
          {activeTab === 'dashboard' && <AdminStats />}           {/* Dashboard principal con estadísticas */}
          {activeTab === 'products' && <ProductManagement />}     {/* Gestión de productos */}
          {activeTab === 'users' && <UserManagement />}           {/* Gestión de usuarios */}
          {activeTab === 'inventory' && <InventoryManagement />}  {/* Control de inventario */}
        </div>
      </div>
    </div>
  );
}
