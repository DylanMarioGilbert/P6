export function switchModalContent(mode) {
    const modalTarget = document.getElementById("modal-id");
    const listContainer = modalTarget.querySelector(".modal-content-list");
    const createContainer = modalTarget.querySelector(".modal-content-create");
  
    if (mode === "list") {
      createContainer.style.display = "none";
      listContainer.style.display = "block";
    } else if (mode === "create") {
      listContainer.style.display = "none";
      createContainer.style.display = "block";
    }
  }

  export function deleteItem(id) {
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert(`L'élément ${id} a été supprimé avec succès.`);
        } else {
          alert(`Erreur lors de la suppression de l'élément ${id}.`);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'élément :", error);
      });
  }

  export function createGalleryItem(project) {
    const id = project.id;
    const imageUrl = project.imageUrl;
    // On crée une div temporaire
    const div = document.createElement("div");
  
    // Pour injecter avec des templates strings -> ``
    div.innerHTML = `
          <div class="gallery-item">
              <img src="${imageUrl}" alt="Image de la galerie"></img>
              <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
          </div>   
      `;
  
    /** Attention à cette étape nous avons une div parente
       * <div>
              <div class="gallery-item">
                  <img src="${imageUrl}" alt="Image de la galerie"></img>
                  <butto class="delete-btn"n>Delete Icon</button>
              </div>   
          </div>
       **/
  
    const deleteBtn = div.querySelector(".delete-btn");
  
    // Utilisez une fonction immédiate pour créer une portée fermée
    (function (itemId) {
      deleteBtn.addEventListener("click", function () {
        deleteItem(itemId);
      });
    })(id);
  
    return div.firstElementChild;
  }

  export function fetchCategories() {
    fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name; 
          categorySelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
      });
  }

const categorySelect = document.getElementById("category");

fetchCategories(categorySelect);