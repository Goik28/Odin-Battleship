import "./header.css";

const text = "Goik's Battleship";

export function createHeader() {
  const header = document.createElement("header");
  const description = document.createElement("div");
  description.innerHTML = text;
  header.appendChild(description);
  return header;
}
