document.addEventListener('DOMContentLoaded', function() {
    const article = document.querySelector('article');
    const form = document.querySelector('form');
    const loginTitle = document.querySelector('h2#loginTitle');
    const emailLabel = document.querySelector('label[for="email"]');
    const emailInput = document.getElementById('email');
    const passwordLabel = document.querySelector('label[for="password"]');
    const passwordInput = document.getElementById('password');

    if (loginTitle) {
        loginTitle.style.marginBottom = '30px';
    }
    emailInput.style.width = '250px'; // Ajuster la largeur de l'input email
    passwordInput.style.width = '250px'; // Ajuster la largeur de l'input password

    emailInput.style.height = '30px'; // Ajuster la hauteur de l'input email selon vos besoins
    passwordInput.style.height = '30px'; // Ajuster la hauteur de l'input password selon vos besoins

    // Ajout d'espaces en bas des libellés et des champs de saisie
    emailLabel.style.marginBottom = '5px';
    emailInput.style.marginTop = '5px';
    emailInput.style.marginBottom = '15px';

    passwordLabel.style.marginTop = '5px';
    passwordInput.style.marginTop = '5px';

    article.style.display = 'flex';
    article.style.flexDirection = 'column';
    article.style.alignItems = 'center';

    form.style.width = '200px'; // Ajuster la largeur du formulaire

    const main = document.querySelector('main');
    main.style.display = 'flex';
    main.style.justifyContent = 'center';
    form.style.margin = 'auto'; // Centrer le formulaire

});

document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.getElementById('loginTitle');
    const submitButton = document.querySelector('input[type="submit"]');
    const forgotPasswordLink = document.querySelector('a[href="#"]'); // Assurez-vous que le sélecteur est correct pour le lien "Mot de passe oublié"

    loginLink.style.marginLeft = '30px'; // Ajuster le décalage du lien Log In
    submitButton.style.marginLeft = '30px'; // Ajuster le décalage du bouton de connexion
    forgotPasswordLink.style.marginLeft = '30px'; // Ajuster le décalage du lien "Mot de passe oublié"

    submitButton.style.backgroundColor = '#1D6154'; // Couleur de fond du bouton
    submitButton.style.color = 'white'; // Couleur du texte
    submitButton.style.padding = '10px 20px'; // Rembourrage intérieur du bouton
    submitButton.style.border = 'none'; // Retirer la bordure du bouton
    submitButton.style.borderRadius = '15px'; // Bordures arrondies
    submitButton.style.cursor = 'pointer'; // Changement de curseur au survol
});

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Envoi de la requête POST à l'endpoint d'authentification
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Identifiants invalides');
            }
            return response.json();
        })
        .then(data => {
            // Traitement de la réponse
            if (data.token) {
                // Stocker le token dans le stockage local (localStorage)
                localStorage.setItem('token', data.token);

         
                // Authentification réussie, rediriger vers la page d'accueil
                window.location.href = 'index.html';


            } else {
                // Authentification échouée, afficher un message d'erreur par exemple
                console.error('Identifiants invalides');
            }
        })
        .catch(error => {
            // Afficher le message d'erreur en cas d'erreur de la requête
            errorMessage.textContent = 'Erreur lors de la requête : ' + error.message;
        });
        
        const token = localStorage.getItem('token');

        if (token) {
            // L'utilisateur est connecté
        } else {
            // L'utilisateur n'est pas connecté
        }
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
    function updatePageForLoggedOutUser() {
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
    
        // Restaurer le texte du titre si nécessaire
        const siteTitle = document.getElementById('site-title');
        if (siteTitle) {
            siteTitle.textContent = 'Sophie Bluel Architecte d\'intérieur';
        }
    }
    
});

