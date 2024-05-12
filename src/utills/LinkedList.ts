class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addToHead(data: T): void {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  addToTail(data: T): void {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  removeFromHead(): void {
    if (!this.head) return;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.size--;
  }

  removeFromTail(): void {
    if (!this.tail) return;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current?.next !== this.tail) {
        if (current) current = current.next;
      }
      current!.next = null;
      this.tail = current;
    }
    this.size--;
  }

  insertAtIndex(data: T, index: number): void {
    if (index < 0 || index > this.size) return;

    if (index === 0) {
      this.addToHead(data);
    } else if (index === this.size) {
      this.addToTail(data);
    } else {
      const newNode = new Node(data);
      let current = this.head;
      let currentIndex = 0;
      while (currentIndex < index - 1) {
        current = current!.next;
        currentIndex++;
      }
      newNode.next = current!.next;
      current!.next = newNode;
      this.size++;
    }
  }

  removeFromIndex(index: number): void {
    if (index < 0 || index >= this.size) return;

    if (index === 0) {
      this.removeFromHead();
    } else if (index === this.size - 1) {
      this.removeFromTail();
    } else {
      let current = this.head;
      let currentIndex = 0;
      while (currentIndex < index - 1) {
        current = current!.next;
        currentIndex++;
      }
      current!.next = current!.next!.next;
      this.size--;
    }
  }
  
  toArray(): T[] {
    const array: T[] = [];
    let current = this.head;
    while (current) {
      array.push(current.data);
      current = current.next;
    }
    return array;
  }
}

export default LinkedList;
