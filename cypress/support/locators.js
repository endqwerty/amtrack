const fareFinderFromStationTextbox = function () {
  return cy.findByTestId('fare-finder-from-station-field-page')
}
const fareFinderToStationTextbox = function () {
  return cy.findByTestId('fare-finder-to-station-field-page')
}
const departureDateTextbox = function () {
  return cy.findByRole('textbox', { name: 'Depart Date' })
}
const returnDateButton = function () {
  return cy.findByRole('button', { name: 'Return Date' })
}
const returnDateTextbox = function () {
  return cy.findByRole('textbox', { name: 'Return Date' })
}
const doneButton = function () {
  return cy.findByRole('button', { name: 'Done' })
}
const findTrainsButton = function () {
  return cy.findByRole('button', { name: 'FIND TRAINS' })
}

export default {
  fareFinderFromStationTextbox,
  fareFinderToStationTextbox,
  departureDateTextbox,
  returnDateTextbox,
  returnDateButton,
  doneButton,
  findTrainsButton,
}
