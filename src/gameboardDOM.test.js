/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */

import Gameboard from "./gameboard";
import Ship from "./ship";

document.body.innerHTML = `<div id="wrapper"><div id="myDiv"><h2>Your map</h2><div class="map" id="myMap"></div><button id="playBtn">Play</button></div><div id="opponentDiv"><h2>Opponent's map</h2><div class="map" id="opponentMap"></div></div></div>`;

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

test("places a ship DOM", () => {
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
