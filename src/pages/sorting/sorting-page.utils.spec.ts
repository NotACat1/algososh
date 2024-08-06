import { animate } from './sorting-page.utils';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';
import { SortingMethod, SortingOrder } from 'types/sorting';

describe('SortingPage animate', () => {
  let setElementsArray: jest.Mock;

  beforeEach(() => {
    setElementsArray = jest.fn();
  });

  test('Bubble Sort Ascending', async () => {
    const array: IElementArray[] = [
      { content: '3', key: '1', state: ElementStates.Default },
      { content: '2', key: '2', state: ElementStates.Default },
      { content: '1', key: '3', state: ElementStates.Default },
    ];
    await animate(
      array,
      0,
      SortingMethod.BUBBLE_SORT,
      SortingOrder.ASCENDING,
      setElementsArray,
    );

    expect(array.map(item => item.content)).toEqual(['1', '2', '3']);
  });

  test('Bubble Sort Descending', async () => {
    const array: IElementArray[] = [
      { content: '3', key: '1', state: ElementStates.Default },
      { content: '1', key: '2', state: ElementStates.Default },
      { content: '2', key: '3', state: ElementStates.Default },
    ];
    await animate(
      array,
      0,
      SortingMethod.BUBBLE_SORT,
      SortingOrder.DESCENDING,
      setElementsArray,
    );

    expect(array.map(item => item.content)).toEqual(['3', '2', '1']);
  });

  test('Selection Sort Ascending', async () => {
    const array: IElementArray[] = [
      { content: '3', key: '1', state: ElementStates.Default },
      { content: '2', key: '2', state: ElementStates.Default },
      { content: '1', key: '3', state: ElementStates.Default },
    ];
    await animate(
      array,
      0,
      SortingMethod.SELECTION_SORT,
      SortingOrder.ASCENDING,
      setElementsArray,
    );

    expect(array.map(item => item.content)).toEqual(['1', '2', '3']);
  });

  test('Selection Sort Descending', async () => {
    const array: IElementArray[] = [
      { content: '3', key: '1', state: ElementStates.Default },
      { content: '1', key: '2', state: ElementStates.Default },
      { content: '2', key: '3', state: ElementStates.Default },
    ];
    await animate(
      array,
      0,
      SortingMethod.SELECTION_SORT,
      SortingOrder.DESCENDING,
      setElementsArray,
    );

    expect(array.map(item => item.content)).toEqual(['3', '2', '1']);
  });
});
