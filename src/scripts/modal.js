// Функция открытия popup
const onModalOpen = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleKeyboard);
};

// Функция закрытия popup
const onModalClose = (modal) => {
  document.removeEventListener("keydown", handleKeyboard);
  modal.classList.remove("popup_is-opened");
};

// Обработчик закрытия popup через крестик
const handleModalClose = (evt) => {
  onModalClose(evt.target.closest(".popup"));
};

// Обработчик закрытия popup через 'Esc'
const handleKeyboard = (evt) => {
  if (evt.key === "Escape") {
    onModalClose(document.querySelector(".popup_is-opened"));
  }
};

// Обработчик закрытия popup через оверлей
const handleModalOverlay= (evt) => {
  if (evt.target.classList.contains("popup")) {
    onModalClose(evt.target);
  }
};

export { onModalOpen, onModalClose, handleModalClose, handleModalOverlay };
