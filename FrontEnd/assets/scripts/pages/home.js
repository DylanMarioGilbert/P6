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

//document.addEventListener('DOMContentLoaded', function() {
// Récupérer l'élément "login-link" pour y attacher un gestionnaire d'événement
const loginLink = document.getElementById("login-link");

// Lorsque l'utilisateur clique sur "login-link", rediriger vers la page de connexion
loginLink.addEventListener("click", function () {
  window.location.href = "login.html";
});
//});

if (isLoggedIn) {
  // Si l'utilisateur est connecté, mettre à jour la page
  console.log("User is logged in. Updating page...");
  updatePageForLoggedInUser();
} else {
  // Si l'utilisateur n'est pas connecté, exécuter la configuration initiale
  console.log("User is not logged in. Setting up initial page...");
  setupInitialPage();
}
