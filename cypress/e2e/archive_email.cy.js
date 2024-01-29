const { loginPageHelper } = require("../support/LoginPage/LoginPageHelper")

describe('Archive Mail', () => {

    before('Login', () => {
        cy.viewport(1080, 720);
        cy.openAppHomePage()
        loginPageHelper.processLogin('sachinp@titan.email', '')
    })

    it('Archive', () => {
        cy.wait(3000)

        // select mail to archive
        cy.get('[class="list-rows pendo-Inbox-list"]').then( mails => {
            cy.wrap(mails).find('div').eq(0).as('selectedEmail')
            cy.get('@selectedEmail').invoke('attr', 'data-item-id').as('mailId')
            cy.get('@selectedEmail').click()
        })
        
        cy.get('[class="message-item-area"]').eq(0).click()
        cy.get('[data-testid="thread-archive-btn"]').click()
        cy.wait(3000)

        cy.get('[class="flockmail-outline-view"]').find('[class="category-content"]').eq(3).click()
        
        cy.wait(3000)

        cy.get('[data-item-id]', {timeout : 8000}).eq(0).invoke('attr', 'data-item-id').as('current')

        cy.get('@current').then((currentValue) => {
            cy.get('@mailId').then((idValue) => {
              expect(currentValue).to.equal(idValue);
            });
          });

        // logout
        cy.get('[data-testid="settings-icon-btn"]').click()
        cy.get('[data-testid="logout"]').click()
        cy.get('[data-testid="dialog-logout-btn"]').click()
    })

})