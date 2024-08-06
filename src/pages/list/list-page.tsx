// Подключение библиотек
import React, { FC, ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';

// Подключение компонентов
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { Input } from 'components/ui/input/input';
import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { ArrowIcon } from 'components/ui/icons/arrow-icon';

// Подключение таблиц стилей
import styles from './list.module.scss';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import LinkedList from 'utills/LinkedList';
import isValidIntegerInRange from 'utills/is-validInteger-in-range';
import {
  animationAddHead,
  animationAddTail,
  animationRemoveHead,
  animationRemoveTail,
  animationAddIndex,
  animationRemoveIndex,
  IElementLinkedList,
  createDefaultLinkedList,
} from './list-page.utils';

// Подключение интерфейсов
import { IElementArray } from 'types/element-array';
import { ElementStates } from 'types/element-states';
import { IStateAnimation } from 'types/state-animation';

enum Animations {
  AddToHead = 'AddToHead',
  AddToTail = 'AddToTail',
  RemoveFromHead = 'RemoveFromHead',
  RemoveFromTail = 'RemoveFromTail',
  AddIndex = 'AddIndex',
  RemoveIndex = 'RemoveIndex',
}

const ListPage: FC = () => {
  // состояние для элементов строки
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [linkedList, setLinkedList] = useState<LinkedList<IElementLinkedList>>(
    createDefaultLinkedList(),
  );
  const [animation, setAnimation] = useState<IStateAnimation<Animations>>({
    animation: null,
    isAnimation: false,
  });

  const handleChangeValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleChangeIndex = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(evt.target.value);
  };

  const createNewValue = (content: string): IElementArray => {
    return {
      content: content,
      key: nanoid(),
      state: ElementStates.Default,
    };
  };

  const handleClickAddHead = () => {
    const newValue = createNewValue(inputValue);
    setAnimation({ animation: Animations.AddToHead, isAnimation: true });
    animationAddHead(
      newValue,
      linkedList,
      SHORT_DELAY_IN_MS,
      setLinkedList,
    ).then(() => {
      setAnimation({ animation: null, isAnimation: false });
      setInputValue('');
    });
  };

  const handleClickAddTail = () => {
    const newValue = createNewValue(inputValue);
    setAnimation({ animation: Animations.AddToTail, isAnimation: true });
    animationAddTail(
      newValue,
      linkedList,
      SHORT_DELAY_IN_MS,
      setLinkedList,
    ).then(() => {
      setAnimation({ animation: null, isAnimation: false });
      setInputValue('');
    });
  };

  const handleClickRemoveHead = () => {
    setAnimation({ animation: Animations.RemoveFromHead, isAnimation: true });
    animationRemoveHead(linkedList, SHORT_DELAY_IN_MS, setLinkedList).then(
      () => {
        setAnimation({ animation: null, isAnimation: false });
      },
    );
  };

  const handleClickRemoveTail = () => {
    setAnimation({ animation: Animations.RemoveFromTail, isAnimation: true });
    animationRemoveTail(linkedList, SHORT_DELAY_IN_MS, setLinkedList).then(
      () => {
        setAnimation({ animation: null, isAnimation: false });
      },
    );
  };

  const handleClickAddIndex = () => {
    const newValue: IElementArray = {
      content: inputValue,
      key: nanoid(),
      state: ElementStates.Default,
    };
    setAnimation({ animation: Animations.AddIndex, isAnimation: true });
    animationAddIndex(
      newValue,
      parseInt(inputIndex),
      linkedList,
      SHORT_DELAY_IN_MS,
      setLinkedList,
    ).then(() => {
      setAnimation({ animation: null, isAnimation: false });
      setInputValue('');
      setInputIndex('');
    });
  };

  const handleClickRemoveIndex = () => {
    setAnimation({ animation: Animations.RemoveIndex, isAnimation: true });
    animationRemoveIndex(
      parseInt(inputIndex),
      linkedList,
      SHORT_DELAY_IN_MS,
      setLinkedList,
    ).then(() => {
      setAnimation({ animation: null, isAnimation: false });
      setInputIndex('');
    });
  };

  const elementsCircles =
    linkedList.toArray().length === 0
      ? null
      : linkedList.toArray().flatMap((element, index, arr) => {
          const circles = [
            <Circle
              letter={element.content}
              state={element.state}
              key={element.key}
              index={index}
              head={element.head ? element.head : index == 0 ? 'head' : ''}
              tail={
                element.tail
                  ? element.tail
                  : index == arr.length - 1
                    ? 'tail'
                    : ''
              }
            />,
          ];

          // Добавляем компонент между кругами, кроме последнего
          if (index < arr.length - 1) {
            circles.push(<ArrowIcon key={index} />);
          }

          return circles;
        });

  return (
    <SolutionLayout title="Связный список">
      <>
        <div className={styles.container}>
          <div className={styles.content}>
            <Input
              maxLength={4}
              isLimitText={true}
              disabled={animation.isAnimation}
              onChange={handleChangeValue}
              value={inputValue}
              id="input-value"
            />
            <Button
              text="Добавить в head"
              disabled={
                animation.isAnimation ||
                inputValue == '' ||
                linkedList.toArray().length === 10
              }
              onClick={handleClickAddHead}
              isLoader={
                animation.isAnimation &&
                animation.animation == Animations.AddToHead
              }
              id="add-head"
            />
            <Button
              text="Добавить в tail"
              disabled={
                animation.isAnimation ||
                inputValue == '' ||
                linkedList.toArray().length === 10
              }
              onClick={handleClickAddTail}
              isLoader={
                animation.isAnimation &&
                animation.animation == Animations.AddToTail
              }
              id="add-tail"
            />
            <Button
              text="Удалить из head"
              disabled={
                animation.isAnimation || linkedList.toArray().length === 0
              }
              onClick={handleClickRemoveHead}
              isLoader={
                animation.isAnimation &&
                animation.animation == Animations.RemoveFromHead
              }
              id="remove-head"
            />
            <Button
              text="Удалить из tail"
              disabled={
                animation.isAnimation || linkedList.toArray().length === 0
              }
              onClick={handleClickRemoveTail}
              isLoader={
                animation.isAnimation &&
                animation.animation == Animations.RemoveFromTail
              }
              id="remove-tail"
            />
            <Input
              min={0}
              max={
                linkedList.toArray().length === 10
                  ? 9
                  : linkedList.toArray().length
              }
              step={1}
              type="number"
              maxLength={
                linkedList.toArray().length <= 0
                  ? 0
                  : linkedList.toArray().length
              }
              isLimitText={true}
              disabled={animation.isAnimation}
              onChange={handleChangeIndex}
              value={inputIndex}
              id="input-index"
            />
            <Button
              extraClass={styles.big}
              text="Добавить по индексу"
              disabled={
                animation.isAnimation ||
                inputValue == '' ||
                inputIndex == '' ||
                linkedList.toArray().length === 10 ||
                !isValidIntegerInRange(
                  inputIndex,
                  0,
                  linkedList.toArray().length <= 0
                    ? 0
                    : linkedList.toArray().length,
                )
              }
              onClick={handleClickAddIndex}
              isLoader={
                animation.isAnimation &&
                animation.animation == Animations.AddIndex
              }
              id="add-index"
            />
            <Button
              extraClass={styles.big}
              text="Удалить по индексу"
              disabled={
                animation.isAnimation ||
                inputIndex == '' ||
                linkedList.toArray().length === 0 ||
                !isValidIntegerInRange(
                  inputIndex,
                  0,
                  linkedList.toArray().length <= 0
                    ? 0
                    : linkedList.toArray().length,
                )
              }
              onClick={handleClickRemoveIndex}
              isLoader={
                animation.isAnimation &&
                animation.animation == Animations.RemoveIndex
              }
              id="remove-index"
            />
          </div>
          <div className={styles.circles} data-test="circles-container">
            {elementsCircles}
          </div>
        </div>
      </>
    </SolutionLayout>
  );
};

export default ListPage;
