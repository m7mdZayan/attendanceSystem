// HTML Elements
const inputFields = document.querySelectorAll("input");
const inputFieldsArray = Array.from(inputFields);
const firstNameField = document.getElementById("fname-input");
const lastNameField = document.getElementById("lname-input");
const addressFiled = document.getElementById("address-input");
const emailField = document.getElementById("email-input");
const ageField = document.getElementById("age-input");

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
  if (
    !addressFiled.value.match(
      /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}/g
    )
  ) {
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
