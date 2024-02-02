import { homePage } from "./pages/HomePage"

const constants = {
    searchAPI: '**/search',
    getMailCountRegex: /(\d+)/
}

const parameters = {
    from: ['', 'sachinp@titan.email'],
    to: ['', 'sachinp@titan.email'],
    in: ['', 'Inbox', 'Archive', 'Spam'],
    is: ['', 'Unread', 'Starred']
}

const queries = []
     
describe('Search Mail Test', () => {

    beforeEach('Login', () => {
        cy.login()
    })

    it('Search', () => {
        for(const fromValue of parameters.from) {
            for(const toValue of parameters.to) {
                for(const inValue of parameters.in) {
                    for(const isValue of parameters.is) {
                        const query = formSearchQuery(fromValue, toValue, inValue, isValue)
                        queries.push(query)
                    }
                }
            }
        }
        searchMethod(queries.length-1)
    })

    function searchMethod(iterationNumber) {
        let totalMailsReceived
        homePage.pageElements.mailSearchBar().click()

        cy.intercept('POST', constants.searchAPI).as('mailSearchAPI_' + iterationNumber)
        homePage.pageElements.mailSearchBar().type(queries[iterationNumber])
       
        cy.wait('@mailSearchAPI_' + iterationNumber).then((interception) => {
            totalMailsReceived = interception.response.body.tc
        }).then(() => {
            if(totalMailsReceived == 0) {
                homePage.pageElements.emptyMailListIndicator().should('exist')
            }
            else {
                homePage.pageElements.bulkSelectCheckBox().click()
                homePage.pageElements.bulkSelectionCountElement().then(($text) => {
                    const mailsCount = parseInt($text.text().match(constants.getMailCountRegex)[0], 10)
                    expect(mailsCount).to.equal(totalMailsReceived)
                })
            }
        })
        
        homePage.pageElements.mailSearchBar().clear().then(() => {
            if(iterationNumber > 0) {
                searchMethod(iterationNumber-1)
            }
        })
    }

    function formSearchQuery(fromValue, toValue, inValue, isValue) {
        return 'from:"' + fromValue + '"to:"' + toValue + '"in:"' + inValue + '"is:"' + isValue + '" {enter}'
    }

})