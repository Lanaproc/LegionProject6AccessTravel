///<reference types = "Cypress"/>

describe('empty spec', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        // // returning false here prevents Cypress from 
        // // falling the test
        return false
    })

    const checkin = '[name="Filter.CheckIn"]';
    const checkout = '[name="Filter.CheckOut"]';
    const adults = '[name="Filter.AdultNum"]';


    let hotel_page_url = 'https://www.accesstravel.com/en-US/Hotel/List'

    it('navigate to the hotel page', () => {
        cy.visit(hotel_page_url)
        cy.url().should('eq', hotel_page_url)
    })

    it('choosing valid cities', () => {
        cy.visit(hotel_page_url)
        cy.get('#Filter_DestinationId').should('be.visible')
        cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
        cy.get('#Filter_DestinationId').select('London').invoke("val").should('eq', '31')
        cy.get('#Filter_DestinationId').select('New York').invoke("val").should('eq', '51')
        cy.get('.form-centered > .btn').click()
    })

    it('choosing a valid number of children', () => {
        cy.visit(hotel_page_url)
        cy.get('#Filter_ChildrenNum').should('be.visible')
        cy.get('#Filter_ChildrenNum').clear().type('2').should('have.value', '2', { force: true })
        cy.get('#Filter_ChildrenNum').clear().type('5').should('have.value', '5', { force: true })
        cy.get('#Filter_ChildrenNum').clear().type('17').should('have.value', '17', { force: true })
        cy.get('.form-centered > .btn').click()
        
    })

    it('choosing a valid age for children', () => {
        cy.visit(hotel_page_url)
        cy.get('#Filter_ChildrenNum').clear().type('3').should('have.value', '3', { force: true })
        cy.get('.hotels-wrap').click()
        cy.get('[class="row children-age"]').should('be.visible')
        cy.get('[name="Filter.ChildrensAge[0]').clear().type('1', { force: true })
        cy.get('[name="Filter.ChildrensAge[1]').clear().type('9', { force: true })
        cy.get('[name="Filter.ChildrensAge[2]').clear().type('17', { force: true })
        cy.get('.form-centered > .btn').click()
    })
    it('negative test: invalid dates', () => {
        cy.visit(hotel_page_url)
        cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
        cy.get(adults).clear().type('2').should('have.value', "2", { force: true })
        cy.get(checkin).clear()
        cy.get(checkin).type("2023-02-08").invoke('val').should('eq', "2023-02-08")
        cy.get(checkout).clear()
        cy.get(checkout).type("2023-03-27").invoke('val').should('eq', "2023-03-27")
        cy.get('.form-centered > .btn').click()
    })

    it('negative test: negative number of adults ', () => {
        cy.visit(hotel_page_url)
        cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
        cy.get(checkin).clear()
        cy.get(checkin).type("2024-04-06").invoke('val').should('eq', "2024-04-06")
        cy.get(checkout).clear()
        cy.get(checkout).type("2024-04-07").invoke('val').should('eq', "2024-04-07")
        cy.get(adults).clear()
        cy.get(adults).type("-5").invoke('val').should('eq', "-5")
        cy.get('.form-centered > .btn').click()
    })

    it('negative test: invalid number of adults ', () => {
        cy.visit(hotel_page_url)
        cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
        cy.get(checkin).clear()
        cy.get(checkin).type("2024-04-06").invoke('val').should('eq', "2024-04-06")
        cy.get(checkout).clear()
        cy.get(checkout).type("2024-04-07").invoke('val').should('eq', "2024-04-07")
        cy.get(adults).clear()
        cy.get(adults).type("10").invoke('val').should('eq', "10")
        cy.get('.form-centered > .btn').click()
    })

    it('negative test: invalid number of children ', () => {
        cy.visit(hotel_page_url)
        cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
        cy.get(checkin).clear()
        cy.get(checkin).type("2024-04-06").invoke('val').should('eq', "2024-04-06")
        cy.get(checkout).clear()
        cy.get(checkout).type("2024-04-07").invoke('val').should('eq', "2024-04-07")
        cy.get('#Filter_ChildrenNum').clear({force: true}).type('11').should('have.value', '11', {force: true})
        cy.get('.form-centered > .btn').click()
    })
})