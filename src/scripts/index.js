// Импорт стилей
import "../pages/index.css";

// Импорт исходного массива карточек
import initialCards from "./cards";

// Импорт модулей
import { createCard, onDelete, onLike } from "./card";
import {
  onModalOpen,
  onModalClose,
  modalCloseHandler,
  modalOverlayHandler,
} from "./modal";
import { isValid, toggleButtonState } from "./validation";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsContainer = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditForm = document.forms["edit-profile"];
const popupEditInputs = Array.from(
  popupEditForm.querySelectorAll(".popup__input")
);
const popupEditName = popupEditForm.name;
const popupEditDescription = popupEditForm.description;
const popupEditSubmitButton = popupEditForm.querySelector(".popup__button");
const buttonEdit = document.querySelector(".profile__edit-button");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms["new-place"];
const popupNewCardName = popupNewCardForm["place-name"];
const popupNewCardLink = popupNewCardForm.link;
const buttonNewCard = document.querySelector(".profile__add-button");

const popupImage = document.querySelector(".popup_type_image");
const popupImagePhoto = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const popups = document.querySelectorAll(".popup");
const popupCloseButtons = document.querySelectorAll(".popup__close");

// Функция постановики слушателей для валидации формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`.popup__input`));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
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
    { name: popupNewCardName.value, link: popupNewCardLink.value },
    onLike,
    onDelete,
    popupImageOpenHandler
  );
  cardsContainer.prepend(newCard);
  popupNewCardForm.reset();
  onModalClose(popupNewCard);
};

// Обработчик открытия модального окна для редактирования профиля
const popupEditOpenHandler = () => {
  popupEditName.value = profileTitle.textContent;
  popupEditDescription.value = profileDescription.textContent;
  // Обновляем состояние инпутов и кнопки после изменения данных в форме
  popupEditInputs.forEach((inputElement) => {
    isValid(popupEditForm, inputElement);
  });
  toggleButtonState(popupEditInputs, popupEditSubmitButton);
  onModalOpen(popupEdit);
};

// Обработчик открытия модального окна изображения карточки
const popupImageOpenHandler = (evt) => {
  const card = evt.target.closest(".card");
  const imageItem = card.querySelector(".card__image");
  const textItem = card.querySelector(".card__title");
  popupImagePhoto.src = imageItem.src;
  popupImagePhoto.alt = imageItem.alt;
  popupImageCaption.textContent = textItem.textContent;
  onModalOpen(popupImage);
};

// Вывести карточки на страницу
initialCards.forEach((card) => {
  cardsContainer.append(
    createCard(cardTemplate, card, onLike, onDelete, popupImageOpenHandler)
  );
});

// Добавление слушателей для открытия попапов
buttonEdit.addEventListener("click", popupEditOpenHandler);
buttonNewCard.addEventListener("click", () => onModalOpen(popupNewCard));

// Добавление слушателей для закрытия попапов
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", modalCloseHandler);
});
popups.forEach((popup) => {
  popup.addEventListener("mousedown", modalOverlayHandler);
});

// Добавления обработчиков форм
popupEditForm.addEventListener("submit", editSubmitHandler);
popupNewCardForm.addEventListener("submit", newCardSubmitHandler);

// Добавление валидации
setEventListeners(popupEditForm);
setEventListeners(popupNewCardForm);
