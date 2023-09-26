describe('template spec', function () {
  before(function () {
    cy.visit('/')
    cy.findByRole('button', { name: 'Allow All' }).click()
  })
  it('passes', function () {
    cy.findByRole('combobox', { name: 'From' })
  })
})
