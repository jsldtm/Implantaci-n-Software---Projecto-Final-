'use client';

import React, { useState, useEffect } from 'react';
import { AdminDataManager, Product } from '@/data/mockAdminData';

export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockUpdates, setStockUpdates] = useState<{[key: string]: string}>({});

  const categories = [
    'Technology', 'Shirts', 'Household', 'Books', 'Sports', 
    'Beauty', 'Toys', 'Automotive', 'Health'
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    try {
      AdminDataManager.initializeData();
      const productsData = AdminDataManager.getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    try {
      if (newStock < 0) {
        alert('El stock no puede ser negativo');
        return;
      }

      AdminDataManager.updateProduct(productId, { stock: newStock });
      loadProducts(); // Refresh the products list
      
      // Clear the input field
      setStockUpdates(prev => ({ ...prev, [productId]: '' }));
      
      alert('Stock actualizado exitosamente');
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Error al actualizar stock');
    }
  };

  const handleBulkStockUpdate = () => {
    try {
      const updates = Object.entries(stockUpdates)
        .filter(([_, value]) => value.trim() !== '')
        .map(([productId, value]) => ({ productId, newStock: parseInt(value) }))
        .filter(update => !isNaN(update.newStock) && update.newStock >= 0);

      if (updates.length === 0) {
        alert('No hay actualizaciones válidas para procesar');
        return;
      }

      updates.forEach(({ productId, newStock }) => {
        AdminDataManager.updateProduct(productId, { stock: newStock });
      });

      loadProducts();
      setStockUpdates({});
      alert(`${updates.length} productos actualizados exitosamente`);
    } catch (error) {
      console.error('Error in bulk update:', error);
      alert('Error al actualizar stocks en lote');
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Sin Stock', color: 'bg-red-100 text-red-800' };
    if (stock < 10) return { text: 'Stock Bajo', color: 'bg-yellow-100 text-yellow-800' };
    if (stock < 50) return { text: 'Stock Medio', color: 'bg-blue-100 text-blue-800' };
    return { text: 'Stock Alto', color: 'bg-green-100 text-green-800' };
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === 'low') matchesStock = product.stock < 10;
    else if (stockFilter === 'out') matchesStock = product.stock === 0;
    else if (stockFilter === 'high') matchesStock = product.stock >= 50;
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Inventario</h2>
        <button
          onClick={handleBulkStockUpdate}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Actualizar Stocks
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los stocks</option>
          <option value="out">Sin stock</option>
          <option value="low">Stock bajo (&lt; 10)</option>
          <option value="high">Stock alto (≥ 50)</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Actual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nuevo Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      placeholder="Nuevo stock"
                      value={stockUpdates[product.id] || ''}
                      onChange={(e) => setStockUpdates(prev => ({
                        ...prev,
                        [product.id]: e.target.value
                      }))}
                      className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        const newStock = stockUpdates[product.id];
                        if (newStock && !isNaN(parseInt(newStock))) {
                          handleStockUpdate(product.id, parseInt(newStock));
                        } else {
                          alert('Por favor ingresa un stock válido');
                        }
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Actualizar
                    </button>
                    <button
                      onClick={() => {
                        const newStock = prompt(`Stock actual: ${product.stock}\nIngresa el nuevo stock para ${product.name}:`);
                        if (newStock !== null && !isNaN(parseInt(newStock)) && parseInt(newStock) >= 0) {
                          handleStockUpdate(product.id, parseInt(newStock));
                        }
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edición Rápida
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron productos</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-blue-600">Total Productos</div>
          <div className="text-2xl font-bold text-blue-900">{products.length}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-red-600">Sin Stock</div>
          <div className="text-2xl font-bold text-red-900">
            {products.filter(p => p.stock === 0).length}
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-yellow-600">Stock Bajo</div>
          <div className="text-2xl font-bold text-yellow-900">
            {products.filter(p => p.stock > 0 && p.stock < 10).length}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-green-600">Stock Alto</div>
          <div className="text-2xl font-bold text-green-900">
            {products.filter(p => p.stock >= 50).length}
          </div>
        </div>
      </div>
    </div>
  );
}
