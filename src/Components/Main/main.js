import html from "./main.html";
import "./main.css";

export function createMain() {
  const main = document.createElement("main");
  main.innerHTML = html;
  const p1Board = createBoard("Your Sea", 1);
  const p2Board = createBoard("Enemy Sea", 2);
  main.getElementsByClassName("game_Boards")[0].appendChild(p1Board);
  main.getElementsByClassName("game_Boards")[0].appendChild(p2Board);
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
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "f"];
  for (let col = 9; col >= 0; col--) {
    for (let row = 1; row <= 10; row++) {
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
  const column = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "f"];
  for (let index = 0; index < column.length; index++) {
    const element = column[index];
    const cellGuide = document.createElement("div");
    cellGuide.textContent = element;
    colGuide.appendChild(cellGuide);
  }
  return colGuide;
}
