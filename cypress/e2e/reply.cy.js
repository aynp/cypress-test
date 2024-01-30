/// <reference types="Cypress" />

context('Reply to Mail', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Reply to mail', () => {

    })

    afterEach('Logout', () => {
        cy.logout(Cypress.env('email'), Cypress.env('password'))
    })
})