export default class Player {
  constructor(type, gameboard) {
    this.type = type;
    this.gameboard = gameboard;
  }

  getGameboard() {
    return this.gameboard;
  }
}
