import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecursionPage from './recursion-page';

describe('RecursionPage component', () => {
  test('the add button is not available if the input is empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <RecursionPage />
      </BrowserRouter>,
    );
    const input = getByTestId('custom-input');
    const button = getByTestId('custom-button');

    expect(input).toHaveValue('');
    expect(button).toBeDisabled();
  });
});
