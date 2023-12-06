// Импорт стилей
import "../pages/index.css";
// Импорт исходного массива карточек
import initialCards from "./cards";
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const page = document.querySelector(".page");
const cardsContainer = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonEditClose = popupEdit.querySelector(".popup__close");

const popupNewCard = document.querySelector(".popup_type_new-card");
const buttonNewCard = document.querySelector(".profile__add-button");
const buttonNewCardClose = popupNewCard.querySelector(".popup__close");

const popupImage = document.querySelector(".popup_type_image");
const popupImageItem = popupImage.querySelector(".popup__image");
const popupTextItem = popupImage.querySelector(".popup__caption");
const buttonImageClose = popupImage.querySelector(".popup__close");

const popups = [popupEdit, popupNewCard, popupImage];
const buttonsClose = [buttonEditClose, buttonNewCardClose, buttonImageClose];
// Функция создания карточки
const createCard = (cardData, onDelete, onModalOpen) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener("click", () => onModalOpen(popupImage, cardData));
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => onDelete(cardElement));
  return cardElement;
};
// Функция удаления карточки
const onDelete = (card) => {
  card.remove();
};
// Функция показа popup
const onModalOpen = (modal, cardData = null) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener('keydown', onEscape);
  if (cardData) {
    popupImageItem.src = cardData.link;
    popupImageItem.alt = cardData.name;
    popupTextItem.textContent = cardData.name;
  }
};
// Функция закрытия popup
const onModalClose = (modal) => {
  document.removeEventListener('keydown', onEscape);
  modal.classList.remove("popup_is-opened");
  if (modal.classList.contains("popup_type_image")) {
    popupImageItem.src = "";
    popupImageItem.alt = "";
    popupTextItem.textContent = "";
  }
};
// Функция закрытия popup через крестик
const onButtonClose = (evt) => {
  onModalClose(evt.target.closest('.popup'));
}
// Функция закрытия popup через оверлей
const onModalOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    onModalClose(evt.target);
  }
}
// Функция закрытия popup через 'Esc' 
const onEscape = (evt) => {
  if (evt.key === 'Escape') {
    onModalClose(document.querySelector('.popup_is-opened'));
  }
}
// Вывести карточки на страницу
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, onDelete, onModalOpen));
});
// Добавление слушателей для открытия попапов
buttonEdit.addEventListener("click", () => onModalOpen(popupEdit));
buttonNewCard.addEventListener("click", () => onModalOpen(popupNewCard));
// Добавление слушателей для закрытия попапов
buttonsClose.forEach((button) => button.addEventListener("click", onButtonClose));
popups.forEach((popup) => popup.addEventListener("click", onModalOverlay));