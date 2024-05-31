// Подключение библиотек
import React, { FC, ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';

// Подключение компонентов
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { Input } from 'components/ui/input/input';
import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';

// Подключение таблиц стилей
import styles from './queue-page.module.scss';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import Queue from 'utills/Queue';
import createNullElement from 'utills/create-null-element';
import { animateAdd, animateRemove, animateClear } from './queue-page.utils';

// Подключение интерфейсов
import { IElementArray } from 'types/element-array';
import { ElementStates } from 'types/element-states';
import { IStateAnimation } from 'types/state-animation';

enum Animations {
  Add = 'add',
  Remove = 'remove',
  Clear = 'clear',
}

const maxSize = 7;

const QueuePage: FC = () => {
  // состояние для элементов строки
  const [inputValue, setInputValue] = useState<string>('');
  const [queue] = useState<Queue<IElementArray>>(
    new Queue<IElementArray>(maxSize, createNullElement),
  );
  const [animation, setAnimation] = useState<IStateAnimation<Animations>>({
    animation: null,
    isAnimation: false,
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleClickDeleteAll = () => {
    setAnimation({ animation: Animations.Clear, isAnimation: true });
    animateClear(queue).then(() => {
      setAnimation({ animation: null, isAnimation: false });
    });
  };

  const handleClickDelete = () => {
    setAnimation({ animation: Animations.Remove, isAnimation: true });
    animateRemove(queue, SHORT_DELAY_IN_MS).then(() => {
      setAnimation({ animation: null, isAnimation: false });
    });
  };

  const handleClickAdd = () => {
    const newValue = {
      content: inputValue,
      state: ElementStates.Default,
      key: queue.toArray()[0]?.key || nanoid(),
    };
    setAnimation({ animation: Animations.Add, isAnimation: true });
    animateAdd(newValue, queue, SHORT_DELAY_IN_MS).then(() => {
      setAnimation({ animation: null, isAnimation: false });
    });
    setInputValue('');
  };

  const elementsCircles = queue.toArray().map((element, index) => {
    return (
      <Circle
        letter={element.value.content}
        state={element.value.state}
        key={element.key}
        index={index}
        head={
          queue.getIndexHead() == index && queue.getSize() != 0 ? 'head' : ''
        }
        tail={
          queue.getIndexHead() + queue.getSize() - 1 == index &&
          queue.getSize() != 0
            ? 'tail'
            : ''
        }
      />
    );
  });

  return (
    <SolutionLayout title="Очередь">
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
                id="input"
              />
              <Button
                text="Добавить"
                disabled={
                  animation.isAnimation ||
                  inputValue == '' ||
                  queue.getIndexHead() + queue.getSize() == maxSize
                }
                onClick={handleClickAdd}
                isLoader={
                  animation.isAnimation && animation.animation == Animations.Add
                }
                id="add-button"
              />
              <Button
                text="Удалить"
                disabled={queue.getSize() == 0 || animation.isAnimation}
                onClick={handleClickDelete}
                isLoader={
                  animation.isAnimation &&
                  animation.animation == Animations.Remove
                }
                id="remove-button"
              />
            </div>
            <Button
              text="Очистить"
              disabled={queue.getSize() == 0 || animation.isAnimation}
              onClick={handleClickDeleteAll}
              isLoader={
                animation.isAnimation && animation.animation == Animations.Clear
              }
              id="cleare-button"
            />
          </div>
          <div className={styles.circles}>{elementsCircles}</div>
        </div>
      </>
    </SolutionLayout>
  );
};

export default QueuePage;
