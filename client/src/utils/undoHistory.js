class UndoHistory {
  #projects = [];

  push(value) {
    this.#projects.push(value);
  }
  undo() {
    return this.#projects.pop();
  }
}

const undoHistory = new UndoHistory();
// let test = new UndoHistory();
// test.push(12312);
// console.log(test.undo());

export default undoHistory;
