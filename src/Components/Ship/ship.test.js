import { Ship } from "./ship.js";

test("Return ship coordinates", () => {
  const ship = new Ship(["a1", "a2", "a3"]);
  expect(ship.coordinates).toEqual(["a1", "a2", "a3"]);
});

test("Test ship hit", () => {
  const ship = new Ship(["a1", "a2", "a3"]);
  expect(ship.hit("a2")).toBe("a2");
});

test("Test ship missed hit", () => {
  const ship = new Ship(["a1", "a2", "a3"]);
  expect(ship.hit("a4")).toBe(false);
});

test("Test ship hit but not sunk", () => {
  const ship = new Ship(["a1", "a2", "a3"]);
  ship.hit("a1");
  expect(ship.setSunk()).toBe(false);
});

test("Test ship hit and sunk", () => {
  const ship = new Ship(["a1", "a2", "a3"]);
  ship.hit("a1");
  ship.hit("a2");
  ship.hit("a3");
  expect(ship.setSunk()).toBe(true);
});
