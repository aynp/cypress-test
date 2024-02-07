/// <reference types="Cypress" />

import { composePage } from "./pages/ComposePage"

context('Keyboard Shortcuts', () => {
    beforeEach(() => {
        // disable logging for xhr and fetch requests
        cy.intercept({
            resourceType: /xhr | fetch/
        }, { log: false })

        // login 
        cy.login(Cypress.env('email'), Cypress.env('password'))

        // wait for the sidebar to load
        cy.get('.email-address')
    })

    it('New Message', () => {
        // check for c
        composePage.pageElements.body().type('c');
        composePage.pageElements.flyout().contains('New Mail');
        composePage.pageElements.closeFlyout().click();

        // check for d
        composePage.pageElements.body().type('d');
        composePage.pageElements.flyout().contains('New Mail');
        composePage.pageElements.closeFlyout().click();

        // check for n
        composePage.pageElements.body().type('n');
        composePage.pageElements.flyout().contains('New Mail');
        composePage.pageElements.closeFlyout().click();
    })

    afterEach(() => {
        // logout
        // cy.logout(Cypress.env('email'), Cypress.env('password'))
    })
})