import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ListPage from './list-page';

describe('ListPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Add head button is disabled when input is empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListPage />
      </BrowserRouter>,
    );

    const addHeadButton = getByTestId('custom-add-head');
    const inputValue = getByTestId('custom-input-value');

    fireEvent.change(inputValue, { target: { value: '' } });

    expect(addHeadButton).toBeDisabled();
  });

  test('Add tail button is disabled when input is empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListPage />
      </BrowserRouter>,
    );

    const addTailButton = getByTestId('custom-add-tail');
    const inputValue = getByTestId('custom-input-value');

    fireEvent.change(inputValue, { target: { value: '' } });

    expect(addTailButton).toBeDisabled();
  });

  test('Add index button is disabled when input is empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListPage />
      </BrowserRouter>,
    );

    const addIndexButton = getByTestId('custom-add-index');
    const inputValue = getByTestId('custom-input-value');
    const inputIndex = getByTestId('custom-input-index');

    fireEvent.change(inputValue, { target: { value: '' } });
    fireEvent.change(inputIndex, { target: { value: '' } });

    expect(addIndexButton).toBeDisabled();
  });

  test('Add head button is enabled when input is not empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListPage />
      </BrowserRouter>,
    );

    const addHeadButton = getByTestId('custom-add-head');
    const inputValue = getByTestId('custom-input-value');

    fireEvent.change(inputValue, { target: { value: '1' } });

    expect(addHeadButton).toBeEnabled();
  });

  test('Add tail button is enabled when input is not empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListPage />
      </BrowserRouter>,
    );

    const addTailButton = getByTestId('custom-add-tail');
    const inputValue = getByTestId('custom-input-value');

    fireEvent.change(inputValue, { target: { value: '1' } });

    expect(addTailButton).toBeEnabled();
  });

  test('Add index button is enabled when input is not empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListPage />
      </BrowserRouter>,
    );

    const addIndexButton = getByTestId('custom-add-index');
    const inputValue = getByTestId('custom-input-value');
    const inputIndex = getByTestId('custom-input-index');

    fireEvent.change(inputValue, { target: { value: '1' } });
    fireEvent.change(inputIndex, { target: { value: '0' } });

    expect(addIndexButton).toBeEnabled();
  });
});
