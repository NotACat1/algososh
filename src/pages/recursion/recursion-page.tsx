// Подключение библиотек
import React, { FC, ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';

// Подключение компонентов
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { Input } from 'components/ui/input/input';
import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';

// Подключение таблиц стилей
import styles from './recursion-page.module.scss';
import { animate } from './recursion-page.utils';
import { DELAY_IN_MS } from 'constants/delays';

// Подключение интерфейсов
import { IElementArray } from 'types/element-array';
import { ElementStates } from 'types/element-states';

const RecursionPage: FC = () => {
  // состояние для элементов строки
  const [inputValue, setInputValue] = useState<string>('');
  const [elementsArray, setElementsArray] = useState<IElementArray[]>([]);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const handleClick = () => {
    const newArray = inputValue.split('').map(char => ({
      content: char,
      state: ElementStates.Default,
      key: nanoid(),
    }));
    setIsAnimated(true);
    animate(newArray, DELAY_IN_MS, setElementsArray).then(() => {
      setIsAnimated(false);
      setInputValue('');
    });
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const elementsCircles =
    elementsArray.length === 0
      ? null
      : elementsArray.map(element => {
          return (
            <Circle
              letter={element.content}
              state={element.state}
              key={element.key}
            />
          );
        });

  return (
    <SolutionLayout title="Строка">
      <>
        <div className={styles.container}>
          <div className={styles.input}>
            <Input
              maxLength={11}
              isLimitText={true}
              disabled={isAnimated}
              onChange={handleChange}
              extraClass={styles.input__input}
              value={inputValue}
              id="input"
            />
            <Button
              text="Развернуть"
              disabled={inputValue.length == 0 || isAnimated}
              onClick={handleClick}
              isLoader={isAnimated}
              id="add-button"
            />
          </div>
          <div className={styles.circles}>{elementsCircles}</div>
        </div>
      </>
    </SolutionLayout>
  );
};

export default RecursionPage;
