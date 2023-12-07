// Функция открытия popup
const onModalOpen = (modal) => {
  const closeButton = modal.querySelector(".popup__close");
  modal.classList.add("popup_is-opened");
  closeButton.addEventListener("click", modalCloseHandler);
  document.addEventListener("keydown", keyboardHandler);
  modal.addEventListener("click", modalOverlayHandler);
};

// Функция закрытия popup
const onModalClose = (modal) => {
  const closeButton = modal.querySelector(".popup__close");
  modal.removeEventListener("click", modalOverlayHandler);
  document.removeEventListener("keydown", keyboardHandler);
  closeButton.addEventListener("click", modalCloseHandler);
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

export { onModalOpen, onModalClose };
