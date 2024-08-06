// Подключение библиотек
import React, { FC, ChangeEvent, useState } from 'react';

// Подключение компонентов
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { Input } from 'components/ui/input/input';
import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';

// Подключение таблиц стилей
import styles from './fibonacci-page.module.scss';
import { animate } from './fibonacci.utils';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import isValidIntegerInRange from 'utills/is-validInteger-in-range';

// Подключение интерфейсов
import { IElementArray } from 'types/element-array';

const FibonacciPage: FC = () => {
  // состояние для элементов строки
  const [inputValue, setInputValue] = useState<string>('');
  const [elementsArray, setElementsArray] = useState<IElementArray[]>([]);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const handleClick = () => {
    setIsAnimated(true);
    animate(parseInt(inputValue), SHORT_DELAY_IN_MS, setElementsArray).then(
      () => {
        setIsAnimated(false);
        setInputValue('');
      },
    );
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value.replace(/\D/g, '');
    setInputValue(newValue);
  };

  const elementsCircles =
    elementsArray.length === 0
      ? null
      : elementsArray
          .reduce((acc: JSX.Element[][], element, index) => {
            const chunkIndex = Math.floor(index / 10);

            if (!acc[chunkIndex]) {
              acc[chunkIndex] = [];
            }

            acc[chunkIndex].push(
              <Circle
                index={index}
                letter={element.content}
                state={element.state}
                key={element.key}
              />,
            );

            return acc;
          }, [])
          .map((row, index) => (
            <div key={index} className={styles.circles__row}>
              {row}
            </div>
          ));

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <>
        <div className={styles.container}>
          <div className={styles.input}>
            <Input
              min={0}
              max={19}
              step={1}
              type="number"
              isLimitText={true}
              disabled={isAnimated}
              onChange={handleChange}
              extraClass={styles.input__input}
              value={inputValue}
              id="input"
            />
            <Button
              text="Развернуть"
              disabled={
                isAnimated ||
                inputValue == '' ||
                !isValidIntegerInRange(inputValue, 0, 19)
              }
              onClick={handleClick}
              isLoader={isAnimated}
              id="button"
            />
          </div>
          <div className={styles.circles}>{elementsCircles}</div>
        </div>
      </>
    </SolutionLayout>
  );
};

export default FibonacciPage;
