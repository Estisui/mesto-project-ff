// DOM узлы
const popupEditForm = document.forms["edit-profile"];
const popupEditName = popupEditForm.name;
const popupEditDescription = popupEditForm.description;
const popupImage = document.querySelector(".popup_type_image");
const popupImageItem = popupImage.querySelector(".popup__image");
const popupTextItem = popupImage.querySelector(".popup__caption");
// Функция открытия popup
const onModalOpen = (modal, modalData = null) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyboardHandler);
  if (modalData) {
    switch (modalData.type) {
      case "image":
        popupImageItem.src = modalData.link;
        popupImageItem.alt = modalData.name;
        popupTextItem.textContent = modalData.name;
        break;
      case "edit":
        popupEditName.value = modalData.name;
        popupEditDescription.value = modalData.description;
        break;
    }
  }
};
// Функция закрытия popup
const onModalClose = (modal) => {
  document.removeEventListener("keydown", keyboardHandler);
  modal.classList.remove("popup_is-opened");
  if (modal.classList.contains("popup_type_image")) {
    popupImageItem.src = "";
    popupImageItem.alt = "";
    popupTextItem.textContent = "";
  }
};
// Обработчик закрытия popup через 'Esc'
const keyboardHandler = (evt) => {
  if (evt.key === "Escape") {
    onModalClose(document.querySelector(".popup_is-opened"));
  }
};

export { onModalOpen, onModalClose };
