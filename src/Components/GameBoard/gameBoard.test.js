import { GameBoard } from "./gameBoard.js";

test("Add ship to GameBoard", () => {
  const board1 = new GameBoard("player1");
  expect(board1.placeShip(["c1", "c2", "c3"])).toBe(true);
});

test("Add ship to GameBoard with empty coordinates", () => {
  const board1 = new GameBoard("player1");
  expect(board1.placeShip([])).toBe(false);
});

test("Add ship to GameBoard with near another ship", () => {
  const board1 = new GameBoard("player1");
  board1.placeShip(["c1", "c2", "c3"]);
  expect(board1.placeShip(["b3", "b4", "b5"])).toBe(false);
});

test("Add ship to GameBoard with near another ship", () => {
  const board1 = new GameBoard("player1");
  board1.placeShip(["c4", "d4", "e4"]);
  expect(board1.placeShip(["c5", "d5", "e5"])).toBe(false);
});

test("Get ship amount", () => {
  const board1 = new GameBoard("player1");
  board1.placeShip(["c1", "c2", "c3"]);
  expect(board1.getShipAmount()).toBe(1);
});

test("Get empty ship amount", () => {
  const board1 = new GameBoard("player1");
  expect(board1.getShipAmount()).toBe(0);
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
