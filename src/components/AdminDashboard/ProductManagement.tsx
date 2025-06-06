// Directiva de Next.js para indicar que este es un componente del cliente (client-side)
'use client';

// Importación de React hooks para manejo de estado y efectos
import React, { useState, useEffect, useMemo } from 'react';
// Importación del gestor de datos administrativos y la interfaz Product
import { AdminDataManager, Product } from '@/data/adminData';

// Array de categorías disponibles para los productos (coinciden con el catálogo principal)
// Movido fuera del componente para evitar recreación en cada render
const CATEGORIES = [
  'Technology', 'Shirts', 'Household', 'Books', 'Sports', 
  'Beauty', 'Pet supplies', 'Automotive', 'Health'
];

// Componente principal para la gestión de productos en el dashboard administrativo
// Permite crear, leer, actualizar y eliminar productos (operaciones CRUD)
export default function ProductManagement() {
  // Estado que almacena la lista completa de productos
  const [products, setProducts] = useState<Product[]>([]);
  // Estado que controla el indicador de carga
  const [loading, setLoading] = useState(true);
  // Estado que controla la visibilidad del modal para agregar productos
  const [showAddModal, setShowAddModal] = useState(false);
  // Estado que almacena el producto que se está editando (null si no hay edición)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  // Estado para el término de búsqueda/filtrado de productos
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para filtrar productos por categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Estado que maneja los datos del formulario para agregar/editar productos
  const [formData, setFormData] = useState({
    name: '',        // Nombre del producto
    price: '',       // Precio como string (se convierte a number al guardar)
    category: '',    // Categoría seleccionada
    description: '', // Descripción del producto
    image: '',       // URL de la imagen del producto
    stock: ''        // Cantidad en stock como string (se convierte a number al guardar)
  });

  // Hook useEffect que se ejecuta al montar el componente para cargar productos
  useEffect(() => {
    loadProducts(); // Carga inicial de productos
  }, []);  // Función que carga todos los productos desde el gestor de datos
  // Incluye manejo robusto de errores y logging para debugging
  const loadProducts = () => {
    try {
      // Fuerza la limpieza de productos de fallback y carga solo productos reales del catálogo
      AdminDataManager.refreshProductsFromCatalog();
      
      // Obtiene todos los productos del gestor de datos (solo productos reales)
      const productsData = AdminDataManager.getProducts();
      console.log(`Loaded ${productsData.length} real products from catalog for admin management`);
      
      // Valida que se obtuvieron productos
      if (!productsData || productsData.length === 0) {
        console.warn('No products found, this might indicate a data loading issue');
      }
      
      setProducts(productsData); // Actualiza el estado con los productos obtenidos
    } catch (error) {
      // Manejo de errores en caso de fallo al cargar productos
      console.error('Error loading products:', error);
      alert('Error al cargar productos. Intenta recargar la página.');
      setProducts([]); // Asegura que products no esté en estado indefinido
    } finally {
      // Siempre se ejecuta al final, exitoso o con error
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  // Función que resetea el formulario a su estado inicial
  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',      image: '',       // Resetea URL de imagen
      stock: ''        // Resetea cantidad en stock
    });
    setEditingProduct(null); // Limpia el producto en edición
  };
  // Función que maneja la adición de un nuevo producto
  // Incluye validaciones robustas y conversión segura de tipos de datos
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    
    try {
      // Validaciones de datos antes de procesar
      const price = parseFloat(formData.price);
      const stock = parseInt(formData.stock);
      
      // Validar que el precio sea un número válido y positivo
      if (isNaN(price) || price <= 0) {
        alert('El precio debe ser un número válido mayor a 0');
        return;
      }
      
      // Validar que el stock sea un número entero válido y no negativo
      if (isNaN(stock) || stock < 0) {
        alert('El stock debe ser un número entero válido (0 o mayor)');
        return;
      }
      
      // Validar que la URL de imagen sea válida (básico)
      if (!formData.image.trim() || !formData.image.startsWith('http')) {
        alert('La URL de imagen debe ser válida y comenzar con http');
        return;
      }
      
      // Convierte los datos del formulario al formato esperado por el gestor de datos
      const productData = {
        name: formData.name.trim(),             // Nombre del producto (sin espacios extra)
        price: price,                           // Precio como número válido
        category: formData.category,            // Categoría seleccionada
        description: formData.description.trim(), // Descripción del producto (sin espacios extra)
        image: formData.image.trim(),           // URL de la imagen (sin espacios extra)
        stock: stock                            // Cantidad en stock como número entero válido
      };

      // Llama al gestor de datos para agregar el nuevo producto
      AdminDataManager.addProduct(productData);
      alert('Producto agregado exitosamente'); // Notifica éxito al usuario
      setShowAddModal(false);                  // Cierra el modal de agregar
      resetForm();                             // Limpia el formulario
      loadProducts();                          // Recarga la lista de productos
    } catch (error) {
      // Manejo de errores en caso de fallo al agregar producto
      console.error('Error adding product:', error);
      alert('Error al agregar producto: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  };
  // Función que maneja la edición de un producto existente
  // Incluye las mismas validaciones robustas que la función de agregar producto
  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      // Validaciones de datos antes de procesar (mismas que en handleAddProduct)
      const price = parseFloat(formData.price);
      const stock = parseInt(formData.stock);
      
      // Validar que el precio sea un número válido y positivo
      if (isNaN(price) || price <= 0) {
        alert('El precio debe ser un número válido mayor a 0');
        return;
      }
      
      // Validar que el stock sea un número entero válido y no negativo
      if (isNaN(stock) || stock < 0) {
        alert('El stock debe ser un número entero válido (0 o mayor)');
        return;
      }
      
      // Validar que la URL de imagen sea válida (básico)
      if (!formData.image.trim() || !formData.image.startsWith('http')) {
        alert('La URL de imagen debe ser válida y comenzar con http');
        return;
      }

      // Prepara los datos actualizados del producto
      const productData = {
        name: formData.name.trim(),
        price: price,
        category: formData.category,
        description: formData.description.trim(),
        image: formData.image.trim(),
        stock: stock
      };

      // Actualiza el producto a través del gestor de datos
      AdminDataManager.updateProduct(editingProduct.id, productData);
      alert('Producto actualizado exitosamente');
      setEditingProduct(null); // Limpia el producto en edición
      resetForm();             // Resetea el formulario
      loadProducts();          // Recarga la lista de productos
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar producto: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  };
  // Función que maneja la eliminación de un producto con confirmación mejorada
  const handleDeleteProduct = (productId: string) => {
    // Busca el producto para mostrar información específica en la confirmación
    const product = products.find(p => p.id === productId);
    const productName = product ? product.name : 'este producto';
    
    // Confirmación detallada con nombre del producto
    if (!confirm(`¿Estás seguro de que quieres eliminar "${productName}"?\n\nEsta acción no se puede deshacer.`)) {
      return;
    }

    try {
      AdminDataManager.deleteProduct(productId);
      alert(`Producto "${productName}" eliminado exitosamente`);
      loadProducts(); // Recarga la lista para reflejar el cambio
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar producto: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  };  // Función que prepara un producto para edición y llena el formulario con sus datos
  const startEdit = (product: Product) => {
    setEditingProduct(product);
    // Llena el formulario con los datos del producto seleccionado
    // Convierte price y stock a string para los inputs del formulario
    setFormData({
      name: product.name || '',
      price: (product.price || 0).toString(),
      category: product.category || '',
      description: product.description || '',
      image: product.image || '',
      stock: (product.stock || 0).toString()
    });
  };  // Función que filtra productos basado en término de búsqueda y categoría seleccionada
  // Usando useMemo para evitar recálculos innecesarios y prevenir infinite loops
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Verifica si el nombre del producto contiene el término de búsqueda (case-insensitive)
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      // Verifica si la categoría coincide (vacío = mostrar todas las categorías)
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className = "p-6">
        <div className = "animate-pulse">
          <div className = "h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className = "space-y-4">
            {[1, 2, 3].map((i) => (
              <div key = {i} className = "h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className = "p-6">      <div className = "flex justify-between items-center mb-6">
        <h2 className = "text-2xl font-bold text-gray-900">Gestión de Productos</h2>
        <div className = "flex space-x-3">
          <button
            onClick = {() => {
              AdminDataManager.refreshProductsFromCatalog();
              loadProducts();
              alert('Productos refrescados desde el catálogo. Solo se muestran productos reales.');
            }}
            className = "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            title = "Limpiar productos de fallback y cargar solo del catálogo"
          >
            🔄 Actualizar catálogo
          </button>
          <button
            onClick = {() => setShowAddModal(true)}
            className = "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Agregar producto
          </button>
        </div>
      </div>{/* Filtros de búsqueda y categoría con contador de resultados */}
      <div className = "mb-6 space-y-4">
        <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type = "text"
            placeholder = "Buscar productos por nombre o descripción..."
            value = {searchTerm}
            onChange = {(e) => setSearchTerm(e.target.value)}
            className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value = {selectedCategory}
            onChange = {(e) => setSelectedCategory(e.target.value)}
            className = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >            <option value = "">Todas las categorías</option>
            {CATEGORIES.map(category => (
              <option key = {category} value = {category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Contador de productos y estadísticas rápidas */}
        <div className = "flex flex-wrap gap-4 text-sm text-gray-600">
          <span>
            Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
          </span>
          {searchTerm && (
            <span>
              Filtrado por: "<strong>{searchTerm}</strong>"
            </span>
          )}
          {selectedCategory && (
            <span>
              Categoría: <strong>{selectedCategory}</strong>
            </span>
          )}
          {(searchTerm || selectedCategory) && (
            <button
              onClick = {() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className = "text-blue-600 hover:text-blue-800 underline"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>      {/* Products List */}
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
                Inventario
              </th>
              <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className = "bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key = {product.id}>
                <td className = "px-6 py-4 whitespace-nowrap">
                  <div className = "flex items-center">
                    <img
                      className = "h-10 w-10 rounded-lg object-cover"
                      src = {product.image}
                      alt = {product.name}
                      onError = {(e) => {
                        // Manejo de error de imagen - imagen de respaldo
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-product.png';
                      }}
                    />
                    <div className = "ml-4">
                      <div className = "text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className = "text-xs text-gray-500 truncate max-w-xs">
                        {product.description.length > 50 
                          ? product.description.substring(0, 50) + '...' 
                          : product.description}                      </div>
                    </div>
                  </div>
                </td>
                <td className = "px-6 py-4 whitespace-nowrap">
                  <span className = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${(() => {
                    const price = product.price;
                    if (price == null || isNaN(price) || price < 0) {
                      return '0.00';
                    }
                    return price.toFixed(2);
                  })()}
                </td>
                <td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className = {`px-2 py-1 text-xs rounded-full font-semibold ${
                    product.stock === 0 
                      ? 'bg-red-100 text-red-800' 
                      : product.stock < 10 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : product.stock < 50
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                  }`}>
                    {product.stock === 0 
                      ? 'Sin stock' 
                      : product.stock < 10 
                        ? `⚠️ ${product.stock} unidades` 
                        : `${product.stock} unidades`}
                  </span>
                </td>
                <td className = "px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className = "flex space-x-2">
                    <button
                      onClick = {() => startEdit(product)}
                      className = "bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                      title = "Editar producto"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick = {() => handleDeleteProduct(product.id)}
                      className = "bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                      title = "Eliminar producto"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredProducts.length === 0 && (
        <div className = "text-center py-8">
          <p className = "text-gray-500">
            {searchTerm || selectedCategory 
              ? 'No se encontraron productos que coincidan con los filtros actuales' 
              : 'No hay productos disponibles'}
          </p>
          {(searchTerm || selectedCategory) && (
            <button
              onClick = {() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className = "mt-2 text-blue-600 hover:text-blue-800 underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Estadísticas rápidas del inventario */}
      {products.length > 0 && (
        <div className = "mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className = "bg-blue-50 p-4 rounded-lg">
            <div className = "text-sm font-medium text-blue-600">Total Productos</div>
            <div className = "text-2xl font-bold text-blue-900">{products.length}</div>
          </div>
          <div className = "bg-green-50 p-4 rounded-lg">
            <div className = "text-sm font-medium text-green-600">En Stock</div>
            <div className = "text-2xl font-bold text-green-900">
              {products.filter(p => p.stock > 0).length}
            </div>
          </div>
          <div className = "bg-yellow-50 p-4 rounded-lg">
            <div className = "text-sm font-medium text-yellow-600">Stock Bajo (&lt;10)</div>
            <div className = "text-2xl font-bold text-yellow-900">
              {products.filter(p => p.stock > 0 && p.stock < 10).length}
            </div>
          </div>
          <div className = "bg-red-50 p-4 rounded-lg">
            <div className = "text-sm font-medium text-red-600">Sin Stock</div>
            <div className = "text-2xl font-bold text-red-900">
              {products.filter(p => p.stock === 0).length}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddModal || editingProduct) && (
        <div className = "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className = "relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className = "mt-3">
              <h3 className = "text-lg font-medium text-gray-900 mb-4">
                {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h3>
              <form onSubmit = {editingProduct ? handleEditProduct : handleAddProduct}>
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">                  <div>
                    <label className = "block text-sm font-medium text-gray-700 mb-1">
                      Nombre del producto *
                    </label>
                    <input
                      type = "text"
                      required
                      value = {formData.name}
                      onChange = {(e) => setFormData({...formData, name: e.target.value})}
                      className = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder = "Ej. Laptop Gaming MSI"
                    />
                  </div>
                  <div>
                    <label className = "block text-sm font-medium text-gray-700 mb-1">
                      Precio (MXN) *
                    </label>
                    <input
                      type = "number"
                      step = "0.01"
                      min = "0"
                      required
                      value = {formData.price}
                      onChange = {(e) => setFormData({...formData, price: e.target.value})}
                      className = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder = "0.00"
                    />
                    {formData.price && !isNaN(parseFloat(formData.price)) && (
                      <p className = "text-xs text-gray-500 mt-1">
                        Precio mostrado: ${parseFloat(formData.price).toFixed(2)} MXN
                      </p>
                    )}
                  </div>                  <div>
                    <label className = "block text-sm font-medium text-gray-700 mb-1">
                      Categoría *
                    </label>
                    <select
                      required
                      value = {formData.category}
                      onChange = {(e) => setFormData({...formData, category: e.target.value})}
                      className = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >                      <option value = "">Seleccionar categoría</option>
                      {CATEGORIES.map(category => (
                        <option key = {category} value = {category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className = "block text-sm font-medium text-gray-700 mb-1">
                      Inventario inicial *
                    </label>
                    <input
                      type = "number"
                      min = "0"
                      required
                      value = {formData.stock}
                      onChange = {(e) => setFormData({...formData, stock: e.target.value})}
                      className = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder = "0"
                    />
                    {formData.stock && !isNaN(parseInt(formData.stock)) && (
                      <p className = "text-xs text-gray-500 mt-1">
                        {parseInt(formData.stock) === 0 
                          ? 'Producto sin stock' 
                          : parseInt(formData.stock) < 10 
                            ? 'Stock bajo - considere reabastecer' 
                            : 'Stock adecuado'}
                      </p>
                    )}
                  </div>                  <div className = "md:col-span-2">
                    <label className = "block text-sm font-medium text-gray-700 mb-1">
                      URL de imagen *
                    </label>
                    <input
                      type = "url"
                      required
                      value = {formData.image}
                      onChange = {(e) => setFormData({...formData, image: e.target.value})}
                      className = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder = "https://ejemplo.com/imagen.jpg"
                    />
                    {formData.image && (
                      <p className = "text-xs text-gray-500 mt-1">
                        Vista previa disponible después de guardar
                      </p>
                    )}
                  </div>
                  <div className = "md:col-span-2">
                    <label className = "block text-sm font-medium text-gray-700 mb-1">
                      Descripción del producto *
                    </label>
                    <textarea
                      required
                      rows = {3}
                      value = {formData.description}
                      onChange = {(e) => setFormData({...formData, description: e.target.value})}
                      className = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder = "Descripción detallada del producto, características principales, beneficios..."
                    />
                    <p className = "text-xs text-gray-500 mt-1">
                      {formData.description.length}/500 caracteres
                    </p>
                  </div>
                </div>                <div className = "flex justify-end space-x-4 mt-6">
                  <button
                    type = "button"
                    onClick = {() => {
                      setShowAddModal(false);
                      setEditingProduct(null);
                      resetForm();
                    }}
                    className = "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type = "submit"
                    className = "px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    {editingProduct ? '✏️ Actualizar Producto' : '➕ Agregar Producto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
