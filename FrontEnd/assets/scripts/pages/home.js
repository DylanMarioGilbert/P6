import {
  updatePageForLoggedInUser,
  isLoggedIn,
  handleLogout,
} from "../functions/login.js";
import {displayProjects, setupFilters} from "../functions/home.js";

const logoutLink = document.getElementById("logout-link");

logoutLink.onclick = function () {
  handleLogout();
};

window.onload = async function () {
  const apiUrl = "http://localhost:5678/api/works";

  try {
    const response = await fetch(apiUrl);
    const projects = await response.json();

    displayProjects(projects);
    setupFilters(projects);
  } catch (error) {
    console.error("Erreur : ", error);
  }
};


const loginLink = document.getElementById("login-link");

loginLink.addEventListener("click", function () {
  window.location.href = "login.html";
});
//});

if (isLoggedIn) {
  console.log("User is logged in. Updating page...");
  updatePageForLoggedInUser();
} else {
  console.log("User is not logged in. Setting up initial page...");
  setupInitialPage();
}
