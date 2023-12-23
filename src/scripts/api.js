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
  return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
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
  return fetch(`1https://nomoreparties.co/v1/${apiConfig.cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardInfo.name,
      link: cardInfo.link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

const deleteCard = (cardInfo) => {
  return fetch(
    `https://nomoreparties.co/v1/${apiConfig.cohortId}/cards/${cardInfo._id}`,
    {
      method: "DELETE",
      headers: {
        authorization: apiConfig.token,
      },
    },
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

const putLike = (cardInfo) => {
  return fetch(
    `https://nomoreparties.co/v1/${apiConfig.cohortId}/cards/likes/${cardInfo._id}`,
    {
      method: "PUT",
      headers: {
        authorization: apiConfig.token,
      },
    },
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

const deleteLike = (cardInfo) => {
  return fetch(
    `https://nomoreparties.co/v1/${apiConfig.cohortId}/cards/likes/${cardInfo._id}`,
    {
      method: "DELETE",
      headers: {
        authorization: apiConfig.token,
      },
    },
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

const updateAvatar = (avatar) => {
  return fetch(
    `https://nomoreparties.co/v1/${apiConfig.cohortId}/users/me/avatar`,
    {
      method: "PATCH",
      headers: {
        authorization: apiConfig.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    },
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

export {
  getUserInfo,
  updateUserInfo,
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
  updateAvatar,
};
