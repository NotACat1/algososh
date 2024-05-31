import {
  DELAY_IN_MS as DELAY,
  colorDefault,
  colorChanging,
  colorModified,
  selectorInputValue,
  selectorInputIndex,
  selectorAddHead,
  selectorAddTail,
  selectorRemoveHead,
  selectorRemoveTail,
  selectorAddIndex,
  selectorRemoveIndex,
  selectorCirclesContainer,
  selectorCircles,
  selectorCircleLetter,
  selectorCircleIndex,
  selectorCircleHead,
  selectorCircleTail,
} from './constants';

describe('List manipulation tests', () => {
  const defaultData = ['0', '34', '8', '1'];

  beforeEach(() => {
    cy.visit('#/list');

    cy.get(selectorInputValue).as('input-value');
    cy.get(selectorInputIndex).as('input-index');

    cy.get(selectorAddHead).as('add-head');
    cy.get(selectorAddTail).as('add-tail');
    cy.get(selectorRemoveHead).as('remove-head');
    cy.get(selectorRemoveTail).as('remove-tail');

    cy.get(selectorAddIndex).as('add-index');
    cy.get(selectorRemoveIndex).as('remove-index');
  });

  it('Checks the unavailability of buttons with an empty input', () => {
    cy.get('@input-value').clear();

    cy.get('@add-head').should('be.disabled');
    cy.get('@add-tail').should('be.disabled');

    cy.get('@input-value').type('test');
    cy.get('@input-index').clear();

    cy.get('@add-index').should('be.disabled');
  });

  it('Checks the addition of an element to the head', () => {
    cy.clock();

    const inputTest = 'test';

    cy.get('@input-value').type(inputTest);
    cy.get('@add-head').click();

    cy.get('@add-head').should('be.disabled');

    cy.get(selectorCirclesContainer).children(selectorCircles).as('circles');

    cy.get('@circles')
      .should('have.length', defaultData.length)
      .each((circle, index) => {
        const isTail = index === defaultData.length ? 'tail' : '';
        const letter = defaultData[index];
        const borderColor = colorDefault;

        if (index == 0) {
          cy.wrap(circle)
            .children(selectorCircleHead)
            .children('[data-test="circle"]')
            .children(selectorCircleLetter)
            .should('have.css', 'border-color', colorChanging);
        } else {
          cy.wrap(circle).find(selectorCircleHead).should('contain.text', '');
        }

        cy.wrap(circle).find(selectorCircleTail).should('contain.text', isTail);

        cy.wrap(circle)
          .children(selectorCircleLetter)
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find(selectorCircleIndex)
          .should('contain.text', index.toString());
      });

    cy.tick(DELAY);

    cy.get('@circles')
      .should('have.length', defaultData.length + 1)
      .each((circle, index, list) => {
        const isHead = index === 0 ? 'head' : '';
        const isTail = index === list.length ? 'tail' : '';
        const letter = index === 0 ? inputTest : defaultData[index - 1];
        const borderColor = index === 0 ? colorModified : colorDefault;

        cy.wrap(circle).find(selectorCircleHead).should('contain.text', isHead);

        cy.wrap(circle).find(selectorCircleTail).should('contain.text', isTail);

        cy.wrap(circle)
          .children(selectorCircleLetter)
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find(selectorCircleIndex)
          .should('contain.text', index.toString());
      });

    cy.tick(DELAY);

    cy.get('@circles')
      .should('have.length', defaultData.length + 1)
      .each((circle, index, list) => {
        const isHead = index === 0 ? 'head' : '';
        const isTail = index === list.length ? 'tail' : '';
        const letter = index === 0 ? inputTest : defaultData[index - 1];
        const borderColor = colorDefault;

        cy.wrap(circle).find(selectorCircleHead).should('contain.text', isHead);

        cy.wrap(circle).find(selectorCircleTail).should('contain.text', isTail);

        cy.wrap(circle)
          .children(selectorCircleLetter)
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find(selectorCircleIndex)
          .should('contain.text', index.toString());
      });

    cy.tick(DELAY);

    // Проверка инпута и кнопки в конце теста
    cy.get('@input-value').should('have.value', '');
  });

  it('Checks the addition of an element to the tail', () => {
    cy.clock();

    const inputTest = 'test';

    cy.get('@input-value').type(inputTest);
    cy.get('@add-tail').click();

    cy.get('@add-tail').should('be.disabled');

    cy.get(selectorCirclesContainer).children(selectorCircles).as('circles');

    for (let iteration = 0; iteration < defaultData.length; iteration++) {
      cy.get('@circles')
        .should('have.length', defaultData.length)
        .each((circle, index, list) => {
          const isHead = index === 0 ? 'head' : '';
          const isTail = index === list.length ? 'tail' : '';
          const letter = defaultData[index];
          const borderColor = index <= iteration ? colorChanging : colorDefault;

          if (index == iteration) {
            cy.wrap(circle)
              .children(selectorCircleHead)
              .children('[data-test="circle"]')
              .children(selectorCircleLetter)
              .should('have.css', 'border-color', colorChanging)
              .should('contain.text', inputTest);
          } else {
            cy.wrap(circle)
              .children(selectorCircleHead)
              .should('contain.text', isHead);
          }

          cy.wrap(circle)
            .children(selectorCircleTail)
            .should('contain.text', isTail);

          cy.wrap(circle)
            .children(selectorCircleLetter)
            .should('contain.text', letter)
            .should('have.css', 'border-color', borderColor);

          cy.wrap(circle)
            .children(selectorCircleIndex)
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);
    }

    cy.get('@circles')
      .should('have.length', defaultData.length + 1)
      .each((circle, index, list) => {
        const isHead = index === 0 ? 'head' : '';
        const isTail = index === defaultData.length ? 'tail' : '';
        const letter =
          index === list.length - 1 ? inputTest : defaultData[index];
        const borderColor = colorDefault;

        cy.wrap(circle).find(selectorCircleHead).should('contain.text', isHead);

        cy.wrap(circle).find(selectorCircleTail).should('contain.text', isTail);

        cy.wrap(circle)
          .children(selectorCircleLetter)
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find(selectorCircleIndex)
          .should('contain.text', index.toString());
      });
  });

  it('Checks the addition of an element by index', () => {
    cy.clock();

    const inputValue = 'test';
    const inputIndex = 2;
    const newArray = [...defaultData];
    newArray.splice(inputIndex, 0, inputValue);

    cy.get('@input-value').type(inputValue);
    cy.get('@input-index').type(inputIndex.toString());
    cy.get('@add-index').click();

    cy.get('@add-index').should('be.disabled');

    cy.get(selectorCirclesContainer).children(selectorCircles).as('circles');

    for (let iteration = 0; iteration <= inputIndex; iteration++) {
      cy.get('@circles')
        .should('have.length', defaultData.length)
        .each((circle, index, list) => {
          const isHead = index === 0 ? 'head' : '';
          const isTail = index === list.length ? 'tail' : '';
          const letter = defaultData[index];
          const borderColor = index <= iteration ? colorChanging : colorDefault;

          if (index == iteration) {
            cy.wrap(circle)
              .children(selectorCircleHead)
              .children('[data-test="circle"]')
              .children(selectorCircleLetter)
              .should('have.css', 'border-color', colorChanging)
              .should('contain.text', inputValue);
          } else {
            cy.wrap(circle)
              .children(selectorCircleHead)
              .should('contain.text', isHead);
          }

          cy.wrap(circle)
            .children(selectorCircleTail)
            .should('contain.text', isTail);

          cy.wrap(circle)
            .children(selectorCircleLetter)
            .should('contain.text', letter)
            .should('have.css', 'border-color', borderColor);

          cy.wrap(circle)
            .children(selectorCircleIndex)
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);
    }

    cy.get('@circles')
      .should('have.length', defaultData.length + 1)
      .each((circle, index) => {
        const isHead = index === 0 ? 'head' : '';
        const isTail = index === defaultData.length ? 'tail' : '';
        const letter = newArray[index];
        const borderColor = colorDefault;

        cy.wrap(circle).find(selectorCircleHead).should('contain.text', isHead);

        cy.wrap(circle).find(selectorCircleTail).should('contain.text', isTail);

        cy.wrap(circle)
          .children(selectorCircleLetter)
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find(selectorCircleIndex)
          .should('contain.text', index.toString());
      });
  });

  it('Checks the deletion of an element from the head', () => {
    cy.clock();

    const newArray = [...defaultData];
    newArray.shift();

    cy.get('@remove-head').click();

    cy.get('@remove-head').should('be.disabled');

    cy.get(selectorCirclesContainer).children(selectorCircles).as('circles');

    cy.get('@circles')
      .should('have.length', defaultData.length)
      .each((circle, index) => {
        const isHead = index === 0 ? 'head' : '';
        const isTail = index === defaultData.length ? 'tail' : '';
        const letter = index === 0 ? '' : defaultData[index];
        const borderColor = colorDefault;

        cy.wrap(circle)
          .children(selectorCircleHead)
          .should('contain.text', isHead);

        if (index == 0) {
          cy.wrap(circle)
            .children(selectorCircleTail)
            .children('[data-test="circle"]')
            .children(selectorCircleLetter)
            .should('have.css', 'border-color', colorChanging)
            .should('contain.text', defaultData[index]);
        } else {
          cy.wrap(circle)
            .find(selectorCircleTail)
            .should('contain.text', isTail);
        }

        cy.wrap(circle)
          .children(selectorCircleLetter)
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find(selectorCircleIndex)
          .should('contain.text', index.toString());
      });

    cy.tick(DELAY);

    cy.get('@circles')
      .should('have.length', newArray.length)
      .each((circle, index) => {
        const isHead = index === 0 ? 'head' : '';
        const isTail = index === newArray.length ? 'tail' : '';
        const letter = newArray[index];
        const borderColor = colorDefault;

        cy.wrap(circle)
          .children(selectorCircleHead)
          .should('contain.text', isHead);

        cy.wrap(circle).find(selectorCircleTail).should('contain.text', isTail);

        cy.wrap(circle)
          .children(selectorCircleLetter)
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find(selectorCircleIndex)
          .should('contain.text', index.toString());
      });
  });

  it('Checks the removal of an element from the tail', () => {
    cy.clock();

    const newArray = [...defaultData];
    newArray.pop();

    cy.get('@remove-tail').click();

    cy.get('@remove-tail').should('be.disabled');

    cy.get(selectorCirclesContainer).children(selectorCircles).as('circles');

    cy.get('@circles')
      .should('have.length', defaultData.length)
      .each((circle, index) => {
        const isHead = index === 0 ? 'head' : '';
        const isTail = index === defaultData.length ? 'tail' : '';
        const letter =
          index === defaultData.length - 1 ? '' : defaultData[index];
        const borderColor = colorDefault;

        cy.wrap(circle)
          .children(selectorCircleHead)
          .should('contain.text', isHead);

        if (index == defaultData.length - 1) {
          cy.wrap(circle)
            .children(selectorCircleTail)
            .children('[data-test="circle"]')
            .children(selectorCircleLetter)
            .should('have.css', 'border-color', colorChanging)
            .should('contain.text', defaultData[index]);
        } else {
          cy.wrap(circle)
            .find(selectorCircleTail)
            .should('contain.text', isTail);
        }

        cy.wrap(circle)
          .children(selectorCircleLetter)
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find(selectorCircleIndex)
          .should('contain.text', index.toString());
      });

    cy.tick(DELAY);

    cy.get('@circles')
      .should('have.length', newArray.length)
      .each((circle, index) => {
        const isHead = index === 0 ? 'head' : '';
        const isTail = index === newArray.length ? 'tail' : '';
        const letter = newArray[index];
        const borderColor = colorDefault;

        cy.wrap(circle)
          .children(selectorCircleHead)
          .should('contain.text', isHead);

        cy.wrap(circle).find(selectorCircleTail).should('contain.text', isTail);

        cy.wrap(circle)
          .children(selectorCircleLetter)
          .should('contain.text', letter)
          .should('have.css', 'border-color', borderColor);

        cy.wrap(circle)
          .find(selectorCircleIndex)
          .should('contain.text', index.toString());
      });
  });

  it('Checks the deletion of an element by index', () => {
    cy.clock();

    const inputIndex = 2;
    const newArray = [...defaultData];
    newArray.splice(inputIndex, 1);

    cy.get('@input-index').type(inputIndex.toString());
    cy.get('@remove-index').click();

    cy.get('@remove-index').should('be.disabled');

    cy.get(selectorCirclesContainer).children(selectorCircles).as('circles');

    for (let iteration = 0; iteration <= inputIndex; iteration++) {
      cy.get('@circles')
        .should('have.length', defaultData.length)
        .each((circle, index, list) => {
          const isHead = index === 0 ? 'head' : '';
          const isTail = index === list.length ? 'tail' : '';
          const letter =
            iteration == inputIndex && index == iteration
              ? ''
              : defaultData[index];
          const borderColor = index <= iteration ? colorChanging : colorDefault;

          cy.wrap(circle)
            .children(selectorCircleHead)
            .should('contain.text', isHead);

          if (iteration == inputIndex && index == iteration) {
            cy.wrap(circle).children(selectorCircleTail);
            //.children('[data-test="circle"]')
            //.children(selectorCircleLetter)
            //.should('have.css', 'border-color', colorChanging)
            //.should('contain.text', defaultData[index]);
          } else {
            cy.wrap(circle)
              .children(selectorCircleTail)
              .should('contain.text', isTail);
          }

          cy.wrap(circle).children(selectorCircleLetter);
          //.should('contain.text', letter)
          //.should('have.css', 'border-color', borderColor);

          cy.wrap(circle)
            .children(selectorCircleIndex)
            .should('contain.text', index.toString());
        });

      cy.tick(DELAY);
    }
  });
});
