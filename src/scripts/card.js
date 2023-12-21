import { deleteCard, putLike, deleteLike } from "./api";

// Функция создания карточки
const createCard = (
  cardTemplate,
  cardData,
  userData,
  onLike,
  onDelete,
  onOpen
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener("click", onOpen);
  cardElement.querySelector(".card__title").textContent = cardData.name;
  // Отображаем количество лайков и состояние кнопки (только для полученных с сервера карточек)
  renderLikes(cardElement, cardData, userData);
  // Оставляем кнопку удаления только для собственных или предзагруженных карточек
  if (
    !cardData.hasOwnProperty("owner") ||
    cardData.owner._id === userData._id
  ) {
    cardDeleteButton.addEventListener("click", () =>
      onDelete(cardElement, cardData)
    );
  } else {
    cardDeleteButton.remove();
  }
  cardLikeButton.addEventListener("click", () =>
    onLike(cardElement, cardLikeButton, cardData, userData)
  );
  return cardElement;
};

const renderLikes = (cardElement, cardData, userData) => {
  if (cardData.likes) {
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardLikeCounter = cardElement.querySelector(".card__like-count");
    if (cardData.likes.some((likeInfo) => likeInfo._id === userData._id)) {
      cardLikeButton.classList.add("card__like-button_is-active");
    } else {
      cardLikeButton.classList.remove("card__like-button_is-active");
    }
    cardLikeCounter.textContent = cardData.likes.length;
  }
};

// Функция удаления карточки
const onDelete = (cardElement, cardData) => {
  // Логика удаления для полученных с сервера карточек / дефольных карточек
  if (cardData.hasOwnProperty("owner")) {
    deleteCard(cardData)
      .then(() => cardElement.remove())
      .catch(() => console.log("Не удалось удалить карточку"));
  } else {
    cardElement.remove();
  }
};

// Функция лайка карточки
const onLike = (cardElement, likeButton, cardData, userData) => {
  // Логика лайка для полученных с сервера карточек / дефольных карточек
  if (cardData.hasOwnProperty("owner")) {
    if (!likeButton.classList.contains("card__like-button_is-active")) {
      putLike(cardData)
        .then((cardInfo) => renderLikes(cardElement, cardInfo, userData))
        .catch(() => console.log("Не удалось лайкнуть карточку"));
    } else {
      deleteLike(cardData)
        .then((cardInfo) => renderLikes(cardElement, cardInfo, userData))
        .catch(() => console.log("Не удалось анлайкнуть карточку"));
    }
  } else {
    likeButton.classList.toggle("card__like-button_is-active");
  }
};

export { createCard, onDelete, onLike };
