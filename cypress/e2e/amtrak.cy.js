const { DateTime } = require('luxon')
import {
  setFromStation,
  setDepartureDate,
  setToStation,
  setReturnDate,
  searchForTrains,
  expectAmtrakError,
  expectFromStationSavedText,
  expectToStationSavedText,
} from '../support/functions'

describe('search for trains', function () {
  beforeEach(function () {
    cy.visit('https://www.amtrak.com/home.html')
    // sometimes the website shows cookie approval requests
    // cy.findByRole('button', { name: 'Allow All' }).click()
    // cy.findByRole('button', { name: 'close button' }).click()
  })
  it('should show the trip selection page', function () {
    const today = DateTime.now()
    const threeDaysFromNow = DateTime.now().plus({ days: 3 })
    const fromStation = 'NYP'
    const toStation = 'WAS'
    cy.configureCypressTestingLibrary({ testIdAttribute: 'amt-auto-test-id' })
    setFromStation(fromStation)
    setToStation(toStation)
    // amtrack has inconsistent behavior with buttons and incomplete test-ids
    // locators below will use accessibility locators with findByRole
    setDepartureDate(today.toLocaleString())
    setReturnDate(threeDaysFromNow.toLocaleString())
    searchForTrains()
    expectAmtrakError("We've experienced an unknown error.")
    cy.visit('https://www.amtrak.com/home.html')
    expectFromStationSavedText(fromStation)
    expectToStationSavedText(toStation)
  })
})
