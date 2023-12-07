// Импорт стилей
import "../pages/index.css";
// Импорт исходного массива карточек
import initialCards from "./cards";
// Импорт модулей
import { createCard, onDelete, onLike } from './card';
import { onModalOpen, onModalClose } from "./modal";
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsContainer = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditForm = document.forms["edit-profile"];
const popupEditName = popupEditForm.name;
const popupEditDescription = popupEditForm.description;
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonEditClose = popupEdit.querySelector(".popup__close");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms["new-place"];
const popupNewCardName = popupNewCardForm["place-name"];
const popupNewCardLink = popupNewCardForm.link;
const buttonNewCard = document.querySelector(".profile__add-button");
const buttonNewCardClose = popupNewCard.querySelector(".popup__close");

const popupImage = document.querySelector(".popup_type_image");
const buttonImageClose = popupImage.querySelector(".popup__close");

const popups = [popupEdit, popupNewCard, popupImage];
const buttonsClose = [buttonEditClose, buttonNewCardClose, buttonImageClose];
// Обработчик закрытия popup через крестик
const modalCloseHandler = (evt) => {
  onModalClose(evt.target.closest(".popup"));
};
// Обработчик закрытия popup через оверлей
const modalOverlayHandler = (evt) => {
  if (evt.target.classList.contains("popup")) {
    onModalClose(evt.target);
  }
};
// Обработчик формы редактирования профиля
const editSubmitHandler = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupEditName.value;
  profileDescription.textContent = popupEditDescription.value;
  popupEditForm.reset();
  onModalClose(popupEdit);
};
// Обработчик формы добавления карточки
const newCardSubmitHandler = (evt) => {
  evt.preventDefault();
  const newCard = createCard(
    cardTemplate,
    popupImage,
    { name: popupNewCardName.value, link: popupNewCardLink.value },
    onLike,
    onDelete,
    onModalOpen
  );
  cardsContainer.prepend(newCard);
  popupNewCardForm.reset();
  onModalClose(popupNewCard);
};
// Вывести карточки на страницу
initialCards.forEach((card) => {
  cardsContainer.append(createCard(cardTemplate, popupImage, card, onLike, onDelete, onModalOpen));
});
// Добавление слушателей для открытия попапов
buttonEdit.addEventListener("click", () =>
  onModalOpen(popupEdit, {
    type: "edit",
    name: profileTitle.textContent,
    description: profileDescription.textContent,
  })
);
buttonNewCard.addEventListener("click", () => onModalOpen(popupNewCard));
// Добавление слушателей для закрытия попапов
buttonsClose.forEach((button) =>
  button.addEventListener("click", modalCloseHandler)
);
popups.forEach((popup) => popup.addEventListener("click", modalOverlayHandler));
// Добавления обработчиков форм
popupEditForm.addEventListener("submit", editSubmitHandler);
popupNewCardForm.addEventListener("submit", newCardSubmitHandler);
