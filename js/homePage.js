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
const registerButton = document.getElementById("register");
const userLoginButton = document.querySelector(".login-form-submit");
const userNameField = document.getElementById("userName");
const loginPasswordField = document.getElementById("login-password");

let firstNameIsValid = false,
  lastNameIsValid = false,
  addressIsValid = false,
  emailIsValid = false,
  ageIsValid = false;

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
    firstNameIsValid = true;
  }
});

lastNameField.addEventListener("focusout", () => {
  if (!lastNameField.value.match(/[A-Za-z]{3,10}/g)) {
    lastNameField.classList.add("error");
  } else {
    lastNameField.classList.remove("error");
    lastNameIsValid = true;
  }
});

addressFiled.addEventListener("focusout", (e) => {
  if (!addressFiled.value.match(/[1-9]{1,2} [a-zA-Z0-9\s]+/)) {
    addressFiled.classList.add("error");
  } else {
    addressFiled.classList.remove("error");
    addressIsValid = true;
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
    emailIsValid = true;
  }
});

ageField.addEventListener("focusout", (e) => {
  if (!ageField.value.match(/[2-5]{1}[0-9]{1}/)) {
    ageField.classList.add("error");
  } else {
    ageField.classList.remove("error");
    ageIsValid = true;
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

registerButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    addressFiled &&
    emailIsValid &&
    ageIsValid
  ) {
    const newEmployeeObject = {
      firstName: firstNameField.value,
      lastName: lastNameField.value,
      address: addressFiled.value,
      email: emailField.value,
      age: +ageField.value,
    };
    const employeesArray = (await axios.get("http://localhost:3000/employees"))
      .data;
    const employeesArrayLength = employeesArray.length;
    let lastEmployeeID = employeesArray[employeesArrayLength - 1].id;
    newEmployeeObject.id = ++lastEmployeeID;

    axios
      .post("http://localhost:3000/employees", newEmployeeObject)
      .catch((e) => console.log(e));

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "m7mdzayan@gmail.com",
      Password: "E7388600BDDF3EDB214E0121C8A9BD61498E",
      To: "mohamedzayan28@yahoo.com",
      From: "m7mdzayan@gmail.com",
      Subject: "new employee data",
      Body: `first name = ${firstNameField.value}  --
              last name = ${lastNameField.value} --
              address = ${addressFiled.value} --
              email address = ${emailField.value} --
              age = ${ageField.value}`,
    }).then((message) => {
      if (message == "OK") {
        alert("your data was stored succesfully");
      } else {
        alert(message);
      }
    });

    let loginName = firstNameField.value + Math.round(Math.random() * 100 + 1);
    let loginPassword = "";

    for (let i = 0; i < 9; i++) {
      loginPassword += Math.ceil(Math.random() * 10);
    }

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "m7mdzayan@gmail.com",
      Password: "E7388600BDDF3EDB214E0121C8A9BD61498E",
      To: emailField.value,
      From: "m7mdzayan@gmail.com",
      Subject: "Your Login data to the company website",
      Body: `your username : ${loginName} --  your password : ${loginPassword}`,
    }).then((message) => {
      if (message == "OK") {
        alert("your login data was sent succesfully to your email");
      } else {
        alert(message);
      }
    });

    const newEmployeeLoginData = {
      userName: loginName,
      password: loginPassword,
    };
    newEmployeeLoginData.id = lastEmployeeID;

    axios
      .post("http://localhost:3000/loginData", newEmployeeLoginData)
      .catch((e) => console.log(e));
  } else {
    alert("please make sure you entered valid data !");
  }
});

// Login  Form

userLoginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const employeeLoginData = (await axios.get("http://localhost:3000/loginData"))
    .data;

  if (loginPasswordField.value && userNameField.value) {
    let userExists = false;
    let authenticatedUser = false;

    employeeLoginData.forEach((item) => {
      if (item.userName === userNameField.value) {
        userExists = true;
        if (item.password === loginPasswordField.value) {
          authenticatedUser = true;
          axios.post("http://localhost:3000/currentUser", { id: item.id });
          window.location.href = "http://localhost:5500/pages/userProfile.html";
        }
      }
    });
    if (!userExists) {
      alert("sorry your name doesn't exist in our database");
    } else if (!authenticatedUser) {
      alert("please make sure of your password");
    }

    // employeeLoginData.forEach((item) => {
    //   console.log(item);
    // });
  } else {
    alert("please enter some data");
  }
});

// {
//   "employees": [
//     {
//       "firstName": "Mohamed",
//       "lastName": "Magdy",
//       "address": "74 Magdy Saleh",
//       "email": "mhmdmagdy@gmail.com",
//       "age": 25,
//       "id": 0
//     }
//   ],
//   "loginData": [
//     {
//       "id": 0,
//       "userName": "mohamed22",
//       "password": "52104785"
//     }
//   ]
// }
