export class Ship {
  length = [];
  sunk;

  constructor(coordinates) {
    this.length = coordinates;
    this.sunk = false;
  }

  hit(coordinate) {
    if (this.length.includes(coordinate)) {
      const pos = this.length.splice(this.length.indexOf(coordinate), 1);
      this.setSunk();
      return pos[0];
    }
    return false;
  }

  getLength() {
    return this.length;
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
