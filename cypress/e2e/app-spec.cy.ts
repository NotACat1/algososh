describe('Application health check', () => {
  it('should load the application', () => {
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ');
  });
});
