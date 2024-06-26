// Подключение функций
import { delay } from 'utills/delay';
import Queue from 'utills/Queue';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';

async function animateAdd(
  element: IElementArray,
  queue: Queue<IElementArray>,
  animationTime: number,
) {
  element.state = ElementStates.Changing;
  queue.enqueue(element);
  await delay(animationTime);
  element.state = ElementStates.Default;
}

async function animateRemove(
  queue: Queue<IElementArray>,
  animationTime: number,
) {
  const indexHead = queue.getIndexHead();
  const head = queue.toArray()[indexHead];
  if (!head) return;
  head.value.state = ElementStates.Changing;
  queue.update(indexHead, head.value);
  await delay(animationTime);
  queue.dequeue();
}

async function animateClear(
  queue: Queue<IElementArray>,
) {
  queue.clear();
}

export { animateAdd, animateRemove, animateClear };
