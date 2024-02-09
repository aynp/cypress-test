import { composePage } from "../e2e/pages/ComposePage"

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

Cypress.Commands.add('sendMail', (recipients, subject, body) => {
    composePage.pageElements.composeButton().click()
    composePage.pageElements.emailInput().then(($emailInput) => {
        for(const recipient of recipients) {
            cy.wrap($emailInput).type(recipient + '{enter}')
        }
    })

    composePage.pageElements.subjectInput().type(subject)
    composePage.pageElements.editorInput().type(body)
    composePage.pageElements.sendMail().click()
})