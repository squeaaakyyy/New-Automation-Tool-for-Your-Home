export function initModal({ modal, trigger, successPopup }) {
  const overlay = modal.querySelector('.modal__overlay');
  const closeBtn = modal.querySelector('.modal__close');

  // открываем окно
  function showModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // закрываем окно
  function hideModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // закрытие по клику на оверлей
  function onOverlayClick(e) {
    if (e.target === overlay) {
      hideModal();
    }
  }

  // закрытие по Esc
  function onEscPress(e) {
    if (e.key === 'Escape') {
      hideModal();
      if (successPopup && successPopup.classList.contains('active')) {
        successPopup.classList.remove('active');
        successPopup.hidden = true;
      }
    }
  }

  trigger.addEventListener('click', () => showModal());
  overlay.addEventListener('click', onOverlayClick);
  closeBtn.addEventListener('click', () => hideModal());
  document.addEventListener('keydown', onEscPress);
}
