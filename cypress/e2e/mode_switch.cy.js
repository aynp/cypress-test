describe('Enable Dark Mode Test', () => {
    before('Login', () => {
        Cypress.config('defaultCommandTimeout', 50000)
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('Enable Dark Mode', () => {
       // Click Setting Button and pick Mode Switching Button
       cy.get('[data-testid="settings-icon-btn"]').click()
       cy.get('[data-testid="enable_disable_darkmode"]').as('darkModeSwitch')

       // Pick the current State of the mode and Click to change it
       cy.get('@darkModeSwitch').invoke('attr', 'class').as('previousModeState')
       cy.get('@darkModeSwitch').click()

       // Click on Setting Button and check if the New Mode is different from the previous
       cy.get('[data-testid="settings-icon-btn"]').click()
       cy.get('[data-testid="enable_disable_darkmode"]').invoke('attr', 'class').as('newModeState').should('not.contain', 'previousModeState')
       
       // Click the State again and Match
       cy.get('@darkModeSwitch').click()
       cy.get('[data-testid="settings-icon-btn"]').click()
       cy.get('@darkModeSwitch').invoke('attr', 'class').should('not.contain', '@newModeState')
    })

    after('Logout', () => {
        cy.logout(Cypress.env('email'), Cypress.env('password'))
    })
})