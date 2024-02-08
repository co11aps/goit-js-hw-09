const LOCAL_STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  const data = {
    email,
    message,
  };

  saveToLS(LOCAL_STORAGE_KEY, data);
}

function saveToLS(key, value) {
  const formContent = JSON.stringify(value);
  localStorage.setItem(key, formContent);
}

function loadFromLS(key) {
  const formContent = localStorage.getItem(key);
  try {
    return JSON.parse(formContent);
  } catch {
    return formContent;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const email = form.elements.email.value;
  const message = form.elements.message.value;

  if (email !== '' && message !== '') {
    const data = {
      email,
      message,
    };

    console.log(data);

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    form.reset();
  } else {
    alert('Please fulfill all fields!');
  }
}

function init() {
  const data = loadFromLS(LOCAL_STORAGE_KEY) || {};
  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
}

init();
