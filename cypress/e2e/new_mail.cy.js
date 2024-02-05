/// <reference types="Cypress" />

import { composePage } from './pages/ComposePage'

context('Send Mail', () => {
    beforeEach(() => {
        cy.intercept({
            resourceType: /xhr | fetch/
        }, { log: false })
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('New mail', () => {
        cy.intercept({
            resourceType: /xhr | fetch/
        }, { log: false })

        composePage.pageElements.composeButton().click();
        composePage.pageElements.emailInput().type(Cypress.env('email'))
        composePage.pageElements.subjectInput().type("Hello World!")
        composePage.pageElements.editorInput().type("Hello World!")
        composePage.pageElements.sendMail().click();

        composePage.pageElements.sentToast().should('contain.text', 'Message sent!')
    })

    afterEach('Logout', () => {
        cy.logout(Cypress.env('email'), Cypress.env('password'))
    })
})