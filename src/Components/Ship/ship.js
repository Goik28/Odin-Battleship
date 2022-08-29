export class Ship {
  length = [];
  sunk;

  constructor(coordinates) {
    this.length = coordinates;
    this.sunk = false;
  }

  hit(coordinate) {
    if (this.length.includes(coordinate)) {
      const pos = this.length.indexOf(coordinate);
      return this.length.splice(pos, 1);
    }
    return false;
  }

  setSunk() {
    if (this.length == 0) {
      return (this.sunk = true);
    }
    return false;
  }

  isSunk() {
    return this.sunk;
  }
}
