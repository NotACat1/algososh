import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QueuePage from './queue-page';

describe('QueuePage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('the add button should be unavailable if the input is let', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <QueuePage />
      </BrowserRouter>,
    );

    // Проверяем, что кнопка добавления изначально недоступна
    const addButton = getByTestId('custom-add');
    expect(addButton).toBeDisabled();

    // Симулируем ввод пустой строки в инпут
    const inputElement = getByTestId('custom-input');
    fireEvent.change(inputElement, { target: { value: '' } });

    // Проверяем, что кнопка добавления остается недоступной
    expect(addButton).toBeDisabled();
  });

  test('there should be an add button available when entering text', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <QueuePage />
      </BrowserRouter>,
    );

    // Симулируем ввод текста в инпут
    const inputElement = getByTestId('custom-input');
    fireEvent.change(inputElement, { target: { value: 'Some text' } });

    // Проверяем, что кнопка добавления становится доступной
    const addButton = getByTestId('custom-add');
    expect(addButton).toBeEnabled();
  });
});
