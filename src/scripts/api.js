const getUserInfo = (apiConfig) => {
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

const updateUserInfo = (apiConfig, userInfo) => {
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

const getCards = (apiConfig) => {
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

export { getUserInfo, updateUserInfo, getCards };
