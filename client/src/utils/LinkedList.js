import { Structure } from "./Structure";

export class LinkedList extends Structure {
  constructor() {
    super();
    this.type = "stack";
  }
  insert(value, index = 0) {
    if (index > this.size || index < 0) return null;
    let newNode = new Node(value);
    if (index === 0) {
      this.top = newNode;
      this.bottom = newNode;
    } else if (index === this.size) {
      this.bottom.next = newNode;
      this.bottom = newNode;
    } else {
      let previous = this.top;
      let current = this.top.next;
      for (let i = 1; i < index; i++) {
        previous = current;
        current = current.next;
      }
      newNode.next = current;
      previous.next = newNode;
    }
    this.size++;
    return this.top;
  }
  remove(value) {
    let current = this.top;
    let previous = null;
    for (let i = 0; i < this.size; i++) {
      if (current.value === value) {
        if (i === 0) {
          this.top = this.top.next;
        } else if (this.size === 1) {
          this.top = null;
          this.botttom = null;
        } else {
          previous.next = current.next;
        }
        this.size--;
        return current.value;
      } else {
        previous = current;
        current = current.next;
      }
    }
    if (current) {
      if (current.value === value) {
        previous.next = current.next;
        this.size--;
        return current.value;
      }
    }
    return null;
  }
}
