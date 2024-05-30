/* eslint-disable no-param-reassign */
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */

/**
 * @jest-environment jsdom
 */

export default class Gameboard {
  constructor(map) {
    this.map = map;
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
      elementNum: 10 * x + y, // [5][5] => 45
      shipInfo: {
        id,
        next: this.placeShip(x, y + 1, len - 1, id),
      },
    };
    return this.grid[x][y];
  }

  createShip(x, y, ship) {
    // eslint-disable-next-line no-param-reassign
    ship.head = this.placeShip(x, y, ship.length, ship.id);
    this.ships.push(ship);
    this.placeShipDOM(x, y, ship.head);
  }

  receiveAttack(x, y) {
    this.attacks.push([x, y]);
    if (this.grid[x][y] === undefined) this.missedAttacks.push([x, y]);
    else {
      this.ships.forEach((el) => {
        console.log(el);
        if (el.id === this.grid[x][y].shipInfo.id) {
          el.hit();
        }
      });
    }

    if (this.ships.every((obj) => obj.isSunk())) this.isAllShipsSunk = true;
  }

  renderGrid() {
    let inHtml = "";
    for (let i = 0; i < 100; i++) {
      inHtml += "<div id='null'></div>";
    }
    this.map.innerHTML += inHtml;
  }

  placeShipDOM(x, y, next) {
    if (next === null) return next;
    const elements = this.map.children;
    elements[this.grid[x][y].elementNum].id = "ship";
    y++;
    return this.placeShipDOM(x, y, next.shipInfo.next);
  }

  getGrid() {
    return this.grid;
  }
}
