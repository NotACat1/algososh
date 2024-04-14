import { nanoid } from 'nanoid';

interface QueueItem<T> {
  key: string;
  value: T;
}

class Queue<T> {
  private queue: QueueItem<T>[];
  private maxSize: number;
  private size: number;
  private elementConstructor: () => T;

  constructor(maxSize: number, nullElementConstructor: () => T) {
    this.maxSize = maxSize;
    this.size = 0;
    this.queue = new Array<QueueItem<T>>(maxSize)
      .fill({
        key: nanoid(),
        value: nullElementConstructor(),
      })
      .map(() => ({
        key: nanoid(),
        value: nullElementConstructor(),
      }));
    console.log(this.queue);
    this.elementConstructor = nullElementConstructor;
  }

  // Добавление элемента в очередь
  enqueue(item: T): void {
    if (this.size === this.maxSize) {
      console.log('Очередь полна. Невозможно добавить элемент.');
      return;
    }
    this.queue[this.size].value = item;
    this.size++;
  }

  // Удаление элемента из очереди
  dequeue(): T | null {
    if (this.size === 0) {
      console.log('Очередь пуста. Невозможно удалить элемент.');
      return null;
    }
    const item = this.queue[0].value;
    for (let i = 1; i < this.size; i++) {
      this.queue[i - 1].value = this.queue[i].value;
    }
    this.queue[this.size - 1] = {
      key: this.queue[this.size - 1].key,
      value: this.elementConstructor(),
    };
    this.size--;
    return item;
  }

  // Обновление элемента по индексу
  update(number: number, newValue: T): void {
    const itemIndex = this.queue.findIndex((_, index) => number === index);
    this.queue[itemIndex].value = newValue;
  }

  // Возврат элементов очереди в виде массива
  toArray(): QueueItem<T>[] {
    return this.queue.slice(0, this.maxSize);
  }

  // Возврат размера очереди
  length(): number {
    return this.size;
  }

  // Полная очистка очереди
  clear(): void {
    this.queue.map(item => (item.value = this.elementConstructor()));
    this.size = 0;
  }
}

export default Queue;
