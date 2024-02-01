export class HomePage {

    pageElements = {
        settingButton : () => cy.get('[data-testid="settings-icon-btn"]'),
        darkModeButton : () => cy.get('[data-testid="enable_disable_darkmode"]'),
        logedInEmail : () =>  cy.get('.email-address'),
        allMailsList : () => cy.get('[data-item-id]'),
        threadArchiveButton : () => cy.get('.thread-toolbar-button-outer[data-idx="0"]'),
        archiveSection : () => cy.get('#7'),
        archiveToast : () => cy.get('.undo-message-wrapper'),
        moreFolderButton : (config) => cy.get('.more-less-container is-collapsed add-account-sticky', config),
        messageItemArea : () => cy.get('[class="message-item-area"]')  
    }

}

export const homePage = new HomePage()