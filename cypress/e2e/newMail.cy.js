/// <reference types="Cypress" />

import { composePage } from './pages/ComposePage'

context('Send Mail', () => {
    beforeEach(() => {
        cy.intercept({
            resourceType: /xhr | fetch/
        }, { log: false })

        // login
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('New mail', () => {
        cy.intercept({
            resourceType: /xhr | fetch/
        }, { log: false })

        // click on the compose button
        composePage.pageElements.composeButton().click();

        // input reciever's email
        composePage.pageElements.emailInput().type(Cypress.env('email'))

        // input subject
        composePage.pageElements.subjectInput().type("Hello World!")

        // input body 
        composePage.pageElements.editorInput().type("Hello World!")

        // send mail
        composePage.pageElements.sendMail().click();

        // check popup
        composePage.pageElements.sentToast().should('contain.text', 'Message sent!')
    })

    afterEach('Logout', () => {
        // logout
        cy.logout(Cypress.env('email'), Cypress.env('password'))
    })
})