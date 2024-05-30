export default class Ship {
  constructor(length, id) {
    this.head = null;
    if (length > 4) this.length = 4;
    else if (length < 1) this.length = 1;
    else this.length = length;
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
