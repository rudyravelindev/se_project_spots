const initialCards = [
  {
    name: "Val Thorens",
    link: "https://unsplash.com/fr/photos/foule-rassemblee-dans-le-parc-enneige-du-mont-Q1DWowDiki0",
  },
  {
    name: "Restaurant terrace",
    link: "https://unsplash.com/fr/photos/une-longue-table-en-bois-avec-des-assiettes-blanches-dessus-_HIUS4HSolw",
  },
  {
    name: "An outdoor cafe",
    link: "https://unsplash.com/fr/photos/un-couple-de-femmes-assises-a-une-table-devant-des-plantes-en-pot-VujVETzx6ms",
  },
  {
    name: "A very long bridge, over the forest",
    link: "https://unsplash.com/fr/photos/vue-aerienne-dune-route-entouree-darbres-verts-qzgN45hseN0",
  },
  {
    name: "Tunnel with mornig light",
    link: "https://unsplash.com/fr/photos/photo-a-faible-exposition-de-voitures-sur-la-route-pendant-la-nuit-MnHQMzC6n-o",
  },
  {
    name: "Mountain house",
    link: "https://unsplash.com/fr/photos/une-structure-en-bois-avec-une-lumiere-a-linterieur-6defJnqqIH8",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-modal");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");

function openModal() {
  editModal.classList.add("modal__opened");
}

function closeModal() {
  editModal.classList.remove("modal__opened");
}

profileEditButton.addEventListener("click", openModal);

editModalCloseBtn.addEventListener("click", closeModal);
