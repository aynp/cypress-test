import { homePage } from "./pages/HomePage"

describe('Add Account Test', () => {

    before('Login', () => {
        cy.login()
    })

    it('Add New Account', () => {
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
    })

})