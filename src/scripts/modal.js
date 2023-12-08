// Функция открытия popup
const onModalOpen = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyboardHandler);
};

// Функция закрытия popup
const onModalClose = (modal) => {
  document.removeEventListener("keydown", keyboardHandler);
  modal.classList.remove("popup_is-opened");
};

// Обработчик закрытия popup через крестик
const modalCloseHandler = (evt) => {
  onModalClose(evt.target.closest(".popup"));
};

// Обработчик закрытия popup через 'Esc'
const keyboardHandler = (evt) => {
  if (evt.key === "Escape") {
    onModalClose(document.querySelector(".popup_is-opened"));
  }
};

// Обработчик закрытия popup через оверлей
const modalOverlayHandler = (evt) => {
  if (evt.target.classList.contains("popup")) {
    onModalClose(evt.target);
  }
};

export { onModalOpen, onModalClose, modalCloseHandler, modalOverlayHandler };
