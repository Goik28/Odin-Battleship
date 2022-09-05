import html from "./main.html";
import "./main.css";
import { callPlaceShips } from "./placeShips";
import { Player } from "../Player/player";
import { GameBoard } from "../GameBoard/gameboard";
import { gameInit, randomAttack } from "./game";

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

function newGameButtonHandler() {
  const log = document.getElementById("combat_Log");
  const newGameButton = document.getElementById("new_Match");
  newGameButton.disabled = true;
  gameInit(player1, player2);
  if (player2.turn) {
    log.textContent = player2.name + " start the game.";
    const attack = randomAttack(player1);
    log.textContent =
      player2.name +
      " attacked the position " +
      attack +
      ".\n" +
      log.textContent;
    drawOnBoards();
    player2.turn = false;
    player1.turn = true;
  } else {
    log.textContent =
      player1.name + " start the game. Click on a position to attack.";
  }
  attachEventListeners();
}

function resetGameButtonHandler() {
  const allPlaced = Array.from(document.getElementsByClassName("placed"));
  allPlaced.forEach((cell) => {
    cell.classList.remove("placed");
  });
  const allMissed = Array.from(document.getElementsByClassName("missed"));
  allMissed.forEach((cell) => {
    cell.classList.remove("missed");
  });
  const allRight = Array.from(document.getElementsByClassName("right"));
  allRight.forEach((cell) => {
    cell.classList.remove("right");
  });
  //reset all other markings on divs
  player1.gameBoard = new GameBoard();
  player2.gameBoard = new GameBoard();

  document.getElementById("place_Ships").disabled = false;
  document.getElementById("new_Match").disabled = true;
  document.getElementById("reset_Game").disabled = true;
  document.getElementById("combat_Log").textContent = "";
}

function attachEventListeners() {
  let cells = document.getElementsByClassName("player2_Board")[0];
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  for (let col = 0; col < 10; col++) {
    for (let row = 1; row <= 10; row++) {
      const cell = cells.querySelector("#" + column[col] + "" + row);
      cell.addEventListener("click", attackHandler);
    }
  }
}

function attackHandler(e) {
  const log = document.getElementById("combat_Log");
  const attack = e.target.id;
  e.target.removeEventListener("click", attackHandler);
  if (player1.turn) {
    player1Attack(attack);
    if (player2.gameBoard.noShipLeft()) {
      log.textContent =
        player2.name +
        " has no ships left! " +
        player1.name +
        " won the game!!\n" +
        log.textContent;
      drawOnBoards();
      return;
    }
    player2Attack();
    if (player1.gameBoard.noShipLeft()) {
      log.textContent =
        +"\n" +
        player1.name +
        " has no ships left! " +
        player2.name +
        " won the game!!\n" +
        log.textContent;
      drawOnBoards();
      return;
    }
    drawOnBoards();
  }
}

function player1Attack(attack) {
  const log = document.getElementById("combat_Log");
  player2.gameBoard.receiveAttack(attack);
  log.textContent =
    player1.name + " attacked the position " + attack + ".\n" + log.textContent;
}

function player2Attack() {
  const log = document.getElementById("combat_Log");
  const attack = randomAttack(player1);
  log.textContent =
    player2.name + " attacked the position " + attack + ".\n" + log.textContent;
}

function drawOnBoards() {
  let board1 = document.getElementsByClassName("player1_Board")[0];
  player1.gameBoard.getMissedAttacks().forEach((coordinate) => {
    board1.querySelector("#" + coordinate).textContent = "-";
    board1.querySelector("#" + coordinate).classList.add("missed");
  });
  player1.gameBoard.getRightAttacks().forEach((coordinate) => {
    board1.querySelector("#" + coordinate).textContent = "X";
    board1.querySelector("#" + coordinate).classList.add("right");
  });
  let board2 = document.getElementsByClassName("player2_Board")[0];
  player2.gameBoard.getMissedAttacks().forEach((coordinate) => {
    board2.querySelector("#" + coordinate).textContent = "-";
    board2.querySelector("#" + coordinate).classList.add("missed");
  });
  player2.gameBoard.getRightAttacks().forEach((coordinate) => {
    board2.querySelector("#" + coordinate).textContent = "X";
    board2.querySelector("#" + coordinate).classList.add("right");
  });
}
