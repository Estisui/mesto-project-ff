import { deleteCard } from "./api";

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
  // Отображаем количество лайков только для полученных с сервера карточек
  if (cardData.likes) {
    const cardLikeCounter = cardElement.querySelector(".card__like-count");
    cardLikeCounter.textContent = cardData.likes.length;
  }
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
  cardLikeButton.addEventListener("click", () => onLike(cardLikeButton));
  return cardElement;
};

// Функция удаления карточки
const onDelete = (cardElement, cardInfo) => {
  // Логика удаления для полученных с сервера карточек / дефольных карточек
  if (cardInfo.hasOwnProperty("owner")) {
    deleteCard(cardInfo)
      .then(() => cardElement.remove())
      .catch(() => console.log("Не удалось удалить карточку"));
  } else {
    cardElement.remove();
  }
};

// Функция лайка карточки
const onLike = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export { createCard, onDelete, onLike };
