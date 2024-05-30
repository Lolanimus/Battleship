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
