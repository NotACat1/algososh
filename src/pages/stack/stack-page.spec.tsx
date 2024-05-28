import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StackPage from './stack-page';

describe('StackPage Component', () => {
  test('The "Add" button is disabled if the input is empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StackPage />
      </BrowserRouter>,
    );

    // Найти кнопку "Добавить"
    const addButton = getByTestId('custom-add');

    // Убедиться, что кнопка "Добавить" отключена
    expect(addButton).toBeDisabled();
  });

  test('The "Add" button is enabled if the input is not empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StackPage />
      </BrowserRouter>,
    );

    // Найти инпут
    const input = getByTestId('custom-input');

    // Ввести значение в инпут
    fireEvent.change(input, { target: { value: 'test' } });

    // Найти кнопку "Добавить"
    const addButton = getByTestId('custom-add');

    // Убедиться, что кнопка "Добавить" включена
    expect(addButton).not.toBeDisabled();
  });
});
