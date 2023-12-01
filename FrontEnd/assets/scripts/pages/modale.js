// Sélectionnez le bouton "Modifier"
const editModeIcon = document.getElementById('edit-mode-icon');
const backBtn = document.querySelector(".backBtn"); // TODO à modifier
const addPicture = document.querySelector(".addPicture");
// Sélectionnez la modale
const modal = document.getElementById('modal-id');

// Sélectionnez le conteneur de la galerie dans la modale
const galleryContainer = document.getElementById('gallery-container');

// // Fonction pour créer un élément d'image de la galerie
// function createGalleryImage(imageUrl) {
//     const image = document.createElement('img');
//     image.src = imageUrl;
//     image.alt = 'Image de la galerie';
//     // Vous pouvez ajouter des styles ou des classes supplémentaires ici si nécessaire
//     return image;
// }

function switchModalContent(mode) {
    const modalTarget = document.getElementById('modal-id');
    const listContainer = modalTarget.querySelector(".modal-content-list");
    const createContainer = modalTarget.querySelector(".modal-content-create");

    if(mode === "list") {
        // affiche le content list
        createContainer.style.display = "none";
        listContainer.style.display = "block";
    }else if (mode === "create") {
        // affiche le mode create
        listContainer.style.display = "none";
        createContainer.style.display = "block";
    }
}

addPicture.addEventListener("click", () => switchModalContent("create"))

//// bouton retour sur la vue galerie
// backBtn.addEventListener("click", () => switchModalContent("list"))

function deleteItem (id) {
    alert(`Il faut supprimer l'élément ${id}`)
}

// Fonction pour créer un élément d'image de la galerie
function createGalleryItem(project) {
    const id = project.id;
    const imageUrl = project.imageUrl;
    // On crée une div temporaire
    const div = document.createElement('div');

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
    
    const deleteBtn = div.querySelector('.delete-btn');
    deleteBtn.addEventListener("click", () => deleteItem(id))

    // On renvoie la div enfant uniquement
    return div.firstElementChild;
}




// Ajoutez un gestionnaire d'événements au clic sur le bouton "Modifier"
editModeIcon.addEventListener('click', function() {
    // Affichez la modale
    modal.style.display = 'block';
    switchModalContent("list") // On remet la modal sur la vue gallery
    // Récupérez les données de la galerie depuis l'API
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(galleryData => {
            console.log('Données de la galerie :', galleryData);

            // Affichez les images de la galerie dans la console pour vérifier
            galleryData.forEach(function (project) {
                console.log('Image URL :', project.imageUrl);
            });


            // Effacez le contenu du conteneur de la galerie avant d'ajouter de nouvelles images
            galleryContainer.innerHTML = '';

            // Affichez les images de la galerie dans le conteneur de la galerie
            galleryData.forEach(function (project) {
                const image = createGalleryItem(project);
                galleryContainer.appendChild(image);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des données de la galerie : ', error));
});


// Sélectionnez le bouton de fermeture
const closeButton = document.querySelector('.close');

// Ajoutez un gestionnaire d'événements au clic sur le bouton de fermeture
closeButton.addEventListener('click', function() {
    // Fermez la modale
    modal.style.display = 'none';
    // Effacez le contenu du conteneur de la galerie lors de la fermeture de la modale
    galleryContainer.innerHTML = '';
    // Gérez la fermeture de la modale lorsque l'utilisateur clique en dehors de celle-ci
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        // Effacez le contenu du conteneur de la galerie lors de la fermeture de la modale
        galleryContainer.innerHTML = '';
    }
});
   
});





