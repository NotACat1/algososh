import { nanoid } from 'nanoid';

interface QueueItem<T> {
  key: string;
  value: T;
}

class Queue<T> {
  private queue: QueueItem<T>[];
  private maxSize: number;
  private indexHead: number;
  private size: number;
  private elementConstructor: () => T;

  constructor(maxSize: number, nullElementConstructor: () => T) {
    this.maxSize = maxSize;
    this.indexHead = 0;
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
    this.elementConstructor = nullElementConstructor;
  }

  // Добавление элемента в очередь
  enqueue(item: T): void {
    if (this.indexHead + this.size >= this.maxSize) {
      console.log('Очередь полна. Невозможно добавить элемент.');
      return;
    }
    this.queue[this.indexHead + this.size].value = item;
    this.size++;
  }

  // Удаление элемента из очереди
  dequeue(): T | null {
    if (this.size == 0) {
      console.log('Очередь пуста. Невозможно удалить элемент.');
      return null;
    }
    const item = this.queue[this.indexHead].value;

    this.queue[this.indexHead].value = this.elementConstructor();

    // Вы можете спросить, почему очередь не двигается влево? А я в ответ процитирую ревьюера: "Это будет стек".
    // Вероятно, процессор работает аналогично, каждый раз сбрасывая очередь, чтобы добавить новую задачу.
    //for (let i = 1; i < this.size; i++) {
    //  this.queue[i - 1].value = this.queue[i].value;
    //}
    //this.queue[this.size - 1] = {
    //  key: this.queue[this.size - 1].key,
    //  value: this.elementConstructor(),
    //};

    this.size--;

    if (this.size == 0) {
      this.indexHead = 0;
      this.size = 0;
      return item;
    }

    this.indexHead++;

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

  getIndexHead(): number {
    return this.indexHead;
  }

  getSize(): number {
    return this.size;
  }

  // Полная очистка очереди
  clear(): void {
    this.queue.map(item => (item.value = this.elementConstructor()));
    this.indexHead = 0;
    this.size = 0;
  }
}

export default Queue;
