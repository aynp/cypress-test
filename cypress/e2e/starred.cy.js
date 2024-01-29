/// <reference types="Cypress" />

context('Get Starred', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Get Starred', () => {
        cy.get('.selected-option', {
            timeout: 10000
        }).click();
        cy.get('.dropdown-options-container > :nth-child(3)').click();

        cy.get('.selected-option').contains('Starred')
    })
})
