// Подключение библиотек
import { Dispatch } from 'react';
import { nanoid } from 'nanoid';

// Подключение функций
import { delay } from 'utills/delay';

// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';
import { SortingMethod, SortingOrder } from 'types/sorting';
import { OptionGenerateArray } from 'types/options';

const createRandomArray = (
  minLen = OptionGenerateArray.MINLEN,
  maxLen = OptionGenerateArray.MAXLEN,
  minItem = OptionGenerateArray.MINLEN,
  maxItem = OptionGenerateArray.MAXITEM,
): IElementArray[] => {
  const arrayLength =
    Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  const resultArray: IElementArray[] = [];

  for (let i = 0; i < arrayLength; i++) {
    const newValue = Math.floor(Math.random() * (maxItem - minItem) + minItem);
    resultArray.push({
      content: newValue.toString(),
      state: ElementStates.Default,
      key: nanoid(),
    });
  }

  return resultArray;
};

async function bubbleSortAscending(
  arr: IElementArray[],
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
): Promise<IElementArray[]> {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      setElementsArray([...arr]);
      await delay(animationTime);
      arr[j + 1].state = ElementStates.Changing;
      setElementsArray([...arr]);
      await delay(animationTime);
      if (parseInt(arr[j].content) > parseInt(arr[j + 1].content)) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      arr[j].state = ElementStates.Default;
      setElementsArray([...arr]);
      await delay(animationTime);
    }
    arr[len - i - 1].state = ElementStates.Modified;
    setElementsArray([...arr]);
    await delay(animationTime);
  }
  return arr;
}

async function bubbleSortDescending(
  arr: IElementArray[],
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
): Promise<IElementArray[]> {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      setElementsArray([...arr]);
      await delay(animationTime);
      arr[j + 1].state = ElementStates.Changing;
      setElementsArray([...arr]);
      await delay(animationTime);
      if (parseInt(arr[j].content) < parseInt(arr[j + 1].content)) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      arr[j].state = ElementStates.Default;
      setElementsArray([...arr]);
      await delay(animationTime);
    }
    arr[len - i - 1].state = ElementStates.Modified;
    setElementsArray([...arr]);
    await delay(animationTime);
  }
  return arr;
}

async function selectionSortAscending(
  arr: IElementArray[],
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
): Promise<IElementArray[]> {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    arr[minIndex].state = ElementStates.Changing;
    setElementsArray([...arr]);
    await delay(animationTime);
    for (let j = i + 1; j < n; j++) {
      arr[j].state = ElementStates.Changing;
      setElementsArray([...arr]);
      await delay(animationTime);
      if (parseInt(arr[j].content) < parseInt(arr[minIndex].content)) {
        arr[minIndex].state = ElementStates.Default;
        minIndex = j;
      }
      arr[j].state = ElementStates.Default;
      arr[minIndex].state = ElementStates.Changing;
      setElementsArray([...arr]);
      await delay(animationTime);
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    arr[i].state = ElementStates.Modified;
    setElementsArray([...arr]);
    await delay(animationTime);
  }
  arr[n - 1].state = ElementStates.Modified;
  setElementsArray([...arr]);
  await delay(animationTime);
  return arr;
}

async function selectionSortDescending(
  arr: IElementArray[],
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
): Promise<IElementArray[]> {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let maxIndex = i;
    arr[maxIndex].state = ElementStates.Changing;
    setElementsArray([...arr]);
    await delay(animationTime);
    for (let j = i + 1; j < n; j++) {
      arr[j].state = ElementStates.Changing;
      setElementsArray([...arr]);
      await delay(animationTime);
      if (parseInt(arr[j].content) > parseInt(arr[maxIndex].content)) {
        arr[maxIndex].state = ElementStates.Default;
        maxIndex = j;
      }
      arr[j].state = ElementStates.Default;
      arr[maxIndex].state = ElementStates.Changing;
      setElementsArray([...arr]);
      await delay(animationTime);
    }
    if (maxIndex !== i) {
      [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
    }
    arr[i].state = ElementStates.Modified;
    setElementsArray([...arr]);
    await delay(animationTime);
  }
  arr[n - 1].state = ElementStates.Modified;
  setElementsArray([...arr]);
  await delay(animationTime);
  return arr;
}

async function bubbleSort(
  array: IElementArray[],
  order: SortingOrder,
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
) {
  switch (order) {
    case SortingOrder.ASCENDING: {
      await bubbleSortAscending(array, animationTime, setElementsArray);
      break;
    }
    case SortingOrder.DESCENDING: {
      await bubbleSortDescending(array, animationTime, setElementsArray);
      break;
    }
    default:
      throw new Error('Unsupported sorting order');
  }
}

async function selectionSort(
  array: IElementArray[],
  order: SortingOrder,
  animationTime: number,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
) {
  switch (order) {
    case SortingOrder.ASCENDING: {
      await selectionSortAscending(array, animationTime, setElementsArray);
      break;
    }
    case SortingOrder.DESCENDING: {
      await selectionSortDescending(array, animationTime, setElementsArray);
      break;
    }
    default:
      throw new Error('Unsupported sorting order');
  }
}

async function animate(
  array: IElementArray[],
  animationTime: number,
  sortingMethod: SortingMethod,
  sortingOrder: SortingOrder,
  setElementsArray: Dispatch<React.SetStateAction<IElementArray[]>>,
) {
  if (array.length == 0) return;

  switch (sortingMethod) {
    case SortingMethod.SELECTION_SORT: {
      await selectionSort(array, sortingOrder, animationTime, setElementsArray);
      break;
    }
    case SortingMethod.BUBBLE_SORT: {
      await bubbleSort(array, sortingOrder, animationTime, setElementsArray);
      break;
    }
    default:
      throw new Error('Unsupported sorting method');
  }
}

export { animate, createRandomArray };
