
// Fonction pour configurer le formulaire de connexion
function setupLoginForm() {
    const loginForm = document.querySelector('form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        handleLogin();
    });

    // Récupérer l'élément "logout-link" pour y attacher un gestionnaire d'événement
    const logoutLink = document.getElementById('logout-link');

    // Lorsque l'utilisateur clique sur "logout-link", effectuer la déconnexion
    logoutLink.addEventListener('click', function() {
        // Supprimer le token du stockage local
        localStorage.removeItem('token');

        // Mettre à jour la page pour l'utilisateur déconnecté
        updatePageForLoggedOutUser();
    });
}

// Fonction pour gérer la soumission du formulaire de connexion
async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const apiUrl = 'http://localhost:5678/api/users/login';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await handleResponse(response);

        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        } else {
            console.error('Identifiants invalides');
        }
    } catch (error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Erreur lors de la requête : ' + error.message;
    }

    updatePageForLoggedInUser();
}

// Fonction pour gérer la réponse de la requête
async function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Identifiants invalides');
    }
    return await response.json();
}

// Fonction pour gérer la déconnexion
function handleLogout() {
    // Supprimer le token du stockage local
    localStorage.removeItem('token');

    // Mettre à jour la page pour l'utilisateur déconnecté
    updatePageForLoggedOutUser();

    // Rediriger vers la page de connexion (ou une autre page si nécessaire)
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.getElementById('logout-link');

    logoutLink.onclick = function() {
        handleLogout();
    };
});


// Fonction pour mettre à jour la page après la connexion
function updatePageForLoggedInUser() {
    // Logique spécifique pour l'utilisateur connecté
}

// Fonction pour mettre à jour la page après la déconnexion
function updatePageForLoggedOutUser() {
    // Logique spécifique pour l'utilisateur déconnecté
}

// Fonction pour vérifier si l'utilisateur est connecté
function checkUserLoggedIn() {
    // Implémentez votre propre logique pour vérifier si l'utilisateur est connecté
    // Retournez true si connecté, false sinon
    const token = localStorage.getItem('token');
    return token !== null;
}

// Fonction pour configurer la page en fonction de l'état de connexion
function configurePage(isLoggedIn) {
    if (isLoggedIn) {
        // Si l'utilisateur est connecté, mettre à jour la page
        console.log('User is logged in. Updating page...');
        updatePageForLoggedInUser();
    } else {
        // Si l'utilisateur n'est pas connecté, exécuter la configuration initiale
        console.log('User is not logged in. Setting up initial page...');
        // Vous pouvez ajouter ici la configuration initiale si nécessaire
    }
}

// Appel des fonctions au chargement de la page
setupLoginForm();

// Fonction pour mettre à jour la page après la connexion
function updatePageForLoggedInUser() {
    console.log('Updating page for logged-in user...');
    // Cacher le bouton Login et afficher le bouton Logout
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    if (loginLink && logoutLink) {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
    }

    // Afficher l'icône Modifier dans le menu de navigation
    const editModeIcon = document.getElementById('edit-mode-icon');
    if (editModeIcon) {
        editModeIcon.style.display = 'block';
    }

    // Modifier l'en-tête pour le mode édition avec un fond noir
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
        siteHeader.style.backgroundColor = 'black';
    }
}
document.addEventListener(function() {
    const logoutLink = document.getElementById('logout-link');

    logoutLink.onclick = function() {
        // Supprimer le token du stockage local
        localStorage.removeItem('token');

        // Mettre à jour la page pour l'utilisateur déconnecté
        updatePageForLoggedOutUser();
        
    };
});



// Fonction pour mettre à jour la page après la déconnexion
function updatePageForLoggedOutUser() {
    console.log('Updating page for logged-out user...');
    // Afficher le bouton Login et masquer le bouton Logout
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    if (loginLink && logoutLink) {
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }

    // Masquer l'icône Modifier dans le menu de navigation
    const editModeIcon = document.getElementById('edit-mode-icon');
    if (editModeIcon) {
        editModeIcon.style.display = 'none';
    }

    // Afficher les boutons de filtre de catégories
    const categoryFilters = document.getElementById('category-filters');
    if (categoryFilters) {
        categoryFilters.style.display = 'flex';
        categoryFilters.style.justifyContent = 'center';
    }

    // Si l'utilisateur n'est pas connecté, rétablir l'affichage des boutons
    const buttons = document.querySelectorAll('#category-filters button');
    buttons.forEach(button => {
        button.style.display = 'block';
    });

    // Restaurer l'en-tête à son état initial
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
        siteHeader.style.backgroundColor = ''; // Remettre à la couleur d'origine
    }
}


// Vérifier si l'utilisateur est connecté (utilisez votre propre logique)
const isLoggedIn = checkUserLoggedIn();
console.log('User is logged in:', isLoggedIn);

// Configurer la page en fonction de l'état de connexion
configurePage(isLoggedIn);

// Récupérer l'élément "login-link" pour y attacher un gestionnaire d'événement
const loginLink = document.getElementById('login-link');

// Lorsque l'utilisateur clique sur "login-link", rediriger vers la page de connexion
loginLink.addEventListener('click', function() {
    window.location.href = 'login.html';
});
