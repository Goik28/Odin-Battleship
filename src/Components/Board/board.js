import { Ship } from "../Ship/ship";

export class Gameboard {
  owner;
  ships = [];
  missedAttacks = [];

  constructor(owner) {
    this.owner = owner;
  }

  placeShip(coordinates) {
    const ship = new Ship(coordinates);
    this.ships.push(ship);
  }

  receiveAttack(coordinates) {
    this.ships.forEach((element) => {});
  }
}
