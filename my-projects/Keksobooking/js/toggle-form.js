const toggleForm = (form, isDisabled) => {
  form.classList.toggle('ad-form--disabled', isDisabled);
  const formElements = form.querySelectorAll('fieldset, select');
  formElements.forEach((element) => {
    element.disabled = isDisabled;
  });
};

export { toggleForm };
