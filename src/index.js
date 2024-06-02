import "./index.css";
import Player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";

const myMap = document.getElementById("myContainers");
const opponentMap = document.getElementById("opponentContainers");

const me = new Player("real", new Gameboard(myMap));
const opponent = new Player("computer", new Gameboard(opponentMap));

const meGb = me.getGameboard();
meGb.renderGrid();

const opponentGb = opponent.getGameboard();
opponentGb.renderGrid();

const myShip40 = new Ship(4, 0);
const myShip30 = new Ship(3, 0);
const myShip31 = new Ship(3, 1);
const myShip20 = new Ship(2, 0);
const myShip21 = new Ship(2, 1);
const myShip22 = new Ship(2, 2);
const myShip10 = new Ship(1, 0);
const myShip11 = new Ship(1, 1);
const myShip12 = new Ship(1, 2);
const myShip13 = new Ship(1, 3);

meGb.createShip(0, 4, myShip40, "y");
meGb.createShip(0, 0, myShip30);
meGb.createShip(2, 0, myShip31, "y");
meGb.createShip(1, 6, myShip20);
meGb.createShip(6, 1, myShip21, "y");
meGb.createShip(8, 6, myShip22);
meGb.createShip(9, 9, myShip10);
meGb.createShip(5, 5, myShip11);
meGb.createShip(4, 7, myShip12);
meGb.createShip(8, 4, myShip13);

const opponentShip40 = new Ship(4, 0);
const opponentShip30 = new Ship(3, 0);
const opponentShip31 = new Ship(3, 1);
const opponentShip20 = new Ship(2, 0);
const opponentShip21 = new Ship(2, 1);
const opponentShip22 = new Ship(2, 2);
const opponentShip10 = new Ship(1, 0);
const opponentShip11 = new Ship(1, 1);
const opponentShip12 = new Ship(1, 2);
const opponentShip13 = new Ship(1, 3);

opponentGb.createShip(9, 9, opponentShip10);
opponentGb.createShip(5, 5, opponentShip11);
opponentGb.createShip(4, 7, opponentShip12);
opponentGb.createShip(8, 4, opponentShip13);
opponentGb.createShip(1, 6, opponentShip20);
opponentGb.createShip(6, 1, opponentShip21, "y");
opponentGb.createShip(8, 6, opponentShip22);
opponentGb.createShip(0, 0, opponentShip30);
opponentGb.createShip(2, 0, opponentShip31, "y");
opponentGb.createShip(0, 4, opponentShip40, "y");

// attack funcitonality
const opponentElements = opponentMap.querySelectorAll("div");
const myElements = myMap.querySelectorAll("div");

// myElements.forEach((el, i) => {
//   el.addEventListener("click", () => meGb.hitOnDOM(myElements, meGb, i));
// });

opponentElements.forEach((el, i) => {
  el.addEventListener("click", () => {
    opponentGb.hitOnDOM(opponentElements, opponentGb, i);
  });
});

// drag and drop functionality
// ---------------------------
// if a ship is at the borders of another one or intersects with another one,
// then place that ship somewhere close to that neighbour ship but far away from
// it at least by one box
// -----------------------------------------------------------------------------
