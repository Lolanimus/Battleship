/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */

import Gameboard from "./gameboard";

document.body.innerHTML = `<div id="wrapper"><div id="myDiv"><h2>Your map</h2><div class="map" id="myMap"></div><button id="playBtn">Play</button></div><div id="opponentDiv"><h2>Opponent's map</h2><div class="map" id="opponentMap"></div></div></div>`;

test("renders a grid on a map", () => {
  const myMap = document.getElementById("myMap");
  const gb1 = new Gameboard(myMap);
  console.log(myMap);
  gb1.renderGrid();
  let inHtml = "";
  for (let i = 0; i < 100; i++) {
    inHtml += "<div></div>";
  }
  expect(myMap.innerHTML).toBe(inHtml);
});
