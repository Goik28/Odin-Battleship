import { Player } from "../Player/player.js";
import { gameInit, randomAttack, randomShipPlacement } from "./game.js";

const player1 = new Player("Savior");
const player2 = new Player("Terminator");

test("Initialize game", () => {
  gameInit(player1, player2);
  expect(player1.turn || player2.turn).toBe(true);
  expect(player2.gameBoard.getShipAmount()).toBe(5);
});

test("Random place valid ships", () => {
  randomShipPlacement(player1);
  expect(player1.gameBoard.getShipAmount()).toBe(5);
});

test("Random attack valid place", () => {
  gameInit(player1, player2);
  randomShipPlacement(player1);
  const attack = randomAttack(player2);
  expect(
    player2.gameBoard.missedAttacks || player2.gameBoard.rightAttacks
  ).toContain(attack);
});
