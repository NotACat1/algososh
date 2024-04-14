// Подключение интерфейсов
import { ElementStates } from 'types/element-states';
import { IElementArray } from 'types/element-array';
import { nanoid } from 'nanoid';

const createNullElement = (): IElementArray => {
  return { content: '', key: nanoid(), state: ElementStates.Default };
};

export default createNullElement;
