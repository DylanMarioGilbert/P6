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
        })
        .catch(error => console.error('Erreur lors de la récupération des catégories : ', error));
}
