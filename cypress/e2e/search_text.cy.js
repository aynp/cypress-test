/// <reference types="Cypress" />

context('Search Mail', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Search Mail', () => {
        cy.get('[data-testid="search-box"]', {
            timeout: 10000
        }).type('Titan')
        cy.wait(100)
        cy.get('[data-testid="search-box"]').type('{enter}')
    })
})