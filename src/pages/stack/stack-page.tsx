// Подключение библиотек
import React, { FC, ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';

// Подключение компонентов
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { Input } from 'components/ui/input/input';
import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';

// Подключение таблиц стилей
import styles from './stack.module.scss';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import Stack from 'utills/Stack';
import { animateAdd, animateRemove, animateClear } from './stack-page.utils';

// Подключение интерфейсов
import { IElementArray } from 'types/element-array';
import { ElementStates } from 'types/element-states';
import { IStateAnimation } from 'types/state-animation';

enum Animations {
  Add = 'add',
  Remove = 'remove',
  Clear = 'Clear',
}

const StackPage: FC = () => {
  // состояние для элементов строки
  const [inputValue, setInputValue] = useState<string>('');
  const [stack, setStack] = useState<Stack<IElementArray>>(
    new Stack<IElementArray>(),
  );
  const [animation, setAnimation] =
    useState <
    IStateAnimation<Animations>>({
      animation: null,
      isAnimation: false,
    });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleClickDeleteAll = () => {
    setAnimation({ animation: Animations.Clear, isAnimation: true });
    animateClear(stack, setStack).then(() => {
      setAnimation({ animation: null, isAnimation: false });
    });
  };

  const handleClickDelete = () => {
    setAnimation({ animation: Animations.Remove, isAnimation: true });
    animateRemove(stack, SHORT_DELAY_IN_MS, setStack).then(() => {
      setAnimation({ animation: null, isAnimation: false });
    });
  };

  const handleClickAdd = () => {
    const newValue = {
      content: inputValue,
      state: ElementStates.Default,
      key: nanoid(),
    };
    setAnimation({ animation: Animations.Add, isAnimation: true });
    animateAdd(newValue, stack, SHORT_DELAY_IN_MS, setStack).then(() => {
      setAnimation({ animation: null, isAnimation: false });
    });
  };

  const elementsCircles =
    stack.getStack().length === 0
      ? null
      : stack.getStack().map((element, index, arr) => {
          return (
            <Circle
              letter={element.content}
              state={element.state}
              key={element.key}
              index={index}
              head={arr.length - 1 == index ? 'top' : ''}
            />
          );
        });

  return (
    <SolutionLayout title="Стек">
      <>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.content__inputs}>
              <Input
                maxLength={4}
                isLimitText={true}
                disabled={animation.isAnimation}
                onChange={handleChange}
                extraClass={styles.content__input}
                value={inputValue}
              />
              <Button
                text="Добавить"
                disabled={
                  (animation.isAnimation &&
                    animation.animation == Animations.Add) ||
                  inputValue == ''
                }
                onClick={handleClickAdd}
                isLoader={
                  animation.isAnimation && animation.animation == Animations.Add
                }
              />
              <Button
                text="Удалить"
                disabled={
                  stack?.getStack().length == 0 ||
                  (animation.isAnimation &&
                    animation.animation == Animations.Remove)
                }
                onClick={handleClickDelete}
                isLoader={
                  animation.isAnimation &&
                  animation.animation == Animations.Remove
                }
              />
            </div>
            <Button
              text="Очистить"
              disabled={
                stack?.getStack().length == 0 ||
                (animation.isAnimation &&
                  animation.animation == Animations.Clear)
              }
              onClick={handleClickDeleteAll}
              isLoader={
                animation.isAnimation && animation.animation == Animations.Clear
              }
            />
          </div>
          <div className={styles.circles}>{elementsCircles}</div>
        </div>
      </>
    </SolutionLayout>
  );
};

export default StackPage;
