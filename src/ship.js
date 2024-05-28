export default class Ship {
  constructor(length, id) {
    this.head = null;
    this.length = length;
    this.hitTimes = 0;
    this.id = id;
    this.id = [length - 1, id];
  }

  hit() {
    this.hitTimes += 1;
  }

  isSunk() {
    return this.hitTimes === this.length;
  }
}
