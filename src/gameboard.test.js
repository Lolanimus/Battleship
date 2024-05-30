/* eslint-disable no-undef */
import Gameboard from "./gameboard";
import Ship from "./ship";

test("does receiveAttack() records attacks", () => {
  const gb1 = new Gameboard();
  const x = 0;
  const y = 0;
  const gb1attacks = gb1.attacks;
  gb1.receiveAttack(x, y);
  expect(gb1attacks).toStrictEqual([[x, y]]);
});

test("does receiveAttack() work(records missed attacks)", () => {
  const gb1 = new Gameboard();
  const x = 0;
  const y = 0;
  const gb1missed = gb1.missedAttacks;
  const newShip = new Ship(3);
  gb1.placeShip(x, y, newShip.length, newShip);
  gb1.receiveAttack(x, y);
  gb1.receiveAttack(x + 1, y + 2);
  expect(gb1missed).toStrictEqual([[x + 1, y + 2]]);
});

test("does receiveAttack() work(hit() when an attack hit the ship)", () => {
  const gb1 = new Gameboard();
  const x = 0;
  const y = 0;
  const newShip = new Ship(3, 0);
  gb1.placeShip(x, y, newShip.length, newShip.id);
  gb1.ships.push(newShip);
  gb1.receiveAttack(x, y);
  gb1.receiveAttack(x + 1, y + 1);
  expect(newShip.hitTimes).toStrictEqual(1);
});

test("does receiveAttack() work(isAllShipsSunk)", () => {
  const gb1 = new Gameboard();
  const x = 0;
  const y = 0;
  const ship1 = new Ship(1, 0);
  const ship2 = new Ship(1, 0);
  gb1.placeShip(x, y, ship1.length, ship1.id);
  gb1.ships.push(ship1);
  gb1.placeShip(x + 1, y + 1, ship2.length, ship2.id);
  gb1.ships.push(ship2);
  gb1.receiveAttack(x, y);
  gb1.receiveAttack(x + 1, y + 1);
  expect(gb1.isAllShipsSunk).toStrictEqual(true);
});

test("createShip works", () => {
  const gb1 = new Gameboard();
  const x = 0;
  const y = 0;
  const ship30 = new Ship(3, 0);
  gb1.createShip(x, y, ship30);
  const formula = x === 0 ? 10 * x + y : 10 * (x - 1) + y;
  expect(gb1.getGrid()[x][y]).toStrictEqual({
    shipInfo: {
      id: ship30.id,
      next: gb1.getGrid()[x][y + 1],
    },
    elementNum: formula,
  });
});
