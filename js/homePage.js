const inputFields = document.querySelectorAll("input");
const inputFieldsArray = Array.from(inputFields);

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
