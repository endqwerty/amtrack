const { DateTime } = require('luxon')

describe('search for flights', function () {
  beforeEach(function () {
    cy.visit('https://www.google.com/travel/flights')
    cy.title().should('contain', 'Google Flights')
  })
  it('should save the entered data', function () {
    const today = DateTime.now()
    const threeDaysFromNow = DateTime.now().plus({ days: 3 })
    cy.findByRole('search', { name: 'Flight' }).within(function () {
      cy.findAllByRole('combobox').eq(2).as('whereFrom')
      cy.findAllByRole('combobox').eq(3).as('whereTo')
      cy.get('@whereFrom').click()
      cy.findAllByRole('dialog', { name: /Enter your origin/ }).should(
        'be.visible'
      )
      cy.findAllByRole('combobox', { name: /Where else/ }).clear()
      cy.findAllByRole('combobox', { name: /Where else/ }).type('Seattle')
      cy.findByRole('option', { name: 'Seattle, Washington' }).should(
        'be.visible'
      )
      cy.findByRole('option', { name: 'Seattle, Washington' }).click()
      cy.get('@whereTo').click()
      cy.findAllByRole('dialog', { name: /Enter your destination/ }).should(
        'be.visible'
      )
      cy.findAllByRole('combobox', { name: /Where else/ }).type('Tokyo')
      cy.findByRole('option', { name: 'Tokyo, Japan' }).should('be.visible')
      cy.findByRole('option', { name: 'Tokyo, Japan' }).click()
      cy.findByRole('textbox', { name: 'Departure' }).click()
      cy.findByRole('textbox', { name: 'Departure' }).type(
        `${today.toLocaleString({
          weekday: 'short',
          month: 'short',
          day: '2-digit',
        })}{enter}`
      )
      cy.findByRole('textbox', { name: 'Return' }).click()
      cy.findByRole('textbox', { name: 'Return' }).type(
        `${threeDaysFromNow.toLocaleString({
          weekday: 'short',
          month: 'short',
          day: '2-digit',
        })}{enter}`
      )
      cy.findByRole('button', { name: /Done/ }).should('be.enabled')
      cy.findByRole('button', { name: /Done/ }).click()
      cy.findByRole('button', { name: /Search/ }).click()
    })
    cy.contains('Best departing flights').should('be.visible')
    cy.go('back')
    cy.findByRole('search', { name: 'Flight' }).within(function () {
      cy.findAllByRole('combobox').eq(2).as('whereFrom')
      cy.findAllByRole('combobox').eq(3).as('whereTo')
      cy.get('@whereFrom').should('contain.value', 'Seattle')
      cy.get('@whereTo').should('contain.value', 'Tokyo')
    })
  })
})
