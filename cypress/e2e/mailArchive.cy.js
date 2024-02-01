import { homePage } from "./pages/HomePage"

const attrContainingMailId = 'data-item-id'
const archiveToastMessage = ' Conversation moved to Archive'
const archiveAPIUrl = '**/queue'

describe('Mail Archive Test', () => {

    before('Login', () => {
        cy.login()
    })

    it('Archive Mail', () => {
        // Archive the first mail in Inbox and store it's ThreadId
        let archivedThreadId
        homePage.pageElements.firstInboxMail().invoke('attr', attrContainingMailId).then(($threadId) => {
            archivedThreadId = $threadId
        })  
        homePage.pageElements.firstInboxMail().click()
        homePage.pageElements.threadArchiveButton().click()
       
        // Validate toast message on clicking Archive button
        homePage.pageElements.archiveToast().should('have.text', archiveToastMessage)

        // Intercept the Queue request and validate request and response
        cy.intercept('POST', archiveAPIUrl).as('archiveMailQueueRequest')
        cy.wait('@archiveMailQueueRequest', {requestTimeout : 60000, responseTimeout : 60000}).then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(archivedThreadId).to.equal(JSON.parse(interception.request.body.reqs[0].p).ttxn[0].tid)
        })

    })

})