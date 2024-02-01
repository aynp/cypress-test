import { homePage } from "./pages/HomePage"

const attrContainingMailId = 'data-item-id'
const archiveToastMessage = ' Conversation moved to Archive'
const archiveAPIUrl = 'https://api.flockmail.com/s/*/*/queue'

describe('Mail Archive Test', () => {

    before('Login', () => {
        cy.visit('https://app.titan.email')
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Archive Mail', () => {
        // Check if there are any mail to archive, If no email then fails
        homePage.pageElements.allMailsList().should('not.have.length', 0, 'No Mail present to archive')

        // Archive the first mail in Inbox and store it's ThreadId
        let archivedThreadId
        homePage.pageElements.allMailsList().eq(0).as('selectedEmail')
        cy.get('@selectedEmail').invoke('attr', attrContainingMailId).then(($threadId) => {
            archivedThreadId = $threadId
        })
        cy.get('@selectedEmail').click()
        homePage.pageElements.threadArchiveButton().click()

        // Validate toast message on clicking Archive button
        homePage.pageElements.archiveToast().should('have.text', archiveToastMessage)

        // Intercept the Queue request and validate request and response
        cy.intercept('POST', archiveAPIUrl).as('archiveMailQueueRequest')
        cy.wait('@archiveMailQueueRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)

            const requestThreadId = JSON.parse(interception.request.body.reqs[0].p).ttxn[0].tid
            expect(archivedThreadId).to.equal(requestThreadId)
        })
    })
})
