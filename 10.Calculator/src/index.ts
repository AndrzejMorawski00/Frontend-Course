import { evaluate } from "mathjs";
import "./styles/style.css";
let bttnList: NodeListOf<HTMLButtonElement>;
let bttnDEL: HTMLButtonElement;
let bttnCE: HTMLButtonElement;
let bttnResult: HTMLButtonElement;
let resultString = "";

let input: HTMLInputElement;
const prepareDOMElements = () => {
  bttnList = document.querySelectorAll(".buttons__input")!;
  bttnDEL = document.querySelector(".buttons__del")!;
  bttnCE = document.querySelector(".buttons__ce")!;
  bttnResult = document.querySelector(".buttons__result")!;
  input = document.querySelector(".heading__text")!;
};

const prepareDOMEvents = () => {
  bttnList.forEach((element) =>
    element.addEventListener("click", () =>
      addValueToString(element.textContent!)
    )
  );
  bttnDEL.addEventListener("click", deleteInput);
  bttnCE.addEventListener("click", deleteSingleChar);
  bttnResult.addEventListener("click", evaluateExpression);
};

const deleteSingleChar = () => {
  if (resultString.length !== 0) {
    resultString = resultString
      .split("")
      .splice(0, resultString.length - 1)
      .join("");
    updateInput(resultString);
  }
};

const evaluateExpression = () => {
  let result: number = 0;
  try {
    result = evaluate(resultString);
    result = Math.round(result * 100) / 100;
    resultString = String(result);
  } catch (e) {
    resultString = "ERROR";
    updateInput(resultString);
    setTimeout(() => {
      deleteInput();
    }, 3000);
  }
  updateInput(resultString);
};

const deleteInput = () => {
  resultString = "";
  input.value = "";
};

const addValueToString = (char: string) => {
  resultString += char;
  updateInput(resultString);
};

const updateInput = (resultString: string) => {
  input.value = resultString;
};

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

document.addEventListener("DOMContentLoaded", main);
