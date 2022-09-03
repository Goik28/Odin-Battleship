import html from "./placeShips.html";
import "./placeShips.css";

let playerPlacing;

export function callPlaceShips(board, player) {
  const placeShipModal = document.createElement("div");
  placeShipModal.className = "placeShip_Modal";
  const placeShipBoard = document.createElement("div");
  placeShipBoard.innerHTML = html;
  placeShipBoard.classList.add("placeShip_Board");
  const boardMirror = board.cloneNode(true);
  placeShipBoard
    .getElementsByClassName("game_Boards")[0]
    .replaceWith(boardMirror);
  placeShipModal.appendChild(placeShipBoard);
  const cancelButton = placeShipBoard.querySelector("#ships_Cancel");
  cancelButton.addEventListener("click", cancelButtonHandler);
  const resetButton = placeShipBoard.querySelector("#ships_Reset");
  resetButton.addEventListener("click", resetButtonHandler);
  const confirmButton = placeShipBoard.querySelector("#ships_Confirm");
  confirmButton.addEventListener("click", confirmButtonHandler);
  playerPlacing = player;
  startPlacement(placeShipBoard);
  return placeShipModal;
}

function startPlacement(container) {
  changeShipText(container);
  addCellEvents(container);
}

function shipTypes(type) {
  switch (type) {
    case 1:
      return { name: "Cruiser", size: 5 };
    case 2:
      return { name: "Battleship", size: 4 };
    case 3:
      return { name: "Destroyer", size: 3 };
    case 4:
      return { name: "Submarine", size: 3 };
    case 5:
      return { name: "Patrol Boat", size: 2 };
    default:
      return null;
  }
}

function addCellEvents(container) {
  let cells = container.getElementsByClassName("player1_Board")[0];
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  for (let col = 0; col < 10; col++) {
    for (let row = 1; row <= 10; row++) {
      const cell = cells.querySelector("#" + column[col] + "" + row);
      cell.addEventListener("mouseenter", mouseEnterHandler);
      cell.addEventListener("mouseleave", mouseLeaveHandler);
      cell.addEventListener("click", mouseClickHandler);
    }
  }
}

function removeCellEvents(container) {
  let cells = container.getElementsByClassName("player1_Board")[0];
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  for (let col = 0; col < 10; col++) {
    for (let row = 1; row <= 10; row++) {
      const cell = cells.querySelector("#" + column[col] + "" + row);
      cell.removeEventListener("mouseenter", mouseEnterHandler);
      cell.removeEventListener("mouseleave", mouseLeaveHandler);
      cell.removeEventListener("click", mouseClickHandler);
    }
  }
}

function mouseEnterHandler(e) {
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const cell = e.target;
  const cells = cell.parentElement;
  const col = column.indexOf(cell.id[0]);
  const row = parseInt(cell.id.substring(1));
  let ship = shipTypes(playerPlacing.gameBoard.getShipAmount() + 1);
  let rotate = document.getElementById("ships_Hor").checked;
  if (
    !cell.classList.contains("placed") &&
    !cell.classList.contains("forbidden")
  ) {
    if (rotate) {
      if (col + ship.size < 11) {
        cell.classList.add("marked");
        for (let index = 1; index < ship.size; index++) {
          cells
            .querySelector("#" + column[col + index] + "" + row)
            .classList.add("marked");
        }
      }
    } else {
      if (row - ship.size >= 0) {
        cell.classList.add("marked");
        for (let index = 1; index < ship.size; index++) {
          cells
            .querySelector("#" + column[col] + "" + (row - index))
            .classList.add("marked");
        }
      }
    }
  }
}

function mouseLeaveHandler(e) {
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const cell = e.target;
  const cells = cell.parentElement;
  const col = column.indexOf(cell.id[0]);
  const row = parseInt(cell.id.substring(1));
  let ship = shipTypes(playerPlacing.gameBoard.getShipAmount() + 1);
  let rotate = document.getElementById("ships_Hor").checked;
  if (
    !cell.classList.contains("placed") &&
    !cell.classList.contains("forbidden")
  ) {
    if (rotate) {
      if (col + ship.size < 11) {
        cell.classList.remove("marked");
        for (let index = 1; index < ship.size; index++) {
          cells
            .querySelector("#" + column[col + index] + "" + row)
            .classList.remove("marked");
        }
      }
    } else {
      if (row - ship.size >= 0) {
        cell.classList.remove("marked");
        for (let index = 1; index < ship.size; index++) {
          cells
            .querySelector("#" + column[col] + "" + (row - index))
            .classList.remove("marked");
        }
      }
    }
  }
}

function mouseClickHandler(e) {
  const cells = e.target.parentElement;
  const placedShip = Array.from(cells.getElementsByClassName("marked"));
  if (
    !placedShip.every((value) => {
      if (
        !value.classList.contains("placed") &&
        !value.classList.contains("forbidden")
      ) {
        return true;
      }
    })
  ) {
    return;
  }
  const placedShipCoord = [];
  placedShip.forEach((element) => {
    placedShipCoord.push(element.id);
  });
  if (playerPlacing.gameBoard.placeShip(placedShipCoord)) {
    playerPlacing.gameBoard.placeShip(placedShipCoord);
    placedShip.forEach((element) => {
      element.classList.add("placed");
      element.classList.remove("marked");
    });
    forbidSquares(document.getElementsByClassName("placeShip_Board")[0]);
    changeShipText(document.getElementsByClassName("placeShip_Board")[0]);
  }
  if (playerPlacing.gameBoard.getShipAmount() == 5) {
    removeCellEvents(document.getElementsByClassName("placeShip_Board")[0]);
    document.getElementById("ships_Reset").disabled = false;
    document.getElementById("ships_Confirm").disabled = false;
  }
}

function changeShipText(container) {
  let ship = shipTypes(playerPlacing.gameBoard.getShipAmount() + 1);
  const description = container.getElementsByClassName("ships_Description")[0];
  if (ship) {
    description.textContent = `Place ${ship.name} - ${ship.size} squares`;
  } else {
    description.textContent = "Placement is over";
  }
}

function forbidSquares(container) {
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const placedShip = Array.from(container.getElementsByClassName("placed"));
  placedShip.forEach((cell) => {
    const col = column.indexOf(cell.id[0]);
    const row = parseInt(cell.id.substring(1));
    if (row < 10) {
      const adjCell = container.querySelector("#" + column[col] + (row + 1));
      if (!adjCell.classList.contains("placed")) {
        adjCell.classList.add("forbidden");
      }
    }
    if (row < 10 && col < 9) {
      const adjCell = container.querySelector(
        "#" + column[col + 1] + (row + 1)
      );
      if (!adjCell.classList.contains("placed")) {
        adjCell.classList.add("forbidden");
      }
    }
    if (col < 9) {
      const adjCell = container.querySelector("#" + column[col + 1] + row);
      if (!adjCell.classList.contains("placed")) {
        adjCell.classList.add("forbidden");
      }
    }
    if (col < 9 && row > 1) {
      const adjCell = container.querySelector(
        "#" + column[col + 1] + (row - 1)
      );
      if (!adjCell.classList.contains("placed")) {
        adjCell.classList.add("forbidden");
      }
    }
    if (row > 1) {
      const adjCell = container.querySelector("#" + column[col] + (row - 1));
      if (!adjCell.classList.contains("placed")) {
        adjCell.classList.add("forbidden");
      }
    }
    if (row > 1 && col > 0) {
      const adjCell = container.querySelector(
        "#" + column[col - 1] + (row - 1)
      );
      if (!adjCell.classList.contains("placed")) {
        adjCell.classList.add("forbidden");
      }
    }
    if (col > 0) {
      const adjCell = container.querySelector("#" + column[col - 1] + row);
      if (!adjCell.classList.contains("placed")) {
        adjCell.classList.add("forbidden");
      }
    }
    if (col > 0 && row < 10) {
      const adjCell = container.querySelector(
        "#" + column[col - 1] + (row + 1)
      );
      if (!adjCell.classList.contains("placed")) {
        adjCell.classList.add("forbidden");
      }
    }
  });
}

function cancelButtonHandler() {
  playerPlacing.gameBoard.ships = [];
  document.body.removeChild(
    document.getElementsByClassName("placeShip_Modal")[0]
  );
}

function resetButtonHandler() {
  playerPlacing.gameBoard.ships = [];
  document.getElementById("ships_Reset").disabled = true;
  document.getElementById("ships_Confirm").disabled = true;
  resetCells();
  startPlacement(document.getElementsByClassName("placeShip_Board")[0]);
}

function resetCells() {
  const allMarked = Array.from(document.getElementsByClassName("marked"));
  const allPlaced = Array.from(document.getElementsByClassName("placed"));
  const allForbidden = Array.from(document.getElementsByClassName("forbidden"));
  allMarked.forEach((cell) => {
    cell.classList.remove("marked");
  });
  allPlaced.forEach((cell) => {
    cell.classList.remove("placed");
  });
  allForbidden.forEach((cell) => {
    cell.classList.remove("forbidden");
  });
}

function confirmButtonHandler() {
  document.body.removeChild(
    document.getElementsByClassName("placeShip_Modal")[0]
  );
  document.getElementById("place_Ships").disabled = true;
  document.getElementById("new_Match").disabled = false;
  document.getElementById("reset_Game").disabled = false;
  placeShips();
}

function placeShips() {
  const allShips = playerPlacing.gameBoard.ships;
  const allPositions = [];
  allShips.forEach((ship) => {
    allPositions.push(...ship.getCoordinates());
  });
  const playerPlacingBoard = document.getElementsByClassName("player1_Cells")[0];
  allPositions.forEach((position) => {
    playerPlacingBoard.querySelector("#"+position).classList.add("placed");
  });
}
