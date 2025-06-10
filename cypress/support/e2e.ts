// Cypress support file para comandos personalizados de FindItAll
// Código por - Joaquín Saldarriaga

import './commands'

// Configuración global para todas las pruebas E2E
beforeEach(() => {
  // Interceptar errores de JavaScript para debugging
  cy.window().then((win) => {
    win.console.error = cy.stub().as('consoleError')
  })
})

// Configuración de Cypress para FindItAll
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorar errores específicos que no afectan la funcionalidad
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  // Retornar true causará que Cypress falle el test
  return true
})
