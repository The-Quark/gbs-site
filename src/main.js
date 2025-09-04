import './style.css';

const mainHeader = document.getElementById('main-header');
const stickyHeader = document.getElementById('sticky-header');

function toggleHeaders() {
  if (window.scrollY > mainHeader.offsetHeight) {
    stickyHeader.classList.remove('hidden');
  } else {
    stickyHeader.classList.add('hidden');
  }
}

window.addEventListener('scroll', toggleHeaders);

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('lang-toggle');
  const menu = document.getElementById('lang-menu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Закрыть по клику вне
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
});
