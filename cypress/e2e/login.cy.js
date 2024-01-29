/// <reference types="Cypress" />

context('Login', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Check login', () => {
        cy.get('.email-address', {
            timeout: 10000
        }).contains(Cypress.env('email'))
    })
})