async function getCurrentUserID() {
  let currentUserID = (await axios.get("http://localhost:3000/currentUser"))
    .data.id;
  console.log(currentUserID);

  localStorage.setItem("currentUserId", currentUserID);
}

getCurrentUserID();
