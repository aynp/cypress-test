class ComposePage {
    pageElements = {
        composeButton: () => cy.get('[data-testid="compose-btn"]'),
        sendMail: () => cy.get('.btn-send'),
        emailInput: () => cy.get('.tokenizing-field-input'),
        subjectInput: () => cy.get('.composer-subject > input'),
        editorInput: () => cy.get('.composer-editor'),
        sentToast: () => cy.get('.undo-message-wrapper')
    }
}

export const composePage = new ComposePage()