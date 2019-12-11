import { Structure } from "./Structure";
import { Node } from "./Node";
export class Stack extends Structure {
  constructor() {
    super();
    this.type = "stack";
  }
  insert(value) {
    let newNode = new Node(value);
    if (this.size < 1) {
      this.bottom = newNode;
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.size++;
    return this;
  }
  remove() {
    if (this.size < 1) return null;
    var temp = this.top;
    if (this.size === 1) {
      this.last = null;
    }
    this.top = this.top.next;
    this.size--;
    return temp;
  }
}
