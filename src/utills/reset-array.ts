// Подключение интерфейсов
import { IElementArray } from 'types/element-array';
import { ElementStates } from 'types/element-states';

const resetArray = (array: IElementArray[]): IElementArray[] => {
  return array.map(item => {
    return { ...item, state: ElementStates.Default };
  });
};

export { resetArray };
