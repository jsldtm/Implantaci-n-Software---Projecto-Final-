// Directiva de Next.js para indicar que este es un componente del cliente (client-side)
'use client';

// Importación de React hooks para manejo de estado y efectos
import React, { useState, useEffect } from 'react';
// Importación del gestor de datos administrativos y la interfaz Product
import { AdminDataManager, Product } from '@/data/mockAdminData';

// Componente principal para la gestión de inventario en el dashboard administrativo
// Permite monitorear y actualizar el stock de productos de forma individual o masiva
export default function InventoryManagement() {
  // Estado que almacena la lista completa de productos para gestión de inventario
  const [products, setProducts] = useState<Product[]>([]);
  // Estado que controla el indicador de carga
  const [loading, setLoading] = useState(true);
  // Estado para el término de búsqueda/filtrado de productos
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para filtrar productos por nivel de stock (bajo, sin stock, alto)
  const [stockFilter, setStockFilter] = useState('');
  // Estado para filtrar productos por categoría
  const [categoryFilter, setCategoryFilter] = useState('');
  // Estado que maneja las actualizaciones pendientes de stock (clave: productId, valor: nuevo stock)
  const [stockUpdates, setStockUpdates] = useState<{[key: string]: string}>({});

  // Arreglo de categorías disponibles para filtrado
  const categories = [
    'Technology', 'Shirts', 'Household', 'Books', 'Sports', 
    'Beauty', 'Toys', 'Automotive', 'Health'
  ];

  // 'Hook' useEffect que se ejecuta al montar el componente para cargar los productos
  useEffect(() => {
    loadProducts(); // Carga inicial de productos para gestión de inventario
  }, []);

  // Definir la función que carga *todos* los productos desde el 'gestor de datos'
  const loadProducts = () => {
    try {
      // Inicializa los datos si es necesario
      AdminDataManager.initializeData();
      // Obtiene todos los productos del gestor de datos
      const productsData = AdminDataManager.getProducts();
      setProducts(productsData); // Actualiza el estado con los productos obtenidos
    } catch (error) {
      // Manejo de errores en caso de fallo al cargar productos
      console.error('Error loading products:', error);
      alert('Error al cargar productos');
    } finally {
      // Siempre se ejecuta al final, exitoso o con error
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  // Función que maneja la actualización de stock de un producto individual
  const handleStockUpdate = (productId: string, newStock: number) => {
    try {
      // Validación: el inventario *no* puede ser negativo
      if (newStock < 0) {
        alert('El inventario no puede ser negativo!');
        return;
      }

      // Actualiza el stock del producto específico a través del gestor de datos
      AdminDataManager.updateProduct(productId, { stock: newStock });
      loadProducts(); // Recarga la lista de productos para reflejar cambios
      
      // Limpia el campo de entrada para este producto específico
      setStockUpdates(prev => ({ ...prev, [productId]: '' }));
      
      alert('Inventario actualizado exitosamente!'); // Notifica éxito al usuario
    } catch (error) {
      // Manejo de errores en caso de fallo al actualizar stock
      console.error('Error updating inventory of product:', error);      alert('Error al actualizar stock'); // Notifica error al usuario
    }
  };

  // Función que maneja la actualización masiva de stock para múltiples productos
  const handleBulkStockUpdate = () => {
    try {
      // Procesa las actualizaciones pendientes: filtra, mapea y valida
      const updates = Object.entries(stockUpdates)
        .filter(([_, value]) => value.trim() !== '')  // Excluye campos vacíos
        .map(([productId, value]) => ({ productId, newStock: parseInt(value) })) // Convierte a números
        .filter(update => !isNaN(update.newStock) && update.newStock >= 0); // Valida números positivos

      // Verifica que haya actualizaciones válidas para procesar
      if (updates.length === 0) {
        alert('No hay actualizaciones válidas para procesar');
        return;
      }

      // Aplica cada actualización de stock individualmente
      updates.forEach(({ productId, newStock }) => {
        AdminDataManager.updateProduct(productId, { stock: newStock });
      });

      loadProducts();       // Recarga la lista de productos para reflejar cambios
      setStockUpdates({});  // Limpia todas las actualizaciones pendientes
      alert(`${updates.length} productos actualizados exitosamente`); // Notifica éxito
    } catch (error) {
      // Manejo de errores en caso de fallo en actualización masiva
      console.error('Error in bulk update:', error);
      alert('Error al actualizar inventarios en lote');
    }  };

  // Función que determina el estado visual del stock basado en la cantidad disponible
  // Retorna objeto con texto descriptivo y clases CSS para el badge de estado
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Sin Inventario', color: 'bg-red-100 text-red-800' };        // Rojo para sin stock
    if (stock < 10) return { text: 'Inventario Bajo', color: 'bg-yellow-100 text-yellow-800' }; // Amarillo para stock bajo
    if (stock < 50) return { text: 'Inventario Medio', color: 'bg-blue-100 text-blue-800' };    // Azul para stock medio
    return { text: 'Inventario Alto', color: 'bg-green-100 text-green-800' };                   // Verde para stock alto
  };

  // Función que filtra la lista de productos basado en múltiples criterios
  const filteredProducts = products.filter(product => {
    // Verifica si el término de búsqueda coincide con el nombre del producto
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Verifica si el filtro de categoría coincide (vacío = mostrar todas)
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    
    // Lógica para filtrado por nivel de stock
    let matchesStock = true; // Por defecto muestra todos
    if (stockFilter === 'low') matchesStock = product.stock < 10;      // Stock bajo: menos de 10
    else if (stockFilter === 'out') matchesStock = product.stock === 0; // Sin stock: exactamente 0
    else if (stockFilter === 'high') matchesStock = product.stock >= 50; // Stock alto: 50 o más
    
    // Retorna true solo si todos los criterios de filtrado se cumplen
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Renderizado condicional mientras se cargan los datos
  if (loading) {
    return (
      <div className = "p-6">
        {/* Animación de carga con esqueletos */}
        <div className = "animate-pulse">
          <div className = "h-8 bg-gray-200 rounded w-64 mb-4"></div> {/* Título esqueleto */}
          <div className = "space-y-4">
            {/* Múltiples filas esqueleto para simular productos */}
            {[1, 2, 3].map((i) => (
              <div key={i} className = "h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className = "p-6">
      <div className = "flex justify-between items-center mb-6">
        <h2 className = "text-2xl font-bold text-gray-900">Gestión de Inventario</h2>
        <button
          onClick = {handleBulkStockUpdate}
          className = "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Actualizar inventarios
        </button>
      </div>

      {/* Filters */}
      <div className = "mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type = "text"
          placeholder = "Buscar productos..."
          value = {searchTerm}
          onChange = {(e) => setSearchTerm(e.target.value)}
          className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value = {categoryFilter}
          onChange = {(e) => setCategoryFilter(e.target.value)}
          className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value = "">Todas las categorías</option>
          {categories.map(category => (
            <option key = {category} value = {category}>{category}</option>
          ))}
        </select>
        <select
          value = {stockFilter}
          onChange = {(e) => setStockFilter(e.target.value)}
          className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value = "">Todos los inventarios</option>
          <option value = "out">Sin inventario</option>
          <option value = "low">Inventario bajo (&lt; 10)</option>
          <option value = "high">Inventario alto (≥ 50)</option>
        </select>
      </div>

      {/* Products Table */}
      <div className = "overflow-x-auto">
        <table className = "min-w-full divide-y divide-gray-200">
          <thead className = "bg-gray-50">
            <tr>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inventario actual
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nuevo inventario
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className = "bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <tr key = {product.id}>
                  <td className = "px-6 py-4 whitespace-nowrap">
                    <div className = "flex items-center">
                      <img
                        className = "h-10 w-10 rounded-lg object-cover"
                        src = {product.image}
                        alt = {product.name}
                      />
                      <div className = "ml-4">
                        <div className = "text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className = "text-sm text-gray-500">
                          ID: {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {product.stock}
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap">
                    <span className = {`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap">
                    <input
                      type = "number"
                      min = "0"
                      placeholder = "Nuevo inventario"
                      value = {stockUpdates[product.id] || ''}
                      onChange = {(e) => setStockUpdates(prev => ({
                        ...prev,
                        [product.id]: e.target.value
                      }))}
                      className = "w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className = "px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick = {() => {
                        const newStock = stockUpdates[product.id];
                        if (newStock && !isNaN(parseInt(newStock))) {
                          handleStockUpdate(product.id, parseInt(newStock));
                        } else {
                          alert('Por favor ingresa un stock válido');
                        }
                      }}
                      className = "text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Actualizar
                    </button>
                    <button
                      onClick = {() => {
                        const newStock = prompt(`Stock actual: ${product.stock}\nIngresa el nuevo stock para ${product.name}:`);
                        if (newStock !== null && !isNaN(parseInt(newStock)) && parseInt(newStock) >= 0) {
                          handleStockUpdate(product.id, parseInt(newStock));
                        }
                      }}
                      className = "text-green-600 hover:text-green-900"
                    >
                      Edición rápida
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className = "text-center py-8">
          <p className = "text-gray-500">No se encontraron productos</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className = "mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className = "bg-blue-50 p-4 rounded-lg">
          <div className = "text-sm font-medium text-blue-600">Total Productos</div>
          <div className = "text-2xl font-bold text-blue-900">{products.length}</div>
        </div>
        <div className = "bg-red-50 p-4 rounded-lg">
          <div className = "text-sm font-medium text-red-600">Sin Stock</div>
          <div className = "text-2xl font-bold text-red-900">
            {products.filter(p => p.stock === 0).length}
          </div>
        </div>
        <div className = "bg-yellow-50 p-4 rounded-lg">
          <div className = "text-sm font-medium text-yellow-600">Stock Bajo</div>
          <div className = "text-2xl font-bold text-yellow-900">
            {products.filter(p => p.stock > 0 && p.stock < 10).length}
          </div>
        </div>
        <div className = "bg-green-50 p-4 rounded-lg">
          <div className = "text-sm font-medium text-green-600">Stock Alto</div>
          <div className = "text-2xl font-bold text-green-900">
            {products.filter(p => p.stock >= 50).length}
          </div>
        </div>
      </div>
    </div>
  );
}
