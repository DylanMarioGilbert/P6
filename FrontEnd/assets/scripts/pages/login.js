import {
  updatePageForLoggedInUser,
  updatePageForLoggedOutUser,
  isLoggedIn,
  setupLoginForm,
} from "../functions/login.js";

setupLoginForm();

document.addEventListener(function () {
  const logoutLink = document.getElementById("logout-link");

  logoutLink.onclick = function () {
    localStorage.removeItem("token");

    updatePageForLoggedOutUser();
  };
});

if (isLoggedIn) {
  console.log("User is logged in. Updating page...");
  updatePageForLoggedInUser();
}

const loginLink = document.getElementById("login-link");

loginLink.addEventListener("click", function () {
  window.location.href = "login.html";
});
