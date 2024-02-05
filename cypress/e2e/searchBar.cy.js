import { homePage } from "./pages/HomePage"

const constants = {
    searchAPI: '**/search',
    getMailCountRegex: /(\d+)/,
}

const parameters = {
   fromInboxQuery: `from:"${Cypress.env('fromEmail')}" in:"Inbox" {enter}`,
   toInboxQuery: `to:"${Cypress.env('toEmail')}" in:"Inbox" {enter}`,
   fromInboxStarredQuery: `to:"${Cypress.env('toEmail')}" in:"Spam" {enter}`
}
     
describe('Search Mail Test', () => {

    beforeEach('Login', () => {
        cy.login()
    })

    it('Inbox From', () => {
        performSearchTest(parameters.fromInboxQuery)
    })

    it('Inbox To', () => {
        performSearchTest(parameters.toInboxQuery)
    })

    it('Spam From', () => {
        performSearchTest(parameters.fromInboxStarredQuery)
    })

    afterEach('Logout', () => {
        cy.logout()
    })

    function performSearchTest(searchQuery) {
        homePage.pageElements.mailSearchBar().click()
        homePage.pageElements.mailSearchBar().type(searchQuery)

        cy.intercept('POST', constants.searchAPI).as('mailSearchAPI')
       
        cy.wait('@mailSearchAPI').then((interception) => {
            constants.totalMailsReceived = interception.response.body.tc
        }).then(() => {
            if(constants.totalMailsReceived == 0) {
                homePage.pageElements.bulkSelectCheckBoxDisabled().should('exist')
            }
            else {
                homePage.pageElements.bulkSelectCheckBoxUnselected().click()
                homePage.pageElements.bulkSelectionCountElement().then(($text) => {
                    const mailsCount = parseInt($text.text().match(constants.getMailCountRegex)[0], 10)
                    expect(mailsCount).to.equal(constants.totalMailsReceived)
                })
            }
        })
    }

})