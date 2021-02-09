// DOM Elements
const dailyReportBtn = document.querySelector(".btn__daily");
const monthlyReportBtn = document.querySelector(".btn__monthly");
const dailyReportDiv = document.querySelector(".daily");
const monthlyReportDiv = document.querySelector(".monthly");
const employeeNameParagraph = document.querySelector(".employee__name");
const attendanceTimeParagraph = document.querySelector(".attendance__time");
const userNameParagraph = document.querySelector(".userName");
const monthlyAttendanceTimesParagraph = document.querySelector(
  ".attendance__times"
);
const monthlyLateTimesParagraph = document.querySelector(".late__times");
const monthlyAbsenceTimesParagraph = document.querySelector(".absence__times");
const logoutButton = document.querySelector(".logout");

async function getCurrentUserID() {
  let currentUserID = (await axios.get("http://localhost:3000/currentUser"))
    .data.id;

  localStorage.setItem("currentUserId", currentUserID);
}

async function getCurrentUserData() {
  let currentUserData = (
    await axios.get("http://localhost:3000/userProfileData")
  ).data;

  currentUserData.forEach((item) => {
    if (item.id == localStorage.getItem("currentUserId")) {
      localStorage.setItem("currentUserData", JSON.stringify(item));
      showDailyData(JSON.parse(localStorage.getItem("currentUserData")));
      showemployeeName(JSON.parse(localStorage.getItem("currentUserData")));
      showMonthlyData(JSON.parse(localStorage.getItem("currentUserData")));
    }
  });
}

getCurrentUserID();
getCurrentUserData();

dailyReportBtn.addEventListener("click", () => {
  if (dailyReportDiv.classList.contains("hidden")) {
    monthlyReportDiv.classList.add("hidden");
    dailyReportDiv.classList.remove("hidden");
    dailyReportDiv.classList.add("fadeIn");
  }
});

monthlyReportBtn.addEventListener("click", () => {
  if (monthlyReportDiv.classList.contains("hidden")) {
    dailyReportDiv.classList.add("hidden");
    monthlyReportDiv.classList.remove("hidden");
    monthlyReportDiv.classList.add("fadeIn");
  }
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("currentUserId");
  localStorage.removeItem("currentUserData");
  window.location.replace("../index.html");
});

function showemployeeName(currentUserData) {
  userNameParagraph.textContent = currentUserData.name;
}

function showDailyData(currentUserData) {
  employeeNameParagraph.textContent = `Employee Name : ${currentUserData.name}`;
  attendanceTimeParagraph.textContent = `Attendance Time : ${currentUserData.attendanceTime}`;
}

function showMonthlyData(currentUserData) {
  monthlyAttendanceTimesParagraph.textContent = `Attendance Times : ${currentUserData.monthlyAttendanceTimes}`;
  monthlyLateTimesParagraph.textContent = `Late Time : ${currentUserData.monthlylateTiems}`;
  monthlyAbsenceTimesParagraph.textContent = `Absence Times : ${currentUserData.absenceTimes}  `;
}
