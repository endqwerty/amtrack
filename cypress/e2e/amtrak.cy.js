describe('template spec', function () {
  it('passes', function () {
    cy.visit('/')
    cy.findByRole('combobox', { name: 'From' })
  })
})
