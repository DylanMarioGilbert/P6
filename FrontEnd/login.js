document.addEventListener('DOMContentLoaded', function() {
    const article = document.querySelector('article');
    const form = document.querySelector('form');
    const loginTitle = document.querySelector('h2#loginTitle');
    const emailLabel = document.querySelector('label[for="email"]');
    const emailInput = document.getElementById('email');
    const passwordLabel = document.querySelector('label[for="password"]');
    const passwordInput = document.getElementById('password');

    loginTitle.style.marginBottom = '30px'; // Ajuster la marge inférieure du titre

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


  

