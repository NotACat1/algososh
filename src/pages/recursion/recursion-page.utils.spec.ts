import { animate } from './recursion-page.utils';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';

describe('RecursionPage animate', () => {
  let setElementsArray: jest.Mock;

  beforeEach(() => {
    setElementsArray = jest.fn();
  });

  test('should reverse a string with even number of characters', async () => {
    const array: IElementArray[] = [
      { content: 'a', state: ElementStates.Default, key: '0' },
      { content: 'b', state: ElementStates.Default, key: '1' },
      { content: 'c', state: ElementStates.Default, key: '2' },
      { content: 'd', state: ElementStates.Default, key: '3' },
    ];

    await animate(array, 0, setElementsArray);

    expect(setElementsArray).toHaveBeenLastCalledWith([
      { content: 'd', state: ElementStates.Modified, key: '3' },
      { content: 'c', state: ElementStates.Modified, key: '2' },
      { content: 'b', state: ElementStates.Modified, key: '1' },
      { content: 'a', state: ElementStates.Modified, key: '0' },
    ]);
  });

  test('should reverse a string with odd number of characters', async () => {
    const array: IElementArray[] = [
      { content: 'a', state: ElementStates.Default, key: '0' },
      { content: 'b', state: ElementStates.Default, key: '1' },
      { content: 'c', state: ElementStates.Default, key: '2' },
    ];

    await animate(array, 0, setElementsArray);

    expect(setElementsArray).toHaveBeenLastCalledWith([
      { content: 'c', state: ElementStates.Modified, key: '2' },
      { content: 'b', state: ElementStates.Modified, key: '1' },
      { content: 'a', state: ElementStates.Modified, key: '0' },
    ]);
  });

  test('should handle a single character string', async () => {
    const array: IElementArray[] = [
      { content: 'a', state: ElementStates.Default, key: '0' },
    ];

    await animate(array, 0, setElementsArray);

    expect(setElementsArray).toHaveBeenLastCalledWith([
      { content: 'a', state: ElementStates.Modified, key: '0' },
    ]);
  });

  test('should handle an empty string', async () => {
    const array: IElementArray[] = [];

    await animate(array, 0, setElementsArray);

    expect(setElementsArray).not.toHaveBeenCalled();
  });
});
