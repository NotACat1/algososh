// Подключение библиотек
import { Dispatch } from 'react';

// Подключение функций
import { delay } from 'utills/delay';
import Stack from 'utills/Stack';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';

async function actionAnimation(
  stack: Stack<IElementArray>,
  setStack: Dispatch<Stack<IElementArray>>,
) {
  const topElement = stack?.pop();
  if (!topElement) return;
  topElement.state = ElementStates.Default;
  stack.push(topElement);
  setStack(new Stack(stack.getStack()));
}

async function animateAdd(
  newItem: IElementArray,
  stack: Stack<IElementArray>,
  animationTime: number,
  setStack: Dispatch<Stack<IElementArray>>,
) {
  newItem.state = ElementStates.Changing;
  stack.push(newItem);
  setStack(new Stack(stack.getStack()));
  await delay(animationTime);
  await actionAnimation(stack, setStack);
}

async function animateRemove(
  stack: Stack<IElementArray>,
  animationTime: number,
  setStack: Dispatch<Stack<IElementArray>>,
) {
  const topElement = stack?.pop();
  if (!topElement) return;
  topElement.state = ElementStates.Changing;
  stack.push(topElement);
  setStack(new Stack(stack.getStack()));
  await delay(animationTime);
  stack?.pop();
  setStack(new Stack(stack.getStack()));
}

async function animateClear(
  stack: Stack<IElementArray>,
  setStack: Dispatch<Stack<IElementArray>>,
) {
  stack.clear();
  setStack(new Stack(stack.getStack()));
}

export { animateAdd, animateRemove, animateClear };
