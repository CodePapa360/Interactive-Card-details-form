"use strict";
import "../sass/main.scss";

//Dark mode veriables
const darkModeToggle = document.getElementById("dark-mode-checkbox");
const root = document.documentElement;

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
