export class HomePage {

    pageElements = {
        settingButton : () => cy.get('[data-testid="settings-icon-btn"]'),
        darkModeButton : () => cy.get('[data-testid="enable_disable_darkmode"]'),
        logedInEmail : () =>  cy.get('.email-address'),
        allMailsList : () => cy.get('[data-item-id]'),
        firstInboxMail : () => cy.get('[class="list-rows pendo-Inbox-list"] > :nth-child(1)'),
        threadArchiveButton : () => cy.get('.thread-toolbar-button-outer[data-idx="0"]'),
        archiveSection : () => cy.get('#7'),
        archiveToast : () => cy.get('.undo-message-wrapper'),
        moreFolderButton : (config) => cy.get('.more-less-container is-collapsed add-account-sticky', config),
        searchPopupButton : () => cy.get('[class="btn btn-naked-secondary filter-toggle-btn"]'),
        mailSearchBar : () => cy.get('[data-testid="search-box"]'),
        bulkSelectCheckBoxUnselected : () => cy.get('[class="checkbox-wrapper bulk-select unselected"]'),
        bulkSelectCheckBoxSelected : () => cy.get('[class="checkbox-wrapper bulk-select selected"]'),
        bulkSelectCheckBoxDisabled : () => cy.get('[class="checkbox-wrapper bulk-select disabled"]'),
        bulkSelectionCountElement : () => cy.get('.bulk-selection-stack >.selection-count'),
        emptyMailListIndicator : () => cy.get('[class="perspective-empty-state"]'),
        messageItemArea : () => cy.get('[class="message-item-area"]')  
    }

}

export const homePage = new HomePage()