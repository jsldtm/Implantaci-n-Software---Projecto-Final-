// Mock data for admin functionality without Firebase
// Import real user data from unified source
import { appUsers, UserDataManager, AppUser } from './userData';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  registrationDate: string;
  lastLogin: string;
  status: 'active' | 'blocked';
  totalOrders: number;
  totalSpent: number;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Laptop Gaming MSI',
    price: 1299.99,
    category: 'Technology',
    stock: 25,
    description: 'Laptop gaming de alta performance con RTX 4060 y procesador Intel i7',
    image: '/images/laptop-gaming.png',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:22:00Z'
  },
  {
    id: 'prod-2',
    name: 'Smartphone Samsung Galaxy S23',
    price: 899.99,
    category: 'Technology',
    stock: 50,
    description: 'Smartphone con cámara de 200MP y pantalla Dynamic AMOLED',
    image: '/images/samsung-s23.png',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 'prod-3',
    name: 'Camisa Polo Ralph Lauren',
    price: 89.99,
    category: 'Shirts',
    stock: 100,
    description: 'Camisa polo clásica de algodón 100% en varios colores',
    image: '/images/polo-shirt.png',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-12T11:30:00Z'
  },
  {
    id: 'prod-4',
    name: 'Cafetera Nespresso',
    price: 199.99,
    category: 'Household',
    stock: 30,
    description: 'Cafetera automática con sistema de cápsulas y espumador de leche',
    image: '/images/nespresso.png',
    createdAt: '2024-01-08T12:20:00Z',
    updatedAt: '2024-01-15T13:10:00Z'
  },
  {
    id: 'prod-5',
    name: 'Libro: Clean Code',
    price: 45.99,
    category: 'Books',
    stock: 75,
    description: 'Guía completa para escribir código limpio y mantenible',
    image: '/images/clean-code-book.png',
    createdAt: '2024-01-12T15:45:00Z',
    updatedAt: '2024-01-19T10:20:00Z'
  }
];

// Convert real user data to admin format
const convertUsersToAdminFormat = (): User[] => {
  return appUsers
    .filter(user => user.role === 'client') // Only client users for admin management
    .map((user, index) => ({
      id: `user-${index + 1}`,
      email: user.email,
      name: user.email.split('@')[0].replace('.', ' '), // Extract name from email
      registrationDate: user.registrationDate || new Date().toISOString(),
      lastLogin: user.lastLogin || new Date().toISOString(),
      status: user.status || 'active',
      totalOrders: user.totalOrders || 0,
      totalSpent: user.totalSpent || 0
    }));
};

// Use real user data instead of hardcoded mock data
export const getAdminUsers = (): User[] => convertUsersToAdminFormat();

// Mock Orders Data
export const mockOrders: Order[] = [];

// Admin Statistics using real user data
export const getAdminStats = () => {
  const products = AdminDataManager.getProducts();
  const totalProducts = products.length; // Dynamic count based on actual catalog products
  
  // Use real user statistics from UserDataManager
  const userStats = UserDataManager.getUserStats();
  const totalUsers = userStats.totalClientUsers; // Only count client users for "Total Usuarios"
  const activeUsers = userStats.activeClientUsers;
  
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = products.filter(product => product.stock < 20).length;

  return {
    totalProducts,
    totalUsers, // This will now show 2 (only client users)
    activeUsers,
    totalOrders,
    totalRevenue,
    lowStockProducts,
    averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
  };
};

// Import the actual product catalog
import { productCatalog, getProductById as getCatalogProduct, getAllProducts } from './productCatalog';

// Function to convert main product catalog to admin format
const convertToAdminFormat = () => {
  const products: Product[] = [];
    // Use the actual product catalog (only existing products)
  const catalogProducts = getAllProducts();
  
  catalogProducts.forEach((productData) => {
    // Extract numeric price from string format like "$109.99 MXN"
    const priceString = productData.price?.toString() || '0';
    const cleanedPrice = priceString.replace(/[^\d.]/g, '');
    const parsedPrice = parseFloat(cleanedPrice);
    const numericPrice = (!isNaN(parsedPrice) && parsedPrice >= 0) ? parsedPrice : 0;
    
    products.push({
      id: `prod-${productData.id}`,
      name: productData.name,
      price: numericPrice,
      category: productData.category,
      stock: Math.floor(Math.random() * 100) + 1, // Random stock between 1-100
      description: productData.description,
      image: productData.image,
      createdAt: new Date(2024, 0, Math.floor(Math.random() * 20) + 1).toISOString(),
      updatedAt: new Date(2024, 0, Math.floor(Math.random() * 20) + 1).toISOString()
    });
  });
  
  return products;
};

// Local Storage Management Functions
export const AdminDataManager = {
  // Products
  getProducts: (): Product[] => {
    if (typeof window === 'undefined') {
      // Return the expanded product list instead of just mockProducts
      return convertToAdminFormat();
    }
    const stored = localStorage.getItem('adminProducts');
    if (stored) {
      const storedProducts = JSON.parse(stored);
      // If stored products is the old small set, replace with full set
      if (storedProducts.length <= 5) {
        const fullProducts = convertToAdminFormat();
        localStorage.setItem('adminProducts', JSON.stringify(fullProducts));
        return fullProducts;
      }
      return storedProducts;
    }
    // Initialize with full product set
    const fullProducts = convertToAdminFormat();
    localStorage.setItem('adminProducts', JSON.stringify(fullProducts));
    return fullProducts;
  },

  saveProducts: (products: Product[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminProducts', JSON.stringify(products));
    }
  },

  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const products = AdminDataManager.getProducts();
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.push(newProduct);
    AdminDataManager.saveProducts(products);
    return newProduct;
  },

  updateProduct: (id: string, updates: Partial<Product>) => {
    const products = AdminDataManager.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index >= 0) {
      products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
      AdminDataManager.saveProducts(products);
      return products[index];
    }
    return null;
  },

  deleteProduct: (id: string) => {
    const products = AdminDataManager.getProducts();
    const filtered = products.filter(p => p.id !== id);
    AdminDataManager.saveProducts(filtered);
    return filtered;
  },
  // Users - now using real user data
  getUsers: (): User[] => {
    if (typeof window === 'undefined') return getAdminUsers();
    const stored = localStorage.getItem('adminUsers');
    return stored ? JSON.parse(stored) : getAdminUsers();
  },

  saveUsers: (users: User[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminUsers', JSON.stringify(users));
    }
  },

  toggleUserStatus: (id: string) => {
    const users = AdminDataManager.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index >= 0) {
      users[index].status = users[index].status === 'active' ? 'blocked' : 'active';
      AdminDataManager.saveUsers(users);
      return users[index];
    }
    return null;
  },

  // Orders
  getOrders: (): Order[] => {
    if (typeof window === 'undefined') return mockOrders;
    const stored = localStorage.getItem('adminOrders');
    return stored ? JSON.parse(stored) : mockOrders;
  },

  saveOrders: (orders: Order[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminOrders', JSON.stringify(orders));
    }
  },  // Initialize data if not exists
  initializeData: () => {
    if (typeof window !== 'undefined') {
      // Force refresh of product data to use only real catalog products
      console.log('Initializing admin data with product catalog...');
      const fullProducts = convertToAdminFormat();
      AdminDataManager.saveProducts(fullProducts);
      console.log(`Initialized ${fullProducts.length} real products from catalog (no fallbacks)`);
      
      if (!localStorage.getItem('adminUsers')) {
        AdminDataManager.saveUsers(getAdminUsers()); // Use real user data
      }
      if (!localStorage.getItem('adminOrders')) {
        AdminDataManager.saveOrders(mockOrders);
      }
    }
  },

  // Force refresh products to remove any fallback "Product X" entries
  refreshProductsFromCatalog: () => {
    if (typeof window !== 'undefined') {
      console.log('Refreshing products from catalog...');
      const realProducts = convertToAdminFormat();
      localStorage.setItem('adminProducts', JSON.stringify(realProducts));
      console.log(`Refreshed to ${realProducts.length} real products from catalog`);
      return realProducts;
    }
    return [];
  }
};
