describe('template spec', function () {
  it('passes', function () {
    cy.visit('https://www.amtrak.com')
    cy.findByRole('combobox', { name: 'From' })
  })
})
