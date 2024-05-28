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
  if (startIndex !== endIndex) {
    array[startIndex].state = ElementStates.Changing;
    array[endIndex].state = ElementStates.Changing;
    setElementsArray([...array]);
    await delay(animationTime);
    [array[startIndex], array[endIndex]] = [array[endIndex], array[startIndex]];
    array[startIndex].state = ElementStates.Modified;
    array[endIndex].state = ElementStates.Modified;
    setElementsArray([...array]);
    await delay(animationTime);
  } else {
    array[startIndex].state = ElementStates.Modified;
    setElementsArray([...array]);
    await delay(animationTime);
  }
}

async function animate(
  array: IElementArray[],
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
) {
  const length = array.length;

  if (length == 0) return;

  const mid = length / 2;

  for (let i = 0; i < mid; i++) {
    await animateSwap(
      array,
      i,
      length - 1 - i,
      animationTime,
      setElementsArray,
    );
  }
}

export { animate, animateSwap };
