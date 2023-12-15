const getUserInfo = (apiConfig) => {
  return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/users/me`, {
    headers: {
      authorization: apiConfig.token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
};

const getCards = (apiConfig) => {
  return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/cards`, {
    headers: {
      authorization: apiConfig.token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}

export { getUserInfo, getCards };
