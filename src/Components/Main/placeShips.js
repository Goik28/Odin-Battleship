import html from "./placeShips.html";
import "./placeShips.css";

export function callPlaceShips(board) {
  const placeShipModal = document.createElement("div");
  placeShipModal.className = "placeShip_Modal";
  const placeShipBoard = document.createElement("div");
  placeShipBoard.innerHTML = html;
  placeShipBoard.classList.add("placeShip_Board");
  placeShipBoard.getElementsByClassName("game_Boards")[0].replaceWith(board.cloneNode(true));
  placeShipModal.appendChild(placeShipBoard);
  placeShipModal.addEventListener("click", (e) => {
    document.body.removeChild(placeShipModal);
});
  return placeShipModal;
}
