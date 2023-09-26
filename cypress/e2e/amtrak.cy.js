const { DateTime } = require('luxon')

describe('template spec', function () {
  beforeEach(function () {
    cy.visit('/home.html', {
      headers: {
        'user-agent':
          'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36',
      },
    })
    cy.findByRole('button', { name: 'Allow All' }).click()
    cy.findByRole('button', { name: 'close button' }).click()
    cy.url().should('contain', '/home.html')
  })
  it('passes', function () {
    const today = DateTime.now().plus({ days: 3 })
    const threeDaysFromNow = today.plus({ days: 3 })
    cy.configureCypressTestingLibrary({ testIdAttribute: 'amt-auto-test-id' })
    cy.findAllByTestId('fare-finder-from-station-field-page').type('NYP')
    cy.findAllByTestId('fare-finder-to-station-field-page').type('WAS')
    cy.findByRole('textbox', { name: 'Depart Date' }).click()
    cy.findByTestId('fare-finder-depart-date-oneway').type(
      today.toLocaleString()
    )
    cy.findByRole('button', { name: 'Done' }).click()
    cy.findByRole('button', { name: 'Return Date' }).click()
    cy.findByRole('textbox', { name: 'Return Date' }).type(
      threeDaysFromNow.toLocaleString()
    )
    cy.findByRole('button', { name: 'Done' }).click()
    cy.findByRole('button', { name: 'FIND TRAINS' }).click()
    cy.contains("We've experienced an unknown error.").should('be.visible')
  })
})
