import {
  fareFinderFromStationTextbox,
  fareFinderToStationTextbox,
  departureDateTextbox,
  returnDateTextbox,
  returnDateButton,
  doneButton,
  findTrainsButton,
} from './locators'
// Interactions
const setFromStation = function (station) {
  fareFinderFromStationTextbox().type(station)
}
const setToStation = function (station) {
  fareFinderToStationTextbox().type(station)
}
const setDepartureDate = function (date) {
  departureDateTextbox().click()
  departureDateTextbox().type(date)
  doneButton().click()
}
const setReturnDate = function (date) {
  returnDateButton().click()
  returnDateTextbox().type(date)
  doneButton().click()
}
const searchForTrains = function () {
  // button is disabled when selecting dates
  // clicking too fast will someitmes not trigger a search
  findTrainsButton().should('be.enabled')
  findTrainsButton().click()
  findTrainsButton().click() // second click due to errors not showing up until a user actions has occured
}

// Assertion Functions
const expectAmtrakError = function (errorMessage) {
  cy.contains(errorMessage).should('be.visible')
}
const expectFromStationSavedText = function (expectedText) {
  fareFinderFromStationTextbox().should('contain.text', expectedText)
}
const expectToStationSavedText = function (expectedText) {
  fareFinderToStationTextbox().should('contain.text', expectedText)
}

export default {
  setFromStation,
  setToStation,
  setDepartureDate,
  setReturnDate,
  searchForTrains,
  expectAmtrakError,
  expectFromStationSavedText,
  expectToStationSavedText,
}
