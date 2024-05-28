import { animateAdd, animateClear, animateRemove } from './queue-page.utils';

import Queue from 'utills/Queue';
import createNullElement from 'utills/create-null-element';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';

describe('QueuePage animate', () => {
  let initialQueue: Queue<IElementArray>;
  let setQueue: jest.Mock;

  beforeEach(() => {
    setQueue = jest.fn();
    initialQueue = new Queue<IElementArray>(5, createNullElement);
  });

  test('should animate the addition of an element to the queue', async () => {
    const newElement: IElementArray = {
      state: ElementStates.Default,
      content: 'A',
      key: '1',
    };
    await animateAdd(newElement, initialQueue, 0);

    const queueArray = initialQueue.toArray().map(item => item.value);
    expect(queueArray).toContain(newElement);

    initialQueue.clear();
  });

  test('should animate the removal of the head element from the queue', async () => {
    const newElement: IElementArray = {
      state: ElementStates.Default,
      content: 'A',
      key: '1',
    };
    initialQueue.enqueue(newElement);

    await animateRemove(initialQueue, 0);

    const queueArray = initialQueue.toArray().map(item => item.value);
    expect(queueArray).not.toContain(newElement);

    initialQueue.clear();
  });

  test('should animate the clearing of the queue', async () => {
    const elements: IElementArray[] = [
      { state: ElementStates.Default, content: 'A', key: '1' },
      { state: ElementStates.Default, content: 'B', key: '2' },
      { state: ElementStates.Default, content: 'C', key: '3' },
    ];
    elements.forEach(element => initialQueue.enqueue(element));

    await animateClear(initialQueue);

    const queueArray = initialQueue.toArray().map(item => item.value);
    elements.forEach(element => expect(queueArray).not.toContain(element));
  });
});
