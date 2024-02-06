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
        // Store ThreadIds of First 'selectCount' Mails
        homePage.pageElements.selectFirstNMails(selectCount).each(($mail) => {
            cy.wrap($mail).invoke('attr', attrContainingMailId).then(($threadId) => {
                selectedMailsThreadIds.push($threadId)
            })
        })
        // Bulk select first 'selectCount' Mails
        homePage.pageElements.mailSelectCheckbox(selectCount).each(($mail) => {
            cy.wrap($mail).click()
        })

        // If the Button is 'Mark Read'
        homePage.pageElements.bulkReadUnreadButton().invoke('attr', 'class').then(($buttonClass) => {
            if($buttonClass == readButtonClass) {
                homePage.pageElements.bulkReadUnreadButton().click()
            }
        })
        // Wait for the Unread Counter to get updated
        cy.wait(3000)

        // Store the Unread Counter 
        let unreadMailCount
        homePage.pageElements.inboxUnreadCounter().invoke('text').then(($unreadCount) => {
            unreadMailCount = $unreadCount
        })

        homePage.pageElements.bulkReadUnreadButton().click()

        // Intercept the Mark Unread API and check 200 response, match the threadIds passed  
        cy.intercept('POST', markUnreadAPI).as('markUnreadAPI')
        cy.wait('@markUnreadAPI').then((interception) => {
            const threadIdsList = []
            for(const thread of JSON.parse(interception.request.body.reqs[0].p).ttxn) {
                threadIdsList.push(thread.tid)
            }
            expect(JSON.stringify(threadIdsList) == JSON.stringify(selectedMailsThreadIds)).to.equal(true)
        })

        // Check the new Unread Counter
        homePage.pageElements.inboxUnreadCounter().invoke('text').then(($newUnreadCount) => {
            expect(Number(unreadMailCount) + Number(selectCount)).to.equal(Number($newUnreadCount))
        })  
    })

    after('Logout', () => {
        cy.logout()
    })

})