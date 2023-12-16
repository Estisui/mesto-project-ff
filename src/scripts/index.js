// Импорт стилей
import "../pages/index.css";

// Импорт картинок
import profileImageSrc from "../images/avatar.jpg";

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
import { clearValidation, enableValidation } from "./validation";
import { getCards, getUserInfo, updateUserInfo } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const cardsContainer = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditForm = document.forms["edit-profile"];
const popupEditName = popupEditForm.name;
const popupEditDescription = popupEditForm.description;
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

// Конфиги
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error",
};
const apiConfig = {
  token: "e8253e36-fd81-4252-b6ca-e3d1791e07d1",
  cohortId: "cohort-magistr-2",
};

// Функция вывода данных о пользователе
const renderUserInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  if (userInfo.avatar) {
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
  }
};

// Функция вывода карточек на страницу
const renderCards = (cardsInfo) => {
  cardsInfo.forEach((cardInfo) => {
    cardsContainer.append(
      createCard(
        cardTemplate,
        cardInfo,
        onLike,
        onDelete,
        popupImageOpenHandler
      )
    );
  });
};

// Обработчик формы редактирования профиля
const editSubmitHandler = (evt) => {
  evt.preventDefault();
  const userInfo = {
    name: popupEditName.value,
    about: popupEditDescription.value,
  };
  updateUserInfo(apiConfig, userInfo);
  renderUserInfo(userInfo);
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
  clearValidation(popupNewCardForm, validationConfig);
  onModalClose(popupNewCard);
};

// Обработчик открытия модального окна для редактирования профиля
const popupEditOpenHandler = () => {
  popupEditName.value = profileTitle.textContent;
  popupEditDescription.value = profileDescription.textContent;
  clearValidation(popupEditForm, validationConfig);
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

// Вывод информации о пользователе (или дефолтной при ошибке)
getUserInfo(apiConfig)
  .then((userInfo) => renderUserInfo(userInfo))
  .catch(() =>
    renderUserInfo({
      name: "Жак-Ив Кусто",
      about: "Исследователь океана",
      avatar: profileImageSrc,
    })
  );

// Вывод карточек на страницу (или дефолтных при ошибке)
getCards(apiConfig)
  .then((cardsInfo) => renderCards(cardsInfo))
  .catch(() => renderCards(initialCards));

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

// Добавление обработчиков форм
popupEditForm.addEventListener("submit", editSubmitHandler);
popupNewCardForm.addEventListener("submit", newCardSubmitHandler);

// Включение валидации
enableValidation(validationConfig);
