Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://app.titan.email')
    cy.get('[data-testid="email-input"]').type(Cypress.env('email'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('password'))
    cy.get('[data-testid="login-button"]').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-testid="settings-icon-btn"]').click()
    cy.get('[data-testid="logout"]').click()
    cy.get('[data-testid="dialog-logout-btn"]').click()
})