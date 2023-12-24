const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/cohort-magistr-2",
  headers: {
    authorization: "e8253e36-fd81-4252-b6ca-e3d1791e07d1",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const request = (url, options) => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse);
}

const getUserInfo = () => {
  return request(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  });
};

const updateUserInfo = (userInfo) => {
  return request(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about,
    }),
  });
};

const getCards = () => {
  return request(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  });
};

const postCard = (cardInfo) => {
  return request(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardInfo.name,
      link: cardInfo.link,
    }),
  });
};

const deleteCard = (cardInfo) => {
  return request(`${apiConfig.baseUrl}/cards/${cardInfo._id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  });
};

const putLike = (cardInfo) => {
  return request(`${apiConfig.baseUrl}/cards/likes/${cardInfo._id}`, {
    method: "PUT",
    headers: apiConfig.headers,
  });
};

const deleteLike = (cardInfo) => {
  return request(`${apiConfig.baseUrl}/cards/likes/${cardInfo._id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  });
};

const updateAvatar = (avatar) => {
  return request(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
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
