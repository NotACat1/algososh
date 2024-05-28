// Подключение библиотек
import React, { FC, useState } from 'react';

// Подключение компонентов
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { RadioInput } from 'components/ui/radio-input/radio-input';
import { Button } from 'components/ui/button/button';
import { Column } from 'components/ui/column/column';

// Подключение таблиц стилей
import styles from './sorting-page.module.scss';
import { animate, createRandomArray } from './sorting-page.utils';
import { DELAY_IN_MS } from 'constants/delays';
import { resetArray } from 'utills/reset-array';

// Подключение интерфейсов
import { IElementArray } from 'types/element-array';
import { SortingMethod, SortingOrder } from 'types/sorting';

const SortingPage: FC = () => {
  // состояние для элементов строки
  const [sortingMethod, setSortingMethod] = useState<SortingMethod>(
    SortingMethod.BUBBLE_SORT,
  );
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>(
    SortingOrder.ASCENDING,
  );
  const [elementsArray, setElementsArray] =
    useState<IElementArray[]>(createRandomArray());
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const handleChangeMethodQuickSort = () => {
    setSortingMethod(SortingMethod.SELECTION_SORT);
  };

  const handleChangeMethodBubbleSort = () => {
    setSortingMethod(SortingMethod.BUBBLE_SORT);
  };

  const animateSorting = (order: SortingOrder) => {
    setIsAnimated(true);
    animate(
      resetArray(elementsArray),
      DELAY_IN_MS,
      sortingMethod,
      order,
      setElementsArray,
    ).then(() => {
      setIsAnimated(false);
    });
  };

  const handleSortingAscending = () => {
    setSortingOrder(SortingOrder.ASCENDING);
    animateSorting(SortingOrder.ASCENDING);
  };

  const handleSortingDescending = () => {
    setSortingOrder(SortingOrder.DESCENDING);
    animateSorting(SortingOrder.DESCENDING);
  };

  const generateNewArray = () => {
    setElementsArray(createRandomArray());
  };

  const elementsColumns =
    elementsArray.length === 0
      ? null
      : elementsArray.map(element => {
          return (
            <Column
              index={parseInt(element.content)}
              state={element.state}
              key={element.key}
            />
          );
        });

  return (
    <SolutionLayout title="Строка">
      <>
        <div className={styles.container}>
          <div className={styles.inputs}>
            <div className={styles.inputs__radio}>
              <RadioInput
                label="Выбор"
                name="method"
                value={SortingMethod.SELECTION_SORT}
                defaultChecked={sortingMethod == SortingMethod.SELECTION_SORT}
                onClick={handleChangeMethodQuickSort}
                disabled={false}
                data-testid="custom-sort-selection"
              />
              <RadioInput
                label="Пузырёк"
                name="method"
                value={SortingMethod.BUBBLE_SORT}
                defaultChecked={sortingMethod == SortingMethod.BUBBLE_SORT}
                onClick={handleChangeMethodBubbleSort}
                disabled={false}
                data-testid="custom-sort-bobule"
              />
            </div>
            <div className={styles.inputs__buttons}>
              <Button
                type="button"
                text="По возрастанию"
                extraClass={styles.button}
                onClick={handleSortingAscending}
                isLoader={isAnimated && sortingOrder === SortingOrder.ASCENDING}
                disabled={isAnimated}
              />
              <Button
                type="button"
                text="По убыванию"
                extraClass={styles.button}
                onClick={handleSortingDescending}
                isLoader={
                  isAnimated && sortingOrder === SortingOrder.DESCENDING
                }
                disabled={isAnimated}
              />
            </div>
            <Button
              type="button"
              text="Новый массив"
              extraClass={styles.button}
              onClick={generateNewArray}
              disabled={isAnimated}
            />
          </div>
          <div className={styles.columns}>{elementsColumns}</div>
        </div>
      </>
    </SolutionLayout>
  );
};

export default SortingPage;
