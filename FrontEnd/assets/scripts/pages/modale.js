import {
    switchModalContent,
    deleteItem,
    createGalleryItem,
    fetchCategories,

} from "../functions/modale.js"

const editModeIcon = document.getElementById("edit-mode-icon");
const backBtn = document.querySelector(".backBtn"); 
const addPicture = document.querySelector(".addPicture");
const modal = document.getElementById("modal-id");

const galleryContainer = document.getElementById("gallery-container");





addPicture.addEventListener("click", () => switchModalContent("create"));
backBtn.addEventListener("click", () => switchModalContent("list"));

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  const deleteIcon = item.querySelector(".delete-icon");

  deleteIcon.addEventListener("click", async () => {
    const itemId = item.dataset.itemId;

    deleteItem(itemId);

    item.remove();
  });
});



editModeIcon.addEventListener("click", function () {
  modal.style.display = "block";
  switchModalContent("list"); 
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((galleryData) => {
      console.log("Données de la galerie :", galleryData);


      galleryData.forEach(function (project) {
        console.log("Image URL :", project.imageUrl);
      });

      galleryContainer.innerHTML = "";

      galleryData.forEach(function (project) {
        const image = createGalleryItem(project);
        galleryContainer.appendChild(image);
      });
    })
    .catch((error) =>
      console.error(
        "Erreur lors de la récupération des données de la galerie : ",
        error
      )
    );
});



const addPhotoButton = document.querySelector(".addphoto button");
const photoContainer = document.querySelector(".photocontainer");
const hidePhoto = document.querySelector(".hidephoto");

addPhotoButton.addEventListener("click", async () => {
  const fileInput = document.querySelector('[name="image"]');
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.click();

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];

    const imageElement = document.createElement("img");
    imageElement.src = URL.createObjectURL(file);
    imageElement.style.maxWidth = "60%";
    imageElement.style.maxHeight = "169px";

    hidePhoto.style.display = "none";
    photoContainer.innerHTML = "";
    photoContainer.appendChild(imageElement);
  });
});

const createWorkForm = document.querySelector("#create-work");

createWorkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const imageInput = createWorkForm.querySelector('[name="image"]');
  const titleInput = createWorkForm.querySelector('[name="title"]');
  const categoryInput = createWorkForm.querySelector('[name="category"]');

  const title = titleInput.value.length > 0 ? titleInput.value : false;
  const category =
    categoryInput.value.length > 0 ? parseInt(categoryInput.value) : false;
  const image = imageInput.files.length ? imageInput.files[0] : false;

  if (title && category && image) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5678/api/works`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  }else {
    alert("Veuillez remplir le formulaire");
  }
});

const closeButton = document.querySelector(".close");
const closeButtonbis = document.querySelector(".closebis");

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    galleryContainer.innerHTML = "";
  }
});

closeButton.addEventListener("click", async function () {
  modal.style.display = "none";

  await new Promise((resolve) => setTimeout(resolve, 200)); 
  galleryContainer.innerHTML = "";
});

closeButtonbis.addEventListener("click", async function () {
  modal.style.display = "none";

  await new Promise((resolve) => setTimeout(resolve, 200)); 
  galleryContainer.innerHTML = "";
});

document.getElementById('create-work').addEventListener('input', function () {
    const isValid = this.checkValidity();

    document.querySelector('.buttoncenterbis button').disabled = !isValid;
});
