describe('Fibonacci manipulation tests', () => {
  let animationDelay: number;
  let fibonacciSequence: string[];

  beforeEach(() => {
    cy.visit('#/fibonacci');

    cy.get('input#input').as('input');
    cy.get('button#button').as('button');
    animationDelay = 500;
    fibonacciSequence = [
      '0',
      '1',
      '1',
      '2',
      '3',
      '5',
      '8',
      '13',
      '21',
      '34',
      '55',
      '89',
      '144',
      '233',
      '377',
      '610',
      '987',
      '1597',
      '2584',
      '4181',
      '6765',
    ];
  });

  it('should disable the add button when the input is empty', () => {
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('checking if the button is unavailable when entering a line of too long length', () => {
    cy.get('@input').type('20');
    cy.get('@button').should('be.disabled');
  });

  it('checking if the button is unavailable when entering a string of too short length', () => {
    cy.get('@input').type('-');
    cy.get('@button').should('be.disabled');
  });

  it('checking if the button is unavailable when entering a line', () => {
    cy.get('@input').type('abcd');
    cy.get('@button').should('be.disabled');
  });

  it('checking the animation when displaying the Fibonacci sequence', () => {
    cy.clock();

    const inputText = '19';
    cy.get('@input').type(inputText);
    cy.get('@button').click();

    for (let iteration = 1; iteration <= parseInt(inputText, 10); iteration++) {
      cy.get('[data-test="circle"]').as('circles');
      cy.get('@circles')
        .should('have.length', iteration)
        .each((circle, index) => {
          cy.wrap(circle.find('[data-test="circle-letter"]'))
            .should('contain.text', fibonacciSequence[index])
            .and('have.css', 'border-color', 'rgb(0, 50, 255)');

          cy.wrap(circle.find('[data-test="circle-index"]')).should(
            'contain.text',
            index,
          );
        });

      cy.tick(animationDelay);
    }
  });
});
