// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const cardsContainer = document.querySelector(".places__list");
// Функция создания карточки
const createCard = (cardData, onDelete) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
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
// Вывести карточки на страницу
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, onDelete));
});
