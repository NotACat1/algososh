// Подключение библиотек
import { Dispatch } from 'react';
import { nanoid } from 'nanoid';

// Подключение функций
import { delay } from 'utills/delay';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';

async function animateFibonacci(
  animationTime: number,
  array: IElementArray[],
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
) {
  setElementsArray([...array]);
  await delay(animationTime);
}

async function animate(
  num: number,
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
) {
  const fibSequence: IElementArray[] = [];
  let firstElement = 0;
  let secondElement = 1;

  for (let i = 0; i < num + 1; i++) {
    fibSequence.push({
      content: firstElement.toString(),
      state: ElementStates.Default,
      key: nanoid(),
    });
    const temp = firstElement;
    firstElement = secondElement;
    secondElement = temp + secondElement;
    await animateFibonacci(animationTime, fibSequence, setElementsArray);
  }
}

export { animate };
