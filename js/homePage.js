// HTML Elements
const inputFields = document.querySelectorAll("input");
const inputFieldsArray = Array.from(inputFields);
const firstNameField = document.getElementById("fname-input");
const lastNameField = document.getElementById("lname-input");
const addressFiled = document.getElementById("address-input");
const emailField = document.getElementById("email-input");
const ageField = document.getElementById("age-input");
const loginButton = document.querySelector(".login-btn");
const registerFormSection = document.querySelector(".register");
const pageHeader = document.querySelector("h1");
const loginFormSection = document.querySelector(".login-section");
const firstTimeButton = document.querySelector(".first-time");
inputFieldsArray.forEach((input) => {
  input.addEventListener("focus", (e) => {
    e.target.classList.add("active");
  });

  input.addEventListener("focusout", (e) => {
    if (input.value == "") {
      e.target.classList.remove("active");
    }
  });
});

firstNameField.addEventListener("focusout", (e) => {
  if (!firstNameField.value.match(/[A-Za-z]{3,10}/g)) {
    firstNameField.classList.add("error");
  } else {
    firstNameField.classList.remove("error");
  }
});

lastNameField.addEventListener("focusout", () => {
  if (!lastNameField.value.match(/[A-Za-z]{3,10}/g)) {
    lastNameField.classList.add("error");
  } else {
    lastNameField.classList.remove("error");
  }
});

addressFiled.addEventListener("focusout", (e) => {
  if (!addressFiled.value.match(/[1-9]{1,2} [a-zA-Z0-9\s]+/)) {
    addressFiled.classList.add("error");
  } else {
    addressFiled.classList.remove("error");
  }
});

emailField.addEventListener("focusout", (e) => {
  if (
    !emailField.value.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    emailField.classList.add("error");
  } else {
    emailField.classList.remove("error");
  }
});

ageField.addEventListener("focusout", (e) => {
  if (!ageField.value.match(/[2-5]{1}[0-9]{1}/)) {
    ageField.classList.add("error");
  } else {
    ageField.classList.remove("error");
  }
});

loginButton.addEventListener("click", () => {
  registerFormSection.classList.add("fadeOut");
  pageHeader.textContent = "Login";
  setTimeout(() => {
    registerFormSection.classList.add("hidden");
    loginFormSection.classList.remove("hidden");
    loginFormSection.classList.add("fadeIn");
  }, 500);
});

firstTimeButton.addEventListener("click", () => {
  loginFormSection.classList.add("fadeOut");
  pageHeader.textContent = "Sign up";
  setTimeout(() => {
    loginFormSection.classList.add("hidden");
    registerFormSection.classList.remove("hidden");
    registerFormSection.classList.add("fadeIn");
  }, 500);
});
