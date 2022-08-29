import { Ship } from "./ship.js";

const ship = new Ship(["a1", "a2", "a3"]);

test("Return ship coordinates", () => {
  expect(ship.length).toEqual(["a1", "a2", "a3"]);
});

test("Test ship hit", () => {
  expect(ship.hit("a2")).toEqual(["a2"]);
});

test("Test ship missed hit", () => {
  expect(ship.hit("a4")).toBe(false);
});

test("Test ship hit but not sunk", () => {
  ship.hit("a1");
  expect(ship.setSunk()).toBe(false);
});

test("Test ship hit and sunk", () => {
  ship.hit("a3");
  expect(ship.setSunk()).toBe(true);
});
