import { Ship } from "../Ship/ship.js";

export class GameBoard {
  ships = [];
  missedAttacks = [];
  rightAttacks = [];

  placeShip(coordinates) {
    if (this.validateShipPlacement(coordinates)) {
      const ship = new Ship(coordinates);
      this.ships.push(ship);
      return true;
    } else {
      return false;
    }
  }

  validateShipPlacement(coordinates) {
    let valid = true;
    if (coordinates.length == 0) {
      return (valid = false);
    }
    coordinates.forEach((value) => {
      this.ships.forEach((element) => {
        if (element.getCoordinates().includes(value)) {
          return (valid = false);
        }
      });
    });
    return valid;
  }

  receiveAttack(coordinate) {
    if (!this.validateAttack(coordinate)) {
      return false;
    }
    let missed = true;
    this.ships.forEach((element) => {
      if (element.hit(coordinate)) {
        this.rightAttacks.push(coordinate);
        return (missed = false);
      }
    });
    if (missed) {
      this.missedAttacks.push(coordinate);
    }
  }

  validateAttack(coordinate) {
    if (
      this.rightAttacks.includes(coordinate) ||
      this.missedAttacks.includes(coordinate)
    ) {
      return false;
    }
    return true;
  }

  getMissedAttacks() {
    return this.missedAttacks;
  }

  getRightAttacks() {
    return this.rightAttacks;
  }

  noShipLeft() {
    return this.ships.every((value) => {
      return value.isSunk();
    });
  }

  getShipAmount() {
    return this.ships.length;
  }
}
