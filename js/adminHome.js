const adminPanelSection = document.querySelector(".admin__panel");
const attendancePanelSection = document.querySelector(".attendance__panel");
const adminPanelBtn = document.querySelector(".btn__admin");
const attendancePanelBtn = document.querySelector(".btn__attendance");
const tableBody = document.querySelector("tbody");
const confirmAttendance = document.querySelector(".confirm_attendance");
const employeeUserNameField = document.getElementById("employee_username");
const logOutBtn = document.querySelector(".logout");

let data;

adminPanelBtn.addEventListener("click", () => {
  if (adminPanelSection.classList.contains("hidden")) {
    attendancePanelSection.classList.add("hidden");
    adminPanelSection.classList.remove("hidden");
    adminPanelSection.classList.add("fadeIn");
  }
  adminHomeInit();
});

attendancePanelBtn.addEventListener("click", () => {
  if (attendancePanelSection.classList.contains("hidden")) {
    adminPanelSection.classList.add("hidden");
    attendancePanelSection.classList.remove("hidden");
    attendancePanelSection.classList.add("fadeIn");
  }
});

async function showEmployeesData() {
  const employeeInfoArray = (
    await axios.get("http://localhost:3000/userProfileData")
  ).data;
  let markeup;
  tableBody.innerHTML = "";
  employeeInfoArray.forEach((item) => {
    markeup = `<tr>
                <td>${item.name}</td>
                <td>${item.attendanceTime}</td>
                <td>${item.monthlyAttendanceTimes}</td>
                <td>${item.monthlylateTiems}</td>
              </tr>
              `;
    tableBody.insertAdjacentHTML("beforeend", markeup);
  });
}

async function adminHomeInit() {
  // Getting employees info from the database
  data = (await axios.get("http://localhost:3000/userProfileData")).data;
  showEmployeesData();
}
adminHomeInit();

confirmAttendance.addEventListener("click", async (e) => {
  e.preventDefault();
  let userId;
  let name;
  const date = new Date();

  const employeesLoginData = (
    await axios.get("http://localhost:3000/loginData")
  ).data;
  const employeesPersonalData = (
    await axios.get("http://localhost:3000/employees")
  ).data;
  console.log(employeesLoginData);
  console.log(data);
  console.log(employeesPersonalData);

  if (employeeUserNameField.value) {
    employeesLoginData.forEach((item) => {
      if (employeeUserNameField.value === item.userName) {
        console.log("succes");
        userId = item.id;
        employeesPersonalData.forEach((dataItem) => {
          if (userId === dataItem.id) {
            name = dataItem.firstName + " " + dataItem.lastName;
          }
        });
      }
    });
    console.log(userId);
    console.log(name);
    if (userId) {
      const obj = {
        id: userId,
        name,
        attendanceTime: `${date.getHours()} : ${date.getMinutes()}`,
        monthlyAttendanceTimes: 28,
        monthlylateTiems: 1,
        absenceTimes: 1,
      };
      console.log(obj);

      axios.post("http://localhost:3000/userProfileData", obj);
    }

    console.log(employeeUserNameField.value);
  } else {
    alert("please enter username");
  }
});

logOutBtn.addEventListener("click", () => {
  window.location.replace("../pages/adminLogIn.html");
});
