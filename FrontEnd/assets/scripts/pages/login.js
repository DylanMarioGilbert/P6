import {
  updatePageForLoggedInUser,
  updatePageForLoggedOutUser,
  isLoggedIn,
  setupLoginForm,
} from "../functions/login.js";

// Appel des fonctions au chargement de la page
setupLoginForm();

document.addEventListener(function () {
  const logoutLink = document.getElementById("logout-link");

  logoutLink.onclick = function () {
    // Supprimer le token du stockage local
    localStorage.removeItem("token");

    // Mettre à jour la page pour l'utilisateur déconnecté
    updatePageForLoggedOutUser();
  };
});

// Configurer la page en fonction de l'état de connexion
if (isLoggedIn) {
  // Si l'utilisateur est connecté, mettre à jour la page
  console.log("User is logged in. Updating page...");
  updatePageForLoggedInUser();
}

// Récupérer l'élément "login-link" pour y attacher un gestionnaire d'événement
const loginLink = document.getElementById("login-link");

// Lorsque l'utilisateur clique sur "login-link", rediriger vers la page de connexion
loginLink.addEventListener("click", function () {
  window.location.href = "login.html";
});
