/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.isAllShipsSunk = false;
    this.attacks = [];
    this.missedAttacks = [];
    this.grid = [];
    this.ships = [];
    for (let i = 0; i < 10; i++) {
      this.grid.push(new Array(10));
    }
  }

  placeShip(x, y, len, id) {
    if (len === 0) return null;
    this.grid[x][y] = {
      id,
      next: this.placeShip(x, y + 1, len - 1, id),
    };
    return this.grid[x][y];
  }

  receiveAttack(x, y) {
    this.attacks.push([x, y]);
    if (this.grid[x][y] === undefined) this.missedAttacks.push([x, y]);
    else {
      this.ships.forEach((el) => {
        if (el.id === this.grid[x][y].id) el.hit();
      });
    }

    if (this.ships.every((obj) => obj.isSunk())) this.isAllShipsSunk = true;
  }

  getGrid() {
    return this.grid;
  }
}
