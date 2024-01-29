Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://app.titan.email/', {
        failOnStatusCode: false
    })
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('[data-testid="login-button"]').click()
})
