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
      if (this.checkForbiddenCoordinates(value)) {
        return (valid = false);
      }
    });
    return valid;
  }

  checkForbiddenCoordinates(coordinate) {
    const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const forbidden = new Set();
    this.ships.forEach((ship) => {
      const coordinates = ship.getCoordinates();
      coordinates.forEach((coordinate) => {
        forbidden.add(coordinate);
        const col = column.indexOf(coordinate[0]);
        const row = parseInt(coordinate.substring(1));
        if (row < 10) {
          forbidden.add(column[col] + (row + 1));
        }
        if (row < 10 && col < 9) {
          forbidden.add(column[col + 1] + (row + 1));
        }
        if (col < 9) {
          forbidden.add(column[col + 1] + row);
        }
        if (col < 9 && row > 1) {
          forbidden.add(column[col + 1] + (row - 1));
        }
        if (row > 1) {
          forbidden.add(column[col] + (row - 1));
        }
        if (row > 1 && col > 0) {
          forbidden.add(column[col - 1] + (row - 1));
        }
        if (col > 0) {
          forbidden.add(column[col - 1] + row);
        }
        if (col > 0 && row < 10) {
          forbidden.add(column[col - 1] + (row + 1));
        }
      });
    });
    return forbidden.has(coordinate);
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
