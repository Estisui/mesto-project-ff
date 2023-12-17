const apiConfig = {
  token: "e8253e36-fd81-4252-b6ca-e3d1791e07d1",
  cohortId: "cohort-magistr-2",
};

const getUserInfo = () => {
  return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/users/me`, {
    headers: {
      authorization: apiConfig.token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

const updateUserInfo = (userInfo) => {
  fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about,
    }),
  }).catch(() => console.log("Не удалось обновить профиль"));
};

const getCards = () => {
  return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/cards`, {
    headers: {
      authorization: apiConfig.token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

const postCard = (cardInfo) => {
  fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardInfo.name,
      link: cardInfo.link,
    }),
  }).catch(() => console.log("Не удалось добавить карточку"));
};

export { getUserInfo, updateUserInfo, getCards, postCard };
