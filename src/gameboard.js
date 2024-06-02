/* eslint-disable no-else-return */
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

  placeShip(x, y, len, id, direction) {
    if (len === 0) return null;
    this.grid[x][y] = {
      elementNum: 10 * x + y,
      shipInfo: {
        id,
        next:
          direction === "x"
            ? this.placeShip(x, y + 1, len - 1, id, direction)
            : this.placeShip(x + 1, y, len - 1, id, direction),
      },
    };
    return this.grid[x][y];
  }

  isClose(x, y, length, direction) {
    if (length < 1) return false;
    else if (this.grid[x][y] !== undefined) return true;
    else
      return direction === "x"
        ? this.isClose(x, y + 1, length - 1, direction)
        : this.isClose(x + 1, y, length - 1, direction);
  }

  createShip(x, y, ship, direction = "x") {
    if (direction === "x" && y + ship.length > 9) {
      y = 10 - ship.length;
    } else if (direction === "y" && 10 * x + y - 10 + ship.length * 10 > 90) {
      x = 10 - ship.length;
    }
    // const isClose = this.isClose(x, y, ship.length, direction);
    // console.log(isClose);
    // if (isClose) {
    //   if(direction === 'x') this.createShip(x + 1, )
    // } else {
    // eslint-disable-next-line no-param-reassign
    ship.head = this.placeShip(x, y, ship.length, ship.id, direction);
    this.ships.push(ship);
    this.placeShipDOM(x, y, ship.head, direction);
    // }
  }

  receiveAttack(x, y) {
    this.attacks.push([x, y]);
    if (this.grid[x][y] === undefined) this.missedAttacks.push([x, y]);
    else {
      this.ships.forEach((el) => {
        if (el.id === this.grid[x][y].shipInfo.id) {
          el.hit();
        }
      });
    }

    if (this.ships.every((obj) => obj.isSunk())) this.isAllShipsSunk = true;
  }

  // eslint-disable-next-line class-methods-use-this
  hitOnDOM(elements, gb, i) {
    const f = i;
    const x = Math.floor(f / 10);
    const y = f % 10;
    const grid = gb.getGrid();
    console.log(grid[x][y]);
    if (grid[x][y] !== undefined && !elements[f].classList.contains("hit")) {
      elements[f].classList.add("hit");
      elements[f].disabled = true;
      this.receiveAttack(x, y);
    } else {
      console.log("missed the attack");
    }
  }

  renderGrid() {
    let inHtml = "";
    for (let i = 0; i < 100; i++) {
      inHtml += "<div></div>";
    }
    this.map.innerHTML += inHtml;
  }

  placeShipDOM(x, y, next, direction) {
    if (next === null) return next;
    const elements = this.map.children;
    elements[this.grid[x][y].elementNum].id = "ship";
    if (direction === "x") y++;
    else if (direction === "y") x++;
    return this.placeShipDOM(x, y, next.shipInfo.next, direction);
  }

  getGrid() {
    return this.grid;
  }

  getShips() {
    return this.ships;
  }
}
