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
import {
  getCards,
  getUserInfo,
  postCard,
  updateAvatar,
  updateUserInfo,
} from "./api";

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
const popupEditSubmitButton = popupEditForm.querySelector(".popup__button");
const buttonEdit = document.querySelector(".profile__edit-button");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms["new-place"];
const popupNewCardName = popupNewCardForm["place-name"];
const popupNewCardLink = popupNewCardForm.link;
const popupNewCardSubmitButton = popupNewCard.querySelector(".popup__button");
const buttonNewCard = document.querySelector(".profile__add-button");

const popupImage = document.querySelector(".popup_type_image");
const popupImagePhoto = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = document.forms["edit-avatar"];
const popupAvatarLink = popupAvatarForm["avatar-link"];
const popupAvatarSubmitButton = popupAvatar.querySelector(".popup__button");

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

// Промисы
const userInfoPromise = getUserInfo();
const cardsPromise = getCards();

// Функция вывода данных о пользователе
const renderUserInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  if (userInfo.avatar) {
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
  }
};

// Функция вывода карточек на страницу
const renderCards = (cardsInfo, userInfo = {}) => {
  cardsInfo.forEach((cardInfo) => {
    cardsContainer.append(
      createCard(
        cardTemplate,
        cardInfo,
        userInfo,
        onLike,
        onDelete,
        popupImageOpenHandler,
      ),
    );
  });
};

// Обработчик формы редактирования профиля
const editSubmitHandler = (evt) => {
  evt.preventDefault();
  const userData = {
    name: popupEditName.value,
    about: popupEditDescription.value,
  };
  buttonToggleLoading(popupEditSubmitButton, "loading");
  // Обновление профиля только при успешном запросе
  updateUserInfo(userData)
    .then((userInfo) => {
      renderUserInfo(userInfo);
      onModalClose(popupEdit);
    })
    .catch(() => console.log("Не удалось обновить профиль"))
    .finally(() => {
      buttonToggleLoading(popupEditSubmitButton, "loaded");
    });
};

// Обработчик формы добавления карточки
const newCardSubmitHandler = (evt) => {
  evt.preventDefault();
  let cardData = {
    name: popupNewCardName.value,
    link: popupNewCardLink.value,
  };
  buttonToggleLoading(popupNewCardSubmitButton, "loading");
  postCard(cardData)
    .then((cardInfo) => {
      cardData = cardInfo; // заменяем данные карточки данными о ней с сервера
    })
    .catch(() => console.log("Не удалось добавить карточку на сервер"))
    .finally(() => {
      buttonToggleLoading(popupNewCardSubmitButton, "loaded");
      // Выставляем userData._id вручную, если карточка была добавлена на сервер, чтобы не делать лишний запрос на сервер (мы знаем, что сами создали карточку)
      const userData = cardData.hasOwnProperty("owner")
        ? { _id: cardData.owner._id }
        : {};
      const newCard = createCard(
        cardTemplate,
        cardData,
        userData,
        onLike,
        onDelete,
        popupImageOpenHandler,
      );
      cardsContainer.prepend(newCard);
    });
  onModalClose(popupNewCard);
  popupNewCardForm.reset();
  clearValidation(popupNewCardForm, validationConfig);
};

const avatarSubmitHandler = (evt) => {
  evt.preventDefault();
  const avatarLink = popupAvatarLink.value;
  buttonToggleLoading(popupAvatarSubmitButton, "loading");
  updateAvatar(avatarLink)
    .then((userInfo) => renderUserInfo(userInfo))
    .catch(() => console.log("Не удалось обновить аватар"))
    .finally(() => buttonToggleLoading(popupAvatarSubmitButton, "loaded"));
  popupAvatarForm.reset();
  onModalClose(popupAvatar);
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

// Функция вывода состояния загрузки
const buttonToggleLoading = (button, state) => {
  if (state === "loading") {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
};

// Вывод информации о пользователе (или дефолтной при ошибке)
userInfoPromise
  .then((userInfo) => renderUserInfo(userInfo))
  .catch(() =>
    renderUserInfo({
      name: "Жак-Ив Кусто",
      about: "Исследователь океана",
      avatar: profileImageSrc,
    }),
  );

// Вывод карточек на страницу (или дефолтных при ошибке)
Promise.all([cardsPromise, userInfoPromise])
  .then(([cardsInfo, userInfo]) => {
    renderCards(cardsInfo, userInfo);
  })
  .catch(() => {
    renderCards(initialCards);
  });

// Добавление слушателей для открытия попапов
buttonEdit.addEventListener("click", popupEditOpenHandler);
buttonNewCard.addEventListener("click", () => onModalOpen(popupNewCard));
profileImage.addEventListener("click", () => onModalOpen(popupAvatar));

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
popupAvatarForm.addEventListener("submit", avatarSubmitHandler);

// Включение валидации
enableValidation(validationConfig);
