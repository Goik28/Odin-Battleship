export class Ship {
  coordinates = [];
  sunk;

  constructor(coordinates) {
    this.coordinates = coordinates;
    this.sunk = false;
  }

  hit(coordinate) {
    if (this.coordinates.includes(coordinate)) {
      const pos = this.coordinates.splice(this.coordinates.indexOf(coordinate), 1);
      this.setSunk();
      return pos[0];
    }
    return false;
  }

  getCoordinates() {
    return this.coordinates;
  }

  setSunk() {
    if (this.coordinates == 0) {
      return (this.sunk = true);
    }
    return false;
  }

  isSunk() {
    return this.sunk;
  }
}
