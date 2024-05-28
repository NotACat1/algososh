import { animateAdd, animateClear, animateRemove } from './stack-page.utils';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';
import Stack from 'utills/Stack';

describe('StackPage animate', () => {
  let setStack: jest.Mock;
  let mockStack: Stack<IElementArray>;

  beforeEach(() => {
    setStack = jest.fn();
    mockStack = new Stack<IElementArray>();
  });

  test('animateAdd function', async () => {
    const newItem1: IElementArray = {
      state: ElementStates.Default,
      content: 'A',
      key: '1',
    };
    const newItem2: IElementArray = {
      state: ElementStates.Default,
      content: 'B',
      key: '2',
    };

    await animateAdd(newItem1, mockStack, 0, setStack);

    expect(mockStack.getStack()).toStrictEqual([
      {
        state: ElementStates.Default,
        content: 'A',
        key: '1',
      },
    ]);

    await animateAdd(newItem2, mockStack, 0, setStack);

    expect(mockStack.getStack()).toStrictEqual([
      {
        state: ElementStates.Default,
        content: 'A',
        key: '1',
      },
      {
        state: ElementStates.Default,
        content: 'B',
        key: '2',
      },
    ]);

    mockStack.clear();
  });

  test('animateRemove function', async () => {
    mockStack.push({ state: ElementStates.Default, content: 'A', key: '1' });
    mockStack.push({ state: ElementStates.Default, content: 'B', key: '2' });

    await animateRemove(mockStack, 0, setStack);

    expect(mockStack.getStack()).toStrictEqual([
      { state: ElementStates.Default, content: 'A', key: '1' },
    ]);

    await animateRemove(mockStack, 0, setStack);

    expect(mockStack.getStack()).toStrictEqual([]);
  });

  test('animateClear function', async () => {
    mockStack.push({ state: ElementStates.Default, content: 'A', key: '1' });
    mockStack.push({ state: ElementStates.Default, content: 'B', key: '2' });

    await animateClear(mockStack, setStack);

    expect(mockStack.getStack()).toStrictEqual([]);
  });
});
