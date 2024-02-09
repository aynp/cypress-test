/// <reference types="Cypress" />

import { composePage } from "./pages/ComposePage"
import { homePage } from "./pages/HomePage"

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
        homePage.pageElements.body().type('c');
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

    it('Search', () => {
        // check if / focuses the search bar
        homePage.pageElements.body().type('/');
        homePage.pageElements.mailSearchBar().should('be.focused');
    })

    it('Shortcuts list', () => {
        // check if ? opens Keyboard shortcut modal
        homePage.pageElements.body().type('?');
        homePage.pageElements.modal().contains('Keyboard shortcuts')

        // close the model to logout
        homePage.pageElements.modalCloseButton().click()
    })

    afterEach(() => {
        // logout
        cy.logout(Cypress.env('email'), Cypress.env('password'))
    })
})