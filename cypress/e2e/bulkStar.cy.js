/// <reference types="Cypress" />

import { homePage } from "./pages/HomePage"

const selectCount = 5;
const attrContainingMailId = 'data-item-id'
const starredClass = "btn btn-toolbar btn-star starred"
const starApiUrl = "**/queue"

const selectedMailsThreadIds = [];

context('Bulk Operations', () => {
    beforeEach(() => {
        cy.intercept({
            resourceType: /xhr | fetch/
        }, { log: false })
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Mark Star', () => {
        homePage.pageElements.selectFirstNMails(selectCount).each(($mail) => {
            cy.wrap($mail).invoke('attr', attrContainingMailId).then(($threadId) => {
                selectedMailsThreadIds.push($threadId)
            })
        })

        homePage.pageElements.mailSelectCheckbox(selectCount).each(elem => cy.wrap(elem).click());

        // unstar all mails if any of them are starred already
        homePage.pageElements.starToggleButton().invoke('attr', 'class').then(($buttonClass) => {
            if ($buttonClass == starredClass) {
                homePage.pageElements.starToggleButton().click()
            }
        })

        // star all emails
        homePage.pageElements.starToggleButton().click();

        homePage.pageElements.toast().should('contain.text', `${selectCount} conversations starred`)

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

    afterEach('Logout', () => {
        cy.logout(Cypress.env('email'), Cypress.env('password'))
    })
})