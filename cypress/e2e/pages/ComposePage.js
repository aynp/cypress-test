class ComposePage {
    pageElements = {
        body: () => cy.get('body'),
        composeButton: () => cy.get('[data-testid="compose-btn"]'),
        flyout: () => cy.get('.flyout'),
        closeFlyout: () => cy.get('.flyout-titlebar-actions > :nth-child(3)'),
        sendMail: () => cy.get('.btn-send'),
        emailInput: () => cy.get('.tokenizing-field-input'),
        subjectInput: () => cy.get('.composer-subject > input'),
        editorInput: () => cy.get('.composer-editor'),
        sentToast: () => cy.get('.undo-message-wrapper')
    }
}

export const composePage = new ComposePage()