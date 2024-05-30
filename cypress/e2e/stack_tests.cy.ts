import {
  SHORT_DELAY_IN_MS as DELAY,
  colorDefault,
  colorChanging,
} from './constants';

describe('Stack manipulation tests', () => {
  beforeEach(() => {
    cy.visit('#/stack');

    cy.get('input#input').as('input');
    cy.get('button#add-button').as('add-button');
    cy.get('button#remove-button').as('remove-button');
    cy.get('button#cleare-button').as('cleare-button');
  });

  it('should disable the add button when the input is empty', () => {
    cy.get('@input').clear();
    cy.get('@add-button').should('be.disabled');
  });

  it('should enable the add button when the input is not empty', () => {
    cy.get('@input').type('test');
    cy.get('@add-button').should('not.be.disabled');
  });

  it('exceeding the limit input', () => {
    cy.get('@input').type('12345');
    cy.get('@add-button').should('not.be.disabled');
  });

  it('should add an element to the stack correctly', () => {
    cy.clock();

    const tests = ['1', '2', '3'];

    tests.forEach((inputText, iteration, tests) => {
      cy.get('@input').type(inputText);
      cy.get('@add-button').click();

      cy.get('@add-button').should('be.disabled');

      cy.get('[data-test="circle"]').as('circles');
      cy.get('@circles')
        .should('have.length', iteration + 1)
        .each((circle, index, list) => {
          if (index === list.length - 1) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', tests[index])
              .and('have.css', 'border-color', colorChanging);

            cy.wrap(circle)
              .find('[data-test="circle-head"]')
              .should('contain.text', 'top');
          } else {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', tests[index])
              .and('have.css', 'border-color', colorDefault);

            cy.wrap(circle)
              .find('[data-test="circle-head"]')
              .should('not.contain.text', 'top');
          }

          // Проверяем, что следующий элемент содержит правильный индекс
          cy.wrap(circle)
            .find('[data-test="circle-index"]')
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);

      cy.get('@circles')
        .should('have.length', iteration + 1)
        .each((circle, index, list) => {
          cy.wrap(circle)
            .find('[data-test="circle-letter"]')
            .should('contain.text', tests[index])
            .and('have.css', 'border-color', colorDefault);

          if (index === list.length - 1) {
            cy.wrap(circle)
              .find('[data-test="circle-head"]')
              .should('contain.text', 'top');
          } else {
            cy.wrap(circle)
              .find('[data-test="circle-head"]')
              .should('not.contain.text', 'top');
          }

          // Проверяем, что следующий элемент содержит правильный индекс
          cy.wrap(circle)
            .find('[data-test="circle-index"]')
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);
    });

    // Проверка инпута и кнопки в конце теста
    cy.get('@input').should('have.value', '');
    cy.get('@add-button').should('be.disabled');
  });

  it('should remove an element from the stack correctly', () => {
    cy.clock();

    const addData = ['1', '2'];

    addData.forEach(inputText => {
      cy.get('@input').type(inputText);
      cy.get('@add-button').click();
      cy.tick(2 * DELAY);
      cy.get('@remove-button').should('not.be.disabled');
    });

    for (let iteration = 1; iteration <= addData.length; iteration++) {
      cy.get('@remove-button').click();

      cy.get('[data-test="circle"]').as('circles');
      cy.get('@circles')
        .should('have.length', addData.length - (iteration - 1))
        .each((circle, index, list) => {
          if (index === list.length - 1) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', addData[index])
              .and('have.css', 'border-color', colorChanging);

            cy.wrap(circle)
              .find('[data-test="circle-head"]')
              .should('contain.text', 'top');
          } else {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', addData[index])
              .and('have.css', 'border-color', colorDefault);

            cy.wrap(circle)
              .find('[data-test="circle-head"]')
              .should('not.contain.text', 'top');
          }

          // Проверяем, что следующий элемент содержит правильный индекс
          cy.wrap(circle)
            .find('[data-test="circle-index"]')
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);
    }

    cy.tick(DELAY);
    cy.get('@circles').should('have.length', 0);

    cy.get('@remove-button').should('be.disabled');
  });

  it('should clear the stack when the clear button is pressed', () => {
    cy.clock();

    const addData = ['1', '2'];

    addData.forEach(inputText => {
      cy.get('@input').type(inputText);
      cy.get('@add-button').click();
      cy.tick(2 * DELAY);
      cy.get('@cleare-button').should('not.be.disabled');
    });

    cy.get('@cleare-button').click();
    cy.get('@cleare-button').should('be.disabled');
    cy.get('[data-test="circle"]').should('not.exist');

    cy.get('@cleare-button').should('be.disabled');
  });
});
