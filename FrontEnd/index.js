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

// Configuration des boutons de filtre
function setupFilters(projects) {
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(categories => {
            const filterContainer = document.getElementById('category-filters');


            const allButton = document.createElement('button');
            allButton.textContent = 'Tous';
            allButton.addEventListener('click', () => showAllProjects(projects)); // Action sur le bouton "Tous"
            filterContainer.appendChild(allButton);

            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category.name;

                button.addEventListener('click', () => {
                    filterItems(category.id, projects); // Appel de la fonction de filtrage
                });

                filterContainer.appendChild(button);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des catégories : ', error));
}
