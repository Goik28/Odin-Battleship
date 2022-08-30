import html from "./main.html";
import "./main.css";

export function createMain(){
const main = document.createElement("main");
main.innerHTML = html;
return main;
}