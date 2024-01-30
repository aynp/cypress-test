describe('Archive Mail', () => {

    before('Login', () => {
        Cypress.config('defaultCommandTimeout', 50000)
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Archive', () => {
        // Select mail to archive and store it's Id
        cy.get('[class="list-rows pendo-Inbox-list"]').then( mails => {
            cy.wrap(mails).find('div').eq(0).as('selectedEmail')
            cy.get('@selectedEmail').invoke('attr', 'data-item-id').as('mailId')
            cy.get('@selectedEmail').click()
        })
        
        // Click on archive button
        cy.get('[class="message-item-area"]').eq(0).click()
        cy.get('[data-testid="thread-archive-btn"]').click()

        // Go to archive section
        cy.get('[class="flockmail-outline-view"]').find('[class="category-content"]').eq(3).click()

        // Find the Id of the Email archived
        cy.get('[data-item-id]').eq(0).invoke('attr', 'data-item-id').as('current')

        // Match the Id's of both the mails
        cy.get('@current').then((currentValue) => {
            cy.get('@mailId').then((idValue) => {
              expect(currentValue).to.equal(idValue);
            });
        });
    })

    after('Logout', () => {
        // logout
        cy.get('[data-testid="settings-icon-btn"]').click()
        cy.get('[data-testid="logout"]').click()
        cy.get('[data-testid="dialog-logout-btn"]').click()
    })

})