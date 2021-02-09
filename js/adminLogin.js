const inputFields = document.querySelectorAll("input");
const inputFieldsArray = Array.from(inputFields);
const usernameField = document.getElementById("admin-username");
const passwordField = document.getElementById("admin-password");
const loginBtn = document.getElementById("admin__login--btn");

let usernameFieldIsVaild = false;
let passwordFieldIsVaild = false;

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

usernameField.addEventListener("focusout", () => {
  if (usernameField.value !== "admin") {
    usernameField.classList.add("error");
  } else {
    usernameField.classList.remove("error");
    usernameFieldIsVaild = true;
  }
});

passwordField.addEventListener("focusout", () => {
  if (passwordField.value !== "admin") {
    passwordField.classList.add("error");
  } else {
    passwordField.classList.remove("error");
    passwordFieldIsVaild = true;
  }
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (usernameFieldIsVaild && passwordFieldIsVaild) {
    window.location.href = "./adminHome.html";
  }
});
