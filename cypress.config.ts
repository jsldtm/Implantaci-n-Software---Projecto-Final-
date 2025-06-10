// Configuración profesional de Cypress para pruebas automatizadas E2E
// Código por - Joaquín Saldarriaga
// Sistema de validación automatizada para componentes principales de FindItAll

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // URL base de la aplicación en desarrollo
    baseUrl: 'http://localhost:3000',
    
    // Configuración de viewport para pruebas responsivas
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Directorio de especificaciones de prueba
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Configuración de timeouts para aplicaciones React complejas
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    
    // Video y screenshots para debugging
    video: true,
    screenshotOnRunFailure: true,
    
    // Configuración del navegador de pruebas
    chromeWebSecurity: false,
    
    setupNodeEvents(on, config) {
      // Configuración de eventos para reportes y plugins
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
    },
  },
  
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'src/components/**/*.cy.{js,jsx,ts,tsx}',
  },
  
  // Configuración de ambiente
  env: {
    // Variables de ambiente para las pruebas
    'TEST_USER_EMAIL': 'test@finditalltesting.com',
    'TEST_USER_PASSWORD': 'TestPassword123!',
    'ADMIN_EMAIL': 'admin@finditalltesting.com',
    'ADMIN_PASSWORD': 'AdminPassword123!'
  }
})
