import "./footer.css";

const text = `Created by<a href="https://github.com/Goik28"> Goik28 </a>for the BattleShip project on The Odin Project course`;

export function createFooter() {
  const footer = document.createElement("footer");
  const description = document.createElement("div");
  description.innerHTML = text;
  footer.appendChild(description);
  return footer;
}
