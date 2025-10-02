export function initForm({ form, modal, successPopup }) {
  const submitBtn = form.querySelector('.btn-submit');
  const okBtn = successPopup.querySelector('.success__ok');

  // Простая валидация
  function checkField(name, value) {
    const val = value.trim();
    if (name === 'name' && val.length < 2) return 'Enter your name';
    if (name === 'email' && !val.includes('@')) return 'Enter valid email';
    if (name === 'message' && val.length < 5) return 'Enter your message';
    return '';
  }

  function clearErrors() {
    const errors = form.querySelectorAll('.error');
    errors.forEach(err => err.textContent = '');
  }

  function showError(name, msg) {
    const el = form.querySelector(`[data-error="${name}"]`);
    if (el) el.textContent = msg;
  }

  async function sendForm(data) {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    clearErrors();

    const formData = new FormData(form);
    let hasError = false;

    formData.forEach((val, key) => {
      const err = checkField(key, val);
      if (err) {
        showError(key, err);
        hasError = true;
      }
    });

    if (hasError) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const data = Object.fromEntries(formData.entries());
      await sendForm(data);
      form.reset();
      modal.classList.remove('active');
      document.body.style.overflow = '';
      successPopup.classList.add('active');
      successPopup.hidden = false;
    } catch (err) {
      showError('form', 'Something went wrong');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'SUBMIT';
    }
  }

  function onOkClick() {
    successPopup.classList.remove('active');
    successPopup.hidden = true;
  }

  form.addEventListener('submit', onSubmit);
  okBtn.addEventListener('click', onOkClick);
}
