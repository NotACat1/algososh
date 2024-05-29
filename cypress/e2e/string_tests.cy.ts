describe('String manipulation tests', () => {
  let animationDelay: number;
  let maxLengthInput: number;

  let colorDefault: string;
  let colorChanging: string;
  let colorModified: string;

  beforeEach(() => {
    cy.visit('#/recursion');

    cy.get('input#input').as('input');
    cy.get('button#add-button').as('button');

    animationDelay = 1000;
    maxLengthInput = 11;

    colorDefault = 'rgb(0, 50, 255)';
    colorChanging = 'rgb(210, 82, 225)';
    colorModified = 'rgb(127, 224, 81)';
  });

  //it('should disable the add button when the input is empty', () => {
  //  cy.get('@input').clear();
  //  cy.get('@button').should('be.disabled');
  //});

  //it('should enable the button when input length is equal to the maximum allowed length', () => {
  //  cy.get('@input').type('a'.repeat(maxLengthInput));
  //  cy.get('@button').should('not.be.disabled');
  //});

  //it('should enable the button when input length exceeds the maximum allowed length', () => {
  //  cy.get('@input').type('a'.repeat(maxLengthInput + 1));
  //  cy.get('@button').should('not.be.disabled');
  //});

  it('should reverse the even string correctly with correct animations', () => {
    cy.clock();

    const inputString = 'abcd';
    const reversedString = inputString.split('').reverse().join('');

    cy.get('@input').type(inputString);
    cy.get('@button').click();

    // Убедиться, что кнопка добавления отключена во время анимации
    cy.get('@button').should('be.disabled');

    cy.get('[data-test="circle"]').as('circles');
    cy.get('@circles')
      .should('have.length', inputString.length)
      .each((circle, index) => {
        cy.wrap(circle)
          .find('[data-test="circle-letter"]')
          .should('contain.text', inputString[index])
          .and('have.css', 'border-color', colorDefault);
      });

    cy.tick(animationDelay);

    let start = 0;
    let end = inputString.length - 1;

    while (start <= end) {
      const indexStart = start;
      const indexEnd = end;

      cy.tick(animationDelay);

      cy.get('[data-test="circle"]').as('circles');
      cy.get('@circles')
        .should('have.length', inputString.length)
        .each((circle, index) => {
          if (index < indexStart || index > indexEnd) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', reversedString[index])
              .and('have.css', 'border-color', colorModified);
          } else if (index == indexStart || index == indexEnd) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', inputString[index])
              .and('have.css', 'border-color', colorChanging);
          } else {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', inputString[index])
              .and('have.css', 'border-color', colorDefault);
          }
        });

      cy.tick(animationDelay);

      cy.get('[data-test="circle"]').as('circles');
      cy.get('@circles')
        .should('have.length', inputString.length)
        .each((circle, index) => {
          if (index < indexStart || index > indexEnd) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', reversedString[index])
              .and('have.css', 'border-color', colorModified);
          } else if (index == indexStart || index == indexEnd) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', reversedString[index])
              .and('have.css', 'border-color', colorModified);
          } else {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', inputString[index])
              .and('have.css', 'border-color', colorDefault);
          }
        });

      start++;
      end--;
    }

    // Проверка конечного состояния
    cy.tick(animationDelay);
    cy.get('@circles')
      .should('have.length', reversedString.length)
      .each((circle, index) => {
        cy.wrap(circle)
          .find('[data-test="circle-letter"]')
          .should('contain.text', reversedString[index])
          .and('have.css', 'border-color', colorModified);
      });

    // Проверка инпута и кнопки в конце теста
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('should reverse the odd string correctly with correct animations', () => {
    cy.clock();

    const inputString = 'abc';
    const reversedString = inputString.split('').reverse().join('');

    cy.get('@input').type(inputString);
    cy.get('@button').click();

    // Убедиться, что кнопка добавления отключена во время анимации
    cy.get('@button').should('be.disabled');

    cy.get('[data-test="circle"]').as('circles');
    cy.get('@circles')
      .should('have.length', inputString.length)
      .each((circle, index) => {
        cy.wrap(circle)
          .find('[data-test="circle-letter"]')
          .should('contain.text', inputString[index])
          .and('have.css', 'border-color', colorDefault);
      });

    cy.tick(animationDelay);

    let start = 0;
    let end = inputString.length - 1;

    while (start <= end) {
      const indexStart = start;
      const indexEnd = end;

      cy.tick(animationDelay);

      cy.get('[data-test="circle"]').as('circles');
      cy.get('@circles')
        .should('have.length', inputString.length)
        .each((circle, index) => {
          if (index < indexStart || index > indexEnd) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', reversedString[index])
              .and('have.css', 'border-color', colorModified);
          } else if (index == indexStart || index == indexEnd) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', inputString[index])
              .and('have.css', 'border-color', colorChanging);
          } else {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', inputString[index])
              .and('have.css', 'border-color', colorDefault);
          }
        });

      cy.tick(animationDelay);

      cy.get('[data-test="circle"]').as('circles');
      cy.get('@circles')
        .should('have.length', inputString.length)
        .each((circle, index) => {
          if (index < indexStart || index > indexEnd) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', reversedString[index])
              .and('have.css', 'border-color', colorModified);
          } else if (index == indexStart || index == indexEnd) {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', reversedString[index])
              .and('have.css', 'border-color', colorModified);
          } else {
            cy.wrap(circle)
              .find('[data-test="circle-letter"]')
              .should('contain.text', inputString[index])
              .and('have.css', 'border-color', colorDefault);
          }
        });

      start++;
      end--;
    }

    // Проверка конечного состояния
    cy.tick(animationDelay);
    cy.get('@circles')
      .should('have.length', reversedString.length)
      .each((circle, index) => {
        cy.wrap(circle)
          .find('[data-test="circle-letter"]')
          .should('contain.text', reversedString[index])
          .and('have.css', 'border-color', colorModified);
      });

    // Проверка инпута и кнопки в конце теста
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });
});
