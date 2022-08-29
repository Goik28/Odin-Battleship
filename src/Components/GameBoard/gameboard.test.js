import { GameBoard } from "./board.js";

test("Add ship to GameBoard", () => {
  const board1 = new GameBoard("player1");
  expect(board1.placeShip(["c1", "c2", "c3"])).toBe(true);
});

test("Add ship to invalid place in GameBoard", () => {
  const board1 = new GameBoard("player1");
  board1.placeShip(["c1", "c2", "c3"]);
  expect(board1.placeShip(["a2", "b2", "c2"])).toBe(false);
});

test("Receive right attack", () => {
  const board1 = new GameBoard("player1");
  board1.placeShip(["c1", "c2", "c3"]);
  board1.receiveAttack("c2");
  expect(board1.getRightAttacks()).toContain("c2");
});

test("Receive missed attack", () => {
  const board1 = new GameBoard("player1");
  board1.placeShip(["c1", "c2", "c3"]);
  board1.receiveAttack("c7");
  expect(board1.getMissedAttacks()).toContain("c7");
});

test("Receive invalid attack", () => {
  const board1 = new GameBoard("player1");
  board1.placeShip(["c1", "c2", "c3"]);
  board1.receiveAttack("c7");
  expect(board1.receiveAttack("c7")).toEqual(false);
});

test("There are ships left afloat", () => {
  const board1 = new GameBoard("player1");
  board1.placeShip(["c1", "c2", "c3"]);
  board1.receiveAttack("c2");
  expect(board1.noShipLeft()).toBe(false);
});

test("All ships are sunk", () => {
  const board1 = new GameBoard("player1");
  board1.placeShip(["c1", "c2", "c3"]);
  board1.receiveAttack("c1");
  board1.receiveAttack("c2");
  board1.receiveAttack("c3");
  expect(board1.noShipLeft()).toBe(true);
});
