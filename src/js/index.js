"use strict";
import "../sass/main.scss";
import completeSvg from "../images/icon-complete.svg";

const form = document.querySelector(".form");
const inputName = document.getElementById("name");
const inputCardNumber = document.getElementById("card-number");
const inputExpMonth = document.querySelector(".exp-month");
const inputExpYear = document.querySelector(".exp-year");
const inputCvc = document.getElementById("cvc");

const outputCardNumber = document.getElementById("output-card-number");
const outputName = document.getElementById("output-name");
const outputExpMonth = document.getElementById("output-month");
const outputExpYear = document.getElementById("output-year");
const outputCvc = document.getElementById("cvc-number");

//Dark mode veriables
const darkModeToggle = document.getElementById("dark-mode-checkbox");
const root = document.documentElement;
//////////////////////////////////
//dark mode feature
//////////////////
const darkMode = function () {
  root.classList.toggle("dark-mode", darkModeToggle.checked);
  localStorage.setItem("darkMode", darkModeToggle.checked ? "on" : "off");
};

darkModeToggle.addEventListener("change", darkMode);
window.addEventListener("load", function () {
  darkModeToggle.checked = localStorage.getItem("darkMode") === "on";
  darkMode();
});
//////////////////////////////
/////////////////////////////

const renderError = function (status, element) {
  const msgError = element.nextElementSibling;

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

//////////////////////////
// This funtion adds a space to seperate each four digits
/////////////////////////

const spacingNums = function (value) {
  const receivedVal = String(value);
  const chunks = [];

  for (let i = 0; i < receivedVal.length; i += 4) {
    chunks.push(receivedVal.slice(i, i + 4));
  }

  const output = chunks.join(" ");
  return output;
};

//////////////////////////
// Card number validation
//////////////////////////
const validateCardNumber = function (element) {
  const inputValue = +element.value.split(" ").join("");

  if (inputCardNumber.value === "") {
    renderError("empty", element);
    outputCardNumber.textContent = "0000 0000 0000 0000";
    return false;
  }

  if (isNaN(inputValue)) {
    renderError("NaN", element);
    return false;
  }

  const spacedValue = spacingNums(inputValue);
  inputCardNumber.value = spacedValue;
  outputCardNumber.textContent = spacedValue;

  renderError("", element);
  return true;
};

//Input
inputCardNumber.addEventListener("input", function () {
  validateCardNumber(inputCardNumber);
});
//////////////////////////
// Name validation
//////////////////////////

const validateName = function (element) {
  if (inputName.value === "") {
    renderError("empty", element);
    outputName.textContent = "Your name";
    return false;
  }

  renderError("", element);
  outputName.textContent = inputName.value;
  return true;
};

//Input
inputName.addEventListener("input", function () {
  validateName(inputName);
});

//////////////////////////
// Month validation
//////////////////////////
const validateMonth = function (element) {
  const inputValue = element.value;
  if (inputValue === "") {
    renderError("empty", element);
    outputExpMonth.textContent = "00";
    return false;
  }

  if (isNaN(inputValue) || inputValue < 1 || inputValue > 12) {
    renderError("invalid", element);
    return false;
  }

  renderError("", element);
  outputExpMonth.textContent =
    inputValue.length === 1 ? `0${inputValue}` : inputValue;

  return true;
};

//Input
inputExpMonth.addEventListener("input", function () {
  validateMonth(inputExpMonth);
});

//////////////////////////
// Year validation
//////////////////////////
const validateYear = function (element) {
  const inputValue = element.value;

  if (inputValue === "") {
    renderError("empty", element);
    outputExpYear.textContent = "00";
    return false;
  }

  if (isNaN(inputValue)) {
    renderError("invalid", element);
    return false;
  }

  renderError("", element);
  outputExpYear.textContent =
    inputValue.length === 1 ? `0${inputValue}` : inputValue;

  return true;
};

//Input
inputExpYear.addEventListener("input", function () {
  validateYear(inputExpYear);
});

//////////////////////////
// Year validation
//////////////////////////
const validateCvc = function (element) {
  const inputValue = element.value;

  if (inputValue === "") {
    renderError("empty", element);
    outputCvc.textContent = "000";
    return false;
  }

  if (isNaN(inputValue)) {
    renderError("invalid", element);
    return false;
  }

  const formate = function (value) {
    if (value.length === 1) return `00${value}`;
    if (value.length === 2) return `0${value}`;
    return value;
  };

  renderError("", element);
  outputCvc.textContent = formate(inputValue);
  return true;
};

//Input
inputCvc.addEventListener("input", function () {
  validateCvc(inputCvc);
});

////////////////////////
// Render Thank you page

const renderThankYou = function () {
  const markup = `
    <div class="completed">
      <img src="${completeSvg}" alt="Completed check icon" />

      <p class="completed__greeting">Thank you!</p>
      <p class="completed__message">We've added your card details</p>
      <button class="completed__btn-continue button" type="button">
        Continue
      </button>
    </div>
  `;

  form.style.opacity = 0;

  setTimeout(() => {
    form.innerHTML = markup;
    form.style.opacity = 1;
    const btnContinue = document.querySelector(".completed__btn-continue");
    btnContinue.addEventListener("click", function () {
      location.reload();
    });
  }, 300);
};

//////////////////////////
// Form submission
//////////////////////////

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    validateName(inputName) &&
    validateCardNumber(inputCardNumber) &&
    validateMonth(inputExpMonth) &&
    validateYear(inputExpYear) &&
    validateCvc(inputCvc)
  ) {
    [inputName, inputCardNumber, inputExpMonth, inputExpYear, inputCvc].forEach(
      (inp) => (inp.value = "")
    );
    renderThankYou();
  }
});
