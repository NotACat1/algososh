import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FibonacciPage from './fibonacci-page';

describe('FibonacciPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input and button initially', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <FibonacciPage />
      </BrowserRouter>,
    );

    expect(getByTestId('custom-input')).toBeInTheDocument();
    expect(getByTestId('custom-button')).toBeInTheDocument();
  });

  test('button is disabled when input is empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <FibonacciPage />
      </BrowserRouter>,
    );

    const button = getByTestId('custom-button');
    expect(button).toBeDisabled();
  });

  test('button is disabled when input is out of range', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <FibonacciPage />
      </BrowserRouter>,
    );

    const input = getByTestId('custom-input');
    fireEvent.change(input, { target: { value: '20' } });

    const button = getByTestId('custom-button');
    expect(button).toBeDisabled();
  });

  test('button is enabled when input is valid', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <FibonacciPage />
      </BrowserRouter>,
    );

    const input = getByTestId('custom-input');
    fireEvent.change(input, { target: { value: '5' } });

    const button = getByTestId('custom-button');
    expect(button).toBeEnabled();
  });
});
