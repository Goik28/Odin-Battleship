import html from "./placeShips.html";
import "./placeShips.css";

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
  shipPlacement(placeShipBoard, 5, false);
  return placeShipModal;
}

function startPlacement(container, player) {
  let ship = shipTypes(player.gameBoard.ships.length + 1);
  changeShipDescription(container, ship);
  let orientation = false;
  if (container.querySelector("#ships_Hor").checked) {
    orientation = true;
  }
  shipPlacement(container, player, ship[1], orientation);
}

function changeShipDescription(container, ship) {
  const description = container.getElementsByClassName("ships_Description");
  description.textContent = `Place ${ship[0]} - ${ship[1]} squares`;
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

function shipPlacement(container, player, size, orientation) {
  let cells = container.getElementsByClassName("player1_Board")[0];
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  if (orientation) {
    for (let col = 0; col < 11 - size; col++) {
      for (let row = 1; row <= 10; row++) {
        const cell = cells.querySelector("#" + column[col] + "" + row);
        cell.addEventListener("mouseenter", () => {
          cell.classList.add("marked");
          for (let index = 1; index < size; index++) {
            cells
              .querySelector("#" + column[col + index] + "" + row)
              .classList.add("marked");
          }
        });
        cell.addEventListener("mouseleave", () => {
          cell.classList.remove("marked");
          for (let index = 1; index < size; index++) {
            cells
              .querySelector("#" + column[col + index] + "" + row)
              .classList.remove("marked");
          }
        });
        cell.addEventListener("click", () => {
          const placedShip = cells.getElementsByClassName("marked");
          const placedShipCoord = [];
          placedShip.forEach((element) => {
            element.classList.add("placed");
            element.classList.remove("marked");
            placedShipCoord.push(element.id);
          });
          player.gameBoard.placeShip(placedShipCoord);
        });
      }
    }
  } else {
    for (let col = 0; col < 10; col++) {
      for (let row = 10; row >= size; row--) {
        const cell = cells.querySelector("#" + column[col] + "" + row);
        cell.addEventListener("mouseenter", () => {
          cell.classList.add("marked");
          for (let index = 1; index < size; index++) {
            cells
              .querySelector("#" + column[col] + "" + (row - index))
              .classList.add("marked");
          }
        });
        cell.addEventListener("mouseleave", () => {
          cell.classList.remove("marked");
          for (let index = 1; index < size; index++) {
            cells
              .querySelector("#" + column[col] + "" + (row - index))
              .classList.remove("marked");
          }
        });

        cell.addEventListener("click", () => {
          const placedShip = cells.getElementsByClassName("marked");
          const placedShipCoord = [];
          placedShip.forEach((element) => {
            element.classList.add("placed");
            element.classList.remove("marked");
            placedShipCoord.push(element.id);
          });
          player.gameBoard.placeShip(placedShipCoord);
        });
      }
    }
  }
  cells = cells.cloneNode(true);
  if (player.gameBoard.ships.length < 6) {
    startPlacement(container, player);
  }
}

function shipMeasurement() {}
