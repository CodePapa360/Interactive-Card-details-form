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
/////////////////////////////

const formatValue = function (value) {
  const receivedVal = String(value);
  const chunks = [];

  for (let i = 0; i < receivedVal.length; i += 4) {
    chunks.push(receivedVal.slice(i, i + 4));
  }

  const output = chunks.join(" ");
  // console.log("From the funtion", output);
  return output;
};

// formatValue("asdfglskdfj");

//////////////////////

const renderError = function (status, element) {
  const msgError = element.nextElementSibling; // The error message element next to the input element

  switch (status) {
    case "empty":
      msgError.textContent = "Can't be blank";
      element.style.borderColor = "var(--red)";
      break;
    case "NaN":
      msgError.textContent = "Wrong format, numbers only";
      element.style.borderColor = "var(--red)";
      break;
    case "invalid":
      msgError.textContent = "Invalid date";
      element.style.borderColor = "var(--red)";
      break;
    default:
      msgError.textContent = "";
      element.style.borderColor = null;
  }
};

const validateCardNumber = function (element) {
  const inputValue = +element.value.split(" ").join("");

  console.log(inputValue);

  if (inputCardNumber.value === "") {
    renderError("empty", element);
    outputCardNumber.textContent = "0000 0000 0000 0000";
    return false;
  }

  if (isNaN(inputValue)) {
    renderError("NaN", element);
    return false;
  }

  const formatedVal = formatValue(inputValue);
  inputCardNumber.value = formatedVal;
  outputCardNumber.textContent = formatedVal;

  renderError("", element);
  return true;
};

inputCardNumber.addEventListener("input", function () {
  validateCardNumber(inputCardNumber);
});
