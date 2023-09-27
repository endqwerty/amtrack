const { DateTime } = require('luxon')

describe('search for trains', function () {
  beforeEach(function () {
    cy.visit('https://www.amtrak.com/home.html')
    // cy.findByRole('button', { name: 'Allow All' }).click()
    // cy.findByRole('button', { name: 'close button' }).click()
    cy.url().should('contain', '/home.html')
  })
  it('should show the trip selection page', function () {
    const today = DateTime.now()
    const threeDaysFromNow = DateTime.now().plus({ days: 3 })
    cy.configureCypressTestingLibrary({ testIdAttribute: 'amt-auto-test-id' })
    cy.findByTestId('fare-finder-from-station-field-page').type('NYP')
    cy.findByTestId('fare-finder-to-station-field-page').type('WAS')
    // amtrack has inconsistent behavior with buttons and incomplete test-ids
    // locators below will use accessibility locators with findByRole
    cy.findByRole('textbox', { name: 'Depart Date' }).click()
    cy.findByRole('textbox', { name: 'Depart Date' }).type(
      today.toLocaleString()
    )
    cy.findByRole('button', { name: 'Done' }).click()
    cy.findByRole('button', { name: 'Return Date' }).click()
    cy.findByRole('textbox', { name: 'Return Date' }).type(
      threeDaysFromNow.toLocaleString()
    )
    cy.findByRole('button', { name: 'Done' }).click()
    cy.findByRole('button', { name: 'FIND TRAINS' }).click()
    // cy.contains("We've experienced an unknown error.").should('be.visible')
    cy.visit('https://www.amtrak.com/home.html')
    cy.findByTestId('fare-finder-from-station-field-page').should(
      'contain.text',
      'NYP'
    )
    cy.findByTestId('fare-finder-to-station-field-page').should(
      'contain.text',
      'WAS'
    )
  })
})
