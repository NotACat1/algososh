import {
  SHORT_DELAY_IN_MS as DELAY,
  colorDefault,
  colorChanging,
} from './constants';

describe('Queue manipulation tests', () => {
  const maxSize = 7;
  const maxLengthInput = 4;

  beforeEach(() => {
    cy.visit('#/queue');

    cy.get('input#input').as('input');
    cy.get('button#add-button').as('add-button');
    cy.get('button#remove-button').as('remove-button');
    cy.get('button#cleare-button').as('cleare-button');
  });

  it('should disable add button if input is empty', () => {
    cy.get('@input').clear();
    cy.get('@add-button').should('be.disabled');
  });

  it('should handle input with maximum allowed length', () => {
    cy.get('@input').type('a'.repeat(maxLengthInput));
    cy.get('@add-button').should('not.be.disabled');
  });

  it('should handle input exceeding maximum allowed length', () => {
    cy.get('@input').type('a'.repeat(maxLengthInput + 1));
    cy.get('@add-button').should('not.be.disabled');
  });

  it('should add element to the queue and verify animations and cursors', () => {
    cy.clock();

    const tests = new Array(maxSize).fill('1');

    tests.forEach((inputText, iteration, tests) => {
      cy.get('@input').type(inputText);
      cy.get('@add-button').click();

      cy.get('@add-button').should('be.disabled');

      cy.get('[data-test="circle"]').as('circles');
      cy.get('@circles')
        .should('have.length', maxSize)
        .each((circle, index) => {
          const isHead = index === 0 ? 'head' : '';
          const isTail = index === iteration ? 'tail' : '';
          const letter = index <= iteration ? tests[index] : '';
          const borderColor =
            index === iteration ? colorChanging : colorDefault;

          cy.wrap(circle)
            .find('[data-test="circle-head"]')
            .should('contain.text', isHead);

          cy.wrap(circle)
            .find('[data-test="circle-tail"]')
            .should('contain.text', isTail);

          cy.wrap(circle)
            .find('[data-test="circle-letter"]')
            .should('contain.text', letter)
            .should('have.css', 'border-color', borderColor);

          cy.wrap(circle)
            .find('[data-test="circle-index"]')
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);

      cy.get('@circles')
        .should('have.length', maxSize)
        .each((circle, index) => {
          const isHead = index === 0 ? 'head' : '';
          const isTail = index === iteration ? 'tail' : '';
          const letter = index <= iteration ? tests[index] : '';
          const borderColor = colorDefault;

          cy.wrap(circle)
            .find('[data-test="circle-head"]')
            .should('contain.text', isHead);

          cy.wrap(circle)
            .find('[data-test="circle-tail"]')
            .should('contain.text', isTail);

          cy.wrap(circle)
            .find('[data-test="circle-letter"]')
            .should('contain.text', letter)
            .should('have.css', 'border-color', borderColor);

          cy.wrap(circle)
            .find('[data-test="circle-index"]')
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);

      cy.get('@circles')
        .should('have.length', maxSize)
        .each((circle, index) => {
          const isHead = index === 0 ? 'head' : '';
          const isTail = index === iteration ? 'tail' : '';
          const letter = index <= iteration ? tests[index] : '';
          const borderColor = colorDefault;

          cy.wrap(circle)
            .find('[data-test="circle-head"]')
            .should('contain.text', isHead);

          cy.wrap(circle)
            .find('[data-test="circle-tail"]')
            .should('contain.text', isTail);

          cy.wrap(circle)
            .find('[data-test="circle-letter"]')
            .should('contain.text', letter)
            .should('have.css', 'border-color', borderColor);

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

  it('should delete element from the queue correctly', () => {
    cy.clock();

    const tests = new Array(maxSize).fill('1');

    tests.forEach(inputText => {
      cy.get('@input').type(inputText);
      cy.get('@add-button').click();
      cy.tick(2 * DELAY);
    });

    for (let iteration = 0; iteration < maxSize; iteration++) {
      cy.get('@remove-button').click();

      cy.get('@remove-button').should('be.disabled');

      cy.get('[data-test="circle"]').as('circles');
      cy.get('@circles')
        .should('have.length', maxSize)
        .each((circle, index) => {
          const isHead = index === iteration ? 'head' : '';
          const isTail = index === tests.length ? 'tail' : '';
          const letter = index >= iteration ? tests[index] : '';
          const borderColor =
            index === iteration ? colorChanging : colorDefault;

          cy.wrap(circle)
            .find('[data-test="circle-head"]')
            .should('contain.text', isHead);

          cy.wrap(circle)
            .find('[data-test="circle-tail"]')
            .should('contain.text', isTail);

          cy.wrap(circle)
            .find('[data-test="circle-letter"]')
            .should('contain.text', letter)
            .should('have.css', 'border-color', borderColor);

          cy.wrap(circle)
            .find('[data-test="circle-index"]')
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);

      cy.get('@circles')
        .should('have.length', maxSize)
        .each((circle, index) => {
          const isHead = index === iteration ? 'head' : '';
          const isTail = index === tests.length ? 'tail' : '';
          const letter = index > iteration ? tests[index] : '';
          const borderColor = colorDefault;

          cy.wrap(circle)
            .find('[data-test="circle-head"]')
            .should('contain.text', isHead);

          cy.wrap(circle)
            .find('[data-test="circle-tail"]')
            .should('contain.text', isTail);

          cy.wrap(circle)
            .find('[data-test="circle-letter"]')
            .should('contain.text', letter)
            .should('have.css', 'border-color', borderColor);

          cy.wrap(circle)
            .find('[data-test="circle-index"]')
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);
    }
  });

  it('should clear the queue when clear button is clicked', () => {
    cy.clock();

    const tests = new Array(maxSize).fill('1');

    tests.forEach(inputText => {
      cy.get('@input').type(inputText);
      cy.get('@add-button').click();
      cy.tick(2 * DELAY);
    });

    cy.get('@cleare-button').click();

    cy.get('@cleare-button').should('be.disabled');

    cy.get('[data-test="circle"]').as('circles');
    cy.get('@circles')
      .should('have.length', maxSize)
      .each((circle, index) => {
        const isHead = '';
        const isTail = '';
        const letter = '';
        const borderColor = colorDefault;

        cy.wrap(circle)
          .find('[data-test="circle-head"]')
          .should('contain.text', isHead);

        cy.wrap(circle)
          .find('[data-test="circle-tail"]')
          .should('contain.text', isTail);

        cy.wrap(circle)
          .find('[data-test="circle-letter"]')
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find('[data-test="circle-index"]')
          .should('contain.text', index.toString());
      });
  });
});
