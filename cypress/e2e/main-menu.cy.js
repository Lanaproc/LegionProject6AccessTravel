///<reference types = "Cypress"/>

describe('empty spec', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    // // returning false here prevents Cypress from 
    // // falling the test
    return false
  })

  it('navigate to main page', () => {
    cy.visit('https://www.accesstravel.com/en')
  })

  const hotels_tab = '[class="hotels"]';
  const guides_tab = '[class="guides js-list-guides"]';
  const tours_tab = '[class="tours js-list-tours"]';
  const things_to_do = '[class="tours attraction-link"]';
  const login_button = ':nth-child(3) > :nth-child(1) > a';
  const signup_button = '.mobile-menu > :nth-child(3) > :nth-child(2) > a';



  beforeEach(() => {
    cy.visit('https://www.accesstravel.com/en-US/Home/Index')
  })

  let my_url = 'https://www.accesstravel.com/en-US/Home/Index'

  it('navigate to the main page', () => {
    cy.visit(my_url)
    cy.url().should('eq', my_url)
  })

  it('verify tabs of the page', () => {
    cy.get(hotels_tab).should("be.visible")
    cy.get(guides_tab).should("be.visible")
    cy.get(tours_tab).should("be.visible")
    cy.get(things_to_do).should("be.visible")
  })

  it('navigate to the Hotes page', () => {
    cy.get(hotels_tab).click()
    cy.get('[class="sub-heading"]').invoke('text').should('eq', 'Find Your Inclusive Hotel!')
  })

  it('navigate to the Guides page', () => {
    cy.get(guides_tab).click()
    cy.get('h2').invoke('text').should('eq', ' Inclusive Travel Companions, Advisors and Guides')
  })

  it('navigate to the Tours page', () => {
    cy.get(tours_tab).click()
    cy.get('h2').invoke('text').should('eq', 'Discover amazing accessible to all tours and services ')
  })

  it('navigate to the Things To Do page', () => {
    cy.get(things_to_do).click()
    cy.get('[style="text-align:center;"]').invoke('text').should('eq', 'Universal Adventures')
  })

  it('navigate to the Login page', () => {
    cy.get(login_button).click({ force: true })
    cy.get('[class="login-headline"]').invoke('text').should('eq', 'Sign in')
  })

  it('navigate to the Signup page', () => {
    cy.get(signup_button).click({ force: true })
    cy.get('[class="registration-headline"]').invoke('text').should('eq', 'Registration')
  })

})

