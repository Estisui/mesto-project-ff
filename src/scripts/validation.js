// Функция валидации
const isValid = (inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(inputElement, validationConfig);
  }
};

// Функция проверки массива полей на невалидное поле
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция блокировки/разблокировки кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Функция отображения ошибки при валидации
const showInputError = (inputElement, errorMessage, validationConfig) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Функция скрытия ошибки при валидации
const hideInputError = (inputElement, validationConfig) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
};

// Функция постановики слушателей для валидации формы
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Функция включения валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// Функция сброса состояния валидации
const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  // Сброс сообщений об ошибках
  inputList.forEach((inputElement) =>
    hideInputError(inputElement, validationConfig)
  );
  // Сброс состояния кнопки
  toggleButtonState(inputList, submitButton, validationConfig);
};

export { enableValidation, clearValidation };
