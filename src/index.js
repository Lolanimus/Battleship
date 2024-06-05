/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import "./index.css";
import Player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";

const myMap = document.getElementById("myContainers");
const opponentMap = document.getElementById("opponentContainers");
const me = new Player("real", new Gameboard(myMap));
const meGb = me.getGameboard();

const opponent = new Player("computer", new Gameboard(opponentMap));
const opponentGb = opponent.getGameboard();

let opponentElements = opponentMap.querySelectorAll("button");
let myElements = myMap.querySelectorAll("button");
const restart = document.getElementById("restart");
const restartButton = document.getElementById("playBtn");
const placeShipsBtn = document.getElementById("placeShips");
const gameStatus = document.getElementById("gameStatus");
const coordDialog = document.getElementById("coordDialog");
const submitFormBtn = document.getElementById("submitFormBtn");
const coordsDefault = {
  40: {
    x: 0,
    y: 4,
    dir: "y",
  },
  30: {
    x: 0,
    y: 0,
    dir: "x",
  },
  31: {
    x: 2,
    y: 0,
    dir: "y",
  },
  20: {
    x: 1,
    y: 6,
    dir: "x",
  },
  21: {
    x: 6,
    y: 1,
    dir: "y",
  },
  22: {
    x: 8,
    y: 6,
    dir: "x",
  },
  10: {
    x: 9,
    y: 9,
    dir: "x",
  },
  11: {
    x: 5,
    y: 5,
    dir: "x",
  },
  12: {
    x: 4,
    y: 7,
    dir: "x",
  },
  13: {
    x: 8,
    y: 4,
    dir: "x",
  },
};
function startGame(coords) {
  if (coords === undefined) coords = coordsDefault;
  meGb.renderGrid();
  opponentGb.renderGrid();
  opponentElements = opponentMap.querySelectorAll("button");
  myElements = myMap.querySelectorAll("button");

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

  meGb.createShip(coords[40].x, coords[40].y, myShip40, coords[40].dir);
  meGb.createShip(coords[30].x, coords[30].y, myShip30, coords[30].dir);
  meGb.createShip(coords[31].x, coords[31].y, myShip31, coords[31].dir);
  meGb.createShip(coords[20].x, coords[20].y, myShip20, coords[20].dir);
  meGb.createShip(coords[21].x, coords[21].y, myShip21, coords[21].dir);
  meGb.createShip(coords[22].x, coords[22].y, myShip22, coords[22].dir);
  meGb.createShip(coords[10].x, coords[10].y, myShip10, coords[10].dir);
  meGb.createShip(coords[11].x, coords[11].y, myShip11, coords[11].dir);
  meGb.createShip(coords[12].x, coords[12].y, myShip12, coords[12].dir);
  meGb.createShip(coords[13].x, coords[13].y, myShip13, coords[13].dir);

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
}

startGame();

// attack funcitonality
let compHistory = [];

function attack(type, i) {
  // eslint-disable-next-line no-param-reassign
  if (type === "computer") {
    i = Math.floor(Math.random() * 100);
    let isRepeated = false;
    compHistory.forEach((el) => {
      if (el === i) isRepeated = true;
    });
    console.log(compHistory);
    console.log(isRepeated);
    if (isRepeated) attack("computer");
    else {
      compHistory.push(i);
      meGb.hitOnDOM(myElements, meGb, i);
    }
  } else {
    opponentGb.hitOnDOM(opponentElements, opponentGb, i);
  }
}

for (let i = 0; i < 95; i++) {
  attack("computer");
}

function listenForAttacks() {
  opponentElements.forEach((el, i) => {
    el.addEventListener("click", () => {
      if (!opponentGb.isAllShipsSunk && !meGb.isAllShipsSunk) {
        attack("real", i);
        if (opponentGb.isAllShipsSunk) {
          gameStatus.innerHTML = "You Won!";
          el.replaceWith(el.cloneNode(true));
          restart.style.display = "flex";
        } else {
          if (compHistory.length < 100) attack("computer");
          if (meGb.isAllShipsSunk) {
            gameStatus.innerHTML = "You lost!";
            restart.style.display = "flex";
            el.replaceWith(el.cloneNode(true));
          }
        }
      }
    });
  });
}

function restartGame(coords) {
  gameStatus.innerHTML = "Game in progress...";
  compHistory = [];
  opponentGb.restart();
  meGb.restart();
  opponentMap.innerHTML = "";
  opponentGb.renderGrid();
  myMap.innerHTML = "";
  meGb.renderGrid();
  startGame(coords);
  restart.style.display = "none";
  listenForAttacks();
}

listenForAttacks();

restartButton.addEventListener("click", () => restartGame());

placeShipsBtn.addEventListener("click", () => {
  coordDialog.showModal();
});

function createCoordObj(formDivs) {
  const output = {};
  for (let i = 0; i < 10; i++) {
    const id = formDivs[i].id.substr(0, 2);
    output[id] = {
      dir: formDivs[i].value,
    };
  }
  console.log(formDivs.length);
  const coordsFormDivs = formDivs.slice(10, formDivs.length + 1);
  console.log(coordsFormDivs);
  for (let j = 0; j < coordsFormDivs.length; j += 2) {
    const part = coordsFormDivs.slice(j, j + 2);
    console.log(part);
    const id = part[0].id.substr(0, 2);
    output[id].x = part[0].value;
    output[id].y = part[1].value;
    console.log(output);
  }
  return output;
}

const form = document.querySelector("form");
const firstPart = document.getElementById("firstDiv");
const secondPart = document.getElementById("secondDiv");
let firstDirPartDivs = firstPart.querySelectorAll("select");
let secondDirPartDivs = secondPart.querySelectorAll("select");
let firstCoordsPartDivs = firstPart.querySelectorAll("input");
let secondCoordsPartDivs = firstPart.querySelectorAll("input");
let formDivs = Array.from(firstDirPartDivs)
  .concat(Array.from(secondDirPartDivs))
  .concat(Array.from(firstCoordsPartDivs))
  .concat(Array.from(secondCoordsPartDivs));
console.log(formDivs);
const cancelFormBtn = document.getElementById("cancelFormBtn");
let inputCoord;

formDivs.forEach((el) => {
  console.log(el);
  el.addEventListener("input", (e) => {
    if (el.validity.rangeUnderflow) {
      e.preventDefault();
      el.setCustomValidity("The coordinate cannot be a negative value");
    } else if (el.validity.rangeOverflow) {
      e.preventDefault();
      el.setCustomValidity("The coordinate cannot be more than 9");
    } else {
      el.setCustomValidity("");
    }
  });
});

form.addEventListener("submit", () => {
  firstDirPartDivs = firstPart.querySelectorAll("select");
  secondDirPartDivs = secondPart.querySelectorAll("select");
  firstCoordsPartDivs = firstPart.querySelectorAll("input");
  secondCoordsPartDivs = secondPart.querySelectorAll("input");

  formDivs = Array.from(firstDirPartDivs)
    .concat(Array.from(secondDirPartDivs))
    .concat(Array.from(firstCoordsPartDivs))
    .concat(Array.from(secondCoordsPartDivs));

  inputCoord = createCoordObj(formDivs);
  console.log(inputCoord);
  restartGame(inputCoord);
});

cancelFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  coordDialog.close();
});
// drag and drop functionality
// ---------------------------
// if a ship is at the borders of another one or intersects with another one,
// then place that ship somewhere close to that neighbour ship but far away from
// it at least by one box
// -----------------------------------------------------------------------------
