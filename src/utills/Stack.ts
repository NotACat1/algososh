class Stack<T> {
  private items: T[];

  constructor(elements: T[] = []) {
    this.items = [...elements];
  }

  // Добавление элемента в стек
  push(element: T): void {
    this.items.push(element);
  }

  // Удаление элемента из стека
  pop(): T | undefined {
    return this.items.pop();
  }

  // Возвращаем массив элементов стека
  getStack(): T[] {
    return this.items;
  }

  // Очистка стека
  clear(): void {
    this.items = [];
  }
}

export default Stack;
