import { homePage } from "./pages/HomePage"
import { composePage } from "./pages/ComposePage"

const constants = {
    mailBody:'This is a testing email body !',
    sendAPI: '**/send',
}

describe('Add Account Test', () => {

    before('Login', () => {
        cy.login()
    })

    it('Add New Account', () => {
        constants.currentTimeMillis = Date.now()

        homePage.pageElements.addAccountButton().click()
        homePage.pageElements.addAccountEmailInput().type(Cypress.env('addAccountMail'))
        homePage.pageElements.addAccountPasswordInput().type(Cypress.env('addAccountMailPassword'))
        homePage.pageElements.addAccountLoginButton().click()
        // Wait for the account to get loaded on the Page
        cy.wait(4000)
        homePage.pageElements.addPasswordRecoveryEmailCloseButton().click()
        homePage.pageElements.userEmailHolder().last().invoke('text').then(($userEmail) => {
            expect($userEmail).to.equal(Cypress.env('addAccountMail'))
        })

        // Sending mail to logged In account
        composePage.pageElements.composeButton().click()
        composePage.pageElements.emailInput().type(Cypress.env('email') + '{enter}')
        composePage.pageElements.subjectInput().type(constants.currentTimeMillis)
        composePage.pageElements.editorInput().type(constants.mailBody)
        composePage.pageElements.sendMail().click();
        composePage.pageElements.sentToast().should('contain.text', 'Message sent!')

        // Checking if the mail is recieved
        homePage.pageElements.openInboxButton().first().click()
        homePage.pageElements.firstMailSubject().should('contain', constants.currentTimeMillis, {timeout: 80000})
    })

})