import { homePage } from "./pages/HomePage"

const attrContainingMailId = 'data-item-id'
const readButtonClass = 'btn btn-toolbar btn-read'
const markUnreadAPI = '**/queue'
const selectCount = 5
const selectedMailsThreadIds = []

describe('Bulk Mark Unread', () => {

    before('Login', () => {
        cy.login()
    })

    it('Bulk Mark Email Unread', () => {
        homePage.pageElements.selectFirstNMails(selectCount).each(($mail) => {
            cy.wrap($mail).invoke('attr', attrContainingMailId).then(($threadId) => {
                selectedMailsThreadIds.push($threadId)
            })
        })
        homePage.pageElements.mailSelectCheckbox(selectCount).each(($mail) => {
            cy.wrap($mail).click()
        })
        homePage.pageElements.bulkReadUnreadButton().invoke('attr', 'class').then(($buttonClass) => {
            if($buttonClass == readButtonClass) {
                homePage.pageElements.bulkReadUnreadButton().click()
            }
        })
        homePage.pageElements.bulkReadUnreadButton().click()

        cy.intercept('POST', markUnreadAPI).as('markUnreadAPI')
        cy.wait('@markUnreadAPI').then((interception) => {
            const threadsSentList = JSON.parse(interception.request.body.reqs[0].p).ttxn
            const threadIdsList = []
            for(const thread of threadsSentList) {
                threadIdsList.push(thread.tid)
            }
            const areMatching = (JSON.stringify(threadIdsList) == JSON.stringify(selectedMailsThreadIds))
            expect(areMatching).to.equal(true)
        })
    })

    after('Logout', () => {
        cy.logout()
    })

})