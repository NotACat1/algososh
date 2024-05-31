import {
  DELAY_IN_MS as DELAY,
  colorDefault,
  colorChanging,
  colorModified,
  selectorInput,
  selectorAdd,
  selectorCircles,
  selectorCircleLetter,
} from './constants';

describe('String manipulation tests', () => {
  const maxLengthInput = 11;

  beforeEach(() => {
    cy.visit('#/recursion');

    cy.get(selectorInput).as('input');
    cy.get(selectorAdd).as('button');
  });

  it('should disable the add button when the input is empty', () => {
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('should enable the button when input length is equal to the maximum allowed length', () => {
    cy.get('@input').type('a'.repeat(maxLengthInput));
    cy.get('@button').should('not.be.disabled');
  });

  it('should enable the button when input length exceeds the maximum allowed length', () => {
    cy.get('@input').type('a'.repeat(maxLengthInput + 1));
    cy.get('@button').should('not.be.disabled');
  });

  it('should reverse the even string correctly with correct animations', () => {
    cy.clock();

    const inputString = 'abc';
    const reversedString = inputString.split('').reverse().join('');

    cy.get('@input').type(inputString);
    cy.get('@button').click();

    // Убедиться, что кнопка добавления отключена во время анимации
    cy.get('@button').should('be.disabled');

    cy.get(selectorCircles).as('circles');
    cy.get('@circles')
      .should('have.length', inputString.length)
      .each((circle, index) => {
        cy.wrap(circle)
          .find(selectorCircleLetter)
          .should('contain.text', inputString[index])
          .and('have.css', 'border-color', colorDefault);
      });

    cy.tick(DELAY);

    let start = 0;
    let end = inputString.length - 1;

    while (start <= end) {
      const indexStart = start;
      const indexEnd = end;

      cy.tick(DELAY);

      cy.get('@circles')
        .should('have.length', inputString.length)
        .each((circle, index) => {
          if (index < indexStart || index > indexEnd) {
            cy.wrap(circle)
              .find(selectorCircleLetter)
              .should('contain.text', reversedString[index])
              .and('have.css', 'border-color', colorModified);
          } else if (index == indexStart || index == indexEnd) {
            cy.wrap(circle)
              .find(selectorCircleLetter)
              .should('contain.text', inputString[index])
              .and('have.css', 'border-color', colorChanging);
          } else {
            cy.wrap(circle)
              .find(selectorCircleLetter)
              .should('contain.text', inputString[index])
              .and('have.css', 'border-color', colorDefault);
          }
        });

      cy.tick(DELAY);

      cy.get('@circles')
        .should('have.length', inputString.length)
        .each((circle, index) => {
          if (index <= indexStart || index >= indexEnd) {
            cy.wrap(circle)
              .find(selectorCircleLetter)
              .should('contain.text', reversedString[index])
              .and('have.css', 'border-color', colorModified);
          } else
            cy.wrap(circle)
              .find(selectorCircleLetter)
              .should('contain.text', inputString[index])
              .and('have.css', 'border-color', colorDefault);
        });

      start++;
      end--;
    }

    // Проверка конечного состояния
    cy.tick(DELAY);
    cy.get('@circles')
      .should('have.length', reversedString.length)
      .each((circle, index) => {
        cy.wrap(circle)
          .find(selectorCircleLetter)
          .should('contain.text', reversedString[index])
          .and('have.css', 'border-color', colorModified);
      });

    // Проверка инпута и кнопки в конце теста
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });
});
