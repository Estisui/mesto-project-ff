// Функция создания карточки
const createCard = (cardTemplate, cardData, onLike, onDelete, onOpen) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener("click", onOpen);
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => onDelete(cardElement));
  cardLikeButton.addEventListener("click", () => onLike(cardLikeButton));
  return cardElement;
};
// Функция удаления карточки
const onDelete = (card) => {
  card.remove();
};
// Функция лайка карточки
const onLike = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export { createCard, onDelete, onLike };
