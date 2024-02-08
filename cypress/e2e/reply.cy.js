import { composePage } from "./pages/ComposePage"
import { homePage } from "./pages/HomePage"

const constants = {
    replyRecipient: [Cypress.env('email')],
    replyAllRecipients: [Cypress.env('email'), Cypress.env('addAccountMail')],
    sendMailBody: 'This is test mail!',
    sendMailAPI: '**/send',
    senderEmail: []
}

describe('Mail Reply Test', () => {

    beforeEach('login', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('reply to mail', () => {
        constants.sendMailSubject = Date.now()
        cy.sendMail(constants.replyRecipient, constants.sendMailSubject, constants.sendMailBody)

        // Open the mail received
        homePage.pageElements.firstMailSubject().should('contain', constants.sendMailSubject, {timeout: 80000})
        homePage.pageElements.firstInboxMail().click()

        cy.wait(4000)

        // Pick the senders of Mail
        homePage.pageElements.recipientToggleButton().click({force: true})
        homePage.pageElements.senderEmail().then(($senderEmail) => {
            constants.senderEmail.push($senderEmail.text())
        })
        
        // Reply to the Mail
        homePage.pageElements.mailPrimaryItemButton().click()
        composePage.pageElements.editorInput().type(constants.sendMailBody)
        cy.intercept('POST', constants.sendMailAPI).as('sendMailAPI')
        homePage.pageElements.replySendButton().click()
        homePage.pageElements.sentToast().should('contain.text', 'Message sent!')

        // Check the Reply mail API response and match the to field of request body
        cy.wait('@sendMailAPI').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            const sendToMails = interception.request.body.to.map((elem) => { return elem.email })
            expect(JSON.stringify(constants.senderEmail)).to.equal(JSON.stringify(sendToMails))
        })
    })

    it('reply all to mail', () => {
        constants.sendMailSubject = Date.now()
        cy.sendMail(constants.replyAllRecipients, constants.sendMailSubject, constants.sendMailBody)

        // Open the mail received
        homePage.pageElements.firstMailSubject().should('contain', constants.sendMailSubject, {timeout: 80000})
        homePage.pageElements.firstInboxMail().click()

        cy.wait(4000)

        // Pick the senders of Mail
        homePage.pageElements.recipientToggleButton().click({force: true})

        // Reply to the Mail
        homePage.pageElements.mailPrimaryItemButton().click()
        composePage.pageElements.editorInput().type(constants.sendMailBody)
        cy.intercept('POST', constants.sendMailAPI).as('sendMailAPI')
        homePage.pageElements.replySendButton().click()
        homePage.pageElements.sentToast().should('contain.text', 'Message sent!')

        // Check the Reply mail API response
        cy.wait('@sendMailAPI').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

    it('reply when reply all present', () => {
        constants.sendMailSubject = Date.now()
        cy.sendMail(constants.replyAllRecipients, constants.sendMailSubject, constants.sendMailBody)

        // Open the mail received
        homePage.pageElements.firstMailSubject().should('contain', constants.sendMailSubject, {timeout: 80000})
        homePage.pageElements.firstInboxMail().click()

        cy.wait(4000)

        // Pick the senders of Mail
        homePage.pageElements.recipientToggleButton().click({force: true})

        // Reply to the Mail
        homePage.pageElements.mailMoreOptions().click()
        homePage.pageElements.moreOptionsReplyButton().click()
        composePage.pageElements.editorInput().type(constants.sendMailBody)
        cy.intercept('POST', constants.sendMailAPI).as('sendMailAPI')
        homePage.pageElements.replySendButton().click()
        homePage.pageElements.sentToast().should('contain.text', 'Message sent!')

        // Check the Reply mail API response
        cy.wait('@sendMailAPI').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });

})