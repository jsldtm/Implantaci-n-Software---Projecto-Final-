// Comandos personalizados de Cypress para FindItAll
// Código por - Joaquín Saldarriaga

/// <reference types="cypress" />

/**
 * COMANDOS PERSONALIZADOS PARA FINDITALL
 * ======================================
 */

// Comando para login automatizado
Cypress.Commands.add('loginUser', (email: string, password: string) => {
  cy.visit('/loginportal')
  cy.get('input[type="email"], input[placeholder*="email"]').first().type(email)
  cy.get('input[type="password"], input[placeholder*="password"]').first().type(password)
  cy.get('button[type="submit"], button:contains("Login"), button:contains("Iniciar")').first().click()
})

// Comando para agregar producto al carrito
Cypress.Commands.add('addToCart', (productId: string, quantity: number = 1) => {
  cy.visit(`/productdetailedview?id=${productId}`)
  cy.get('input[type="number"], input[data-testid="quantity"]').first().clear().type(quantity.toString())
  cy.get('button:contains("Add"), button:contains("Agregar"), [data-testid="add-to-cart"]').first().click()
})

// Comando para verificar elementos de navegación
Cypress.Commands.add('verifyNavigation', () => {
  cy.get('[class*="sidebar"], [data-testid="sidebar"]').should('be.visible')
  cy.get('.flex').should('exist')
  cy.get('.h-screen').should('exist')
})

// Comando para verificar carga de página
Cypress.Commands.add('verifyPageLoad', (expectedUrl: string) => {
  cy.url().should('include', expectedUrl)
  cy.get('body').should('be.visible')
  cy.get('[class*="loading"], [data-testid="loading"]').should('not.exist')
})

// Comando para verificar elementos responsivos
Cypress.Commands.add('checkResponsive', () => {
  const viewports = [
    { width: 375, height: 667 },
    { width: 768, height: 1024 },
    { width: 1280, height: 720 }
  ]
  
  viewports.forEach(viewport => {
    cy.viewport(viewport.width, viewport.height)
    cy.get('body').should('be.visible')
    cy.wait(500) // Esperar a que se ajuste el layout
  })
})

// Declaraciones de TypeScript para los comandos personalizados
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando para login automatizado
       * @param email - Email del usuario
       * @param password - Contraseña del usuario
       */
      loginUser(email: string, password: string): Chainable<void>
      
      /**
       * Comando para agregar producto al carrito
       * @param productId - ID del producto
       * @param quantity - Cantidad a agregar (default: 1)
       */
      addToCart(productId: string, quantity?: number): Chainable<void>
      
      /**
       * Comando para verificar elementos de navegación
       */
      verifyNavigation(): Chainable<void>
      
      /**
       * Comando para verificar carga correcta de página
       * @param expectedUrl - URL esperada
       */
      verifyPageLoad(expectedUrl: string): Chainable<void>
      
      /**
       * Comando para verificar diseño responsivo
       */
      checkResponsive(): Chainable<void>
    }
  }
}
