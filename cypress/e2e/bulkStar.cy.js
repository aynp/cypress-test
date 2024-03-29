/// <reference types="Cypress" />

import { homePage } from "./pages/HomePage"

const selectCount = 5;
const attrContainingMailId = 'data-item-id'
const starredClass = "btn btn-toolbar btn-star starred"
const starApiUrl = "**/queue"

const selectedMailsThreadIds = [];

context('Bulk Operations', () => {
    beforeEach(() => {
        // disable logging for xhr and fetch requests
        cy.intercept({
            resourceType: /xhr | fetch/
        }, { log: false })

        // login 
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Mark Star', () => {
        // store thread ID of first 'selectCount' mails
        homePage.pageElements.selectFirstNMails(selectCount).each(($mail) => {
            cy.wrap($mail).invoke('attr', attrContainingMailId).then(($threadId) => {
                // store thread ID in 'selectedMailsThreadIds'
                selectedMailsThreadIds.push($threadId)
            })
        })

        // select first 'selectCount' mails
        homePage.pageElements.mailSelectCheckbox(selectCount).each(elem => cy.wrap(elem).click());

        // unstar all mails if all of them are starred already
        homePage.pageElements.starToggleButton().invoke('attr', 'class').then(($buttonClass) => {
            // if the button is starred all the mails are already starred, unstar them all
            if ($buttonClass == starredClass) {
                homePage.pageElements.starToggleButton().click()
            }
        })

        // star all emails
        homePage.pageElements.starToggleButton().click();

        // check toast message
        homePage.pageElements.toast().should('contain.text', `${selectCount} conversations starred`)

        // intercept API request and check if all the selected mails are bening sent
        cy.intercept('POST', starApiUrl).as('starApiUrl')
        cy.wait('@starApiUrl').then((interception) => {
            const threadsSentList = JSON.parse(interception.request.body.reqs[0].p).ttxn
            const threadIdsList = []
            for (const thread of threadsSentList) {
                threadIdsList.push(thread.tid)
            }
            expect(JSON.stringify(threadIdsList)).to.equal(JSON.stringify(selectedMailsThreadIds));
        })
    })

    afterEach(() => {
        // logout
        cy.logout(Cypress.env('email'), Cypress.env('password'))
    })
})