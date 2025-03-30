import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";
import pencil from "../images/pencil.svg";
import plus from "../images/plus.svg";
import pencilEditAvatar from "../images/pencil-edit-avatar.svg";
import closeIcon from "../images/close-icon-light.svg";

// Import CSS
import "./index.css";

// Import Scripts
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";

// Import API
import Api from "../utils/Api.js";

// Profile Elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Card Elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardEditButton = document.querySelector(".profile__add-btn");

// Edit Profile Modal Elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["modal__form"];
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

// Add Card Modal Elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = document.forms["add-card-form"];
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn_invalid");

// Preview Modal Elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = previewModal.querySelector(".modal__image");
const previewModalCaptionElement =
  previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

// Avatar Modal Elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = document.forms["edit-avatar"];
const avatarUrlInput = avatarModal.querySelector("#avatar-url-input");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");

// Delete Modal Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const confirmDeleteButton = deleteModal.querySelector(".modal__submit-btn");
const cancelDeleteButton = deleteModal.querySelector(
  ".modal__submit-btn_type_cancel"
);
const deleteForm = document.querySelector("#delete-form");

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".header__logo").src = logo;
  document.querySelector(".profile__avatar").src = avatar;
  document.querySelector(".profile__edit-btn img").src = pencil;
  document.querySelector(".profile__add-btn img").src = plus;
  document.querySelector(".profile__pencil-icon").src = pencilEditAvatar;
});

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://images.unsplash.com/photo-1576090639477-77983b72de6f?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Restaurant terrace",
    link: "https://plus.unsplash.com/premium_photo-1723491285855-f1035c4c703c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "An outdoor cafe",
    link: "https://plus.unsplash.com/premium_photo-1664286774203-bb49682f41b1?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "A very long bridge, over the forest",
    link: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tunnel with mornig light",
    link: "https://plus.unsplash.com/premium_photo-1673515243120-fd3691db5754?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mountain house",
    link: "https://images.unsplash.com/photo-1646070078388-4a566de7484d?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a1a73611-83bd-49ee-9a2d-adac9099df34",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([userData, cards]) => {
    console.log(cards);
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    document.querySelector(".profile__avatar").src = userData.avatar;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
  })
  .catch(console.error);

// delete modal confirmation

deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

cancelDeleteButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

confirmDeleteButton.addEventListener("click", () => {
  const cardElement = document.getElementById(deleteModal.dataset.cardToDelete);
  console.log("Card to delete:", deleteModal.dataset.cardToDelete);
  console.log("Card element found:", cardElement);

  if (!cardElement) return;

  const cardId = deleteModal.dataset.cardToDelete.replace("card-", "");
  console.log("Card ID to send to API:", cardId);

  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    });
});
// End

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

let selectedCard;
let selectedCardId;

function getCardElement(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Add a unique ID to the card
  cardElement.id = `card-${cardData._id}`;

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, cardData);
  });

  // Set initial like state
  if (cardData.isLiked) {
    cardLikeButton.classList.add("card__like-btn_liked");
  }

  // Open the card preview
  cardImage.addEventListener("click", () => {
    previewModalImageElement.src = cardData.link;
    previewModalImageElement.alt = cardData.name;
    previewModalCaptionElement.textContent = cardData.name;
    openModal(previewModal);
  });

  // Add click event listener for like button
  cardLikeButton.addEventListener("click", () => {
    handleLikeClick(cardData._id, cardLikeButton);
  });
  return cardElement;
}

// Open Avatar Modal
profileAvatarBtn.addEventListener("click", () => {
  resetValidation(avatarForm, settings);
  openModal(avatarModal);
});

// Close Avatar Modal
avatarModalCloseBtn.addEventListener("click", () => closeModal(avatarModal));

// Avatar Form Submission
avatarForm.addEventListener("submit", handleAvatarSubmit);

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

// Avatar
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector(".modal__submit-btn");
  const avatarImg = document.querySelector(".profile__avatar");

  // Set loading state
  submitButton.disabled = true;
  submitButton.classList.add("modal__submit-btn_loading");
  submitButton.textContent = "Saving...";

  api
    .updateAvatar({ avatar: avatarUrlInput.value })
    .then((userData) => {
      avatarImg.src = "";
      avatarImg.src = `${userData.avatar}?t=${Date.now()}`;

      // Reset form and close modal
      avatarForm.reset();
      closeModal(avatarModal);

      // Reset validation state
      resetValidation(avatarForm, settings);

      // Reset button state
      submitButton.classList.remove("modal__submit-btn_loading");
      submitButton.textContent = "Save";
      disableButton(submitButton, settings);
    })
    .catch((err) => {
      console.error("Avatar update failed:", err);
      alert("Failed to update avatar. Please try again.");

      // Reset button state but keep current validation
      submitButton.classList.remove("modal__submit-btn_loading");
      submitButton.textContent = "Save";
      submitButton.disabled = false;
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitButton = cardForm.querySelector(".modal__submit-btn");

  // Set loading state
  submitButton.disabled = true;
  submitButton.classList.add("modal__submit-btn_loading");
  submitButton.textContent = "Creating...";

  api
    .addCard({
      name: cardNameInput.value,
      link: cardLinkInput.value,
    })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsList.prepend(cardElement);

      // Reset form and close modal
      cardForm.reset();
      closeModal(cardModal);

      // Reset validation state
      resetValidation(cardForm, settings);
    })
    .catch((err) => {
      console.error("Failed to add card:", err);
    })
    .finally(() => {
      // Reset button state
      submitButton.classList.remove("modal__submit-btn_loading");
      submitButton.textContent = "Create";
      disableButton(submitButton, settings);
    });
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = editFormElement.querySelector(".modal__submit-btn");

  // Set loading state
  submitButton.disabled = true;
  submitButton.classList.add("modal__submit-btn_loading");
  submitButton.textContent = "Saving...";

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;

      // Reset form and close modal
      editFormElement.reset();
      closeModal(editModal);

      // Reset validation state
      resetValidation(editFormElement, settings);

      // Reset button state
      submitButton.classList.remove("modal__submit-btn_loading");
      submitButton.textContent = "Save";
      disableButton(submitButton, settings);
    })
    .catch((err) => {
      console.error("Profile update failed:", err);

      // Reset button state but keep current validation
      submitButton.classList.remove("modal__submit-btn_loading");
      submitButton.textContent = "Save";
      submitButton.disabled = false;
    });
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
      selectedCard = null;
      selectedCardId = null;
    })
    .catch(console.error);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleLikeClick(cardId, likeButton) {
  // 1. Check if the card is currently liked
  const isLiked = likeButton.classList.contains("card__like-btn_liked");

  api
    .likeStatus(cardId, isLiked)
    .then((updatedCard) => {
      if (updatedCard.isLiked) {
        likeButton.classList.add("card__like-btn_liked");
      } else {
        likeButton.classList.remove("card__like-btn_liked");
      }
    })
    .catch((err) => {
      console.error("Error updating like status:", err);
    });
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;

  resetValidation(editFormElement, settings);
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardEditButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

enableValidation(settings);
