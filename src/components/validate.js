
function showInputError(inputElement, inputInvalidClass, errorElement, errorMessage) {
    inputElement.classList.add(inputInvalidClass);
    errorElement.textContent = errorMessage;
};

function hideInputError(inputElement, inputInvalidClass, errorElement) {
    inputElement.classList.remove(inputInvalidClass);
    errorElement.textContent = "";
};

function checkInputValidity (formElement, inputElement, inputInvalidClass) {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

    if (inputElement.validity.valid) {
        hideInputError(inputElement, inputInvalidClass, errorElement);
    } else {
        showInputError(inputElement, inputInvalidClass, errorElement, inputElement.validationMessage);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

function disabledButton (buttonElement, buttonDisabledClass) {
    buttonElement.classList.add(buttonDisabledClass);
    buttonElement.disabled = true;
};

function enableButton(buttonElement, buttonDisabledClass) {
    buttonElement.classList.remove(buttonDisabledClass);
    buttonElement.disabled = false;
};

function toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass) {
    const buttonElement = formElement.querySelector(buttonSelector);
     if(hasInvalidInput(inputList)) {
         disabledButton(buttonElement , buttonDisabledClass);
     } else {
         enableButton(buttonElement , buttonDisabledClass);
     }
};

function setEventListeners (formElement, {inputSelector, inputInvalidClass, buttonSelector, buttonDisabledClass}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputInvalidClass);
            toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass);
        });
    });
    toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass);
};

function enableValidation({formSelector, ...rest}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest)
    });
};

export { enableValidation, disabledButton };