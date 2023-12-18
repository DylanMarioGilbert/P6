import { isLoggedIn } from "./login.js";
// Filtrage des projets par catégorie
export function filterItems(categoryId, projects) {
  const filteredProjects = projects.filter(
    (project) => project.categoryId === categoryId
  );
  displayProjects(filteredProjects);
}

// Affichage de tous les projets
export function showAllProjects(projects) {
  displayProjects(projects);
}

// Affichage des projets dans la galerie
export function displayProjects(projects) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  projects.forEach((project) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = project.imageUrl;
    img.alt = project.title;

    figcaption.textContent = project.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

export function setupFilters(projects) {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      const filterContainer = document.getElementById("category-filters");
      filterContainer.style.display = "flex";
      filterContainer.style.justifyContent = "center";
      filterContainer.style.alignItems = "center"; // ...

      // Création du bouton "Tous"
      const allButton = document.createElement("button");
      allButton.textContent = "Tous";
      allButton.addEventListener("click", () => {
        showAllProjects(projects);
        const allButtons = document.querySelectorAll("button");
        allButtons.forEach((btn) => btn.classList.remove("active"));
        allButton.classList.add("active");

      });
      filterContainer.appendChild(allButton);

      categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.addEventListener("click", () => {
          filterItems(category.id, projects);
          const allButtons = document.querySelectorAll("button");
          allButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
        });
        filterContainer.appendChild(button);
      });
      if (isLoggedIn) {
        const buttons = document.querySelectorAll("#category-filters button");
        buttons.forEach((button) => {
          button.style.display = "none";
        });
      }
      const gallery = document.querySelector(".gallery");
      gallery.style.marginTop = "20px"; 
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des catégories : ", error)
    );
}
