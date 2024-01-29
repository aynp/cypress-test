/// <reference types="Cypress" />

context('Send Mail', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('New mail', () => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.wait(10000);
        cy.get('[data-testid="compose-btn"]', {
            timeout: 10000
        }).click();
        cy.get('.tokenizing-field-input').type(Cypress.env('email'))
        cy.get('.composer-subject > input').type("Hello World!")
        cy.get('.composer-editor').type("Hello World!")

        // cy.get('.btn-send').click();
    })
})