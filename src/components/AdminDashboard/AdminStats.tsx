// This TSX file defines the AdminStats component for the admin dashboard in the FindItAll application

// Directiva de Next.js para indicar que este es un componente del cliente (client-side)
'use client';

// Importación de React hooks para manejo de estado y efectos
import React, { useState, useEffect } from 'react';
// Importación del gestor de datos administrativos para productos y datos mock
import { AdminDataManager } from '@/data/adminData';
// Importación del gestor de datos de usuarios reales del sistema
import { UserDataManager } from '@/data/userData';

// Interfaz TypeScript que define la estructura de las estadísticas del dashboard
interface Stats {
  totalProducts: number;     // Número total de productos en el inventario
  totalUsers: number;        // Número total de usuarios clientes (sin admins)
  totalOrders: number;       // Número total de órdenes procesadas
  recentOrders: any[];       // Array de las órdenes más recientes para mostrar
  lowStockProducts: any[];   // Array de productos con inventario bajo
}

// Interfaz que define la estructura del historial de compras almacenado en localStorage
// Esta interfaz coincide con la estructura usada en CartContext
interface PurchaseHistoryItem {
  id: number;          // Identificador único de la compra
  date: string;        // Fecha de la compra en formato string
  items: Array<{       // Array de productos comprados
    id: string;        // ID del producto
    name: string;      // Nombre del producto
    price: number;     // Precio unitario del producto
    quantity: number;  // Cantidad comprada
    image: string;     // URL de la imagen del producto
  }>;
}

// Función utilitaria para obtener el historial real de compras desde localStorage
// Retorna un array de PurchaseHistoryItem o array vacío si no existe o hay error
const getRealPurchaseHistory = (): PurchaseHistoryItem[] => {
  try {
    // Intenta obtener el historial desde localStorage
    const history = localStorage.getItem('purchaseHistory');
    // Parsea el JSON si existe, sino retorna array vacío
    return history ? JSON.parse(history) : [];
  } catch (error) {
    // Manejo de errores en caso de que el JSON esté corrupto
    console.error('Error loading purchase history:', error);
    return [];
  }
};

// Función que calcula el estado dinámico de una orden basado en días hábiles transcurridos
// Retorna uno de tres estados: 'placed', 'processed', o 'completed'
const calculateOrderStatus = (orderDate: string): 'placed' | 'processed' | 'completed' => {
  const now = new Date();                    // Fecha y hora actual
  const orderCreated = new Date(orderDate);  // Fecha cuando se creó la orden
  
  // Inicialización del contador de días hábiles (excluyendo fines de semana)
  let businessDays = 0;
  const currentDate = new Date(orderCreated); // Copia de la fecha de la orden para iterar  
  // Bucle que cuenta días hábiles desde la fecha de la orden hasta hoy
  while (currentDate < now) {
    const dayOfWeek = currentDate.getDay(); // Obtiene el día de la semana (0=Domingo, 6=Sábado)
    // Excluye fines de semana: 0 = Domingo, 6 = Sábado
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDays++; // Incrementa contador solo en días hábiles
    }
    currentDate.setDate(currentDate.getDate() + 1); // Avanza al siguiente día
  }
  
  // Lógica de estados basada en días hábiles transcurridos
  if (businessDays >= 7) {
    return 'completed';   // 7+ días hábiles = Completado
  } else if (businessDays >= 2) {
    return 'processed';   // 2-6 días hábiles = En Proceso
  } else {
    return 'placed';      // 0-1 días hábiles = Pedido Realizado
  }
};

// Función auxiliar que calcula únicamente el número de días hábiles transcurridos
// Retorna un número entero representando los días hábiles desde la fecha de orden
const calculateBusinessDays = (orderDate: string): number => {
  const now = new Date();                    // Fecha actual
  const orderCreated = new Date(orderDate);  // Fecha de creación de la orden
  
  let businessDays = 0;                      // Contador de días hábiles
  const currentDate = new Date(orderCreated); // Copia de fecha para iteración
  
  // Mismo bucle que calculateOrderStatus pero solo retorna el número
  while (currentDate < now) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Excluye fines de semana
      businessDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return businessDays; // Retorna solo el número de días hábiles
};

// Función que convierte estados en inglés a texto en español para la interfaz
// Retorna string con el texto del estado en español
const getStatusText = (status: string): string => {
  switch (status) {
    case 'placed': return 'Pedido Realizado';  // Estado inicial del pedido
    case 'processed': return 'En Proceso';     // Estado intermedio
    case 'completed': return 'Completado';     // Estado final
    default: return 'Desconocido';             // Estado desconocido por defecto
  }
};

// Función que asigna clases CSS de Tailwind para colores según el estado del pedido
// Retorna string con las clases CSS para dar color al badge de estado
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'placed': return 'bg-blue-100 text-blue-800';      // Azul para "Pedido Realizado"
    case 'processed': return 'bg-yellow-100 text-yellow-800'; // Amarillo para "En Proceso"
    case 'completed': return 'bg-green-100 text-green-800';   // Verde para "Completado"
    default: return 'bg-gray-100 text-gray-800';             // Gris para estados desconocidos
  }
};

// Función que calcula el progreso visual y color para la barra de progreso de pedidos
// Retorna objeto con porcentaje de progreso (0-100) y clase CSS del color
const getOrderProgress = (status: string, businessDays: number) => {
  let progress = 0;        // Porcentaje de progreso (0-100)
  let progressColor = 'bg-blue-500'; // Color de la barra de progreso
  
  switch (status) {
    case 'placed':
      // Estado "Pedido Realizado": progreso del 0-33% basado en días transcurridos (máx 2 días)
      progress = Math.min((businessDays / 2) * 33, 33);
      progressColor = 'bg-blue-500';   // Azul para estado inicial
      break;
    case 'processed':
      // Estado "En Proceso": progreso del 33-67% basado en días 2-7
      progress = 33 + Math.min(((businessDays - 2) / 5) * 34, 34);
      progressColor = 'bg-yellow-500'; // Amarillo para estado intermedio
      break;
    case 'completed':
      // Estado "Completado": progreso completo al 100%
      progress = 100;
      progressColor = 'bg-green-500';  // Verde para estado final
      break;
  }
  
  return { progress, progressColor }; // Retorna objeto con ambos valores
};

// Función que convierte el historial de compras en formato de órdenes para el dashboard admin
// Transforma los datos del localStorage a la estructura esperada por la interfaz administrativa
const convertPurchaseHistoryToOrders = (purchaseHistory: PurchaseHistoryItem[]) => {
  return purchaseHistory.map(purchase => {
    // Calcula el total de la compra sumando precio × cantidad de cada item
    const total = purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Determina el estado dinámico basado en días hábiles transcurridos
    const dynamicStatus = calculateOrderStatus(purchase.date);
      // Retorna objeto con formato de orden administrativa
    return {
      id: purchase.id.toString(),                    // ID como string
      userEmail: 'Usuario del sistema',              // Email genérico (no disponible en localStorage)
      total: total,                                  // Total calculado de la compra
      status: dynamicStatus,                         // Estado dinámico calculado
      createdAt: purchase.date,                      // Fecha de creación
      items: purchase.items                          // Items comprados
    };
  });
};

// Componente principal AdminStats - Dashboard de estadísticas administrativas
// Muestra métricas clave, órdenes recientes y alertas de inventario bajo
export default function AdminStats() {
  // Estado para almacenar todas las estadísticas del dashboard
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,     // Inicializa contador de productos en 0
    totalUsers: 0,        // Inicializa contador de usuarios en 0
    totalOrders: 0,       // Inicializa contador de órdenes en 0
    recentOrders: [],     // Inicializa array vacío para órdenes recientes
    lowStockProducts: []  // Inicializa array vacío para productos con stock bajo
  });
  
  // Estado para controlar el indicador de carga
  const [loading, setLoading] = useState(true);

  // Hook useEffect que se ejecuta al montar el componente para cargar datos
  useEffect(() => {
    loadStats(); // Llama a la función de carga de estadísticas
  }, []);

  // Función asíncrona que carga todas las estadísticas del dashboard
  const loadStats = async () => {
    try {
      // Simula un retraso de carga para mostrar el indicador (UX mejorada)
      await new Promise(resolve => setTimeout(resolve, 500));

      // Obtiene datos de productos desde el gestor de datos administrativos
      const products = AdminDataManager.getProducts();
      
      // Obtiene estadísticas REALES de usuarios en lugar de datos mock
      const userStats = UserDataManager.getUserStats();
      
      // Obtiene historial REAL de compras desde localStorage en lugar de mock
      const realPurchaseHistory = getRealPurchaseHistory();
      // Convierte el historial de compras al formato esperado por el dashboard
      const orders = convertPurchaseHistoryToOrders(realPurchaseHistory);

      // Calcula estadísticas usando datos REALES
      const totalProducts = products.length;                  // Cuenta total de productos
      const totalUsers = userStats.totalClientUsers;         // Solo usuarios clientes para "Total Usuarios"
      const totalOrders = orders.length;                     // Cuenta total de órdenes

      // Obtiene las 5 órdenes más recientes ordenadas por fecha de creación
      const recentOrders = orders
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      // Filtra productos con stock bajo (menos de 10 unidades)
      const lowStockProducts = products.filter((product: any) => product.stock < 10);

      setStats({
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
      <div className = "p-6">
        <div className = "animate-pulse">
          <div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key = {i} className = "bg-gray-200 h-24 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (    <div className = "p-6">
      <h2 className = "text-2xl font-bold text-gray-900 mb-6">Dashboard General</h2>
      
      {/* Dynamic Order Status Info */}
      {stats.totalOrders > 0 && (
        <div className = "mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h3 className = "text-lg font-semibold text-gray-900 mb-2">📊 Sistema de Estados Dinámicos</h3>
          <p className = "text-sm text-gray-700 mb-2">
            Los pedidos cambian automáticamente de estado basado en días hábiles transcurridos:
          </p>
          <div className = "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className = "flex items-center">
              <span className = "w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span><strong>Pedido Realizado:</strong> 0-1 días hábiles</span>
            </div>
            <div className = "flex items-center">
              <span className = "w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span><strong>En Proceso:</strong> 2-6 días hábiles</span>
            </div>
            <div className = "flex items-center">
              <span className = "w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span><strong>Completado:</strong> 7+ días hábiles</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className = "bg-blue-50 p-6 rounded-lg">
          <div className = "flex items-center">
            <div className = "p-2 bg-blue-500 rounded-md">
              <span className = "text-white text-xl">📦</span>
            </div>
            <div className = "ml-4">
              <p className = "text-sm font-medium text-blue-600">Total Productos</p>
              <p className = "text-2xl font-bold text-blue-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>        <div className = "bg-green-50 p-6 rounded-lg">
          <div className = "flex items-center">
            <div className = "p-2 bg-green-500 rounded-md">
              <span className = "text-white text-xl">👥</span>
            </div>
            <div className = "ml-4">
              <p className = "text-sm font-medium text-green-600">Total Usuarios (Clientes)</p>
              <p className = "text-2xl font-bold text-green-900">{stats.totalUsers}</p>
              <p className = "text-xs text-gray-500">Datos reales del sistema de login</p>
            </div>
          </div>
        </div>        <div className = "bg-purple-50 p-6 rounded-lg">
          <div className = "flex items-center">
            <div className = "p-2 bg-purple-500 rounded-md">
              <span className = "text-white text-xl">🛒</span>
            </div>
            <div className = "ml-4">
              <p className = "text-sm font-medium text-purple-600">Total Órdenes</p>
              <p className = "text-2xl font-bold text-purple-900">{stats.totalOrders}</p>
              {stats.totalOrders > 0 && (
                <div className = "text-xs text-gray-500 mt-1">
                  {stats.recentOrders.filter(o => o.status === 'placed').length} nuevas • {' '}
                  {stats.recentOrders.filter(o => o.status === 'processed').length} en proceso • {' '}
                  {stats.recentOrders.filter(o => o.status === 'completed').length} completadas
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className = "grid grid-cols-1 lg:grid-cols-2 gap-8">        {/* Recent Orders */}        <div>
          <h3 className = "text-lg font-semibold text-gray-900 mb-4">Pedidos recientes</h3>
          <div className = "space-y-3">
            {stats.recentOrders.length > 0 ? (              stats.recentOrders.map((order) => {
                const daysSinceOrder = Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                const businessDays = calculateBusinessDays(order.createdAt);
                const { progress, progressColor } = getOrderProgress(order.status, businessDays);
                
                return (
                  <div key = {order.id} className = "p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                    <div className = "flex justify-between items-start mb-3">
                      <div className = "flex-1">
                        <div className = "flex items-center justify-between mb-2">
                          <p className = "font-medium text-gray-900">Orden #{order.id.slice(-6)}</p>
                          <span className = {`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className = "mb-3">
                          <div className = "flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progreso del pedido</span>
                            <span>{businessDays} días hábiles</span>
                          </div>
                          <div className = "w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className = {`h-2 rounded-full transition-all duration-500 ${progressColor}`}
                              style = {{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <div className = "flex justify-between text-xs text-gray-400 mt-1">
                            <span>Realizado</span>
                            <span>En Proceso</span>
                            <span>Completado</span>
                          </div>
                        </div>
                        
                        <p className = "text-sm text-gray-600">Usuario: {order.userEmail}</p>
                        <p className = "text-sm text-gray-600">
                          Total: ${order.total?.toFixed(2) || '0.00'}
                        </p>
                        <p className = "text-sm text-gray-500">
                          Fecha: {new Date(order.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <p className = "text-xs text-gray-400 mt-1">
                          📅 Hace {daysSinceOrder} día{daysSinceOrder !== 1 ? 's' : ''} 
                          ({businessDays} días hábiles)
                        </p>
                        
                        {/* Show items in the order */}
                        <div className = "mt-2">
                          <p className = "text-xs text-gray-500 mb-1">Productos ({order.items?.length || 0}):</p>
                          <div className = "text-xs text-gray-600">
                            {order.items?.slice(0, 3).map((item: any, index: number) => (
                              <span key = {index}>
                                {item.name} (x{item.quantity})
                                {index < Math.min(2, order.items.length - 1) && ', '}
                              </span>
                            ))}
                            {order.items?.length > 3 && <span>... y {order.items.length - 3} más</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className = "text-center py-8">
                <p className = "text-gray-500 mb-2">📦 No hay órdenes reales aún</p>
                <p className = "text-sm text-gray-400">
                  Las órdenes aparecerán aquí cuando los usuarios compren productos
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div>
          <h3 className = "text-lg font-semibold text-gray-900 mb-4">
            Productos con inventario limitado
            {stats.lowStockProducts.length > 0 && (
              <span className = "ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                {stats.lowStockProducts.length}
              </span>
            )}
          </h3>
          <div className = "space-y-3">
            {stats.lowStockProducts.length > 0 ? (
              stats.lowStockProducts.map((product: any) => (
                <div key = {product.id} className = "p-4 bg-red-50 rounded-lg">
                  <div className = "flex justify-between items-center">
                    <div>
                      <p className = "font-medium text-gray-900">{product.title}</p>
                      <p className = "text-sm text-gray-600">Stock: {product.stock} unidades</p>
                      <p className = "text-sm text-gray-600">Precio: ${product.price}</p>
                    </div>
                    <span className = "px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      Stock Bajo
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className = "text-gray-500 text-center py-4">
                ✅ Todos los productos tienen stock suficiente
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
