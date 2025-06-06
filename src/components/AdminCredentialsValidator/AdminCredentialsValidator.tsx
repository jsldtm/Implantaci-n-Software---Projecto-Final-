'use client';

// Mock admin credentials for local authentication
const mockAdminCredentials = [
  {
    email: 'admin@outlook.com',
    password: 'Admin123$',
    role: 'admin',
    name: 'Administrador Principal'
  },
  {
    email: 'jake.admin@gmail.com',
    password: 'JakeAdmin123$',
    role: 'admin',
    name: 'Jake Admin'
  },
  {
    email: 'superadmin@yahoo.com',
    password: 'SuperAdmin123$',
    role: 'admin',
    name: 'Super Admin'
  }
];

export interface AdminUser {
  email: string;
  password: string;
  role: string;
  name: string;
}

export interface ValidationResult {
  isValid: boolean;
  user?: AdminUser;
  errorMessage?: string;
}

export default class AdminCredentialsValidator {
  static async validateCredentials(email: string, password: string): Promise<ValidationResult> {
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check admin credentials
      const admin = mockAdminCredentials.find(
        (admin) => admin.email === email && admin.password === password
      );

      if (admin) {
        return {
          isValid: true,
          user: admin
        };
      } else {
        return {
          isValid: false,
          errorMessage: 'Credenciales incorrectas. Solo administradores pueden acceder.'
        };
      }
    } catch (error) {
      console.error('Error en validación de credenciales:', error);
      return {
        isValid: false,
        errorMessage: 'Error en el sistema. Intente nuevamente.'
      };
    }
  }

  static storeAdminSession(user: AdminUser): void {
    localStorage.setItem('adminSession', JSON.stringify({
      email: user.email,
      name: user.name,
      role: user.role,
      loginTime: new Date().toISOString()
    }));
  }

  static getTestCredentials(): AdminUser[] {
    return mockAdminCredentials;
  }
}
