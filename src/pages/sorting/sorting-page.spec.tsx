import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SortingPage from './sorting-page';

describe('SortingPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Checks the change of the sorting method to a "Bubble"', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>,
    );

    const sortBobuleRadio = getByTestId('custom-sort-bobule');
    const sortSelectionRadio = getByTestId('custom-sort-selection');
    fireEvent.click(sortBobuleRadio);
    expect(sortBobuleRadio).toBeChecked();
    expect(sortSelectionRadio).not.toBeChecked();
  });

  test('Checks the change of the sorting method to "Selection"', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>,
    );

    const sortBobuleRadio = getByTestId('custom-sort-bobule');
    const sortSelectionRadio = getByTestId('custom-sort-selection');
    fireEvent.click(sortSelectionRadio);
    expect(sortBobuleRadio).not.toBeChecked();
    expect(sortSelectionRadio).toBeChecked();
  });
});
