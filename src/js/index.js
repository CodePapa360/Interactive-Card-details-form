"use strict";
import "../sass/main.scss";

const inputName = document.getElementById("name");
const inputCardNumber = document.getElementById("card-number");
const inputExpMonth = document.querySelector(".exp-month");
const inputExpYear = document.querySelector(".exp-year");
const inputCvc = document.getElementById("cvc");

const outputCardNumber = document.getElementById("output-card-number");
const outputName = document.getElementById("output-name");
const outputExpMonth = document.getElementById("output-month");
const outputExpYear = document.getElementById("output-year");

//Dark mode veriables
const darkModeToggle = document.getElementById("dark-mode-checkbox");
const root = document.documentElement;

//////////////////////////////////
//////////////////////////////////
//dark mode feature
const darkMode = function () {
  if (darkModeToggle.checked) {
    root.classList.add("dark-mode");
  } else {
    root.classList.remove("dark-mode");
  }
};

darkModeToggle.addEventListener("change", darkMode);
window.addEventListener("load", darkMode);
//////////////////////////////
