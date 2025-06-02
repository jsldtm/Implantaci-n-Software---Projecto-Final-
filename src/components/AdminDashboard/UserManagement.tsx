'use client';

import React, { useState, useEffect } from 'react';
import { UserDataManager, AppUser } from '@/data/userData';

export default function UserManagement() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    try {
      // Get all users from the real user data (including both clients and admins)
      const usersData = UserDataManager.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
      alert('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };  const toggleUserStatus = (userEmail: string) => {
    try {
      // For now, we'll show a message that this would require implementing user status updates
      // In a real app, this would update the user data source
      alert(`Función de bloqueo/desbloqueo de usuarios requiere implementación completa.\nUsuario: ${userEmail}`);
      
      // If we wanted to implement this, we'd need to modify the userData.ts file
      // to support user status updates and persist them
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Error al actualizar estado del usuario');
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };  const filteredUsers = users.filter(user => {
    const userName = user.email.split('@')[0].replace('.', ' '); // Extract name from email
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || (user.status || 'active') === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>          <tbody className = "bg-white divide-y divide-gray-200">
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
                    </div>
                  </td>
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
                      }`}
                    >
                      {user.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                    </button>
                    <button                      onClick = {() => {
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
