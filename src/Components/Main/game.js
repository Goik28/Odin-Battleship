export function gameInit(player1, player2) {  
  randomShipPlacement(player2);
  if (Math.floor(Math.random() * 2)) {
    player2.turn = true;    
  } else {
    player1.turn = true;    
  }
}

export function randomShipPlacement(player) {
  const sizes = [5, 4, 3, 3, 2];
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index];
    const col = Math.floor(Math.random() * 9);
    const row = Math.floor(Math.random() * 10) + 1;
    const rotate = Math.floor(Math.random() * 2);
    const coordinate = [column[col] + row];
    if (rotate) {
      if (col + size < 11) {
        for (let index = 1; index < size; index++) {
          const nextCoordinate = coordinate.push(column[col + index] + row);
        }
      }
    } else {
      if (row - size >= 0) {
        for (let index = 1; index < size; index++) {
          const nextCoordinate = coordinate.push(column[col] + (row - index));
        }
      }
    }
    if (!player.gameBoard.placeShip(coordinate)) {
      index--;
    }
  }
}

export function randomAttack(player) {
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  let valid = false;
  let coordinate;
  while (!valid) {
    const col = Math.floor(Math.random() * 9);
    const row = Math.floor(Math.random() * 10) + 1;
    coordinate = column[col] + row;
    valid = player.gameBoard.receiveAttack(coordinate);
  }
  return coordinate;
}
