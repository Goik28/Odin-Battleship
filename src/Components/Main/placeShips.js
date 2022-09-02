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
  placeShipBoard
    .querySelector("#ships_Cancel")
    .addEventListener("click", (e) => {
      document.body.removeChild(placeShipModal);
    });
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
  const row = cell.id.substring(1);
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
  const row = cell.id.substring(1);
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
    changeShipText(document.getElementsByClassName("placeShip_Board")[0]);
  }
  if (playerPlacing.gameBoard.getShipAmount() == 5) {
    removeCellEvents(document.getElementsByClassName("placeShip_Board")[0]);
  }
}

function changeShipText(container) {
  let ship = shipTypes(playerPlacing.gameBoard.getShipAmount() + 1);
  const description = container.getElementsByClassName("ships_Description")[0];
  description.textContent = `Place ${ship.name} - ${ship.size} squares`;
}
