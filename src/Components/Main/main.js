import html from "./main.html";
import "./main.css";
import { callPlaceShips } from "./placeShips";
import { Player } from "../Player/player";
import { GameBoard } from "../GameBoard/gameboard";

const player1 = new Player("Savior");
const player2 = new Player("Terminator");

export function createMain() {
  const main = document.createElement("main");
  main.innerHTML = html;
  const p1Board = createBoard("Your Sea", 1);
  const p2Board = createBoard("Enemy Sea", 2);
  main.getElementsByClassName("game_Boards")[0].appendChild(p1Board);
  main.getElementsByClassName("game_Boards")[0].appendChild(p2Board);
  const placeShipsButton = main.querySelector("#place_Ships");
  placeShipsButton.addEventListener("click", placeShipsButtonHandler);
  const newGameButton = main.querySelector("#new_Match");
  newGameButton.addEventListener("click", newGameButtonHandler);
  const resetGameButton = main.querySelector("#reset_Game");
  resetGameButton.addEventListener("click", resetGameButtonHandler);
  return main;
}

function createBoard(string, id) {
  const board = document.createElement("div");
  board.classList.add("player" + id + "_Board");
  const title = document.createElement("div");
  title.classList.add("player_Title");
  title.textContent = string;
  const rowGuide = createRowGuide();
  rowGuide.classList.add("player_RowGuide");
  const colGuide = createColGuide();
  colGuide.classList.add("player_ColGuide");
  const cells = createCells();
  cells.classList.add("player" + id + "_Cells");
  board.appendChild(title);
  board.appendChild(colGuide);
  board.appendChild(rowGuide);
  board.appendChild(cells);
  return board;
}

function createCells() {
  const cells = document.createElement("div");
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  for (let row = 10; row > 0; row--) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("div");
      cell.id = "" + column[col] + "" + row;
      cells.appendChild(cell);
    }
  }
  return cells;
}

function createRowGuide() {
  const rowGuide = document.createElement("div");
  for (let index = 10; index >= 1; index--) {
    const cellGuide = document.createElement("div");
    cellGuide.textContent = index;
    rowGuide.appendChild(cellGuide);
  }
  return rowGuide;
}

function createColGuide() {
  const colGuide = document.createElement("div");
  const neutral = document.createElement("div");
  neutral.classList.add("neutralGuide");
  colGuide.appendChild(neutral);
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  for (let index = 0; index < column.length; index++) {
    const element = column[index];
    const cellGuide = document.createElement("div");
    cellGuide.textContent = element;
    colGuide.appendChild(cellGuide);
  }
  return colGuide;
}

function placeShipsButtonHandler() {
    const board = document.getElementsByClassName("player1_Board")[0];
  document.body.appendChild(callPlaceShips(board, player1));
}

function newGameButtonHandler(){

}

function resetGameButtonHandler(){
    const allPlaced = Array.from(document.getElementsByClassName("placed"));
    allPlaced.forEach((cell) => {
      cell.classList.remove("placed");
    });
    //reset all other markings on divs
    player1.gameBoard = new GameBoard();
    player2.gameBoard = new GameBoard();

  document.getElementById("place_Ships").disabled = false;
  document.getElementById("new_Match").disabled = true;
  document.getElementById("reset_Game").disabled = true;
}