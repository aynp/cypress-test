import { homePage } from "./pages/HomePage"

describe('Enable Dark Mode Test', () => {
    before('Login', () => {
        cy.visit('https://app.titan.email')
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Enable Dark Mode', () => {
        // Go to setting, Pick the current State of the mode, Click to change it
        homePage.pageElements.settingButton().click()
        homePage.pageElements.darkModeButton().invoke('attr', 'class').as('previousModeState')
        homePage.pageElements.darkModeButton().click()

        // Click on Setting Button, Check if the New Mode is different from the previous
        homePage.pageElements.settingButton().click()
        homePage.pageElements.darkModeButton().invoke('attr', 'class').as('newModeState').should('not.contain', '@previousModeState')
        
        // Change the Mode again, Recheck the change of mode
        homePage.pageElements.darkModeButton().click()
        homePage.pageElements.settingButton().click()
        homePage.pageElements.darkModeButton().invoke('attr', 'class').should('not.contain', '@newModeState')
    })

})