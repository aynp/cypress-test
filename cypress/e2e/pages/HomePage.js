export class HomePage {

    pageElements = {
        settingButton : () => cy.get('[data-testid="settings-icon-btn"]'),
        darkModeButton : () => cy.get('[data-testid="enable_disable_darkmode"]'),
        logedInEmail : () =>  cy.get('.email-address')    
    }

}

export const homePage = new HomePage()