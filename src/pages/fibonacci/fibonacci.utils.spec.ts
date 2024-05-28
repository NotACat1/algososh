import { animate } from './fibonacci.utils';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';

describe('FibonacciPage animate function tests', () => {
  let setElementsArray: jest.Mock;

  beforeEach(() => {
    setElementsArray = jest.fn();
  });

  test('should update the elements array and call delay', async () => {
    await animate(0, 0, setElementsArray);

    expect(setElementsArray).toHaveBeenLastCalledWith([
      { content: '0', state: ElementStates.Default, key: expect.any(String) },
    ]);
  });

  test('should reverse a string with odd number of characters', async () => {
    await animate(5, 0, setElementsArray);

    expect(setElementsArray).toHaveBeenLastCalledWith([
      { content: '0', state: ElementStates.Default, key: expect.any(String) },
      { content: '1', state: ElementStates.Default, key: expect.any(String) },
      { content: '1', state: ElementStates.Default, key: expect.any(String) },
      { content: '2', state: ElementStates.Default, key: expect.any(String) },
      { content: '3', state: ElementStates.Default, key: expect.any(String) },
      { content: '5', state: ElementStates.Default, key: expect.any(String) },
    ]);
  });

  test('should handle a single character string', async () => {
    await animate(19, 0, setElementsArray);

    expect(setElementsArray).toHaveBeenLastCalledWith([
      { content: '0', state: ElementStates.Default, key: expect.any(String) },
      { content: '1', state: ElementStates.Default, key: expect.any(String) },
      { content: '1', state: ElementStates.Default, key: expect.any(String) },
      { content: '2', state: ElementStates.Default, key: expect.any(String) },
      { content: '3', state: ElementStates.Default, key: expect.any(String) },
      { content: '5', state: ElementStates.Default, key: expect.any(String) },
      { content: '8', state: ElementStates.Default, key: expect.any(String) },
      { content: '13', state: ElementStates.Default, key: expect.any(String) },
      { content: '21', state: ElementStates.Default, key: expect.any(String) },
      { content: '34', state: ElementStates.Default, key: expect.any(String) },
      { content: '55', state: ElementStates.Default, key: expect.any(String) },
      { content: '89', state: ElementStates.Default, key: expect.any(String) },
      { content: '144', state: ElementStates.Default, key: expect.any(String) },
      { content: '233', state: ElementStates.Default, key: expect.any(String) },
      { content: '377', state: ElementStates.Default, key: expect.any(String) },
      { content: '610', state: ElementStates.Default, key: expect.any(String) },
      { content: '987', state: ElementStates.Default, key: expect.any(String) },
      {
        content: '1597',
        state: ElementStates.Default,
        key: expect.any(String),
      },
      {
        content: '2584',
        state: ElementStates.Default,
        key: expect.any(String),
      },
      {
        content: '4181',
        state: ElementStates.Default,
        key: expect.any(String),
      },
    ]);
  });
});
