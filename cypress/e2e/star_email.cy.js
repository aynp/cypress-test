describe('Mark Email Starred', () => {

    before('Login', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Mark Starred', () => {
        cy.wait(3000)

        // select mail to star
        cy.get('[class="list-rows pendo-Inbox-list"]').then(mails => {
            cy.wrap(mails).find('div').eq(0).as('selectedEmail')
            cy.get('@selectedEmail').invoke('attr', 'data-item-id').as('mailId')
            cy.get('@selectedEmail').click()
        })

        // click star button
        cy.get('[data-testid="thread-toggle-star-btn"]').as('starButton')
        cy.get('@starButton', { timeout: 5000 }).should('not.have.css', 'pointer-events', 'none')
        cy.get('@starButton').click()

        // let mailId = markStarredHelper.markStarred()
        console.log('mail id is : ' + cy.get('@mailId'))

        // click on drop-down and select starred option
        cy.get('[data-testid="all-mails"]').click()
        cy.get('[class="dropdown-options-container open-towards-bottom"]').find('div').eq(2).click()

        // click on the first email option and match it's id
        cy.get('[data-item-id]', { timeout: 5000 }).as('dataItemId')
        cy.get('@dataItemId').eq(0).invoke('attr', 'data-item-id').as('currentMailId')
        cy.get('@currentMailId').should('contain', '@mailId')

        // logout
        cy.get('[data-testid="settings-icon-btn"]').click()
        cy.get('[data-testid="logout"]').click()
        cy.get('[data-testid="dialog-logout-btn"]')
    })

})