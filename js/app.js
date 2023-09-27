import { valida } from "./validaciones.js";

const insputs = document.querySelectorAll("input");

insputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});