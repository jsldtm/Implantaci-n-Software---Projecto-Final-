'use client';

import React, { useState, useEffect } from 'react';
import { AdminDataManager } from '@/data/mockAdminData';
import { UserDataManager } from '@/data/userData';

interface Stats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  recentOrders: any[];
  lowStockProducts: any[];
}

// Purchase history interface to match CartContext structure
interface PurchaseHistoryItem {
  id: number;
  date: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

// Utility function to get real purchase history from localStorage
const getRealPurchaseHistory = (): PurchaseHistoryItem[] => {
  try {
    const history = localStorage.getItem('purchaseHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading purchase history:', error);
    return [];
  }
};

// Convert purchase history to admin order format
const convertPurchaseHistoryToOrders = (purchaseHistory: PurchaseHistoryItem[]) => {
  return purchaseHistory.map(purchase => {
    const total = purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return {
      id: purchase.id.toString(),
      userEmail: 'Usuario del sistema', // We don't have user email in purchase history
      total: total,
      status: 'completed',
      createdAt: purchase.date,
      items: purchase.items
    };
  });
};

export default function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    recentOrders: [],
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);  const loadStats = async () => {
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500));      // Get data from AdminDataManager for products
      const products = AdminDataManager.getProducts();
      
      // Get REAL user data instead of mock users
      const userStats = UserDataManager.getUserStats();
      
      // Get REAL purchase history from localStorage instead of mock orders
      const realPurchaseHistory = getRealPurchaseHistory();
      const orders = convertPurchaseHistoryToOrders(realPurchaseHistory);

      // Calculate stats using REAL data
      const totalProducts = products.length;
      const totalUsers = userStats.totalClientUsers; // Only client users for "Total Usuarios"
      const totalOrders = orders.length;

      // Recent orders (last 5)
      const recentOrders = orders
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      // Low stock products (stock < 10)
      const lowStockProducts = products.filter((product: any) => product.stock < 10);      setStats({
        totalProducts,
        totalUsers,
        totalOrders,
        recentOrders,
        lowStockProducts
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-24 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard General</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="p-2 bg-blue-500 rounded-md">
              <span className="text-white text-xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Total Productos</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="p-2 bg-green-500 rounded-md">
              <span className="text-white text-xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Total Usuarios (Clientes)</p>
              <p className="text-2xl font-bold text-green-900">{stats.totalUsers}</p>
              <p className="text-xs text-gray-500">Datos reales del sistema de login</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="p-2 bg-purple-500 rounded-md">
              <span className="text-white text-xl">🛒</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Total Órdenes</p>
              <p className="text-2xl font-bold text-purple-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">        {/* Recent Orders */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Órdenes Recientes (Datos Reales)</h3>
          <div className="space-y-3">
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Orden #{order.id.slice(-6)}</p>
                      <p className="text-sm text-gray-600">Usuario: {order.userEmail}</p>
                      <p className="text-sm text-gray-600">
                        Total: ${order.total?.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Fecha: {new Date(order.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {/* Show items in the order */}
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Productos ({order.items?.length || 0}):</p>
                        <div className="text-xs text-gray-600">
                          {order.items?.slice(0, 3).map((item: any, index: number) => (
                            <span key={index}>
                              {item.name} (x{item.quantity})
                              {index < Math.min(2, order.items.length - 1) && ', '}
                            </span>
                          ))}
                          {order.items?.length > 3 && <span>... y {order.items.length - 3} más</span>}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'completed' ? 'Completada' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">📦 No hay órdenes reales aún</p>
                <p className="text-sm text-gray-400">
                  Las órdenes aparecerán aquí cuando los usuarios compren productos
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Productos con Stock Bajo
            {stats.lowStockProducts.length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                {stats.lowStockProducts.length}
              </span>
            )}
          </h3>
          <div className="space-y-3">
            {stats.lowStockProducts.length > 0 ? (
              stats.lowStockProducts.map((product: any) => (
                <div key={product.id} className="p-4 bg-red-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{product.title}</p>
                      <p className="text-sm text-gray-600">Stock: {product.stock} unidades</p>
                      <p className="text-sm text-gray-600">Precio: ${product.price}</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      Stock Bajo
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                ✅ Todos los productos tienen stock suficiente
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
