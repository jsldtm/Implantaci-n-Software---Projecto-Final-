// Código por - Joaquín Saldarriaga
// Directiva de Next.js para indicar que este es un componente del cliente (client-side)
'use client';

// Importación de React hooks para manejo de estado y efectos
import React, { useState, useEffect } from 'react';
// Importación del gestor de datos de usuarios y la interfaz AppUser
import { UserDataManager, AppUser } from '@/data/userData';

// Componente principal para la gestión de usuarios en el dashboard administrativo
// Permite visualizar, buscar y gestionar usuarios del sistema (clientes y administradores)
export default function UserManagement() {
  // Estado que almacena la lista completa de usuarios del sistema
  const [users, setUsers] = useState<AppUser[]>([]);
  // Estado que controla el indicador de carga
  const [loading, setLoading] = useState(true);
  // Estado para el término de búsqueda/filtrado de usuarios
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para filtrar usuarios por estado (activo/inactivo)
  const [statusFilter, setStatusFilter] = useState('');

  // Hook useEffect que se ejecuta al montar el componente para cargar usuarios
  useEffect(() => {
    loadUsers(); // Carga inicial de usuarios
  }, []);

  // Función que carga todos los usuarios del sistema desde el gestor de datos
  const loadUsers = () => {
    try {
      // Obtiene todos los usuarios reales del sistema (incluye clientes y administradores)
      const usersData = UserDataManager.getAllUsers();
      setUsers(usersData); // Actualiza el estado con los usuarios obtenidos
    } catch (error) {
      // Manejo de errores en caso de fallo al cargar usuarios
      console.error('Error loading users:', error);
      alert('Error al cargar usuarios');
    } finally {
      // Siempre se ejecuta al final, exitoso o con error
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  // Función que maneja el cambio de estado de un usuario (activo/bloqueado)
  const toggleUserStatus = (userEmail: string) => {
    try {
      // Por ahora, muestra un mensaje indicando que requiere implementación completa
      // En una aplicación real, esto actualizaría la fuente de datos del usuario
      alert(`Función de bloqueo/desbloqueo de usuarios requiere implementación completa.\nUsuario: ${userEmail}`);
      
      // Si quisiéramos implementar esto, necesitaríamos modificar el archivo userData.ts
      // para soportar actualizaciones de estado de usuario y persistirlas
    } catch (error) {
      // Manejo de errores en caso de fallo al actualizar estado
      console.error('Error updating user status:', error);
      alert('Error al actualizar estado del usuario');
    }
  };
    // Función utilitaria que formatea fechas para mostrar en la interfaz
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';  // Retorna 'N/A' si no hay fecha
    try {
      const date = new Date(dateString); // Crea objeto Date desde string
      // Formatea la fecha en español con formato completo
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',   // Año completo (ej: 2024)
        month: 'short',    // Mes abreviado (ej: dic)
        day: 'numeric',    // Día del mes (ej: 15)
        hour: '2-digit',   // Hora con 2 dígitos (ej: 14)
        minute: '2-digit'  // Minutos con 2 dígitos (ej: 30)
      });
    } catch {
      return 'N/A'; // Retorna 'N/A' si hay error al parsear la fecha
    }
  };

  // Función que filtra la lista de usuarios basado en criterios de búsqueda y estado
  const filteredUsers = users.filter(user => {
    // Extrae el nombre del usuario desde su email (antes del @, reemplaza puntos con espacios)
    const userName = user.email.split('@')[0].replace('.', ' ');
    // Verifica si el término de búsqueda coincide con email o nombre de usuario
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userName.toLowerCase().includes(searchTerm.toLowerCase());
    // Verifica si el filtro de estado coincide (usa 'active' por defecto si no hay estado)
    const matchesStatus = statusFilter === '' || (user.status || 'active') === statusFilter;
    // Retorna true solo si ambos criterios se cumplen
    return matchesSearch && matchesStatus;
  });

  // Renderizado condicional mientras se cargan los datos
  if (loading) {
    return (
      <div className = "p-6">
        <div className = "animate-pulse">
          <div className = "h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className = "space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key = {i} className = "h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className = "p-6">
      <div className = "flex justify-between items-center mb-6">
        <h2 className = "text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
        <div className = "text-sm text-gray-600">
          Total: {users.length} usuarios
        </div>
      </div>

      <div className = "mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type = "text"
          placeholder = "Buscar por email o nombre..."
          value = {searchTerm}
          onChange = {(e) => setSearchTerm(e.target.value)}
          className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value = {statusFilter}
          onChange = {(e) => setStatusFilter(e.target.value)}
          className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value = "">Todos los estados</option>
          <option value = "active">Activos</option>
          <option value = "blocked">Bloqueados</option>
        </select>
      </div>

      <div className = "overflow-x-auto">
        <table className = "min-w-full divide-y divide-gray-200">
          <thead className = "bg-gray-50">
            <tr>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Registro
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Último Acceso
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Órdenes
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Gastado
              </th>              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className = "bg-white divide-y divide-gray-200">
            {filteredUsers.map((user, index) => {
              const userName = user.email.split('@')[0].replace('.', ' ');
              return (
                <tr key = {user.email}>
                  <td className = "px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className = "text-sm font-medium text-gray-900">
                        {userName}
                      </div>
                      <div className = "text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap">
                    <span className = {`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Bloqueado'}
                    </span>
                  </td>                  <td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.registrationDate)}
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.totalOrders || 0}
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(user.totalSpent || 0).toFixed(2)}
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick = {() => toggleUserStatus(user.email)}
                      className = {`mr-4 ${
                        user.status === 'active'
                          ? 'text-red-600 hover:text-red-900'
                          : 'text-green-600 hover:text-green-900'
                      }`}                    >
                      {user.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                    </button>
                    <button
                      onClick = {() => {
                        alert(`Información detallada del usuario:\n\nEmail: ${user.email}\nNombre: ${userName}\nRol: ${user.role}\nEstado: ${user.status || 'active'}\nRegistro: ${formatDate(user.registrationDate)}\nÓrdenes totales: ${user.totalOrders || 0}\nTotal gastado: $${(user.totalSpent || 0).toFixed(2)}`);
                      }}
                      className = "text-blue-600 hover:text-blue-900"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className = "text-center py-8">
          <p className = "text-gray-500">No se encontraron usuarios</p>
        </div>
      )}

      <div className = "mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className = "bg-blue-50 p-4 rounded-lg">
          <div className = "text-sm font-medium text-blue-600">Total Usuarios</div>
          <div className = "text-2xl font-bold text-blue-900">{users.length}</div>
        </div>
        <div className = "bg-green-50 p-4 rounded-lg">
          <div className = "text-sm font-medium text-green-600">Usuarios Activos</div>
          <div className = "text-2xl font-bold text-green-900">
            {users.filter(u => u.status === 'active').length}
          </div>
        </div>
        <div className = "bg-red-50 p-4 rounded-lg">
          <div className = "text-sm font-medium text-red-600">Usuarios Bloqueados</div>
          <div className = "text-2xl font-bold text-red-900">
            {users.filter(u => u.status === 'blocked').length}
          </div>
        </div>
      </div>
    </div>
  );
}
