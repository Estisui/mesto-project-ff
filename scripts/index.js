// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const cardsContainer = document.querySelector(".places__list");
// Функция создания карточки
const createCard = (cardValues, deleteCard) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardValues.link;
  cardElement.querySelector(".card__title").textContent = cardValues.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  return cardElement;
};
// Функция удаления карточки
const deleteCard = (e) => {
  const cardElement = e.target.closest(".card");
  cardElement.remove();
};
// Вывести карточки на страницу
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, deleteCard));
});
