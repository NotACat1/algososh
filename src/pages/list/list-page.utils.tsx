// Подключение библиотек
import { Dispatch } from 'react';

// Подключение компонентов
import { Circle } from 'components/ui/circle/circle';

// Подключение функций
import { delay } from 'utills/delay';
import LinkedList from 'utills/LinkedList';
import createNullCircle from 'utills/create-null-element';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';

export interface IElementLinkedList extends IElementArray {
  head?: string | React.ReactElement | null;
  tail?: string | React.ReactElement | null;
}

function creatSmallCircle(element: IElementArray) {
  return (
    <Circle state={element.state} letter={element.content} isSmall={true} />
  );
}

const createNewLinkedList = (
  linkedList: LinkedList<IElementLinkedList>,
): LinkedList<IElementLinkedList> => {
  const newLinkedList = new LinkedList<IElementLinkedList>();
  newLinkedList.head = linkedList.head;
  newLinkedList.tail = linkedList.tail;
  newLinkedList.size = linkedList.size;
  return newLinkedList;
};

async function animationAddHead(
  newElement: IElementArray,
  linkedList: LinkedList<IElementLinkedList>,
  animationTime: number,
  setLinkedList: Dispatch<LinkedList<IElementLinkedList>>,
) {
  const copyLinkedList = createNewLinkedList(linkedList);
  let head = copyLinkedList.toArray()[0];

  if (!head) {
    newElement.state = ElementStates.Modified;
    copyLinkedList.addToHead(newElement);
  } else {
    newElement.state = ElementStates.Changing;
    head.state = ElementStates.Changing;
    head.head = creatSmallCircle(newElement);
    copyLinkedList.removeFromHead();
    copyLinkedList.addToHead(head);

    setLinkedList(createNewLinkedList(copyLinkedList));
    await delay(animationTime);

    head.state = ElementStates.Default;
    head.head = null;
    newElement.state = ElementStates.Modified;
    copyLinkedList.addToHead(newElement);
  }

  setLinkedList(createNewLinkedList(copyLinkedList));
  await delay(animationTime);

  head = copyLinkedList.toArray()[0];
  head.state = ElementStates.Default;
  setLinkedList(createNewLinkedList(copyLinkedList));
}

async function animationAddTail(
  newElement: IElementArray,
  linkedList: LinkedList<IElementLinkedList>,
  animationTime: number,
  setLinkedList: Dispatch<LinkedList<IElementLinkedList>>,
) {
  const copyLinkedList = createNewLinkedList(linkedList);
  let arrayLinkedList = copyLinkedList.toArray();
  let tail = arrayLinkedList[arrayLinkedList.length - 1];

  if (!tail) {
    newElement.state = ElementStates.Modified;
    copyLinkedList.addToTail(newElement);
  } else {
    newElement.state = ElementStates.Changing;
    tail.state = ElementStates.Changing;
    tail.tail = creatSmallCircle(newElement);
    copyLinkedList.removeFromTail();
    copyLinkedList.addToTail(tail);

    setLinkedList(createNewLinkedList(copyLinkedList));
    await delay(animationTime);

    tail.state = ElementStates.Default;
    tail.tail = null;
    newElement.state = ElementStates.Modified;
    copyLinkedList.addToTail(newElement);
  }

  setLinkedList(createNewLinkedList(copyLinkedList));
  await delay(animationTime);

  arrayLinkedList = copyLinkedList.toArray();
  tail = arrayLinkedList[arrayLinkedList.length - 1];
  tail.state = ElementStates.Default;
  setLinkedList(createNewLinkedList(copyLinkedList));
}

async function animationRemoveHead(
  linkedList: LinkedList<IElementLinkedList>,
  animationTime: number,
  setLinkedList: Dispatch<LinkedList<IElementLinkedList>>,
) {
  const copyLinkedList = createNewLinkedList(linkedList);
  const head = copyLinkedList.toArray()[0];

  if (!head) {
    return;
  }

  copyLinkedList.removeFromHead();
  copyLinkedList.addToHead(createNullCircle());
  const newHead = copyLinkedList.toArray()[0];

  newHead.state = ElementStates.Changing;
  newHead.head = creatSmallCircle(head);
  copyLinkedList.removeFromHead();
  copyLinkedList.addToHead(newHead);

  setLinkedList(createNewLinkedList(copyLinkedList));
  await delay(animationTime);

  newHead.state = ElementStates.Default;
  newHead.head = null;
  copyLinkedList.removeFromHead();

  setLinkedList(createNewLinkedList(copyLinkedList));
  await delay(animationTime);
}

async function animationRemoveTail(
  linkedList: LinkedList<IElementLinkedList>,
  animationTime: number,
  setLinkedList: Dispatch<LinkedList<IElementLinkedList>>,
) {
  const copyLinkedList = createNewLinkedList(linkedList);
  let arrayLinkedList = copyLinkedList.toArray();
  const tail = arrayLinkedList[arrayLinkedList.length - 1];

  if (!tail) {
    return;
  }

  copyLinkedList.removeFromTail();
  copyLinkedList.addToTail(createNullCircle());
  arrayLinkedList = copyLinkedList.toArray();
  const newTail = arrayLinkedList[arrayLinkedList.length - 1];

  newTail.state = ElementStates.Changing;
  newTail.head = creatSmallCircle(tail);
  copyLinkedList.removeFromTail();
  copyLinkedList.addToTail(newTail);

  setLinkedList(createNewLinkedList(copyLinkedList));
  await delay(animationTime);

  newTail.state = ElementStates.Default;
  newTail.head = null;
  copyLinkedList.removeFromTail();

  setLinkedList(createNewLinkedList(copyLinkedList));
  await delay(animationTime);
}

async function animationAddIndex(
  newElement: IElementArray,
  index: number,
  linkedList: LinkedList<IElementLinkedList>,
  animationTime: number,
  setLinkedList: Dispatch<LinkedList<IElementLinkedList>>,
) {
  const copyLinkedList = createNewLinkedList(linkedList);
  const arrayLinkedList = copyLinkedList.toArray();

  if (arrayLinkedList.length - 1 < index) {
    return;
  }

  newElement.state = ElementStates.Changing;

  let i = 0;
  while (i <= index) {
    const element = arrayLinkedList[i];
    element.state = ElementStates.Changing;
    element.head = creatSmallCircle(newElement);
    setLinkedList(createNewLinkedList(copyLinkedList));
    await delay(animationTime);
    element.state = ElementStates.Default;
    element.head = null;
    i++;
  }

  newElement.state = ElementStates.Default;

  copyLinkedList.insertAtIndex(newElement, index);
  setLinkedList(createNewLinkedList(copyLinkedList));
  await delay(animationTime);
}

async function animationRemoveIndex(
  index: number,
  linkedList: LinkedList<IElementLinkedList>,
  animationTime: number,
  setLinkedList: Dispatch<LinkedList<IElementLinkedList>>,
) {
  const copyLinkedList = createNewLinkedList(linkedList);
  const arrayLinkedList = copyLinkedList.toArray();

  if (arrayLinkedList.length - 1 < index) {
    return;
  }

  let i = 0;
  while (i <= index) {
    const element = arrayLinkedList[i];
    element.state = ElementStates.Changing;
    copyLinkedList.removeFromIndex(i);
    const newElement: IElementLinkedList = createNullCircle();
    newElement.head = creatSmallCircle(element);
    newElement.state = ElementStates.Changing;
    copyLinkedList.insertAtIndex(newElement, i);
    setLinkedList(createNewLinkedList(copyLinkedList));
    await delay(animationTime);
    element.state = ElementStates.Default;
    newElement.head = null;
    newElement.content = element.content;
    newElement.state = ElementStates.Default;
    i++;
  }

  copyLinkedList.removeFromIndex(index);
  setLinkedList(createNewLinkedList(copyLinkedList));
  await delay(animationTime);
}

export {
  animationAddHead,
  animationAddTail,
  animationRemoveHead,
  animationRemoveTail,
  animationAddIndex,
  animationRemoveIndex,
};
