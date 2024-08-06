import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button component', () => {
  test('renders button with text', () => {
    render(<Button text="Click me" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toMatchSnapshot();
  });

  test('renders button without text', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toMatchSnapshot();
  });

  test('renders disabled button', () => {
    render(<Button disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('renders loading indicator', () => {
    render(<Button isLoader />);
    const loaderIcon = screen.getByAltText('Загрузка.');
    expect(loaderIcon).toMatchSnapshot();
  });

  test('handles click event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
