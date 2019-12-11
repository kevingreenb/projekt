import { Node } from "./Node";
export class Structure {
  constructor() {
    this.size = 0;
    this.bottom = null;
    this.top = null;
  }

  insert(value) {
    this.size++;
    return null;
  }
  remove() {
    this.size--;
    return null;
  }
  getSize() {
    return this.size;
  }
  getBottom() {
    return this.bottom;
  }
  getTop() {
    return this.top;
  }
  setSize(value) {
    this.size = value;
  }
  setBottom(value) {
    this.bottom = new Node(value);
  }
  setTop(value) {
    this.top = new Node(value);
  }
}
