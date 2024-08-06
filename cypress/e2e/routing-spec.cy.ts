describe('Routing tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to String and check the content', () => {
    cy.get('a[href="#/recursion"]').click();
    cy.url().should('include', '#/recursion');
    cy.contains('Строка');
  });

  it('should navigate to The Fibonacci sequence and check the content', () => {
    cy.get('a[href="#/fibonacci"]').click();
    cy.url().should('include', '#/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  it('should navigate to Sorting and check the content', () => {
    cy.get('a[href="#/sorting"]').click();
    cy.url().should('include', '#/sorting');
    cy.contains('Сортировка массива');
  });

  it('should navigate to Stack and check the content', () => {
    cy.get('a[href="#/stack"]').click();
    cy.url().should('include', '#/stack');
    cy.contains('Стек');
  });

  it('should navigate to Queue and check the content', () => {
    cy.get('a[href="#/queue"]').click();
    cy.url().should('include', '#/queue');
    cy.contains('Очередь');
  });

  it('should navigate to List and check the content', () => {
    cy.get('a[href="#/list"]').click();
    cy.url().should('include', '#/list');
    cy.contains('Связный список');
  });
});
