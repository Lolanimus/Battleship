/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */

import Gameboard from "./gameboard";
import Ship from "./ship";

document.body.innerHTML = `<div id="wrapper">
      <div id="myDiv">
        <h2>Your map</h2>
        <div class="map" id="myMap">
          <div class="lettersTable">
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>
            <div>E</div>
            <div>F</div>
            <div>G</div>
            <div>H</div>
            <div>I</div>
            <div>J</div>
          </div>
          <div id="myContainers" class="containers"></div>
          <div class="numTable">
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
        <button id="playBtn">Play</button>
      </div>
      <div id="opponentDiv">
        <h2>Opponent's map</h2>
        <div class="map" id="opponentMap">
          <div class="lettersTable">
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>
            <div>E</div>
            <div>F</div>
            <div>G</div>
            <div>H</div>
            <div>I</div>
            <div>J</div>
          </div>
          <div id="opponentContainers" class="containers"></div>
          <div class="numTable">
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
      </div>
    </div>`;

test("renders a grid on a map", () => {
  const myMap = document.getElementById("myContainers");
  const gb1 = new Gameboard(myMap);
  gb1.renderGrid();
  let inHtml = "";
  for (let i = 0; i < 100; i++) {
    inHtml += "<div></div>";
  }
  expect(myMap.innerHTML).toBe(inHtml);
});

test("places a ship DOM(x direction)", () => {
  const myMap = document.getElementById("myContainers");
  const gb1 = new Gameboard(myMap);
  const ship30 = new Ship(6, 0);
  const ship31 = new Ship(3, 1);
  gb1.renderGrid();
  gb1.createShip(0, 0, ship30);
  gb1.createShip(0, 0, ship31);
  gb1.placeShipDOM(0, 0, ship30.head);
  expect(myMap.children).toBe(true);
});

test("places a ship DOM(y direction)", () => {
  const myMap = document.getElementById("myContainers");
  const gb1 = new Gameboard(myMap);
  const ship30 = new Ship(3, 0);
  gb1.renderGrid();
  gb1.createShip(0, 0, ship30, "y");
  expect(myMap.children[0].id).toBe("ship");
  expect(myMap.children[10].id).toBe("ship");
  expect(myMap.children[20].id).toBe("ship");
});

test("placeShip places a ship within boundaries", () => {
  const myMap = document.getElementById("myContainers");
  const gb1 = new Gameboard(myMap);
  const x = 0;
  const y = 9;
  const ship30 = new Ship(3, 0);
  gb1.renderGrid();
  gb1.createShip(x, y, ship30);
  expect(gb1.getGrid()).toBe(90);
});

test("placeShip automatically places a ship at least one box away from its neighbour(if the ship was meant to be place really close to its neighbour or intersect it)", () => {
  const myMap = document.getElementById("myContainers");
  const gb1 = new Gameboard(myMap);
  const x = 0;
  const y = 0;
  const ship30 = new Ship(3, 0);
  const ship31 = new Ship(3, 1);
  gb1.renderGrid();
  gb1.createShip(x, y, ship30);
  gb1.createShip(x, y, ship31);
  expect(gb1.getGrid()[1]).toBe(new Array(10));
});

test("drag and drop", () => {
  const myMap = document.getElementById("myContainers");
  const elements = myMap.children;
  const gb1 = new Gameboard(myMap);
  const x = 0;
  const y = 0;
  const ship30 = new Ship(3, 0);
  const ship31 = new Ship(3, 1);
  gb1.renderGrid();
  gb1.createShip(x, y, ship30);
  gb1.createShip(x + 2, y, ship31);
  elements[0].addEventListener("onmousedown", gb1.drag(elements[0]));
  gb1.drag(elements[0]);
  expect(elements[0].style.backgroundColor).toBe("black");
});

test("hits on DOM", () => {
  // document.body.innerHTML = `<div class="map" id="myMap"><div id="myContainers" class="containers"></div></div>`;
  const myContainers = document.getElementById("myContainers");
  const meGb = new Gameboard(myContainers);
  meGb.renderGrid();

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

  const myElements = myContainers.querySelectorAll("div");

  meGb.hitOnDOM(myElements, meGb, 1);
  expect(myElements[1].className).toBe("hit");

  meGb.hitOnDOM(myElements, meGb, 12);
  expect(myElements[12]).toBe(true);
});
