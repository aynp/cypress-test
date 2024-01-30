describe('Enable Dark Mode Test', () => {
    before('Login', () => {
        Cypress.config('defaultCommandTimeout', 50000)
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Enable Dark Mode', () => {
        cy.get('[data-testid="settings-icon-btn"]').click()
        cy.get('[data-testid="enable_disable_darkmode"]').as('darkModeSwitch')

        // Fail if Dark Mode already enabled
        cy.get('@darkModeSwitch').invoke('attr', 'class').should('not.contain', 'item checked checkable', 'Failed as Dark Mode already enabled')
        cy.get('@darkModeSwitch').click()
        
        // Check if dark mode enabled
        cy.get('[data-testid="settings-icon-btn"]').click()
        cy.get('[data-testid="enable_disable_darkmode"]').invoke('attr', 'class').should('contain', 'item checked checkable')
    })

    after('Logout', () => {
        // logout
        cy.get('[data-testid="logout"]').click()
        cy.get('[data-testid="dialog-logout-btn"]').click()
    })
})