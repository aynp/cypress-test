import { homePage } from './pages/HomePage'
import { loginPage } from './pages/LoginPage'

context('Login', () => {

    before('Visit login page', () => {
        cy.visit('https://app.titan.email')
    })

    it('Check login', () => {
        loginPage.pageElements.emailInput().type(Cypress.env('email'))
        loginPage.pageElements.passwordInput().type(Cypress.env('password'))
        loginPage.pageElements.loginButton().click()    
        homePage.pageElements.logedInEmail().contains(Cypress.env('email'))
    })

})