// Подключение библиотек
import { Dispatch } from 'react';

// Подключение функций
import { delay } from 'utills/delay';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';

async function animateSwap(
  array: IElementArray[],
  startIndex: number,
  endIndex: number,
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
) {
  array[startIndex].state = ElementStates.Changing;
  array[endIndex].state = ElementStates.Changing;
  setElementsArray([...array]);
  await delay(animationTime);
  const temp = array[startIndex].content;
  array[startIndex].content = array[endIndex].content;
  array[endIndex].content = temp;
  array[startIndex].state = ElementStates.Modified;
  array[endIndex].state = ElementStates.Modified;
  setElementsArray([...array]);
  await delay(animationTime);
}

async function animate(
  array: IElementArray[],
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
) {
  setElementsArray(array);
  await delay(animationTime);

  const length = array.length;

  if (length == 0) return;

  let start = 0;
  let end = length - 1;

  while (start <= end) {
    await animateSwap(array, start, end, animationTime, setElementsArray);
    start++;
    end--;
  }
}

export { animate, animateSwap };
