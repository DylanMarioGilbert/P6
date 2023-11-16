document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:5678/api/works'; // API pour récupérer les projets

    // Chargement initial des projets
    fetch(apiUrl)
        .then(response => response.json())
        .then(projects => {
            displayProjects(projects); // Affichage initial des projets
            setupFilters(projects); // Configuration des boutons de filtre
        })
        .catch(error => console.error('Erreur : ', error));
        // ... (ton code existant)


});

// Filtrage des projets par catégorie
function filterItems(categoryId, projects) {
    const filteredProjects = projects.filter(project => project.categoryId === categoryId);
    displayProjects(filteredProjects);
}

// Affichage de tous les projets
function showAllProjects(projects) {
    displayProjects(projects);
}

// Affichage des projets dans la galerie
function displayProjects(projects) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    projects.forEach(project => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        img.src = project.imageUrl;
        img.alt = project.title;

        figcaption.textContent = project.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

function setupFilters(projects) {
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(categories => {
            const filterContainer = document.getElementById('category-filters');
            filterContainer.style.display = 'flex';
            filterContainer.style.justifyContent = 'center';
            filterContainer.style.alignItems = 'center';

            // Création du bouton "Tous"
            const allButton = document.createElement('button');
            allButton.textContent = 'Tous';
            allButton.addEventListener('click', () => {
                showAllProjects(projects);
                const allButtons = document.querySelectorAll('button');
                allButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.color = '#1D6154';
                    btn.style.backgroundColor = 'white';
                });
                allButton.classList.add('active');
                allButton.style.color = 'white';
                allButton.style.backgroundColor = '#1D6154';
            });
            allButton.style.fontFamily = 'Syne';
            allButton.style.fontWeight = '700';
            allButton.style.color = '#1D6154';
            allButton.style.backgroundColor = 'white';
            allButton.style.margin = '1em';
            allButton.style.height = '4em';
            allButton.style.width = '10em';
            allButton.style.textAlign = 'center';
            allButton.style.borderRadius = '60px';
            filterContainer.appendChild(allButton);

            // Création des boutons pour chaque catégorie
            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category.name;

                button.addEventListener('click', () => {
                    filterItems(category.id, projects);
                    const allButtons = document.querySelectorAll('button');
                    allButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.style.color = '#1D6154';
                        btn.style.backgroundColor = 'white';
                    });
                    allButton.classList.remove('active');
                    allButton.style.color = '#1D6154';
                    allButton.style.backgroundColor = 'white';
                    button.classList.add('active');
                    button.style.color = 'white';
                    button.style.backgroundColor = '#1D6154';
                });

                button.style.fontFamily = 'Syne';
                button.style.fontWeight = '700';
                button.style.color = '#1D6154';
                button.style.backgroundColor = 'white';
                button.style.margin = '1em';
                button.style.height = '4em';
                button.style.width = '13em';
                button.style.textAlign = 'center';
                button.style.borderRadius = '60px';

                filterContainer.appendChild(button);
            });
            // Ajoute la condition pour gérer l'affichage des boutons
            if (checkUserLoggedIn()) {

                // Masquer les boutons individuels
            const buttons = document.querySelectorAll('#category-filters button');
            buttons.forEach(button => {
            button.style.display = 'none';
            });
            
            }
            // Ajouter une marge ou un espace supplémentaire entre les projets et les images de la galerie
            const gallery = document.querySelector('.gallery');
            gallery.style.marginTop = '20px'; // Vous pouvez ajuster la valeur selon vos besoins
            })
            
            
            
        .catch(error => console.error('Erreur lors de la récupération des catégories : ', error));
}


document.addEventListener('DOMContentLoaded', function() {
    // Récupérer l'élément "login-link" pour y attacher un gestionnaire d'événement
    const loginLink = document.getElementById('login-link');

    // Lorsque l'utilisateur clique sur "login-link", rediriger vers la page de connexion
    loginLink.addEventListener('click', function() {
        window.location.href = 'login.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si l'utilisateur est connecté (utilisez votre propre logique)
    const isLoggedIn = checkUserLoggedIn();
    console.log('User is logged in:', isLoggedIn);

    // Configurer la page en fonction de l'état de connexion
    configurePage(isLoggedIn);
});

function checkUserLoggedIn() {
    // Implémentez votre propre logique pour vérifier si l'utilisateur est connecté
    // Retournez true si connecté, false sinon
    const token = localStorage.getItem('token');
    return token !== null;
}

function configurePage(isLoggedIn) {
    if (isLoggedIn) {
        // Si l'utilisateur est connecté, mettre à jour la page
        console.log('User is logged in. Updating page...');
        updatePageForLoggedInUser();
    } else {
        // Si l'utilisateur n'est pas connecté, exécuter la configuration initiale
        console.log('User is not logged in. Setting up initial page...');
        setupInitialPage();
    }
}


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

    // Changer le texte du titre si nécessaire
    const siteTitle = document.getElementById('site-title');
    if (siteTitle) {
        siteTitle.textContent = 'Mode édition';
        siteTitle.color = 'White';
    }
}

