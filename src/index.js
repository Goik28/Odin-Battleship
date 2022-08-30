import "./index.css";
import { createFooter } from "./Components/Footer/footer";
import { createMain } from "./Components/Main/main.js";
import { createHeader } from "./Components/Header/header.js";

document.body.appendChild(createHeader());
document.body.appendChild(createMain());
document.body.appendChild(createFooter());
