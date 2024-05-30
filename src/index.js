import "./index.css";
import Player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";

console.log("kek");

const myMap = document.getElementById("myMap");
const opponentMap = document.getElementById("opponentMap");

console.log(myMap);

const me = new Player("real", new Gameboard(myMap));
const opponent = new Player("computer", new Gameboard(opponentMap));

const meGb = me.getGameboard();
meGb.renderGrid();

const opponentGb = opponent.getGameboard();
opponentGb.renderGrid();

const myShip30 = new Ship(3, 0);
meGb.createShip(0, 0, myShip30);
