Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://app.titan.email/', {
        failOnStatusCode: false
    })
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('[data-testid="login-button"]').click()
})


Cypress.Commands.add('logout', (email, password) => {
    cy.get('[data-testid="settings-icon-btn"]').click()
    cy.get('[data-testid="logout"]').click()
    cy.get('[data-testid="dialog-logout-btn"]').click()
})