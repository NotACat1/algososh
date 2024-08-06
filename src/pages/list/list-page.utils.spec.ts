import {
  animationAddHead,
  animationAddIndex,
  animationAddTail,
  animationRemoveHead,
  animationRemoveIndex,
  animationRemoveTail,
  IElementLinkedList,
} from './list-page.utils';

import LinkedList from 'utills/LinkedList';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';

describe('ListPage animate', () => {
  let initialLinkedList: LinkedList<IElementLinkedList>;
  let setLinkedList: jest.Mock;

  beforeEach(() => {
    setLinkedList = jest.fn();
    initialLinkedList = new LinkedList<IElementLinkedList>();
  });

  test('renders default list correctly', () => {
    expect(initialLinkedList.toArray()).toEqual([]);
  });

  test('adds an element to head', async () => {
    const newElement: IElementArray = {
      state: ElementStates.Default,
      content: 'A',
      key: '1',
    };
    await animationAddHead(newElement, initialLinkedList, 0, setLinkedList);

    const updatedList =
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0];
    expect(updatedList.toArray()[0].content).toBe('A');
  });

  test('adds an element to tail', async () => {
    const newElement: IElementArray = {
      state: ElementStates.Default,
      content: 'B',
      key: '1',
    };

    await animationAddTail(newElement, initialLinkedList, 0, setLinkedList);

    const updatedList =
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0];
    expect(updatedList.toArray()[0].content).toBe('B');
  });

  test('adds an element by index', async () => {
    const newElement1: IElementArray = {
      state: ElementStates.Default,
      content: 'A',
      key: '1',
    };
    const newElement2: IElementArray = {
      state: ElementStates.Default,
      content: 'B',
      key: '2',
    };

    await animationAddHead(newElement1, initialLinkedList, 0, setLinkedList);
    await animationAddIndex(
      newElement2,
      1,
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0],
      0,
      setLinkedList,
    );

    const updatedList =
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0];
    const listArray = updatedList.toArray();
    expect(listArray[0].content).toBe('A');
    expect(listArray[1].content).toBe('B');
  });

  test('removes an element from head', async () => {
    const newElement: IElementArray = {
      state: ElementStates.Default,
      content: 'A',
      key: '1',
    };

    await animationAddHead(newElement, initialLinkedList, 0, setLinkedList);
    await animationRemoveHead(
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0],
      0,
      setLinkedList,
    );

    const updatedList =
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0];
    expect(updatedList.toArray()).toEqual([]);
  });

  test('removes an element from tail', async () => {
    const newElement: IElementArray = {
      state: ElementStates.Default,
      content: 'B',
      key: '1',
    };

    await animationAddTail(newElement, initialLinkedList, 0, setLinkedList);
    await animationRemoveTail(
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0],
      0,
      setLinkedList,
    );

    const updatedList =
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0];
    expect(updatedList.toArray()).toEqual([]);
  });

  test('removes an element by index', async () => {
    const newElement1: IElementArray = {
      state: ElementStates.Default,
      content: 'A',
      key: '1',
    };
    const newElement2: IElementArray = {
      state: ElementStates.Default,
      content: 'B',
      key: '2',
    };

    await animationAddHead(newElement1, initialLinkedList, 0, setLinkedList);
    await animationAddIndex(
      newElement2,
      1,
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0],
      0,
      setLinkedList,
    );
    await animationRemoveIndex(
      1,
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0],
      0,
      setLinkedList,
    );

    const updatedList =
      setLinkedList.mock.calls[setLinkedList.mock.calls.length - 1][0];
    const listArray = updatedList.toArray();
    expect(listArray.length).toBe(1);
    expect(listArray[0].content).toBe('A');
  });
});
