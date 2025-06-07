// Código por - Joaquín Saldarriaga
// Shared user data for the entire application
// This replaces hardcoded users and provides a single source of truth

export interface AppUser {
  email: string;
  password: string;
  role: 'client' | 'admin';
  registrationDate?: string;
  lastLogin?: string;
  status?: 'active' | 'blocked';
  totalOrders?: number;
  totalSpent?: number;
}

// Real user data - moved from UserLoginForm to be shared across the app
export const appUsers: AppUser[] = [
  // Client users
  {
    email: "jake@outlook.com",
    password: "Password123$",
    role: "client",
    registrationDate: "2024-01-01T10:00:00Z",
    lastLogin: "2024-01-20T18:30:00Z",
    status: "active",
    totalOrders: 15,
    totalSpent: 2450.75
  },
  {
    email: "testuser@example.com",
    password: "t3sTpa$$word",
    role: "client",
    registrationDate: "2024-01-03T14:20:00Z",
    lastLogin: "2024-01-19T12:15:00Z",
    status: "active",
    totalOrders: 8,
    totalSpent: 1200.50
  },
  // Admin users
  {
    email: "admin@outlook.com",
    password: "Admin123$",
    role: "admin",
    registrationDate: "2024-01-01T08:00:00Z",
    lastLogin: "2024-01-20T16:45:00Z",
    status: "active",
    totalOrders: 0,
    totalSpent: 0
  },
  {
    email: "jake.admin@gmail.com",
    password: "JakeAdmin123$",
    role: "admin",
    registrationDate: "2024-01-02T09:15:00Z",
    lastLogin: "2024-01-20T14:22:00Z",
    status: "active",
    totalOrders: 0,
    totalSpent: 0
  },
  {
    email: "superadmin@yahoo.com",
    password: "SuperAdmin123$",
    role: "admin",
    registrationDate: "2024-01-01T07:30:00Z",
    lastLogin: "2024-01-20T11:10:00Z",
    status: "active",
    totalOrders: 0,
    totalSpent: 0
  }
];

// Utility functions for user management
export const UserDataManager = {
  // Get all users
  getAllUsers: (): AppUser[] => appUsers,
  
  // Get only client users (for "Total Usuarios" count)
  getClientUsers: (): AppUser[] => appUsers.filter(user => user.role === 'client'),
  
  // Get only admin users
  getAdminUsers: (): AppUser[] => appUsers.filter(user => user.role === 'admin'),
  
  // Get active client users
  getActiveClientUsers: (): AppUser[] => 
    appUsers.filter(user => user.role === 'client' && user.status === 'active'),
  
  // Find user by email and password
  authenticateUser: (email: string, password: string): AppUser | null => {
    return appUsers.find(user => user.email === email && user.password === password) || null;
  },
  
  // Get user statistics for admin dashboard
  getUserStats: () => {
    const clientUsers = UserDataManager.getClientUsers();
    const activeClients = UserDataManager.getActiveClientUsers();
    
    return {
      totalClientUsers: clientUsers.length,
      totalAdminUsers: UserDataManager.getAdminUsers().length,
      activeClientUsers: activeClients.length,
      totalUsers: appUsers.length, // All users including admins
      averageOrdersPerUser: clientUsers.length > 0 
        ? clientUsers.reduce((sum, user) => sum + (user.totalOrders || 0), 0) / clientUsers.length 
        : 0,
      totalRevenue: clientUsers.reduce((sum, user) => sum + (user.totalSpent || 0), 0)
    };
  }
};
