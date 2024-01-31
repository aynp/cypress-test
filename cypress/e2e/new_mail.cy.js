/// <reference types="Cypress" />

context('Send Mail', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr | fetch/ }, { log: false })
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('New mail', () => {
        cy.get('[data-testid="compose-btn"]').click();

        cy.get('.tokenizing-field-input').type(Cypress.env('email'))
        cy.get('.composer-subject > input').type("Hello World!")
        cy.get('.composer-editor').type("Hello World!")

        cy.get('.btn-send').click();

        cy.get('.undo-message-wrapper').should('contain.text', 'Message sent!')
    })

    afterEach('Logout', () => {
        cy.logout(Cypress.env('email'), Cypress.env('password'))
    })
})